import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'

import { ElectionResult } from './data.models'

import { BaseChartDirective } from 'ng2-charts'

@Component({
    selector: 'election-result-graph',
    styleUrls: ['css/main.css'],
    template: `
        <div>
            <div>
                <div class="title"> {{title}} </div>
                <div class="header-row">
                    
                </div>
                <canvas style="width: 100%" baseChart
                    [datasets]="chartData"
                    [labels]="chartLabels"
                    [chartType]="chartTyp"
                    [options]="chartOptions"
                    (chartHover)="chartHovered($event)"
                    (chartClick)="chartClicked($event)">
                </canvas>
            </div>
        </div>
    `
})

export class ElectionGraphComponent implements OnChanges {
    @Input('results') results: ElectionResult[];
    @Input('title') title: string;
    @Input('displayXTitles') displayXTitles: boolean;

    @ViewChild(BaseChartDirective) chartWidget: any;

    constructor() { }

    chartLabels: string[] = [];

    firstVote: number[] = [];
    secondVote: number[] = [];

    chartOptions = {
    };

    chartData: any[] = [];

    chartTyp: string = 'bar';

    ngOnChanges(changes: SimpleChanges) {

        this.resetDataSet();

        this.chartOptions = {
            scales: {
                responsive: true,
                xAxes: [{
                    ticks: {
                        display: this.displayXTitles
                    }
                }]
            }
         }
        setTimeout(() => {
            this.chartWidget.refresh();
        }, 0)

        if (this.results.length > 4) {
            this.iterateXElems(5);
        } else {
            this.iterateXElems(this.results.length);
        }

        this.chartData = [
            { data: this.firstVote, label: 'Erst stimme' },
            { data: this.secondVote, label: 'Zweit stimme' }
        ];
    }

    iterateXElems(numOfElemes: number) {
        for (let i = 0; i < numOfElemes; i++) {
            this.firstVote.push(this.results[i].firstPeriodResults)
            this.secondVote.push(this.results[i].secondPeriodResults);

            this.chartLabels.push(this.results[i].partyName);
        }
    }

    resetDataSet() {
        this.firstVote = [];
        this.secondVote = [];

        this.chartLabels = [];
    }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }
}
