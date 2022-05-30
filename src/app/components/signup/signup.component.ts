import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyApisService } from 'src/app/services/my-apis.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { forbiddenNameValidator } from 'src/app/shared/forbidden-name.directive';
import { Countries } from 'src/app/countryInterface';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  countries: Array<Countries> = [];
  subscription: any;
  submitted = false;
  userIp: string;
  Country: any; //Default Country
  homeworld: Observable<any>;


  constructor(private myApiService: MyApisService,
    private router: Router,
    private dataService: DataService,
    private customValidator: CustomvalidationService) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      userName: new FormControl("",
        [Validators.required,
        forbiddenNameValidator(/[\u0600-\u06FF]/),
        Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl("",
        [Validators.email, Validators.required]),
      password: new FormControl("",
        [Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        forbiddenNameValidator(/[\u0600-\u06FF]/)
        ]),
      confirmPassword: new FormControl("",
        [Validators.required]),
      nationality: new FormControl("",
        [Validators.required])
    },
      {
        validators: this.customValidator.MatchPassword('password', 'confirmPassword')
      }
    )

    //get countries data from Api Service
    // this.subscription = this.myApiService.getCountries().subscribe((res) => {
    //   this.countries = res
    // }, (error) => {
    //   console.log(error);
    // });

    // this.subscription = this.myApiService.getUserIp().subscribe((ip) => {
    //   this.userIp = ip.ip;
    //   this.dataService.shareIpAddress = this.userIp;
    //   localStorage.setItem('ipAddress', `${this.userIp}`)
    // }, (error) => {
    //   console.log(error);
    // });

    // this.subscription = this.myApiService.getGeoLocation(this.dataService.shareIpAddress).subscribe(
    //   (data) => {
    //     // console.log("ip---->?????",this.dataService.shareIpAddress)
    //     // console.log("dataaaaa", data.country_name);
    //     this.Country = data.country_name; 
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.subscription = this.myApiService.getCountries().pipe(mergeMap((res) => {
      this.countries = res;             //get Countries data from service
      // console.log("resssssssss", res)
      return this.myApiService.getUserIp().pipe(mergeMap((userip) => {       //get userIp from service
        // console.log("ipppppppps", userip.ip)
        return this.myApiService.getGeoLocation(userip.ip).pipe(mergeMap((defaultCountry) => {
          this.Country = defaultCountry.country_name;           //set default country based on User Ip
          // console.log("dataaaaa", defaultCountry.country_name);
          return defaultCountry;
        }))
      }))
    })).subscribe((data) => {
      console.log("finaaaaaaaaaaal", data)
    }, (error) => {
      console.log("error", error)
    });

  }

  get submitFormControls() {
    return this.signUpForm.controls; //get  Form Values
  }
  submitReactiveForm() {
    this.submitted = true;

    //send userName value to service 
    this.dataService.shareUserName = this.submitFormControls.userName?.value;
    localStorage.setItem('userName', `${this.submitFormControls.userName?.value}`)

    //check if form is valid then open the Welcome Page 
    if (this.checkSubmmittedData()) {
      this.router.navigate(['/welcomeCom']);
      this.signUpForm.reset();
    }
    else {
      window.alert("You Can't Access This Page Until you Complete Your Information ^_^")
    }
  }

  //if all inputs field are vaild then return true to activate the Auth Guard
  checkSubmmittedData(): boolean {
    if (this.signUpForm.valid) {
      return this.dataService.isSignedUp = true;
    }
    return this.dataService.isSignedUp = false;
  }

  logIn(): void {
    this.router.navigate(['/signIn']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
