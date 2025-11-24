import { Radio } from "lucide-react";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MediaSection() {
	return (
		<section
			className="py-12 px-4 bg-gray-50 dark:bg-gray-900"
			aria-labelledby="media-heading"
		>
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<Radio
						className="h-8 w-8 text-purple-600 dark:text-purple-400"
						aria-hidden="true"
					/>
					{/* biome-ignore lint/correctness/useUniqueElementIds: Navigation landmark ID */}
					<h2
						id="media-heading"
						className="text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase"
					>
						Media
					</h2>
				</div>

				<Card className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
					{/* Timeline indicator */}
					<div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 dark:bg-purple-400" />

					<CardHeader className="pl-6 pr-4 pt-6">
						<CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
							QE - When Automation Isn't Just a Buzzword
						</CardTitle>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Why is automation a key factor for software development quality?
							When does it make sense to implement it? Where are mistakes made
							when introducing automation? How should the entire team approach
							automation? How do testers react to the introduction of
							automation? What are the trends in automation?
						</p>
						<p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-2">
							Note: This podcast is in Czech language (Česky)
						</p>
					</CardHeader>

					<CardContent className="pl-6 pr-4 pb-6">
						<div className="w-full rounded-xl overflow-hidden">
							<SpotifyEmbed
								episodeUri="spotify:episode:63eSpUafOl1h0HLLQSdnPV"
								title="QE - When Automation Isn't Just a Buzzword"
								width="100%"
								height={152}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
