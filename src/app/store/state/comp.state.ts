import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiServiceService } from "src/app/api-service.service";
import { Fetchcity } from "../actions/comp.action";
import { tap } from 'rxjs/operators'
export class FetchcityStateModel {
    cities: any;
    citiesLoaded!:boolean
}

@State<FetchcityStateModel>({
    name: 'fetchcity',
    defaults: {
        cities: [],
        citiesLoaded:false
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
    static cityloaded(state: FetchcityStateModel) {
        return state.citiesLoaded;
    }

    @Action(Fetchcity)
    getfetchedcities({ getState, setState }: StateContext<FetchcityStateModel>) {
        return this.apidata.getdata().pipe(tap(res => {
            const state = getState();
            setState({
                ...state,
                cities:res,
                citiesLoaded:true
            })
            console.log("state",state);
        }))
    }
}