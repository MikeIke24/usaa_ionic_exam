import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiStore } from './core/stores/ui-store/ui-store';
import {BreakpointSizes, ScreenSizeBreakpointService} from './services/screen-size-breakpoint.service';

export type SidenavMode = 'over' | 'push' | 'side';

export interface AppState {
    navigating: boolean;
    loading: boolean;
    windowSize: BreakpointSizes;
    currentRouteData: object;
    currentRouteParams: object;
}

export const INITIAL_APP_STATE: Partial<AppState> = {
    navigating: false,
    loading: false,
};

@Injectable({
    providedIn: 'root'
})
export class AppStore extends UiStore<AppState> {
    mobileSizes: Partial<BreakpointSizes>[] = ['XSmall'];
    tabletSizes: Partial<BreakpointSizes>[] = ['Small'];
    private leftSidenavSubject: Subject<boolean>;
    private subscriptions = new Subscription();

    constructor(private breakpointService: ScreenSizeBreakpointService) {
        super(INITIAL_APP_STATE);
        super.dispatchUiState(INITIAL_APP_STATE as AppState);
        this.subToBreakpointService();
        this.leftSidenavSubject = new Subject();
    }

    isMobile(): Observable<boolean> {
        return this.getStateProp('windowSize').pipe(map(size => this.mobileSizes.includes(size)));
    }

    isCurrentlyMobile(): boolean {
        return this.breakpointService.isSize(this.mobileSizes[this.mobileSizes.length - 1]);
    }

    isTablet(): Observable<boolean> {
        return this.getStateProp('windowSize').pipe(map(size => this.tabletSizes.includes(size)));
    }

    private subToBreakpointService() {
        const breakpointSub = this.breakpointService.sizeChanges$.subscribe(size => {
            if (!!size) {
                this.updateUiState({
                    windowSize: size
                });
            }
        });
        this.subscriptions.add(breakpointSub);
    }
}
