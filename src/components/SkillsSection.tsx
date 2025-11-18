import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SkillsSection as SkillsSectionType } from "@/lib/resume-types";

interface SkillsSectionProps {
	skills: SkillsSectionType;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
	// Define skill proficiency levels (you can adjust these based on your expertise)
	const skillProficiency: Record<string, number> = {
		Typescript: 95,
		JavaScript: 95,
		Python: 80,
		Go: 60,
		SQL: 75,
		"Node.js": 90,
		Mocha: 85,
		Playwright: 95,
		Jest: 85,
		Postman: 80,
		behave: 75,
		pytest: 80,
		"k6.io": 70,
		"Github Actions": 85,
		Jenkins: 80,
		Docker: 75,
		Jira: 90,
		Zephyr: 85,
		Xray: 85,
		Linear: 80,
		Grafana: 75,
	};

	return (
		<section className="py-12 px-4 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<Code2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
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
											className="text-xs font-normal border-purple-600/30"
										>
											{item.keywords.length} tools
										</Badge>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{item.keywords.map((keyword) => {
											const proficiency = skillProficiency[keyword] || 70;
											return (
												<div key={`${item.id}-keyword-${keyword}`}>
													<div className="flex justify-between items-center mb-2">
														<Badge
															variant="secondary"
															className="text-xs dark:bg-gray-700 dark:text-gray-200"
														>
															{keyword}
														</Badge>
														<span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
															{proficiency}%
														</span>
													</div>
													<Progress
														value={proficiency}
														className="h-2 bg-gray-200 dark:bg-gray-700"
													/>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						))}
				</div>
			</div>
		</section>
	);
}
