import { MovieService } from '../../../app/services/movie.service';
import { Movie } from '../../../app/models/movie';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  movies: Observable<Movie[]>;
  movie: Movie = new Movie();
  moviesList: any;
  isSaved = false;
  submitted = false;
 

  /**
   * init table and loading all movies
   */
  ngOnInit(): void {
    this.isSaved = false;
    this.submitted=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.movieService.getMovieList().subscribe(data => {
      this.movies = data;
      this.dtTrigger.next();
    })
  }


  searchStudent(searchMovie:Movie){
    this.movie=new Movie();   
    this.movie.title=this.MovieTitle.value;
    this.movie.year=this.MovieYear.value;
    this.submitted = true;
    this.save();
  }

  

  save() {
    this.movieService.searchMovie(this.movie)
      .subscribe(data => console.log(data), error => console.log(error));
    this.movie = new Movie();
  }
  /** 
   * selectMovie to show its detail in the pop-up
   * selectMovie
   * @param id 
   */
  selectMovie(id: number) {
    this.movieService.getMovie(id)
      .subscribe(
      data => {
        this.moviesList = data
      },
      error => console.log(error));
  }

  movieSaveform = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    movieType: new FormControl(),
    year: new FormControl(),
    plot: new FormControl()
  });

  /**
   * saveMovie from pop-up
   * @param movieToSave 
   */
  saveMovie(movieToSave: Movie) {
    this.movie = new Movie();
    this.movie.id = this.MovieId.value;
    this.movie.title = this.MovieTitle.value;
    this.movie.movieType = this.MovieType.value;
    this.movie.year = this.MoviePlot.value;
    this.movie.plot = this.MovieYear.value;


    this.movieService.createMovie(this.movie).subscribe(
      data => {
        this.isSaved = true;
        this.movieService.getMovieList().subscribe(data => {
          this.moviesList = data
        })
      },
      error => console.log(error));
  }

  /**
   * retreive the id
   */
  get MovieId() {
    return this.movieSaveform.get('id');
  }

  /**
   * retreive the title
   */
  get MovieTitle() {
    return this.movieSaveform.get('title');
  }

  /**
   * retreive the movieType
   */
  get MovieType() {
    return this.movieSaveform.get('movieType');
  }

  /**
   * retreive the plot
   */
  get MoviePlot() {
    return this.movieSaveform.get('plot');
  }

  /**
   * retreive the year
   */
  get MovieYear() {
    return this.movieSaveform.get('year');
  }

  /**
   * update flag after closing pop-up
   */
  updateFlag() {
    this.isSaved = false;
  }
}
