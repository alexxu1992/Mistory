var React = require('react');

class Fetching_spinner extends React.Component{
  constructor(props){
    super(props)
  };

  render(){
    return(
        <i className={`fa fa-spinner fa-pulse fa-3x fa-fw spinner ${this.props.isFetching?'appear':'disappear'}`}></i>
    )
  }
}

module.exports = Fetching_spinner
