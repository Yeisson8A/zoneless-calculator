import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../../services/calculator.service';

// Mock para emular servicio
class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('20.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
    //fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('20.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    // Arrange
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    // Assert
    expect(compiled.querySelector('span')?.innerText).toBe('456 -')
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('-');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', () => {
    // Arrange
    const buttons = compiled.querySelectorAll('calculator-button');
    
    // Assert
    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
    expect(buttons[4].textContent?.trim()).toBe('7');
    expect(buttons[5].textContent?.trim()).toBe('8');
    expect(buttons[6].textContent?.trim()).toBe('9');
    expect(buttons[7].textContent?.trim()).toBe('x');
    expect(buttons[8].textContent?.trim()).toBe('4');
    expect(buttons[9].textContent?.trim()).toBe('5');
    expect(buttons[10].textContent?.trim()).toBe('6');
    expect(buttons[11].textContent?.trim()).toBe('-');
    expect(buttons[12].textContent?.trim()).toBe('1');
    expect(buttons[13].textContent?.trim()).toBe('2');
    expect(buttons[14].textContent?.trim()).toBe('3');
    expect(buttons[15].textContent?.trim()).toBe('+');
    expect(buttons[16].textContent?.trim()).toBe('0');
    expect(buttons[17].textContent?.trim()).toBe('.');
    expect(buttons[18].textContent?.trim()).toBe('=');
  });

  it('should handle keyboard events correctly', () => {
    // Arrange
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});

    // Act
    document.dispatchEvent(eventEnter);

    // Assert
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    // Arrange
    const eventEsc = new KeyboardEvent('keyup', {key: 'Escape'});

    // Act
    document.dispatchEvent(eventEsc);

    // Assert
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

    // Arrange
    const eventAsterisk = new KeyboardEvent('keyup', {key: '*'});

    // Act
    document.dispatchEvent(eventAsterisk);

    // Assert
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('x');

    // Arrange
    const eventSlash = new KeyboardEvent('keyup', {key: '/'});

    // Act
    document.dispatchEvent(eventSlash);

    // Assert
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('÷');
  });

  it('should display result text correctly', () => {
    // Act
    mockCalculatorService.resultText.and.returnValue('123');
    fixture.detectChanges();

    // Assert
    expect(component.resultText()).toBe('123');
  });
});
