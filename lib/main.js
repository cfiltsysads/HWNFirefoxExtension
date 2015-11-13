var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ui = require("sdk/ui");
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var selection = require("sdk/selection");

if (selection.text)
  console.log(selection.text);
  
  
var script = 'self.on("context", function(){'+
             "    return 'Search Hindi WordNet for \"'+document.getSelection().toString().trim()+'\"';"+
             '});'+
             'self.on("click", function(){'+
             '   self.postMessage(document.getSelection().toString().trim());'+
             '});';         
             
var menuItem = contextMenu.Item({
  label: "Search Hindi WordNet",
  context: contextMenu.SelectionContext(),
  contentScript: script,
  image: self.data.url("icon-16.png"),
  onMessage: function (selectionText) {
    console.log(selectionText);
    var url = "http://www.cfilt.iitb.ac.in/wordnet/webhwn/wn.php?hwd="+selection.text;
    tabs.open(url);
  }
});

var button = ui.ActionButton({
  id: "HWN-link",
  label: "Visit Hindi WordNet",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});


  
function handleClick(state) {
	if(selection.text==null){
		tabs.open("http://www.cfilt.iitb.ac.in/wordnet/webhwn/");
	}else{
		tabs.open("http://www.cfilt.iitb.ac.in/wordnet/webhwn/wn.php?hwd="+selection.text);
	}
}

