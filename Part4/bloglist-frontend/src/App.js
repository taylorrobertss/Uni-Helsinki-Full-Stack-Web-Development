import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from "./components/createBlog";
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const [title, setTitle] = useState("");

  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const handleBlogChange = (event) => {
    setBlogs(event.target.value)
  }

  const handleLogOut = () =>{
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (

    

    <form onSubmit={setBlogs}>
      <input
        value={setBlogs}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      };

      let createdBlog = null;
      console.log("newBlog in handlesubmit", newBlog);
      try {
        createdBlog = await blogService.create(newBlog);
        console.log("createdBlog", createdBlog);
      } catch (error) {
        console.log("error", error);
      }
    
      const Nblogs = [...blogs, createdBlog];
      setBlogs(Nblogs);
  
      setUrl("");
      setTitle("");
      setAuthor("");
  
     
    } catch (exception) {
      setErrorMessage("Blog creation failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  return (
    <div>
      <h3>Log into the application</h3>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogOut}>
        
        <button type="submit">Logout</button>
       </form>
        <h3>Create a new blog:</h3>
        <CreateBlog
          handleAuthor={e => {setAuthor(e.target.value)}}
          handleTitle={e =>{setTitle(e.target.value)}}
          handleUrl={e => {setUrl(e.target.value)}}
          handleSubmit={handleSubmit}
          title={title}
          url={url}
          author={author} />

        <h2>blogs</h2>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      }
    </div>
  )
}

export default App