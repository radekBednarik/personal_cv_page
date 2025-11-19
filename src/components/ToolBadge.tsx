import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ToolBadgeProps {
	tool: string;
	variant?: "default" | "secondary" | "outline" | "destructive";
	className?: string;
}

const TOOL_URLS: Record<string, string> = {
	// Testing frameworks and libraries
	Playwright: "https://playwright.dev/",
	Cypress: "https://www.cypress.io/",
	Mocha: "https://mochajs.org/",
	Jest: "https://jestjs.io/",
	"Webdriver.io": "https://webdriver.io/",
	Detox: "https://wix.github.io/Detox/",
	pytest: "https://docs.pytest.org/",
	behave: "https://behave.readthedocs.io/",
	"behave (cucumber)": "https://behave.readthedocs.io/",
	Postman: "https://www.postman.com/",
	"k6.io": "https://k6.io/",

	// Programming languages
	Typescript: "https://www.typescriptlang.org/",
	TypeScript: "https://www.typescriptlang.org/",
	JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
	Python: "https://www.python.org/",
	Go: "https://go.dev/",
	SQL: "https://en.wikipedia.org/wiki/SQL",
	Groovy: "https://groovy-lang.org/",

	// Runtime and frameworks
	"Node.js": "https://nodejs.org/",
	React: "https://react.dev/",
	"React Native": "https://reactnative.dev/",

	// CI/CD and DevOps
	"Github Actions": "https://github.com/features/actions",
	Jenkins: "https://www.jenkins.io/",
	Docker: "https://www.docker.com/",

	// Project management and monitoring
	Jira: "https://www.atlassian.com/software/jira",
	Zephyr: "https://smartbear.com/test-management/zephyr/",
	Xray: "https://www.getxray.app/",
	Linear: "https://linear.app/",
	Grafana: "https://grafana.com/",
};

export function ToolBadge({
	tool,
	variant = "default",
	className,
}: ToolBadgeProps) {
	const url = TOOL_URLS[tool];

	if (url) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block hover:scale-105 transition-transform"
			>
				<Badge
					variant={variant}
					className={`${className} cursor-pointer group`}
				>
					{tool}
					<ExternalLink className="ml-1 h-3 w-3" />
				</Badge>
			</a>
		);
	}

	return (
		<Badge variant={variant} className={className}>
			{tool}
		</Badge>
	);
}
