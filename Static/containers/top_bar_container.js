var React_Redux = require('react-redux');
var Actions = require('../scripts/root_actions');
var Top_bar = require('../components/fragments/top_bar.jsx');
import {push} from 'react-router-redux'

const mapStateToProps = (state)=>{
  var me_info = mapMeInfoToHere(state)
  return {
    isSignIn: state.users.isSignIn,
    onBoard_class:state.users.onBoard_status,
    selfie_src:state.users.me_info.user_selfie
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onToMePage:(isSignIn) => {
      if(!isSignIn){
        dispatch(Actions.userOnboard('appear'));
      }else{
        console.log('go to me page');
        dispatch(push('/user/1'))
      }
    },
    onToMainPage:()=>{
      dispatch(push('/'))
    }
  }
}

const Top_bar_app = React_Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Top_bar)

module.exports = Top_bar_app

function mapMeInfoToHere(state){

  return {

  }
}
