import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
