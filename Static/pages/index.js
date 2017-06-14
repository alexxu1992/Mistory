//This file is the entry file for the main page
var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var React_Redux = require('react-redux');
var Redux_Logger = require('redux-logger');
var Redux_Thunk = require('redux-thunk').default;
import { BrowserRouter, Route, Link} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

var Actions = require('../scripts/root_actions');
var root_reducer = require('../scripts/root_reducer');

var Main_page = require('../containers/main_page_container');
var Topic_page = require('../containers/topic_page_root_container');
var Upload_story_page = require('../containers/upload_story_root_container');
var User_page = require('../containers/user_page_root_container');
var Story_page = require('../containers/story_page_root_container')
var Top_bar = require('../containers/top_bar_container');
//var Selfie_entrance = require('../components/fragments/selfie_entrance.jsx');

require('../styles/root_style.scss');

//create a history of choosing
const history = createHistory();
//create store with middleware
const routeMiddleware  = routerMiddleware(history)
const loggerMiddleware = Redux_Logger.createLogger();
const store = Redux.createStore(
  root_reducer,
  Redux.applyMiddleware(
    loggerMiddleware,
    Redux_Thunk,
    routeMiddleware
  )
);


//wrap the main_app with Provider
ReactDOM.render(
  <React_Redux.Provider store = {store}>
    <ConnectedRouter history = {history}>
      <div>
          {/* <Top_bar class = 'other_page'/> */}
          <Route path='/' component = {Top_bar} />
          <Route exact path = '/' component = {Main_page} />
          <Route path='/topic/:topicId' component = {Topic_page} />
          <Route path='/upload/:topicId' component = {Upload_story_page} />
          <Route exact path='/story/:storyId' component = {Story_page}/>
          <Route path='/user/:userId' component = {User_page}/>
     </div>
   </ConnectedRouter>
  </React_Redux.Provider>,
  document.getElementById('root')
)
