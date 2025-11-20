import { Github, Linkedin, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { triggerHaptic } from "@/lib/haptics";

interface HeaderProps {
	githubUrl?: string;
	linkedinUrl?: string;
}

export default function Header({ githubUrl, linkedinUrl }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

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
		{ id: "skills", label: "Skills" },
		{ id: "education", label: "Education" },
		{ id: "certifications", label: "Certifications" },
		{ id: "languages", label: "Languages" },
	];

	return (
		<header
			className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800 dark:supports-[backdrop-filter]:bg-gray-900/60"
			role="banner"
		>
			<div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
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
								<Github className="h-5 w-5" />
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
								<Linkedin className="h-5 w-5" />
							</a>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
