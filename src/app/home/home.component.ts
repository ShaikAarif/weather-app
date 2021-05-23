import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[WeatherService]
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private weatherService:WeatherService) { }
  private statesWeatherDetails : Observable<any>;  

  private stateCode = [2750405,4700234,2510769,660013,2288873]
  
  ngOnInit() { 
    this.weatherService.getWeatherDetails(this.stateCode).subscribe(data=>{
      this.statesWeatherDetails = data.list;
      
      this.statesWeatherDetails.forEach((obj)=>{
         
           obj.sys.sunsetDateIST = new Date(obj.sys.sunset*1000) // converting unix date 
           obj.sys.sunriseDateIST = new Date(obj.sys.sunrise*1000) // converting unix date

           obj.sys.sunsetDateUTCString = new Date(obj.sys.sunset*1000).toUTCString() // converting unix date 
           obj.sys.sunriseDateUTCString = new Date(obj.sys.sunrise*1000).toUTCString()

           /**convert the kelvin temperature into Fahrenheit */
           obj.main.tempInFahrenheit =  (((obj.main.temp-273.15)*1.8)+32).toFixed();
           obj.main.tempInCelcius =  (obj.main.temp-273.15).toFixed(); // to celcius

      })
    });
    
  }

  onSelect(state) {
    this.router.navigate(['/details',state.name, state.coord.lat, state.coord.lon])
  }



}
