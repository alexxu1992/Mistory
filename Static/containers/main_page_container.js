var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Main_root = require('../components/modules/main_page_root.jsx')

//Transfer the received states to the related props
const mapStateToProps = (state)=>{
  return {
    onBoard_status: state.users.onBoard_status,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{

  }
}

const main_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Main_root);

module.exports = main_app
