'use client';

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
 * Props for the composed Next.js link.
 * We collapse "to" into "href" and let Next.js render the anchor (no nested <a>).
 */
interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  { to, linkAs, replace, scroll, shallow, prefetch, ...rest },
  { to, linkAs, replace, scroll, shallow, prefetch, ...rest },
  ref
) {
  const locale = useLocale();
  // Ensure leading slash logic does not double up
  const toStr = typeof to === 'string' ? to : to?.toString() || '';
  const href = `/${locale}${toStr.startsWith('/') ? toStr : `/${toStr}`}`;

  return (
    <NextLink
      ref={ref}
      href={href}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      {...rest}
    />
      prefetch={prefetch}
      {...rest}
    />
  );
});

/**
 * AppLinkForNext props
 */
export type AppLinkForNextProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: string | NextLinkProps['href']; // External (string) or internal
  noLinkStyle?: boolean;
  to?: string | NextLinkProps['href']; // Internal destination
  openInNewTab?: boolean;
} & Omit<NextLinkComposedProps, 'to'> &
  Omit<MuiLinkProps, 'href'>;

const AppLinkForNext = forwardRef<HTMLAnchorElement, AppLinkForNextProps>(function AppLinkForNext(props, ref) {
  const {
    activeClassName = 'active',
    activeClassName = 'active',
    as: linkAs,
    className: classNameProp,
    className: classNameProp,
    href,
    noLinkStyle,
    role,
    color = APP_LINK_COLOR,
    underline = APP_LINK_UNDERLINE,
    to,
    sx,
    openInNewTab = Boolean(href),
    ...rest
    openInNewTab = Boolean(href),
    ...rest
  } = props;


  const currentPath = usePathname();
  const destination = to ?? href ?? '';
  const pathname = typeof destination === 'string' ? destination : destination?.toString?.() || '';
  const className = clsx(classNameProp, {
    [activeClassName]: pathname === currentPath && activeClassName,
  });

  const isExternal =
    typeof destination === 'string' &&
    (destination.startsWith('http://') || destination.startsWith('https://') || destination.startsWith('mailto:'));

  const commonLinkProps = {
    color,
    underline,
    ...(openInNewTab && isExternal ? EXTERNAL_LINK_PROPS : {}),
  };

  // External link: use plain <a> or MuiLink.
  if (isExternal) {
    const externalProps = openInNewTab ? EXTERNAL_LINK_PROPS : {};
    if (noLinkStyle) {
      return (
        <a
          ref={ref}
          // eslint-disable-next-line react/no-unknown-property
          className={className}
          href={destination}
          {...commonLinkProps}
          {...rest}
        />
      );
    }
    return <MuiLink ref={ref} className={className} href={destination} sx={sx} {...commonLinkProps} {...rest} />;
  }

  // Internal link: use NextLinkComposed (no nested <a>)
  if (noLinkStyle) {
    return (
      <NextLinkComposed
        ref={ref}
        className={className}
        to={destination}
        linkAs={linkAs}
        {...commonLinkProps}
        {...rest}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed as any}
      ref={ref}
      className={className}
      to={destination as any}
      linkAs={linkAs}
      sx={sx}
      {...commonLinkProps}
      {...rest}
    />
  );
});

export default AppLinkForNext;