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
  await api
    .post('/api/blogs')
    .send(blog_api_helper.newBlogValid)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body[0].id).toBeDefined()
  expect(response.body[response.body.length-1].id).toBeDefined()
})

test('a valid blog is added', async () => {
  await api
    .post('/api/blogs')
    .send(blog_api_helper.newBlogValid)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(blog_api_helper.dummyBlogs.length + 1)
  expect(contents).toContain('How To Ask Questions The Smart Way')
})

test('blog without likes property correctly added', async () => {
  await api
    .post('/api/blogs')
    .send(blog_api_helper.newBlogLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.filter((elem) => (elem.author === 'Paul Graham' && elem.title === "Being A Noob"))[0].likes).toBe(0)
})

test('invalid blogs not added', async () => {
  await api
    .post('/api/blogs')
    .send(blog_api_helper.badBlogPost1)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blog_api_helper.badBlogPost2)
    .expect(400)
})

test('blog gets removed', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const title = response.body[0].title
  const url = response.body[0].url

  await api
    .delete(('/api/blogs/' + response.body[0].id))
    .expect(204)

  const secondResponse = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const titles = secondResponse.body.map(r => r.title)
  const urls = secondResponse.body.map(r => r.url)

  expect(secondResponse.body).toHaveLength(blog_api_helper.dummyBlogs.length - 1)
  expect(titles).not.toContain(title)
  expect(urls).not.toContain(url)
})

afterAll(() => {
  mongoose.connection.close()
})
