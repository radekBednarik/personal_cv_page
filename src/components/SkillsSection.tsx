import { Code2 } from "lucide-react";
import { ToolBadge } from "@/components/ToolBadge";
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
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase">
						{skills.name}
					</h2>
				</div>

				<div className="space-y-8">
					{skills.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card
								key={item.id}
								className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700"
							>
								<CardHeader>
									<CardTitle className="text-lg text-purple-600 dark:text-purple-400 flex items-center gap-2">
										{item.name}
										<Badge
											variant="outline"
											className="text-xs font-normal border-purple-600/30 text-gray-700 dark:text-gray-300"
										>
											{item.keywords.length} tools
										</Badge>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										{item.keywords.map((keyword) => (
											<ToolBadge
												key={`${item.id}-keyword-${keyword}`}
												tool={keyword}
												className="bg-purple-600 hover:bg-purple-600/90 dark:bg-purple-400 dark:hover:bg-purple-400/90"
											/>
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
