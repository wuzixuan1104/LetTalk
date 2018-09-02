import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new  Mongo.Collection('users');

Meteor.methods({
  'users.insert'() {
    // if(!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
    Users.insert({
      roomId: 0,
      search: true,
      enable: true,
      createdAt: new Date(),
    });
  }
})