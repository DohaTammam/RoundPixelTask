// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageNotFoundComponent } from './components/error-page-not-found/error-page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SigninComponent } from './components/signin/signin.component';


const routes: Routes = [
  { 
    path:'', component: SignupComponent ,
  },
  {
    path: 'welcomeCom', component: WelcomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'',redirectTo:'/signUpCom', pathMatch:'full'
  },
  {
    path:'signIn', component:SigninComponent
  },
  { path: '**', component: ErrorPageNotFoundComponent  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
