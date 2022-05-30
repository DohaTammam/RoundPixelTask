import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error-page-not-found',
  templateUrl: './error-page-not-found.component.html',
  styleUrls: ['./error-page-not-found.component.css']
})
export class ErrorPageNotFoundComponent implements OnInit {

  error404Image : string = "././assets/404Error.png";
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  backToHome():void{
    this.router.navigate(['/']);
  }
}
