import { Component, Input } from '@angular/core'

import { ElectionResult } from './data.models'

@Component({
    selector: 'election-list',
    template: `
        <div> 
            <table style="border: 1px solid black;">
                <tr>
                    <th> Patei Name </th>
                    <th> Erst Stimmen </th>
                    <th> Zweit Stimmen </th>
                </tr>
                <td>
                    <ng-container *ngFor="let result of electionList">
                        <tr> {{result.partyName}} </tr>
                    </ng-container>
                </td>
                <td>
                    <ng-container *ngFor="let result of electionList">
                        <tr> {{result.firstPeriodResults}} </tr>
                    </ng-container>
                </td>
                <td>
                    <ng-container *ngFor="let result of electionList">
                        <tr> {{result.secondPeriodResults}} </tr>
                    </ng-container>
                </td>
            </table>
        </div>
    `,

    styles: [` 
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: auto;
        }
        
        td, th {
            font-size: 12px;
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    }`]
})

export class ElectionListComponent {

    constructor() { }

    @Input('electionList') electionList: ElectionResult[];
}