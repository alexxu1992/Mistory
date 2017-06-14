var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions')
var User_feed_table_root = require('../components/modules/user_feed_table_root.jsx')

const mapStateToProps = (state)=>{
  return{

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{

  }
}

const User_feed_table_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(User_feed_table_root)

module.exports = User_feed_table_app
