import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  productos = [
    {
      name: 'Mangos',
      price: 59,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 39,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    },
    {
      name: 'Mangos',
      price: 19,
      description: 'Delicisos mango rojos del campo'
    }
  ];

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
