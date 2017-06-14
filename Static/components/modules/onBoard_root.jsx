var React = require('react');
import Cancel_Button from '../models/cancel_button.jsx'
import OnBoard_signin_section from '../fragments/onBoard_signin_section.jsx'
import { Button } from 'react-bootstrap';

class OnBoard_root extends React.Component{
  constructor(props){
    super(props)
    this.onboard_info = {};
  }

  handleClick(event){
    switch (event.target.id){
      case 'close_onBoard':
        this.props.closeOnboard()
        break;

      case 'onBoard_join':
        var signin_data = {
          account_value:this.onBoard_info.refs.signin_account.value,
          password_value:this.onBoard_info.refs.signin_password.value
        }
        this.props.onSignIn(signin_data)
        break;


      default:
        break;
    }
  }

  render(){
    return(
      <div id='onBoard_root' className={this.props.class} onClick={(event)=>this.handleClick(event)}>
        <Cancel_Button id='close_onBoard'/>
        <div id = 'signIn_option' className = 'selected'>SignIn</div>
        <div id = 'signUp_option' className = 'unselected'>  SignUp</div>
        <OnBoard_signin_section ref={ref=>{this.onBoard_info = ref}}/>
        <Button id = 'onBoard_join'> Join </Button>
      </div>
    )
  }
}

OnBoard_root.propTypes = {
  closeOnboard:React.PropTypes.func.isRequired,
  onSignIn:React.PropTypes.func.isRequired
}

OnBoard_root.defaultProps = {
  closeOnboard:()=>{},
  onSignIn:()=>{}
}

module.exports = OnBoard_root;
