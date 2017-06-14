var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Comment_cell = require('../components/fragments/comment_cell.jsx');

const mapStateToProps = (state)=>{
  return {

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{

  }
}

const comment_cell_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment_cell);

module.exports = comment_cell_app
