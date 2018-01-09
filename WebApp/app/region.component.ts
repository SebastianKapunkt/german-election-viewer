import { Component, Input, OnChanges } from '@angular/core'

import { Constituency, ElectionResult } from './data.models'

import { RegionService } from './region.service'
import { FilterPipe } from './filter-pipe.component'

@Component({
    selector: 'region-component',
    template: `
        <div>
            <input type="text" [(ngModel)]="term" placeholder="Search region ..">
            <div *ngFor="let constituency of constituencies | FilterPipe: term">
                <a (click)="getElectorialResult(constituency)"> {{constituency.name}} </a>
            </div>
        </div>
        
        <div>
            <div *ngIf="electionPartyResults">
                <election-list [electionList]="electionPartyResults" > </election-list>
            </div>
        </div>

        <div>
            <div *ngIf="electionPartyResults && electionGeneralResults">
                <h1> Election Results: {{constituencyName}}</h1> 
                <election-result-graph [partyResults]="electionPartyResults" [generalResults]="electionGeneralResults" > </election-result-graph>
            </div>
        </div>
    `
})

export class RegionComponent implements OnChanges {
    electionPartyResults: ElectionResult[];
    electionGeneralResults: ElectionResult[];
    term: string;

    constructor(private regionService: RegionService) { }

    @Input('constituencies') constituencies: Constituency[];
    
    private constituencyName: string;

    ngOnChanges() {       
        this.term = ''
        this.electionGeneralResults = null;
        this.electionPartyResults = null;
    }

    getElectorialResult(constituency: Constituency) {
        this.constituencyName = constituency.name;
        
        this.regionService.getElectorialResultsForParty(constituency.id).then(result => this.electionPartyResults = result);
        this.regionService.getElectorialResultsForGeneral(constituency.id).then(result => this.electionGeneralResults = result);
    }
}