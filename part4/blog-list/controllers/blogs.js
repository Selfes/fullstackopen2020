const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  request
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!('likes' in blog)) {
    blog.likes = 0
  } else if (typeof(blog.likes) !== 'number' || isNaN(blog.likes)) {
    blog.likes = 0
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter
