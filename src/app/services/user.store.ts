import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  // users<>;

  private userSubject = new BehaviorSubject<User[]>([]);
  users$ = this.userSubject.asObservable();

  // later implement adding new users
}
