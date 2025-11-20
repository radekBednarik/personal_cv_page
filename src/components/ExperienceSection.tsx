import {
	Calendar,
	CheckCircle2,
	ChevronDown,
	ExternalLink,
	Newspaper,
	TestTube,
} from "lucide-react";
import { useState } from "react";
import { ToolBadge } from "@/components/ToolBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
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
	const companyLinks: Record<string, string> = {
		"Soundtrack.io": "https://www.soundtrack.io/",
		"Komerční banka": "https://www.kb.cz/",
		"Skoda Auto": "https://www.skoda-auto.com/",
	};

	const renderCompanyName = (
		company: string,
		colorClass: string = "text-purple-600 dark:text-purple-400",
	) => {
		const url = companyLinks[company];
		if (url) {
			return (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className={`hover:underline inline-flex items-center gap-2 ${colorClass} font-semibold`}
				>
					<span className="inline-flex items-start gap-1">
						{company}
						<ExternalLink className="h-3 w-3" />
					</span>
				</a>
			);
		}
		return <span className={`${colorClass} font-semibold`}>{company}</span>;
	};

	const formatDate = (startDate: string, endDate: string) => {
		if (!endDate) {
			return `${startDate} - Present`;
		}
		return `${startDate} - ${endDate}`;
	};

	const [isOtherExperienceExpanded, setIsOtherExperienceExpanded] =
		useState(false);

	const toggleOtherExperience = () => {
		setIsOtherExperienceExpanded((prev) => !prev);
	};

	return (
		<section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<TestTube className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase">
						QA Experience
					</h2>
				</div>

				<Carousel className="w-full" opts={{ loop: true }}>
					<CarouselContent>
						{experience.items
							.filter((item) => item.visible)
							.map((item) => (
								<CarouselItem key={item.id}>
									<Card className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
										{/* Timeline indicator */}
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 dark:bg-purple-400" />

										<CardHeader className="pl-6 pr-4 pt-6">
											{/* Quality Badge */}
											<div className="flex justify-end mb-2">
												<Badge className="bg-success hover:bg-success text-success-foreground flex items-center gap-1">
													<CheckCircle2 className="h-3 w-3" />
													PASSED
												</Badge>
											</div>

											<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
												<div className="flex-1">
													<CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
														{item.position}
													</CardTitle>
													<div className="text-lg mb-2">
														{renderCompanyName(
															item.company,
															"text-purple-600 dark:text-purple-400",
														)}
													</div>
													{item.project && (
														<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
															Project: {item.project}
														</p>
													)}
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
															<ToolBadge
																key={`${item.id}-tool-${tool}`}
																tool={tool}
																className="bg-purple-600 hover:bg-purple-600/90 dark:bg-purple-400 dark:hover:bg-purple-400/90"
															/>
														))}
													</div>
												</div>
											)}
										</CardContent>
									</Card>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious
						size="icon-lg"
						className="left-2 bg-background/90 dark:bg-gray-900/90 border border-border shadow-sm"
					/>
					<CarouselNext
						size="icon-lg"
						className="right-2 bg-background/90 dark:bg-gray-900/90 border border-border shadow-sm"
					/>
				</Carousel>

				{/* Other Experience Section */}
				{projects && projects.items.length > 0 && (
					<>
						<button
							type="button"
							onClick={toggleOtherExperience}
							className="flex items-center gap-2 mt-12 mb-6 w-full hover:opacity-80 transition-opacity"
							aria-expanded={isOtherExperienceExpanded}
							aria-label={
								isOtherExperienceExpanded
									? "Collapse other experience"
									: "Expand other experience"
							}
						>
							<Newspaper className="h-6 w-6 text-gray-600 dark:text-gray-400" />
							<h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 uppercase">
								{projects.name}
							</h3>
							<ChevronDown
								className={`h-5 w-5 text-gray-600 dark:text-gray-400 transform transition-transform duration-200 ${
									isOtherExperienceExpanded ? "rotate-180" : "rotate-0"
								}`}
							/>
						</button>

						{isOtherExperienceExpanded && (
							<div className="space-y-6">
								{projects.items
									.filter((item) => item.visible)
									.map((item) => (
										<Card
											key={item.id}
											className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
										>
											<div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-400 dark:bg-gray-600" />

											<CardHeader className="pl-6">
												<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
													<div className="flex-1">
														<CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
															{item.position}
														</CardTitle>
														<div className="text-lg">
															{renderCompanyName(
																item.company,
																"text-gray-700 dark:text-gray-300",
															)}
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
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												/>
											</CardContent>
										</Card>
									))}
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
}
