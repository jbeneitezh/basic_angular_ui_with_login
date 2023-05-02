import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'mat-divider[dividerWidth]'
})
export class DividerWidthDirective {
  @Input() dividerWidth: string;

  @HostBinding('style.width')
  get width(): string {
    return this.dividerWidth;
  }
}