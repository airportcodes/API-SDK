# Air-port-codes API SDK

The SDK for accessing all 9000+ airport codes and airport data from [Air-port-codes](https://www.air-port-codes.com) API data feed.

## Installation

1. First login to your air-port-codes.com account and update your account settings by adding any domains that might need to access the API. 
2. Make a note of your API Key and your API Secret as you will need them for all requests to the API.
3. Install the npm library

```
npm install air-port-codes-node
```

## Integration
Consult the [documentation](https://www.air-port-codes.com/airport-codes-api/overview/) for the appropriate config settings to use.

Also, you can view the Ionic Angular example TypeScript file showing it in practice.
```
import { autocomplete } from 'air-port-codes-node';

this.apca = autocomplete({
	key : 'xxxxxxxxxxx', 
	secret : 'xxxxxxxxxxxxxxx', // Your API Secret Key: use this if you are not connecting from a web server
	limit : 15
});
```



## License

MIT license | (c) 2016 AIR-PORT-CODES | Air-port-codes.com/legal/terms-of-use