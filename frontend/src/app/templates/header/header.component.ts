import { Component, OnInit } from '@angular/core';
import { IndexComponent } from '../../views/index/index.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private index:IndexComponent) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.index.onLogout();
  }

}
