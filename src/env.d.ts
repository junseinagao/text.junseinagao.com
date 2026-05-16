/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    PLUNK_SECRET_KEY: string;
    CONTACT_TO_EMAIL: string;
    CONTACT_FROM_EMAIL: string;
    GA_TRACKING_ID: string;
    GTM_CONTAINER_ID: string;
  }
}

// oxlint-disable-next-line typescript/consistent-type-imports -- ambient .d.ts must remain a global script (no top-level imports)
type Runtime = import("@astrojs/cloudflare").Runtime;

declare namespace App {
  type Locals = Runtime;
}
