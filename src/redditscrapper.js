const conf = require("../etc/config.json")
const snoowrap = require('snoowrap');

const requester = new snoowrap({
  userAgent: conf.userAgent,
  clientId: conf.clientId,
  clientSecret: conf.clientSecret,
  username: conf.username,
  password: conf.password
});

async function scrapeSubreddit() {

  const subreddit = await requester.getSubreddit('manga');
  const newPost = await subreddit.getNew();

  let data = [];

  newPost.forEach(post => {
    if (post.link_flair_text.startWith == "DISC")
      data.push({
        title: post.title,
        url: post.url,
        createdAt: post.created_utc,
      })
  });

  return data;
};

module.exports = {
  scrapeSubreddit
}
