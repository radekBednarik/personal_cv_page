import { Bug, CheckCircle2, Rocket, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestingPhilosophySection() {
	const principles = [
		{
			icon: <CheckCircle2 className="h-6 w-6" />,
			title: "Comprehensive Automation",
			description:
				"Building robust test suites that catch issues before production",
			color: "text-success dark:text-success",
			bgColor: "bg-success/10",
		},
		{
			icon: <Bug className="h-6 w-6" />,
			title: "Early Bug Detection",
			description:
				"Shift-left testing approach to identify and fix issues early",
			color: "text-purple-600 dark:text-purple-400",
			bgColor: "bg-purple-600/10",
		},
		{
			icon: <Rocket className="h-6 w-6" />,
			title: "Continuous Testing",
			description: "Integrating tests into CI/CD pipelines for rapid feedback",
			color: "text-info dark:text-info",
			bgColor: "bg-info/10",
		},
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Quality-First Mindset",
			description: "Prioritizing quality at every stage of development",
			color: "text-warning dark:text-warning",
			bgColor: "bg-warning/10",
		},
	];

	return (
		<section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase">
						Testing Philosophy
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						I believe in building bulletproof software through:
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{principles.map((principle, index) => {
						const delayClass =
							index === 0
								? ""
								: index === 1
									? "animation-delay-100"
									: index === 2
										? "animation-delay-200"
										: "animation-delay-300";

						return (
							<Card
								key={principle.title}
								className={`hover:shadow-lg transition-all duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700 border-2 hover:border-purple-600/50 dark:hover:border-purple-400/50 animate-fade-in-up ${delayClass}`}
							>
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div
											className={`${principle.bgColor} ${principle.color} p-3 rounded-lg flex-shrink-0`}
										>
											{principle.icon}
										</div>
										<div>
											<h3
												className={`text-lg font-semibold mb-2 ${principle.color}`}
											>
												{principle.title}
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{principle.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
