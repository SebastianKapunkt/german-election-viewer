import { Component, Input } from '@angular/core'

import { Constituency, ElectionResult } from './data.models'

import { RegionService } from './region.service'

@Component({
    selector: 'region-component',
    template: `
        <div>
            <input type="text">
            <div *ngFor="let constituency of constituencies">
                <a (click)="getElectorialResult(constituency)"> {{constituency.name}} </a>
            </div>
        </div>
        <div *ngIf="electionPartyResults && electionGeneralResults">
            <h1> Election Results: {{constituencyName}}</h1> 
            <election-result-graph [partyResults]="electionPartyResults" [generalResults]="electionGeneralResults" > </election-result-graph>
        </div>
    `
})

export class RegionComponent {
    electionPartyResults: ElectionResult[];
    electionGeneralResults: ElectionResult[];

    constructor(private regionService: RegionService) { }

    private constituencyName: string;

    @Input('constituencies') constituencies: Constituency[];

    
    getElectorialResult(constituency: Constituency) {
        this.constituencyName = constituency.name;
        
        this.regionService.getElectorialResultsForParty(constituency.id).then(result => this.electionPartyResults = result);
        this.regionService.getElectorialResultsForGeneral(constituency.id).then(result => this.electionGeneralResults = result);
    }
}