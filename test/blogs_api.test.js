const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 12,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("viewing all blogs", () => {
	test("correct amount of blogs are returned as json", async () => {
		const response = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body).toHaveLength(initialBlogs.length);
	});

	test("returned blogs have an id property", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body[0].id).toBeDefined();
	});
});

describe("creating a new blog", () => {
	test("a new blog is added correctly", async () => {
		const newBlog = {
			title: "My first blog",
			author: "Matilda Mared",
			url: "http://url.com",
			likes: 10,
		};

		const blogResponse = await await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const allBlogs = await api.get("/api/blogs");
		expect(allBlogs.body).toHaveLength(initialBlogs.length + 1);

		const blogIds = allBlogs.body.map((blog) => blog.id);
		expect(blogIds).toContain(blogResponse.body.id);
	});

	test("likes property defaults to 0 if missing", async () => {
		const newBlog = {
			title: "My first blog",
			author: "Matilda Mared",
			url: "http://url.com",
		};

		const blogResponse = await await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		expect(blogResponse.body.likes).toBe(0);
	});

	test("fails with status code 400 if title is missing", async () => {
		const newBlog = {
			author: "Matilda Mared",
			url: "http://url.com",
			likes: 5,
		};

		const blogResponse = await await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(400);
	});

	test("fails with status code 400 if url is missing", async () => {
		const newBlog = {
			title: "My first blog post",
			author: "Matilda Mared",
			likes: 5,
		};

		const blogResponse = await await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(400);
	});
});

describe("removing a blog", () => {
	test("succeeds with status code 204 if the id is valid", async () => {
		const allBlogs = await api.get("/api/blogs");
		const blogToDelete = allBlogs.body[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAfterDeleting = await api.get("/api/blogs");
		expect(blogsAfterDeleting.body).toHaveLength(initialBlogs.length - 1);
	});
});

describe("updating a blog", () => {
	test("succeeds with status code 200 if the id is valid", async () => {
		const allBlogs = await api.get("/api/blogs");
		const blogToUpdate = allBlogs.body[0];

		const newBlog = {
			title: "Updated title",
			likes: 25,
		};

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200);

		const updatedBlogs = await api.get("/api/blogs");
		expect(updatedBlogs.body[0].title).toEqual(newBlog.title);
		expect(updatedBlogs.body[0].likes).toEqual(newBlog.likes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
