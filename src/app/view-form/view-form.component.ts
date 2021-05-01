import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
  FormData: any;
  WeatherData: any;
  constructor(private server: BackendService) {}

  ngOnInit(): void {
    const Data = JSON.parse(localStorage.getItem('SaveData'));
    console.log(Data);
    this.FormData = Data;
    const city  = this.FormData.City;
    console.log(city);
    this.server.FetchWeatherData(city).subscribe((data) => {
      this.WeatherData = data;
      console.log(this.WeatherData);
    })
  }
}
