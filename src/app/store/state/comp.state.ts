import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiServiceService } from "src/app/api-service.service";
import { Fetchcity, Getaminties } from "../actions/comp.action";
import { tap } from 'rxjs/operators'
export class FetchcityStateModel {
    cities: any;
    citiesLoaded!: boolean
}

export class AminityStateModel {
    aminities: any;
    aminityLoaded!: boolean
}

@State<FetchcityStateModel>({
    name: 'fetchcity',
    defaults: {
        cities: [],
        citiesLoaded: false
    }
})

@State<AminityStateModel>({
    name: 'getaminity',
    defaults: {
        aminities: [],
        aminityLoaded: false
    }
})

@Injectable()
export class FetchcityState {
    //selector has logic
    constructor(private apidata: ApiServiceService) { }
    @Selector()
    static getFetchedcity(state: FetchcityStateModel) {
        return state.cities;
    }

    @Selector()
    static cityLoaded(state: FetchcityStateModel) {
        return state.citiesLoaded;
    }

    @Selector()
    static getAminity(aminitystate: AminityStateModel) {
        return aminitystate.aminities;
    }

    @Selector()
    static aminityLoaded(aminitystate: AminityStateModel) {
        return aminitystate.aminityLoaded;
    }

    @Action(Fetchcity)
    getfetchedcities({ getState, setState }: StateContext<FetchcityStateModel>) {
        return this.apidata.gethoteldata().pipe(tap(res => {
            const state = getState();
            setState({
                ...state,
                cities: res,
                citiesLoaded: true
            });
        }))
    }

    @Action(Getaminties)
    getaminities({ getState, setState }: StateContext<AminityStateModel>) {
        return this.apidata.getaminitydata().pipe(tap(res => {
            const aminitystate = getState();
            setState({
                ...aminitystate,
                aminities: res,
                aminityLoaded: true
            });
        }))
    }
}