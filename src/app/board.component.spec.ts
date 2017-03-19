import { TestBed, async } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent Test', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent
      ],
    }).compileComponents();
  }));

  it('Should create the app successfuly', async(() => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('Should render application with all components', async(() => {
    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Conway Angular');
  }));

});