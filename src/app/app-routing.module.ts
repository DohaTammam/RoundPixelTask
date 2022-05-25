// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', component: SignupComponent 
  },
  {
    path: 'welcomeCom', component: WelcomeComponent
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
