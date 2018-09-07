import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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
  }
});

