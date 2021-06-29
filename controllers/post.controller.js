const postService = require('../services/post.service')

const createPost = async (req, res, next) => {
    try {
        const result = await postService.createPost(req.body)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

const getPost = async (req, res, next) => {
    try {
        const result = await postService.getPost(req.body)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = { createPost, getPost }
