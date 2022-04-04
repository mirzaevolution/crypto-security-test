import { EncryptDecryptComponent } from './components/encrypt-decrypt/encrypt-decrypt.component';
import { AppComponent } from './app.component';
import { MeetingEventsComponent } from './components/meeting-events/meeting-events.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'encrypt-decrypt',
    component: EncryptDecryptComponent,
    pathMatch:'full'
  },
  {
    path:'meeting-events',
    component: MeetingEventsComponent
  },
  {
    path: '', redirectTo: '/encrypt-decrypt', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/encrypt-decrypt', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
