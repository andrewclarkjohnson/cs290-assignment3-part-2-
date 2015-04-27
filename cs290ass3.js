// window.alert("Hello Dere!");

var favorites = null;



window.onload = function getAPI () 
{
	update_gist_list();
	//document.getElementsByName("num_pages")[0].onchange = function() {update_gist_list()};
	document.getElementsByName("num_pages")[0].onchange = function() {update_gist_list()};
	

	document.getElementById("searchBtn").onclick = function() {
		//var sT = document.getElementById("searchTextInput");
		//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~", sT);
		//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
		saveSearchInLocalStorage();
		//saveSearchInLocalStorage(sT.value);
		//whatsInLocalStorage();
		//addSearchTermtoTextArea(sT.value);
		update_gist_list();
	};

	//poor coding but functional for now - improve if time 
	

	document.getElementsByName("languageTypes")[0].onchange = function() {update_gist_list()};
	document.getElementsByName("languageTypes")[1].onchange = function() {update_gist_list()};
	document.getElementsByName("languageTypes")[2].onchange = function() {update_gist_list()};
	document.getElementsByName("languageTypes")[3].onchange = function() {update_gist_list()};

	// SIDE LIST OF FAVORITES
	
	/*for (var k=0; k<document.getElementsByName("num_pages")[0].value; k++)
	{
		document.getElementsByName("addToFaves")[k].onchange = function() { addToFavorites(k) };
	}
	*/

	//document.getElementById("languageTypes")[3].onchange = function() {update_gist_list()};

			function update_gist_list() 
			{
				var favoritesStr = localStorage.getItem('allFavorites');
				if( favoritesStr === null ) {
					favorites = {'faveGists':[]};
					localStorage.setItem('allFavorites', JSON.stringify(favorites));
				}
				else {
					favorites = JSON.parse(localStorage.getItem('allFavorites'));
				}
				console.log("***", favorites);
				saveSearchInLocalStorage();
				var searchInput ; 
				//searchInput= localStorage.getItem("searchTerm");
				//if(searchInput) console.log(searchInput);
				//alert(searchInput);
				

				//searchInput = getLocalStorage(searchTerm);	
				//console.log("Search Term: ", searchInput);
				var req = new XMLHttpRequest();
					if (!req) 
					{
						throw "Unable to create HttpRequest.";
					}
				var url = "https://api.github.com/gists?per_page=";

			    var num_gists_to_show = document.getElementsByName("num_pages")[0].value;
			    url += num_gists_to_show;
			    //alert(num_gists_to_show);
				var gistList = "";

				//poor coding but functional - improve if time 
				var language1 = document.getElementsByName("languageTypes")[0].checked;
				var language2 = document.getElementsByName("languageTypes")[1].checked;
				var language3 = document.getElementsByName("languageTypes")[2].checked;
				var language4 = document.getElementsByName("languageTypes")[3].checked;
				//console.log(language1, language2,language3, language4);
				//document.getElementById('elName').innerHTML = "";
/*
			    var params {
					per_page: num_gists_to_show 
				};
				url += '?' + addParametersToURL(params);
*/
				req.onreadystatechange = function ()  // uncomment this and recomment above line
					{
						
						var i;	
						if(this.readyState === 4 && this.status===200) 
						{
							 
						var gistInfo = JSON.parse(this.responseText);
						//console.log(gistInfo.length);

						

							//var info1 = gistInfo.list ??? 
							// element 11 should be the description
							// gistInfo[11]
							//var description = gistInfo[0]["description"]; // 1st entry
							//console.log(description);
							document.getElementById('gistlistcontainer').innerHTML = "";
							gistList = document.getElementById("gistlistcontainer");
							var listStart = document.createElement("ol");
							var listElementStart=document.createTextNode("");
							var listInfo=document.createTextNode("");
							var listLanguage=document.createTextNode("");
							var filterByLanguage = (language1 || language2 || language3 || language4);
							//console.log("at least one is true: ", filterByLanguage);
							var numLanguageTypes = document.getElementsByName("languageTypes").length;
							//console.log ("Num language types: ", numLanguageTypes);
							
							var addtoFav;
							var thisID,thisInfo;

							searchInput= localStorage.getItem("searchTerm");
							if (searchInput == null) {searchInput=""; } // do I need this?
							/*
							if (searchInput)
							{
								searchInput = document.getElementById("searchTextInput");
							}
							else
							{
								searchInput="";
							}
*/
							//console.log (searchInput);
							
							for (i=0; i<gistInfo.length; i++)
							{
								// console.log ("num_pages: ", gistInfo.length);
								var gistDescription = gistInfo[i]["description"];
								if (gistDescription == null || gistDescription == "") { gistDescription = "No description given"; }
								listInfo = document.createTextNode(gistDescription);
								listFile = gistInfo[i]["files"];
								//if(filterByLanguage)
								//{
									// HORRIBLE FIX TO CODE
									if (!filterByLanguage) {
										numLanguageTypes = 1;
									}
									for (j=0;j<numLanguageTypes; j++)
									{
										//console.log("**: ", document.getElementsByName("languageTypes")[j].value, document.getElementsByName("languageTypes")[j].checked);
										for (obj in listFile)
										{
											//console.log("<>", obj, listFile);
											if(!filterByLanguage || listFile[obj].language == document.getElementsByName("languageTypes")[j].value)
											{
												//console.log("+", searchInput);
												//if((!filterByLanguage || document.getElementsByName("languageTypes")[j].checked == true))
												if((!filterByLanguage || document.getElementsByName("languageTypes")[j].checked == true) )
												{
													//console.log("Hello");
													// console.log("1.", searchInput.length);
													// console.log("2a.", gistDescription);
													// console.log("2b.", gistDescription.indexOf(searchInput));
													// console.log("3.", filterByLanguage);
													// console.log("4.", document.getElementsByName("languageTypes")[j].checked);
													if(searchInput.length==0 || gistDescription.indexOf(searchInput)>-1)
													{
														listElementStart = document.createElement("li");

													// TEACHER CODE
													// var row = document.createElement("li");
											        var rowLink = document.createElement("a");
											            //rowLink.href = listFile[obj].url;
											            rowLink.href = gistInfo[i].url;
											            rowLink.className = 'gitLink';
											            rowLink.target = "_blank";

											        //var fileDesc = document.createTextNode(listFile[obj].desc);
											       /*
											        if(listInfo === '' || listInfo === null){
											            listInfo = document.createTextNode('No Decription Entered')
											        }
											        */
											        thisInfo = gistInfo[i].id;
											        thisInfo +="~~:~~";
											        thisInfo += gistDescription;
											        thisInfo +="~~:~~";
											        thisInfo +=gistInfo[i].url;
											        //thisInfo +="~~:~~";
											        //thisInfo +=gistInfo[i].language;
											        var newButton ="<button onclick=\"saveFavorite(\'" + thisInfo + " \' ) \">  +</button>";
											        addtoFav = document.createElement("span");
											        addtoFav.innerHTML = newButton;
											         
														//addtoFav.innerHTML = ;
/*
var fbutton = document.createElement("button");
fbutton.innerHTML = "+";
fbutton.setAttribute("gistId", gist.id);
fbutton.onclick = function(){
	var gistId = this.getAttribute("gistId"); //this is what you have saved before
	var toBeFavoredGist = findById(gistId);
	//here you add the gist to your favorite list in the localStorage and remove it from the gist list and add it to favorite list
}
*/

											            
											            //addtoFav.value = " + "
											            //addtoFav.type = "button";
											            //addtoFav.className = "addLink";
											            //addtoFav.setAttribute("gistId",thisID);
											            //addtoFav.onclick = function() { saveFavorite(thisID.toString()); };
											            //addtoFav.id = 'n'+i;
											           // addtoFav.name = "addToFaves";
											        // addtoFavLink = document.createTextNode(' + ');

											        listElementStart.appendChild(rowLink);
											        rowLink.appendChild(listInfo);

											        listElementStart.appendChild(addtoFav);
											       // addtoFav.appendChild(addtoFavLink);

											        listStart.appendChild(listElementStart);
													}
														
       												 // END TEACHER CODE

													//listInfo2 = document.createTextNode(listFile[obj].language);
													//listInfo += listFile[obj].language;
													//listElementStart.appendChild(listInfo);
													//listStart.appendChild(listElementStart);
												}
												
												//listInfo = document.createTextNode(gistInfo[i]["description"]);
											}
											break; // used in case there are multiple files; we just look at first one
										}
										 // console.log("--");
										
									}
								/*	
								}
								else
								{
									searchInput=localStorage.getItem("searchTerm");
									//searchInput= document.getElementById("searchTextInput").value;
									console.log(searchInput);
									if(searchInput)
									{
										console.log(searchInput);
									}
									else
									{
										console.log("Doh");
									}

									
										
											listElementStart = document.createElement("li");
									//listLanguage = gistInfo[i]["files"][0]["language"];
									
									
									//console.log (listFile);
									//console.log ("****");
									listElementStart.appendChild(listInfo);
									listStart.appendChild(listElementStart);
											
									
								}
								*/
								

							}
							listStart.appendChild(listElementStart);
							gistList.appendChild(listStart);
							var addspace = document.createElement("hr");
							gistList.appendChild(addspace);
							gistList.appendChild(addspace);	
							//alert("State 4");
						}
					};		
				req.open('GET', url, true);
	//req.setRequestHeader("Content-type", "application/json",true);
				req.send();

				printFavorites();
			};

// document.getElementById("n0").onclick = function() {
		
// 		saveFavorite(0);
		
// 	};
// 	saveFavorite(0);



};


