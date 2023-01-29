import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }
  classes = ['bg-1', 'bg-2', 'bg-3']
  rotateClass = 'bg-1'

  ngOnInit(): void {

    let contador = 0;
    setInterval(() => {
      this.rotateClass = this.classes[contador % this.classes.length]
      contador++
      if((contador % this.classes.length) == 0) {
        contador = 0
      }
    }, 3500)
  }

}
