const CONFIG = require('../../config/basic')
import {push} from 'react-router-redux';
var topic_actions = require('./topics_actions')

const fetch_stories_actions = {
  REQUEST_STORIES:'REQUEST_STORIES',
  RECEIVE_STORIES_SUCCESS:'RECEIVE_STORIES_SUCCESS',
  RECEIVE_STORIES_FAILURE:'RECEIVE_STORIES_FAILURE',

  requestStories:()=>{
    return{
      type:stories_actions.REQUEST_STORIES
    }
  },

  receiveStoriesSuccess:(stories_data)=>{
    return {
      type:stories_actions.RECEIVE_STORIES_SUCCESS,
      new_stories:stories_data
    }
  },

  fetchStories:(topic_id)=>{
    return (dispatch) => {
      dispatch(stories_actions.requestStories())
      var option = {method:'GET'}
      return fetch(CONFIG.SERVER_URL + `/story/fetchStoryList/${topic_id}` , option)
      .then(response => response.json())
      .then((data) => {
        dispatch(stories_actions.receiveStoriesSuccess(data))
        //here we send the data to topic for binding the data
        dispatch(topic_actions.bindTopicStories(data))
      })
    }
  }
}

const fetch_story_actions = {

  REQUEST_STORY:'REQUEST_STORY',
  RECEIVE_STORY_SUCCESS:'RECEIVE_STORY_SUCCESS',
  RECEIVE_STORY_FAILURE:'RECEIVE_STORY_FAILURE',
  BIND_COMMENTS_STORY:'BIND_COMMENTS_STORY',

  requestStory:()=>{
    return {
      type:stories_actions.REQUEST_STORY
    }
  },

  receiveStorySuccess:(story_info)=>{
    return{
      type:stories_actions.RECEIVE_STORY_SUCCESS,
      story_info:story_info
    }
  },

  fetchStory:(story_id)=>{
    return (dispatch)=>{
      dispatch(stories_actions.requestStory())
      var option = {method:'GET'}
      return fetch(CONFIG.SERVER_URL + `/story/fetchStory/${story_id}`,option)
      .then(response=>response.json())
      .then((data)=>{
        dispatch(stories_actions.receiveStorySuccess(data))
      })
    }
  },

  bindCommentsStory:(comments_list)=>{
    return{
      type:stories_actions.BIND_COMMENTS_STORY,
      comments_list:comments_list
    }
  }
}

const upload_story_actions = {
  REQUEST_UPLOAD:'REQUEST_UPLOAD',
  UPLOAD_SUCCESS:'UPLOAD_SUCCESS',
  UPLOAD_FAIL:'UPLOAD_FAIL',

  requestUpload:()=>{
    return {
      type:stories_actions.REQUEST_UPLOAD
    }
  },

  uploadSuccess:()=>{
    return{
      type:stories_actions.UPLOAD_SUCCESS
    }
  },

  uploadFail:()=>{
    return{
      type:stories_actions.UPLOAD_FAIL
    }
  },

  uploadStory:(story_info)=>{
    return (dispatch)=>{
      dispatch(stories_actions.requestUpload())
      var data = new FormData();
      var material_data = story_info.story_material
      data.append('material', material_data);
      delete story_info.story_material;
      data.append('meta_info', JSON.stringify(story_info))
      //data.append('meta_info', 'helloname')
      var option = {
        method:'POST',
        body:data
      }
      return fetch(CONFIG.SERVER_URL + '/upload/story', option)
      .then(res=>res.json())
      .then(data=>{
        console.log(data.status);
        if(data.status == 'success'){
          setTimeout(()=>{
            dispatch(topic_actions.fetchCurrentTopic(story_info.story_in));
            dispatch(stories_actions.fetchStories(story_info.story_in))
            dispatch(push(`/topic/${story_info.story_in}`))
          },1000)
        }
      })
    }
  }
}

const stories_actions = {
  ...fetch_stories_actions,
  ...fetch_story_actions,
  ...upload_story_actions
}

module.exports = stories_actions
