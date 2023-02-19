import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class DisplayService {
    public isView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
      true
    );
    constructor() {
      const mode = localStorage.getItem('MODE')
      if(mode=='VIEW'){
        this.isView.next(true)
      }else{
        this.isView.next(false)
      }
    }
    setViewMode(){
     localStorage.setItem('MODE','VIEW')
     this.isView.next(true)
    }
    setEditMode(){
      localStorage.setItem('MODE','EDIT')
      this.isView.next(false)
    }
    setCreateMode(){
      localStorage.setItem('MODE','CREATE')
      this.isView.next(false)
    }
  }