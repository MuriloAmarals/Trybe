const blogPostServices = require('../services/blogPostServices');

const addBlog = async (req, res) => {
  try {
    const { id } = req.authUser;
    const data = await blogPostServices.addBlog(req.body, id);
    if (data.status === 201) return res.status(data.status).json(data.createdPost);
    return res.status(data.status).json({ message: data.message });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const userId = req.authUser.id;

  const data = await blogPostServices.deleteBlog(id, userId);

  if (data.status === 401) return res.status(data.status).json({ message: data.message });
  if (data.status === 404) return res.status(data.status).json({ message: data.message });

  return res.status(204).json(data);
};

const postSearch = async (req, res) => {
  const { q } = req.query;
  const data = await blogPostServices.postSearch(q);
  return res.status(200).json(data);
};

const getPosts = async (_req, res) => {
  const allPosts = await blogPostServices.getPosts();
  return res.status(200).json(allPosts);
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const userId = req.authUser.id;

  const data = await blogPostServices.updateBlog(id, userId, req.body);

  if (data.status === 400) return res.status(data.status).json({ message: data.message });
  if (data.status === 401) return res.status(data.status).json({ message: data.message });
  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostServices.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

module.exports = { addBlog, getPosts, getById, updateBlog, deleteBlog, postSearch }; 