function saveFavorite (id) {
	console.log("?", id);
	
	var splitInfo = id.split("~~:~~");
	var f_id = splitInfo[0];
	var f_description = splitInfo[1];
	var f_url = splitInfo[2];
	var newFave = new Favorites (f_id, f_description, f_url);
	addFavoriteToStorage (favorites, newFave); 
	//update_gist_list();
	// localStorage.setItem("gistidToSave", id);
}

//modified from example code from week 4 cs290
function addFavoriteToStorage(favorites, newFave)
{
	console.log (favorites);
	if(newFave instanceof Favorites) {
		favorites.faveGists.push(newFave);
		localStorage.setItem('allFavorites', JSON.stringify(favorites));

		return true;
	}
	console.error ("Attempted to add incorrect element");
	return false;
}

//constructor
function Favorites (f_id, f_description, f_url) {
	
	this.id = f_id;
	this.description = f_description;
	this.url = f_url;

}

function deleteFavorite(key)
{
	// removes ALL - this is not what i want in the end
	// localStorage.removeItem(0);
	//localStorage.clear();
	console.log ("+deleteFavorite++", favorites);
	var i=0;
	// http://stackoverflow.com/questions/28362404/how-to-delete-a-specific-item-object-in-localstorage
	 var items = JSON.parse(localStorage.getItem("favorites"));
	 console.log ("+deleteFavorite++", items);
	 //var rebuild;
	//localStorage.clear();
	 items.forEach(function(thisFave) 
	 {
	 	console("$$",thisFave);
	 	// if(thisFave.id != key)
	 	// {
	 	// 	favorites.faveGists.push(thisFave);
	 	// 	localStorage.setItem('allFavorites',favorites);
	 	// }

	 });
	
	// for (var i= 0; i< items["faveGists"].length; i++)
	// {
	// 	var object = JSON.parse(items[i]);
	// 	if(object.id == key)
	// 	{
	// 		items.splice(i,1);
	// 		console.log("#####");
	// 	}
	// }

	// items = JSON.stringify(object);
	// localStorage.setItem("favorites", items);


	// favorites.faveGists.forEach(function(thisFave) 
	// {
	// 	 console.log(key, "::", thisFave.id);
	// 	 // var thisID=thisFave.id.toString();
	// 	 // var key = key1.toString();
	// 	 // console.log(key.length, "::", thisID.length);
	// 	// console.log(i);
	// 	if(thisFave.id === key)
			
	// 	{
	// 		localStorage.removeItem(favorites.faveGists.thisFave);
	// 		// localStorage.removeItem(favorites.faveGists[i]);
	// 		console.log(favorites.faveGists[i]);
	// 	}
	// 	 console.log(i);
	// 	i++;
	// });
}

