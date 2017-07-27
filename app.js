/**
 * Created by V0024121 on 7/27/2017.
 */
console.log('running');

var Twit = require('twit');

var T = new Twit({
    consumer_key:         '2XaGuf5hIS0K5l72OoYxLzklz',
    consumer_secret:      'LeJVqoOgOwLVE2AedE1WiFmEGG6ps1fhX6XMgm3qVBCyTO231u',
    access_token:         '3328579866-cxEFxLWIz7KiHB9vvTNhplZlMOK5hbBBsSnfoNl',
    access_token_secret:  'xrY0e5mF6nk3WLamxkBlBxabb42PYrgJ3kurkEEcuvgxl',

});
var date = new Date();
var now =  date.getTime();
var yesterday = now - (24 * 60 * 60 * 1000);
console.log(new Date(yesterday));

T.get('search/tweets', { q: 'airbnb since:2017-07-01', count: 2 }, function(err, data, response) {
    console.log(data)
});

