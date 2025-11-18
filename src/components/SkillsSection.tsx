import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillsSection as SkillsSectionType } from "@/lib/resume-types";

interface SkillsSectionProps {
	skills: SkillsSectionType;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
	return (
		<section className="py-12 px-4 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<Code2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						{skills.name}
					</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{skills.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card
								key={item.id}
								className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
							>
								<CardHeader>
									<CardTitle className="text-lg text-purple-600 dark:text-purple-400">
										{item.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										{item.keywords.map((keyword) => (
											<Badge
												key={`${item.id}-keyword-${keyword}`}
												variant="secondary"
												className="text-xs dark:bg-gray-700 dark:text-gray-200"
											>
												{keyword}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						))}
				</div>
			</div>
		</section>
	);
}
