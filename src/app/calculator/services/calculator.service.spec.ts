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
});