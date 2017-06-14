var React = require('react');
var Head_frame = require('../models/story_head_frame.jsx');
var Story_content = require('../models/story_content_area.jsx');
var Story_comment_area = require('../../containers/story_comment_area_root_container')
var User_comment_area = require('../../containers/user_comment_container')
var Onboard_root = require('../../containers/onboard_root_container')


class Story_page_root extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.onFetchStory(this.props.match.params.storyId)
  }

  componentDidMount(){
    var top_bar = document.getElementById('top_bar')
    top_bar.setAttribute('class','main_page');
    var home_back = document.getElementById('home_back')
    home_back.setAttribute('class','main_page')
  }

  render(){
    return(
      <div>
        <div id = 'story_page_main'>
           <Head_frame src={this.props.story_info.story_material}/>
           <Story_content textBody={this.props.story_info.story_content}/>
           <Story_comment_area story_id={this.props.match.params.storyId}/>
           <User_comment_area story_id={this.props.match.params.storyId}/>
        </div>
        <Onboard_root class = {this.props.onBoard_status}/>
      </div>
    )
  }
}

Story_page_root.propTypes = {
  onBoard_status:React.PropTypes.string.isRequired,
  onFetchStory:React.PropTypes.func.isRequired,
  story_info:React.PropTypes.object.isRequired
}

Story_page_root.defaultProps = {
  onBoard_status:'disappear',
  onFetchStory:()=>{},
  story_info:{}
}

module.exports = Story_page_root
