import React, { useState } from "react"

const CreateBlog = ({ handleAuthor, handleSubmit, handleTitle, handleUrl, title, url, author }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            id="title"
            className="title"
            type="text"
            value={title}
            name="title"
            onChange={handleTitle}/>
        </div>
        <div>
          Author
          <input
             id="author"
            className="author"
            type="text"
            value={author}
            name="author"
            onChange={handleAuthor}/>
        </div>
        <div>
          Url
          <input
            id="url"
            className="url"
            type="text"
            value={url}
            name="url"
            onChange={handleUrl} />
        </div>
        <button id="Create" type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlog