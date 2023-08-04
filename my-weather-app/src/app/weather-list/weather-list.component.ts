import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent {
  cityInfos: any[] = []; // Lista di oggetti cityInfo anziché un oggetto singolo

  constructor(private weatherService: WeatherService) { }

  onSearch(cityInfo: string) {
    const [cityName, stateCode, countryCode] = cityInfo.split(',');
    this.weatherService.getWeatherByCityName(cityName.trim(), stateCode.trim(), countryCode.trim()).subscribe(
      (data: any) => {
        this.cityInfos.push({
          cityName: cityName.trim(),
          weatherData: data.list[0]
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
