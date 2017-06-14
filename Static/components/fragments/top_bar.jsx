var React = require('react');
var Search_bar = require('../models/search_bar.jsx');
var Selfie_entrance = require('../models/selfie_entrance.jsx');
var Onboard_root = require('../../containers/onboard_root_container')

class Top_bar extends React.Component{
  constructor(props){
    super(props)
  }

  handleClick(event){
    switch (event.target.id) {
      case 'my_selfie':
        this.props.onToMePage(this.props.isSignIn)
        break;

      case 'home_back':
        this.props.onToMainPage();
        break;

      default:
        break;

    }

  }

  componentDidMount(){
    // var current_path = window.location.pathname.split('/')[1];
    // var top_bar = document.getElementById('top_bar')
    // var home_back = document.getElementById('home_back')
    // console.log(current_path);
    // if(current_path == 'topic'){
    //   top_bar.setAttribute('class','other_page');
    //   home_back.setAttribute('class','other_page')
    // }else {
    //   top_bar.setAttribute('class','main_page');
    //   home_back.setAttribute('class','main_page')
    // }


  }

  render(){
    return(
      <div id = 'top_bar' onClick = {(event)=>{this.handleClick(event)}} className={this.props.class}>
        {/* <p id='home_back'>Mistory<span>A collection of Life Story</span></p> */}
        <p id='home_back'>Mistory</p>
        <Search_bar class = {this.props.class} place_holder={this.props.place_holder}/>
        <Selfie_entrance src={this.props.selfie_src}/>
      </div>
    )
  }
}

Top_bar.propTypes = {
  isSignIn: React.PropTypes.bool.isRequired,
  onBoard_class: React.PropTypes.string.isRequired,
  onToMePage: React.PropTypes.func.isRequired,
  onToMainPage:React.PropTypes.func.isRequired,
  selfie_src: React.PropTypes.string

}

Top_bar.defaultProps = {
  isSignIn: null,
  onBoard_class: null,
  onToMePage:()=>{},
  onToMainPage:()=>{}
}

module.exports = Top_bar;
