console.log("ok");

var res ={};
// var fileloc="../resources/restaurants.csv"
var fileloc="https://raw.githubusercontent.com/rroggerr/whatsdinnerfor.me/master/resources/restaurants.csv";
var qtext = 0; 
var rtext=0;
var sbutton = 0;
var lbutton = 0;
var rbutton = 0;

var initbutton=false;

function init(){
	Papa.parse(fileloc, {
	download: true,
	complete: function(results) {
		res=results;
		console.log("restaurants imported");
	}
});
	// Initialize the text
	qtext = document.getElementById("questiontext"); 
	rtext = document.getElementById("recommendtext"); 
	sbutton = document.getElementById("answers");
	lbutton = document.getElementById("answer1");
	rbutton = document.getElementById("answer2");
	qtext.innerText = "I CAN HELP YOU FIND THE PERFECT PLACE FOR DINNER!"
}

// Load Restaurant JSON file

$(document).ready(function(){
	init();
});

function start(){
	// Initialize 2 buttons below only if initbutton is false
	if (!initbutton){
		document.getElementById("sbox").classList.add("hidden")
		// document.getElementById("lbox").classList.remove("hidden")
		document.getElementById("rbox").classList.remove("hidden")
		initbutton = true;
	}
	genstring(0)
	ga('send', 'event', {'eventCategory': 'Click','eventAction': 'letsgo'});
}

function genstring(resp){
	// Case 1 Random Restaurant:
	var randres = Math.floor(Math.random()*res["data"].length);
	var resname = res["data"][randres][1];
	qtext.innerText = "DO YOU WANT TO GO TO ";
	rtext.innerText=resname.toUpperCase();
}





