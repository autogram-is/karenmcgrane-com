import { asJsonArray } from "@salesforce/ts-types";
import pkg from 'fs-extra';
const { readJSON, writeFileSync, ensureDirSync } = pkg;
import { WPPost, WPUpload } from "./wp-types.js";
import matter from 'gray-matter';
const { stringify: formatFrontMatter } = matter;
import { deleteProperty, getProperty, hasProperty, setProperty } from "dot-prop";

const uploads = await readJSON('data/uploads.json')
  .then(json => asJsonArray(json) as WPUpload[]);

await splitPosts();

async function splitPosts() {
  const posts = await readJSON('data/posts-merged.json')
    .then(json => asJsonArray(json) as WPPost[]);
  
  const files = posts
    .filter(p => p.post_status === 'publish')
    .filter(p => ['post', 'page', 'source', 'presentation'].includes(p.post_type))
    .map(post => buildMarkdown(post));

  ensureDirSync(`web/blog`);
  ensureDirSync(`web/sources`);
  ensureDirSync(`web/presentations`);

  for (const file of files) {
    try {
      writeFileSync(
        `web/${file?.path}`,
        formatFrontMatter(file.content, file.frontmatter)
      );
    } catch {
      console.log(JSON.stringify(file.frontmatter, undefined, 2));
    }
  }
}

type MarkdownFile = {
  path: string;
  frontmatter: Record<string, unknown>;
  content: string;
};

// Builder functions that handle post-type-specific rules

function buildMarkdown(post: WPPost) {

  switch (post.post_type) {
    case 'page':
      return buildPage(post);
    case 'post':
      return buildPost(post);
    case 'presentation':
      return buildPresentation(post);
    case 'source':
      return buildSource(post);
    default: {
      return { path: `err-${post.ID}.log`, content: '', frontmatter: post};
    }
  }
}

function buildPage(input: WPPost) {
  const {
    header_display,
    header_tagline,
    ...fields
  } = input.fields ?? {};

  const output: MarkdownFile = {
    path: `${input.post_name}.md`,
    content: input.post_content,
    frontmatter: {
      id: input.ID,
      title: input.post_title,
      ...transformFieldKeys(fields)
    }
  };

  if (input.terms && input.terms.length) output.frontmatter['tags'] = input.terms;
  if (header_tagline) output.frontmatter['excerpt'] = header_tagline;

  return output;
}

function buildPost(input: WPPost) {
  const {
    header_display,
    header_summary,
    header_tagline,
    connected_source,

    ...fields
  } = input.fields ?? {};

  const output: MarkdownFile = {
    path: `blog/${wpDate(input.post_date)}-${input.post_name}.md`,
    content: header_summary ?? input.post_content,
    frontmatter: {
      id: input.ID,
      title: input.post_title,
      slug: input.post_name,
      ...transformFieldKeys(fields),
    }
  };
  if (header_tagline) output.frontmatter['excerpt'] = header_tagline;
  if (input.terms && input.terms.length) output.frontmatter['tags'] = input.terms;
  if (connected_source) output.frontmatter['source'] = Number(connected_source);

  if (!output.content && hasProperty(output, 'frontmatter.blocks[0].block_text')) {
    output.content = (getProperty(output, 'frontmatter.blocks[0].block_text') as string);
    deleteProperty(output, 'frontmatter.blocks[0].block_text');
  }
  output.content = output.content.replace("\r", "\n");

  return output;
}

function buildPresentation(input: WPPost) {
  const {
    header_display,
    header_tagline,
    connected_source,
    video,
    slides,

    ...fields
  } = input.fields ?? {};

  const output: MarkdownFile = {
    path: `presentations/${input.post_name}.md`,
    content: input.post_content, // This will need to be extracted from the custom fields
    frontmatter: {
      id: input.ID,
      title: input.post_title,
      slug: input.post_name,
      ...transformFieldKeys(fields),
    }
  };
  if (header_tagline) output.frontmatter['excerpt'] = header_tagline;
  if (input.terms && input.terms.length) output.frontmatter['tags'] = input.terms;
  if (connected_source) output.frontmatter['source'] = Number(connected_source);
  if (video && getEmbedSrc(video)) output.frontmatter['video'] = getEmbedSrc(video);
  if (slides && getEmbedSrc(slides)) output.frontmatter['slides'] = getEmbedSrc(slides);

  if (output.frontmatter['contents'] && output.content.trim() === '') {
    const slides = output.frontmatter['contents'] as Record<string, Record<string, string>>;
    deleteProperty(output, 'frontmatter.contents');
    output.content = Object.values(slides).filter(Boolean).map(
      slide => [
        `!(uploads/${getUploadfile(slide['image'])})`,
        (slide['text'] ?? '').replaceAll("\r\n", "\n").trim()
      ].join('\n\n')
    ).join('\n\n').replaceAll('\n\n\n\n', '\n\n');
  }

  if (output.frontmatter['blocks']) {
    deleteProperty(output, 'frontmatter.blocks');
  }
  
  return output;
}

function buildSource(input: WPPost) {
  const {
    source_url, 
    source_name,
    source_author,
    source_publication,
    source_blurb,
    source_date,
    ...fields
  } = input.fields ?? {};

  const output: MarkdownFile = {
    path: `sources/${input.ID}.md`,
    content: source_blurb ?? '',
    frontmatter: {
      id: input.ID,
      date: acfDate(source_date) ?? wpDate(input.post_date) ?? '',
      title: input.post_title ?? '',
      slug: input.post_name ?? '',
      permalink: false,
      ...transformFieldKeys(fields)
    }
  };

  if (source_name) output.frontmatter['name'] = source_name;
  if (source_author) output.frontmatter['author'] = source_author;
  if (source_publication) output.frontmatter['publication'] = source_publication;
  if (source_url) output.frontmatter['link'] = source_url;
  if (input.terms && input.terms.length) output.frontmatter['tags'] = input.terms;
  
  return output;
}

// Helper functions to parse Wordpress specific formats

// YYYYMMDD
export function acfDate(date?: string) {
  if (date && (date.length === 8)) {
    return [date.slice(0,4), date.slice(4, 6), date.slice(6, 8)].join('-');
  }
  return undefined;
}

// YYYY-MM-DD HH:MM:SS
export function wpDate(date: string) {
  if (date.includes(' ')) {
    // return new Date(date).toISOString();
    return date.split(' ')[0];
  }
  return date;
}

export function unserializePhp(data: string) {
  return data.replace('\"', '"');
}

export function transformFieldKeys(fields: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (key === 'blocks') continue;
    if (key === 'contents') continue;
    if (key === 'books') continue;
    if (key === 'inline_featured_image' && value === '0') continue;
    if (!value) continue;

    if (key === 'citations' && typeof value === 'string') {
      // This is a genuinely horrible thing to do. We're pulling IDs out of serialized PHP data.
      const citations: number[] = [];
      for (const cite of value.matchAll(/"([0-9]+)"/g)) {
        citations.push(Number(cite[1]));
      }
      setProperty(output, key, citations);

    } else {
      // This catches a bunch of weird ACF scenarios.
      const k = key.replace(/(.+)_([0-9]+)_(.+)/, "$1.$2.$3");
      setProperty(output, k, value);
    }
  }
  return output;
}

function getUploadfile(id: string) {
  const nid = Number(id);
  return uploads.find(u => u.id === nid)?.path;
}

function getEmbedSrc(embed: string) {
  let x = / src="([^"]+)" /.exec(embed)?.[1];
  if (x?.startsWith('//')) { x = 'https:' + x; }
  return x;
}