import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue('Magneta');
    TestBed
        .configureTestingModule({
          declarations: [HeroSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: HeroService, useValue: heroService}]
        })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should list a search', () => {
    const heroName = 'Magneta';
    expect(getHeroesSpy.search()).toBe(heroName);
    //spyOn(component, 'search');
    //fixture.debugElement.nativeElement.querySelector('#search-box').value = 'Test';
    //fixture.debugElement.nativeElement.querySelector('#search-box').click();
    // component.search('Test');
    // expect(component.search).toHaveBeenCalled();
  });
  // it('should display "Top Heroes List" as headline', () => {
  //   expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes List');
  // });

  // it('should call heroService', waitForAsync(() => {
  //   expect(getHeroesSpy.calls.any()).toBe(true);
  // }));

  // it('should display 4 links', waitForAsync(() => {
  //      expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  //    }));
});
