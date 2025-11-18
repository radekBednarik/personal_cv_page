import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Basics } from "@/lib/resume-types";

interface HeroSectionProps {
	basics: Basics;
}

export function HeroSection({ basics }: HeroSectionProps) {
	return (
		<section className="relative bg-gradient-to-b from-[#65B230]/10 to-transparent dark:from-[#65B230]/20 dark:to-gray-900/50 py-16 px-4">
			<div className="container mx-auto max-w-4xl">
				<div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
					<Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#65B230] shadow-xl">
						<AvatarImage src={basics.picture.url} alt={basics.name} />
						<AvatarFallback className="text-2xl dark:bg-gray-700 dark:text-gray-100">
							{basics.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
							{basics.name}
						</h1>
						<p className="text-xl md:text-2xl text-[#65B230] dark:text-[#7CC842] font-semibold mb-4">
							{basics.headline}
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
							<Button
								variant="default"
								className="bg-[#65B230] hover:bg-[#65B230]/90"
								asChild
							>
								<a href={`mailto:${basics.email}`}>
									<Mail className="mr-2 h-4 w-4" />
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
