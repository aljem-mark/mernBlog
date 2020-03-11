import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios'


function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBlogPost()
  }, []);

  const getBlogPost = async () => {
    try {
      let { data } = await axios.get('/api')
      setPosts(data)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleChange = ({ target }, setValue) => {
    setValue(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      title,
      body,
    }

    try {
      let { data } = await axios({
        url: '/api/save',
        method: 'POST',
        data: payload
      })
      console.log(data.msg)
    } catch (err) {
      console.log('Error: ', err)
    }

    resetInput()
    getBlogPost()
  }

  const resetInput = () => {
    setTitle('')
    setBody('')
  }

  const displayBlogPost = () => {
    if (!posts.length) return null

    return posts.map((post, index) => (
      <div key={index}>
        <h2>{ post.title }</h2>
        <p>{ post.body }</p>
      </div>
    ))
  }

  return (
    <div>
      <h1>Welcome to my App</h1>
      <form
        onSubmit={handleSubmit}
      >
        <div className="">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => handleChange(e, setTitle)}
          />
        </div>
        <div className="">
          <textarea
            name="body"
            placeholder="Body"
            cols="30"
            rows="10"
            value={body}
            onChange={e => handleChange(e, setBody)}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div>
        {displayBlogPost()}
      </div>
    </div>
  );
}

export default App;
