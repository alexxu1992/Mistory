var React = require('react');


class Topic_window extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var style = {
      backgroundImage:`url(${this.props.cover_src})`
    }
    return(
       <div className = 'topic_window' id={'topic'+this.props.id}>
         <div className = 'backgroundImage' style={style}></div>
         <h3>{this.props.title}</h3>
         <p>{this.props.subtitle}</p>
       </div>
    )
  }
}

module.exports = Topic_window;
