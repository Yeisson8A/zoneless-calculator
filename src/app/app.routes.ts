import { Routes } from '@angular/router';
import { CalculatorViewComponent } from './calculator/views/calculator-view/calculator-view.component';

export const routes: Routes = [
    {
        path: 'calculator',
        component: CalculatorViewComponent
    },
    {
        path: '**',
        redirectTo: 'calculator'
    }
];
