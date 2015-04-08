
var gere0018_Giftr= {
	loadRequirements:0,
    db:null,
    version:'1.0',
    overlay:"",
    modal:"",
    btnSave:"",
    btnCancel:"",
    btnBack:"",
    personName:"",
    occasionName:"",
    peoplePage:"",
    occasionPage:"",
    peopleListview:"",
    occasionListview:"",
    giftForPersonListview:"",
    giftForOccasionListview:"",
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
        gere0018_Giftr.giftForPersonListview = document.querySelector("#giftForPersonListview");
        gere0018_Giftr.giftForOccasionListview = document.querySelector("#giftForOccasionListview");

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
         if(gere0018_Giftr.db.version == ''){
            console.info('First time running... create tables');
            //increment the version and create the tables
            gere0018_Giftr.db.changeVersion('', '1.0');
         }else{
             gere0018_Giftr.db.transaction( gere0018_Giftr.doTrans,
                                          gere0018_Giftr.errFunc,
                                          gere0018_Giftr.successFunc );
         }
    },
    doTrans:function(trans){
        //create all three tables **************************
        trans.executeSql('CREATE TABLE IF NOT EXISTS people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name TEXT)' );
        trans.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name TEXT)' );
        trans.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea TEXT, purchased INTEGER)' );
