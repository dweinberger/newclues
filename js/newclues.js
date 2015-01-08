
		/* New CLues - JavaScript initialization
*              for http://cluetrain.com/newclues/index.html
*  
*  This is the minor code that:
*  1. numbers the clues, as well as the headings and subheads.
*  2. randomizes the order in which the two authors are listed.
*  3. inserts linkable URLs if you click on a clue number
*  4. randomizes the main image at the top of the page (now commented out)
*
*  Feel free to reuse any of this, of course, but keep in mind that I am
*  a heavy-handed, flat-footed hobbyist programmer. Please don't mock me.
*
*  License
* Dual licensed under the MIT license (below) and GPL license.
*
* GPL License http://www.gnu.org/licenses/gpl-3.0.html
*
* MIT License
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* This permission notice shall be included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*   David Weinberger
*   david@weinberger.org
*   January 5, 2015
*/
function init(){		
		// add clue numbers
		var romans = new Array("I. ","II. ","III. ");
		var numerals = new Array("&nbsp;1. ","&nbsp;2. ","&nbsp;3. ", "&nbsp;4. ", "&nbsp;5. ", "&nbsp;6. ","&nbsp;7. ","&nbsp;8. ","&nbsp;9. ","10. ", "11. ", "13. ", "14. ","15. ","16. ","17. ","18. ","19. ","20. ","21. ");
		var letters = new Array("a. ","b. ","c. ","d. ","e","f. ","g. ","h. H","i. ","j.  ","k. ","l. ","m. ","n. ","o. ","p. ");
		var chapters = $(".chapter");
		var cluenumbs = $(".cluenumb");
		var cluenumber = 1;
		var subheadidnumber = 0;
		for (var j=0;  j < chapters.length; j++){
			var chaptnumb = $(chapters[j]).find(".chapternumb");
			// $(chaptnumb[0]).html(romans[j]);
			//var childs = $(".subheadnumb", chapters[j]);
			var subheads = chapters[j].children;
			//var subheads = chapters[j].children;
			var subnumber = 0;
			for (var k=0; k < subheads.length; k++){
				var subheadnumb = $(subheads[k]).attr("class");
				if  ((subheadnumb != undefined) && (subheadnumb == "subhead")){
					var subchilds = $(subheads[k]).children();
					$(subchilds[0]).html(letters[subnumber]);
					subheadid = "subhead-" + subheadidnumber;
					$(subheads[k]).attr({"id":subheadid});
					// create text link for the subsection
					var textboxdiv = document.createElement("div");
					textboxdiv.setAttribute("class","embeddedlink");
					textboxdiv.setAttribute("id","embedded" + subheadid);
					var linkstr = "http://real.URL.coming.soon/#" + subheadid;
					$(textboxdiv).text(linkstr);
					
					textboxdiv.style.display = "none";
					// append it after the subhead text
					var subtemp = $("#" + subheadid).children()[1];
					$(subtemp).append(textboxdiv);
					subnumber++;
					subheadidnumber++;
					// for each subhead number the clues
					// get the clues for this section
					var cluechildren = $("#" + subheadid + " .clue");
					var  w = 0;
					for (m=0; m < cluechildren.length; m++){
						//var clueid = "chapt-" + j + "-sect-" + k + "-clue-" + m;
						var clueid = cluenumber;
						$(cluechildren[m]).attr({"id": clueid});
						var clue = document.getElementById(clueid);
						
						cluenumberspan = $(clue).children()[0];
						cluenumberspan.innerHTML = cluenumber; //numerals[m];
						
						w++;
						
						// create text link for the clue
						var textboxspan = document.createElement("div");
						textboxspan.setAttribute("class","embeddedlink");
						textboxspan.setAttribute("id","embed" + cluenumber);
						var linkstr = "http://www.cluetrain.com/newclues/#" + cluenumber;
						// create text area with embeddable html
						var fullhtmlarea = document.createElement("textarea");
						fullhtmlarea.setAttribute("class","embeddedtextarea");
						var fullhtml =  "<span style='color:#3C63FF'>New Clue #: </span><span  style='color:#162CFF'>" + $("#" + clueid).text() + "</span><br><span>&mdash; <a href='" + linkstr + "'>New Clues</span>";	
						fullhtml = fullhtml.replace(/\n/g, '');
						fullhtml = fullhtml.replace(/  /g, '');
						$(fullhtmlarea).val(fullhtml);
						$(textboxspan).html(linkstr + "<br>Embed the clue: ");
						$(textboxspan).append(fullhtmlarea);
						textboxspan.style.display = "none";
						$(clue).append(textboxspan);

						
						cluenumber++;
						}
	
				}
			}
			
			}
			
	$('.cluenumb').click(function(){
		// get cluenumber from id of .clue parent
		var par = $(this).parent();
		var cluenumber = $(par).attr("id");
		// get text box number
		var  textboxid = "#embed" + cluenumber;
		$(textboxid).slideToggle();
    
	});
		$('.subheadnumb').click(function(){
		// get id of parent
		var par = $(this).parent();
		var sectnumber = $(par).attr("id");
		// get text box number
		var  textboxid = "#embedded" + sectnumber;
		$(textboxid).slideToggle();
    
	});
			
		
		// randomize authorship preference
		var rand = Math.random();
		if (rand > 0.5){
			$("#author1").text("Doc Searls");
			$("#endname1").html('<a href="http://weinberger.org">David Weinberger</a> david@weinberger.org');
			$("#author2").text("David Weinberger");
			$("#endname2").html('<a href="http://searls.com">Doc Searls</a> doc@searls.com'); 
		} 
		else{
			$("#author2").text("Doc Searls");
			$("#endname2").html('<a href="http://weinberger.org">David Weinberger</a> david@weinberger.org');
			$("#author1").text("David Weinberger");
			$("#endname1").html('<a href="http://searls.com">Doc Searls</a> doc@searls.com');
			}
	
	 // randomize image
		// 
// 		var imgs = new Array(	"roadleaf_clickbait.jpg",
// 								"roadleaf_clickbait2.jpg",
// 								"roadleaf_depressed.jpg",
// 								"roadleaf_worrying.jpg",
// 								"roadleaf_disappointment.jpg",
// 								"roadleaf_goldencalf.jpg",
// 								"roadleaf_handbasket.jpg",
// 								"roadleaf_train.jpg",
// 								"roadleaf_insufficiently.jpg");
// 								
// 		var rand = Math.floor(Math.random() * imgs.length);
// 		var imgurl = "./images/" + imgs[rand];
// 		var imgspan = document.createElement("img");
// 		imgspan.setAttribute("src",imgurl);
// 		imgspan.setAttribute("ALT","New clues from two old men who helped write The Cluetrain Manifesto lo these many years ago.");
// 		$("#roadkillimg").append(imgspan);
}
	
	