// window.alert("Hello Dere!");



window.onload = function getAPI () 
{
	update_gist_list();
	//document.getElementsByName("num_pages")[0].onchange = function() {update_gist_list()};
	document.getElementsByName("num_pages")[0].onchange = function() {update_gist_list()};
	document.getElementsByName("languageTypes")[0].onchange = function() {update_gist_list()};
			function update_gist_list() 
			{
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
				var language1 = document.getElementsByName("languageTypes")[0].checked;
				var language2 = document.getElementsByName("languageTypes")[1].checked;
				var language3 = document.getElementsByName("languageTypes")[2].checked;
				var language4 = document.getElementsByName("languageTypes")[3].checked;
				console.log(language1, language2);
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
						console.log(gistInfo.length);

						

							//var info1 = gistInfo.list ??? 
							// element 11 should be the description
							// gistInfo[11]
							//var description = gistInfo[0]["description"]; // 1st entry
							//console.log(description);
							document.getElementById('gistlistcontainer').innerHTML = "";
							gistList = document.getElementById("gistlistcontainer");
							var listStart = document.createElement("ul");
							var listElementStart;
							var listInfo;
							var listLanguage;
							var filterByLanguage = (language1 || language2 || language3 || language4);
							console.log("at least one is true: ", filterByLanguage);
							var numLanguageTypes = document.getElementsByName("languageTypes").length;
							for (i=0; i<gistInfo.length; i++)
							{
								//if()
								
								listInfo = document.createTextNode(gistInfo[i]["description"]);
								listFile = gistInfo[i]["files"];
								if(filterByLanguage)
								{
									for (j=0;j<numLanguageTypes; j++)
									{
										for (obj in listFile)
										{
											//console.log(listFile[obj].language);
											if(listFile[obj].language ==document.getElementsByName("languageTypes")[j].value)
											{
												listElementStart = document.createElement("li");
												listElementStart.appendChild(listInfo);
												listStart.appendChild(listElementStart);
												//listInfo = document.createTextNode(gistInfo[i]["description"]);
											}
										}
										 
										
									}
									
								}
								else
								{
									listElementStart = document.createElement("li");
									//listLanguage = gistInfo[i]["files"][0]["language"];
									
									
									//console.log (listFile);
									//console.log ("****");
									listElementStart.appendChild(listInfo);
									listStart.appendChild(listElementStart);
								}
								
								

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

// function based off of CS290 week 4 class video 
function addParametersToURL (parameters) {
	var str = [];
	for (var prop in parameters) {
		var s=encodeURIComponent(prop) + "=" + encodeURIComponent(parameters[prop]);
		str.push(s);
	}



}
