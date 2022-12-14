var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Running The Distance', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.dustin.ward.runningthedistance', // App bundle ID
  // App store
  store: window.store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});