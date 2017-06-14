var React = require('react')

class User_feed_selector extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div id = 'feed_table_selector'>
        <input type = 'radio' name='user_feed_type' value='Story' defaultChecked/>Your Story<br></br>
        <input type = 'radio' name='user_feed_type' value='Follow Topics'/>Your Follow Topics<br></br>
        <input type = 'radio' name='user_feed_type' value='Reply'/>Your Reply<br></br>
      </div>
    )
  }
}

module.exports = User_feed_selector
