import {defineRouting} from "next-intl/routing";

/**
 * English URLs remain unprefixed; French marketing URLs use /fr.
 * A global proxy is deliberately NOT enabled until all public routes are
 * migrated into locale-aware app segments. That avoids rewriting portal/auth.
 */
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false
});
