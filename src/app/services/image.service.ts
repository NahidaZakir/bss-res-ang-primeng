import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagePathSubject = new BehaviorSubject<string>('');
  private imageBase64Subject = new BehaviorSubject<string>('');

  imagePathObservable$ = this.imagePathSubject.asObservable();
  imageBase64Observable$ = this.imageBase64Subject.asObservable();

  setImageInfo(value1: string, value2: string) {
    this.imagePathSubject.next(value1);
    this.imageBase64Subject.next(value2);
    console.log(this.imagePathSubject,this.imageBase64Subject, 'from image service')
  }

  getImageInfo(): [string, string] {
    return [
      this.imagePathSubject.getValue(),
      this.imageBase64Subject.getValue(),
    ];
  }

  resetImageInfo() {
    this.imagePathSubject.next('');
    this.imageBase64Subject.next('');
  }

  constructor() {}
}
