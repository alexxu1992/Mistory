var React = require('react')

class Story_content_area extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      // <div id='story_content_area' dangerouslySetInnerHTML={__html: this.props.textBody}/>
      <div id='story_content_area'>
        <p dangerouslySetInnerHTML={{__html: this.props.textBody}}/>
      </div>
    )
  }
}

module.exports = Story_content_area
