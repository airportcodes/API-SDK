import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { autocomplete } from 'air-port-codes-node';

// declare const apc:any;

@Component({
  selector: 'page-airport-codes',
  templateUrl: 'airportCodes.html'
})
export class AirportCodes {
  private apca;
  public airports = [];

  constructor(public navCtrl: NavController) {
    // instantiate the air-port-codes API
    // see teh index.html for the included air-port-codes js library
    this.apca = autocomplete({
      key : 'xxxxxxxxxx', 
      secret : 'xxxxxxxxxxxxxxx', // Your API Secret Key: use this if you are not connecting from a web server
      limit : 15
    });
  }

  /**
   * This is triggered on every keypress of the search field
   * @param ev the event object
   */
  onNewSearchTerm (ev: any) {
    const term:string = ev.target.value;

    if (term.length >= 3) {
      // Make the API request
      this.apca.request(term);

      // SUCCESS we found some airports
      this.apca.onSuccess = (data) => {
        this.airports = this.buildAirportList(data);
      };

      // FAIL no airports found
      this.apca.onError = (data) => {
        console.log('onError', data.message);
        this.airports = [];
      };
    } else {
      this.airports = [];
    }
  }

  /**
   * This is fired whenever an airport is selected
   * @param airport the selected airport object
   */
  onSelectAirport (airport:any) {
    // do something with the data
    console.log('airport', airport)
  }

  /**
   * This updates the response to add an appropriate label to each airport item
   * @param data the data we get back from the API
   */
  buildAirportList (data:any) {
    let listAry = [],
        thisAirport;

    if (data.status) { // success
      for (var i = 0, len = data.airports.length; i < len; i++) {
        thisAirport = data.airports[i];
        listAry.push(this.addAirportLabel(thisAirport));
        if (thisAirport.children) {
            for (var j = 0, jLen = thisAirport.children.length; j < jLen; j++) {
                listAry.push(this.addAirportLabel(thisAirport.children[j], true));
            }
        }
      }
    }
    return listAry;
  }

  /**
   * Creates the appropriate label. If it is a child it will add an indent arrow.
   * @param airport the object of a single airport
   * @param isChild a boolean letting us know if this airport is a child of another
   */
  addAirportLabel (airport:any, isChild?:boolean) {
    let label;
    if (isChild) { // format children labels
      label = '&rdsh;' + airport.iata + ' - ' + airport.name;
    } else { // format labels
      label = airport.iata + ' - ' + airport.name;
    }
    airport.label = label;

    return airport;
  }
}
