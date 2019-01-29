import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MywallComponent } from './mywall/mywall.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ConnectionComponent } from './connection/connection.component';
import { ChatComponent } from './chat/chat.component';
import { AllpostComponent } from './allpost/allpost.component';
import { AddpostComponent } from './addpost/addpost.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
{ path: 'mywall', component: MywallComponent },
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'feeds', component: FeedsComponent},
{ path: 'connection', component: ConnectionComponent},
{ path: 'chat', component: ChatComponent},
{ path: 'allpost', component: AllpostComponent},
{ path: 'addpost', component: AddpostComponent},
{ path: 'search', component: SearchComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
