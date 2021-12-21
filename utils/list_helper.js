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

// Returns the auther with the most blogs, like this:
//{
//  author: "Robert C. Martin",
//  blogs: 3
// }
const mostBlogs = (blogs) => {
	let authorBlogs = {};

	blogs.forEach((blog) => {
		console.log(blog.author);
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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
