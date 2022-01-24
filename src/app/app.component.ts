import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  showcom1: boolean = false;
  showcom2: boolean = false;
  showcomp1() {
    this.showcom1 = true;
    this.showcom2 = false;
  }
  showcomp2() {
    this.showcom1 = false;
    this.showcom2 = true;
  }
}
