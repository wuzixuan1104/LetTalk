import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Msgs = new Mongo.Collection('msgs');

if (Meteor.isServer) {
  Meteor.publish('msgs', function msgsPublication() {
    return Msgs.find();
  });
}

Meteor.methods({
  'msgs.insert'(roomId, userId, text) {
    check(roomId, String);
    check(userId, String);
    check(text, String);
 
    Msgs.insert({
      roomId: roomId,
      userId: userId,
      text: text,
      createdAt: new Date(),
    });
  }
});

