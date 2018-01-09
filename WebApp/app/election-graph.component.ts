import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

import { ElectionResult } from './data.models'

@Component({
    selector: 'election-result-graph',
    template: `
        <div>
            <div style="display: block; width: 800px;">
                <canvas baseChart
                    [datasets]="generalChartData"
                    [labels]="generalLabels"
                    [chartType]="pieChartType"
                    (chartHover)="chartHovered($event)">
                </canvas>
            </div>

            <div style="display: block; width: 800px;">
            <canvas baseChart
                [datasets]="partyChartData"
                [labels]="partyLabels"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)">
            </canvas>
        </div>
        </div>
    `
})

export class ElectionGraphComponent implements OnChanges {
    @Input('electionResults') electionResults: ElectionResult[];

    constructor() { }
    generalLabels: string[] = [];
    partyLabels: string[] = [];

    generalDataFirstPeriod: number[] = [];
    generalDataSecondPeriod: number[] = [];

    partyDataFirstPeriod: number[] = [];
    partyDataSecondPeriod: number[] = [];
    
    generalChartData: any[] = [];
    partyChartData: any[] = [];


    pieChartType: string = 'bar';

    ngOnChanges(changes: SimpleChanges): void {
        this.resetDataSet();

        for (let i = 0; i < 4; i++) {
            this.generalDataFirstPeriod.push(this.electionResults[i].firstPeriodResults)
            this.generalDataSecondPeriod.push(this.electionResults[i].secondPeriodResults);

            this.generalLabels.push(this.electionResults[i].partyName);
        }

        this.generalChartData = [
            {data: this.generalDataFirstPeriod, label: 'Erst stimme'},
            {data: this.generalDataSecondPeriod, label: 'Zweit stimme'}
        ]

        for (let i = 4; i < 9; i++) {
            this.partyDataFirstPeriod.push(this.electionResults[i].firstPeriodResults);
            this.partyDataSecondPeriod.push(this.electionResults[i].secondPeriodResults);

            this.partyLabels.push(this.electionResults[i].partyName);
        }

        this.partyChartData = [
            {data: this.partyDataFirstPeriod, label: 'Erst stimme'},
            {data: this.partyDataSecondPeriod, label: 'Zweit stimme'}
        ]
    }

    resetDataSet() {
        this.generalDataFirstPeriod = [];
        this.generalDataSecondPeriod = [];

        this.generalLabels = [];

        this.partyDataFirstPeriod = [];
        this.partyDataSecondPeriod = [];

        this.partyLabels = [];
    }
}