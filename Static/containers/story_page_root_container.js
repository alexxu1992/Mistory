var React_Redux = require('react-redux')
var Actions = require('../scripts/root_actions')
var Story_page_root = require('../components/modules/story_page_root.jsx')

const mapStateToProps = (state,ownProps)=>{
  //console.log(state.stories.byId[ownProps.match.params.storyId]);
  return{
    onBoard_status:state.users.onBoard_status,
    story_info:state.stories.byId[ownProps.match.params.storyId]
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onFetchStory:(storyId)=>{
      dispatch(Actions.fetchStory(storyId))
    }
  }
}

const Story_page_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Story_page_root)

module.exports = Story_page_root_app
