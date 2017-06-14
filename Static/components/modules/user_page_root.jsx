var React = require('react')
var User_feed_table = require('../../containers/user_feed_table_container');
var User_feed_selector = require('../models/user_feed_selector.jsx')

class User_page_root extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <User_feed_table/>
        <div onChange = {event=>this.props.onChangeUserFeed(event.target.value)}>
          <User_feed_selector/>
        </div>
      </div>
    )
  }
}

User_page_root.propTypes = {
  onChangeUserFeed:React.PropTypes.func.isRequired
}

User_page_root.defaultProps = {
  onChangeUserFeed:()=>{}
}

module.exports = User_page_root
