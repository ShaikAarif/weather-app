import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private  stateWeatherForecast : Observable<any>;
  private  stateOnecallForecast : Observable<any>;
  private selectedState: string;
  private selectedStateLat: number;
  private selectedStateLon: number;
  private stateWeatherDetails : Observable<any>;
  constructor(private route: ActivatedRoute, private weatherService:WeatherService) {
    this.route.params.subscribe( params => {
      this.selectedState = params.name
      this.selectedStateLat = params.lat,
      this.selectedStateLon = params.lon
    }); // we can even pass the object directly than getting individual
   }

  ngOnInit() {
    this.weatherService.getSelectedStateWeatherDetails(this.selectedState).subscribe( res => {
     this.stateWeatherDetails = res;
      this.stateWeatherForecast  = res.list.filter((itm)=>{
        if(itm.dt_txt.includes('09:00:00')){
          return itm
        }
      })
      this.stateWeatherForecast.forEach((obj)=>{
        obj.forecastDate = new Date(obj.dt*1000)     
     })
    })

    //Oncall details

    this.weatherService.getSelectedStateOncallDetails(this.selectedStateLat, this.selectedStateLon).subscribe(res=>{
     this.stateOnecallForecast = res.daily;
      this.stateOnecallForecast.forEach((obj)=>{
        obj.forecastDate = new Date(obj.dt*1000)
      })
    })
  }

}
