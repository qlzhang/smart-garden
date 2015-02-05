var refreshIntervalId
var refreshIntervalIdtime
var sys = require('sys')
var exec = require('child_process').exec;
var moment = require('moment');

// clear existing auto watering if it is on
if ( typeof refreshIntervalIdtime !== 'undefined' && refreshIntervalIdtime ) {
	clearInterval(refreshIntervalIdtime);
}
if ( typeof refreshIntervalId !== 'undefined' && refreshIntervalId ) {
        clearInterval(refreshIntervalId);
}



// read smartwatering.txt to get rule setting

var fs = require('fs');
if (fs.existsSync('/smartgardendata/smartwatering.txt')) {
	var smartwateringinit=fs.readFileSync('/smartgardendata/smartwatering.txt');
	var smartwateringinitarr = smartwateringinit.toString().split(",").map(function (val) { return val; })

	if (smartwateringinit === 'Environment') {
	// start smart watering based on environment, soil moisture
	  var wateringonvalueinit = smartwateringinit[smartwateringinitarr.length-2];       
	  var wateringoffvalueinit = smartwateringinit[smartwateringinitarr.length-1];	    
	  console.log("init rule environment works");
	  autowateringsoilmoisture(wateringonvalueinit, wateringoffvalueinit);
	  }
	else if (smartwateringinit === 'Schedule') {
	// start smart watering based on schedule
	  var Starttimeinit = smartwateringinit[smartwateringinitarr.length-2];  
	  var Durationinit = smartwateringinit[smartwateringinitarr.length-1];    
	  console.log("int rule schedule works");
	  autowateringschedule(Starttimeinit, Durationinit, smartwateringinit);
	  }
 }
else {
 function puts(error, stdout, stderr) { sys.puts(stdout) }
 exec("echo '0' > /smartgardendata/smartwatering.txt", puts);
 }

