
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff3D2744');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarBackgroundColor', '0xff3D2744');


// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);