function printFavorites ()
{
	//var favorites = JSON.parse(localStorage.getItem('allFavorites'));
	console.log ("+printFavorites++", favorites);
	document.getElementById("favegistlistcontainer").innerHTML = "Favorites";
	var gistList = document.getElementById("favegistlistcontainer");
	console.log("printFavoties");
	// if(favorites != null)
	// {
		console.log("printFavoties2");
		var listStart = document.createElement("ol");

		var listElementStart=document.createTextNode("");
		//var previousFavorites = favorites.faveGists;
		//if (previousFavorites !=null)
		//{
			//var Nfavorites = localStorage.getItem(favorites);
		 	var removeFav;
			favorites.faveGists.forEach(function(thisFave) {
			var listElementStart = document.createElement('li');
			var rowLink = document.createElement("a");
			var fdesc= thisFave.description;
			var furl = thisFave.url;
			var fid = thisFave.id;

			var listInfo = document.createTextNode(fdesc);
			rowLink.href = furl;
			rowLink.className = 'gitLink';
			rowLink.target = "_blank";
			
			var newButton ="<button onclick=\"deleteFavorite(\'" + fid + "\' ) \">  - </button>";
											        removeFav = document.createElement("span");
											        removeFav.innerHTML = newButton;

			//console.log (fg);
			//listElementStart.innerHTML = "";
			//listInfo = document.createTextNode(fdesc);
			//li.appendChild(listInfo)
			listElementStart.appendChild(rowLink);
			rowLink.appendChild(listInfo);
			//listElementStart.appendChild(listElementStart);
			listStart.appendChild(listElementStart);
			listElementStart.appendChild(removeFav);
													// listElementStart.appendChild(rowLink);
											  //       rowLink.appendChild(listInfo);

											  //       listElementStart.appendChild(addtoFav);
											  //      // addtoFav.appendChild(addtoFavLink);

											  //       listStart.appendChild(listElementStart);
		
		});
			
		// for(var i=0; i<2; i++)
		// {
		// 	var li = document.createElement('li');
		// 	var fg = localStorage.getItem("faveGists");
		// 	console.log (fg);
		// 	li.innerHTML = localStorage.getItem("Hello");
		// 	//li.appendChild(listInfo)
		// 	listStart.appendChild(li);
		// }
		// var listStart = document.createElement("ol");
		// favorites.faveGists.forEach (function(s) {
			
		// }
	
		// );
	gistList.appendChild(listStart);
	// }
	
}

