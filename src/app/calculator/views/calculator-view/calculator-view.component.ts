import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  styleUrl: './calculator-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorViewComponent { }
