import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpirationDateInfoBoardComponent } from './expiration-date-info-board.component';

describe('ExpirationDateInfoBoardComponent', () => {
  let component: ExpirationDateInfoBoardComponent;
  let fixture: ComponentFixture<ExpirationDateInfoBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirationDateInfoBoardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpirationDateInfoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
