import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statusOptions: string[] = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames: string[] = ['Test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.forbiddenNames.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('Stable'),
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
