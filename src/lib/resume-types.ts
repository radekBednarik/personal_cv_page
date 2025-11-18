export interface ResumeUrl {
	label: string;
	href: string;
}

export interface PictureEffects {
	hidden: boolean;
	border: boolean;
	grayscale: boolean;
}

export interface Picture {
	url: string;
	size: number;
	aspectRatio: number;
	borderRadius: number;
	effects: PictureEffects;
}

export interface Basics {
	name: string;
	headline: string;
	email: string;
	phone: string;
	location: string;
	url: ResumeUrl;
	customFields: unknown[];
	picture: Picture;
}

export interface Section {
	name: string;
	columns: number;
	separateLinks: boolean;
	visible: boolean;
	id: string;
}

export interface SummarySection extends Section {
	content: string;
}

export interface CertificationItem {
	id: string;
	visible: boolean;
	name: string;
	issuer: string;
	date: string;
	summary: string;
	url: ResumeUrl;
}

export interface CertificationsSection extends Section {
	items: CertificationItem[];
}

export interface EducationItem {
	id: string;
	visible: boolean;
	institution: string;
	studyType: string;
	area: string;
	score: string;
	date: string;
	summary: string;
	url: ResumeUrl;
}

export interface EducationSection extends Section {
	items: EducationItem[];
}

export interface ExperienceItem {
	id: string;
	visible: boolean;
	company: string;
	project: string;
	position: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string;
	responsibilities: string[];
	tools: string[];
	url: ResumeUrl;
}

export interface ExperienceSection extends Section {
	items: ExperienceItem[];
}

export interface LanguageItem {
	id: string;
	visible: boolean;
	name: string;
	description: string;
	level: number;
}

export interface LanguagesSection extends Section {
	items: LanguageItem[];
}

export interface SkillItem {
	id: string;
	visible: boolean;
	name: string;
	description: string;
	level: number;
	keywords: string[];
}

export interface SkillsSection extends Section {
	items: SkillItem[];
}

export interface ProjectItem {
	id: string;
	visible: boolean;
	company: string;
	project: string;
	position: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string;
	responsibilities: string[];
	tools: string[];
	url: ResumeUrl;
}

export interface ProjectsSection extends Section {
	items: ProjectItem[];
}

export interface Sections {
	summary: SummarySection;
	awards: Section & { items: unknown[] };
	certifications: CertificationsSection;
	education: EducationSection;
	experience: ExperienceSection;
	volunteer: Section & { items: unknown[] };
	interests: Section & { items: unknown[] };
	languages: LanguagesSection;
	profiles: Section & { items: unknown[] };
	projects: ProjectsSection;
	publications: Section & { items: unknown[] };
	references: Section & { items: unknown[] };
	skills: SkillsSection;
	custom: Record<string, unknown>;
}

export interface Theme {
	background: string;
	text: string;
	primary: string;
}

export interface Typography {
	font: {
		family: string;
		subset: string;
		variants: string[];
		size: number;
	};
	lineHeight: number;
	hideIcons: boolean;
	underlineLinks: boolean;
}

export interface Metadata {
	template: string;
	layout: unknown[][];
	css: {
		value: string;
		visible: boolean;
	};
	page: {
		margin: number;
		format: string;
		options: {
			breakLine: boolean;
			pageNumbers: boolean;
		};
	};
	theme: Theme;
	typography: Typography;
	notes: string;
}

export interface Resume {
	basics: Basics;
	sections: Sections;
	metadata: Metadata;
}
