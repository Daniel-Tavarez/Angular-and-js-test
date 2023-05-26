import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  movie: Movie | undefined;
  changeState: boolean = false;
  emptyStar: string = 'assets/img/empty-star.png';
  star: string = 'assets/img/star.png';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  markMovieAsFavorite() {
    this.changeState = !this.changeState;
  }

  imageProcesser(img: string) {
    const prefix = 'https://image.tmdb.org/t/p/w500';
    return prefix + img;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      this.getMovieById(movieId);
    });
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

    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    this.getMovieById(movieId);
  }

  getMovieById(id: number): void {
    this.movieService.getById(id).subscribe((movie) => {
      this.movie = movie;
      const isFavorited = this.isMovieFavorited(movie.id);
      this.movie.favorite = isFavorited;
    });
  }

  isMovieFavorited(movieId: number): boolean {
    const favoritedMovies = JSON.parse(localStorage.getItem('favoriteMovies')!);
    return favoritedMovies.some(
      (favoriteMovie: any) => favoriteMovie.movieId === movieId
    );
  }
}
