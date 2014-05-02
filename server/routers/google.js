'use strict';
//================================================================================
// Libraries
//================================================================================
var express = require('express');
var config  = require('../config');
var gcal    = require('google-calendar');

//================================================================================
// Properties
//================================================================================
var router = express.Router();

//================================================================================
// Module
//================================================================================
/**
 * This middleware will be run before every api call to this router to ensure the
 * use has an access token. Otherwise, it will return a 401 response which will
 * the user to be automatically logged out.
 */
router.use(function(req, res, next) {
    if(!req.session.accessToken) {
        res.send(401, 'Not logged in.');
    } else {
        next();
    }
});

router.get('/events', function(req, res, next) {
    var calendar = new gcal.GoogleCalendar(req.session.accessToken);
    calendar.events.list(req.session.calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList) {
        if(err) return next(err);

        res.send(JSON.stringify(eventList, null, '\t'));
    });

});

router.post('/event', function(req, res, next) {
    //map request body to google calendar data structure
    var addEventBody = {
        'status':'confirmed',
        'summary': req.body.contact.firstName + ' ' + req.body.contact.lastName,
        'description': req.body.contact.phone + '\n' + req.body.contact.details,
        'organizer': {
          'email': req.session.calendarId,
          'self': true
        },
        'start': {
          'dateTime': req.body.startdate,
        },
        'end': {
          'dateTime': req.body.enddate
        },
        'attendees': [
            {
              'email': req.session.calendarId,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.contact.email,
            'organizer': false,
            'responseStatus': 'needsAction'
            }
        ]
    };

    var calendar = new gcal.GoogleCalendar(req.session.accessToken);
    calendar.events.insert(req.session.calendarId, addEventBody, function(err, response) {
        if(err) return next(err);

        res.send(response);
    });

});

module.exports = router;
