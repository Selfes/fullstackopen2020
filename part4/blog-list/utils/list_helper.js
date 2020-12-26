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

module.exports = { dummy, totalLikes, favoriteBlog }
