import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Gender } from '../shared/enum/gender';
import { User } from '../shared/model/user';
import { save } from '../store/user/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  formSubmitted = false;
  gendersEnum = Gender;
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormGroup({
      day: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required)
    }, Validators.required),
    gender: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
  });

  get firstNameCtrl() { return this.form.get('firstName') as FormControl };
  get lastNameCtrl() { return this.form.get('lastName') as FormControl };
  get birthDateCtrl() { return this.form.get('birthDate') as FormGroup };
  get genderCtrl() { return this.form.get('gender') as FormControl };
  get nationalityCtrl() { return this.form.get('nationality') as FormControl };


  private _user$: Observable<User>;
  private _destroyedSubject = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<{ user: User }>) {
    this._user$ = store.select('user').pipe(takeUntil(this._destroyedSubject));
    this._user$.subscribe((user) => {
      this.form.setValue(user);
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroyedSubject.next();
    this._destroyedSubject.complete();
  }

  save(form: FormGroup) {
    this.formSubmitted = true;
    if (this.form.valid) {
      const user: User = form.getRawValue();
      this.store.dispatch(save({ payload: user }));
    }
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<string, Gender>, b: KeyValue<string, Gender>): number => {
    return 0;
  }
}