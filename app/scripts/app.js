/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // Ensure the drawer is hidden on desktop/tablet
//    var drawerPanel = document.querySelector('#paperDrawerPanel');
//    drawerPanel.forceNarrow = true;

    var toolbar = document.querySelector('#mainToolbar');
    toolbar.bottomJustify = 'around';

    var loading = document.getElementById('searchmodal');
    loading.noAutoFocus=true;
    loading.noCancelOnEscKey=true;
    loading.noCancelOnOutsideClick=true;
  });

  app.back2results = function(){
    page('/results');
  };

  app.itemSelected = function(){
    console.log('item has been selected, route to directions');
    app.resultsScrollTop=document.querySelector('.content').scrollTop;
    page('/map');
  };

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.focussearch = function(){
    document.getElementById('searchquery').focus();
  };

  app.onSearchFocus = function(){
    console.log('search box focused!');
    page('/results');
  };

  app.startSearchModal = function(){
    console.log('started a catalog fetch');
    document.getElementById('searchmodal').open();

  };
  app.endSearchModal = function(){
    console.log('ended a catalog fetch');
    document.getElementById('searchmodal').close();
  };

  app.isTrue = function(val) { 
    return !!(val);
  };

  app.resetHomeTimer = function(min) {
    if (app.timer) clearTimeout(app.timer);
    app.timer = setTimeout(function(){ 
      page('/'); 
      // Reload the page to get any changes (many updates coming)
      document.location.reload(true);
    }, min*60*1000);
  }

  document.onmousedown=app.disableclick;
  app.disableclick = function(event) {
    if(event.button == 2) {
      console.log('right click disabled!');
      return false;
    }
  }

})(document);
