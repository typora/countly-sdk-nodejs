/************
* Countly NodeJS SDK
* https://github.com/Countly/countly-sdk-nodejs
************/

/**
 * CountlyBulkUser object to make it easier to send information about specific user in bulk requests
 * @name CountlyBulkUser
 * @global
 * @namespace CountlyBulkUser
 * @example <caption>SDK integration</caption>
 * var CountlyBulk = require('countly-sdk-nodejs').Bulk;
 *
 * var server = new CountlyBulk({
 *   app_key: "{YOUR-API-KEY}",
 *   url: "https://API_HOST/",
 *   debug: true
 * });

 * //adding requests by user
 * var user = server.addUser({device_id:"my_device_id"});
 */

/**
 * Initialize CountlyBulkUser object
 * @param {Object} conf - CountlyBulkUser configuration options
 * @param {Object} conf.server - CountlyBulk instance with server configuration
 * @param {string} conf.device_id - identification of the user
 * @param {string=} conf.country_code - country code for your user
 * @param {string=} conf.city - name of the city of your user
 * @param {string=} conf.ip_address - ip address of your user
 * @example
 * var CountlyBulk = require('countly-sdk-nodejs').Bulk;
 *
 * var server = new CountlyBulk({
 *   app_key: "{YOUR-API-KEY}",
 *   url: "https://API_HOST/",
 *   debug: true
 * });
 
 * //adding requests by user
 * var user = server.addUser({device_id:"my_device_id"});
 * user.begin_session().add_event({key:"Test", count:1})
 */
function CountlyBulkUser(conf){
    'use strict';
    
    var sessionStart = 0;

    if(!conf.device_id){
        log("device_id is missing");
        return;
    }
    
    if(!conf.server){
        log("server instance is missing");
        return;
    }
    
    /**
    * Start user's sesssion
    * @param {Object} metrics - provide {@link Metrics} for this user/device, or else will try to collect what's possible
    * @param {string} metrics._os - name of platform/operating system
    * @param {string} metrics._os_version - version of platform/operating system
    * @param {string=} metrics._device - device name
    * @param {string=} metrics._resolution - screen resolution of the device
    * @param {string=} metrics._carrier - carrier or operator used for connection
    * @param {string=} metrics._density - screen density of the device
    * @param {string=} metrics._locale - locale or language of the device in ISO format
    * @param {string=} metrics._store - source from where the user/device/installation came from
    * @param {number} seconds - how long did the session last in seconds
    * @param {number} timestamp - timestamp when session started
    **/
    this.begin_session = function(metrics, seconds, timestamp){
        var bulk = [];
        var query = prepareQuery({begin_session:1, metrics:metrics});
        if(conf.country_code)
            query.country_code = conf.country_code;
        if(conf.city)
            query.city = conf.city;
        if(timestamp){
            sessionStart = timestamp;
            query.timestamp = timestamp;
        }
        bulk.push(query);
        
        seconds = parseInt(seconds || 0);
        
        var beatCount = Math.ceil(seconds/60);
        for(var i = 0; i < beatCount; i++){
            if(seconds > 0){
                var query = prepareQuery();
                if(seconds > 60)
                    query.session_duration = 60;
                else
                    query.session_duration = seconds;
                if(conf.ip_address)
                    query.ip_address = conf.ip_address;
                if(timestamp){
                    query.timestamp = timestamp+((i+1)*60);
                }
                seconds -= 60;
                bulk.push(query);
            }
        }
        conf.server.add_bulk_request(bulk);
    }
    
    /**
    * Report custom event
    * @param {Event} event - Countly {@link Event} object
    * @param {string} event.key - name or id of the event
    * @param {number} [event.count=1] - how many times did event occur
    * @param {number=} event.sum - sum to report with event (if any)
    * @param {number=} event.dur - duration to report with event (if any)
    * @param {number=} event.timestamp - timestamp when event occurred
    * @param {Object=} event.segmentation - object with segments key /values
    **/
    this.add_event = function(event){
        conf.server.add_event(conf.device_id, event);
        return this;
    };
    
    /**
    * Report user data
    * @param {Object} user - Countly {@link UserDetails} object
    * @param {string=} user.name - user's full name
    * @param {string=} user.username - user's username or nickname
    * @param {string=} user.email - user's email address
    * @param {string=} user.organization - user's organization or company
    * @param {string=} user.phone - user's phone number
    * @param {string=} user.picture - url to user's picture
    * @param {string=} user.gender - M value for male and F value for femail
    * @param {number=} user.byear - user's birth year used to calculate current age
    * @param {Object=} user.custom - object with custom key value properties you want to save with user
    **/
    this.user_details = function(user){
        var props = ["name", "username", "email", "organization", "phone", "picture", "gender", "byear", "custom"];
        var query = prepareQuery({user_details: JSON.stringify(getProperties(user, props))});
        conf.server.add_request(query);
    };
    
    /**
    * Report user conversion to the server (when you retrieved countly campaign data, for example through Android INSTALL_REFERER intent)
    * @param {string} campaign_id - id of campaign, the last part of the countly campaign link
    * @param {string=} campaign_user_id - id of user's clicked on campaign link, if you have one or provide null
    **/
    this.report_conversion = function(campaign_id, campaign_user_id, timestamp){
        var query = prepareQuery();
        
        if(campaign_id)
            query.campaign_id = campaign_id;
        
        if(campaign_user_id)
            query.campaign_user = campaign_user_id;
        
        conf.server.add_request(query);
    };
    
    function prepareQuery(query){
        query = query || {device_id: conf.device_id};
        if(conf.ip_address)
            query.ip_address = conf.ip_address;
    }
    
    //retrieve only specific properties from object
    function getProperties(orig, props){
        var ob = {};
        var prop;
        for(var i = 0; i < props.length; i++){
            prop = props[i];
            if(typeof orig[prop] !== "undefined")
                ob[prop] = orig[prop];
        }
        return ob;
    }
};

module.exports = CountlyBulk;
