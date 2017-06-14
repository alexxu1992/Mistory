var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Onboard_root = require('../components/modules/onBoard_root.jsx');

const mapStateToProps = (state)=>{
  return {

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    closeOnboard:()=>{
      dispatch(Actions.userOnboard('disappear'))
    },
    onSignIn:(signIn_data)=>{
      dispatch(Actions.userSignIn(signIn_data))
    }
  }
}

const onboard_root_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboard_root);

module.exports = onboard_root_app
