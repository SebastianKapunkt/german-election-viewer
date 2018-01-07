import { Component, Input, Output } from '@angular/core'
import { Region } from './region.model'
import { RegionService } from './region.service'
import { StateService } from './state.service'

@Component({
    selector: 'electoral-district',
    template: `
    <div *ngFor="let region of regions">
        <table>
            <tr>
                <th> {{  }}</th>
            </tr>
        </table>
    </div>  
    `
})

export class ElectoralDistrictComponent {
    @Input('id') id: number
    Regions: Region[] = [];

    constructor() { }
}