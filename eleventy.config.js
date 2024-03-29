const navigation = require('@11ty/eleventy-navigation')
const dates = require('./utilities/filters/dates')
const helpers = require('./utilities/filters/helpers')
const path = require('path')

module.exports = config => {

  // navigation plugin
  config.addPlugin(navigation)

  // Human readable date for posts
  config.addFilter('dateDisplay', dates.friendly)

  // Timestamp for datetime element
  config.addFilter('timestamp', dates.timestamp)

  // Remove whitespace from a string
  config.addNunjucksFilter('spaceless', helpers.spaceless)

  // Minify our HTML
  config.addTransform('htmlminify', require('./utilities/transforms/htmlminify'))

  // Collections
  config.addCollection('show', collection => {

    const shows = collection.getFilteredByTag('show');
    const talks = collection.getFilteredByTag('talk');

    for (let i = 0; i < shows.length; i++) {

      const previousShow = shows[i - 1];
      const nextShow = shows[i + 1];
      const talksInShow = talks.filter((talk) => {
        return shows[i].data.showkey === talk.data.showkey;
      });

      shows[i].data.previousShow = previousShow;
      shows[i].data.nextShow = nextShow;
      shows[i].data.talks = talksInShow;
    }

    return shows.reverse()

  });

  config.addCollection('recording', collection => {
    let talks = collection.getFilteredByTag('talk');
    const shows = collection.getFilteredByTag('show');

    talks.forEach((talk) => {
      const otherTalks = talks
        .filter((thisTalk) => {
          return thisTalk.data.title != talk.data.title;
        })
        .filter((thisTalk) => {
          return !!thisTalk.data.vimeoEmbedLink
        })
        .map(value => ({ value, sort: Math.random() })) // Shuffle talks
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      const show = shows.filter((thisShow) => {
        return thisShow.data.showkey === talk.data.showkey;
      })
      talk.data.otherTalks = otherTalks.slice(0,4);
      talk.data.show = show[0];
    });

    return talks;
  });

  // Layout aliases
  config.addLayoutAlias('base', 'layouts/base.njk')
  config.addLayoutAlias('home', 'layouts/home.njk')
  config.addLayoutAlias('page', 'layouts/page.njk')
  config.addLayoutAlias('past-show', 'layouts/past-show.njk')
  config.addLayoutAlias('recording', 'layouts/recording.njk')
  config.addLayoutAlias('all-recordings', 'layouts/all-recordings.njk')


  // Include our static assets
  config.addPassthroughCopy('css')
  // config.addPassthroughCopy('js')
  config.addPassthroughCopy('images')
  config.addPassthroughCopy('fonts')
  config.addPassthroughCopy('favicon.png')
  config.addPassthroughCopy('favicon.svg')

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'site',
      output: 'public',
      includes: 'includes',
      data: 'globals'
    }
  }

}