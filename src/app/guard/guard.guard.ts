import { inject, OnInit } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


export const guardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // variable que obtiene el parametro desde la ruta del home
    const estado = route.queryParamMap.get('authStatus');
    let bandera : boolean = !!estado;

    if (bandera)
    {
        return true;
    
    }else
    {
        router.navigate(['/**'],{queryParams:{'error':'No se puede acceder mediante URL, favor ingresar credenciales','msj':'401'}});
         return false;
    }
    

};


