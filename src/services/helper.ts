export class HelperServices {
  async sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isNotEmptyObject(obj: Object): boolean {
    return Object.keys(obj).length > 0;
  }

  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}
