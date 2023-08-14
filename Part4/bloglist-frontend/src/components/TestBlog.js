import React from 'react'

const TestBlog = ({ blog, onClick }) => (
  <div>
    <div className='info'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>

    <div className='View'>

        <button onClick={onClick}>view</button>

    </div>
  </div>
)


export default TestBlog