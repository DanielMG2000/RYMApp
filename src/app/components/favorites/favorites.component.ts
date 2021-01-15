import { Component, OnInit } from '@angular/core';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { character } from '../../Models/character.model';
import { episode } from '../../Models/episode.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  characters: character[] = [];
  flag: boolean = false;

  constructor(private rickAndMortyService: RickAndMortyApiService, private router: Router) {
    this.getFavCharacters();
  }

  ngOnInit(): void {}

  getFavCharacters() {
    this.rickAndMortyService
      .getApiCharacters(
        sessionStorage
          .getItem('favs')
          .substring(1, sessionStorage.getItem('favs').length - 1)
      )
      .subscribe((apiCharacters: character[]) => {
        if (!apiCharacters.length) {
          if('results' in apiCharacters){
            this.router.navigate(['/home']);
          } else {
            this.characters = [];
            this.characters.push(apiCharacters as any);
            this.setEpisode();
          } 
        } else {
          this.characters = apiCharacters;
          this.setEpisode();
        }
      });
  }

  setEpisode() {
    for (let i = 0; i < this.characters.length; i++) {
      this.rickAndMortyService
        .getApiEpisodes(this.characters[i].episode[0])
        .subscribe((firstEpisode: episode) => {
          this.characters[i].firstEpisode = firstEpisode.name;
          this.flag = true;
        });
    }
  }

  showAlert(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this character?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The character has been deleted.', 'success');
        this.removeCharacter(id);
      }
    });
  }

  removeCharacter(id: string) {
    let favorites = sessionStorage
      .getItem('favs')
      .substring(1, sessionStorage.getItem('favs').length - 1)
      .split(',');
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] == id) {
        favorites.splice(i, 1);
      }
    }
    sessionStorage.setItem('favs', `[${favorites}]`);
    this.getFavCharacters();
  }
}
