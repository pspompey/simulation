import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettlementFeedComponent } from './components/settlement-feed/settlement-feed.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
