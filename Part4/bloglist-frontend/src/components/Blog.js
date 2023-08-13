import { useState } from "react"
const Blog = ({ blog, handleUpdate, DeleteBlog }) => {
  const [showMore, setShowMore] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }
  if (!showMore) {
    return (
      <div>
        <div className='hidden' style={blogStyle}>
          {blog.title} - {blog.author}
          <button onClick={() => setShowMore(true)}>view</button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='expand' style={blogStyle} >

        <p>
          {blog.title}
        </p>
        <a href={blog.url}> {blog.url} </a>
        <p>Likes: {blog.likes}
          <button onClick={() => handleUpdate(blog)}>Like</button>
        </p>
        <p>
          {blog.author}
        </p>
        <button onClick={() => DeleteBlog(blog)}>Remove</button>



        <button onClick={() => setShowMore(false)}>hide</button>
      </div>
    </div>
  )


}

export default Blog