import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { DDP } from 'meteor/ddp-client'

export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
     return Users.find({ enable: { $ne: false } });
  });
}

if(Meteor.isClient) {
  var remote = DDP.connect('http://127.0.0.1:3000');
  const RUsers = new Meteor.Collection('users', remote); 

  remote.subscribe('users', function() {
    RUsers.find().observe({
      changed: function(res) {
        console.log('changed: ', '_id: ' + res._id, 'room_id: ' + res.roomId, 'enable: ' + res.enable);

        if (!res.enable && res.roomId == Session.get('roomId'))
          Session.set('leave', true);
        else (res._id == Session.get('currentUserId')) 
          Session.set('roomId', res.roomId);
      },
      added: function(res) {
        // console.log('added: ', '_id: ' + res._id, 'room_id: ' + res.roomId, 'enable: ' + res.enable);
      }
    });
  });

  const RRooms = new Meteor.Collection('rooms', remote);
  remote.subscribe('rooms', function() {
    RRooms.find().observe({
      changed: function(res) {
        console.log('room changed: ', '_id: ' + res._id, 'enable: ' + res.enable);

        if (!res.enable && res.roomId == Session.get('roomId'))
          Session.set('leave', true);
       
      },
      added: function(res) {
        // console.log('added: ', '_id: ' + res._id, 'room_id: ' + res.roomId, 'enable: ' + res.enable);
      }
    });
  });
}

Meteor.methods({
  'users.insert'() {
    Users.insert({
      roomId: 0,
      enable: true,
      createdAt: new Date(),
    }, function(err, res) {
      Session.set('currentUserId', res);
    });
  },
  'users.setRoom'(userId, roomId) {
    check(userId, String);
    check(roomId, String);
  
    Users.update(userId, { $set: { roomId: roomId } });
  },
  'users.setEnable'(userId, enable) {
    check(userId, String);
    check(enable, Boolean);

    Users.update(userId, { $set: { enable: enable } });
  }
});

