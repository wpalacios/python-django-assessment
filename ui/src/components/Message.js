import React, { Component } from 'react';

class Message extends Component {

    render() {
        const divStyle = {
            minHeight: "25px",
            color: "green"
        }
        return (
            <div style={divStyle}>{this.props.message}</div>
        )
    }
}

export default Message;