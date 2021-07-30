import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettlementFeedComponent } from './components/settlement-feed/settlement-feed.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    SettlementFeedComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
