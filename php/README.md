# Air-port-codes API PHP SDK

The PHP software development kit for Air-port-codes API

## Installation

1. First login to your air-port-codes.com account and update your account settings by adding any domains that might need to access the API. 
2. Make a note of your API Key as you will need it for all requests to the API.

## Usage

All of the curl (request) functionality will be handled for you in the Air-port-codes class file (air-port-codes-api.php).

You start by including the apc class and make sure you add your API Key to it.

```
	require_once('air-port-codes-api.php');
```

Next you create an array of parameters that will be used in your request to the API. Then pass in the parameters when you instantiate the apc class.

```
	// Setup request parameters to override the configparams set in apc class
	$params = [
	    'limit' => 2,
	    'size' => 3,
	];
	 
	// 'multi', 'single' or 'countries' type of request
	$apc = new apc('multi', $params);
```

The final step is simply making the request. Just pass in the search term and your curl request will be automatically made to the Air-port-codes API.

```
	$apcResponseObj = $apc->request('new yor');
```

You can now display the results however you want. The returned object will be a json decoded object.

```
	<pre>
	<?= print_r($apcResponseObj); ?>
	</pre>
```

## More Information

If you need more information, please visit [Air-port-codes documentation](https://www.air-port-codes.com/airport-codes-api/).