function whatsInLocalStorage () {
	
	console.log("B",localStorage.getItem("searchTerm"));
}

function addSearchTermtoTextArea(sT) {
	//var searchTermAdd = document.getElementById("searchTextInput");
	//						var searchTermName = document.createElement("ul");
							document.getElementById("searchTextInput").value = sT;

};



function addToFavorites(k) {
	

	//
	document.getElementById('favegistlistcontainer').innerHTML = "";
							var faveList = document.getElementById("favegistlistcontainer");
							var listStart = document.createElement("ul");
							var listElementStart=document.createTextNode("");
							var listInfo=document.createTextNode("");
}



//these functions are outside onload function


function getLocalStorage (term) {
	var localStorageItem = localStorage.getItem("searchTerm");

	return localStorageItem;
}

function saveSearchInLocalStorage () {
	
	var searchItem = document.getElementById("searchTextInput").value;
	localStorage.setItem("searchTerm", searchItem);
	console.log("+++++++++++++++++++++++", searchItem, "*");
	//alert("C", searchItem);
	/*
	if ("bootstrapping".indexOf(searchItem)>-1)
		{console.log("FOUND");}
	else
		{
			console.log("NOT FOUND");
		}
	
	console.log("D", localStorage.getItem("searchTerm"));
	*/
}


