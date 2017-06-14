var React = require('react');
var Top_bar = require('../fragments/top_bar.jsx');
var Onboard_root = require('../../containers/onboard_root_container');
var Topic_content_area = require('../../containers/topic_content_area_container')
import Upload_story_button from '../models/reuse_button.jsx';



class Topic_root extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(!this.props.topic_info){
      this.props.onToFetchCurrentTopic(this.props.match.params.topicId);
    }
  };

  componentDidMount(){
    var top_bar = document.getElementById('top_bar')
    top_bar.setAttribute('class','other_page');
    var home_back = document.getElementById('home_back')
    home_back.setAttribute('class','other_page')
  }

  render(){
    var topic_id = this.props.match.params.topicId
    return(
      <div id = 'topic_root' >
        <Topic_content_area topic_id={topic_id}/>
        <div onClick={()=>this.props.onToUploadStory(this.props.isSignIn, topic_id)}>
          <Upload_story_button ID='enter_upload_story' name='Your Story'/>
        </div>
        <Onboard_root class={this.props.onBoard_class}/>
      </div>
    )
  }
}

Topic_root.propTypes = {
  topic_id:React.PropTypes.number,
  topic_info:React.PropTypes.object,
  onToUploadStory: React.PropTypes.func.isRequired,
  onToFetchCurrentTopic:React.PropTypes.func.isRequired,
  isSignIn:React.PropTypes.bool.isRequired,
  onBoard_class:React.PropTypes.string.isRequired
}

Topic_root.defaultProps = {
  topic_id:null,
  topic_info:null,
  onToUploadStory:()=>{},
  onToFetchCurrentTopic:()=>{},
  isSignIn: null,
  onBoard_class:null
}

module.exports = Topic_root
