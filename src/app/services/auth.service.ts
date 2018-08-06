import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { AlertType } from './../enums/alert-type.enum';


@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com\
            /v0/b/chat-df00f.appspot.com/o/default-profile-pic.jpg\
            ?alt=media&token=41d45e58-f5c9-4953-8d34-d5417db0ed84'
          };

          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }
}
