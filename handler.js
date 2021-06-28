const AWS = require("aws-sdk");
const SNS = new AWS.SNS();

//jannis code 
exports.handler = function(event, context) {
    console.log("Input event:", JSON.stringify(event));
    console.log('Phone number; ' + event.phoneNumber);
    console.log('Message: ' + event.message);
    let smsMessage = {
        Message: event.message,
        PhoneNumber: event.phoneNumber
    };
    SNS.publish(smsMessage, (error, data) => {
        if (data) {
            console.log('Success');
            console.log(data);
        } else {
            console.log('Error');
            console.log(error);
        }
    });
};

