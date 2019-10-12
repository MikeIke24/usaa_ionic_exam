import {Observable} from 'rxjs';
import {IEntityStore} from '../entity-store/entity-store.model';
import {ILoadingStore} from '../loading-store/loading-store.model';


export interface StoreModel<T> {
    entities: T[];
    loading: boolean;
}

export interface ICRUDStore<T, E> extends IEntityStore<T>, ILoadingStore {
    state: Observable<StoreModel<T>>;
    clearState(): void;
}


