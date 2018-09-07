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

  if(!Session.get('roomId')) {
    remote.subscribe('users', function() {
      RUsers.find().observe({
        changed:function(res) {
          console.log('changed: ', '_id: ' + res._id, 'room_id: ' + res.roomId);
          if(res._id == Session.get('currentUserId'))
            Session.set('roomId', res.roomId);
        },
        added:function(res) {
          console.log('added:', '_id: ' + res._id, 'room_id: ' + res.roomId);
        }
      });
    });
  }
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
  }
});

