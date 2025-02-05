import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPersonsComponent } from './login-persons.component';

describe('LoginPersonsComponent', () => {
  let component: LoginPersonsComponent;
  let fixture: ComponentFixture<LoginPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
