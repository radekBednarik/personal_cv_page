import { SiGithub } from "@icons-pack/react-simple-icons";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { triggerHaptic } from "@/lib/haptics";

// Custom LinkedIn icon component using official LinkedIn brand SVG
function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="currentColor"
		>
			<title>LinkedIn</title>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

interface HeaderProps {
	githubUrl?: string;
	linkedinUrl?: string;
}

export default function Header({ githubUrl, linkedinUrl }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY;
			const scrollableHeight = documentHeight - windowHeight;
			const progress = (scrollTop / scrollableHeight) * 100;
			setScrollProgress(Math.min(100, Math.max(0, progress)));
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initialize on mount

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (id: string) => {
		triggerHaptic(); // Trigger haptic feedback on mobile devices
		const element = document.getElementById(id);
		if (element) {
			const headerOffset = 64; // Height of sticky header (h-16 = 4rem = 64px)
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
		setIsOpen(false);
	};

	const navItems = [
		{ id: "profile", label: "About" },
		{ id: "testing-philosophy", label: "Testing Philosophy" },
		{ id: "experience", label: "Experience" },
		{ id: "media", label: "Media" },
		{ id: "skills", label: "Skills" },
		{ id: "education", label: "Education" },
		{ id: "certifications", label: "Certifications" },
		{ id: "languages", label: "Languages" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800 dark:supports-[backdrop-filter]:bg-gray-900/60">
			<div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4 relative">
				{/* Mobile Menu */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
							aria-label="Open menu"
							onTouchStart={() => triggerHaptic()}
						>
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="dark:bg-gray-900 dark:border-gray-800"
					>
						<SheetHeader>
							<SheetTitle className="dark:text-gray-100">Navigation</SheetTitle>
						</SheetHeader>
						<nav
							className="flex flex-col gap-4 mt-8 px-4"
							aria-label="Mobile navigation"
						>
							{navItems.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => scrollToSection(item.id)}
									className="text-left text-base font-medium text-gray-700 hover:text-purple-600 active:text-purple-700 active:bg-purple-50 transition-colors dark:text-gray-300 dark:hover:text-purple-400 dark:active:text-purple-300 dark:active:bg-purple-900/30 py-2 px-3 rounded-md"
								>
									{item.label}
								</button>
							))}
						</nav>
					</SheetContent>
				</Sheet>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex gap-6" aria-label="Main navigation">
					{navItems.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => scrollToSection(item.id)}
							className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400"
						>
							{item.label}
						</button>
					))}
				</nav>

				<div className="flex gap-2">
					{githubUrl && (
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
						>
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Github"
								onTouchStart={() => triggerHaptic()}
							>
								<SiGithub className="h-5 w-5" />
							</a>
						</Button>
					)}
					{linkedinUrl && (
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
						>
							<a
								href={linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								onTouchStart={() => triggerHaptic()}
							>
								<LinkedInIcon className="h-5 w-5" />
							</a>
						</Button>
					)}
				</div>
			</div>
			{/* Scroll Progress Bar */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800">
				<div
					className="h-full bg-purple-600 dark:bg-purple-400 transition-all duration-150 ease-out"
					style={{ width: `${scrollProgress}%` }}
					aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
					role="progressbar"
					aria-valuenow={Math.round(scrollProgress)}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>
		</header>
	);
}
