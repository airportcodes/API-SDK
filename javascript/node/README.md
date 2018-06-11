# Air-port-codes API SDK


The SDK for accessing all 9000+ airport codes and airport data from [Air-port-codes](https://www.air-port-codes.com) API data feed. Use the Air-port-codes service to help you quickly build an auto-complete form for your website or application.

## Installation

1. First login to your air-port-codes.com account and update your account settings by adding any domains that might need to access the API. 
2. Make a note of your API Key and your API Secret as you will need them for all requests to the API.
3. Install the npm library

```
npm install air-port-codes-node
```

Need a **PHP** version? [Here you go](https://github.com/airportcodes/API-SDK/tree/master/php).

## Integration
Consult the [documentation](https://www.air-port-codes.com/airport-codes-api/overview/) for the appropriate config settings to use.

Also, you can view the [Ionic Angular example code](https://github.com/airportcodes/API-SDK/tree/master/javascript/examples/ionic-angular-autocomplete) and [live demo](https://www.air-port-codes.com/demos/ionic/) showing the API in practice.
```
import { autocomplete } from 'air-port-codes-node';

const apca = autocomplete({
	key : 'xxxxxxxxxxx', 
	secret : 'xxxxxxxxxxxxxxx', // Your API Secret Key: use this if you are not connecting from a web server
	limit : 15
});
```

Typically a key press would be used in an autocomplete form to make a new api request like this.
```
let term = 'new yo';
apca.request(term);
```

Then simply listen for the response
```
// SUCCESS we found some airports
apca.onSuccess = (data) => {
    console.log('data', data)
};

// FAIL no airports found
apca.onError = (data) => {
    console.log('onError', data.message);
};
```
Other [Air-port-codes API endpoints](https://www.air-port-codes.com/airport-codes-api/overview/) can easily be accessed as well.
```
// The easiest way to build an airport autocomplete field
import { autocomplete } from 'air-port-codes-node';

// Finds a list of airports matching search term
import { multi } from 'air-port-codes-node';

// Finds a single airport matching an airport IATA code
import { single } from 'air-port-codes-node';

Retrieves all countries and their ISO (2 character alpha)values
import { countries } from 'air-port-codes-node';

// Retrieves all districts (states/provinces) of any country in the world
import { states } from 'air-port-codes-node';
```

You can also use an alias in your import to make using the library simpler to understand
```
import { autocomplete as apcAutoComplete } from 'air-port-codes-node';

const apca = apcAutoComplete({
	key : 'xxxxxxxxxxx', 
	secret : 'xxxxxxxxxxxxxxx',
	limit : 15
});
```

## Ionic Angular Example Screenshot
**[View Live Demo](https://www.air-port-codes.com/demos/ionic/)**

![Ionic Angular Example Screenshot](https://github.com/airportcodes/API-SDK/blob/master/javascript/examples/ionic-angular-autocomplete.png?raw=true)

## License

MIT license | (c) 2016 AIR-PORT-CODES | Air-port-codes.com/legal/terms-of-use