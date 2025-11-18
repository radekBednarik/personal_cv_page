import { Award, Calendar, GraduationCap, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
		<section className="py-12 px-4 bg-gray-50">
			<div className="container mx-auto max-w-4xl">
				{/* Education Section */}
				<div className="flex items-center gap-3 mb-8">
					<GraduationCap className="h-8 w-8 text-[#65B230]" />
					<h2 className="text-3xl font-bold text-gray-900">{education.name}</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2 mb-12">
					{education.items
						.filter((item) => item.visible)
						.map((item) => (
							<Card key={item.id} className="hover:shadow-lg transition-shadow">
								<CardHeader>
									<CardTitle className="text-lg text-[#65B230]">
										{item.institution}
									</CardTitle>
									<p className="text-sm text-gray-600">
										{item.studyType} - {item.area}
									</p>
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<Calendar className="h-4 w-4" />
										<span>{item.date}</span>
									</div>
								</CardHeader>
								<CardContent>
									<div
										className="prose prose-sm max-w-none text-[#5c6168]"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
										dangerouslySetInnerHTML={{ __html: item.summary }}
									/>
								</CardContent>
							</Card>
						))}
				</div>

				<Separator className="my-12" />

				{/* Certifications Section */}
				{certifications.items.length > 0 && (
					<>
						<div className="flex items-center gap-3 mb-8">
							<Award className="h-8 w-8 text-[#65B230]" />
							<h2 className="text-3xl font-bold text-gray-900">
								{certifications.name}
							</h2>
						</div>

						<div className="grid gap-6 mb-12">
							{certifications.items
								.filter((item) => item.visible)
								.map((item) => (
									<Card
										key={item.id}
										className="hover:shadow-lg transition-shadow"
									>
										<CardHeader>
											<CardTitle className="text-lg text-[#65B230]">
												{item.name}
											</CardTitle>
											<p className="text-sm text-gray-600">{item.issuer}</p>
											<div className="flex items-center gap-2 text-sm text-gray-500">
												<Calendar className="h-4 w-4" />
												<span>{item.date}</span>
											</div>
										</CardHeader>
										<CardContent>
											<div
												className="prose prose-sm max-w-none text-[#5c6168]"
												// biome-ignore lint/security/noDangerouslySetInnerHtml: Resume content is trusted
												dangerouslySetInnerHTML={{ __html: item.summary }}
											/>
										</CardContent>
									</Card>
								))}
						</div>

						<Separator className="my-12" />
					</>
				)}

				{/* Languages Section */}
				{languages.items.length > 0 && (
					<>
						<div className="flex items-center gap-3 mb-8">
							<Languages className="h-8 w-8 text-[#65B230]" />
							<h2 className="text-3xl font-bold text-gray-900">
								{languages.name}
							</h2>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							{languages.items
								.filter((item) => item.visible)
								.map((item) => (
									<Card
										key={item.id}
										className="hover:shadow-lg transition-shadow"
									>
										<CardHeader>
											<CardTitle className="text-lg text-[#65B230] mb-4">
												{item.name}
											</CardTitle>
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm text-gray-600">
														Proficiency
													</span>
													<Badge variant="secondary">{item.level}/5</Badge>
												</div>
												<Progress
													value={(item.level / 5) * 100}
													className="h-2"
												/>
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
