import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MyApisService } from 'src/app/services/my-apis.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
// import { sign } from 'crypto';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  countries: any[];
  subscription: any
  submitted = false;
  userIp: any;
  Country: string = '';

  constructor(private myApiService: MyApisService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl("", [Validators.pattern('[a-zA-Z]*'), Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])[\w\s]+(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl("", [Validators.minLength(8)]),
      ipAddress: new FormControl("", [Validators.required]),
      nationality: new FormControl("", [Validators.required])
    },
      {
        validators: this.MatchPassword('password', 'confirmPassword')
      }
    )

    this.subscription = this.myApiService.getCountries().subscribe((res) => {
      this.countries = res
    }, (error) => {
      console.log(error);
    });

    this.myApiService.getUserIp().subscribe((ip) => {
      this.userIp = ip;
      console.log("ip",this.userIp)
    }, (error) => {
      console.log(error);
    });

    this.myApiService.getGeoLocation(this.userIp.ip).subscribe(
      (data) => {
        console.log("dataaaaa", data);
        this.Country = data.Country;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get submitFormControls() {
    return this.signUpForm.controls;
  }

  submitReactiveForm() {
    this.submitted = true;
    console.log(this.signUpForm.value);

    //send userName value to service 
    this.dataService.shareUserName = this.submitFormControls.userName?.value;
    localStorage.setItem('userName', `${this.submitFormControls.userName?.value}`)
    this.router.navigate(['/welcomeCom']);

    // this.dataService.shareIpAddress = this.submitFormControls.ipAddress?.value;
    // localStorage.setItem('ipAddress', `${this.submitFormControls.ipAddress?.value}`)
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (signUpForm: FormGroup) => {
      const passwordControl = signUpForm.controls[password];
      const confirmPasswordControl = signUpForm.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  
}
