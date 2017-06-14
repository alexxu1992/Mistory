const CONFIG = require('../../config/basic')
import {push} from 'react-router-redux';

var signIn_actions={
  USER_ONBOARD : 'USER_ONBOARD',
  REQUEST_SIGN_IN : 'REQUEST_SIGN_IN',
  RECEIVE_SIGN_IN_SUCCESS : 'RECEIVE_SIGN_IN_SUCCESS',
  RECEIVE_SIGN_IN_FAIL:'RECEIVE_SIGN_IN_FAIL',
  USER_SIGNIN : 'USER_SIGNIN',

  userOnboard: (command, mission)=>{
    return {
      type:signIn_actions.USER_ONBOARD,
      command: command,
      mission:mission
    }
  },

  requestSignIn:()=>{
    return {
      type:signIn_actions.REQUEST_SIGN_IN
    }
  },

  receiveSignInSuccess:(user_info)=>{
    return {
      type:signIn_actions.RECEIVE_SIGN_IN_SUCCESS,
      user_info:user_info
    }
  },

  receiveSignInFail:(err_info)=>{
    return {
      type:signIn_actions.RECEIVE_SIGN_IN_FAIL,
      err_info:err_info
    }
  },

  userSignIn: (signIn_data)=>{
    return (dispatch)=>{
      dispatch(signIn_actions.requestSignIn());
      var option = {
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(signIn_data)
      }
      return fetch(CONFIG.SERVER_URL + '/user/signin',option)
      .then(res => res.json())
      .then(data=>{
        if(data.hasOwnProperty('err')){
          dispatch(signIn_actions.receiveSignInFail(data.err))
        }else {
          dispatch(signIn_actions.receiveSignInSuccess(data))
        }
      })
    }
  }
}

var comment_user_actions={
  REQUEST_COMMENT_USER:'REQUEST_COMMENT_USER',
  RECEIVE_COMMENT_USER_SUCCESS:'RECEIVE_COMMENT_USER_SUCCESS',
  RECEIVE_COMMENT_USER_FAIL:'RECEIVE_COMMENT_USER_FAIL',
  FETCH_COMMENT_USERS:'COMMENT_USERS',

  requestCommentUser:()=>{
    return {
      type:comment_user_actions.REQUEST_COMMENT_USER
    }
  },

  receiveCommentUserSuccess:(user_list)=>{
    return{
      type:comment_user_actions.RECEIVE_COMMENT_USER_SUCCESS,
      user_list:user_list
    }
  },

  receiveCommentUserFail:(errInfo)=>{
    return{
      type:comment_user_actions,RECEIVE_COMMENT_USER_FAIL,
      err:errInfo
    }
  },

  fetchCommentUsers:(userId_list)=>{
    return (dispatch)=>{
      dispatch(comment_user_actions.requestCommentUser())
      var option = {
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(userId_list)
      }
      return fetch(CONFIG.SERVER_URL+'/user/comment_users',option)
      .then(res=>res.json())
      .then(data=>{
        //here receive comment users
        dispatch(comment_user_actions.receiveCommentUserSuccess(data))
      })
    }
  }


}


const users_actions = {
  ...signIn_actions,
  ...comment_user_actions
}

module.exports = users_actions
