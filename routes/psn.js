const express = require('express');

const psnController = require('../controllers/psn');
const psnTokenController = require('../controllers/psn/tokens');
const psnMessageController = require('../controllers/psn/message');
const psnProfileController = require('../controllers/psn/profile');
const psnCommunityController = require('../controllers/psn/community');

const router = express.Router();

// test endpoint//
router.get('/test/stats/', psnTokenController.getStatus);


// testn

// commnutiy related

// message related
router.get('/message/new', psnMessageController.getThreadsModifiedDate);
router.post('/message/find', psnMessageController.crossFindId);
router.post('/message/send', psnMessageController.sendMessageToThread);
router.post('/message/send/direct', psnMessageController.sendMessageToPerson);
router.post('/message/receive', psnMessageController.getThreadMessages);
// need to work on auth middleware
router.post('/message/leave', psnMessageController.leaveThread);


// trophy retated
router.get('/trophies/getgame/:onlineId/:npCommunicationId', psnController.getIndividualGame);
router.get('/trophies/result', psnController.checkAllTrophies);
router.get('/trophies/getall/:onlineId/:waitTime', psnController.getAllTrophies);
router.get('/trophy/:start/:limit/:onlineId', psnController.getTrophies);


// profie and autnetication
router.get('/profile/:onlineId', psnProfileController.getProfile);
router.post('/profile/activity', psnProfileController.getUserActivities);
router.post('/login', psnTokenController.login);


module.exports = router;