import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  Meteor.publish('rooms', function roomsPublication() {
     return Rooms.find({
      $and: [
        { enable: { $ne: false } },
      ],
    });
  });
}

Meteor.methods({
  'rooms.insert'() {
    let now = new Date();
    Rooms.insert({
      enable: true,
      createdAt: now,
      updatedAt: now

    }, function(err, res) {
      Session.set('roomId', res);
    });
  },
  'rooms.setEnable'(roomId, enable) {
    check(enable, Boolean);
    check(roomId, String);

    Rooms.update(roomId, { $set: { enable: enable } });
  }
});

