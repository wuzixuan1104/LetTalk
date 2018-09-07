import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/users.js';
import { Rooms } from '../api/rooms.js';
import { Msgs } from '../api/msgs.js';
import Msg from './Msg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { start: true };
    this._onClickStartTalk = this._onClickStartTalk.bind(this);
    this._onClickMsgSubmit = this._onClickMsgSubmit.bind(this);
    this._renderMsgs = this._renderMsgs.bind(this);
  }

  _onClickStartTalk() {
    this.setState({start: false});
    Meteor.call('users.insert');

    this._searchOther();
  }

  _onClickMsgSubmit(event) {
    event.preventDefault();

    const target = this.refs.msg;
    const text = target.value.trim();

    Meteor.call('msgs.insert', Session.get('roomId'), Session.get('currentUserId'), text);

    target.value = '';
  }

  _searchOther() {
    const userId = Session.get('currentUserId');
    if( !this.props.other || (this.props.other && this.props.other._id == userId) )
      return;

    const user = Users.findOne({_id: userId});
    if(!user || user.roomId != 0)
      return;

    Meteor.call('rooms.insert');
    Meteor.call('users.setRoom', userId, Session.get('roomId'));
    Meteor.call('users.setRoom', this.props.other._id, Session.get('roomId'));

  }

  _renderMsgs() {
    if(!this.props.msgs || !Session.get('currentUserId')) 
      return;

    return this.props.msgs.map((msg) => {
      return (
        <Msg key={msg._id} msg={msg} userId={Session.get('currentUserId')}/>
      );
    });
  }

  render() {
    const startClass = Session.get('currentUserId') || !this.state.start ? '' : 'show';
    const searchClass = classnames({ alert, show: ( Session.get('currentUserId') || !this.state.start ) ? true : false });
    const searchSuccessClass = classnames({ alert, show: Session.get('roomId') ? true : false});
    const leaveClass = classnames({ alert, show: false});

    return (
      <div id="chat">
        <header id="chat-header">
          <span className="menu">&equiv;</span>
          <span className="name">LetTalk</span>
        </header>
        <div id="chat-boxes">
          <div id="start" className={startClass} onClick={this._onClickStartTalk}></div>
          <div className={searchClass} data-title="搜尋中..."></div>
          <div className={searchSuccessClass} data-title="已配對成功，開始聊天囉！"></div>
          {this._renderMsgs()}
          <div className={leaveClass} data-title="對方已離開，請按左下方[Leave]"></div>
        </div>

        <footer id="chat-footer">
          <form className="send" autoComplete="off" onSubmit={this._onClickMsgSubmit}>
            <input type="text" ref="msg" placeholder="say something ..."/>
          </form>
          <div className="leave-btn">Leave</div>
        </footer>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('rooms');
  Meteor.subscribe('msgs');

  return {
    msgs: Session.get('roomId') ? Msgs.find({ roomId: Session.get('roomId') }).fetch() : null,
    other: Users.findOne({ roomId: { $eq: 0 } }),
  };
})(App);

