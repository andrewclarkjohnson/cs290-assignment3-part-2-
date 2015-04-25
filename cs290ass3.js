// window.alert("Hello Dere!");



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

	/*for (var k=0; k<document.getElementsByName("num_pages")[0].value; k++)
	{
		document.getElementsByName("addToFaves")[k].onchange = function() { addToFavorites(k) };
	}
	*/

	//document.getElementById("languageTypes")[3].onchange = function() {update_gist_list()};

			function update_gist_list() 
			{
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
								console.log ("num_pages: ", gistInfo.length);
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
													console.log("1.", searchInput.length);
													console.log("2a.", gistDescription);
													console.log("2b.", gistDescription.indexOf(searchInput));
													console.log("3.", filterByLanguage);
													console.log("4.", document.getElementsByName("languageTypes")[j].checked);
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
											        var addtoFav = document.createElement("input");
											            addtoFav.onclick = function() { addFav(listFile[obj]); };
											            addtoFav.value = " + "
											            addtoFav.type = "button";
											            addtoFav.className = "addLink";
											            addtoFav.id = gistInfo[i].id;
											            addtoFav.name = "addToFaves";
											        var addtoFavLink = document.createTextNode(' + ');

											        listElementStart.appendChild(rowLink);
											        rowLink.appendChild(listInfo);

											        listElementStart.appendChild(addtoFav);
											        addtoFav.appendChild(addtoFavLink);

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
										 console.log("--");
										
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
			};

};

function addButton ()
{

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

// function based off of CS290 week 4 class video 
function addParametersToURL (parameters) {
	var str = [];
	for (var prop in parameters) {
		var s=encodeURIComponent(prop) + "=" + encodeURIComponent(parameters[prop]);
		str.push(s);
	}


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

