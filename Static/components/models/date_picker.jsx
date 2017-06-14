var React = require('react');
var moment = require('moment');



class Date_Picker extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <input type="date" id = 'story_date' ref={'date_picker'}/>
    )
  }
}

module.exports = Date_Picker
