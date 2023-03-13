import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { QuestionListComponent } from './components/question-list/question-list.component'
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { AuthGuard } from './services/auth-guard.service';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'questionlist', component: QuestionListComponent, canActivate: [AuthGuard]},
  { path: 'questiondetail', component: QuestionDetailComponent, canActivate: [AuthGuard]},
  { path: 'question', component: AskQuestionComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
