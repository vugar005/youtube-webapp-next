import { INavLink } from "@/lib/ui/models/nav-link.model";

export const SIDEBAR_NAV_ENDPOINTS: INavLink[] = [
  {
    text: 'Home',
    url: '',
    icon: 'home',
    type: 'top',
  },
  {
    text: 'History',
    url: 'history',
    icon: 'history',
    type: 'bottom',
  },
  {
    text: 'Liked videos',
    url: 'liked',
    icon: 'thumb_up_off_alt',
    type: 'bottom',
  },
];