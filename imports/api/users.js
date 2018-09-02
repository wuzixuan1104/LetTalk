import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
     return Users.find({
      $and: [
        { search: { $ne: false } },
        { enable: { $ne: false } },
        { roomId: 0 },
      ],
    });
  });
}

Meteor.methods({
  'users.insert'() {
    Users.insert({
      roomId: 0,
      search: true,
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
  'users.setSearch'(userId, search) {
    check(userId, String);
    check(search, Boolean);
    
    Users.update(userId, { $set: { search: search } });
  }
});

