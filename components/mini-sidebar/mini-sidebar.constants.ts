import { INavLink } from "@/lib/ui/models/nav-link.model";

export const MINI_SIDEBAR_NAV_ENDPOINTS: INavLink[] = [
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
    url: 'likes',
    icon: 'thumb_up_off_alt',
    type: 'bottom',
  },
];