const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post("/", async (request, response, next) => {
	try {
		const blog = new Blog({
			title: request.body.title,
			author: request.body.author,
			url: request.body.url,
			likes: request.body.likes || 0,
		});

		const savedBlog = await blog.save();

		response.status(201).json(savedBlog);
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
