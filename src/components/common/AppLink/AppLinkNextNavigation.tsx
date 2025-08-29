'use client';
// See: https://github.com/mui-org/material-ui/blob/6b18675c7e6204b77f4c469e113f62ee8be39178/examples/nextjs-with-typescript/src/Link.tsx
/* eslint-disable jsx-a11y/anchor-has-content */
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { APP_LINK_COLOR, APP_LINK_UNDERLINE } from '../../config';

export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

/**
 * Props for NextLinkComposed component
 */
interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

// Composed Next.js Link that auto‑prefixes locale
const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  { to, linkAs, replace, scroll, shallow, prefetch, ...rest },
  ref
) {
  const locale = useLocale();
  const finalHref =
    typeof to === 'string'
      ? // ensure single slash between locale and path
        `/${locale}${to.startsWith('/') ? to : `/${to}`}`
      : to;

  return (
    <NextLink
      ref={ref}
      href={finalHref}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      {...rest}
    />
  );
});

/**
 * Props for AppLinkForNext component
 */
export type AppLinkForNextProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: string | NextLinkProps['href'];
  noLinkStyle?: boolean;
  to?: string | NextLinkProps['href'];
  openInNewTab?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs'> &
  Omit<MuiLinkProps, 'href'>;

/**
 * Material UI link for NextJS
 * A styled version of the Next.js Link component: https://nextjs.org/docs/#with-link
 * @component AppLinkForNext
 * @param {string} [activeClassName] - class name for active link, applied when the router.pathname matches .href or .to props
 * @param {string} [as] - passed to NextJS Link component in .as prop
 * @param {string} [className] - class name for <a> tag or NextJS Link component
 * @param {object|function} children - content to wrap with <a> tag
 * @param {string} [color] - color of the link
 * @param {boolean} [noLinkStyle] - when true, link will not have MUI styles
 * @param {string} [to] - internal link URI
 * @param {string} [href] - external link URI
 * @param {boolean} [openInNewTab] - link will be opened in new tab when true
 * @param {string} [underline] - controls "underline" style of the MUI link: 'hover' | 'always' | 'none'
 */
const AppLinkForNext = forwardRef<HTMLAnchorElement, AppLinkForNextProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProp,
    href,
    noLinkStyle,
    color = APP_LINK_COLOR,
    underline = APP_LINK_UNDERLINE,
    to,
    sx,
    openInNewTab = Boolean(href),
    ...rest
  } = props;

  const currentPath = usePathname();
  const destination = to ?? href ?? '';
  const pathname = typeof destination === 'string' ? destination : destination.pathname;
  const className = clsx(classNameProp, {
    [activeClassName]: pathname === currentPath && activeClassName,
  });

  const isExternal =
    typeof destination === 'string' &&
    (destination.startsWith('http://') ||
      destination.startsWith('https://') ||
      destination.startsWith('mailto:') ||
      destination.startsWith('tel:'));

  const common = {
    className,
    color,
    underline,
    sx,
    ref,
    ...rest,
  };

  if (isExternal) {
    const externalProps = openInNewTab ? EXTERNAL_LINK_PROPS : {};
    if (noLinkStyle) {
      return <a href={destination as string} {...externalProps} {...common} />;
    }
    return <MuiLink href={destination as string} {...externalProps} {...common} />;
  }

  if (noLinkStyle) {
    return <NextLinkComposed to={destination} linkAs={linkAs} {...common} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      to={destination}
      linkAs={linkAs}
      {...common}
    />
  );
});

export default AppLinkForNext;