import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service'
@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  apidta: any = [];
  constructor(private apidata: ApiServiceService) {
    this.getdatafromapi()
  }


  ngOnInit(): void {
  }

  getdatafromapi() {
    this.apidata.getdata().subscribe(res =>

      this.apidta.push(res)
    )
      
  }

}
