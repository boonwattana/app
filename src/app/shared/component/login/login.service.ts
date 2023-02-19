import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/shared/services/gateway';
import { LoginModel } from './login-model';
import { RegisterModel } from './register-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  servicePath = '/authentications';

  constructor(private gateway: GatewayService) { }
  login(model:LoginModel): any {
    const url = `${this.servicePath}/login`;
    return  this.gateway.create(url,model);
  }
  register(model:RegisterModel): any {
    const url = `${this.servicePath}/register`;
    return  this.gateway.create(url,model);
  }
}
