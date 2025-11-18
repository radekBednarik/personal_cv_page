import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
	email: string;
	githubUrl?: string;
}

export default function Header({ email, githubUrl }: HeaderProps) {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800 dark:supports-[backdrop-filter]:bg-gray-900/60">
			<div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
				<nav className="flex gap-6">
					<button
						type="button"
						onClick={() => scrollToSection("profile")}
						className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400"
					>
						About
					</button>
					<button
						type="button"
						onClick={() => scrollToSection("experience")}
						className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400"
					>
						Experience
					</button>
					<button
						type="button"
						onClick={() => scrollToSection("skills")}
						className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400"
					>
						Skills
					</button>
					<button
						type="button"
						onClick={() => scrollToSection("education")}
						className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400"
					>
						Education
					</button>
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
							>
								<Github className="h-5 w-5" />
							</a>
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
					>
						<a href={`mailto:${email}`} aria-label="Email">
							<Mail className="h-5 w-5" />
						</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
