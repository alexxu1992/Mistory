var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions')
var User_comment_area = require('../components/fragments/user_comment_area.jsx');

const mapStateToProps = (state,ownProps)=>{
  var update_info = theUpdatedInfo(state,ownProps);
  return{
    isSignIn:state.users.isSignIn,
    me_id:update_info.me_id,
    story_by:update_info.story_by
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    submitComment:(comment_info, comment_content)=>{
      dispatch(Actions.submitComment(comment_info,comment_content))
    },
    onBoard:(command)=>{
      dispatch(Actions.userOnboard(command))
    }
  }
}

const User_comment_area_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(User_comment_area)

module.exports = User_comment_area_app

function theUpdatedInfo(state, ownProps){
  var me_id = 1;
  var story_by = 1;
  if(state.users.me_info.hasOwnProperty('user_id')){
    me_id = state.users.me_info.user_id
  }
  if(state.stories.byId.hasOwnProperty(ownProps.story_id)){
    story_by = state.stories.byId[ownProps.story_id].story_by
  }

  return{
    me_id:me_id,
    story_by:story_by
  }
}
