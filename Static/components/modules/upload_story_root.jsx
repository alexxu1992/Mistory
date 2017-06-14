var React = require('react');
var Top_bar = require('../../containers/top_bar_container');
var Fontawesome = require('react-fontawesome');
var Onboard_root = require('../../containers/onboard_root_container');
var FileInput = require('react-file-input');
var Date_Picker = require('../models/date_picker.jsx');
var Content_input = require('../models/content_input.jsx');
var FinishButotn = require('../models/reuse_button.jsx');
var Moment = require('moment');
import { EditorState, ContentState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class Upload_story_root extends React.Component {
  constructor(props) {
    super(props)
    this.assembleInfo = this.assembleInfo.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    this.state = {
      story_material:null
    }
  }

  componentDidMount(){
    var top_bar = document.getElementById('top_bar')
    top_bar.setAttribute('class','main_page');
    var home_back = document.getElementById('home_back')
    home_back.setAttribute('class','main_page')
  }

  handleClick(event){
    switch (event.target.id) {
      case 'finish_story':
        if(this.props.isSignIn){
          var story_info = this.assembleInfo()
          this.props.onUploadStory(story_info)
        }else{
          this.props.onBoard()
        }
        break;

      case 'cover_upload_button':
        this.refs['file_input'].click();
        break;

      case 'story_cover':
        this.refs['file_input'].click();
        break;

      default:
        break;
    }
  }

  handleFiles(event){
    var files = event.target.files
    if(files && files[0]){
      if(files[0].type.indexOf('image')!=-1){
        var reader = new FileReader();
        reader.onload = function(e){
          var img = document.getElementById('story_cover');
          img.setAttribute('class','img_appear')
          img.setAttribute('src',e.target.result);
          // this.setState({
          //   ...this.state,
          //   story_material:e.target.result
          // })
        }.bind(this)
        reader.readAsDataURL(files[0])
      }

      this.setState({
        ...this.state,
        story_material:files[0]
      })
    }
  }

  assembleInfo(){
    var story_in = this.props.match.params.topicId
    var story_by = this.props.user_info.user_id
    var story_material = this.state.story_material
    var story_content = stateToHTML(this.refs['story_content'].state.editorState.getCurrentContent());
    var story_happen_date = this.refs['date_picker'].refs['date_picker'].value + ' 00:00:00'
    var story_post_date = Moment(new Date()).format();
    story_post_date = story_post_date.split('T')[0] + ' ' + story_post_date.split('T')[1].split('-')[0]
    // console.log(story_material);
    var story_info = {
      story_in:story_in,
      story_by:story_by,
      story_material:story_material,
      story_content:story_content,
      story_happen_date:story_happen_date,
      story_post_date:story_post_date
    }
    return story_info
  }

  render(){
    return (
      <div id = 'Upload_story_root' onClick={(event)=>this.handleClick(event)}>
        <div id = 'upload_image_frame'>
           <input type='file'
             name='story_cover'
             accept='.png,.jpg'
             ref={'file_input'}
             onChange={this.handleFiles}
             multiple></input>
           <Fontawesome id='cover_upload_button' name = 'plus' className = 'upload_button'/>
           <img id='story_cover' className='img_disappear'/>
        </div>
        <Date_Picker ref={'date_picker'}/>
        <Content_input name='story_input' holder='Telling story here...' ref={'story_content'}/>
        <FinishButotn ID = 'finish_story' name='Upload'/>
        <Onboard_root class={this.props.onBoard_class}/>
      </div>
    )
  }
}

Upload_story_root.propTypes = {
  isSignIn:React.PropTypes.bool.isRequired,
  user_info:React.PropTypes.object,
  onBoard:React.PropTypes.func.isRequired,
  onBoard_class:React.PropTypes.string.isRequired,
  onUploadStory:React.PropTypes.func.isRequired
}

Upload_story_root.defaultProps = {
  isSignIn:false,
  onBoard_class:'disappear',
  onBoard:()=>{},
  onUploadStory:()=>{},

}

module.exports = Upload_story_root
