import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  formValue!: FormGroup;
  carsData!: any;
  featuresData!: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    // this.formValue = this.formBuilder.group({});
    this.getAllData();
  }
  getAllData() {
    this.api.getCar().subscribe((res) => {
      this.carsData = res;
      this.featuresData = res.feature;
    });
  }
  deleteCar(row: any) {
    this.api.deleteCar(row.id).subscribe((res) => {
      alert('მანქანა წაიშალა!');
      console.log('asd');
      this.getAllData();
    });
  }
  onSelect(row: any) {
    this.router.navigate(['/edit', row.id]);
  }
}
