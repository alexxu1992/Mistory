var Actions = require('../root_actions');

export default function topics(state = {
  isFetching:false,
  byId:{},
  allIds:[],
  date_prompt:'disappear',
  area_size:{}
}, action)
{
  switch (action.type) {
    case Actions.REQUEST_TOPICS:
      return {...state, isFetching: true}

    case Actions.RECEIVE_TOPICS_SUCCESS:
      var updateTopicList = transTopicsDataIntoState({...state},action.topics_data);
      return {
        ...state,
        isFetching:false,
        byId: updateTopicList.byId,
        allIds: updateTopicList.allIds
      }

    case Actions.RECEIVE_CURRENT_TOPIC:
      var updateTopicList = transTopicsDataIntoState({...state},action.topic_info);
      return {
        ...state,
        byId: updateTopicList.byId,
        allIds: updateTopicList.allIds
      }


    case Actions.BIND_TOPIC_STORIES:
      var updateTopicList = bindStoriesIntoTopics({...state}, action.story_list)
      return{
        ...state,
        byId:updateTopicList.byId
      }

    case Actions.CHANGE_TOPIC_DATE:
      var updateTopicList = updateCurrentDate({...state}, action.topic_id, action.currentDate)
      return{
        ...state,
        byId: updateTopicList.byId,
        date_prompt:'appear'
      }

    case Actions.HIDE_PROMT:
      return{
        ...state,
        date_prompt:'disappear'
      }

    case Actions.GET_SIZE:
      var area_size = caculateSize();
      return{
        ...state,
        area_size:area_size
      }

    default:
      return state
  }
}


function transTopicsDataIntoState(prevState, topics_list){
  for(var topic of topics_list){
    var currentId = topic.topic_id
    prevState.byId[currentId] = topic;
    prevState.byId[currentId].stories = []
    prevState.byId[currentId].currentDate = topic.oldest_date
    prevState.allIds.push(currentId)
  }
  return {
    byId: prevState.byId,
    allIds:prevState.allIds
  }
}

function bindStoriesIntoTopics(prevState, story_list){
  for(var story of story_list){
    var topicId = story.story_in;
    prevState.byId[topicId].stories.push(story.story_id)
  }
  return{
    byId:prevState.byId
  }
}

function updateCurrentDate(prevState, topic_id, currentDate){
  prevState.byId[topic_id].currentDate = currentDate
  return {
    byId:prevState.byId
  }
}

function caculateSize(){
  var width = document.getElementById('topic_content_area').clientWidth;
  var height = document.getElementById('topic_content_area').clientHeight;
  return{
    width:width,
    height:height
  }
}
