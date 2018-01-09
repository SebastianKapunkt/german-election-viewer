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
                    [chartType]="chartTypeBar"
                    (chartHover)="chartHovered($event)">
                </canvas>
            </div>

            <div style="display: block; width: 800px;">
                <canvas baseChart
                    [datasets]="partyChartData"
                    [labels]="partyLabels"
                    [chartType]="chartTypeBar"
                    (chartHover)="chartHovered($event)">
                </canvas>
            </div>
        </div>
    `
})

export class ElectionGraphComponent implements OnChanges {
    @Input('generalResults') generalResults: ElectionResult[];
    @Input('partyResults') partyResults: ElectionResult[];

    constructor() { }
    generalLabels: string[] = [];
    partyLabels: string[] = [];

    generalDataFirstPeriod: number[] = [];
    generalDataSecondPeriod: number[] = [];

    partyDataFirstPeriod: number[] = [];
    partyDataSecondPeriod: number[] = [];
    
    generalChartData: any[] = [];
    partyChartData: any[] = [];

    chartTypeBar: string = 'bar';
    chartTypePie: string = 'pie';

    ngOnChanges(changes: SimpleChanges): void {
        this.resetDataSet();

        for (let i = 0; i < this.generalResults.length; i++) {
            this.generalDataFirstPeriod.push(this.generalResults[i].firstPeriodResults)
            this.generalDataSecondPeriod.push(this.generalResults[i].secondPeriodResults);

            this.generalLabels.push(this.generalResults[i].partyName);
        }

        this.generalChartData = [
            {data: this.generalDataFirstPeriod, label: 'Erst stimme'},
            {data: this.generalDataSecondPeriod, label: 'Zweit stimme'}
        ]

        for (let i = 0; i < 5; i++) {
            this.partyDataFirstPeriod.push(this.partyResults[i].firstPeriodResults);
            this.partyDataSecondPeriod.push(this.partyResults[i].secondPeriodResults);

            this.partyLabels.push(this.partyResults[i].partyName);
        }

        this.partyChartData = [
            {data: this.partyDataFirstPeriod, label: 'Erst Stimme'},
            {data: this.partyDataSecondPeriod, label: 'Zweit Stimme'}
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
