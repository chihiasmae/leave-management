import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { User, Role } from 'src/app/_models';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  currentUser: User;
  toggled = false;
  _hasBackgroundImage = true;
  
  menus = [
    {
      title: '',
      type: 'header'
    },
    {
      title: 'Personnel',

      icon: 'supervisor_account',
    
     
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Tous les employés', 
          link:'viewMesCras',
          icon: 'people',
          
        
          
          badge: {
            text: 'Pro ',
            class: 'badge-success',
           
          }
        },
        {
          title: 'Mes demandes de congé ',
          link:'Conge',
          icon: 'account_box',
          
          
        },
       
       
      ]
    },
    {
      title: 'Clients',
      linkk:'client',
      icon: 'person_outline',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
     
    },
    {
      title: 'Projets',
      linkk:'projet',
      icon: 'laptop',
      active: false,
      type: 'dropdown',
     
    },
    {
      title: 'Taches',
      icon: 'work_outline',
      active: false,
      type: 'dropdown',
       },
    {
      title: 'Contacts',
      icon: 'contacts',
      active: false,
      type: 'dropdown',
      
    },
   
    {
      title: 'Documentation',
      icon: 'library_books',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendrier',
      icon: 'calendar_today',
      active: false,
      type: 'simple'
    },
    
  ];
  constructor(private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
  
  get isNotAdmin() {
    return this.currentUser;
  }
}
