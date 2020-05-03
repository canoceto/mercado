import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
