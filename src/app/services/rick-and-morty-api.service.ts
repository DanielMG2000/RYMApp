import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { apiData } from '../Models/apiData.model';
import { character } from '../Models/character.model';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyApiService {
  private ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) {}

  getApiData(): Observable<apiData> {
    return this.http.get<apiData>(`${this.ApiUrl}/character/`);
  }

  getApiCharacters(ids): Observable<character[]> {
    return this.http.get<character[]>(`${this.ApiUrl}/character/${ids}`);
  }

  getSingleCharacter(id: string): Observable<character> {
    return this.http.get<character>(`${this.ApiUrl}/character/${id}`);
  }

  getApiEpisodes(url: string) {
    return this.http.get(url);
  }
}
