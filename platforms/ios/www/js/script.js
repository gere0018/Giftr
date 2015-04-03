
var gere0018_Giftr= {
	loadRequirements:0,
    pages:"",
    peoplePage:"",
    occasionPage:"",
    peopleListview:"",
    occasionListview:"",
	init: function(){
		//document.addEventListener("deviceready",gere0018_Giftr.onDeviceReady);
		document.addEventListener("DOMContentLoaded", gere0018_Giftr.onDomReady);
	},
//	onDeviceReady: function(){
//		gere0018_Giftr.loadRequirements++;
//		if(gere0018_Giftr.loadRequirements === 2){
//			gere0018_Giftr.start();
//		}
//	},
	onDomReady: function(){
//		gere0018_Giftr.loadRequirements++;
//		if(gere0018_Giftr.loadRequirements === 2){
			gere0018_Giftr.execute();
//		}
	},
	execute: function(){
        console.log("execute");
        //gere0018_Giftr.pages = document.querySelectorAll('[data-role = "page"]');
        gere0018_Giftr.peoplePage= document.querySelector("#people-list");
        gere0018_Giftr.occasionPage = document.querySelector("#occasion-list");


        //add hammer Listeners ******************************************************

        var hammerPeople = new Hammer.Manager(gere0018_Giftr.peoplePage);
        var swipeLeft = new Hammer.Swipe({ event: 'swipeleft', direction: Hammer.DIRECTION_LEFT,
                                   threshold: 20, velocity:0.80 });
        var singleTap = new Hammer.Tap({ event: 'singletap', taps: 1 })
        var doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
        hammerPeople.add([swipeLeft, doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure([doubleTap]);
        hammerPeople.on("singletap", gere0018_Giftr.openManageGiftPage);
        hammerPeople.on("doubletap", gere0018_Giftr.deleteItem);
        hammerPeople.on("swipeleft", gere0018_Giftr.changePage);


        var hammerOccaision = new Hammer.Manager(gere0018_Giftr.peoplePage);
        hammerOccaision.on("singletap", gere0018_Giftr.openManageGiftPage);
        hammerOccaision.on("doubletap", gere0018_Giftr.deleteItem);
        hammerOccaision.on("swipeleft", gere0018_Giftr.changePage);

        //add listener to hardware's back button*****************************************
        //window.addEventListener("popstate", gere0018_Giftr.browserBackButton, false);
	},
    changePage: function(ev){
        console.log("changePage");
        if(ev.target.id == "people-list"){
            gere0018_Giftr.occasionPage.classList.add("activePage");
            gere0018_Giftr.peoplePage.classList.remove("activePage");
            console.log("people-list");
        }else{
             gere0018_Giftr.peoplePage.classList.add("activePage");
             gere0018_Giftr.occasionPage.classList.remove("activePage");
            console.log("occaision");
        }

    },
    openManageGiftPage:function(){
        console.log("openManageGiftPage");


    },
    deleteItem: function(){
        console.log("delete item");


    },


















}

gere0018_Giftr.init();
