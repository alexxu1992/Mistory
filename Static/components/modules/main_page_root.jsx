var React = require('react');
import {Link} from 'react-router-dom';
var Top_bar = require('../../containers/top_bar_container');
var Main_window = require('../fragments/main_window.jsx');
var Topic_frame_app = require('../../containers/topic_window_frame_container');
var Onboard_root = require('../../containers/onboard_root_container');



class Main_root extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var top_bar = document.getElementById('top_bar')
    top_bar.setAttribute('class','main_page');
    var home_back = document.getElementById('home_back')
    home_back.setAttribute('class','main_page')
  }


  render(){
    return (
      <div id = 'main_root'>
        <Main_window/>
        <Topic_frame_app/>
        <Onboard_root class={this.props.onBoard_status}/>
      </div>
    )
  }
}

Main_root.propTypes = {
  onBoard_status:React.PropTypes.string.isRequired
}

Main_root.defaultProps = {
  onBoard_status:null
}

module.exports = Main_root
