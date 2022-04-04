import { PingService } from './../../services/ping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  getResponse: string = 'No request being made....';
  postResponse: string = 'No request being made....';


  constructor(private _pingService: PingService) { }

  ngOnInit(): void {

  }

  getRequest(): void{
    this._pingService.get().subscribe(c => {
      this.getResponse = JSON.stringify(c);
    });
  }

  postRequest(): void{
    this._pingService.post({
      Message: `Hello from Angular @${new Date().toISOString()}`
    }).subscribe(c => {
      this.postResponse = JSON.stringify(c);
    })
  }

}
