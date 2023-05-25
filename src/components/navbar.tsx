'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const path = usePathname()

  return (
    <div className="relative flex w-full flex-wrap items-center justify-center space-x-28 bg-neutral-100 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
      <Link href="/" className={path == '/' ? 'text-sky-500 font-bold' : ''}>Personas</Link>
      <Link href="/incidents" className={path == '/incidents' ? 'text-sky-500 font-bold' : ''}>Incidentes</Link>
      <Link href="/absences" className={path == '/absences' ? 'text-sky-500 font-bold' : ''}>Ausencias</Link>
    </div>
  );
}
