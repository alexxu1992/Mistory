var React = require('react');

class Main_window extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id = 'main_window'>
        <h1> Mistory </h1>
        <p>A Collection of Life Story</p>
      </div>
    )
  }
}

module.exports = Main_window;
