
var gere0018_Giftr= {
	loadRequirements:0,
    pages:"",
    overlay:"",
    modal:"",
    btnCancel:"",
    btnBack:"",
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
        gere0018_Giftr.modal = document.querySelectorAll('[data-role = "modal"]');
        gere0018_Giftr.btnCancel =  document.querySelectorAll(".btnCancel");
        gere0018_Giftr.peoplePage= document.querySelector("#people-list");
        gere0018_Giftr.occasionPage = document.querySelector("#occasion-list");
        gere0018_Giftr.btnBack = document.querySelectorAll(".backBtn");

        //add hammer Listeners ******************************************************
        //hammer litener for swipe event on both pages
        var hammerPeople = new Hammer(gere0018_Giftr.peoplePage);
        hammerPeople.on("swipeleft", gere0018_Giftr.changePage);
        var hammerOccaision = new Hammer(gere0018_Giftr.occasionPage);
        hammerOccaision.on("swiperight", gere0018_Giftr.changePage  );
//
//        var myElement = document.getElementById('myElement');
//
//// We create a manager object, which is the same as Hammer(), but without the presetted recognizers.
//var mc = new Hammer.Manager(myElement);
//
//
//// Tap recognizer with minimal 2 taps
//mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
//// Single tap recognizer
//mc.add( new Hammer.Tap({ event: 'singletap' }) );
//
//
//// we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
//mc.get('doubletap').recognizeWith('singletap');
//// we only want to trigger a tap, when we don't have detected a doubletap
//mc.get('singletap').requireFailure('doubletap');
//
//
//mc.on("singletap doubletap", function(ev) {
//    myElement.textContent += ev.type +" ";
//});
//


        //hammer litener for tap and double tap on UL for People page
        var peopleListview = document.querySelector("#peopleListview");
        var hammerPeopleListview = new Hammer.Manager(peopleListview);
        var singleTap = new Hammer.Tap({ event: 'singletap' });
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerPeopleListview.add([doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
        hammerPeopleListview.on("singletap", gere0018_Giftr.openGiftsForPerson);
        hammerPeopleListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer litener for tap and double tap on UL for occasion page
        var occasionListview = document.querySelector("#occasionListview");
        var hammerOccasionListview = new Hammer.Manager(occasionListview);
        var singleTap1 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap1 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerOccasionListview.add([doubleTap1, singleTap1]);
        doubleTap1.recognizeWith(singleTap1);
        singleTap1.requireFailure(doubleTap1);
        hammerOccasionListview.on("singletap", gere0018_Giftr.openGiftsForOccasion);
        hammerOccasionListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer listener for the add btn
        var addPerson = document.querySelector("#addPerson");
        var hammerAddPerson = new Hammer(addPerson);
        hammerAddPerson.on('tap', gere0018_Giftr.addPerson);

        var addOccasion = document.querySelector("#addOccasion");
        var hammerAddOccasion = new Hammer(addOccasion);
        hammerAddOccasion.on('tap', gere0018_Giftr.addOccasion);

        //add listener to the cancel btn in all modals
        for(var i=0;i<gere0018_Giftr.btnCancel.length;i++){
        var hammerCancel = new Hammer(gere0018_Giftr.btnCancel[i]);
        hammerCancel.on('tap', gere0018_Giftr.cancelAdd);
        }
        //add listener to the back btn in pages
        for(var i=0;i<gere0018_Giftr.btnBack.length;i++){
        var hammerBtnBack = new Hammer(gere0018_Giftr.btnBack[i]);
        hammerBtnBack.on('tap', gere0018_Giftr.browserBackButton);
        }
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
    openGiftsForPerson:function(ev){
        console.log("openGiftPage");
        var giftsForPerson = document.querySelector("#gifts-for-person");
        giftsForPerson.classList.add("activePage");
        //register state in history to allow backbtn to function
        history.pushState(null, null, "#gifts-for-person");

        //add listener to the add btn
        var addGiftPerPerson = document.querySelector("#addGiftPerPerson");
        var hammerAddGiftPerPerson = new Hammer(addGiftPerPerson);
        hammerAddGiftPerPerson.on('tap', gere0018_Giftr.addGiftPerPerson);


    },
    openGiftsForOccasion:function(){
        console.log("gift for occasion");
        var giftsForOccasion = document.querySelector("#add-gift-occasion");
        giftsForOccasion.classList.add("activePage");
        //register state in history to allow backbtn to function
        history.pushState(null, null, "#add-gift-occasion");


    },

    deleteItem: function(ev){
        console.log("delete item");
        console.log(ev.target);


    },
    addPerson:function(){
        console.log("add person");
        //display overlay and modal to add item
        var addPersonModal = document.querySelector("#add-person");
        gere0018_Giftr.overlay.style.display = "block";
        addPersonModal.style.display = "block";
        //add hammer listeners to save btns
       // var cancelPerson = document.querySelector("#cancelPerson");
        var savePerson = document.querySelector("#savePerson");

        var hammerSave = new Hammer(savePerson);
        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
    },
    addOccasion: function(){
        console.log("add occasion");
        //display overlay and modal to add item
        gere0018_Giftr.overlay.style.display = "block";
        var addOccasionModal = document.querySelector("#add-occasion");
        addOccasionModal.style.display = "block";
        //add hammer listeners to save and cancel btns
        //var cancelOccasion = document.querySelector("#cancelOccasion");
        var saveOccasion = document.querySelector("#saveOccasion");

        var hammerSave = new Hammer(saveOccasion);
        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
    },
    cancelAdd:function(){
      gere0018_Giftr.overlay.style.display = "none";
      for(var i=0;i<gere0018_Giftr.modal.length;i++){
          gere0018_Giftr.modal[i].style.display = "none";
        }


    },
    saveAddedItem:function(){
      console.log("saving item to database");
      gere0018_Giftr.overlay.style.display = "none";
      for(var i=0;i<gere0018_Giftr.modal.length;i++){
          gere0018_Giftr.modal[i].style.display = "none";
        }
    },
     browserBackButton:function (ev){
      ev.preventDefault();
      var currentPage =  ev.target.parentElement.parentElement;
      console.log(currentPage);
      currentPage.classList.remove("activePage");


    },
    addGiftPerPerson:function(){
        gere0018_Giftr.overlay.style.display = "block";
        var giftPerPersonModal = document.querySelector("#add-gift-person");
        giftPerPersonModal.style.display = "block";
        //add hammer listeners to save btns
        var saveOccasion = document.querySelector("#saveOccasion");
        var hammerSave = new Hammer(saveOccasion);
        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
    },



















}

gere0018_Giftr.init();
