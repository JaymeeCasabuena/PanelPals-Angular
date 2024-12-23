import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionTabComponent } from './discussion-tab.component';

describe('DiscussionTabComponent', () => {
  let component: DiscussionTabComponent;
  let fixture: ComponentFixture<DiscussionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
