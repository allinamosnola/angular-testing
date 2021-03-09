import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed
        .configureTestingModule({
          declarations: [HeroesComponent, HeroSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: HeroService, useValue: heroService}]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call add on click', () => {
    spyOn(component, 'add');
    const input = fixture.debugElement.nativeElement.querySelector('.hero-name');
    input.nativeElement as HTMLInputElement;
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.nativeElement.querySelector('.add-button').click();
    fixture.detectChanges;
    expect(component.add).toHaveBeenCalled();
  });

  it('should call delete', () => {
    const hero = {id: 19, name: 'Magma'}
    spyOn(component, 'delete');
    component.delete(hero);
    expect(component.delete).toHaveBeenCalled();
  });

  // it('should display "Top Heroes List" as headline', () => {
  //   expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes List');
  // });

  // it('should call heroService', waitForAsync(() => {
  //      expect(getHeroesSpy.calls.any()).toBe(true);
  //    }));

  // it('should display 4 links', waitForAsync(() => {
  //      expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  //    }));
});
