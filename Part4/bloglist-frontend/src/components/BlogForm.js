import React, { useState } from "react"

const CreateBlog = ({ handleAuthor, handleSubmit, handleTitle, handleUrl, title, url, author }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            className="title"
            type="text"
            value={title}
            name="title"
            onChange={handleTitle}/>
        </div>
        <div>
          Author
          <input
            className="author"
            type="text"
            value={author}
            name="author"
            onChange={handleAuthor}/>
        </div>
        <div>
          Url
          <input
           className="url"
            type="text"
            value={url}
            name="url"
            onChange={handleUrl} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlog