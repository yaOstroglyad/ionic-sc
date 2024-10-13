import { ToastController } from '@ionic/angular';

export enum ToastPosition {
  top = 'top',
  middle = 'middle',
  bottom = 'bottom'
}

// Экспортируемая функция для показа тоста
export function showErrorToast(toastController: ToastController, message: string): Promise<void> {
  return toastController.create({
    message: message,
    duration: 5000,
    color: 'danger',
    position: 'top'
  }).then(toast => toast.present());
}
