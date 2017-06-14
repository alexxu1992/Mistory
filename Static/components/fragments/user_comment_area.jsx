var React = require('react');
var Content_input = require('../models/content_input.jsx');
var Comment_submit = require('../models/reuse_button.jsx');
var Moment = require('moment')
import { EditorState, ContentState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class User_comment_area extends React.Component{
  constructor(props){
    super(props)
  }

  handleClick(event){
    switch(event.target.id){
      case 'comment_submit':
        if(this.props.isSignIn){
          var comment_info = this.assembleInfo()
          var comment_content = stateToHTML(this.refs['comment_content'].state.editorState.getCurrentContent());
          this.props.submitComment(comment_info, comment_content)
          //clear the content input area
          const editorState = EditorState.push(this.refs['comment_content'].state.editorState, ContentState.createFromText(''));
          this.refs['comment_content'].setState({editorState});
        }else{
          this.props.onBoard('appear')
        }
        break;

      default:
        break;
    }
  }

  assembleInfo(){
    var comment_date = Moment(new Date()).format();
    comment_date = comment_date.split('T')[0] + ' ' + comment_date.split('T')[1].split('-')[0]
    return {
      comment_by:this.props.me_id,
      comment_in:parseInt(this.props.story_id),
      comment_to:this.props.story_by,
      comment_date:comment_date
    }
  }

  render(){
    return(
       <div id='user_comment_area' onClick = {(event)=>this.handleClick(event)}>
         <p>You can comment here</p>
         <Content_input name='user_comment_input' ref={'comment_content'} />
         <Comment_submit ID='comment_submit' name='Submit' style='primary'/>
       </div>
    )
  }
}

User_comment_area.propTypes = {
  isSignIn:React.PropTypes.bool.isRequired,
  submitComment:React.PropTypes.func.isRequired,
  onBoard:React.PropTypes.func.isRequired,
  me_id:React.PropTypes.number,
  story_by:React.PropTypes.number
}

User_comment_area.defaultProps = {
  isSignIn:false,
  submitComment:()=>{},
  onBoard:()=>{}
}

module.exports = User_comment_area;
