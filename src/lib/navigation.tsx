'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter as useNextRouter, usePathname, useSearchParams, useParams } from 'next/navigation';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  replace?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, to, prefetch = true, scroll = true, children, className, ...props },
  ref
) {
  const target = href || to || '#';
  return (
    <NextLink ref={ref} href={target} prefetch={prefetch} scroll={scroll} className={className} {...props}>
      {children}
    </NextLink>
  );
});
Link.displayName = 'Link';


export function useLocation(): [string, (to: string, options?: { replace?: boolean }) => void] {
  const pathname = usePathname() || '/';
  const router = useNextRouter();

  const navigate = React.useCallback(
    (to: string, options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    },
    [router]
  );

  return [pathname, navigate];
}

export function useSearch(): string {
  const searchParams = useSearchParams();
  return searchParams?.toString() || '';
}

export function useRoute(pattern: string): [boolean, Record<string, string>] {
  const pathname = usePathname() || '/';
  const params = useParams() || {};
  const isMatch = pathname.startsWith(pattern.split(':')[0]);
  return [isMatch, (params as Record<string, string>) || {}];
}

export { useNextRouter as useRouter, usePathname, useSearchParams, useParams };
export default Link;
