const CONFIG = require('../../config/basic')
import {push} from 'react-router-redux';
var stories_actions = require('./stories_actions');
var users_actions = require('./users_actions')

const receiveCommentsActions = {
  REQUEST_COMMENTS:'REQUEST_COMMENTS',
  RECEIVE_COMMENTS_SUCCESS:'RECEIVE_COMMENTS_SUCCESS',
  RECEIVE_COMMENTS_FAILURE:'RECEIVE_COMMENTS_FAILURE',

  requestComments:()=>{
    return{
      type:comments_actions.REQUEST_COMMENTS
    }
  },

  receiveCommentsSuccess:(comments_list)=>{
    return{
      type:comments_actions.RECEIVE_COMMENTS_SUCCESS,
      comments_list:comments_list
    }
  },

  fetchComments:(story_id)=>{
    return (dispatch)=>{
      dispatch(comments_actions.requestComments());
      var option = {method:'GET'}
      return fetch(CONFIG.SERVER_URL+`/comments/${story_id}`,option)
      .then(response => response.json())
      .then((data)=>{
        var comment_user_ids = [];
        for(var comment of data ){
          comment_user_ids.push(comment.comment_by)
        }
        if(data.length>0){
          dispatch(users_actions.fetchCommentUsers(comment_user_ids));
        }
        dispatch(comments_actions.receiveCommentsSuccess(data))
        dispatch(stories_actions.bindCommentsStory(data))

      })
    }
  }
}

const submitCommentActions = {
  SUBMITCOMMENTREQUEST:'SUBMITCOMMENTREQUEST',
  SUBMITCOMMENTSUCCESS:'SUBMITCOMMENTSUCCESS',
  SUBMITCOMMENTFAIL:'SUBMITCOMMENTFAIL',

  submitCommentRequest:()=>{
    return{
      type:comments_actions.SUBMITCOMMENTREQUEST,
    }
  },

  submitCommentSuccess:()=>{
    return {
      type:comments_actions.SUBMITCOMMENTSUCCESS
    }
  },

  submitCommentFail:(errInfo)=>{
    return{
      type:comments_actions.SUBMITCOMMENTFAIL,
      err:errInfo
    }
  },

  submitComment:(comment_info, comment_content)=>{
    return (dispatch)=>{
      dispatch(comments_actions.submitCommentRequest())
      var comment_obj = {
        info:comment_info,
        content:comment_content
      }
      var option={
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(comment_obj)
      }
      return fetch(CONFIG.SERVER_URL + '/upload/comment',option)
      .then(res => res.json())
      .then(data=>{
        if(data.status == 'success'){
          dispatch(comments_actions.fetchComments(comment_info.comment_in))
          dispatch(comments_actions.submitCommentSuccess())
        }
        else if(data.status=='err'){
          console.log(data.status.err);
          dispatch(comments_actions.submitCommentFail(data.status.err))
        }
      })
    }
  }


}

const comments_actions = {
  ...receiveCommentsActions,
  ...submitCommentActions

}

module.exports = comments_actions
