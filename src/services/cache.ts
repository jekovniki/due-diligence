/**
 * When the application scale, this Singleton should be replace by Redis instance
 */

export default class Cache {
    private static instance: Cache;
    private data: Map<string, any>;
  
    private constructor() {
      this.data = new Map();
    }
  
    public static getInstance(): Cache {
      if (!this.instance) {
        this.instance = new Cache();
      }
      return this.instance;
    }
  
    public set(key: string, value: any): void {
      this.data.set(key, value);
    }
  
    public get(key: string): any {
      return this.data.get(key);
    }
  
    public delete(key: string): boolean {
      return this.data.delete(key);
    }
  
    public clear(): void {
      this.data.clear();
    }
  }