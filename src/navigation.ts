import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Inicio', href: '/' },
    { text: 'Quiénes Somos', href: getPermalink('/about') },
    { text: 'Eventos', href: getBlogPermalink() },
    { text: 'Colabora', href: getPermalink('/colabora') }, //  <-- Nueva sección
    { text: 'Contacto', href: '/#contacto' },
  ],
  actions: [{ text: 'Contacto', href: '/#contacto', variant: 'primary' }],
  showToggleTheme: false,
};

export const footerData = {
  links: [
    {
      title: 'Capítulo',
      links: [
        { text: 'Quiénes Somos', href: getPermalink('/about') },
        { text: 'Eventos', href: getBlogPermalink() },
        { text: 'Membresía', href: '/#contacto' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { text: 'Instagram', href: 'https://instagram.com/wsriouruguay' },
        { text: 'Facebook', href: 'https://facebook.com/tu_cuenta' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Fraternidad', href: '#' },
    { text: 'Servicio', href: '#' },
    { text: 'Honor', href: '#' },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/wsriouruguay' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/tu_cuenta' },
  ],
  footNote: `
    Diseñado por STEB · Widows Sons Rio Uruguay © 2026
  `,
};
