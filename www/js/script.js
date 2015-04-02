
var gere0018_Giftr= {
	loadRequirements:0,
	init: function(){
		document.addEventListener("deviceready",gere0018_Giftr.onDeviceReady);
		document.addEventListener("DOMContentLoaded", gere0018_Giftr.onDomReady);
	},
	onDeviceReady: function(){
		gere0018_Giftr.loadRequirements++;
		if(gere0018_Giftr.loadRequirements === 2){
			gere0018_Giftr.start();
		}
	},
	onDomReady: function(){
		gere0018_Giftr.loadRequirements++;
		if(gere0018_Giftr.loadRequirements === 2){
			gere0018_Giftr.start();
		}
	},
	start: function(){
		//connect to database
		//build the lists for the main pages based on data
		//add button and navigation listeners
	}
}

gere0018_Giftr.init();
