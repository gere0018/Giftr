
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

        //hammer litener for tap and double tap on UL for People page
        var peopleListview = document.querySelector("#peopleListview");
        var hammerPeopleListview = new Hammer.Manager(peopleListview);
        var singleTap = new Hammer.Tap({ event: 'singletap' });
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerPeopleListview.add([doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
        hammerPeopleListview.on("singletap", gere0018_Giftr.openGifts);
        hammerPeopleListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer litener for tap and double tap on UL for occasion page
        var occasionListview = document.querySelector("#occasionListview");
        var hammerOccasionListview = new Hammer.Manager(occasionListview);
        var singleTap1 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap1 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerOccasionListview.add([doubleTap1, singleTap1]);
        doubleTap1.recognizeWith(singleTap1);
        singleTap1.requireFailure(doubleTap1);
        hammerOccasionListview.on("singletap", gere0018_Giftr.openGifts);
        hammerOccasionListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer listener for the add btns
        var addPerson = document.querySelector("#addPerson");
        var hammerAddPerson = new Hammer(addPerson);
        hammerAddPerson.on('tap', gere0018_Giftr.addPerson);

        var addOccasion = document.querySelector("#addOccasion");
        var hammerAddOccasion = new Hammer(addOccasion);
        hammerAddOccasion.on('tap', gere0018_Giftr.addOccasion);

        var addGiftPerPerson = document.querySelector("#addGiftPerPerson");
        var hammerAddGiftPerPerson = new Hammer(addGiftPerPerson);
        hammerAddGiftPerPerson.on('tap', gere0018_Giftr.addGiftPerPerson);

        var  addGiftPerOccasion = document.querySelector("#addGiftPerOccasion");
        var hammerAddGiftPerOccasion = new Hammer(addGiftPerOccasion);
        hammerAddGiftPerOccasion.on('tap', gere0018_Giftr.addGiftPerOccasion);

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
            gere0018_Giftr.occasionPage.className = "activePage pt-page-moveFromRight";
            gere0018_Giftr.peoplePage.classList.add("pt-page-moveToLeft");
            setTimeout(function(){
            gere0018_Giftr.peoplePage.className = "";
            gere0018_Giftr.occasionPage.className = "activePage";
            }, 600);
        }else{
            //if we are on occasion page
            gere0018_Giftr.peoplePage.className = "activePage pt-page-moveFromLeft";
            gere0018_Giftr.occasionPage.classList.add("pt-page-moveToRight");
            setTimeout(function(){
            gere0018_Giftr.occasionPage.className = "";
            gere0018_Giftr.peoplePage.className = "activePage";
            }, 600);
            console.log("occasion");
        }

    },
    openGifts:function(ev){
        if(ev.target.id == "people-list"){
            var giftsForPerson = document.querySelector("#gifts-for-person");
            giftsForPerson.className = "activePage pt-page-moveFromRight";
            gere0018_Giftr.peoplePage.classList.add("pt-page-moveToLeft");
            setTimeout(function(){
            gere0018_Giftr.peoplePage.className = "";
            giftsForPerson.className = "activePage";
            }, 600);
        }else{
            //if we are on occasion page
            var giftsForOccasion = document.querySelector("#gifts-for-occasion");
            giftsForOccasion.className = "activePage pt-page-moveFromBottom";
            gere0018_Giftr.occasionPage.classList.add("pt-page-moveToTop");
            setTimeout(function(){
            gere0018_Giftr.occasionPage.className = "";
            giftsForOccasion.className = "activePage";
            }, 600);
        }


    },
//    openGiftsForPerson:function(ev){
//        console.log("openGiftPage");
//        var giftsForPerson = document.querySelector("#gifts-for-person");
//        giftsForPerson.classList.add("activePage");
//        //register state in history to allow backbtn to function
//        history.pushState(null, null, "#gifts-for-person");
//
//
//    },
//    openGiftsForOccasion:function(){
//        console.log("gift for occasion");
//        var giftsForOccasion = document.querySelector("#gifts-for-occasion");
//        giftsForOccasion.classList.add("activePage");
//        //register state in history to allow backbtn to function
//        history.pushState(null, null, "#add-gift-occasion");
//
//    },

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
     addGiftPerOccasion:function(){
         console.log("add gift per occasion");
        gere0018_Giftr.overlay.style.display = "block";
        var giftPerOccasionModal = document.querySelector("#add-gift-occasion");
        giftPerOccasionModal.style.display = "block";



     }



















}

gere0018_Giftr.init();
