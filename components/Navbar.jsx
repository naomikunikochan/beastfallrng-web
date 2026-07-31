"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonShineHoverDemo from "@/components/ui/shine-hover";

const gameMenus = [
    {
        name: "Apa itu Beastfall RNG?",
        href: "/game/apa-itu-beastfall-rng",
    },
    {
        name: "Cara Bermain",
        href: "/game/panduan",
    },
    {
        name: "Weapon",
        href: "/game/weapon",
    },
    {
        name: "Map",
        href: "/game/map",
    },
];

const socialMenus = [
    {
        name: "TikTok",
        href: "https://www.tiktok.com/@5s.stud1o",
    }
];

function ArrowIcon({ open }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                }`}
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MenuIcon({ open }) {
    return open ? (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
        </svg>
    ) : (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M4 7H20M4 12H20M4 17H20" strokeLinecap="round" />
        </svg>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    function toggleDropdown(name) {
        setActiveDropdown((current) => (current === name ? null : name));
    }

    function closeMenus() {
        setActiveDropdown(null);
        setMobileOpen(false);
    }

    const linkStyle =
        "relative text-sm font-semibold text-slate-300 transition after:absolute after:left-0 after:-bottom-[30px] after:h-0.5 after:w-0 after:bg-[#3874FF] after:transition-all hover:text-white hover:after:w-full";

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenus}
                    className="flex shrink-0 items-center gap-3"
                >
                    <Image
                        src="/logo.png"
                        alt="Logo Beastfall RNG"
                        width={240}
                        height={64}
                        priority
                        className="h-10 w-auto object-contain sm:h-12"
                    />
                </Link>

                {/* Menu desktop */}
                <div className="hidden items-center gap-7 lg:flex">
                    <Link href="/artikel" className={linkStyle}>
                        Artikel
                    </Link>

                    {/* Dropdown game */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown("game")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            type="button"
                            onClick={() => toggleDropdown("game")}
                            aria-expanded={activeDropdown === "game"}
                            className={`${linkStyle} flex items-center gap-1`}
                        >
                            Game
                            <ArrowIcon open={activeDropdown === "game"} />
                        </button>

                        {activeDropdown === "game" && (
                            <div className="absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-8">
                                <div className="border border-white/10 bg-black shadow-2xl">
                                    {gameMenus.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeMenus}
                                            className="block border-b border-white/10 px-5 py-4 text-sm font-semibold text-white transition last:border-b-0 hover:bg-white/10"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/media" className={linkStyle}>
                        Media
                    </Link>

                    <Link href="/lapor-bug" className={linkStyle}>
                        Lapor Bug
                    </Link>

                    {/* Dropdown sosial media */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown("social")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            type="button"
                            onClick={() => toggleDropdown("social")}
                            aria-expanded={activeDropdown === "social"}
                            className={`${linkStyle} flex items-center gap-1`}
                        >
                            Social Media
                            <ArrowIcon open={activeDropdown === "social"} />
                        </button>

                        {activeDropdown === "social" && (
                            <div className="absolute right-0 top-full w-44 pt-8">
                                <div className="border border-white/10 bg-black shadow-2xl">
                                    {socialMenus.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block border-b border-white/10 px-5 py-4 text-sm font-semibold text-white transition last:border-b-0 hover:bg-white/10"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tombol kanan desktop */}
                <ButtonShineHoverDemo
                    asChild
                    className="hidden rounded-xl bg-[#2563EB] px-5 py-3 text-base font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8] lg:inline-flex"
                >
                    <a
                        href="https://www.roblox.com/games/106592528242987"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Mainkan Sekarang
                    </a>
                </ButtonShineHoverDemo>

                {/* Tombol hamburger */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((current) => !current)}
                    aria-label="Buka menu"
                    aria-expanded={mobileOpen}
                    className="rounded-xl border border-white/10 p-2.5 text-white transition hover:border-[#3874FF]/50 hover:text-[#3874FF] lg:hidden"
                >
                    <MenuIcon open={mobileOpen} />
                </button>
            </nav>

            <div
                className={`fixed inset-0 top-20 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={closeMenus}
            />

            {/* Menu mobile */}
            <div
                className={`fixed left-0 right-0 top-20 z-50 border-t border-white/10 bg-black px-5 py-5 shadow-2xl transition duration-300 lg:hidden ${mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"}`}
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        <Link
                            href="/artikel"
                            onClick={closeMenus}
                            className="rounded-xl px-4 py-3 font-semibold text-slate-300 hover:bg-white/5 hover:text-[#3874FF]"
                        >
                            Artikel
                        </Link>

                        {/* Dropdown game mobile */}
                        <div>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("mobile-game")}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-slate-300 hover:bg-white/5 hover:text-[#3874FF]"
                            >
                                Game
                                <ArrowIcon open={activeDropdown === "mobile-game"} />
                            </button>

                            {activeDropdown === "mobile-game" && (
                                <div className="ml-4 mt-1 border-l border-[#3874FF]/30 pl-3">
                                    {gameMenus.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeMenus}
                                            className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-[#3874FF]"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/media"
                            onClick={closeMenus}
                            className="rounded-xl px-4 py-3 font-semibold text-slate-300 hover:bg-white/5 hover:text-[#3874FF]"
                        >
                            Media
                        </Link>

                        <Link
                            href="/lapor-bug"
                            onClick={closeMenus}
                            className="rounded-xl px-4 py-3 font-semibold text-slate-300 hover:bg-white/5 hover:text-[#3874FF]"
                        >
                            Lapor Bug
                        </Link>

                        {/* Dropdown sosial media mobile */}
                        <div>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("mobile-social")}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-slate-300 hover:bg-white/5 hover:text-[#3874FF]"
                            >
                                Social Media
                                <ArrowIcon open={activeDropdown === "mobile-social"} />
                            </button>

                            {activeDropdown === "mobile-social" && (
                                <div className="ml-4 mt-1 border-l border-[#3874FF]/30 pl-3">
                                    {socialMenus.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-[#3874FF]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <ButtonShineHoverDemo
                            asChild
                            className="mt-3 flex justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#1D4ED8]"
                        >
                            <a
                                href="https://www.roblox.com/games/106592528242987"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Mainkan Sekarang
                            </a>
                        </ButtonShineHoverDemo>
                </div>
            </div>
        </header>
    );
}
