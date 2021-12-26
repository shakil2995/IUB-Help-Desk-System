import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDialogComponent } from './ticket-dialog.component';

describe('TicketDialogComponent', () => {
  let component: TicketDialogComponent;
  let fixture: ComponentFixture<TicketDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
