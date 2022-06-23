import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly userPWords = [
    {
      userName: 'BillFoster',
      password: 'themBeans123'
    },
    {
      userName: 'BobRoss',
      password: 'ILike2PaintStuff'
    },
  ];
  protected loginSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  protected loginUser: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
  }

  getLogInStatus(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  login(userName: string, password: string): void {
    this.userPWords.some(user => {
      if (user.userName === userName && user.password === password) {
        this.loginSubject.next(true);
        this.loginUser.next(userName);
        return true;
      } else {
        this.loginSubject.next(false);
        this.loginUser.next(null);
        return false;
      }
    });
  }
}
