'use strict';
/* global ActiveXObject */

/*! 
 * The main ES6 vanilla javascript library for accessing the Air-port-codes API
 * 
 * @license MIT license
 * apc npm library v1.3.5 | (c) 2018 AIR-PORT-CODES | Air-port-codes.com/terms-of-use
 */

/**
 * The main library handling the requests to the Air-port-codes API service
 * @param  {string} type   autocomplete | multi | single | countries | states - determines the desired api to use
 * @param  {array} config allows you to set initial configuration
 * @return {object}        the public access points
 */

const main = ( type, config ) => {
	const reqObj = {};
	const uri = 'https://www.air-port-codes.com/api/v1/';
	let ajax;

	const scope = {
		request: ( data ) => {
			scope[type](data); 
		},

		init: () => {
			for(const item in config) {
				if (item !== 'key' && item !== 'secret') {
					reqObj[item] = config[item];
				}
			}
		},

		autocomplete: (term) => {
			reqObj.term = term;
			scope.doAjax();
		},

		multi: (term) => {
			reqObj.term = term;
			scope.doAjax();
		},

		single: (iataCode) => {
			reqObj.iata = iataCode;
			scope.doAjax();
		},

		countries: () => {
			scope.doAjax();
		},

		states: () => {
			scope.doAjax();
		},

		doAjax: () => {
			ajax.post(uri + type, reqObj, ( data ) => {
				data = JSON.parse(data);
	            if (data.status) { // success
	                scope.onSuccess(data);
	            } else { // no results
	                scope.onError(data);
	            }
			});
		}
	};

	ajax = {
		x : () => {
		    if (typeof XMLHttpRequest !== 'undefined') {
		        return new XMLHttpRequest();
		    }
		    var versions = [
		        "MSXML2.XmlHttp.6.0",
		        "MSXML2.XmlHttp.5.0",
		        "MSXML2.XmlHttp.4.0",
		        "MSXML2.XmlHttp.3.0",
		        "MSXML2.XmlHttp.2.0",
		        "Microsoft.XmlHttp"
		    ];

		    let xhr;
		    for (var i = 0; i < versions.length; i++) {
		        try {
		            xhr = new ActiveXObject(versions[i]);
		            break;
		        } catch (e) {
		        }
		    }
		    return xhr;
		},
		
		send : function (url, callback, method, data, async) {
		    if (async === undefined) {
		        async = true;
		    }
		    const x = ajax.x();
		    x.open(method, url, async);
		    x.onreadystatechange = () => {
		        if (x.readyState === 4) {
		            callback(x.responseText);
		        }
		    };
		    if (method === 'POST') {
		        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		        x.setRequestHeader('APC-Auth', config.key);
		        if (config.secret) {
			        x.setRequestHeader('APC-Auth-Secret', config.secret);
		        }
		    }
		    x.send(data);
		},

		post : (url, data, callback, async) => {
		    let query = [];
		    for (const key in data) {
		        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		    }
		    ajax.send(url, callback, 'POST', query.join('&'), async);
		}
	};

	scope.init();
	
	return scope;
};

const autocomplete = (config) => main('autocomplete', config);
const multi = (config) => main('multi', config);
const single = (config) => main('single', config);
const countries = (config) => main('countries', config);
const states = (config) => main('states', config);

export default main;
export { autocomplete, multi, single, countries, states }

/*
Usage...

import { autocomplete } from 'air-port-codes-node';

this.apca = autocomplete({
	key : 'xxxxxxxxxxx', 
	secret : 'xxxxxxxxxxxxxxx', // Your API Secret Key: use this if you are not connecting from a web server
	limit : 15
});
*/
