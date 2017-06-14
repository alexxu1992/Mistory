const CONFIG = require('../../config/basic')
import {push} from 'react-router-redux';

const topics_actions = {
  REQUEST_TOPICS:'REQUEST_TOPICS',
  RECEIVE_TOPICS_SUCCESS:'RECEIVE_TOPICS_SUCCESS',
  RECEIVE_TOPICS_FAILURE:'RECEIVE_TOPICS_FAILURE',
  RECEIVE_CURRENT_TOPIC:'RECEIVE_CURRENT_TOPIC',
  BIND_TOPIC_STORIES:'BIND_TOPIC_STORIES',
  CHANGE_TOPIC_DATE:'CHANGE_TOPIC_DATE',
  HIDE_PROMT:'HIDE_PROMT',
  GET_SIZE:'GET_SIZE',

  requestTopics:()=>{
    return {
      type:topics_actions.REQUEST_TOPICS
    }
  },

  receiveTopics:(receiveTopics)=>{
    return {
      type:topics_actions.RECEIVE_TOPICS_SUCCESS,
      topics_data: receiveTopics
    }
  },

  fetchTopics:(current_list_length)=>{
    console.log(CONFIG.SERVER_URL);
    return (dispatch) => {
      dispatch(topics_actions.requestTopics());
      var option = {method:'GET'}
      return fetch(CONFIG.SERVER_URL + `/topic/fetchTopics/${current_list_length}`,option)
      .then(response => response.json())
      .then(data => {
        setTimeout(()=>{
          dispatch(topics_actions.receiveTopics(data))
        },500)
        // dispatch(topics_actions.receiveTopics(data))
      })
    }
  },

  receiveCurrentTopic:(topic_info)=>{
    return{
      type:topics_actions.RECEIVE_CURRENT_TOPIC,
      topic_info:topic_info
    }
  },

  fetchCurrentTopic:(topicId)=>{
    return (dispatch)=>{
      var option = {method:'GET'}
      return fetch(CONFIG.SERVER_URL + `/topic/fetchCurrentTopic/${topicId}`,option)
      .then(response => response.json())
      .then(data => {
        dispatch(topics_actions.receiveCurrentTopic(data))
      })
    }
  },

  bindTopicStories:(story_list)=>{
    return {
      type:topics_actions.BIND_TOPIC_STORIES,
      story_list:story_list
    }
  },

  changeTopicDate:(topic_id, currentDate)=>{
    return {
      type:topics_actions.CHANGE_TOPIC_DATE,
      topic_id:topic_id,
      currentDate: currentDate
    }
  },

  hidePromt:()=>{
    return{
      type:topics_actions.HIDE_PROMT
    }
  },

  onGettingSize:()=>{
    return{
      type:topics_actions.GET_SIZE
    }
  }


}

module.exports = topics_actions;
