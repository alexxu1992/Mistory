var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions')
var Story_comment_area_root = require('../components/modules/story_comment_area_root.jsx');

const mapStateToProps = (state,ownProps)=>{
  var commentsInfo = updateComments(state, ownProps.story_id);
  return{
    comment_list:commentsInfo.comment_list,
    comment_list_length:commentsInfo.comment_list_length
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchComments:(story_id)=>{
      dispatch(Actions.fetchComments(story_id))
    }
  }
}

const Story_comment_area_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Story_comment_area_root)

module.exports = Story_comment_area_root_app

function updateComments(state, story_id){
  var comment_list = {}
  var comment_list_length = 0;
  // var comment_user_list = {};
  if(state.stories.byId.hasOwnProperty(story_id)){
    for(var comment_id of state.stories.byId[story_id].comments){
      comment_list[comment_id] = state.comments.byId[comment_id]
      if(state.users.byId.hasOwnProperty(comment_list[comment_id].comment_by)){
        var comment_user = state.users.byId[comment_list[comment_id].comment_by]
        comment_list[comment_id].user_name = comment_user.user_name
        comment_list[comment_id].selfie_src = comment_user.user_selfie
      }
    }
    comment_list_length = state.stories.byId[story_id].comments.length
  }

  return {
    comment_list:comment_list,
    comment_list_length:comment_list_length
  }
}
