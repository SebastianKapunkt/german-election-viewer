import { Component, Input } from '@angular/core'

import { StateService } from './state.service'
import { RegionService } from './region.service'

@Component({
    selector: 'election-graph',
    template: `

    `
})

export class ElectionGraphComponent {
    constructor(private stateService: StateService, private regionService: RegionService) { }

    
} 