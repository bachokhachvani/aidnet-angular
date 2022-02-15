import { Component, OnInit } from '@angular/core';
import { Cars } from '../shared/cars.model';
import { Features } from '../shared/features.model';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../shared/form.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  formData: Form = new Form();
  formValue!: FormGroup;
  carsData!: any;
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
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  public editId: any = '';
  public carsId: number = 0;
  selectedFeatures: string[] = [];
  ngOnInit(): void {
    this.selectedFeatures = new Array<string>();
    this.formValue = this.formBuilder.group({
      desc: [''],
      image: [''],
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.editId = id;
    this.getIdData();
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
  getIdData() {
    this.api.getCarId(this.editId).subscribe((res) => {
      this.carsData = res;
      console.log(this.carsData);
    });
  }
  updateForm() {
    this.formData.desc = this.formValue.value.desc;
    this.formData.image = this.formValue.value.image;
    this.formData.feature = this.selectedFeatures;
    this.formData.model = this.cars[this.carsId - 1].name;
    this.formData.id = this.editId;
    this.api.updateCar(this.formData, this.formData.id).subscribe((res) => {
      alert('ფორმა განახლდა!');
    });
  }
}
