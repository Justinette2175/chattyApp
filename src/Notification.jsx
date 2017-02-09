import React, {Component} from 'react';

class Notification extends Component {

  render() {
    console.log("Rendering <Notification/>");

    var notification = this.props.notification;
    console.log(notification);
    return (
      <div className="message system">
        {notification}
      </div>
    )
  }
}
export default Notification;