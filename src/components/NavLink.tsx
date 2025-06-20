'use client';

import { NavLinkProps } from '@/db/helpers/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';




export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
}
