const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	try {
		const blogs = await Blog.find({}).populate("user", {
			username: 1,
			name: 1,
		});
		response.json(blogs);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post("/", async (request, response, next) => {
	try {
		if (!request.body.title || !request.body.url) {
			return response.status(400).end();
		}

		const user = await User.findOne({});

		const blog = new Blog({
			title: request.body.title,
			author: request.body.author,
			url: request.body.url,
			likes: request.body.likes || 0,
			user: user._id,
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.delete("/:id", async (request, response, next) => {
	try {
		const id = request.params.id;
		await Blog.findByIdAndRemove(id);
		response.status(204).end();
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put("/:id", async (request, response, next) => {
	const blogToUpdate = await Blog.findById(request.params.id);

	const blog = {
		title: request.body.title || blogToUpdate.title,
		author: request.body.author || blogToUpdate.author,
		url: request.body.url || blogToUpdate.url,
		likes: request.body.likes || blogToUpdate.likes,
	};

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
			new: true,
		});
		response.json(updatedBlog);
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
