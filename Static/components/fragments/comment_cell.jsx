var React = require('react');


class Comment_cell extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
       <div id={'comment'+this.props.id} className='comment_cell'>
         <img className='selfie' src={this.props.selfie_src}></img>
         <p className='comment_user'>{this.props.user_name}</p>
         <div className='comment_content' dangerouslySetInnerHTML={{__html: this.props.content}}/>
       </div>
    )
  }
}

module.exports = Comment_cell;
