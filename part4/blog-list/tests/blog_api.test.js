const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog')
const logger = require('../utils/logger')
const app = require('../app')

const blog_api_helper = require('./blog_api_helper')

const api = supertest(app)


beforeEach(async () => {
  try {
    await Blog.deleteMany({})

    const promiseArray = blog_api_helper.dummyBlogs
                                        .map((elem) => new Blog(elem))
                                        .map((elem) => elem.save())
    await Promise.all(promiseArray)
  } catch (exception) {
    logger.error(exception)
  }
})

test('blogs are correctly fetched', async () => {
  const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(6)
})

test('blogs id are defined', async () => {
  const newBlog = {
    title: 'How To Ask Questions The Smart Way',
    author: 'Eric S. Raymond',
    url: 'http://catb.org/%7Eesr/faqs/smart-questions.html',
    likes: 31
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body[response.body.length-1].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
