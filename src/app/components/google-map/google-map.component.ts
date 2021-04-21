import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 9.125536224822316, lng: 99.33487485690628 };
  display: google.maps.LatLngLiteral = { lat: 9.125536224822316, lng: 99.33487485690628 };
  zoom = 4;

  constructor() { }

  ngOnInit(): void {
  }
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  // tslint:disable-next-line:typedef
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

}
