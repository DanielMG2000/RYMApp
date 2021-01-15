import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FavoritesExistGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if(sessionStorage.getItem('favs')=='[]' || sessionStorage.getItem('favs')== null ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seems like you don´t have any favorite character!'
      });
      this.router.navigate(['/home']);
      return false;
    } else{
      return true;
    }
  }
  
}
