/** Approved EN / FR marketing page pairs. Untranslated routes stay in their original language. */
export const localizedRoutes: Record<string, string> = {
  "/": "/fr",
  "/services": "/fr/services",
  "/contact-myria": "/fr/contact",
  "/insights": "/fr/perspectives",
  "/services/management-consulting": "/fr/services/conseil-en-gestion",
  "/services/business-transformation": "/fr/services/transformation-organisationnelle",
  "/services/operations-excellence": "/fr/services/excellence-operationnelle",
  "/services/change-management": "/fr/services/gestion-du-changement",
  "/services/ai-strategy": "/fr/services/strategie-ia",
  "/services/intelligent-automation": "/fr/services/automatisation-intelligente"
};
export function equivalentLocalePath(pathname: string): string {
  const french = Object.entries(localizedRoutes).find(([, fr]) => fr === pathname);
  if (french) return french[0];
  return localizedRoutes[pathname] ?? pathname;
}
