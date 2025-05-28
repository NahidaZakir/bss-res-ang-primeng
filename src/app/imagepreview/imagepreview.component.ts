import { Component, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-imagepreview',
  imports: [],
  templateUrl: './imagepreview.component.html',
  styleUrl: './imagepreview.component.css',
})
export class ImagepreviewComponent {
  imagePreview: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private imageService: ImageService) {}

  triggerFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      const base64Data = this.imagePreview as string;
      this.imageService.setImageInfo(fileName, base64Data);
    };
    reader.readAsDataURL(file);
  }
}
