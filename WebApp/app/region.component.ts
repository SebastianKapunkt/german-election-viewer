import { Component, Input, OnChanges } from '@angular/core'

import { Constituency, ElectionResult } from './data.models'

import { RegionService } from './region.service'
import { FilterPipe } from './filter-pipe.component'

@Component({
    selector: 'region-component',
    styleUrls: ['css/main.css'],
    template: `
    <div class="flex-row">
        <div>
            <div class="title">{{state_name}} </div>
            <div class="header-row">
                <input type="text" [(ngModel)]="term" placeholder="Search region ..">
            </div>
            <div class="box">
                <div *ngFor="let constituency of constituencies | FilterPipe: term">
                    <a (click)="getElectorialResult(constituency)"><div> {{constituency.name}} </div></a>
                </div>
            </div>
        </div>
        <div>
            <div *ngIf="electionPartyResults" style="max-width: 400px;">
                <div class="title">{{constituencyName}}</div>
                <election-list [electionList]="electionPartyResults" > </election-list>
            </div>
        </div>
        <div *ngIf="electionPartyResults && electionGeneralResults" style="flex-grow: 1;">
            <election-result-graph [displayXTitles]="true" [results]="electionGeneralResults" [title]="'Wahlberechtige'" > </election-result-graph>
            <election-result-graph [displayXTitles]="false" [results]="electionPartyResults" [title]="'5 Partein mit den meisten Stimmen'" > </election-result-graph>
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
    @Input('state_name') state_name: string;
    
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