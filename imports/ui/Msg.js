import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Msgs } from '../api/msgs.js';

export default class Msg extends Component {

  render() {
    const MsgClassName = classnames({
      container: true,
      right: ( this.props.userId == this.props.msg.userId ) ? true : false,
    });
    return (
      <div className="box">
        <div className={MsgClassName}>
          <div className="info">
            <span className="status"></span>
            <span className="datetime">7:00 am</span>
          </div>
          <p className='content'>
            {this.props.msg.text}
          </p>
        </div>
      </div>
    );
  }
}