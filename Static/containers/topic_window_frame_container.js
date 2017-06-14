var Actions = require('../scripts/root_actions')
var React_Redux = require('react-redux');
var Topic_frame = require('../components/modules/topic_window_frame.jsx');
import {push} from 'react-router-redux';

const mapStateToProps = (state) => {
  return {
    isFetching:state.topics.isFetching,
    topic_list:state.topics.byId,
    topic_list_length: state.topics.allIds.length
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onToTopic:(topic_id)=>{
      dispatch(push(`/topic/${topic_id}`));
    },
    onToFetchTopics:(topic_list_length)=>{
      dispatch(Actions.fetchTopics(topic_list_length))
    }
  }
}

const topic_frame_app = React_Redux.connect(
 mapStateToProps,
 mapDispatchToProps
)(Topic_frame);

module.exports = topic_frame_app;
