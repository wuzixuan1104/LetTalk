import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Msgs = new Mongo.Collection('msgs');

if (Meteor.isServer) {
  Meteor.publish('msgs', function roomsPublication() {
     return Msgs.find({
      $and: [
        { roomId: Session.get('roomId')  },
      ],
    });
  });
}

Meteor.methods({
  'msgs.insert'(roomId, userId, text) {
    Msgs.insert({
      roomId: roomId,
      userId: userId,
      text: text,
      createdAt: new Date(),
    });
  }
});

