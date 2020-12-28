const listHelper = require('../utils/list_helper')
const blog_api_helper = require('./blog_api_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blog_api_helper.dummyBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blog_api_helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list calculated right', () => {
    expect(listHelper.totalLikes(blog_api_helper.dummyBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {

  test('of a empty list', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when the list has only one blog', () => {
    expect(listHelper.favoriteBlog(blog_api_helper.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a big list of blogs', () => {
    expect(listHelper.favoriteBlog(blog_api_helper.dummyBlogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {

  test('of a empty list', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when the list has only one blog', () => {
    expect(listHelper.mostBlogs(blog_api_helper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a big list of blogs', () => {
    expect(listHelper.mostBlogs(blog_api_helper.dummyBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('of a empty list', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when the list has only one blog', () => {
    expect(listHelper.mostLikes(blog_api_helper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a big list of blogs', () => {
    expect(listHelper.mostLikes(blog_api_helper.dummyBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})
