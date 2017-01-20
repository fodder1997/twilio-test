var twilio = require("twilio");
var Alexa = require('alexa-sdk');
var config = require ("./config.js");

var accountSid = config.accountSid;
var authToken = config.authToken;

var client = require('twilio')(accountSid, authToken);
console.log("Starting Paul");

var PAUL = "paul"
var TRUSHA = "trusha"

var handlers = {

    'CallPhoneIntent': function () {
		var phonePerson  = this.event.request.intent.slots.owner.value;
        this.emit(':tell', 'Calling ' + phonePerson + ' phone.');	
		console.log('Using Twilio to call....' + phonePerson);
		
		phonePerson = phonePerson.toUpperCase();
		
		var phone = '+447811259468';
		if (phonePerson.indexOf("TRUSHA") > -1){
			phone = '+447765951213';
		}
		
		console.log('Number = ', phone);		
		
		client.calls.create({
			url: "http://demo.twilio.com/docs/voice.xml",
			to: phone,
			from: "+441223750413"
		}, function(err, call) {
			if (err){
				console.log(err);
			}
			process.stdout.write(call.sid);
		});			
		
	},
	'Unhandled': function () {
        this.emit(':ask', 'I don\'t get it!', 'I don\'t get it!');
    },
}

exports.handler = function (event, context) {
	var client = new twilio.RestClient(accountSid, authToken);
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	
	console.log (accountSid);
	alexa.execute();
};