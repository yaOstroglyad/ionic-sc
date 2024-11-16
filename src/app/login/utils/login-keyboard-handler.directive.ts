import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { KeyboardResize } from '@capacitor/keyboard/dist/esm/definitions';

@Directive({
  standalone: true,
  selector: '[appLoginKeyboardHandler]'
})
export class LoginKeyboardHandlerDirective implements OnInit, OnDestroy {
  private avatarElement: HTMLElement;
  private loginContainer: HTMLElement;
  private loginForm: HTMLElement;
  private isMobilePlatform: boolean = Capacitor.getPlatform() !== 'web';
  private isKeyboardVisible: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.avatarElement = this.el.nativeElement.querySelector('.login100-form-avatar');
      this.loginContainer = this.el.nativeElement.querySelector('.container-login100');
      this.loginForm = this.el.nativeElement.querySelector('.login100-form');
    }, 0);
    if (this.isMobilePlatform) {
      await Keyboard.setResizeMode({ mode: KeyboardResize.None });

      Keyboard.addListener('keyboardDidShow', () => this.handleKeyboardShow());
      Keyboard.addListener('keyboardDidHide', () => this.handleKeyboardHide());
    }
  }

  ngOnDestroy(): void {
    if (this.isMobilePlatform) {
      Keyboard.removeAllListeners();
    }
  }

  //needed only for testing on web (works on mac)
  @HostListener('window:keydown.meta.k', ['$event'])
  emulateKeyboardShow(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.isMobilePlatform && !this.isKeyboardVisible) {
      this.handleKeyboardShow();
      this.isKeyboardVisible = true;
    }
  }

  //needed only for testing on web (works on mac)
  @HostListener('window:keydown.meta.h', ['$event'])
  emulateKeyboardHide(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.isMobilePlatform && this.isKeyboardVisible) {
      this.handleKeyboardHide();
      this.isKeyboardVisible = false;
    }
  }

  private handleKeyboardShow(): void {
    if (this.loginForm) {
      this.renderer.setStyle(this.loginForm, 'margin-top', '70%');
    }

    if (this.loginContainer) {
      this.renderer.setStyle(this.loginContainer, 'align-items', 'unset');
    }

    if (this.avatarElement) {
      this.renderer.setStyle(this.avatarElement, 'opacity', '0');
      this.renderer.setStyle(this.avatarElement, 'height', '0');
    }
  }

  private handleKeyboardHide(): void {
    if (this.loginForm) {
      this.renderer.setStyle(this.loginForm, 'margin-top', '0');
    }

    if (this.loginContainer) {
      this.renderer.setStyle(this.loginContainer, 'align-items', 'center');
    }

    if (this.avatarElement) {
      this.renderer.setStyle(this.avatarElement, 'opacity', '1');
      this.renderer.setStyle(this.avatarElement, 'height', '220px');
    }
  }
}
