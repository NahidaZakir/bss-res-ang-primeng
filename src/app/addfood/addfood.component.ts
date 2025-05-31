import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';

import { ImagepreviewComponent } from '../imagepreview/imagepreview.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { addFoodReqBody } from '../model/food.model';
import { FoodService } from '../services/food.service';
import { TextareaModule } from 'primeng/textarea';
import { ImageService } from '../services/image.service';
interface Discount {
  name: string;
  code: number;
}
@Component({
  selector: 'app-addfood',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabel,
    SelectModule,
    IftaLabelModule,
    ImagepreviewComponent,
    ButtonModule,
    RouterModule,
    Select,
    FormsModule,
    TextareaModule,
    FloatLabel,
  ],
  templateUrl: './addfood.component.html',
  styleUrl: './addfood.component.css',
})
export class AddfoodComponent {
  router = inject(Router);
  addFood: addFoodReqBody = new addFoodReqBody();

  selectedDiscount!: Discount;
  discounts!: Discount[];
  discountCode: number = 0;

  disabledField: boolean = true;
  priceInput: number = 0;
  discountInput: number = 0;
  discountTypeInput!: Discount;
  showDiscountedPrice: number = 0;
  getInputs: number = 0;

  discountTypeLabel: string = 'Discount in (%)';
  constructor(
    private foodService: FoodService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.discounts = [
      { name: 'None', code: 0 },
      { name: 'Flat', code: 1 },
      { name: 'Percentage', code: 2 },
    ];
  }

  getUserPrice(price: number) {
    this.priceInput = price;
  }
  getDiscount(discount: number) {
    this.discountInput = discount;
    this.onTypeOfDiscount();
  }

  getSelectedDiscount(selectedDis: Discount) {
    this.discountTypeInput = selectedDis;
    this.onShowDiscountLabel();
    this.onShowField();
    if (this.discountInput !== 0) {
      this.onTypeOfDiscount();
    }
  }

  onTypeOfDiscount() {
    if (this.discountTypeInput.code === 0) {
      this.disabledField = true;
    }
    if (this.discountTypeInput.code === 1) {
      this.showDiscountedPrice = this.priceInput - this.discountInput;
      return;
    }
    if (this.discountTypeInput.code === 2) {
      let discountedBy = this.priceInput * (this.discountInput / 100);
      this.showDiscountedPrice = this.priceInput - discountedBy;
    }
  }

  onShowField() {
    if (this.discountTypeInput.code === 0) {
      this.disabledField = true;
      this.showDiscountedPrice = 0;
      this.discountInput = 0;
    }
    if (
      this.discountTypeInput.code === 1 ||
      this.discountTypeInput.code === 2
    ) {
      this.disabledField = false;
    }
  }
  onShowDiscountLabel() {
    if (this.discountTypeInput.code === 1) {
      this.discountTypeLabel = 'Discount in (৳) ';
    }
    if (
      this.discountTypeInput.code === 2 ||
      this.discountTypeInput.code === 0
    ) {
      this.discountTypeLabel = 'Discount in (%)';
    }
  }

  onAddFood() {
    this.setDiscount();
    this.setImage();
    this.addFood.discount = +this.discountInput;
    this.addFood.discountPrice = +this.showDiscountedPrice;
    this.addFood.price = +this.priceInput;
    console.log(this.addFood);
    this.foodService.createFood(this.addFood).subscribe((res: any) => {
      this.router.navigateByUrl('/foods');
    });
  }

  setDiscount() {
    if (this.selectedDiscount) {
      this.discountCode = this.selectedDiscount?.code;
    }
    this.addFood.discountType = this.discountCode;
    //console.log(this.selectedDiscount);
  }

  setImage() {
    const imageInfo = this.imageService.getImageInfo();
    this.addFood.image = imageInfo[0];
    this.addFood.base64 = imageInfo[1];
  }
}
