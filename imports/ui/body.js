import './body.html';
import './chat.js';

Template.body.events({
  'submit .send'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.msg.value;

    // Meteor.call('tasks.insert', text);
    console.log(text);
    target.msg.value = '';
  }
})