// create http server
var fs = require('fs'),
http = require('http');
//var http = require('http');
http.createServer(function (req, res) {
function puts(error, stdout, stderr) { sys.puts(stdout) }


//bypass the favicon.ico request
if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }

// navigate to rulesSetup webpage
//if(req.url === "/rulesSetup"){
// add ruleSetup HTML page
//        res.writeHead(200, {'Content-Type': 'text/html'});
//        res.write("<!DOCTYPE html><html><body>");
//        res.write("<html><html><body>");
//        res.write("<h1>Smart watering rules</h1>");
       
///        res.write("<form>");
//res.write("<form action='http://72.201.133.14:1340/smartWatering' method='post'>");  
 


//	res.write("<input type='radio' name='smartwateringopt' value='Environment'>Environment<br>");
//        res.write("<label for='wateringonvalue'>Turn on watering when soil moisture is less than </label>");
//        res.write("<input type='text' id='wateringonvalue' name='wateringonvalue' placeholder=' ' />")
//        res.write("<label for='wateringoffvalue'>Turn off watering when soil moisture is higher than </label>");
//	res.write("<input type='text' id='wateringoffvalue' name='wateringoffvalue' placeholder=' ' /><br>")
//        res.write("<input type='radio' name='smartwateringopt' value='Schedule'>Schedule<br>");
//        res.write("<label for='Starttime'>Start time </label>");
//        res.write("<input type='text' id='Starttime' name='Starttime' placeholder=' ' />")
//        res.write("<label for='Duration'>Duration </label>");
//        res.write("<input type='text' id='Duration' name='Duration' placeholder=' ' />")
//        res.write("</form>");
//        res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339/rulesSetup\"' value='Reset'/></p>");
///        res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339/startRules\"' value='Start Rules'/></p>");
///	res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339/smartWatering\"' value='Start Rules'/></p>");	
// res.write("<input type='submit' value='Start Rules' />");

	
//	res.write("</body></html>");
//        res.end();
//  }
//else {

// navigate to sensor status page: clean up former sensor data
exec("rm /smartgardendata/status.html", puts);


// read sensor data - temperature, humidity, lightness, soil moisture
exec("bash /smartgardenclient/temperature.sh", puts);
exec("bash /smartgardenclient/humidity.sh", puts);
exec("bash /smartgardenclient/lightness.sh", puts);
exec("bash /smartgardenclient/soilmoisture.sh", puts);

// set smart watering status is the request is from /startRules
//if(req.url === "/startRules")
//exec("echo '1' > /smartgardendata/smartwatering.txt", puts);

// read watering status data
if(req.url === "/wateringOn")
        {
        exec("echo '1' >  /smartgardendata/wateringstatus.txt", puts);
//  cancel smartwatering if it is on        
	  if ( typeof refreshIntervalIdtime !== 'undefined' && refreshIntervalIdtime ) {
       		 clearInterval(refreshIntervalIdtime);
	  }
	  if ( typeof refreshIntervalId !== 'undefined' && refreshIntervalId ) {
	        clearInterval(refreshIntervalId);
	  }

	  exec("echo '0' > /smartgardendata/smartwatering.txt", puts);
	  
	}
else if(req.url === "/wateringOff")
        {
        exec("echo '0' >  /smartgardendata/wateringstatus.txt", puts);
// cancel smartwatering if it is on        exec("echo '0' > /smartgardendata/smartwatering.txt", puts);
	 if ( typeof refreshIntervalIdtime !== 'undefined' && refreshIntervalIdtime ) {
                 clearInterval(refreshIntervalIdtime);
          }
          if ( typeof refreshIntervalId !== 'undefined' && refreshIntervalId ) {
          	clearInterval(refreshIntervalId);
	  }

	  exec("echo '0' > /smartgardendata/smartwatering.txt", puts);
	}
else
        {
        exec("bash /smartgardenclient/wateringstatus.sh", puts);
        }

// combine sensor data into HTML file
var htmlcomplete=0;

while (htmlcomplete == 0){
exec("bash /smartgardenclient/htmlbuilder.sh", puts);
 

// read HTML file and generate script
var fsexist = 0;

// loop of reading HTML file until all sensor data are written in HTML file
while (fsexist == 0) {
var html;
if (fs.existsSync('/smartgardendata/status.html')) {
    html=fs.readFileSync('/smartgardendata/status.html');

    //check if status.html exists and change fsexist accordingly
    console.log(html.toString().indexOf('temperature'));
    console.log(html.toString().indexOf('humidity'));
    console.log(html.toString().indexOf('lightness'));
    console.log(html.toString().indexOf('soilmoisture'));
    console.log(html.toString().indexOf('watering'));
    console.log(html.toString().indexOf('smart watering control'));








    console.log(html.toString());
    if(html.toString().indexOf('temperature') > 0 && html.toString().indexOf('humidity') > 0 && html.toString().indexOf('lightness') > 0 && html.toString().indexOf('soilmoisture') > 0 && html.toString().indexOf('smart watering control') > 0 && html.toString().indexOf('watering') > 0 && html.toString().indexOf('</p><p></p><p>') > 0)
    {   console.log("in the loop all true" +  html.toString().indexOf(': </p>'));
	if(html.toString().indexOf(': </p>') < 0) 
        {	
	console.log("fsexist=1");
        fsexist=1;

	htmlcomplete=1;	
// HTML script
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<!DOCTYPE html><html><body>");
        res.write("<html><html><body>");
        res.write("<h1>Smart Garden</h1>");
        console.log(html.toString());
        res.write(html.toString());
        console.log("after HTML writing");
        console.log(html.toString());
        res.write("</p><p>Action</p>");
        res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339\"' value='Refresh'/></p>");
        res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339/wateringOn\"' value='Start watering'/></p>");
        res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1339/wateringOff\"' value='Stop watering'/></p>");
	res.write("<p><input type='button' onclick='window.location = \"http://72.201.133.14:1340/rulesSetup\"' value='Setup rules'/></p>");		
        
	if(req.url === "/wateringOn")
        turnonWatering();

        if(req.url === "/wateringOff")
        turnoffWatering();
	

      
        res.write("</body></html>");
        res.end();
   	 }
   	 else
   	 {
    	fsexist=1;
	 }
}
}
}
}
}).listen(1339);
//}).listen(1339, '192.168.1.162');

