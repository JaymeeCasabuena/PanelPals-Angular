import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService) {}

  resolve(): Observable<any> {
    return this.userService.getCurrentUser();
  }
}
