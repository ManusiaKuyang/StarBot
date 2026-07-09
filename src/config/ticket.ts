export const TICKET_CONFIG = {
  PANEL_CHANNEL_ID: '1522624328472985600',
  LOG_CHANNEL_ID: '1522624354763145352',
  OWNER_ROLE_ID: '1520842576880472206',
  STAFF_ROLE_ID: '1520842574850691173',
  TICKET_CATEGORY_ID: '' as string, // Cast as general string to allow trimming checks
  BUTTON_ID: 'guild_apply',
  ACCEPT_ID: 'ticket_accept',
  REJECT_ID: 'ticket_reject',
  CANCEL_ID: 'ticket_cancel',
} as const;
