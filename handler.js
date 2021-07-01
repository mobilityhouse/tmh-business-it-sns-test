const AWS = require("aws-sdk");
const SNS = new AWS.SNS();


exports.sms = function(event) {
    console.log("Input event:", JSON.stringify(event));
    console.log('Message: ' , event.message);
    console.log('Phone number; ' ,event.phoneNumber);
    var smsMessage = {
        Message: event.message,
        PhoneNumber: event.phoneNumber
    };
    //errorHandling Number
    let someThingIsWrongNumber = function(){
        if(event.phoneNumber.length > 15){
            return true;
        }else {
            return false;
        }
    }
    //errorHandling Number
    let someThingIsWrongText = function(){
        if(event.message.length >140 || !isASCII){
            return true;
        }
        else{
            return false;
        } 

    }
    //check if String is Ascii
    function isASCII(str, extended) {
        return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
    }
    let smsAttribute = {
        attributes: { 
            DefaultSenderID: "pahrend",
          },
    }
    SNS.setSMSAttributes(smsAttribute, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else    {
            console.log(data);
        }           
      });

    SNS.publish(smsMessage, (error, data) => {
        if (data && someThingIsWrongNumber()==false && someThingIsWrongText() == false) {
            console.log('Success');
            console.log(data);
        } else {
            console.log('Error',"Something might be wrong with the number/text");
            console.log(error);
        }
    });


};