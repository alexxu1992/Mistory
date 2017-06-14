var React = require('react');
var Topic_window = require('../fragments/topic_window.jsx');
var Fetching_spinner = require('../models/fetching_spinner.jsx')

class Topic_frame extends React.Component{
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    if(this.props.topic_list_length<3){
     this.props.onToFetchTopics(this.props.topic_list_length);
    }
    window.addEventListener('scroll',this.handleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScroll)
  }

  toTopic(event){
    var theId = event.target.id.match(/\d+/)[0];
    this.props.onToTopic(theId)
  }

  handleScroll(event){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowButtom = windowHeight + window.pageYOffset;
    //console.log(this.props.topic_list_length);
    if(windowButtom>=docHeight){
      console.log(this.props.topic_list_length);
      this.props.onToFetchTopics(this.props.topic_list_length);
    }
  }

  render(){
    return(
      <div id = 'topic_frame' onClick = {(event)=>this.toTopic(event)}>
        {
            Object.keys(this.props.topic_list).map((key,index)=>{
              var topic = this.props.topic_list[key]
              return <Topic_window
                key={key}
                id = {topic.topic_id}
                title = {topic.topic_name}
                subtitle = {topic.topic_subtitle}
                cover_src = {topic.topic_cover_url}
              />
            })
        }
        <Fetching_spinner isFetching={this.props.isFetching}/>
      </div>
    )
  }
}

Topic_frame.propTypes = {
  isFetching:React.PropTypes.bool.isRequired,
  topic_list: React.PropTypes.object.isRequired,
  topic_list_length:React.PropTypes.number.isRequired,
  onToTopic : React.PropTypes.func.isRequired,
  onToFetchTopics:React.PropTypes.func.isRequired
}

Topic_frame.defaultProps = {
  isFetching:false,
  topic_list:{},
  topic_list_length:0,
  onToTopic: ()=>{},
  onToFetchTopics:()=>{}
}

module.exports = Topic_frame
