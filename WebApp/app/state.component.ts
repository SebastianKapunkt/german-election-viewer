import 'rxjs'

import { Component, OnInit } from '@angular/core'

import { Constituency, State } from './data.models'

import { StateService } from './state.service'
import { RegionService } from './region.service'

@Component({
    selector: "state-list",
    template: `
    <div> 
        <h1> States </h1>

        <div *ngFor="let state of allStates">
            <a (click)="getRegions(state.id)"> {{state.name}} </a>
        </div>
    </div>
    <br>
    <div *ngIf="constituencies">
        <h1> Regions </h1>
        <region-component [constituencies]="constituencies"> </region-component>
    </div>
    `
})

export class StateComponent implements OnInit {
    allStates: State[];
    constituencies: Constituency[];

    constructor(private stateService: StateService, private regionService: RegionService) {

    }

    ngOnInit() {
        this.stateService.getStates().then(result => this.allStates = result);
    }

    getRegions(id: number) {
        this.regionService.getConstituencies(id).then(result => this.constituencies = result);
    }
}