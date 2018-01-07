import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

import { ElectionResult } from './data.models'

@Component({
    selector: 'election-result-graph',
    template: `
        First
        <div style="display: block; width: 400px;">
            <canvas baseChart
                [data]="generalDataFirstPeriod"
                [labels]="generalLabels"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)">
            </canvas>
        </div>

        Second
        <div style="display: block; width: 400px;">
            <canvas baseChart
                [data]="generalDataSecondPeriod"
                [labels]="generalLabels"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)">
            </canvas>
        </div>

        First Pre
        <div style="display: block; width: 400px;">
            <canvas baseChart
                [data]="generalDataFirstPrePeriod"
                [labels]="generalLabels"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)">
            </canvas>
        </div>

        Second Pre
        <div style="display: block; width: 400px;">
            <canvas baseChart
                [data]="generalDataSecondPrePeriod"
                [labels]="generalLabels"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)">
            </canvas>
        </div>
    `
})

export class ElectionGraphComponent implements OnChanges {
    @Input('electionResults') electionResults: ElectionResult[];

    constructor() { }

    generalDataFirstPeriod: number[] = [];
    generalDataSecondPeriod: number[] = [];
    generalDataFirstPrePeriod: number[] = [];
    generalDataSecondPrePeriod: number[] = [];
    generalLabels: string[] = [];

    partyDataFirstPeriod: number[] = [];
    partyDataSecondPeriod: number[] = [];
    partyDataFirstPrePeriod: number[] = [];
    partyDataSecondPrePeriod: number[] = [];

    partyLabels: string[] = [];

    pieChartType: string = 'pie';

    ngOnChanges(changes: SimpleChanges): void {
        this.resetDataSet();

        for (let i = 0; i < 4; i++) {
            this.generalDataFirstPeriod.push(this.electionResults[i].firstPeriodResults)
            this.generalDataSecondPeriod.push(this.electionResults[i].secondPeriodResults);
            this.generalDataFirstPrePeriod.push(this.electionResults[i].firstPrePeriodResults);
            this.generalDataSecondPrePeriod.push(this.electionResults[i].secondPrePeriodResults);

            this.generalLabels.push(this.electionResults[i].partyName);
        }

        for (let i = 4; i < this.electionResults.length; i++) {
            this.partyDataFirstPeriod.push(this.electionResults[i].firstPeriodResults);
            this.partyDataSecondPeriod.push(this.electionResults[i].secondPeriodResults);
            this.partyDataFirstPrePeriod.push(this.electionResults[i].firstPrePeriodResults);
            this.partyDataSecondPrePeriod.push(this.electionResults[i].secondPrePeriodResults);

            this.partyLabels.push(this.electionResults[i].partyName);
        }
    }

    resetDataSet() {
        this.generalDataFirstPeriod = [];
        this.generalDataFirstPrePeriod = [];
        this.generalDataSecondPeriod = [];
        this.generalDataSecondPrePeriod = [];

        this.generalLabels = [];

        this.partyDataFirstPeriod = [];
        this.partyDataFirstPrePeriod = [];
        this.partyDataSecondPeriod = [];
        this.partyDataSecondPrePeriod = [];

        this.partyLabels = [];
    }
}