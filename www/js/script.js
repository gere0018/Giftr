
var gere0018_Giftr= {
	loadRequirements:0,
    pages:"",
    overlay:"",
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
        gere0018_Giftr.overlay = document.querySelector('[data-role = "overlay"]');
        gere0018_Giftr.peoplePage= document.querySelector("#people-list");
        gere0018_Giftr.occasionPage = document.querySelector("#occasion-list");
        var addPerson = document.querySelector("#addPerson");
        var addOccasion = document.querySelector("#addOccasion");

        //add hammer Listeners ******************************************************
        //hammer litener for swipe event on both pages
        var hammerPeople = new Hammer(gere0018_Giftr.peoplePage);
        hammerPeople.on("swipeRight", gere0018_Giftr.changePage);
        var hammerOccaision = new Hammer.Manager(gere0018_Giftr.occasionPage);
        hammerOccaision.on("swipeleft", gere0018_Giftr.changePage  );

        //hammer litener for tap and double tap on UL
        var peopleListview = document.querySelector("#peopleListview");
        var occasionListview = document.querySelector("#occasionListview");
        hammerOccaision.on("singletap", gere0018_Giftr.openManageGiftPage);
        hammerOccaision.on("doubletap", gere0018_Giftr.deleteItem);
        var hammerPeopleListview = new Hammer.Manager(peopleListview);
        var hammerOccasionListview = new Hammer.Manager(occasionListview);
        var singleTap = new Hammer.Tap({ event: 'singletap', taps: 1 })
        var doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
        hammerPeopleListview.add([doubleTap, singleTap]);
        hammerOccasionListview.add([doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure([doubleTap]);

        hammerPeopleListview.on("singletap", gere0018_Giftr.openManageGiftPage);
        hammerPeopleListview.on("doubletap", gere0018_Giftr.deleteItem);
        hammerOccasionListview.on("singletap", gere0018_Giftr.openManageGiftPage);
        hammerOccasionListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer listener for the add btn
        var hammerAddPerson = new Hammer( addPerson);
        hammerAddPerson.on('tap', gere0018_Giftr.addPerson);
        var hammerAddOccasion = new Hammer( addOccasion);
        hammerAddOccasion.on('tap', gere0018_Giftr.addOccasion);


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
    openManageGiftPage:function(ev){
        console.log("openManageGiftPage");
        console.log(ev.target);


    },
    deleteItem: function(ev){
        console.log("delete item");
        console.log(ev.target);


    },
    addPerson:function(){
        console.log("add person");
        var addPersonModal = document.querySelector("#add-person");
        gere0018_Giftr.overlay.style.display = "block";
        addPersonModal.style.display = "block";

    },
    addOccasion: function(){
        console.log("add occasion");
        gere0018_Giftr.overlay.style.display = "block";
        var addOccasionModal = document.querySelector("#add-occasion");
        addOccasionModal.style.display = "block";
    },


















}

gere0018_Giftr.init();
