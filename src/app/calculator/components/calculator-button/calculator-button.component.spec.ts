import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "./calculator-button.component";
import { Component } from "@angular/core";

// Pequeño componente para probar contenido proyectado
@Component({
    standalone: true,
    imports: [CalculatorButtonComponent],
    template: `
        <calculator-button>
            <span class="projected-content underline">Test content</span>
        </calculator-button>
    `
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 when doubleSize is false', () => {
    // Arrange
    const hostCssClasses = compiled.classList.value.split(' ');

    // Assert
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 when doubleSize is true', () => {
    // Arrange
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCssClasses = compiled.classList.value.split(' ');

    // Assert
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick is called', () => {
    // Espias
    spyOn(component.onClick, 'emit');

    // Act
    component.handleClick();

    // Assert
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressStyle is called with a matching key', (done) => {
    // Arrange
    component.contentValue()!.nativeElement.innerText = '2';

    // Act
    component.keyboardPressedStyle('2');

    // Assert
    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
        expect(component.isPressed()).toBeFalse();
        // Función cuando se necesita esperar
        done();
    }, 101);
  });

  it('should not set isPressed to true if key is not matching', () => {
    // Arrange
    component.contentValue()!.nativeElement.innerText = '2';

    // Act
    component.keyboardPressedStyle('4');

    // Assert
    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    // Arrange
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');

    // Assert
    expect(projectedContent).not.toBeNull();
  });
});