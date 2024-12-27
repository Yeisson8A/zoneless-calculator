import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should set default values when C is pressed', () => {
        // Arrange
        service.resultText.set('123');
        service.subResultText.set('456');
        service.lastOperator.set('x');

        // Act
        service.constructNumber('C');

        // Assert
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should update resultText with number input', () => {
        service.constructNumber('2');
        expect(service.resultText()).toBe('2');

        service.constructNumber('4');
        expect(service.resultText()).toBe('24');

        service.constructNumber('6');
        expect(service.resultText()).toBe('246');
    });

    it('should update resultText with number input when default value is negative', () => {
        // Act
        service.constructNumber('+/-')
        service.constructNumber('2');

        // Assert
        expect(service.resultText()).toBe('-2');
    });

    it('should handle operators correctly', () => {
        // Act
        service.constructNumber('2');
        service.constructNumber('x');

        // Assert
        expect(service.lastOperator()).toBe('x');
        expect(service.subResultText()).toBe('2');
        expect(service.resultText()).toBe('0');
    });

    it('should calculate result correctly for addition', () => {
        // Act
        service.constructNumber('2');
        service.constructNumber('+');
        service.constructNumber('4');
        service.constructNumber('=');

        // Assert
        expect(service.resultText()).toBe('6');
        expect(service.subResultText()).toBe('0');
    });

    it('should calculate result correctly for subtraction', () => {
        // Act
        service.constructNumber('6');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('=');

        // Assert
        expect(service.resultText()).toBe('4');
        expect(service.subResultText()).toBe('0');
    });

    it('should calculate result correctly for multiplication', () => {
        // Act
        service.constructNumber('6');
        service.constructNumber('x');
        service.constructNumber('2');
        service.constructNumber('=');

        // Assert
        expect(service.resultText()).toBe('12');
        expect(service.subResultText()).toBe('0');
    });

    it('should calculate result correctly for division', () => {
        // Act
        service.constructNumber('8');
        service.constructNumber('÷');
        service.constructNumber('4');
        service.constructNumber('=');

        // Assert
        expect(service.resultText()).toBe('2');
        expect(service.subResultText()).toBe('0');
    });

    it('should handle decimal point correctly', () => {
        // Act
        service.constructNumber('9');
        service.constructNumber('.');
        service.constructNumber('5');

        // Assert
        expect(service.resultText()).toBe('9.5');

        // Act
        service.constructNumber('.');

        // Assert
        expect(service.resultText()).toBe('9.5');
    });

    it('should handle decimal point correctly starting with zero', () => {
        // Act
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('0');
        service.constructNumber('5');

        // Assert
        expect(service.resultText()).toBe('0.05');
    });

    it('should handle sign change correctly', () => {
        // Act
        service.constructNumber('4');
        service.constructNumber('+/-');

        // Assert
        expect(service.resultText()).toBe('-4');

        // Act
        service.constructNumber('+/-');

        // Assert
        expect(service.resultText()).toBe('4');
    });

    it('should handle backspace correctly', () => {
        // Arrange
        service.resultText.set('456');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('45');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('4');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('0');
    });

    it('should handle backspace correctly with negative number', () => {
        // Arrange
        service.resultText.set('-678');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('-67');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('-6');

        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('0');
    });

    it('should handle backspace correctly with default value', () => {
        // Act
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('0');
    });

    it('should handle backspace correctly when default value is negative', () => {
        // Act
        service.constructNumber('+/-');
        service.constructNumber('Backspace');

        // Assert
        expect(service.resultText()).toBe('0');
    });

    it('should handle max length correctly', () => {
        // Act
        for (let i = 0; i < 10; i++) {
            service.constructNumber('1');
        }

        // Assert
        expect(service.resultText().length).toBe(10);

        // Act
        service.constructNumber('1');

        // Assert
        expect(service.resultText().length).toBe(10);
    });
});