//        trans.executeSql('DELETE FROM sqlite_sequence WHERE name = "people"');
//        trans.executeSql('DROP TABLE people');

        //If there are people in database, display them in people list
        //************************************************************
        trans.executeSql( "SELECT * FROM people", [ ], querySuccess1,errQuery1);
        function querySuccess1( trans, results){
            console.log( results.rows.length );
            var len = results.rows.length;
            var peopleList = document.querySelector("#list-per-person");
            if(len !== 0){
                for( var i=0; i<len; i++){
                    console.log( results.rows.item(i).person_name );
                    gere0018_Giftr.peopleListview.innerHTML += '<li data-person = "'
                                    + results.rows.item(i).person_id +
                                    '">' + results.rows.item(i).person_name + '</li>';

                    //add them as options in the people list
                    //***********************************************
                    peopleList.innerHTML += '<option value = "' +
                               results.rows.item(i).person_id + '">' +
                               results.rows.item(i).person_name +'</option>';
                }

            }
        }
        function errQuery1(){
            console.log("err in Query1 : cannot get data from people table");
        }
        //If there are occasions in database, display them in occasion list
        //******************************************************************
        trans.executeSql( "SELECT * FROM occasions", [ ], querySuccess2, errQuery2);
        function querySuccess2( trans, results){
            console.log( results.rows.length );
            var len = results.rows.length;
            var occasionList = document.querySelector("#list-per-occ");
            if(len !== 0){
                for( var i=0; i<len; i++){
                    console.log( results.rows.item(i).occ_name);
                    gere0018_Giftr.occasionListview.innerHTML += '<li data-occasion = "' +
                                        + results.rows.item(i).occ_id + '">'
                                        + results.rows.item(i).occ_name + '</li>';

                    //add all occasions as options in the occasionList
                    //*************************************************
                   occasionList.innerHTML += '<option value = "'
                                + results.rows.item(i).occ_id + '">' +
                                  results.rows.item(i).occ_name +'</option>';

                }

            }
        }
        function errQuery2(){
            console.log("err in Query2 : cannot get data from occasion table");
        }

    },
    successFunc:function(){
        console.log("transaction success");
    },
    errFunc:function(){
        console.log("transaction failure");
    },
    //change pages with transition on swipe event. ********************************************
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
     addPerson:function(){
        gere0018_Giftr.overlay.style.display = "block";
        var addPersonModal = document.querySelector("#add-person");
        addPersonModal.style.display = "block";
    },
    addOccasion: function(){
        gere0018_Giftr.overlay.style.display = "block";
        var addOccasionModal = document.querySelector("#add-occasion");
        addOccasionModal.style.display = "block";
    },


    //ADD person name and id here
    addGiftPerPerson:function(ev){
        var personName = ev.target.parentElement.querySelector("h2").innerHTML;
        console.log( personName);
        var personId = ev.target.parentElement.querySelector("h2").getAttribute("data-person");
        var H3 = document.querySelector("#add-gift-person h3");
        H3.innerHTML = "Gifts for " + personName;
        H3.setAttribute("data-person", personId);

        var giftPerPersonModal = document.querySelector("#add-gift-person");
        gere0018_Giftr.overlay.style.display = "block";
        giftPerPersonModal.style.display = "block";


    },
     addGiftPerOccasion:function(ev){
        var occasionName = ev.target.parentElement.querySelector("h2").innerHTML;
        var occasionId = ev.target.parentElement.querySelector("h2").getAttribute("data-occasion");
        var H3 = document.querySelector("#add-gift-person h3");
        H3.innerHTML = "Gifts for " + occasionName;
        H3.setAttribute("data-person", occasionId);

        var giftPerOccasionModal = document.querySelector("#add-gift-occasion");
        gere0018_Giftr.overlay.style.display = "block";
        giftPerOccasionModal.style.display = "block";

     },

    cancelAdd:function(){
      gere0018_Giftr.overlay.style.display = "none";
      for(var i=0;i<gere0018_Giftr.modal.length;i++){
          gere0018_Giftr.modal[i].style.display = "none";
        }
    },
    openGifts:function(ev){
        console.log(ev.target.parentElement.id);
        if(ev.target.parentElement.id == "peopleListview"){
            //Add person name and Id in the gift for person page
            var personName = ev.target.innerHTML;
            var personId = ev.target.getAttribute("data-person");
            var H2 = document.querySelector("#gifts-for-person h2");
            H2.innerHTML = "Gifts for " + personName;
            H2.setAttribute("data-person", personId);

            //open gift for person page with transition
            var giftsForPerson = document.querySelector("#gifts-for-person");
            giftsForPerson.className = "activePage pt-page-moveFromBottom";
            setTimeout(function(){
            giftsForPerson.className = "activePage";
            }, 600);

            //display data gift_idea and occ_name for Person selected
            //********************************************************
            gere0018_Giftr.db.transaction(function(trans){
                trans.executeSql( 'SELECT g.gift_idea, g.gift_id, g.purchased, o.occ_name FROM gifts AS g INNER JOIN occasions as o ON g.occ_id = o.occ_id WHERE g.person_id = ' + personId + ' ORDER BY o.occ_name, g.gift_idea', [ ], querySuccess1, errQuery1);

                    function querySuccess1( trans, results){
                        var occasionNames = "";
                        var giftIdea = "";
                        var len = results.rows.length;
                        if(len !== 0){
                            for( var i=0; i<len; i++){
                                occasionNames = results.rows.item(i).occ_name;
                                giftIdea = results.rows.item(i).gift_idea;
                                console.log(occasionNames);
                                console.log(giftIdea);
                                gere0018_Giftr.giftForPersonListview.innerHTML += '<li>' +
                                                                giftIdea + ' - ' + occasionNames
                                                                + '</li>';

                            }
                        }
                    }
                function errQuery1(trans, error){
                    console.error(error.message);
                    console.log("err in Query2: cannot get gift_idea and occ_name for Person selected");
                }

            });

        }else{
            //Add person name and Id in the gift for person page
            var occasionName = ev.target.innerHTML;
            var occasionId = ev.target.getAttribute("data-occasion");
            var H2 = document.querySelector("#gifts-for-occasion h2");
            H2.innerHTML = "Gifts for " + occasionName;
            H2.setAttribute("data-person", occasionId);

            //open gift for occasion page with transition
            var giftsForOccasion = document.querySelector("#gifts-for-occasion");
            giftsForOccasion.className = "activePage pt-page-moveFromBottom";
            setTimeout(function(){
            giftsForOccasion.className = "activePage";
            }, 600);

            //display data gift_idea and person_name for Occasion selected
            //********************************************************
            gere0018_Giftr.db.transaction(function(trans){
                trans.executeSql( 'SELECT g.gift_idea, g.gift_id, g.purchased, p.person_name FROM gifts AS g INNER JOIN people as p ON g.person_id = p.person_id WHERE g.occ_id = ' + occasionId + ' ORDER BY p.person_name, g.gift_idea', [ ], querySuccess2, errQuery2);

                    function querySuccess2( trans, results){
                        var peopleNames = [];
                        var giftIdea = [];
                        var len = results.rows.length;
                        if(len !== 0){
                            for( var i=0; i<len; i++){
                                peopleNames = results.rows.item(i).person_name;
                                giftIdea = results.rows.item(i).gift_idea;
                                console.log(peopleNames);
                                console.log(giftIdea);
                                gere0018_Giftr.giftForOccasionListview.innerHTML += '<li>' +
                                                                giftIdea + ' - ' + peopleNames
                                                                + '</li>';

                            }
                        }
                    }
                  function errQuery2(trans, error){
                            console.error(error.message);
                }

            });

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
                //add code to update gifts table when data is deleted
             });
        }

        //case 2 delete an Occasion **********************************************
        if(ev.target.parentElement.id == "occasionListview"){
            gere0018_Giftr.db.transaction(function(trans){
                trans.executeSql('DELETE From occasions WHERE occ_name = "' +
                                 currentItem.innerHTML + '"');
                //add code to update gifts table when data is deleted
             });
        }

        //remove the item from the list
        currentItem.parentElement.removeChild(currentItem);
    },

    saveAddedItem:function(ev){
      ev.preventDefault(); //prevent form from submitting.
      //case 1 add a person **********************************************
      if(ev.target.id == "savePerson"){
          var newPerson = document.querySelector("#new-per").value;
          if(newPerson){
                //Insert new person in the people table
               //***************************************
                gere0018_Giftr.db.transaction(function(trans){
                    trans.executeSql('INSERT INTO people(person_name) VALUES("'
                                     + newPerson+ '")', [], querySuccess1);
                    function querySuccess1( trans, results){
                         var personId = results.insertId;

                    //display added item in the listview
                    //***********************************
                    gere0018_Giftr.peopleListview.innerHTML += '<li data-person = "'
                                    + personId + '">' + newPerson + '</li>';
                    }

                });
            }
      }
      //case 2 add an occasion **********************************************
      if(ev.target.id == "saveOccasion"){
          var newOccasion = document.querySelector("#new-occ").value;
          if(newOccasion){
                //Insert new occasion in the occasions table
                //**************************************
                gere0018_Giftr.db.transaction(function(trans){
                    trans.executeSql('INSERT INTO occasions(occ_name) VALUES("'
                                     + newOccasion + '")', [], querySuccess2);
                    function querySuccess2( trans, results){
                         var occasionId = results.insertId;

                    //display added item in the listview
                    //***********************************
                    gere0018_Giftr.occasionListview.innerHTML += '<li data-occasion = "'
                                    + occasionId + '">' + newOccasion + '</li>';
                    }
                });
            }
      }
       //case 3 add gift for person **********************************************
         if(ev.target.id == "saveGiftPerPerson"){
              var H3 = document.querySelector("#add-gift-person h3");
              var personId = H3.getAttribute("data-person");
              var newIdea = document.querySelector("#new-idea-person").value;
              var occasionList = document.querySelector("#list-per-occ");
              var occasionId = occasionList.value;
              function getSelectedText(occasionId) {
                if (occasionList.selectedIndex == -1){
                     return null;
                }
                    return occasionList.options[occasionList.selectedIndex].text;
              }

              var selectedOccasion = getSelectedText('test');

             console.log(selectedOccasion + occasionId );

              if(newIdea){
                   gere0018_Giftr.db.transaction(function(trans){
                       trans.executeSql('INSERT INTO gifts (person_id, occ_id, gift_idea) VALUES('+
                                         personId + ', ' + occasionId + ', "' + newIdea + '")', [], querySuccess3,
                                         queryError3);
                        function querySuccess3( trans, results){
                            console.log("should have inserted in database");
                        }
                       function queryError3(trans, error){
                            console.error(error.message);
                        }

                    });
             //display data gift_idea and occ_name for Person selected
              //********************************************************
                   gere0018_Giftr.giftForPersonListview.innerHTML += '<li>' + newIdea +
                                    '  -  ' + selectedOccasion +  '</li>';

              }

        }
        //case 4 add gift for occasion **********************************************
         if(ev.target.id == "saveGiftPerOccasion"){
              var H3 = document.querySelector("#add-gift-occasion h3");
              var occasionId = H3.getAttribute("data-occasion");
              var newIdea = document.querySelector("#new-idea-occasion").value;
              var peopleList = document.querySelector("#list-per-person");
              var personId = peopleList.value;

             function getSelectedText(personId) {
                if (peopleList.selectedIndex == -1){
                     return null;
                }
                    return peopleList.options[peopleList.selectedIndex].text;
              }

              var selectedPerson = getSelectedText('test');

             console.log(selectedPerson + occasionId );


             //display data gift_idea and occ_name for Person selected
              //********************************************************


              if(newIdea){
                   gere0018_Giftr.db.transaction(function(trans){
                       trans.executeSql('INSERT INTO gifts (person_id, occ_id, gift_idea) VALUES("'+
                                         personId + occasionId + newIdea + '"');
                    });
                  gere0018_Giftr.giftForOccasionListview.innerHTML += '<li>' + newIdea +
                                    '  -  ' + selectedPerson +  '</li>';
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


