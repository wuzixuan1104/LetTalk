import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms.js';
import { Users } from '../api/users.js';

class Menu extends Component {
  render() {
    return (
      <div className="container">
        <div className="record">
          <span className="name">Online</span>
          <b>{this.props.onlineCnt ? this.props.onlineCnt : 0}</b>
        </div>
        <div className="record">
          <span className="name">Wait For Chatting</span>
          <b>{this.props.waitCnt ? this.props.waitCnt : 0}</b>
        </div>
        <div className="record">
          <span className="name">Chatting Room</span>
          <b>{this.props.roomsCnt ? this.props.roomsCnt : 0}</b>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('rooms');
  Meteor.subscribe('users');

  return {
    'waitCnt' : Users.find({enable: {$ne: false}, roomId: {$eq: 0}}).count(),
    'onlineCnt': Users.find({enable: {$ne: false}}).count(),
    'roomsCnt': Rooms.find({enable: { $ne: false}}).count()
  };
})(Menu);

