import { Component, Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { VERSION } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CraService } from './_service/cra.service';
import { PerService } from './_service/personnel.service';
import { ToasterService } from './toaster.service';
import { SidebarService } from 'src/app/_services/sidebar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]

})
@Injectable()
export class AppComponent implements OnInit{

  menus = [];
  public ngOnInit(): void {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key])
    this.bpo.observe(breakpoints)
    .pipe(map(bst => bst.matches))
    .subscribe(matched => {
      

      console.log('matched');

      this.determineSidenavMode();
      this.determineLayoutGap();
    });
    
  }
  version = VERSION;
  mode = 'side'
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;
  currentUser: User;
  name;
  userss;
 
    

isOpened: boolean = false;

  
  public constructor(public per: PerService, public cra: CraService, private bpo: BreakpointObserver, private router: Router, private authenticationService: AuthenticationService,public sidebarservice: SidebarService) {
 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.menus = sidebarservice.getMenuList();
    
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  toggleSidebar() {
    console.log('toggleSidebar clicked');
    this.isOpened = !this.isOpened;
    console.log(this.isOpened);
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
getState(currentMenu) {

  if (currentMenu.active) {
    return 'down';
  } else {
    return 'up';
  }
}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  
  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    }
    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small)
  }
  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
}

