import 'rxjs'

import { Component, OnInit } from '@angular/core'

import { Constituency, State } from './data.models'

import { StateService } from './state.service'
import { RegionService } from './region.service'

@Component({
    selector: "state-list",
    styleUrls: ['css/main.css'],
    template: `
    <div class="flex-row">
        <div> 
            <div class="title">States</div>
            <div class="header-row"></div>
            <div class="box">
                <div *ngFor="let state of allStates">
                    <a (click)="getRegions(state)"><div> {{state.name}} </div></a>
                </div>
            </div>
        </div>
        <ng-container *ngIf="constituencies">
            <region-component [constituencies]="constituencies" [state_name]="state_name"> </region-component>
        </ng-container>
    </div>
    `
})

export class StateComponent implements OnInit {
    allStates: State[];
    constituencies: Constituency[];
    state_name: string;

    constructor(private stateService: StateService, private regionService: RegionService) {

    }

    ngOnInit() {
        this.stateService.getStates().then(result => this.allStates = result);
    }

    getRegions(state: State) {
        this.regionService.getConstituencies(state.id).then(result => this.constituencies = result);
        this.state_name = state.name;
    }
}