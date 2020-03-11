const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blogPost')

// routes
router.get('/', (req, res) => {
  BlogPost.find()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'Sorry, internal server error!'
      })
    })
})

router.post('/save', (req, res) => {
  const data = req.body

  const newBlogPost = new BlogPost(data)

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({
        msg: 'Sorry, internal server error!'
      })
    }
    res.json({
      msg: 'Your data has been saved!'
    })
  })
})

router.get('/name', (req, res) => {
  const data = {
    username: 'aljem',
    age: 26
  }
  res.json(data)
})

module.exports = router