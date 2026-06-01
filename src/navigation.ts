import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Inicio', href: '/' },
    { text: 'Quiénes Somos', href: getPermalink('/about') },
    { text: 'Eventos', href: getBlogPermalink() },
    { text: 'Colabora', href: getPermalink('/colabora') },
    { text: 'Contacto', href: '/#contacto' }, // <-- Reintegrado para navegación fluida
    { text: 'Gran Chapter 🏛️', href: 'https://www.wsuruguay.com' },
  ],
  actions: [{ text: 'Contacto', href: '/#contacto', variant: 'primary' }],
  showToggleTheme: false,
};

export const footerData = {
  links: [
    {
      title: 'Nuestra Orden',
      links: [
        { text: 'Gran Chapter de Uruguay', href: 'https://www.wsuruguay.com' },
        { text: 'Quiénes Somos', href: getPermalink('/about') },
        { text: 'Eventos del Norte', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Chapter Hermanos',
      links: [
        { text: 'Chapter Río Cuareim', href: 'https://www.wsriocuareim.com' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Fraternidad', href: '#' },
    { text: 'Servicio', href: '#' },
    { text: 'Honor', href: '#' },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/tu_cuenta_riocuareim' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/tu_cuenta_riocuareim' },
  ],
  footNote: `
    Diseñado por STEB · Widows Sons Río Cuareim © 2026
  `,
};
