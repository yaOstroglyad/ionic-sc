import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { KeyboardResize } from '@capacitor/keyboard/dist/esm/definitions';

@Directive({
  standalone: true,
  selector: '[appLoginKeyboardHandler]'
})
export class LoginKeyboardHandlerDirective implements OnInit, OnDestroy {
  private avatarElement: HTMLElement;
  private loginButtonElement: HTMLElement;
  private isMobilePlatform: boolean = Capacitor.getPlatform() !== 'web';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  async ngOnInit(): Promise<void> {
    await Keyboard.setResizeMode({ mode: KeyboardResize.None });

    if (this.isMobilePlatform) {
      this.avatarElement = this.el.nativeElement.querySelector('.login100-form-avatar');
      this.loginButtonElement = this.el.nativeElement.querySelector('.container-login100-form-btn');

      Keyboard.addListener('keyboardDidShow', () => this.handleKeyboardShow());
      Keyboard.addListener('keyboardDidHide', () => this.handleKeyboardHide());
    }
  }

  ngOnDestroy(): void {
    if (this.isMobilePlatform) {
      Keyboard.removeAllListeners();
    }
  }

  private handleKeyboardShow(): void {
    if (this.avatarElement) {
      this.renderer.setStyle(this.avatarElement, 'opacity', '0');
      this.renderer.setStyle(this.avatarElement, 'height', '0');
      this.renderer.setStyle(this.avatarElement, 'display', 'none');
    }

    if (this.loginButtonElement) {
      this.renderer.setStyle(this.loginButtonElement, 'position', 'absolute');
      this.renderer.setStyle(this.loginButtonElement, 'bottom', '65px');
    }
  }

  private handleKeyboardHide(): void {
    if (this.avatarElement) {
      this.renderer.setStyle(this.avatarElement, 'opacity', '1');
      this.renderer.setStyle(this.avatarElement, 'height', '220px');
    }

    if (this.loginButtonElement) {
      this.renderer.setStyle(this.loginButtonElement, 'position', 'relative');
      this.renderer.setStyle(this.loginButtonElement, 'bottom', 'auto');
    }
  }
}
