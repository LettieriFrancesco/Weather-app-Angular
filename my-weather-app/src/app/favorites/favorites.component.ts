import { Component } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteCities: string[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe((data: any) => {
      this.favoriteCities = data.cities;
    });
  }
}
