# Air-port-codes API JavaScript SDK

The JavaScript software development kit for Air-port-codes API

## Installation

1. First login to your air-port-codes.com account and update your account settings by adding any domains that might need to access the API. 
2. Make a note of your API Key as you will need it for all requests to the API.

## Usage

All of the request functionality will be handled for you in the Air-port-codes class file (air-port-codes-api-min.js).

Here are the necessary parts to getting things working.
 
1. First load our apc library that you downloaded earlier. 
2. Then initialize the api library. 
3. The apc object will need your api key and any other necessary parameters. 
4. Setup your callbacks (onSuccess, onError). 
5. After that, you are ready to make your request with your search parameter.

```
	<script src="air-port-codes-api-min.js"></script>
	<script>
	// initialize the apc library
	var apcm = new apc('multi', {key : 'xxxxxxxxxx', limit: 7});
	 
	// handle successful response
	apcm.onSuccess = function (data) {
	    console.log(data);
	};
	 
	// handle response error
	apcm.onError = function (data) {
	    console.log(data.message);
	};
	 
	// makes the request to get the airport data
	apcm.request('new yo');
	</script>
```

Those are all of the necessary things to get some results back from the API using plain old javascript. For a real world scenario keep reading and/or download our sample code.

## More Information

If you need more information, please visit [Air-port-codes documentation](https://www.air-port-codes.com/airport-codes-api/).