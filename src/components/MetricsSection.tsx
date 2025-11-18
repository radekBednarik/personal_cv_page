import { CheckCircle2, Target, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Metric {
	icon: React.ReactNode;
	value: number;
	suffix: string;
	label: string;
	color: string;
}

interface AnimatedCounterProps {
	end: number;
	suffix: string;
	start: boolean;
}

function AnimatedCounter({ end, suffix, start }: AnimatedCounterProps) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!start) return;

		const duration = 2000;
		const steps = 60;
		const increment = end / steps;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= end) {
				setCount(end);
				clearInterval(timer);
			} else {
				setCount(Math.floor(current));
			}
		}, duration / steps);

		return () => clearInterval(timer);
	}, [end, start]);

	return (
		<span>
			{count.toLocaleString()}
			{suffix}
		</span>
	);
}

export function MetricsSection() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const metrics: Metric[] = [
		{
			icon: <Trophy className="h-8 w-8" />,
			value: 6,
			suffix: "+",
			label: "Years in QA",
			color: "text-purple-600 dark:text-purple-400",
		},
		{
			icon: <CheckCircle2 className="h-8 w-8" />,
			value: 10000,
			suffix: "+",
			label: "Tests Automated",
			color: "text-success dark:text-success",
		},
		{
			icon: <Zap className="h-8 w-8" />,
			value: 15,
			suffix: "+",
			label: "Tools Mastered",
			color: "text-info dark:text-info",
		},
		{
			icon: <Target className="h-8 w-8" />,
			value: 99,
			suffix: "%",
			label: "Quality Focus",
			color: "text-warning dark:text-warning",
		},
	];

	return (
		<section className="py-8 px-4 bg-gradient-to-b from-transparent to-purple-600/5 dark:from-transparent dark:to-purple-600/10">
			<div className="container mx-auto max-w-4xl">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{metrics.map((metric, index) => {
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
								key={metric.label}
								className={`border-2 hover:border-purple-600/50 transition-all duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-400/50 ${isVisible ? `animate-fade-in-up ${delayClass}` : "opacity-0"}`}
							>
								<CardContent className="p-6 text-center">
									<div className={`${metric.color} flex justify-center mb-3`}>
										{metric.icon}
									</div>
									<div
										className={`text-2xl md:text-3xl font-bold ${metric.color} mb-1`}
									>
										<AnimatedCounter
											end={metric.value}
											suffix={metric.suffix}
											start={isVisible}
										/>
									</div>
									<p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
										{metric.label}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