console.log('Server running at http://192.168.1.162:1339/');

//transfer data on rulesSetup and start smartwatering funcation
var express = require('express');
/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */
var bodyParser = require('body-parser');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

// display rulesSetup input forms
app.get('/rulesSetup', function(req, res){

// read the rule setting from /smartgardendata/smartwatering.txt

var fs = require('fs');
if (fs.existsSync('/smartgardendata/smartwatering.txt')) {
      	//debug
      	console.log(fs.readFileSync('/smartgardendata/smartwatering.txt'));
      	console.log(fs.readFileSync('/smartgardendata/smartwatering.txt').toString());
     	var smartwateringhtml=fs.readFileSync('/smartgardendata/smartwatering.txt').toString();
      	if (smartwateringhtml == 0) smartwateringhtml ="0, , , , ,";
	
	var smartwateringhtmlarr = smartwateringhtml.split(",").map(function (val) { return val; })
	var wateringonvaluehtml = " ";
	var wateringoffvaluehtml = " ";
        var Starttimehtml = " ";
	var Durationhtml = " ";
	var smartwateringEnvhtml = " ";
	var smartwateringSchhtml = " ";
	var Moncheck = " ";
	var Tuecheck = " ";
	var Wedcheck = " ";
	var Thucheck = " ";
	var Fricheck = " ";
	var Satcheck = " ";
	var Suncheck = " ";
	if (smartwateringhtml == 1) {
        	var smartwateringhtmlarr = smartwateringhtml.split(",").map(function (val) { return val; })	
	
		// read smart smartwateringopt and other watering parameter set options
        	if (smartwateringhtml.indexOf('Environment')>0) {
        	// start smart watering based on environment, soil moisture
           	wateringonvaluehtml = smartwateringhtmlarr[smartwateringhtmlarr.length-2];
           	wateringoffvaluehtml = smartwateringhtmlarr[smartwateringhtmlarr.length-1];
          	console.log("read smartwatering.txt data");
          	smartwateringEnvhtml = "checked";
          	}
        	else if (smartwateringhtml.indexOf('Schedule')>0) {
        	// start smart watering based on schedule
          	Starttimehtml = smartwateringhtmlarr[smartwateringhtmlarr.length-2];
          	Durationhtml = smartwateringhtmlarr[smartwateringhtmlarr.length-1];
          	console.log("read smartwatering.txt data");
           	smartwateringSchhtml = "checked";
          	}
	       // read smartwatering days from /smartgardendata/smartwatering.txt
	         if (smartwateringhtml.indexOf('Mon')>0)  Moncheck = "checked";
		 if (smartwateringhtml.indexOf('Tue')>0)  Tuecheck = "checked";
		 if (smartwateringhtml.indexOf('Wed')>0)  Wedcheck = "checked";
		 if (smartwateringhtml.indexOf('Thu')>0)  Thucheck = "checked";
		 if (smartwateringhtml.indexOf('Fri')>0)  Fricheck = "checked";
		 if (smartwateringhtml.indexOf('Sat')>0)  Satcheck = "checked";
		 if (smartwateringhtml.indexOf('Sun')>0)  Suncheck = "checked";
	 }
}
//debug
console.log("Mon"+Moncheck+"Tue"+Tuecheck+"Wed"+Wedcheck+"Thu"+Thucheck+"Fri"+Fricheck+"Sat"+Satcheck+"Sun"+Suncheck);
console.log(smartwateringhtml);
console.log(smartwateringhtmlarr);
console.log(smartwateringhtmlarr.length);

console.log("EnvOpt"+smartwateringEnvhtml);
console.log("SchOpt"+smartwateringSchhtml);

console.log(smartwateringhtmlarr[smartwateringhtmlarr.length-2].toString());
console.log(smartwateringhtmlarr[smartwateringhtmlarr.length-1].toString());









// generate HTML file

	var htmlrule = '<h1>Smart watering rules</h1>' + '<form action="/smartWatering" method="post">'
	 +  '<label for="wateringdays">Watering days: </label>'
	+ '<input type="checkbox" name="wateringdays" value="Mon"'+ Moncheck +'>Monday '
	+ '<input type="checkbox" name="wateringdays" value="Tue"'+ Tuecheck +'>Tuesday '
	+ '<input type="checkbox" name="wateringdays" value="Wed"'+ Wedcheck +'>Wednesday '
	+ '<input type="checkbox" name="wateringdays" value="Thu"'+ Thucheck +'>Thursday '
	+ '<input type="checkbox" name="wateringdays" value="Fri"'+ Fricheck +'>Friday '
	+ '<input type="checkbox" name="wateringdays" value="Sat"'+ Satcheck +'>Saturday '
	+ '<input type="checkbox" name="wateringdays" value="Sun"'+ Suncheck +'>Sunday <br> ' 
        +  '<input type="radio" name="smartwateringopt" value="Environment"' + smartwateringEnvhtml + '>Environment<br>' 
        +  '<label for="wateringonvalue">Turn on watering when soil moisture is less than </label>'
        + '<input type="text" id="wateringonvalue" name="wateringonvalue" placeholder=' + wateringonvaluehtml + ' />'
       + '<label for="wateringoffvalue">Turn off watering when soil moisture is higher than </label>'
        + '<input type="text" id="wateringoffvalue" name="wateringoffvalue" placeholder='+ wateringoffvaluehtml + ' /><br>'
        + '<input type="radio" name="smartwateringopt" value="Schedule"' + smartwateringSchhtml + '>Schedule<br>'
        + '<label for="Starttime">Start time </label>'
        + '<input type="text" id="Starttime" name="Starttime" placeholder='+ Starttimehtml + ' />'
        + '<label for="Duration">Duration </label>'
        + '<input type="text" id="Duration" name="Duration" placeholder=' + Durationhtml + ' />'
        
        + '<p><input type="button" onclick="window.location = \'http://72.201.133.14:1340/rulesSetup\'" value="Reset"/></p>'
        + '<p><input type="button" onclick="window.location = \'http://72.201.133.14:1339\'" value="Cancel"/></p>' +
	
	 '<input type="submit" value="Start Rules" />'
	+ '</form>';
	res.send(htmlrule);
///        res.write("</body></html>");
///        res.end();

});

