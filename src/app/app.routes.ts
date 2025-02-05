import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPersonsComponent } from './pages/login-persons/login-persons.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AccountComponent } from './pages/accounts/accounts.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { PeopleComponent } from './pages/people/people.component';
import { AuthGuard } from './auth.guard'; //  Import Auth Guard
import { TransactionComponent } from './pages/transactions/transactions.component';
import { AddTransactionsComponent } from './pages/add-transactions/add-transactions.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-persons', component: LoginPersonsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'add-account/:id', component: AddAccountComponent, canActivate: [AuthGuard] },
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
  { path: 'transactions/:id', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'add-transactions/:id', component: AddTransactionsComponent, canActivate: [AuthGuard] },
];