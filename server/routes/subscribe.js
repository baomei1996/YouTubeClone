const express = require('express')
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');
const { Video } = require('../models/Video');


// =====================
//        Subscribe
// ======================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) =>{
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
})

router.post('/subscribed', (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
      let result = false
      if(subscribe.length !== 0) {
        result = true
      }
      res.status(200).json({ success: true, subscribed: result })
    })
})

router.post('/unSubscribe', (req, res) => {
  Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, doc) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, doc })
    })
})

router.post('/subscribe', (req, res) => {
  
  const subscribe = new Subscriber(req.body)
  subscribe.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ success: true, doc })
  })
})

router.post('/getSubscriptionVideos', (req, res) => {
 
  // 자신의 아이디를 가지고 구독하는 삶을 찾는다.
  Subscriber.find({ userFrom: req.body.userFrom })
    .exec((err, subscribeInfo) => {
      if(err) return res.status(200).send(err)
      let subscribedUser = [];

      subscribeInfo.map((subscriber, i) => {
        subscribedUser.push(subscriber.userTo)
      })
      
      // 찾은 사람들의 비디오를 가지고 온다. 

      Video.find({ 'writer' : { $in: subscribedUser }})
        .populate('writer')
        .exec((err, videos) => {
          if(err) return res.status(400).send(err);
          res.status(200).json({ success:  true, videos })
        })
    })
})

module.exports = router