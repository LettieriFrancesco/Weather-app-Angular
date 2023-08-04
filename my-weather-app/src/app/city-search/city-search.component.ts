import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  cityName: string = '';
  weatherData: any;
  cityInfo: any = null;

  @Output() citySearched: EventEmitter<string> = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  onSearch() {
    this.weatherService.getCoordinates(this.cityName).subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          const city = data[0];
          const cityInfo = `${city.name}, ${city.state}, ${city.country}`;
          this.citySearched.emit(cityInfo);
          this.getWeatherInfo(city.name, city.state, city.country);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getWeatherInfo(cityName: string, stateCode: string, countryCode: string) {
    this.weatherService.getWeatherByCityName(cityName.trim(), stateCode.trim(), countryCode.trim()).subscribe(
      (data: any) => {
        this.cityInfo = {
          cityName: cityName.trim(),
          weatherData: data.list[0]
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
