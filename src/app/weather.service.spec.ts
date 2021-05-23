import { TestBed, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import {environment } from '../environments/environment'
describe('WeatherService', () => {
  let stateCode = [2750405,4700234,2510769,660013,2288873];
  let state = "netherlands";
  let lat = 52.5;
  let lon = 5.75
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      WeatherService,
    ],
  }));

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('getWeatherDetails - should get details from weather service',() => {
    const service: WeatherService = TestBed.get(WeatherService);
    const mockResponse = 
      {"cnt":5,"list":[{"coord":{"lon":5.75,"lat":52.5},"sys":{"country":"NL","timezone":7200,"sunrise":1621740584,"sunset":1621798685},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"main":{"temp":12.05,"feels_like":11.22,"temp_min":11.67,"temp_max":12.22,"pressure":996,"humidity":73},"visibility":10000,"wind":{"speed":11.62,"deg":207},"clouds":{"all":99},"dt":1621771599,"id":2750405,"name":"Netherlands"},{"coord":{"lon":-96.8847,"lat":32.184},"sys":{"country":"US","timezone":-18000,"sunrise":1621769113,"sunset":1621819425},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"main":{"temp":20.34,"feels_like":21.04,"temp_min":20,"temp_max":21,"pressure":1021,"humidity":100},"visibility":10000,"wind":{"speed":2.57,"deg":120},"clouds":{"all":90},"dt":1621771834,"id":4700234,"name":"Italy"},{"coord":{"lon":-4,"lat":40},"sys":{"country":"ES","timezone":7200,"sunrise":1621745664,"sunset":1621798286},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"main":{"temp":17.29,"feels_like":16.62,"temp_min":16,"temp_max":18.89,"pressure":1017,"humidity":59},"visibility":10000,"wind":{"speed":5.14,"deg":40},"clouds":{"all":40},"dt":1621771582,"id":2510769,"name":"Spain"},{"coord":{"lon":26,"lat":64},"sys":{"country":"FI","timezone":10800,"sunrise":1621730281,"sunset":1621799268},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"main":{"temp":8.11,"feels_like":7.49,"temp_min":8.11,"temp_max":8.11,"pressure":1007,"sea_level":1007,"grnd_level":993,"humidity":61},"visibility":10000,"wind":{"speed":1.5,"deg":260},"clouds":{"all":100},"dt":1621771519,"id":660013,"name":"Finland"},{"coord":{"lon":-3.7396,"lat":5.2038},"sys":{"country":"CI","timezone":0,"sunrise":1621749627,"sunset":1621794198},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"main":{"temp":31,"feels_like":37.6,"temp_min":31,"temp_max":31,"pressure":1013,"humidity":70},"visibility":8000,"wind":{"speed":3.09,"deg":210},"clouds":{"all":40},"dt":1621771579,"id":2288873,"name":"France"}]}
      service.getWeatherDetails(stateCode).subscribe((res)=>{
      expect(res).toBe(mockResponse);

    })
  });

  it('getSelectedStateWeatherDetails - should get details from weather service',() => {
    const service: WeatherService = TestBed.get(WeatherService);
    service.getSelectedStateWeatherDetails(state).subscribe((res)=>{
      expect(res).toHaveBeenCalled();

    })
  });

  it('getSelectedStateWeatherDetails - should throw error',() => {
    const service: WeatherService = TestBed.get(WeatherService);
    const mockResponse = {"cod":"404","message":"city not found"}
    service.getSelectedStateWeatherDetails(null).subscribe((res)=>{
      expect(res).toBe(mockResponse);

    })
  });

  it('getSelectedStateOncallDetails - should get weather forecast details ',() => {
    const service: WeatherService = TestBed.get(WeatherService);
    service.getSelectedStateOncallDetails(lat,lon).subscribe((res)=>{
      expect(res.length).toBeGreaterThan(1);
    })
  });

  it('getSelectedStateOncallDetails - should not get weather forecast details if input is incorrect ',() => {
    const service: WeatherService = TestBed.get(WeatherService);
    const mockResponse = {"cod":"400","message":"wrong latitude"}
    service.getSelectedStateOncallDetails(lat,lon).subscribe((res)=>{
      expect(res).toBe(mockResponse)
    })
  });



});
