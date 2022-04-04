import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-events',
  templateUrl: './meeting-events.component.html',
  styleUrls: ['./meeting-events.component.css']
})
export class MeetingEventsComponent implements OnInit {

  getResponse: string = 'No request being made....';
  postResponse: string = 'No request being made....';


  constructor() { }

  ngOnInit(): void {

  }

}
