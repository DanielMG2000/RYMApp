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
  private MyApiUrl = environment.UrlMyApi;

  constructor(private http: HttpClient) {}

  getApiData(): Observable<apiData> {
    return this.http.get<apiData>(`${this.ApiUrl}/character/`);
  }

  getApiCharacters(ids, page?: number, limit?: number): Observable<character[]> {
    return this.http.get<character[]>(`${this.ApiUrl}/character/${ids}`);
    
  }

  getSingleCharacter(id: string): Observable<character> {
    //return this.http.get<character>(`${this.ApiUrl}/character/${id}`);
    return this.http.get<character>(`${this.MyApiUrl}/${id}`);
  }

  getApiEpisodes(url: string) {
    return this.http.get(url);
  }

  getAllCharacters(page: number, limit: number): Observable<character[]>{
    return this.http.get<character[]>(`${this.MyApiUrl}/${page}/${limit}`);
  }
}
