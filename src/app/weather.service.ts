import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  rootServiceUrl: string;
  appId: string;
  constructor(private readonly http: HttpClient) {
    this.rootServiceUrl = `${environment.rootURL}`
    this.appId = `${environment.appID}`
  }

  getWeatherDetails(stateCodes): Observable<any> {
    const url = this.rootServiceUrl + "group?id=" + stateCodes + "&units=metric&appid=" + this.appId;
    return this.http.get(url).pipe(map((res) => res));
  }

  getSelectedStateWeatherDetails(state):Observable<any> {
    const url = this.rootServiceUrl + "forecast?q=" + state + "&units=metric&appid=" + this.appId;
    return this.http.get(url).pipe(map((res) => res));
  }

  getSelectedStateOncallDetails(lat,lon):Observable<any> {
    const url = this.rootServiceUrl + "onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=" + this.appId;
    return this.http.get(url).pipe(map((res) => res));
  }

}
