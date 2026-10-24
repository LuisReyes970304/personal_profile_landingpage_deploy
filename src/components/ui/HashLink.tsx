"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";

type HashLinkProps = ComponentProps<typeof Link> & { href: `#${string}` };

/**
 * In-page anchor link that scrolls to its target even when the hash is
 * already in the URL (where a plain link would do nothing).
 */
export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || window.location.hash !== href) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    // "auto" defers to the CSS scroll-behavior, which honors reduced motion.
    target.scrollIntoView();
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
