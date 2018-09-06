import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/users.js';
import { Rooms } from '../api/rooms.js';
import { Msgs } from '../api/msgs.js';
import Msg from './Msg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { start: true, search: true };

    this._onClickStartTalk = this._onClickStartTalk.bind(this);
    this._onClickMsgSubmit = this._onClickMsgSubmit.bind(this);
    this._renderMsgs = this._renderMsgs.bind(this);
    this._searchOther = this._searchOther.bind(this);
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
    console.log('roomId: ' + Session.get('roomId'));
    console.log('userId: ' + Session.get('currentUserId'));

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

    this.setState({search: false});
  }

  _renderMsgs() {
    let msgs = Msgs.find({ roomId: Session.get('roomId')}).fetch();
    return msgs.map((msg) => {
      return (
        <Msg
          key={msg._id}
          msg={msg}
          userId={Session.get('currentUserId')}/>
      );
    });
  }

  render() {
    const start = this.state.start ? 'show' : '';

    return (
      <div id="chat">
        <header id="chat-header">
          <span className="menu">&equiv;</span>
          <span className="name">LetTalk</span>
        </header>
        <div id="chat-boxes">
          <div id="start" className={start} onClick={this._onClickStartTalk}></div>
          {this._renderMsgs()}
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






// Users.find().observe({
//   added: function(newDocument, oldDocument) {
//     console.log('add');
//     const userId = Session.get('currentUserId');
//     const user = Users.findOne({_id: userId});

//     if(!user)
//       return;

//     if(user.roomId != 0) { //connected with other
//       // remove 搜尋中... show 開始聊天
//       Session.set('roomId', user.roomId);
//     } else if(newDocument._id != userId) { // create new connect
//       const other = Users.findOne({_id: newDocument._id});
//       console.log(other);
//       if(other.roomId == user.roomId) {

//         Session.set('roomId', user.roomId);
//       }
//     }
//   },

//   changed: function(newDocument, oldDocument) {
//     console.log('changed');
//     console.log(newDocument);
//   }
// });

export default withTracker(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('rooms');
  Meteor.subscribe('msgs');

  return {
    msgs: Msgs.find({}, { sort: { createdAt: -1 } }).fetch(),
    other: Users.findOne({ enable: true, search: true }),
  };
})(App);

