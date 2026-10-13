export const invitationReturnUrl = (id: string) => `/auth/invitations/${encodeURIComponent(id)}`;
export const signInForInvitationUrl = (id: string) => `/auth/sign-in?returnTo=${encodeURIComponent(invitationReturnUrl(id))}`;
