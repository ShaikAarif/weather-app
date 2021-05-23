import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs'
import { DetailsComponent } from './details.component';

import { ActivatedRoute, Params } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let route;

  const routeStub = {
    param: {
      subscribe() {
        return of();
      }
    }
  };
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports:[HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
              data: {
                  subscribe: (fn: (value) => void) => fn({
                      name: '',
                  }),
              },
              params: {
                  subscribe: (fn: (value: Params) => void) => fn({
                      tab: 0,
                  }),
              },
            }
          }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);  
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    const subRouteSpy = spyOn(route.params, "subscribe");
    expect(component).toBeTruthy();
  });
});
