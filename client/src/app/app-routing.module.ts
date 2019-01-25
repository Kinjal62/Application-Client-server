import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MywallComponent } from './mywall/mywall.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ConnectionComponent } from './connection/connection.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
{ path: 'mywall', component: MywallComponent },
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'feeds', component: FeedsComponent},
{ path: 'connection', component: ConnectionComponent},
{ path: 'chat', component: ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
