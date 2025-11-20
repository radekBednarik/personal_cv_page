import { createFileRoute } from "@tanstack/react-router";
import { BugHunter } from "@/components/BugHunter";
import { EducationCertsSection } from "@/components/EducationCertsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProfileSection } from "@/components/ProfileSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TestingPhilosophySection } from "@/components/TestingPhilosophySection";
import type { Resume } from "@/lib/resume-types";
import resumeData from "../../.temp/resume.json";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const resume = resumeData as Resume;

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<Header
				githubUrl="https://github.com/radekBednarik"
				linkedinUrl="https://www.linkedin.com/in/bednarikradek/"
			/>
			<HeroSection basics={resume.basics} />
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
			<div id="testing-philosophy">
				<TestingPhilosophySection />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
			<div id="profile">
				<ProfileSection />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
			<div id="experience">
				<ExperienceSection
					experience={resume.sections.experience}
					projects={resume.sections.projects}
				/>
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
			<div id="skills">
				<SkillsSection skills={resume.sections.skills} />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
			<div id="education">
				<EducationCertsSection
					education={resume.sections.education}
					certifications={resume.sections.certifications}
					languages={resume.sections.languages}
				/>
			</div>

			{/* Footer */}
			<footer className="py-8 px-4 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white text-center">
				<p className="text-sm">
					© {new Date().getFullYear()}{" "}
					<a
						href="https://github.com/radekBednarik/personal_cv_page"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block text-purple-600 dark:text-purple-400 font-semibold transition-colors transition-transform duration-200 hover:text-purple-700 dark:hover:text-purple-300 hover:scale-105"
						aria-label="View source code on GitHub (opens in new tab)"
					>
						{resume.basics.name}
					</a>
					. All rights reserved.
				</p>
			</footer>

			{/* Bug Hunter Game */}
			<BugHunter />
		</div>
	);
}
