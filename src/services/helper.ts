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

  loadJs = (file: string, onLoad: () => void) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    script.async = true;
    script.onload = function() {
      onLoad();
    };
    document.body.appendChild(script);
  };
}
