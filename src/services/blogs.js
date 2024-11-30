import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createBlog = async (newBlog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async (data, blogId) => {
  const url = `${baseUrl}/likes/${blogId}`
  const response = await axios.patch(url, data)
  return response.data
}
const removeBlog = async (blogId, token) => {
  const url = `${baseUrl}/${blogId}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, createBlog, updateLikes, removeBlog }
