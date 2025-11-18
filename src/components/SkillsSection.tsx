import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillsSection as SkillsSectionType } from "@/lib/resume-types";

interface SkillsSectionProps {
	skills: SkillsSectionType;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
	return (
		<section className="py-12 px-4">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<Code2 className="h-8 w-8 text-[#65B230]" />
					<h2 className="text-3xl font-bold text-gray-900">{skills.name}</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{skills.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card key={item.id} className="hover:shadow-lg transition-shadow">
								<CardHeader>
									<CardTitle className="text-lg text-[#65B230]">
										{item.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										{item.keywords.map((keyword) => (
											<Badge
												key={`${item.id}-keyword-${keyword}`}
												variant="secondary"
												className="text-xs"
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
