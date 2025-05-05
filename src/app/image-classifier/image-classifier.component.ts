import { Component, ViewChild, ElementRef } from '@angular/core';
declare var ml5: any;

@Component({
  selector: 'app-image-classifier',
  imports: [],
  templateUrl: './image-classifier.component.html',
  styleUrl: './image-classifier.component.css',
})
export class ImageClassifierComponent {
  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;
  resultText: string = 'نتیجه: ...';
  classifier: any;
  imageLoaded: boolean = false;

  constructor() {
    // بارگذاری مدل MobileNet
    ml5.imageClassifier('MobileNet').then((loadedClassifier: any) => {
      this.classifier = loadedClassifier;
      console.log('مدل بارگذاری شد!');
    });
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageEl = this.imageRef.nativeElement;
      imageEl.src = e.target.result;
      this.imageLoaded = true;

      imageEl.onload = () => {
        if (!this.classifier) return;

        this.classifier
          .classify(imageEl)
          .then((results: any) => {
            const label = results[0].label;
            const confidence = (results[0].confidence * 100).toFixed(2);
            this.resultText = `نتیجه: ${label} (${confidence}٪)`;
          })
          .catch((err: any) => {
            console.error(err);
            this.resultText = 'خطا در تشخیص!';
          });
      };
    };

    reader.readAsDataURL(file);
  }
}
