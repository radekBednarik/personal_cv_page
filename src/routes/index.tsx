import { createFileRoute } from "@tanstack/react-router";
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
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation anchor */}
			<div id="testing-philosophy">
				<TestingPhilosophySection />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation anchor */}
			<div id="profile">
				<ProfileSection summary={resume.sections.summary} />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation anchor */}
			<div id="experience">
				<ExperienceSection
					experience={resume.sections.experience}
					projects={resume.sections.projects}
				/>
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation anchor */}
			<div id="skills">
				<SkillsSection skills={resume.sections.skills} />
			</div>
			{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation anchor */}
			<div id="education">
				<EducationCertsSection
					education={resume.sections.education}
					certifications={resume.sections.certifications}
					languages={resume.sections.languages}
				/>
			</div>

			{/* Footer */}
			<footer className="py-8 px-4 bg-gray-900 dark:bg-gray-950 text-white text-center">
				<p className="text-sm">
					© {new Date().getFullYear()} {resume.basics.name}. All rights
					reserved.
				</p>
			</footer>
		</div>
	);
}
