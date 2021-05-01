import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public APIUrl = 'http://api.weatherstack.com/current';
  public APIKey = 'ce06292f55182dcc9ed888cc07fe7f6b';
  constructor(private http: HttpClient) { }

  public FetchData(pincode: any): any {
    return this.http.get('https://api.postalpincode.in/pincode/' + pincode);
  }
  public FetchWeatherData(city): any {
    return this.http.get(this.APIUrl + '?access_key=' + this.APIKey + '&query=' + city);
  }
}
