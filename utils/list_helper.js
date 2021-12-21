const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let totalLikesSum = 0;
	blogs.forEach((blog) => {
		totalLikesSum += blog.likes;
	});
	return totalLikesSum;
};

const favoriteBlog = (blogs) => {
	const arrayOfLikes = blogs.map((blog) => {
		return blog.likes;
	});

	const maxLikes = Math.max(...arrayOfLikes);
	const indexOfMaxLikes = arrayOfLikes.indexOf(maxLikes);

	const favoriteBlog = {
		title: blogs[indexOfMaxLikes].title,
		author: blogs[indexOfMaxLikes].author,
		likes: blogs[indexOfMaxLikes].likes,
	};

	return favoriteBlog;
};

// Exercise 4.6 - Returns the auther with the most blogs
const mostBlogs = (blogs) => {
	let authorBlogs = {};

	blogs.forEach((blog) => {
		if (authorBlogs[blog.author]) {
			authorBlogs[blog.author] += 1;
		} else {
			authorBlogs[blog.author] = 1;
		}
	});

	let arrayOfAuthors = Object.entries(authorBlogs);

	let max = Math.max(
		...arrayOfAuthors.map((item) => {
			return item[1];
		})
	);

	let index = arrayOfAuthors.findIndex((item) => {
		return item[1] === max;
	});

	let result = {
		author: arrayOfAuthors[index][0],
		blogs: arrayOfAuthors[index][1],
	};

	return result;
};

// Exercise 4.7 - Returns the auther with the most likes
const mostLikes = (blogs) => {
	let authorLikes = {};

	blogs.forEach((blog) => {
		if (authorLikes[blog.author]) {
			authorLikes[blog.author] += blog.likes;
		} else {
			authorLikes[blog.author] = blog.likes;
		}
	});

	let arrayOfAuthors = Object.entries(authorLikes);

	let max = Math.max(
		...arrayOfAuthors.map((item) => {
			return item[1];
		})
	);

	let index = arrayOfAuthors.findIndex((item) => {
		return item[1] === max;
	});

	let result = {
		author: arrayOfAuthors[index][0],
		likes: arrayOfAuthors[index][1],
	};

	return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
