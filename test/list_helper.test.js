const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
];

const listWithSeveralBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

describe("favorite blog", () => {
	test("when list has only one blog returns object with that blog", () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);

		const expectedResult = {
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			likes: 5,
		};

		expect(result).toEqual(expectedResult);
	});

	test("when list has many blogs, returns single object of the blog with the most likes", () => {
		const result = listHelper.favoriteBlog(listWithSeveralBlogs);

		const expectedResult = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		};

		expect(result).toEqual(expectedResult);
	});
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = listHelper.totalLikes([]);

		expect(result).toBe(0);
	});

	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);

		expect(result).toBe(5);
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(listWithSeveralBlogs);

		expect(result).toBe(48);
	});
});

describe("most blogs", () => {
	test("of single blog is that blogs author", () => {
		const result = listHelper.mostBlogs(listWithOneBlog);

		const expectedResult = {
			author: "Edsger W. Dijkstra",
			blogs: 1,
		};

		expect(result).toEqual(expectedResult);
	});

	test("of array of blogs returns the correct author", () => {
		const result = listHelper.mostBlogs(listWithSeveralBlogs);

		const expectedResult = {
			author: "Robert C. Martin",
			blogs: 3,
		};

		expect(result).toEqual(expectedResult);
	});
});

describe("most likes", () => {
	test("of single blog is that blogs likes and author", () => {
		const result = listHelper.mostLikes(listWithOneBlog);

		const expectedResult = {
			author: "Edsger W. Dijkstra",
			likes: 5,
		};

		expect(result).toEqual(expectedResult);
	});

	test("of array returns the correct answer with total likes and author", () => {
		const result = listHelper.mostLikes(listWithSeveralBlogs);

		const expectedResult = {
			author: "Robert C. Martin",
			likes: 24,
		};

		expect(result).toEqual(expectedResult);
	});
});

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);

	expect(result).toBe(1);
});
