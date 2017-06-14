var React = require('react');
import {Editor, EditorState, RichUtils} from 'draft-js';


class Content_input extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();
  }

  onChange(editorState){
    this.setState({editorState})
  }

  handleKeyCommand(command){
     const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
     if(newState){
       this.onChange(newState);
       return 'handled';
     }
     return 'unhandled'
  }

  _onClick(event){
    switch(event.target.id){
      case this.props.name:
        console.log('focus');
        this.focus();
        break;

      case 'bold_button':
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
        break;

      default:
        break;
    }

  }

  render(){
    return(
      <div id ={this.props.name} className="wideInput" onClick={this._onClick.bind(this)}>
          <div id='editor_tool_bar' className='editor_tool_bar'>
            <div id='bold_button' className='modified_button'>Bold</div>
          </div>
          <div id='editor_area'>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              placeholder = {this.props.holder}
              ref="editor"/>
          </div>
      </div>

    )
  }
}

Content_input.propTypes = {

}

module.exports = Content_input