// This route receives the posted form.
app.post('/smartWatering', function(req, res){

// debug

console.log(req.body.wateringdays.toString());

// read smartwateringopt setting from input form and save into smartgardendata/smartwatering.txt
if (req.body.smartwateringopt === 'Environment') {
// start smart watering based on environment, soil moisture
  var wateringonvaluehtml = req.body.wateringonvalue;
  var wateringoffvaluehtml = req.body.wateringoffvalue;
// write rule setting into smartwatering.txt

fs.writeFile("/smartgardendata/smartwatering.txt", "1,Environment,"+req.body.wateringdays.toString()+","+wateringonvaluehtml+","+wateringoffvaluehtml, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
//  exec("echo '$wateringonvaluehtml' > /smartgardendata/wateringonvaluehtml.txt", puts);
//  exec("echo '$wateringoffvaluehtml' > /smartgardendata/wateringoffvaluehtml.txt", puts);
  console.log("app.post works");

///exec("echo '1' > /smartgardendata/smartwatering.txt", puts);  
  autowateringsoilmoisture(wateringonvaluehtml, wateringoffvaluehtml);  
  }
else if (req.body.smartwateringopt === 'Schedule') {
// start smart watering based on schedule
  var Starttimehtml = req.body.Starttime;
  var Durationhtml = req.body.Duration;


// write rule setting into smartwatering.txt
fs.writeFile("/smartgardendata/smartwatering.txt", "1,Schedule,"+req.body.wateringdays.toString()+","+Starttimehtml+","+Durationhtml, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
  //  exec("echo '1' > /smartgardendata/smartwatering.txt", puts);
//  exec("echo '$Starttimehtml' > /smartgardendata/Starttimehtml.txt", puts);
//  exec("echo '$Durationhtml' > /smartgardendata/Durationhtml.txt", puts);
  console.log("app.post schedule works");

///  exec("echo '1' > /smartgardendata/smartwatering.txt", puts);
  autowateringschedule(Starttimehtml, Durationhtml, req.body.wateringdays.toString());
  }
///  res.redirect('http://72.201.133.14:1339');
//res.send("I made it");
});
app.listen(1340, function() {
  console.log('Server running at http://192.168.1.162:1340/');
});

// turn on watering function

function turnonWatering() {
console.log("Turn on watering ");
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

exec("bash /smartgardenclient/wateringrelay_on.sh", puts);

}

// turn off watering function
function turnoffWatering() {
console.log("Turn off watering ");
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

exec("bash /smartgardenclient/wateringrelay_off.sh", puts);
}

//run auto watering based on time
function autowateringschedule(wateringstarttime, wateringduration, wateringrules) {
var wateringstarttime;
var wateringduration;
var wateringrules;

//debug
console.log(Date().toString().substring(0,3));
console.log(wateringrules);

if (wateringrules === Date().toString().substring(0,3)) {

// debug


// start auto watering
var minutes = 0.5, the_interval = minutes * 60 * 1000;
var wateringstartstatus = 0;
console.log("start watering schedule");
// clean historical auto watering process
if ( typeof refreshIntervalIdtime !== 'undefined' && refreshIntervalIdtime ) {
clearInterval(refreshIntervalIdtime);
}
refreshIntervalIdtime = setInterval(function() {
// check if it is time scheduled for watering
var timenow =  moment();
console.log("time check" + timenow + timenow.toString() + timenow.toString().indexOf(wateringstarttime));
  if (timenow.toString().indexOf(wateringstarttime) > -1) {
	wateringstartmoment = timenow;
	turnonWatering();
	console.log("time to start watering");
	wateringstartstatus = 1;
	}
// check if time exceed duration
  if (wateringstartstatus == 1) {        

  	if (timenow.diff(wateringstartmoment, 'minutes') >  minutes)  {







	// turn off the water pump 
		turnoffWatering();
   		console.log("time is up to time off");
  	}
  }
}, the_interval);
}
}


//run auto watering based on soil moisture
function autowateringsoilmoisture(wateringonvalue, wateringoffvalue) {

var autosoilmoisture
var wateringonvalue
var wateringoffvalue
var minutes = 0.5, the_interval = minutes * 60 * 1000;

// clean historical auto watering process
if ( typeof refreshIntervalId !== 'undefined' && refreshIntervalId ) {
clearInterval(refreshIntervalId);
}
refreshIntervalId = setInterval(function() {

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("rm /smartgardendata/soilmoisture.txt", puts);
exec("bash /smartgardenclient/soilmoisture.sh", puts);



   
   if (fs.existsSync('/smartgardendata/soilmoisture.txt')) {
       autosoilmoisture=fs.readFileSync('/smartgardendata/soilmoisture.txt');
       console.log("soil moisture "+autosoilmoisture);
        
	console.log(wateringoffvalue); 
// watering on/off sensor condition
        if(parseInt(autosoilmoisture) < parseInt(wateringonvalue) )
        {
        turnonWatering();
        console.log("watering on");
        }
        if(parseInt(autosoilmoisture) > parseInt(wateringoffvalue))
        {
        turnoffWatering();
        console.log("watering off");
        }
	autosoilmoistureexist=1;
   }
/// }
}, the_interval);
}






