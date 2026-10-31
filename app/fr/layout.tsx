import {NextIntlClientProvider} from "next-intl";
import messages from "@/messages/fr.json";

/**
 * Transitional French boundary: inherits the current shared root layout.
 * Locale-aware document <html lang> requires the later route-group migration.
 */
export default function FrenchMarketingLayout({children}: {children: React.ReactNode}) {
 return <NextIntlClientProvider locale="fr" messages={messages}>{children}</NextIntlClientProvider>;
}
