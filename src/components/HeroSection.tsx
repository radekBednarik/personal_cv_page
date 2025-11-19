import { CheckCircle2, Code2, FlaskConical, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { triggerHaptic } from "@/lib/haptics";
import type { Basics } from "@/lib/resume-types";

interface HeroSectionProps {
	basics: Basics;
}

export function HeroSection({ basics }: HeroSectionProps) {
	return (
		<section className="relative bg-gradient-to-b from-purple-600/10 to-transparent dark:from-purple-600/20 dark:to-gray-900/50 py-16 px-4 overflow-hidden">
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

						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
							{basics.name}
						</h1>
						<p className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-4">
							{basics.headline}
						</p>

						<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
							<Button
								variant="default"
								className="bg-purple-600 hover:bg-purple-600/90"
								asChild
							>
								<a
									href="https://www.linkedin.com/in/bednarikradek/"
									target="_blank"
									rel="noopener noreferrer"
									onTouchStart={() => triggerHaptic()}
								>
									<Linkedin className="mr-2 h-4 w-4" />
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
