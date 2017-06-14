var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Upload_story_root  =require('../components/modules/upload_story_root.jsx');

const mapStateToProps = (state)=>{
  var update_data = updateData(state)
  return {
    isSignIn:state.users.isSignIn,
    onBoard_class:state.users.onBoard_status,
    user_info:update_data.user_info
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onUploadStory:(story_info)=>{
      dispatch(Actions.uploadStory(story_info))
    },
    onBoard:()=>{
      dispatch(Actions.userOnboard('appear'));
    }
  }
}

const Upload_story_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload_story_root);

module.exports = Upload_story_root_app

function updateData(state){
  var user_info = {}
  if(state.users.me_info.hasOwnProperty('user_id')){
    user_info = state.users.me_info
  }
  return{
    user_info:user_info
  }
}
