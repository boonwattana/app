import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  localLoad:number = 0;
  localSuccess:number = 0;
  public value: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public load: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public success: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {
    this.localLoad = 0;
    this.localSuccess = 0
  }
  addLoad(){
    if(this.localLoad==0){
      this.isLoading.next(true)

    }
    this.localLoad +=1
    this.load.next(this.localLoad)
    this.calValue()
  }
  calValue() {
    if(this.localLoad!=0&& this.localSuccess!=0){
      const percent = (this.localSuccess/this.localLoad)*100
      this.value.next(percent)
      if(percent==100){
        // this.value.next(null)
        this.localLoad = 0
        this.localSuccess = 0
        this.isLoading.next(false)

        // setTimeout(() => {
        //   this.value.next(null)
        //   this.isLoading.next(false)
        //   this.localLoad = 0
        //   this.localSuccess = 0
        // }, 100);

      }
    }
  }
  addSuccess(){
    this.localSuccess+=1
    this.success.next(this.localSuccess)
    this.calValue()

  }
}
