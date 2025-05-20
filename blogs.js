const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const blogs = [
    { id: 1, title: 'Blog 1', content: 'Content of Blog 1' },
    { id: 2, title: 'Blog 2', content: 'Content of Blog 2' },
    { id: 3, title: 'Blog 3', content: 'Content of Blog 3' }
];
// Get all blogs
app.get('/blogs', (req, res) => {
    console.log(blogs);
    res.json(blogs);
});
// Get a blog by ID
app.get('/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id == req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    res.json(blog);
});
// Create a new blog
app.post('/blogs', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const id = blogs.length + 1;
    blogs.push({ id, title, content });
    res.status(201).json(blogs);
});
// Update a blog by ID
app.put('/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id == req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    res.json(blog);
});
// Delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
    const blogIndex = blogs.findIndex(b => b.id == req.params.id);
    if (blogIndex === -1) {
        return res.status(404).send('Blog not found');
    }
    blogs.splice(blogIndex, 1);
    res.status(204).send();
});
// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1 style="text-align:center; color:red;">Hello World!  </h1>
        <div style="text-align:center;">
            <button style="background-color:blue; color:white; margin:5px;" onclick="window.location.href='/blogs'">Blogs</button>
        </div>
    `);
});
// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});