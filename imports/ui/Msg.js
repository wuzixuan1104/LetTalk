import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Msgs } from '../api/msgs.js';

export default class Msg extends Component {

  render() {
    const {msgUserId, createdAt, text} = this.props.msg;

    const MsgClassName = classnames({
      container: true,
      right: ( this.props.userId == msgUserId ) ? true : false,
    });
    const date = createdAt.toTimeString().substr(0, 5);

    return (
      <div className="box">
        <div className={MsgClassName}>
          <div className="info">
            <span className="status"></span>
            <span className="datetime">{date}</span>
          </div>
          <p className='content'>
            {text}
          </p>
        </div>
      </div>
    );
  }
}