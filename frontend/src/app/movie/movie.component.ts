import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieInterface, MovieResolved } from './movieInterface';
import { UserService } from '../user/user.service';

@Component({
  selector: 'netflux-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movieTitle: MovieInterface;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  // type guard for movie resolved
  private isMovie(resolved: MovieInterface | any): resolved is MovieInterface {
    return true;
  }
  // TODO: fix addToFavorites function
  addToFavorites(title) {
    this.userService.addToFavourites(title);
    console.log(this.userService.loggedInUser.favourites);
  }

  ngOnInit() {

    // tslint:disable-next-line: no-string-literal
    const resolvedData: MovieResolved = this.route.snapshot.data['resolvedMovie'];
    (this.isMovie(resolvedData)) ? this.movieTitle = resolvedData[0] : console.log(resolvedData);

  }
}
