import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SummarySection } from "@/lib/resume-types";

interface ProfileSectionProps {
	summary: SummarySection;
}

export function ProfileSection({ summary }: ProfileSectionProps) {
	return (
		<section className="py-12 px-4 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<User className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						{summary.name}
					</h2>
				</div>

				<Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
					<CardContent className="pt-6">
						<div
							className="prose prose-lg max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
							dangerouslySetInnerHTML={{ __html: summary.content }}
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
