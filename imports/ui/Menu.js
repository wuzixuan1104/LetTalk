import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms.js';

class Menu extends Component {
  render() {
    const recordCnt = this.props.roomsCnt * 2;

    return (
      <div className="container">
        <div className="record">
          <span className="name">Online</span>
          <b>{recordCnt}</b>
        </div>
        <div className="record">
          <span className="name">Chatting</span>
          <b>{recordCnt}</b>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('rooms');

  return {
    'roomsCnt': Rooms.find({ enable: { $ne: false } }).count()
  };
})(Menu);

