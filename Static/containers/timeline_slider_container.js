var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Timeline_slider = require('../components/fragments/timeline_slider.jsx');

const mapStateToProps = (state,ownProps)=>{
  var timeStamp = grabTimeStamp(state,ownProps.topic_id);
  return {
    timeline_latest_date:timeStamp.latest_date,
    timeline_oldest_date:timeStamp.oldest_date,
    timeline_current_date:timeStamp.current_date
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onChangeDate:(topic_id, currentDate)=>{
      dispatch(Actions.changeTopicDate(topic_id,currentDate))
    },
    onHidePromt:()=>{
      dispatch(Actions.hidePromt())
    }
  }
}

const Timeline_slider_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline_slider)

module.exports = Timeline_slider_app

function grabTimeStamp(state, topic_id){
  var time_stamp = {
    latest_date : '',
    oldest_date : '',
    current_date: ''
  }
  if(state.topics.byId.hasOwnProperty(topic_id)){
    time_stamp.latest_date = state.topics.byId[topic_id].latest_date;
    time_stamp.oldest_date = state.topics.byId[topic_id].oldest_date;
    time_stamp.current_date = state.topics.byId[topic_id].currentDate;
  }
  return time_stamp
}
