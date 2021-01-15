import { Component, OnInit } from '@angular/core';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { character } from '../../Models/character.model';
import { episode } from '../../Models/episode.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  itemsPerPage = 12;
  arrayIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  actualPage = 1;
  characters: character[];
  allCharacters: number;
  favs: boolean;
  flag: boolean = false;

  constructor(
    private rickAndMortyService: RickAndMortyApiService,
    private route: Router
  ) {
    this.getFavsData();
    this.getCharacters();
    this.getData();
  }

  ngOnInit(): void {}

  startApp() {
    this.setArray();
    this.getIds();
    this.getCharacters();
  }

  getFavsData() {
    if (sessionStorage.getItem('favs') == null) {
      sessionStorage.setItem('favs', '[]');
    }
    if (sessionStorage.getItem('favs') == '[]') {
      this.favs = false;
    } else {
      this.favs = true;
    }
  }

  getCharacters() {
    this.rickAndMortyService
      .getApiCharacters(this.arrayIds)
      .subscribe((characters) => {
        this.characters = characters;
        this.setEpisode();
      });
  }

  setEpisode() {
    for (let i = 0; i < this.arrayIds.length; i++) {
      this.rickAndMortyService
        .getApiEpisodes(this.characters[i].episode[0])
        .subscribe((firstEpisode: episode) => {
          this.characters[i].firstEpisode = firstEpisode.name;
          this.flag = true;
        });
    }
  }

  getData() {
    this.rickAndMortyService.getApiData().subscribe((data) => {
      this.allCharacters = data.info.count;
    });
  }

  changePageto(side: string) {
    if (side === 'right') {
      this.actualPage++;
      this.startApp();
    } else {
      this.actualPage--;
      this.startApp();
    }
  }

  setArray() {
    this.arrayIds = [...Array(this.itemsPerPage).keys()];
    for (let i = 0; i < this.arrayIds.length; i++) {
      this.arrayIds[i]++;
    }
  }

  getIds() {
    if (this.actualPage != 1) {
      for (let i = 0; i < this.itemsPerPage; i++) {
        this.arrayIds[i] =
          this.arrayIds[i] + this.itemsPerPage * (this.actualPage - 1);
      }
    }
  }

  changeItemsPerPage(items: number) {
    this.itemsPerPage = items;
    this.startApp();
  }

  redirectToCharacter(id: number) {
    this.route.navigate(['/character', id]);
  }
}
