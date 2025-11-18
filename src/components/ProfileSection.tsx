import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SummarySection } from "@/lib/resume-types";

interface ProfileSectionProps {
	summary: SummarySection;
}

export function ProfileSection({ summary }: ProfileSectionProps) {
	return (
		<section className="py-12 px-4 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<Card className="dark:bg-gray-800 dark:border-gray-700">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">
							{summary.name}
						</CardTitle>
					</CardHeader>
					<CardContent>
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
