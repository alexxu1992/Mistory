var Actions = require('../root_actions');

export default function stories(state = {
  isFetching:false,
  byId:{},
  allIds:[]
},action){
  switch (action.type) {
    case Actions.REQUEST_STORIES:
      return{
        ...state,
        isFetching:true
      }

    case Actions.RECEIVE_STORIES_SUCCESS:
      var updateStoriesList = transStoriesDataIntoState({...state}, action.new_stories);
      return{
        ...state,
        isFetching:false,
        byId:updateStoriesList.updateStories,
        allIds:updateStoriesList.updateIds
      }

    case Actions.REQUEST_STORY:
      return{
        ...state,
        isFetching:true
      }

    case Actions.RECEIVE_STORY_SUCCESS:
      var updateStoryInfo = transStoriesDataIntoState({...state}, action.story_info);
      return{
        ...state,
        isFetching:false,
        byId:updateStoryInfo.updateStories,
        allIds:updateStoryInfo.updateIds
      }

    case Actions.BIND_COMMENTS_STORY:
      //console.log(action.comments_list);
      var updateStoryInfo = bindCommentsStory({...state}, action.comments_list)
      return{
        ...state,
        byId:updateStoryInfo.byId
      }


    default:
      return state
  }
}

function transStoriesDataIntoState(prevState, stories_list){
  for(var story of stories_list){
    prevState.byId[story.story_id] = story;
    if(prevState.allIds.indexOf(story.story_id)==-1){
      prevState.allIds.push(story.story_id);
    }
    var top_percent = Math.random();
    prevState.byId[story.story_id].top_percent = top_percent;
    prevState.byId[story.story_id].comments = [];
  }
  return{
    updateStories: prevState.byId,
    updateIds:prevState.allIds
  }
}

function bindCommentsStory(prevState, comments_list){
  for(var comment of comments_list){
    var story_id = comment.comment_in;
    if(prevState.byId[story_id].comments.indexOf(comment.comment_id)==-1){
      prevState.byId[story_id].comments.push(comment.comment_id)
    }
  }
  return {
    byId:prevState.byId
  }
}
