import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../models/trip-interface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // Stashing the trip code in the browser's local storage for the edit component to 
  // retrieve later
  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }
}
