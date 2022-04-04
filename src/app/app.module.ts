import { SecurityPipelineInterceptor } from './interceptors/security-pipeline.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingEventsComponent } from './components/meeting-events/meeting-events.component';
import { EncryptDecryptComponent } from './components/encrypt-decrypt/encrypt-decrypt.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingEventsComponent,
    EncryptDecryptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityPipelineInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
