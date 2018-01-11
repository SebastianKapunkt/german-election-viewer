import { Component, Input } from '@angular/core'

import { ElectionResult } from './data.models'

@Component({
    selector: 'election-list',
    styleUrls: ['css/main.css'],
    template: `
        <div> 
            <table class="election-table">
                <tr height="30">
                    <th> Patei Name </th>
                    <th> Erst Stimmen </th>
                    <th> Zweit Stimmen </th>
                </tr>
                <ng-container *ngFor="let result of electionList">
                    <tr>
                        <td> {{result.partyName}} </td>
                        <td> {{result.firstPeriodResults}} </td>
                        <td> {{result.secondPeriodResults}} </td>
                    </tr>
                </ng-container>
            </table>
        </div>
    `
})

export class ElectionListComponent {

    constructor() { }

    @Input('electionList') electionList: ElectionResult[];
}