/**
 * Sorts an array of objects, either from collection tags or global data
 * @param {number} a first param from sort
 * @param {number} b second param from sort
 * @returns mutated collection array
 */
const sortCollection = (a, b) => {
  if ('data' in a && 'data' in b) {
    return Math.sign(a.data.order - b.data.order)
  }
  return Math.sign(a.order - b.order)
}

const formatDate = (dateString) => {
  const dateObj = new Date(dateString)
  const month = dateObj.toLocaleString('en-US', { month: 'long' })
  const year = dateObj.getFullYear()
  return `${month}, ${year}`
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('experienceSection', collectionApi => {
    return collectionApi.getFilteredByTag('experience').sort(sortCollection)
  })

  eleventyConfig.addCollection('strengthSection', collectionApi => {
    return collectionApi.getFilteredByTag('strengths').sort(sortCollection)
  })

  eleventyConfig.addCollection('skillsSection', collectionApi => {
    const globalSkillsData = collectionApi.items[0].data.skills
    return globalSkillsData.sort(sortCollection)
  })

  eleventyConfig.addCollection('achievementSection', collectionApi => {
    return collectionApi.getFilteredByTag('achievements').sort(sortCollection)
  })

  eleventyConfig.addCollection('languageSection', collectionApi => {
    return collectionApi.getFilteredByTag('languages').sort(sortCollection)
  })

  eleventyConfig.addCollection('socialSection', collectionApi => {
    const globalSocialData = collectionApi.items[0].data.social
    return globalSocialData.sort(sortCollection)
  })

  eleventyConfig.addFilter('getJobItemProp', experience => {
    return experience.data?.endDate ? 'alumniOf' : 'worksFor'
  })

  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'fonts' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'images' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/pdf': 'pdf' })

  eleventyConfig.addFilter('startDateShortCode', date => {
    return formatDate(date)
  })

  eleventyConfig.addFilter('endDateShortCode', date => {
    return date ? formatDate(date) : 'Present'
  })

  eleventyConfig.addFilter('jobSkills', skillsArray => {
    return skillsArray.join(', ')
  })

  eleventyConfig.addFilter('uppercase', text => {
    return text.toUpperCase()
  })

  eleventyConfig.addFilter('lowercase', text => {
    return text.toLowerCase()
  })

  // Watch CSS files for changes
  eleventyConfig.setServerOptions({
    watch: ['./docs/index.css'],
  })

  return {
    dir: {
      includes: '_partials',
      input: 'src',
      output: 'docs',
    },
  }
}
