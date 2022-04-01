import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * initialize the storage
   */
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
  }

  /**
   * Set a new value to the storage
   * @param key
   * @param value
   */
  public async set(key: string, value: any) {
    return await this._storage?.set(key, value);
  }

  /**
   * Get a value from the storage by key
   * @param key
   */
  public async get(key: string) {
    return await this._storage?.get(key);
  }
}
