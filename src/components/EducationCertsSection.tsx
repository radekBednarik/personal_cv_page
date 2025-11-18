import { Award, Calendar, GraduationCap, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
	CertificationsSection,
	EducationSection,
	LanguagesSection,
} from "@/lib/resume-types";

interface EducationCertsSectionProps {
	education: EducationSection;
	certifications: CertificationsSection;
	languages: LanguagesSection;
}

export function EducationCertsSection({
	education,
	certifications,
	languages,
}: EducationCertsSectionProps) {
	return (
		<section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				{/* Education Section */}
				<div className="flex items-center gap-3 mb-8">
					<GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						{education.name}
					</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2 mb-12">
					{education.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card
								key={item.id}
								className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
							>
								<CardHeader>
									<CardTitle className="text-lg text-purple-600 dark:text-purple-400">
										{item.institution}
									</CardTitle>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{item.studyType} - {item.area}
									</p>
									<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
										<Calendar className="h-4 w-4" />
										<span>{item.date}</span>
									</div>
								</CardHeader>
								<CardContent>
									<div
										className="prose prose-sm max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
										dangerouslySetInnerHTML={{ __html: item.summary }}
									/>
								</CardContent>
							</Card>
						))}
				</div>

				{/* Certifications Section */}
				{certifications.items.length > 0 && (
					<>
						<div className="flex items-center gap-3 mb-8">
							<Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
							<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
								{certifications.name}
							</h2>
						</div>

						<div className="grid gap-6 mb-12">
							{certifications.items
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
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{item.issuer}
											</p>
											<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
												<Calendar className="h-4 w-4" />
												<span>{item.date}</span>
											</div>
										</CardHeader>
										<CardContent>
											<div
												className="prose prose-sm max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert"
												// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
												dangerouslySetInnerHTML={{ __html: item.summary }}
											/>
										</CardContent>
									</Card>
								))}
						</div>
					</>
				)}

				{/* Languages Section */}
				{languages.items.length > 0 && (
					<>
						<div className="flex items-center gap-3 mb-8">
							<Languages className="h-8 w-8 text-purple-600 dark:text-purple-400" />
							<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
								{languages.name}
							</h2>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							{languages.items
								.filter((item) => item.visible)
								.map((item) => (
									<Card
										key={item.id}
										className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
									>
										<CardHeader>
											<CardTitle className="text-lg text-purple-600 dark:text-purple-400 mb-4">
												{item.name}
											</CardTitle>
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm text-gray-600 dark:text-gray-400">
														Proficiency
													</span>
													<Badge
														variant="secondary"
														className="dark:bg-gray-700 dark:text-gray-200"
													>
														{item.level}/5
													</Badge>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-purple-100 dark:bg-gray-700">
													<div
														className="h-full bg-purple-600 dark:bg-purple-400 transition-all"
														style={{ width: `${(item.level / 5) * 100}%` }}
													/>
												</div>
											</div>
										</CardHeader>
									</Card>
								))}
						</div>
					</>
				)}
			</div>
		</section>
	);
}
