import { Component } from '@angular/core';
import { ImageClassifierComponent } from "./image-classifier/image-classifier.component";

@Component({
  selector: 'app-root',
  imports: [ ImageClassifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ml5Js';
}
