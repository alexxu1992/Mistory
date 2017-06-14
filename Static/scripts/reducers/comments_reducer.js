var Actions = require('../root_actions');

export default function comments(state={
  isFetching:false,
  byId:{},
  allIds:[]
},action){
  switch (action.type) {
    case Actions.REQUEST_COMMENTS:
      return{
        ...state,
        isFetching:true
      }

    case Actions.RECEIVE_COMMENTS_SUCCESS:
      var updateCommentList = transCommentsIntoState({...state},action.comments_list)
      return{
        ...state,
        byId:updateCommentList.byId,
        allIds:updateCommentList.allIds
      }

    case Actions.SUBMITCOMMENTSUCCESS:
      return{
        ...state
      }


    default:
      return state
  }
}

function transCommentsIntoState(prevState, comments_list){
  for(var comment of comments_list){
    var comment_id = comment.comment_id;
    prevState.byId[comment_id] = comment
    if(prevState.allIds.indexOf(comment_id)==-1){
      prevState.allIds.push(comment_id)
    }
  }

  return {
    byId:prevState.byId,
    allIds:prevState.allIds
  }
}
