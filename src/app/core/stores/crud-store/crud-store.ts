import {combineLatest, Observable} from 'rxjs';
import {EntityStore} from '../entity-store/entity-store';
import {ILoadingStore} from '../loading-store/loading-store.model';
import {StoreModel} from './crud-store.model';
import {map} from 'rxjs/operators';

export class CRUDStore<T> extends EntityStore<T> implements ILoadingStore {
    constructor() {
        super();
    }


    get state(): Observable<StoreModel<T>> {
        return combineLatest([this.entitySubject, this.loading]).pipe(map(arr => {
            return {
                entities: arr[0],
                loading: arr[1]
            };
        }));
    }

    clearState(): void {
        // TODO Implement some way that this will not cause the state to emit 3 times
        this.removeAllEntities();
        this.doneLoading();
    }

}
