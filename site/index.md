---
layout: home
meta_title: Next Event
meta_description: Backstage Open Mic is a monthly event where the community gathers to share experiences.
title: A community of people building developer portals
sub_heading: We’re a regular get together of Backstage users sharing their experiences and helping each other
eleventyNavigation:
  key: Home
  order: 1
---

## Features

- Clean, understated design - a good starting point for a portfolio or blog
- A minimal build pipeline with [Laravel Mix](https://laravel-mix.com/docs/5.0/basic-example)
- [Gorko](https://github.com/hankchizljaw/gorko), a smart little Sass-powered utility class generator
- [Purgecss](https://purgecss.com/) to remove unused CSS
- HTML minifier
- Supports ES2017 JavaScript, with Babel compilation
- SEO friendly page meta, including Open Graph and Twitter
- Image lazy loading
- Responsive navigation
- XML Sitemap

## Getting started

### Prerequisites
Node `v10+`

### Installation

1. Clone the repo `git clone https://github.com/josephdyer/skeleventy.git`
2. `cd` into the project folder and run `npm install`
3. Start the local development server by running `npm run dev` **Tip:** _Eleventy has live reload baked in!_

## Ready to deploy?

The ```npm run production``` command will remove any unused CSS with Purgecss and minify the CSS and JS files.

I highly recommend using [Netlify](https://www.netlify.com) to host your site on, so I've included a ```netlify.toml``` configuration file for your convenience.

