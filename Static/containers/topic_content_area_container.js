var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Topic_content_area = require('../components/modules/topic_content_area.jsx');
var Moment = require('moment')
import {push} from 'react-router-redux';

const mapStateToProps = (state, ownProps)=>{
  //here we abstract the relative story into current topic story_list,also the currentdate
  var update_topic_info = updateStoryList(state, ownProps.topic_id)
  return{
    isFetching:state.stories.isFetching,
    story_list:update_topic_info.story_list,
    story_list_length:state.stories.allIds.length,
    currentDate:update_topic_info.currentDate,
    date_prompt:state.topics.date_prompt,
    area_size:state.topics.area_size
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onToFetchStories:(topic_id)=>{
      dispatch(Actions.fetchStories(topic_id))
    },
    onToStoryContent:(storyId)=>{
      dispatch(push('/story/'+storyId))
    },
    onGettingSize:()=>{
      dispatch(Actions.onGettingSize())
    }
  }
}

const Topic_content_area_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
  // null,
  // { withRef: true }
)(Topic_content_area)

module.exports = Topic_content_area_app;


//Here we map the relative stories into current topic cotent
function updateStoryList(updateState, topic_id){
  var current_story_list = {}
  var currentDate = ''
  if(updateState.topics.byId.hasOwnProperty(topic_id)){
    updateState.topics.byId[topic_id].stories.map((value,index)=>{
      current_story_list[value] = updateState.stories.byId[value]
    })
    currentDate = updateState.topics.byId[topic_id].currentDate
  }
  return {
    story_list:current_story_list,
    currentDate: currentDate
  }
}
