import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";




export function Footer() {
  return (
    <footer className="border-t border-purple-400/20 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">

        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          {/* Logo + Message */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <Image
              src="/logo.png"
              alt="Prep AI Logo"
              loading="eager"
              width={140}
              height={40}
              className="h-14 w-48 object-contain text-left"
            />

            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Prep smarter, practice better, and crack your dream job
              with AI-powered interview preparation.
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </Link>

            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground"
            >
              Pricing
            </Link>

            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>

            <Link
              href="/support"
              className="transition-colors hover:text-foreground"
            >
              Support
            </Link>
          </div>
        </div>

        <Separator />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prep AI. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="https://github.com" target="_blank">
                <p>Github</p>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild

            >
              <Link href="https://linkedin.com" target="_blank">
                <p>Linkedin</p>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild

            >
              <Link href="https://twitter.com" target="_blank">
                <p>Twitter</p>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild

            >
              <Link href="https://instagram.com" target="_blank">
                <p>Instagram </p>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}