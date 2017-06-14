var Actions = require('../root_actions');

export default function users(state = {
    isSignIn:false,
    me_info:{},
    byId:{},
    allIds:[],
    errInfo:'',
    onBoard_status:'disappear',
  },action)
  {
  switch (action.type) {
    case Actions.USER_ONBOARD:
      return {
        ...state,
        onBoard_status:action.command
      }

    case Actions.REQUEST_SIGN_IN:
      return {...state, fetching:true}

    case Actions.RECEIVE_SIGN_IN_SUCCESS:
      var updateUsers = updateUsersState({...state}, action.user_info)
      return {
        ...state,
        fetching:false,
        isSignIn:true,
        me_info:action.user_info[0],
        byId:updateUsers.byId,
        allIds:updateUsers.allIds,
        onBoard_status:'disappear'
      }

    case Actions.RECEIVE_SIGN_IN_FAIL:
      return {
        ...state,
        fetching:false,
        errInfo:action.errInfo
      }

    case Actions.REQUEST_COMMENT_USER:
      return {
        ...state,
        fetching:true
      }

    case Actions.RECEIVE_COMMENT_USER_SUCCESS:
      var updateUsers = updateUsersState({...state}, action.user_list)
      return {
        ...state,
        fetching:false,
        byId:updateUsers.byId,
        allIds:updateUsers.allIds    
      }

    default:
      return state
  }
}

function updateUsersState(prevState, user_list){
  for(var user of user_list){
    prevState.byId[user.user_id] = user
    if(prevState.allIds.indexOf(user.user_id)==-1){
      prevState.allIds.push(user.user_id);
    }
  }
  return{
    byId:prevState.byId,
    allIds:prevState.allIds
  }
}
