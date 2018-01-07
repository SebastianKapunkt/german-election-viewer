import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

import 'rxjs'

@Injectable()
export class StateService {
    constructor(private http: Http, private router: Router) { }

    getStates() {
        return this.http.get("/api/states/").map(res => res.json());
    }

    getRegions(id: number) {
        return this.http.get("/api/states/${id}/regions").map(res => res.json());
    }
}