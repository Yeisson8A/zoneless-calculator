import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  // Obtener elementos hijos
  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  // Inyectar dependencias
  private calculatorService = inject(CalculatorService);
  // Señales de solo lectura
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    // Tabla de equivalencias
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '='
    };
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);

    // Llamar método del hijo
    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
