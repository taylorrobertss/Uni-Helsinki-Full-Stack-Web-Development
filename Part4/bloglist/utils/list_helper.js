var _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(obj => obj.likes)[0]

}

const favoriteBlog = (blogs) => {
    let maxLikes = blogs.reduce((max, blogs) => max.likes > blogs.likes ? max : blogs);
    const result = {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }
    return result
}

const mostBlogs = (blogs) => {
    var most = _.countBy(blogs, 'author')

    let authors = []
    _.forIn(most, function (value, key) {
        authors = authors.concat({
            author: key,
            blogs: value
        })
    })
    var s = authors.sort((a, b) => parseFloat(b.blogs) - parseFloat(a.blogs));
    return s[0]
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}

