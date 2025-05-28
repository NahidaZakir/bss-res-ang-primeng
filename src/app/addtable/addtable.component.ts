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
import { createTableReqBody } from '../model/table.model';
import { ImageService } from '../services/image.service';
import { TableInfoService } from '../services/tablesinfo.service';

interface seats {
  name: string;
  code: string;
}
@Component({
  selector: 'app-addtable',
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
    SpinnerComponent
],
  templateUrl: './addtable.component.html',
  styleUrl: './addtable.component.css',
})
export class AddtableComponent implements OnInit {
  createTable: createTableReqBody = new createTableReqBody();
  router = inject(Router);
  seats: seats[] | undefined;
  seatNumber: number = 0;
  selectedSeats: seats | undefined;
  isLoading = false;
  constructor(
    private imageService: ImageService,
    private tableService: TableInfoService
  ) {}
  ngOnInit(): void {
    this.seats = [
      { name: '0', code: '1' },
      { name: '2', code: '2' },
      { name: '4', code: '3' },
      { name: '6', code: '4' },
      { name: '8', code: '5' },
      { name: '12', code: '6' },
    ];
  }

  onAddTable() {
    this.isLoading=true;
    this.setSeats();
    this.setImage();
    console.log(this.createTable);
    this.tableService.createTable(this.createTable).subscribe((res: any) => {
      this.isLoading=false;
      this.router.navigateByUrl('/tables');
    });
  }

  setImage() {
    const imageInfo = this.imageService.getImageInfo();
    this.createTable.image = imageInfo[0];
    this.createTable.base64 = imageInfo[1];
  }

  setSeats() {
    if (this.selectedSeats) {
      this.seatNumber = +this.selectedSeats?.name;
      this.createTable.numberOfSeats = this.seatNumber;
    }
  }
}
