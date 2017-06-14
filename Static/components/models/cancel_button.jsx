var React = require('react');
var FontAwesome = require('react-fontawesome');

class Cancel_Button extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <FontAwesome id = {this.props.id} name = 'times' className = 'cancel_button' size = '2x'/>
    )
  }
}

module.exports = Cancel_Button
