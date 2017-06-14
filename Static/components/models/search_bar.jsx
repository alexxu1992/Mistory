var React = require('react');
//var FontAwesome = require('react-fontawesome');

class Search_Bar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <input
        type = 'text'
        id = 'search_bar'
        className={this.props.class}
        placeholder = {this.props.place_holder}>
      </input>
    )
  }
}

module.exports = Search_Bar
