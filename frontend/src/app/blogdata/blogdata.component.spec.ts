import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdataComponent } from './blogdata.component';

describe('BlogdataComponent', () => {
  let component: BlogdataComponent;
  let fixture: ComponentFixture<BlogdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
