import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './signup/signup';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signup],
  templateUrl: './app.html',
})
export class App {
  title = 'signup-app';
}
