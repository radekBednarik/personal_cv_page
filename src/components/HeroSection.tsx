import { CheckCircle2, Code2, FlaskConical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { triggerHaptic } from "@/lib/haptics";
import type { Basics } from "@/lib/resume-types";

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

interface HeroSectionProps {
	basics: Basics;
}

export function HeroSection({ basics }: HeroSectionProps) {
	return (
		<section
			className="relative bg-gradient-to-b from-purple-600/10 to-transparent dark:from-purple-600/20 dark:to-gray-900/50 py-16 px-4 overflow-hidden"
			aria-labelledby="hero-heading"
		>
			{/* Floating background elements */}
			<div className="absolute top-10 right-10 opacity-10 dark:opacity-20">
				<FlaskConical className="h-16 w-16 md:h-32 md:w-32 text-purple-600 dark:text-purple-400 animate-float" />
			</div>
			<div className="absolute bottom-10 left-10 opacity-10 dark:opacity-20">
				<Code2 className="h-12 w-12 md:h-24 md:w-24 text-purple-600 dark:text-purple-400 animate-float-delayed" />
			</div>

			<div className="container mx-auto max-w-4xl relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
					<div className="relative">
						<Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-purple-600 shadow-xl">
							<AvatarImage src={basics.picture.url} alt={basics.name} />
							<AvatarFallback className="text-2xl dark:bg-gray-700 dark:text-gray-100">
								{basics.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						{/* Quality Badge Overlay */}
						<div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2 shadow-lg animate-pulse-subtle">
							<CheckCircle2 className="h-6 w-6" />
						</div>
					</div>

					<div className="flex-1">
						<div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
							<CheckCircle2 className="h-4 w-4" />
							<span>Quality Assured</span>
						</div>

						{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
						<h1
							id="hero-heading"
							className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2"
						>
							{basics.name}
						</h1>
						<p className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-4">
							{basics.headline}
						</p>

						<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
							<Button
								variant="default"
								className="bg-purple-600 hover:bg-purple-600/90 text-white"
								asChild
							>
								<a
									href="https://www.linkedin.com/in/bednarikradek/"
									target="_blank"
									rel="noopener noreferrer"
									onTouchStart={() => triggerHaptic()}
									onClick={() => {
										trackEvent("select_content", {
											content_type: "link",
											content_id: "linkedin_profile",
											link_text: "Get in Touch",
											link_url: "https://www.linkedin.com/in/bednarikradek/",
										});
									}}
								>
									<LinkedInIcon className="mr-2 h-4 w-4" />
									Get in Touch
								</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
