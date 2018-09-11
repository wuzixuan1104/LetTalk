import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.js';
import Menu from '../imports/ui/Menu.js';

Meteor.startup(() => {
  render(<Menu />, document.getElementById('render-sidemenu'));
  render(<App />, document.getElementById('render-target'));
});
