import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Task extends Component {
  
  render() {
    return (
      <div class="box">
        <div class="container left">
          <div class="info">
            <span class="status"></span>
            <span class="datetime">7:00 am</span>
          </div>
          <p class='content'>
            dffghjkkjhgewwertyuuytrewwsdfghgfd
          </p>
        </div>
      </div>
    );
  }
}