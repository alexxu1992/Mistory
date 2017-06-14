var React = require('react');
var Comment_cell = require('../../containers/comment_cell_container');

class Story_comment_area_root extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchComments(this.props.story_id)
  }

  render(){
    return(
      <div id='story_comment_area_root'>
        <p id='comment_area_title'>{this.props.comment_list_length} Comments</p>
        <div id='comment_area_main'>
          {
            Object.keys(this.props.comment_list).map((key,index)=>{
              var comment = this.props.comment_list[key]
              return <Comment_cell
                key={key}
                id={comment.comment_id}
                ///////here I need to use the new src
                selfie_src={comment.selfie_src}
                user_name={comment.user_name}
                content={comment.comment_content}
              />
            })
          }
        </div>
      </div>

    )
  }
}

Story_comment_area_root.propTypes = {
  comment_list:React.PropTypes.object,
  comment_list_length:React.PropTypes.number.isRequired,
  comment_user_list:React.PropTypes.object,
  fetchComments:React.PropTypes.func.isRequired
}

Story_comment_area_root.defaultProps = {
  comment_list_length:0,
  fetchComments:()=>{}
}

module.exports = Story_comment_area_root;
