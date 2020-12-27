let _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  let res = blogs.reduce((currElem, nextElem) => (+currElem.likes > +nextElem.likes) ? currElem : nextElem)
  delete res.__v
  delete res._id
  delete res.url
  return res
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const numOfBlogs = _.countBy(blogs, 'author')
  const numOfBlogsArray = _.map(Object.keys(numOfBlogs), (key) => ({ author: key, blogs: numOfBlogs[key] }))
  return _.maxBy(numOfBlogsArray, 'author')
}

// inspired by https://stackoverflow.com/a/38774930
const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  return _(blogs).groupBy('author')
                 .map((objs, key) => ({ author: key, likes: _.sumBy(objs, 'likes')}))
                 .maxBy('likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
