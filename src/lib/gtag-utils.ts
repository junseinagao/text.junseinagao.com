interface GTMConfig {
  containerId?: string;
}

const warn = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.warn(...args);
};

class GTM {
  CONTAINER_ID?: string;

  initialized = false;

  configure(config: GTMConfig) {
    if (!config.containerId) {
      warn("GTM requires a GTM ID to be loaded.");
      return;
    }

    this.CONTAINER_ID = config.containerId;
  }

  initialize(config: GTMConfig) {
    if (this.initialized) {
      warn("GTM can only be initialized once.");
      return;
    }

    if (!document) {
      warn("GTM can be initialized only on client side.");
      return;
    }

    this.configure(config);

    if (!this.CONTAINER_ID) {
      return;
    }

    const script = document.createElement("script");
    const noscript = document.createElement("noscript");

    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.CONTAINER_ID}');
    `;
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${this.CONTAINER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;

    document.head.insertBefore(script, document.head.childNodes[0]);
    document.body.insertBefore(noscript, document.body.childNodes[0]);
  }

  push(...args: any[]) {
    if (!window) {
      warn("GTM push works only on client side.");
      return;
    }

    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }

    (window as any).dataLayer.push(...args);
  }
}

export const gtm = new GTM();
