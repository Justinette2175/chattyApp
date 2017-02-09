import React, {Component} from 'react';

class Notification extends Component {

  render() {
    console.log("Rendering <Notification/>");
    let renderedContent = <span key="3">{this.props.content}</span>
    return (
      <div className="message system">
        {renderedContent}
      </div>
    )
  }
}
export default Notification;