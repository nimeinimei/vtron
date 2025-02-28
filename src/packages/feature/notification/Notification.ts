import { useRootState } from '../state/Root';
export interface NotifyConstructorOptions {
  title: string;
  content: string;
  timeout?: number;
}
export class Notify {
  public static idcount = 0;
  id: number;
  title: string;
  content: string;
  constructor(option: NotifyConstructorOptions) {
    this.title = option.title;
    this.content = option.content;
    this.id = Notify.idcount++;
    useRootState().system.notify.push(this);
    useRootState().system.message.notify.push(this);
    setTimeout(() => {
      this.close();
    }, option.timeout || 5000);
  }
  close() {
    useRootState().system.notify.splice(useRootState().system.notify.indexOf(this), 1);
  }
}
