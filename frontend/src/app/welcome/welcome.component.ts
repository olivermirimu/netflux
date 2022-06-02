import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'netflux-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  coverImages = {
    head: '/assets/welcome.jpg',
    drama: '/assets/infinityWarC.jpg',
    comedy: '/assets/farFromHomeC1.jpg',
    action: '/assets/farFromHomeC.jpg',
    niche1: '/assets/mobility.png',
    niche2: '/assets/synchronized.jpg',
    niche3: '/assets/affordable.jpg',
    boilerplate: '/assets/random.png'
  };
  niches = [
    { name: 'Mobile', text: 'Watch On The Go', image: this.coverImages.niche1 },
    { name: 'Syncing', text: 'Cross Device Sync', image: this.coverImages.niche2 },
    { name: 'Affordable', text: 'Dont Hurt Your Pockets', image: this.coverImages.niche3 }
  ];
  ngOnInit() {
  }

}
