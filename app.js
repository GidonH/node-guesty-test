console.log('running');

var Twit = require('twit');
var converter = require('json-2-csv');
fs = require('fs');
var nodemailer = require('nodemailer');

var T = new Twit({
    consumer_key: '2XaGuf5hIS0K5l72OoYxLzklz',
    consumer_secret: 'LeJVqoOgOwLVE2AedE1WiFmEGG6ps1fhX6XMgm3qVBCyTO231u',
    access_token: '3328579866-cxEFxLWIz7KiHB9vvTNhplZlMOK5hbBBsSnfoNl',
    access_token_secret: 'xrY0e5mF6nk3WLamxkBlBxabb42PYrgJ3kurkEEcuvgxl',

});

// get the ISO format 24 hours ago
var date = new Date();
var now =  date.getTime();
var yesterday = now - (24 * 60 * 60 * 1000);
var yesterday_date = new Date(yesterday).toISOString();
var yesterday_str = yesterday_date.slice(0, 10);

// call twitter api to get all tweets about airbnb, (up to 100)
T.get('search/tweets', {q: 'airbnb since:' + yesterday_str, count: 100}, function (err, data, response) {

    converter.json2csv(data, json2csvCallback);

});


// convert json object to csv string and save to file
var json2csvCallback = function (err, csv) {

    if (err) throw err;

    fs.writeFile('guesty_aribnb_twiiter.csv', csv, function (err) {
        if (err)return console.log(err);

        console.log('success writing file');

        //send mail and attach file
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '********',
                pass: '********'
            }
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'tal.sieger_guesty@comeetreply.com',
            subject: 'Guesty_test_gidon',
            text: 'node is cool',
            attachments: [
                {
                    filename: 'guesty_aribnb_twiiter.csv',
                    path: './guesty_aribnb_twiiter.csv'
                }
            ]
        }


        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

};





