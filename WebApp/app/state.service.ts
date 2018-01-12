import 'rxjs'

import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import { State } from './data.models'

@Injectable()
export class StateService {
    private statesUrl: string = "/api/states";

    constructor(private http: Http) { }

    getStates(): Promise<State[]> {
        return this.http.get(this.statesUrl, { headers: this.jwt() })
            .toPromise()
            .then(response => response.json().data)
            .catch((error) => console.log('no states: ', error));
    }

    private jwt() {
        return new Headers(
            { 'Content-Type': 'application/json' }
        )
    }
}