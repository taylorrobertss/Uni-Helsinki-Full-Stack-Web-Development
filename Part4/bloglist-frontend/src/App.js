import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import CreateBlog from "./components/BlogForm"
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotification] = useState(null)

  const [title, setTitle] = useState("");

  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const blogFormRef = useRef()
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

         setNotification(
        `User ${username} has logged in sucessfully`
      );
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    
    } catch (exception) {
      setNotification(
        `Login Failed, wrong credentials`
      );
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    }

  }
  // const addBlog = (blogObject) => {
  //   blogService
  //     .create(blogObject)
  //     .then(returnedBlog => {
  //       setBlogs(blog.concat(returnedBlog))
  //       blogFormRef.current.toggleVisibility()
  //     })
  // }
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

  const handleSubmit = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      };

      let createdBlog = null;
    
      try {
        createdBlog = await blogService.create(newBlog);
        setNotification(
          `Blog ${newBlog.title} has be added`
        );
        setTimeout(() => {
          setNotification(null)
        }, 3500)

      } catch (error) {
        console.log(error)
      }
    
      const Nblogs = [...blogs, createdBlog];
      setBlogs(Nblogs)
  
      setUrl("")
      setTitle("")
      setAuthor("")
  
     
    } catch (exception) {
      setErrorMessage("Blog creation failed");
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleUpdate = async blog => {
    const updateBlog = {...blog,
      likes: blog.likes + 1
    }
    try {
   
      const likedBlog = await blogService.update(updateBlog)
      const filteredBlogs = blogs.filter(blog => blog.id !== likedBlog.id)

      const updatedBlogs = [...filteredBlogs, likedBlog]
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))

    } catch (e) {
      console.log(e)
      setNotification(
        `Couldnt update likes`
      );
      setTimeout(() => {
        setNotification(null)
      }, 3500)
    }
  }

  const DeleteBlog = async deleteBlog => {
    if (window.confirm(`Do you want to delete: ${deleteBlog.title} written by ${deleteBlog.author}?`)) {
      try {
        await blogService.remove(deleteBlog)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      } catch (e) {
        console.log(e)

      }
    }
  }
  return (
    <div>
      <Notification message={notificationMessage} />
      <h3>Log into the application</h3>
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user && <div>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogOut}>
        
        <button type="submit">Logout</button>
       </form>
        <h3>Create a new blog:</h3>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlog
              handleAuthor={e => {setAuthor(e.target.value)}}
              handleTitle={e =>{setTitle(e.target.value)}}
              handleUrl={e => {setUrl(e.target.value)}}
              handleSubmit={handleSubmit}
              title={title}
              url={url}
              author={author} />
          </Togglable>

        {/* <Togglable buttonLabel="new blog">
          <CreateBlog
            handleAuthor={e => {setAuthor(e.target.value)}}
            handleTitle={e =>{setTitle(e.target.value)}}
            handleUrl={e => {setUrl(e.target.value)}}
            handleSubmit={handleSubmit}
            title={title}
            url={url}
            author={author} />

        </Togglable> */}
      

        <h2>blogs</h2>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} DeleteBlog={DeleteBlog} />
        ))}
      </div>
      }
    </div>
  )
}

export default App