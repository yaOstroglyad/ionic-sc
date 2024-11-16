import { ToastController } from '@ionic/angular';
import { Injector } from '@angular/core';

export enum ToastPosition {
  top = 'top',
  middle = 'middle',
  bottom = 'bottom'
}

export enum ToastColor {
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark'
}

const toastController = Injector.create({
  providers: [
    { provide: ToastController, useClass: ToastController }
  ]
}).get(ToastController);

export function showToast(config: {
  message: string;
  duration?: number;
  color?: ToastColor;
  position?: ToastPosition;
}): Promise<void> {
  const {
    message = 'Please provide message',
    duration = 5000,
    color = ToastColor.primary,
    position = ToastPosition.top
  } = config;

  return toastController.create({
    message,
    duration,
    color,
    position
  }).then(toast => toast.present());
}
