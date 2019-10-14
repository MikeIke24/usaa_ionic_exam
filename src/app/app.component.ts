import {ChangeDetectorRef, Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppStore} from './app.store';
import {RouteData} from './models/router/route-data.model';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Search',
            url: '/app/search',
            icon: 'search'
        },
        {
            title: 'Favorites',
            url: '/app/favorites',
            icon: 'star'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private appStore: AppStore
    ) {
        this.initializeApp();
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const routerState = router.routerState;
                const snapshot = router.routerState.root;
                const title = `${this.getTitle(routerState, snapshot).join(' - ')}`;
                titleService.setTitle(title);
                this.appStore.updateUiState({
                    currentRouteData: this.collectRouteData(routerState, snapshot),
                    currentRouteParams: activatedRoute.snapshot.queryParams
                });
            }
            this.cdRef.detectChanges();
        });
    }


    // collect that title data properties from all child routes
    getTitle(state, parent): string[] {
        return this.collectRouteDataField(state, parent, 'title');
    }

    private collectRouteDataField(state, parent: ActivatedRoute, fieldName: string): any[] {
        const data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data[fieldName]) {
            data.push(parent.snapshot.data[fieldName]);
        }

        if (state && parent) {
            data.push(...this.collectRouteDataField(state, state.firstChild(parent), fieldName));
        }
        return data;
    }

    private collectRouteData(state, parent: ActivatedRoute): RouteData {
        let data = null;
        if (parent && parent.snapshot.data) {
            const tempData = (parent.snapshot.data);
            if (!!tempData) {
                data = tempData;
            }
        }
        if (state && parent) {
            const tempData = this.collectRouteData(state, state.firstChild(parent));
            if (!!tempData) {
                data = tempData;
            }
        }
        return data;

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
