// src/components/page-navbar.tsx
import { DiscordSVG, GithubSVG, YoutubeSVG } from "./media-icons";
export default function PageNavbar() {
  return (
    <nav className="w-full h-14 border-b border-zinc-800 bg-black flex items-center justify-between px-6 z-50">
      {/* Left side: Logo */}
      <div className="flex items-center gap-2 text-white">
        <img src="/logo_icon.svg" alt="Apex Pathing" className="mr-1 size-7" />
        <span className="font-mono font-bold tracking-tight">Apex Pathing</span>
      </div>

      {/* Right side: Links */}
      <div className="flex items-center gap-6 font-mono text-sm text-zinc-400">
        <a
          href="https://github.com/ApexPathing"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://discord.gg/qpP4CXaHDg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Discord
        </a>
      </div>
    </nav>
  );
}