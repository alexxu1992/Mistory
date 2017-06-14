var Redux = require('redux');
var Actions = require('./root_actions');
import{routerReducer} from 'react-router-redux'

import users from './reducers/users_reducer.js'
import topics from './reducers/topics_reducer'
import stories from './reducers/stories_reducer'
import comments from './reducers/comments_reducer'


//Here we define the root state tree
const root_reducer = Redux.combineReducers({
  users,
  topics,
  stories,
  comments,
  router:routerReducer
})

module.exports = root_reducer;
