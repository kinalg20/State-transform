import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Fetchcity, Getaminties } from '../store/actions/comp.action';
import { FetchcityState } from '../store/state/comp.state';
@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  hoteldata: any[] = [];
  aminitydata: any[] = [];

  fetchhoteldestroy: any;
  fetchaminitydestroy: any;
  constructor(private store: Store) {
  }
  @Select(FetchcityState.getFetchedcity) hoteldata$!: Observable<any>;
  @Select(FetchcityState.cityLoaded) hoteldataloader$!: Observable<boolean>;
  @Select(FetchcityState.getAminity) aminitydata$!: Observable<any>;
  @Select(FetchcityState.aminityLoaded) aminityloader$!: Observable<boolean>;
  ngOnInit(): void {
    this.getdatafromapi();
    this.getaminity()
    this.hoteldata$.subscribe(res => {
      res?.data ? this.hoteldata = res.data : this.hoteldata = [];
      console.log("this.hoteldata", this.hoteldata);
    })
    this.aminitydata$.subscribe(res => {
      res?.data ? this.aminitydata = res.data : this.aminitydata = [];
      console.log("this.aminitydata", this.aminitydata);
    })
  }


  getdatafromapi() {
    this.fetchhoteldestroy = this.hoteldataloader$.subscribe(loadedapi => {
      if (!loadedapi) {
        this.store.dispatch(new Fetchcity());
      }
    })
  }

  getaminity() {
    this.fetchaminitydestroy = this.aminityloader$.subscribe(loadapi => {
      if (!loadapi) {
        this.store.dispatch(new Getaminties());
      }
    })
  }

  ngOnDestroy() {
    this.fetchhoteldestroy.unsubscribe();
    this.fetchaminitydestroy.unsubscribe();
  }
}
