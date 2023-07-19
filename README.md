# Karen McGrane's Web Site

This repository is an eleventy site responsible for building karenmcgrane.com using the headless content maintained and hosted at contentful.com.

## General Architecture

Content and content-related assets are managed in Contentful; all content is pulled down and cached for use as eleventy's site data. The eleventy project doesn't use hard-coded files (like .html or .md) for page generation, only templates. This minimizes API usage even during times of rapid testing and frequent site rebuilding.

## Content Types

- Page: Ye Olde Static Page. One page can be flagged as the 'home page'
- Post: Blog posts, including content republished from other sources (interviews, columns on HBR, etc)
- Presentation: Web-friendly versions of popular talks and presentations
- Source: Sources cited in posts and presentations; these don't get their own pages but are aggregated on a 'sources' page and categorized by topic.
- Slide: Individual slides for presentations; these are never edited on their own, but need to exist to maintain structure.
- Book: Publication and description information for books written by Karen

## Future Improvements

- Project content type: A short account of a past client or project, used to construct the "projects I've worked on" page. For the time being this is just a single Post.
- Contact form customization
- Bookmark storage
- Asset caching: Although we're caching the Contentful content API responses we're still relying on their delivery CDN for media files. We're working on a reusable solution for the autogram.is site, and will probably use it here as well.
