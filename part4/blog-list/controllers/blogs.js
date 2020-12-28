const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  request
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (!('likes' in blog)) {
    blog.likes = 0
  } else if (typeof(blog.likes) !== 'number' || isNaN(blog.likes)) {
    blog.likes = 0
  }

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).json({ error: exception.message })
    } else {
      next(exception)
    }
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogRouter
