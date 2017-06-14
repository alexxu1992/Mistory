var React = require('react');

class Story_head_frame extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id='story_head_frame'>
       <img src={this.props.src}></img>
      </div>
    )
  }
}

module.exports = Story_head_frame;
