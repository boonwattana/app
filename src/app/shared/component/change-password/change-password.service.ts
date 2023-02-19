import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/shared/services/gateway';
import { ChangePasswordModel } from './change-password-model';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  servicePath = '/users';

  constructor(private gateway: GatewayService) { }
  changePassword(model:ChangePasswordModel): any {
    const url = `${this.servicePath}/change-password`;
    return  this.gateway.create(url,model);
  }
}
