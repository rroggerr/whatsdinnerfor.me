console.log("ok");

var res ={};
var fileloc="../resources/restaurants.csv"

function init() {

	Papa.parse(fileloc, {
	download: true,
	complete: function(results) {
		console.log(results);
	}
});

}

// Load Restaurant JSON file

init();