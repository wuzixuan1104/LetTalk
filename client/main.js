import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  if(Meteor.isCordova){
    // StatusBar.hide();
  }
  render(<App />, document.getElementById('render-target'));
});
