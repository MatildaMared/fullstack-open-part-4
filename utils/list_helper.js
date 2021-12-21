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

module.exports = { dummy, totalLikes };
