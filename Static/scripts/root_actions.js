var users_actions = require('./actions/users_actions')
var topics_actions = require('./actions/topics_actions')
var stories_actions = require('./actions/stories_actions')
var comments_actions = require('./actions/comments_actions')


const root_actions = {
  ...users_actions,
  ...topics_actions,
  ...stories_actions,
  ...comments_actions
}

module.exports = root_actions;
