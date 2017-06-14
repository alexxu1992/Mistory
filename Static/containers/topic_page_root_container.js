var Actions = require('../scripts/root_actions');
var React_Redux = require('react-redux');
var Topic_root = require('../components/modules/topic_page_root.jsx')
import {push} from 'react-router-redux';

const mapStateToProps = (state,ownProps)=>{
  var topic_id = ownProps.match.params.topicId;
  //console.log(state.topics.byId[topic_id]);
  return {
    topic_info:state.topics.byId[topic_id],
    onBoard_class:state.users.onBoard_status,
    isSignIn:state.users.isSignIn
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onToUploadStory:(isSignIn,topicId)=>{
      dispatch(push(`/upload/${topicId}`))
    },
    onToFetchCurrentTopic:(topicId)=>{
      dispatch(Actions.fetchCurrentTopic(topicId));
    }
  }
}

const topic_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic_root);

module.exports = topic_root_app
