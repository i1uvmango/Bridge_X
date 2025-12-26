'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: '홈' },
        { href: '/chat', label: '상담 시작' },
        { href: '/admin', label: '관리자' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B9BD2] to-[#A8D5BA] flex items-center justify-center">
                        <span className="text-xl">🌿</span>
                    </div>
                    <span className="text-xl font-bold gradient-text">마음쉼터</span>
                </Link>

                <div className="flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${pathname === link.href
                                ? 'bg-[#6B9BD2]/20 text-[#5A8BC2] border border-[#6B9BD2]/30'
                                : 'text-gray-600 hover:text-[#5A8BC2] hover:bg-[#6B9BD2]/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
