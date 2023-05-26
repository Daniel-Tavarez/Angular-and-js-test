import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieResponse } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  movies: MovieResponse = {} as MovieResponse;
  movieToShow: MovieResponse = {} as MovieResponse;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
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
    this.movieToShow.results = this.movies.results.filter(
      (x) => x.favorite == this.filterValue
    );
  }

  markMovieAsFavorite(movieId: number): void {
    this.movieToShow.results = this.movieToShow.results.map((movie: Movie) => {
      if (movie.id === movieId) {
        return { ...movie, favorite: !movie.favorite };
      }
      return movie;
    });
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

  loadMovies(): void {
    this.movieService.getAll().subscribe((movies) => {
      this.movies = movies;
      this.movieToShow = movies;
      this.movies.results.map((x) => (x.favorite = false));
      console.log(this.movies);
    });
  }
}
