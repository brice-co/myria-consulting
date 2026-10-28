import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

/** Explicit locale is supplied by the current page layout/provider.
 * Non-localized pages keep English as the safe default.
 */
export default getRequestConfig(async ({requestLocale}) => {
 const requested = await requestLocale;
 const locale = requested && routing.locales.includes(requested as "en" | "fr")
   ? requested
   : routing.defaultLocale;
 return {locale, messages: (await import(`../messages/${locale}.json`)).default};
});
