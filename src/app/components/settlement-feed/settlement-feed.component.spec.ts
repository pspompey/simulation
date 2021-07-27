import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementFeedComponent } from './settlement-feed.component';

describe('SettlementFeedComponent', () => {
  let component: SettlementFeedComponent;
  let fixture: ComponentFixture<SettlementFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
