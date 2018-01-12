import 'rxjs'

import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import { Constituency, ElectionResult } from './data.models'

@Injectable()
export class RegionService {
    private statesUrl = '/api/states'
    private regionsUrl = '/api/constituency'

    constructor(private http: Http) { }

    getConstituencies(stateId: number): Promise<Constituency[]> {
        return this.http.get(`${this.statesUrl}/${stateId}/constituencies`, { headers: this.jwt() })
            .toPromise()
            .then(response => response.json().data)
            .catch((error) => console.log('no regions: ', error))
    }

    getElectorialResultsForGeneral(constituencyId: number): Promise<ElectionResult[]> {
        return this.http.get(`${this.regionsUrl}/${constituencyId}/general_election_results`, { headers: this.jwt()})
            .toPromise()
            .then(response => response.json().data)
            .catch((error) => console.log('error getting electorial general results: ', error));
    }

    getElectorialResultsForParty(constituencyId: number): Promise<ElectionResult[]> {
        return this.http.get(`${this.regionsUrl}/${constituencyId}/party_election_results`, { headers: this.jwt() })
            .toPromise()
            .then(response => response.json().data)
            .catch((error) => console.log('error getting electorial results: ', error));
    }

    private jwt() {
        return new Headers(
            { 'Content-Type': 'application/json' }
        )
    }
}