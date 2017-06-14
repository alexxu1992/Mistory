const React = require('react');

class Selfie_entrance extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id = 'selfie_entrance'>
        <img id = 'my_selfie' className='selfie' src={this.props.src}></img>
      </div>
    )
  }
}

module.exports = Selfie_entrance
