import { asJsonArray } from "@salesforce/ts-types";
import pkg from 'fs-extra';
const { readJSON, writeJSON } = pkg;

import { WPPost, WPField, WPTerm } from "./wp-types.js";

await mergeFieldsIntoPosts();

async function mergeFieldsIntoPosts() {
  const posts = await readJSON('data/posts.json')
    .then(json => asJsonArray(json) as WPPost[]);
  
  const fields = await readJSON('data/postmeta.json')
    .then(json => asJsonArray(json) as WPField[]);

  const terms = await readJSON('data/terms.json')
    .then(json => asJsonArray(json) as WPTerm[]);

  const post_terms = await readJSON('data/post-terms.json')
    .then(json => asJsonArray(json) as { id: number, term_id: number }[]);

  for (const post of posts) {
    post.terms = post_terms.filter(pt => pt.id == post.ID)
      .map(pt => terms.find(t => t.term_id == pt.term_id)?.slug ?? '')
      .filter(t => t !== '');
    
    post.fields = {};
    for (const field of fields.filter(f => f.post_id == post.ID)) {
      if (field.meta_value) post.fields[field.meta_key] = field.meta_value;
    }
  }

  await writeJSON('data/posts-merged.json', posts);
}