const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
// 	const authorization = request.get("authorization");
// 	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
// 		return authorization.substring(7);
// 	}
// 	return null;
// };

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

blogsRouter.get("/:id", async (request, response) => {
	try {
		const blog = await Blog.findById(request.params.id).populate("user", {
			username: 1,
			name: 1,
		});
		response.json(blog);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post("/", async (request, response, next) => {
	try {
		const body = request.body;

		if (!body.title || !body.url) {
			return response.status(400).end();
		}

		// const token = getTokenFrom(request);
		// const decodedToken = jwt.verify(token, process.env.SECRET);

		const token = request.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}

		// const user = await User.findById(decodedToken.id);
		const user = request.user;

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
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
		const token = request.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}

		const id = request.params.id;
		const blogToDelete = await Blog.findById(id);

		const user = request.user;

		if (blogToDelete.user.toString() === user.id.toString()) {
			await Blog.findByIdAndRemove(id);
			response.status(204).end();
		} else {
			response.status(401).json({
				error: "you are not authorized to delete this blog",
			});
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put("/:id", async (request, response, next) => {
	try {
		const token = request.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}

		const blogToUpdate = await Blog.findById(request.params.id);
		const user = request.user;

		const blog = {
			title: request.body.title || blogToUpdate.title,
			author: request.body.author || blogToUpdate.author,
			url: request.body.url || blogToUpdate.url,
			likes: request.body.likes || blogToUpdate.likes,
		};

		if (blogToUpdate.user.toString() === user.id.toString()) {
			const updatedBlog = await Blog.findByIdAndUpdate(
				request.params.id,
				blog,
				{
					new: true,
				}
			);
			response.json(updatedBlog);
		} else {
			response.status(401).json({
				error: "you are not authorized to update this blog",
			});
		}
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
