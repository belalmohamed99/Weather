import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  weatherData: any;
  city: string = '';
  private apiKey = '584ca1255e18eb76e4f940baf93193ba';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather() {
    if (this.city.trim()) {
      this.fetchWeather(this.city).subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.error('Error fetching weather data', error);
          this.weatherData = null;
        }
      );
    }
  }

  fetchWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}
