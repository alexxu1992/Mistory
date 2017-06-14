var React = require('react');
var Moment = require('moment');
var Story_thumbnail = require('../fragments/story_thumbnail.jsx');
var Timeline_slider = require('../../containers/timeline_slider_container')



class Topic_content_area extends React.Component{
  constructor(props){
    super(props)
    this.slider = null;
    this.currentDate = null;
    this.leftDate = null;
    this.rightDate = null;
    this.screen_width = 1280;
    this.screen_height = 295;
  }

  componentWillMount(){
    if(this.props.story_list_length < 5){
      this.props.onToFetchStories(this.props.topic_id);
    }
  }

  componentDidMount(){
    // this.screen_width = document.getElementById('topic_content_area').clientWidth;
    // this.screen_height = document.getElementById('topic_content_area').clientHeight;
    this.props.onGettingSize();
  }

  judgeObject(event){
    if(event.target.className == 'story_thumbnail'){
      var storyId = event.target.id.match(/\d+/)[0];
      this.props.onToStoryContent(storyId)
    }
  }

  whetherOnCurrentPage(story){
    var flag = false;
    var storyDate = Moment(story.story_happen_date);
    if(storyDate > this.leftDate && storyDate < this.rightDate){
      flag = true
     }
    return flag;
  }

  render(){
    this.currentDate = Moment(this.props.currentDate);
    this.leftDate = Moment(this.props.currentDate).subtract(6,'months')
    this.rightDate = Moment(this.props.currentDate).add(6,'months')
    return(
      <div id='topic_content_area' onClick={(event)=>this.judgeObject(event)}>
        {
          Object.keys(this.props.story_list).map((key,index)=>{
            var story = this.props.story_list[key]
            var flag = this.whetherOnCurrentPage(story)
            if(flag){
              return <Story_thumbnail
                key={key}
                id={story.story_id}
                title={story.story_title}
                cover_src={story.story_material_thumbnail}
                screen_width = {this.props.area_size.width}
                screen_height = {this.props.area_size.height}
                top_percent = {story.top_percent}
                currentDate = {this.props.currentDate}
                leftDate = {this.leftDate}
                happenDate={story.story_happen_date}/>
            }
          })
        }
        <h1 id='date_prompt' className={this.props.date_prompt}>{this.props.currentDate}</h1>
        <Timeline_slider
          id='main_timeline'
          topic_id={this.props.topic_id}
          ref={(node)=>{this.slider = node}}/>
      </div>
    )
  }
}

Topic_content_area.propTypes = {
  story_list: React.PropTypes.object.isRequired,
  story_list_length:React.PropTypes.number.isRequired,
  onToFetchStories:React.PropTypes.func.isRequired,
  onToStoryContent: React.PropTypes.func.isRequired,
  currentDate:React.PropTypes.string.isRequired,
  date_prompt:React.PropTypes.string.isRequired,
  onGettingSize:React.PropTypes.func.isRequired,
  area_size:React.PropTypes.object.isRequired
}

Topic_content_area.defaultProps = {
  stories_list:{},
  story_list_length:0,
  onToFetchStories:()=>{},
  onToStoryContent:()=>{},
  currentDate:{},
  date_prompt:'disappear',
  area_size:{}
}

module.exports = Topic_content_area
