var React = require('react');
var Moment = require('moment')


class Timeline_slider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isDrag:true
    }
    this.currentDate = this.props.timeline_current_date;
    this.autoMove = null;
  }

  componentWillUnmount(){
    clearInterval(this.autoMove)
  }

  changeTime(event){
    clearInterval(this.autoMove);
    var yearValue = event.target.value.split('.')[0];
    var dateValue = Math.floor(360 * (parseFloat('0.'+event.target.value.split('.')[1])))+1
    var monthValue = Math.floor((dateValue/30) + 1);
    var dayValue = dateValue - (monthValue-1)*30 + 1
    var currentMonth = yearValue+'-'+monthValue
    this.currentDate = yearValue+'-'+monthValue+'-'+dayValue
    this.props.onChangeDate(this.props.topic_id, this.currentDate);
  }

  caculateSlider(){
    var left_year = parseInt(this.props.timeline_oldest_date.split('-')[0]);
    var left_year_date = Moment(this.props.timeline_oldest_date)
    var left_year_first_date = Moment(left_year+'-1-1');
    var left_year_diff = left_year_date.diff(left_year_first_date,'days')
    var left_year_value = left_year + (left_year_diff/360)


    var right_year = parseInt(this.props.timeline_latest_date.split('-')[0]);
    var right_year_date = Moment(this.props.timeline_latest_date)
    var right_year_first_date = Moment(right_year+'-1-1')
    var right_year_diff = right_year_date.diff(right_year_first_date,'days')
    var right_year_value = right_year + (right_year_diff/360)

    var step = 1/360;

    //console.log(this.props.timeline_current_date);
    var current_date = Moment(this.props.timeline_current_date)
    var current_left_diff = current_date.diff(left_year_date,'days');
    var current_date_value = left_year_value + step * current_left_diff;

    return{
      left_year:left_year,
      left_value:left_year_value,
      left_year_date:left_year_date,
      right_year:right_year,
      right_value:right_year_value,
      right_year_date:right_year_date,
      step:step,
      currentDate:current_date_value,
      current_date:current_date
    }
  }

  sliderMove(){
    var slider_info = this.caculateSlider();
    if(this.state.isDrag){
      if(!isNaN(slider_info.left_value)){
        this.setAutoMove(slider_info);
        this.state.isDrag = false;
      }
    }
    return slider_info
  }

  setAutoMove(slider_info){
    this.autoMove = setInterval(()=>{
      var modified_date = slider_info.current_date.add(1,'days');
      var modified_date_left = modified_date.diff(slider_info.left_year_date,'days');
      var modified_date_value = slider_info.left_value + slider_info.step * modified_date_left
      var modified_date_format = modified_date.format().split('T')[0];
      this.refs['slider'].value = modified_date_value
      this.props.onChangeDate(this.props.topic_id, modified_date_format);
      this.props.onHidePromt();
      if(modified_date_value>=slider_info.right_value+0.2){
        clearInterval(this.autoMove)
      }
    },40)

  }

  hidePromt(event){
    this.props.onHidePromt();
    clearInterval(this.autoMove)
    //this.setState({isDrag:true})
  }

  render(){
    var slider_info = this.sliderMove();
    var left_date = this.props.timeline_oldest_date.split('-')[0]+'-'+this.props.timeline_oldest_date.split('-')[1];
    var right_date = this.props.timeline_latest_date.split('-')[0]+'-'+this.props.timeline_latest_date.split('-')[1];
    return(
      <div id={this.props.id} onClick={()=>this.refs['slider'].focus()}>
        <input
           type='range'
           defaultValue={slider_info.currentDate}
           step={slider_info.step}
           min={slider_info.left_value}
           max={slider_info.right_value}
           onInput={(event)=>this.changeTime(event)}
           onMouseUp={(event)=>this.hidePromt(event)}
           ref={'slider'}/>
        <p id='timeline_left'>{slider_info.left_year}</p>
        <p id='timeline_right'>{slider_info.right_year}</p>
      </div>
    )
  }
}

Timeline_slider.propTypes = {
  timeline_latest_date:React.PropTypes.string,
  timeline_oldest_date:React.PropTypes.string,
  timeline_current_date:React.PropTypes.string,
  onChangeDate:React.PropTypes.func.isRequired,
  onHidePromt:React.PropTypes.func.isRequired
}

Timeline_slider.defaultProps = {
  onChangeDate:()=>{},
  onHidePromt:()=>{}
}

module.exports = Timeline_slider
