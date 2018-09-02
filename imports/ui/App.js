import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/users.js';
import { Rooms } from '../api/rooms.js';

// class Alert extends Component {
//   render() {
//     return (<div className={this.props.class} data-title={this.props.msg}></div>);
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 'show'
    };
  }

  startTalk() {
    this.setState({
      start: '',
    });

    Meteor.call('users.insert');
    let user = Users.findOne({_id: Session.get('currentUserId')});

    if(user && user.roomId == 0) {
      setTimeout(function() {
        let talker = Users.findOne({_id: {$ne: user._id} });
        if( talker._id != user._id) {
          Meteor.call('rooms.insert');
          let roomId = Session.get('roomId');

          Meteor.call('users.setRoom', user._id, roomId);
          Meteor.call('users.setSearch', user._id, false);
          Meteor.call('users.setRoom', talker._id, roomId);
          Meteor.call('users.setSearch', talker._id, false);
        }
        
      },1000);
    }
   


    // ReactDOM.render(
    //   <Alert class="alert show" msg="搜尋中..." />,
    //   document.getElementById('chat-boxes')
    // );
  }

  msgSubmit() {
    console.log(this.props.users);
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.msg).value.trim();
    
    Meteor.call('msgs.insert', this.props.roomId, this.props.user._id, text);

    ReactDOM.findDOMNode(this.refs.msg).value = '';
    return false;
  }

  renderMsgs() {
    if(!this.props.roomId) 
      return;

    return msgs.map((msg) => {
      return (
        <Msg
          key={msg._id}
          msg={msg}
          userId={this.props.user._id}
        />
      );
    });
  }

  render() {
    if(this.state.alert) {

    }

    return (
      <div id="chat">
        <header id="chat-header">
          <span className="menu">&equiv;</span>
          <span className="name">LetTalk</span>
        </header>
        <div id="chat-boxes">
          <div id="start" className={this.state.start} onClick={this.startTalk.bind(this)}></div>
          {this.renderMsgs()}
        </div>

        <footer id="chat-footer">
          <form id='x' className="send" autoComplete="off" onSubmit={this.msgSubmit.bind(this)}>
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
    msgs: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);

