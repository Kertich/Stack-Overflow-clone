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



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'userprofile', component: UserProfileComponent},
  { path: 'questionlist', component: QuestionListComponent},
  { path: 'questiondetail', component: QuestionDetailComponent},
  { path: 'question', component: AskQuestionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
