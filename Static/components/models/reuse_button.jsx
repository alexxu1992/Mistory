var React = require('react');
import { Button } from 'react-bootstrap';

class Upload_story_button extends React.Component{
  constructor(props){
    super(props)
  };

  render(){
    return(
         <Button id = {this.props.ID} bsStyle={this.props.style}>{this.props.name}</Button>
    )
  }
}

module.exports = Upload_story_button
