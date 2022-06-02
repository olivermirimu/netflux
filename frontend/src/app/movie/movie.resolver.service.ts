import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { MovieInterface, MovieResolved } from './movieInterface';
import { Observable, of } from 'rxjs';
import { MovieService } from './movie.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MovieResolver {
  // implements Resolve<MovieResolved>
  constructor(private movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieResolved> {
    const title = route.paramMap.get('title');
    return this.movieService.getMovie(title).pipe(catchError(err => of(err)));
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieResolved> {
  //   const title = route.paramMap.get('title');
  //   console.log(title);
  //   return this.movieService.getMovie(title)
  //     .pipe(map((movie: MovieInterface) => { movie: movie; })),
  //       catchError(err => {
  //         console.log(err);
  //         return of({ movie: null, error: err });
  //       })
  //     );
  // }
}
