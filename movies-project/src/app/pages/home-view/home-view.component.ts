import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  movies: Movie[] = [];
  favoriteMovies: { movieId: number; favorite: boolean }[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
    this.loadMovies();
  }

  async redirectToMovieDetail(movieId: number) {
    await this.router.navigate(['/movie-detail', movieId]);
  }

  filterValue: boolean = false;
  emptyStar: string = 'assets/img/empty-star.png';
  star: string = 'assets/img/star.png';

  filter() {
    if (!this.filterValue) {
      this.loadMovies();
    }
    this.movies = this.movies.filter((x) => x.favorite == this.filterValue);
  }

  saveOrDeleteFavoritedMovie(movieId: number, isFavorite: boolean): void {
    const favoriteMovies: { movieId: number; favorite: boolean }[] = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );

    const movieIndex = favoriteMovies.findIndex(
      (movie) => movie.movieId === movieId
    );

    if (isFavorite) {
      if (movieIndex !== -1) {
        favoriteMovies[movieIndex].favorite = true;
      } else {
        favoriteMovies.push({ movieId, favorite: true });
      }
    } else {
      if (movieIndex !== -1) {
        favoriteMovies.splice(movieIndex, 1);
      }
    }

    // debugger;

    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    this.loadFavoriteMovies();
    this.loadMovies();
  }

  trimName(name: string): string {
    const words = name.split(' ');
    let trimmedName = '';

    for (const element of words) {
      const word = element;
      trimmedName += word.charAt(0).toUpperCase();
    }

    if (trimmedName.length > 4) return trimmedName.substring(0, 4);

    return trimmedName;
  }

  loadFavoriteMovies(): void {
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
    this.favoriteMovies = storedFavoriteMovies
      ? JSON.parse(storedFavoriteMovies)
      : [];
  }

  loadMovies(): void {
    this.movieService.getAll().subscribe((movies) => {
      movies.results.map((x) => (x.favorite = false));
      this.movies = movies.results.map((movie) => ({
        ...movie,
        favorite: this.isMovieFavorited(movie.id),
      }));
      
      if (this.filterValue) {
        this.movies = this.movies.filter((x) => x.favorite == this.filterValue);
      }
    });
  }

  isMovieFavorited(movieId: number): boolean {
    return this.favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.movieId === movieId
    );
  }
}
