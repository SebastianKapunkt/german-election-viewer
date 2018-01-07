import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './routing.module'
import { ChartsModule } from 'ng2-charts'

/** Components */
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component'
import { StateComponent } from './state.component'
import { RegionComponent } from './region.component'
import { ElectionGraphComponent } from './election-graph.component'

/** Services */
import { StateService } from './state.service'
import { RegionService } from './region.service'

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, StateComponent, RegionComponent, ElectionGraphComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule, ChartsModule
  ],
  providers: [
    RegionService, StateService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
