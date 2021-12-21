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

module.exports = { dummy, totalLikes, favoriteBlog };
