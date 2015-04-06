
var gere0018_Giftr= {
	loadRequirements:0,
    db:null,
    version:'1.0',
    overlay:"",
    modal:"",
    btnSave:"",
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
//			gere0018_Giftr.execute();
//		}
//	},
	onDomReady: function(){
//		gere0018_Giftr.loadRequirements++;
//		if(gere0018_Giftr.loadRequirements === 2){
			gere0018_Giftr.execute();
//		}
	},
	execute: function(){
        gere0018_Giftr.prepareDatabase();
        gere0018_Giftr.prepareNavigation();
    },
    prepareNavigation: function(){
        console.log("prepare Navigation");
        gere0018_Giftr.overlay = document.querySelector('[data-role = "overlay"]');
        gere0018_Giftr.modal = document.querySelectorAll('[data-role = "modal"]');
        gere0018_Giftr.btnSave =  document.querySelectorAll(".btnSave");
        gere0018_Giftr.btnCancel =  document.querySelectorAll(".btnCancel");
        gere0018_Giftr.peoplePage= document.querySelector("#people-list");
        gere0018_Giftr.occasionPage = document.querySelector("#occasion-list");
        gere0018_Giftr.btnBack = document.querySelectorAll(".backBtn");
        gere0018_Giftr.peopleListview = document.querySelector("#peopleListview");
        gere0018_Giftr.occasionListview = document.querySelector("#occasionListview");

        //add hammer Listeners ******************************************************
        //hammer litener for swipe event on both pages
        var hammerPeople = new Hammer(gere0018_Giftr.peoplePage);
        hammerPeople.on("swipeleft", gere0018_Giftr.changePage);
        var hammerOccaision = new Hammer(gere0018_Giftr.occasionPage);
        hammerOccaision.on("swiperight", gere0018_Giftr.changePage  );

        //hammer litener for tap and double tap on UL for People page
        var hammerPeopleListview = new Hammer.Manager(gere0018_Giftr.peopleListview);
        var singleTap = new Hammer.Tap({ event: 'singletap' });
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerPeopleListview.add([doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
        hammerPeopleListview.on("singletap", gere0018_Giftr.openGifts);
        hammerPeopleListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer litener for tap and double tap on UL for occasion page
        var hammerOccasionListview = new Hammer.Manager(gere0018_Giftr.occasionListview);
        var singleTap1 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap1 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerOccasionListview.add([doubleTap1, singleTap1]);
        doubleTap1.recognizeWith(singleTap1);
        singleTap1.requireFailure(doubleTap1);
        hammerOccasionListview.on("singletap", gere0018_Giftr.openGifts);
        hammerOccasionListview.on("doubletap", gere0018_Giftr.deleteItem);

        //hammer listener for the add buttons
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

        //add hammer listeners to save btns in all modals
        for(var i=0;i<gere0018_Giftr.btnSave.length;i++){
        var hammerSave = new Hammer(gere0018_Giftr.btnSave[i]);
        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
        }
        //add listener to the back btn in pages
        for(var i=0;i<gere0018_Giftr.btnBack.length;i++){
        var hammerBtnBack = new Hammer(gere0018_Giftr.btnBack[i]);
        hammerBtnBack.on('tap', gere0018_Giftr.browserBackButton);
        }
	},
    prepareDatabase:function(){
         // Open a database *********************
         gere0018_Giftr.db = window.openDatabase("Giftr_DB", "1.0", "Giftr", 1024000);
         //Create  db tables ********************
         gere0018_Giftr.db.transaction( gere0018_Giftr.doTrans, gere0018_Giftr.errFunc,gere0018_Giftr.successFunc );
    },
    doTrans:function(trans){
        trans.executeSql('CREATE TABLE IF NOT EXISTS people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name TEXT)' );
        trans.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name TEXT)' );
        trans.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea TEXT, purchased INTEGER)' );
       //trans.executeSql('INSERT INTO occasions(occ_id, occ_name) VALUES(1, "Halloween")');
        //trans.executeSql('DROP TABLE people');

        //If there are people in database, display them in people list
        //************************************************************
        trans.executeSql( "SELECT * FROM people", [ ], querySuccess1);
        function querySuccess1( trans, results){
            console.log( results.rows.length );
            var len = results.rows.length;
            if(len !== 0){
                for( var i=0; i<len; i++){
                    console.log( results.rows.item(i).person_name );
                    gere0018_Giftr.peopleListview.innerHTML += '<li>' + results.rows.item(i).person_name + '</li>';
                }


            }
        }
        //If there are occasions in database, display them in occasion list
        //******************************************************************
        trans.executeSql( "SELECT * FROM occasions", [ ], querySuccess2, errQuery2);
        function querySuccess2( trans, results){
            console.log( results.rows.length );
            var len = results.rows.length;
            if(len !== 0){
                for( var i=0; i<len; i++){
                    console.log( results.rows.item(i).occ_name);
                    gere0018_Giftr.occasionListview.innerHTML += '<li>' + results.rows.item(i).occ_name + '</li>';
                }


            }
        }
        function errQuery2(){
            console.log("err in Query2");
        }

        //If there are gifts in database, display them in gift lists
        //***********************************************************
        trans.executeSql( "SELECT * FROM gifts AS g INNER JOIN people AS p ON g.person_id = p.person_id INNER JOIN occasions AS o ON g.occ_id = o.occ_id ", [ ], querySuccess3, errQuery3);
        function querySuccess3( trans, results){
            console.log( results.rows.length );
            var len = results.rows.length;
            var giftForPersonListview = document.querySelector("#giftForPersonListview");
            var giftForOccasionListview = document.querySelector("#giftForOccasionListview");

            if(len !== 0){
                for( var i=0; i<len; i++){
                    console.log( results.rows.item(i).person_name );
                    giftForPersonListview.innerHTML += '<li>' + results.rows.item(i).gift_idea +
                        results.rows.item(i).occ_name +'</li>';
                    giftForOccasionListview.innerHTML += '<li>' + results.rows.item(i).gift_idea +
                        results.rows.item(i).person_name +'</li>';
                }

            }
        }
        function errQuery3(){
            console.log("err in Query3");
        }


    },
    successFunc:function(){
        console.log("transaction success");
    },
    errFunc:function(){
        console.log("transaction failure");
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
            giftsForPerson.className = "activePage pt-page-moveFromBottom";
            setTimeout(function(){
            giftsForPerson.className = "activePage";
            }, 600);
        }else{
            //if we are on occasion page
            var giftsForOccasion = document.querySelector("#gifts-for-occasion");
            giftsForOccasion.className = "activePage pt-page-moveFromBottom";
            setTimeout(function(){
            giftsForOccasion.className = "activePage";
            }, 600);
        }


    },
    deleteItem: function(ev){
        console.log("delete item");
        var currentItem = ev.target;
        console.log(currentItem);
        //update the database
        console.log(currentItem.innerHTML);
        //case 1 delete a person **********************************************
        if(ev.target.parentElement.id == "peopleListview"){
            gere0018_Giftr.db.transaction(function(trans){
                trans.executeSql('DELETE From people WHERE person_name = "' +
                                 currentItem.innerHTML + '"');
             });
        }
        //case 2 delete an Occasion **********************************************
        if(ev.target.parentElement.id == "occasionListview"){
            gere0018_Giftr.db.transaction(function(trans){
                trans.executeSql('DELETE From occasions WHERE occ_name = "' +
                                 currentItem.innerHTML + '"');
             });
        }
        //remove the item from the list
        currentItem.parentElement.removeChild(currentItem);


    },
    addPerson:function(){
        //console.log("add person");
        //display overlay and modal to add item
        var addPersonModal = document.querySelector("#add-person");
        gere0018_Giftr.overlay.style.display = "block";
        addPersonModal.style.display = "block";

    },
    addOccasion: function(){
        console.log("add occasion");
        //display overlay and modal to add item
        gere0018_Giftr.overlay.style.display = "block";
        var addOccasionModal = document.querySelector("#add-occasion");
        addOccasionModal.style.display = "block";
//        //add hammer listeners to save and cancel btns
//        var saveOccasion = document.querySelector("#saveOccasion");
//        var hammerSave = new Hammer(saveOccasion);
//        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
    },
    addGiftPerPerson:function(){
        gere0018_Giftr.overlay.style.display = "block";
        var giftPerPersonModal = document.querySelector("#add-gift-person");
        giftPerPersonModal.style.display = "block";
//        //add hammer listeners to save btns
//        var saveGiftPerPerson = document.querySelector("#saveGiftPerPerson");
//        var hammerSave = new Hammer(saveGiftPerPerson);
//        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);
    },
     addGiftPerOccasion:function(){
         console.log("add gift per occasion");
        gere0018_Giftr.overlay.style.display = "block";
        var giftPerOccasionModal = document.querySelector("#add-gift-occasion");
        giftPerOccasionModal.style.display = "block";
//         //add hammer listeners to save btns
//        var saveGiftPerOccasion = document.querySelector("#saveGiftPerOccasion");
//        var hammerSave = new Hammer(saveGiftPerOccasion);
//        hammerSave.on('tap', gere0018_Giftr.saveAddedItem);

     },

    cancelAdd:function(){
      gere0018_Giftr.overlay.style.display = "none";
      for(var i=0;i<gere0018_Giftr.modal.length;i++){
          gere0018_Giftr.modal[i].style.display = "none";
        }


    },
    saveAddedItem:function(ev){
      console.log("saving item to database");
      ev.preventDefault(); //prevent form from submitting.
      //save added item to the database
      //case 1 add a person **********************************************
      if(ev.target.id == "savePerson"){
          console.log("inside save person");
          var newPerson = document.querySelector("#new-per").value;
          if(newPerson){
              console.log("inserting person");
                //save the value in the people table
                gere0018_Giftr.db.transaction(function(trans){
                    trans.executeSql('INSERT INTO people(person_name) VALUES("' + newPerson+ '")');
                     //display added item in the listview
                      gere0018_Giftr.peopleListview.innerHTML += '<li>' + newPerson + '</li>';

                });
            }
      }
    //case 2 add an occasion **********************************************
        if(ev.target.id == "saveOccasion"){
          console.log("inside save occasion");
          var newOccasion = document.querySelector("#new-occ").value;
          if(newOccasion){
              console.log("inserting occasion");
                //save the value in the occasions table
                gere0018_Giftr.db.transaction(function(trans){
                    trans.executeSql('INSERT INTO occasions(occ_name) VALUES("' + newOccasion + '")');
                     //display added item in the listview
                      gere0018_Giftr.occasionListview.innerHTML += '<li>' + newOccasion + '</li>';

                });
            }
      }

      //remove modal and overlay
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


    }




















}

gere0018_Giftr.init();
