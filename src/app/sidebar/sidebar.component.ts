import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 export let ROUTES: RouteInfo[] = [
    
]; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    if(this.auth.isAuthenticated())
    {
      ROUTES = [
        { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
        { path: '/listar-personal-adg', title: 'Personal ADG',  icon: 'pe-7s-graph', class: '' },
      
      ];

      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }else
    {
      ROUTES = [
        { path: '/inicio', title: 'inicio',  icon: 'pe-7s-graph', class: '' },
      
      ];

      this.menuItems = ROUTES.filter(menuItem => menuItem);

    }
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
