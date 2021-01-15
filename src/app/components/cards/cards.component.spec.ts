import { CardsComponent } from './cards.component';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { Observable } from 'rxjs';
import { character } from '../../Models/character.model';
describe('CardsComponent', () => {
  
  let component: CardsComponent;
  let service = new RickAndMortyApiService(null);

  // it('getCharacters should charge 12 objects by default', () => {
  //   const spy = spyOn(service, 'getApiCharacters').and.callFake(() =>{
  //     return new Observable<character[]>();
  //   });

  //   spyOn(service, 'getApiEpisodes').and.callFake(() =>{
  //     return null;
  //   });

  //   spyOn(service, 'getApiData').and.callFake(() =>{
  //     return null;
  //   });

  //   component = new CardsComponent(service, null);
  //   component.getCharacters();
  //   expect(spy).toHaveBeenCalled()
  // })
});
