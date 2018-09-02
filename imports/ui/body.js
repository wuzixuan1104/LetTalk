import { Meteor } from 'meteor/meteor';
import { Users } from '../api/users.js';

import './body.html';
import './chat.js';

Template.body.helpers({

});

Template.body.events({
  'click #start'(event, template) {
    Meteor.call('users.insert');
    template.find('#start').classList.remove('show');
  },

  'submit .send'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.msg.value;

    // Meteor.call('tasks.insert', text);
    console.log(text);
    target.msg.value = '';
  }
})