/// <reference types="astro/client" />

interface Env {
  PLUNK_SECRET_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  GA_TRACKING_ID: string;
  GTM_CONTAINER_ID: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
