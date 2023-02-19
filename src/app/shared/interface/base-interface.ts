import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    template: '',
  })
  export declare abstract class BaseInterface
    implements OnInit, AfterViewInit, OnDestroy
  {
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
  }