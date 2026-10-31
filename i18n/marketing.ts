import type {AbstractIntlMessages} from "next-intl";
import english from "@/messages/en.json";
import french from "@/messages/fr.json";

export type MarketingLocale = "en" | "fr";
export function getMarketingMessages(locale: MarketingLocale): AbstractIntlMessages {
  return locale === "fr" ? french : english;
}
/** Keep locale selection independent of authorization and organization state. */
export function getMarketingLocale(pathname: string): MarketingLocale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}
