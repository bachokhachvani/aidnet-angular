import { Component, OnInit } from '@angular/core';
import { Cars } from '../shared/cars.model';
import { Features } from '../shared/features.model';
import { Form } from '../shared/form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  cars: Cars[] = [
    new Cars(1, 'BMW'),
    new Cars(2, 'AUDI'),
    new Cars(3, 'Mercedes'),
    new Cars(4, 'Toyota'),
    new Cars(5, 'Mitsubishi'),
  ];

  features: Features[] = [
    new Features(1, 'ABS'),
    new Features(2, 'ელექტრო შუშების ამწევი'),
    new Features(3, 'ლუქი'),
    new Features(4, 'Bluetooth'),
    new Features(5, 'სიგნალიზაცია'),
    new Features(6, 'პარკინგკონტროლი'),
    new Features(7, 'ნავიგაცია'),
    new Features(8, 'ბორტკომპიუტერი'),
    new Features(9, 'მულტი საჭე'),
  ];
  formData: Form = new Form();
  formValue!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  public carsId: number = 0;
  selectedFeatures: string[] = [];
  ngOnInit(): void {
    this.selectedFeatures = new Array<string>();
    this.formValue = this.formBuilder.group({
      desc: [''],
      image: [''],
    });
  }
  getFeatureId(e: any, id: string) {
    if (e.target.checked) {
      console.log(id + 'checked');
      this.selectedFeatures.push(id);
    } else {
      console.log(id + 'unchecked');
      this.selectedFeatures = this.selectedFeatures.filter((m) => m != id);
    }
    console.log(this.selectedFeatures);
  }
  getCarName() {
    console.log(this.carsId);
    console.log(this.cars[this.carsId - 1].name);
  }
  postFormData() {
    this.formData.desc = this.formValue.value.desc;
    this.formData.image = this.formValue.value.image;
    this.formData.feature = this.selectedFeatures;
    this.formData.model = this.cars[this.carsId - 1].name;

    this.api.postCar(this.formData).subscribe(
      (res) => {
        console.log(res);
        alert('ფორმა დაემატა!');
      },
      (err) => {
        alert('ფორმის არ დაემატა!');
      }
    );
  }
}
