var React = require('react');
var Moment = require('moment')

class Story_thumbnail extends React.Component{
  constructor(props){
    super(props)
  }

  caculatePosition(){
    var storyDate = Moment(this.props.happenDate)
    var distance = storyDate.diff(this.props.leftDate,'days');
    var screen_width = this.props.screen_width + 250
    var screen_height = this.props.screen_height
    var left = (distance/360) * screen_width - 250;
    var top = (screen_height - 250) * this.props.top_percent
    return {
      left:left,
      top:top
    }
  }

  render(){
    var position = this.caculatePosition();
    var style = {
      backgroundImage:`url(${this.props.cover_src})`,
      left:`${position.left}px`,
      top:`${position.top}px`
    }
    return(
       <div className = 'story_thumbnail'
            id={'story'+this.props.id}
            style={style}>
          <p>{this.props.title}</p>
       </div>
    )
  }
}

module.exports = Story_thumbnail;
