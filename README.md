# SMSAPI.com JavaScript (node.js) Client

[![npm version](https://badge.fury.io/js/smsapicom.svg)](http://badge.fury.io/js/smsapicom)

JavaScript client for sending SMS and account management on SMSAPI.com

## Installation (node.js)

```bash

$ npm install smsapicom --save

```

## Example

```javascript

var SMSAPI = require('smsapicom'),
    smsapi = new SMSAPI();

smsapi.authentication
    .login('username', 'password')
    .then(sendMessage)
    .then(displayResult)
    .catch(displayError);

function sendMessage(){
    return smsapi.message
        .sms()
        .from('Info')
        .to('+48605xxxxxx')
        .message('My first message!')
        .execute(); // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

```

## Example (backup server)

```javascript

var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI({
    	server: 'https://api2.smsapi.com/'
    });

smsapi.authentication
    .login('username', 'password')
    .then(sendMessage)
    .then(displayResult)
    .catch(displayError);

function sendMessage(){
    return smsapi.message
        .sms()
        .from('Info')
        .to('605xxxxxx')
        .message('My first message!')
        .execute(); // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

```

# Authentication

Library supports plain text password and md5 hash as a method of authentication. By default [Basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication) is used.

## Plain text example

```javascript
var promise = smsapi.authentication
    .login('username', 'password');
```

## md5 hash example

```javascript
var promise = smsapi.authentication
    .loginHashed('username', '5f4dcc3b5aa765d61d8327deb882cf99');
```

## OAuth

To use OAuth add parameter while SMSAPI object creation:

* `oauth.accessToken`

```javascript
var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI({
        oauth: {
            accessToken: 'your-access-token'
        }
    });

sendMessage()
    .then(displayResult)
    .catch(displayError);

function sendMessage(){
    return smsapi.message
        .sms()
        .from('Info')
        .to('605xxxxxx')
        .message('My first message!')
        .execute(); // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}
```

Token can be generated in SMSAPI panel, under address: https://ssl.smsapi.com/webapp#/oauth/manage

# Documentation

REST API documentation: [http://www.smsapi.com/rest](http://www.smsapi.com/rest).

Requests are returning [Promises/A+](https://promisesaplus.com). Used implementation: https://github.com/tildeio/rsvp.js

## List of available operations

* message
    * sms
* points
    * get
* sender
    * add
    * delete
    * status
    * default
    * list
* hlr
    * check
* user
    * add
    * delete
    * update
    * get
    * list
* contacts
    * list
    * add
    * get
    * update
    * delete
    * fields
        * list
        * add
        * update
        * delete
    * groups
        * list
        * add
        * get
        * update
        * delete
        * assignments
            * list
            * add
            * get
            * delete
        * permissions
            * list
            * add
            * get
            * update
            * delete
        * members
            * add
            * get
            * delete

## Examples

Additional examples can be found in test folder (./test).

## Testing

```bash

$ npm install mocha -g
$ npm install .
$ npm test

```

# License

[Apache 2.0 License](LICENSE)
