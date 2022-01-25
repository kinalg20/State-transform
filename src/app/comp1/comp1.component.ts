import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Fetchcity } from '../store/actions/comp.action';
import { FetchcityState } from '../store/state/comp.state';
@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  apidta: any[] = [];
  fetchdatadestroy: any;
  constructor(private store: Store) {
  }
  @Select(FetchcityState.getFetchedcity) apidta$!: Observable<any>;
  @Select(FetchcityState.cityloaded) apiloaded$!: Observable<boolean>;
  ngOnInit(): void {
    this.getdatafromapi();
    this.apidta$.subscribe(res => {
      console.log("data fomr state:", res)
    })
  }
  

  getdatafromapi() {
    this.fetchdatadestroy = this.apiloaded$.subscribe(loadedapi => {
      console.log(loadedapi)
      if (!loadedapi) {
        console.log("Hii all")
        this.store.dispatch(new Fetchcity());
      }
    })
  }

  ngOnDestroy(){
    this.fetchdatadestroy.unsubscribe()
  }

}
