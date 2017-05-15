# Countly NodeJS SDK 
[![Build Status](https://travis-ci.org/Countly/countly-sdk-nodejs.svg?branch=master)](https://travis-ci.org/Countly/countly-sdk-nodejs) [![npm version](https://badge.fury.io/js/countly-sdk-nodejs.svg)](https://badge.fury.io/js/countly-sdk-nodejs) [![Inline docs](http://inch-ci.org/github/Countly/countly-sdk-nodejs.svg?branch=master)](http://inch-ci.org/github/Countly/countly-sdk-nodejs)


## What's Countly?
[Countly](http://count.ly) is an innovative, real-time, open source mobile analytics application. 
It collects data from mobile devices, and visualizes this information to analyze mobile application 
usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, 
and mobile SDK that sends this data. Both parts are open source with different licensing terms.

* **Slack user?** [Join our Slack community](http://slack.count.ly:3000/)
* **Questions?** [Ask in our Community forum](http://community.count.ly)

## About

This repository includes the Countly NodeJS SDK.

Need help? See [Countly SDK for NodeJS](http://resources.count.ly/v1.0/docs/countly-sdk-for-nodejs) SDK integration at [Countly Resources](http://resources.count.ly)  or [Countly NodeJS SDK Documentation](http://countly.github.io/countly-sdk-nodejs/)

## How to get Countly NodeJS SDK?

Currently in testing phase

    npm install countly-sdk-nodejs
or

    yarn add countly-sdk-nodejs

## How to use Countly NodeJS SDK?
```
var Countly = require('countly-sdk-nodejs');

Countly.init({
    app_key: "{YOUR-API-KEY}",
    url: "https://try.count.ly/",
    debug: true
});


Countly.begin_session();

Countly.add_event({
    "key": "in_app_purchase",
    "count": 3,
    "sum": 2.97,
    "dur": 1000,
    "segmentation": {
        "app_version": "1.0",
        "country": "Turkey"
    }
});
```
More information is available at [http://resources.count.ly/docs/countly-sdk-for-nodejs](http://resources.count.ly/docs/countly-sdk-for-nodejs)

### Other Github resources ###

Check Countly Server source code here: 

- [Countly Server](https://github.com/Countly/countly-server)

There are also other Countly SDK repositories below:

- [Countly iOS SDK](https://github.com/Countly/countly-sdk-ios)
- [Countly Android SDK](https://github.com/Countly/countly-sdk-android)
- [Countly Windows Phone SDK](https://github.com/Countly/countly-sdk-windows-phone)
- [Countly Web SDK](https://github.com/Countly/countly-sdk-web)
- [Countly Appcelerator Titanium SDK](https://github.com/euforic/Titanium-Count.ly) (Community supported)
- [Countly Unity3D SDK](https://github.com/Countly/countly-sdk-unity) (Community supported)

### How can I help you with your efforts?

Glad you asked. We need ideas, feedbacks and constructive comments. All your suggestions will be taken care with upmost importance. We are on [Twitter](http://twitter.com/gocountly) and [Facebook](http://www.facebook.com/Countly) if you would like to keep up with our fast progress!

If you like Countly, why not use one of our badges and give a link back to us, so others know about this wonderful platform? 

![Light badge](https://count.ly/wp-content/uploads/2014/10/countly_badge_5.png)  ![Dark badge](https://count.ly/wp-content/uploads/2014/10/countly_badge_6.png)

### Support

For community support page, see [http://community.count.ly](http://community.count.ly "Countly Support").


[![NPM](https://nodei.co/npm/countly-sdk-nodejs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/countly-sdk-nodejs/)
