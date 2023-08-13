import React, { useState } from "react";
import blogsService from "../services/blogs";

const CreateBlog = ({ handleAuthor, handleSubmit, handleTitle, handleUrl, title, url, author }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitle}/>
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthor}/>
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrl} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;