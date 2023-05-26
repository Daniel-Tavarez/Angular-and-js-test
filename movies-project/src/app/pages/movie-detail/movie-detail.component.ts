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

  getMovieById(id: number): void {
    this.movieService.getById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }
}
