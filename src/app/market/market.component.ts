import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  productos = [
    {
      name: 'Mangos',
      price: 59,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 39,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
