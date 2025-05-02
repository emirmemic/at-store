// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POPUP_TYPES = ['none', 'menu', 'search'] as const;
type PopupType = (typeof POPUP_TYPES)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOBILE_MENU_TYPES = ['list', 'sub-list', 'search'] as const;
type MobileMenuType = (typeof MOBILE_MENU_TYPES)[number];

export type { PopupType, MobileMenuType };
