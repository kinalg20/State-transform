import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiServiceService } from "src/app/api-service.service";
import { Fetchcity, Getaminties } from "../actions/comp.action";
import { tap } from 'rxjs/operators'
export class FetchcityStateModel {
    cities: any;
    citiesLoaded!:boolean
}

export class AminityStateModel {
    aminities: any;
    aminityLoaded!:boolean
}

@State<FetchcityStateModel>({
    name: 'fetchcity',
    defaults: {
        cities: [],
        citiesLoaded:false
    }
})

@State<AminityStateModel>({
    name: 'getaminity',
    defaults: {
        aminities: [],
        aminityLoaded:false
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
    static getAminity(state: AminityStateModel) {
        return state.aminities;
    }

    @Selector()
    static aminityLoaded(state: AminityStateModel) {
        return state.aminityLoaded;
    }

    @Action(Fetchcity)
    getfetchedcities({ getState, setState }: StateContext<FetchcityStateModel>) {
        return this.apidata.gethoteldata().pipe(tap(res => {
            const state = getState();
            setState({
                ...state,
                cities:res,
                citiesLoaded:true
            })
            // console.log("state",state);
        }))
    }

    @Action(Getaminties)
    getaminities({ getState, setState }: StateContext<AminityStateModel>) {
        return this.apidata.getaminitydata().pipe(tap(res => {
            const aminity_state = getState();
            console.log("aminity_state",aminity_state);
            setState({
                ...aminity_state,
                aminities:res,
                aminityLoaded:true
            })
            console.log("aminity_state",aminity_state);
        }))

    }
}

// @Injectable()
// export class GetaminitesState {
//     //selector has logic
//     constructor(private apidata: ApiServiceService) { }
//     @Selector()
//     static getaminity(state: AminityStateModel) {
//         return state.aminities;
//     }

//     @Selector()
//     // static cityloaded(state: AminityStateModel) {
//     //     return state.aminityLoaded;
//     // }

//     @Action(Getaminties)
//     getaminity({ getState, setState }: StateContext<AminityStateModel>) {
//         console.log("Afmakdlfadmf")
//         // return this.apidata.getdata().pipe(tap(res => {
//         //     const state = getState();
//         //     setState({
//         //         ...state,
//         //         aminities:res,
//         //         aminityLoaded:true
//         //     })
//         //     console.log("state1",state);
//         // }))
//     }
// }