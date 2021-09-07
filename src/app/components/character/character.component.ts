import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { character } from '../../Models/character.model';
import { episode } from '../../Models/episode.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  id: string;
  character: character;
  episodes: episode[] = [];
  flag: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyApiService
  ) {
    this.chargePageData();
  }

  ngOnInit(): void {}

  chargePageData() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rickAndMortyService.getSingleCharacter(this.id).subscribe(
      (ApiCharacter: character) => {
        this.character = ApiCharacter[0];
        this.setEpisode();
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Seems like the character doesn´t exist!',
        });
        this.router.navigate(['/home']);
      }
    );
  }

  setEpisode() {
    this.rickAndMortyService
      .getApiEpisodes(this.character.episode[0])
      .subscribe((firstEpisode: episode) => {
        this.character.firstEpisode = firstEpisode.name;
        this.getEpisodes();
      });
  }

  getEpisodes() {
    for (let i = 0; i < this.character.episode.length; i++) {
      this.rickAndMortyService
        .getApiEpisodes(this.character.episode[i])
        .subscribe((episodeData: episode) => {
          this.episodes.push(episodeData);
          this.flag = true;
        });
    }
  }

  setFavorite() {
    if (
      sessionStorage.getItem('favs') == null ||
      sessionStorage.getItem('favs') == '[]'
    ) {
      sessionStorage.setItem('favs', `[${this.character.id}]`);
    } else {
      if (
        !sessionStorage
          .getItem('favs')
          .substring(1, sessionStorage.getItem('favs').length - 1)
          .split(',')
          .includes(String(this.character.id))
      ) {
        let favorites = sessionStorage.getItem('favs');
        sessionStorage.setItem(
          'favs',
          `[${favorites.substring(1, favorites.length - 1)},${
            this.character.id
          }]`
        );
      }
    }
  }

  chargeDetails(url: string) {
    this.rickAndMortyService
      .getApiEpisodes(url)
      .subscribe((episodeDetails: episode) => {
        this.showDetails(episodeDetails);
      });
  }

  showDetails(episodeDetails: episode) {
    Swal.fire({
      icon: 'info',
      title: 'Episode details',
      text: `${episodeDetails.id} - ${episodeDetails.name}`,
      footer: `Emitted: ${episodeDetails.air_date}`,
      showConfirmButton: false
    });
  }
}
