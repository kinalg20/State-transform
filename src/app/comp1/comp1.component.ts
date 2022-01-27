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
  apidta: any[] = [];

  fetchhoteldestroy: any;
  fetchaminitydestroy:any;
  constructor(private store: Store) {
  }
  @Select(FetchcityState.getFetchedcity) hoteldata$!: Observable<any>;
  @Select(FetchcityState.cityLoaded) hoteldataloader$!: Observable<boolean>;
  @Select(FetchcityState.getAminity) aminity$!: Observable<any>;
  @Select(FetchcityState.aminityLoaded) aminityloader$!: Observable<boolean>;
  ngOnInit(): void {
    this.getdatafromapi();
    this. getaminity()
    this.hoteldata$.subscribe(res => {
      
    })
    this.aminity$.subscribe(res => {
      res?.responseCode?this.apidta=res.responseCode:this.apidta=[];
      console.log("this.apidta",this.apidta);
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
      this.fetchaminitydestroy=this.aminityloader$.subscribe(loadedapi=>{
      if (!loadedapi) {
        this.store.dispatch(new Getaminties());
      }
    })
  }

  ngOnDestroy(){
    this.fetchhoteldestroy.unsubscribe();
    this.fetchaminitydestroy.unsubscribe();
  }

}
