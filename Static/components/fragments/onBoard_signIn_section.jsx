var React = require('react')

class onBoard_signin_section extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id = 'onBoard_signin_section'>
        <input id = 'signin_account' className = 'onboard_input'
          type = 'text' placeholder='  Account' defaultValue='alex1' ref={'signin_account'}/>
        <input id = 'signin_password' className = 'onboard_input'
          type = 'password' placeholder='  Password' defaultValue='123456' ref={'signin_password'}/>
      </div>
    )
  }
}

module.exports = onBoard_signin_section;
