import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/** Components */
import { AppComponent } from './app.component';
import { ElectionGraphComponent } from './election-graph.component'
import { ElectoralDistrictComponent } from './electoral-district.component'

/** Services */
import { StateService } from './state.service'
import { RegionService } from './region.service'

@NgModule({
  declarations: [
    AppComponent, ElectionGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RegionService, StateService],
  bootstrap: [AppComponent]
})

export class AppModule { }
