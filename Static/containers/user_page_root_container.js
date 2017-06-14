var React_Redux = require('react-redux')
var Actions = require('../scripts/root_actions')
var User_page_root = require('../components/modules/user_page_root.jsx')

const mapStateToProps = (state)=>{
  return{

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onChangeUserFeed:(feed_value)=>{
      console.log(feed_value);
    }
  }
}

const User_page_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(User_page_root)

module.exports = User_page_root_app
