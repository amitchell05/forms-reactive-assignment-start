import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
      projectName: new FormControl(
        null,
        [Validators.required],
        this.forbiddenNames
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('Critical'),
    });
  }

  // Non-async validator

  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return { nameIsForbidden: true };
  //   } else {
  //     return null;
  //   }
  // }

  forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSaveProject() {
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }
}
