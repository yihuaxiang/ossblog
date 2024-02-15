const { path } = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options) => ({
  alias: {
    '@SearchBox':
      path.resolve(__dirname, 'SearchBox.vue')
  }
})
