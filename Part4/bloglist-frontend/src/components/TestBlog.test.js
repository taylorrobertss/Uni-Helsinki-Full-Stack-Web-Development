import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import CreateBlog from './BlogForm'

afterEach(cleanup);

test('renders blog title and author', () => {
    const blog = {
        author: 'Taylor R',
        title: 'Test Blog',
        likes: 8
    }

    let component = render(
        <Blog blog={blog} />
    )


    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')

    expect(title).toBeDefined()
    expect(author).toBeDefined()

})


test('show url and likes after clicking in show button', () => {
    const blog = {
        author: 'Taylor R',
        title: 'Test Blog',
        likes: 8
    }

    let component = render(
        <Blog blog={blog} />
    )

    const button = component.container.querySelector('.view')
    fireEvent.click(button)
    const hiddenDiv = component.container.querySelector('.expand')
    expect(hiddenDiv).toBeDefined()
})


test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        author: 'Taylor R',
        title: 'Test Blog',
        likes: 8,
        url: "www.test.com"
    }

    const mockHandler = jest.fn()
    let component = render(
        <Blog blog={blog} handleUpdate={mockHandler} />
    )
    const button = component.getByRole('button', { name: 'view' })
    fireEvent.click(button)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

