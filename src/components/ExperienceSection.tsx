import { Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
	ExperienceSection as ExperienceSectionType,
	ProjectsSection,
} from "@/lib/resume-types";

interface ExperienceSectionProps {
	experience: ExperienceSectionType;
	projects?: ProjectsSection;
}

export function ExperienceSection({
	experience,
	projects,
}: ExperienceSectionProps) {
	const formatDate = (startDate: string, endDate: string) => {
		if (!endDate) {
			return `${startDate} - Present`;
		}
		return `${startDate} - ${endDate}`;
	};

	return (
		<section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
					{experience.name}
				</h2>

				<div className="space-y-6">
					{experience.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card
								key={item.id}
								className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700"
							>
								{/* Timeline indicator */}
								<div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 dark:bg-purple-400" />

								<CardHeader className="pl-6">
									<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
										<div className="flex-1">
											<CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
												{item.position}
											</CardTitle>
											<div className="flex items-center gap-2 text-lg text-purple-600 dark:text-purple-400 font-semibold mb-2">
												<Briefcase className="h-5 w-5" />
												{item.company}
											</div>
											{item.project && (
												<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
													Project: {item.project}
												</p>
											)}
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
											<Calendar className="h-4 w-4" />
											<span>{formatDate(item.startDate, item.endDate)}</span>
										</div>
									</div>
								</CardHeader>

								<CardContent className="pl-6">
									<div
										className="prose prose-sm max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert mb-4"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
										dangerouslySetInnerHTML={{ __html: item.description }}
									/>

									{item.responsibilities.length > 0 && (
										<div className="mb-4">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
												Responsibilities:
											</h4>
											<div className="flex flex-wrap gap-2">
												{item.responsibilities.map((resp) => (
													<Badge
														key={`${item.id}-resp-${resp}`}
														variant="secondary"
														className="dark:bg-gray-700 dark:text-gray-200"
													>
														{resp}
													</Badge>
												))}
											</div>
										</div>
									)}

									{item.tools.length > 0 && (
										<div>
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
												Technologies:
											</h4>
											<div className="flex flex-wrap gap-2">
												{item.tools.map((tool) => (
													<Badge
														key={`${item.id}-tool-${tool}`}
														className="bg-purple-600 hover:bg-purple-600/90 dark:bg-purple-400 dark:hover:bg-purple-400/90"
													>
														{tool}
													</Badge>
												))}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						))}
				</div>

				{/* Other Experience Section */}
				{projects && projects.items.length > 0 && (
					<>
						<Separator className="my-12 dark:bg-gray-700" />
						<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
							{projects.name}
						</h2>

						<div className="space-y-6">
							{projects.items
								.filter((item) => item.visible)
								.map((item) => (
									<Card
										key={item.id}
										className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700"
									>
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-400 dark:bg-gray-600" />

										<CardHeader className="pl-6">
											<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
												<div className="flex-1">
													<CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
														{item.position}
													</CardTitle>
													<div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300 font-semibold">
														<Briefcase className="h-5 w-5" />
														{item.company}
													</div>
												</div>
												<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
													<Calendar className="h-4 w-4" />
													<span>
														{formatDate(item.startDate, item.endDate)}
													</span>
												</div>
											</div>
										</CardHeader>

										<CardContent className="pl-6">
											<div
												className="prose prose-sm max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert"
												// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
												dangerouslySetInnerHTML={{ __html: item.description }}
											/>
										</CardContent>
									</Card>
								))}
						</div>
					</>
				)}
			</div>
		</section>
	);
}
