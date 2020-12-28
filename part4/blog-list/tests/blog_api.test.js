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

// test('blogs id are defined', async () => {
//   const api await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

afterAll(() => {
  mongoose.connection.close()
})
