import loadable from '@loadable/component';

export const Header = loadable(() => import(/* webpackChunkName: "Header" */ './Header'));
export const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ './Footer'));