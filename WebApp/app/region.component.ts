import { Component, Input } from '@angular/core'

import { Constituency, ElectionResult } from './data.models'

import { RegionService } from './region.service'

@Component({
    selector: 'region-component',
    template: `
        <input type="text">
        <div *ngFor="let constituency of constituencies">
            <a (click)="getElectorialResult(constituency)"> {{constituency.name}} </a>
        </div>

        <div *ngIf="electionResults">
            <h1> Election Results: {{constituencyName}}</h1> 
            <election-result-graph [electionResults]="electionResults"> </election-result-graph>
        </div>
    `
})

export class RegionComponent {
    electionResults: ElectionResult[];

    constructor(private regionService: RegionService) { }

    private constituencyName: string;

    @Input('constituencies') constituencies: Constituency[];

    getElectorialResult(constituency: Constituency) {
        this.constituencyName = constituency.name;
        this.regionService.getElectorialResults(constituency.id).then(result => this.electionResults = result);
    }
}