import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileSection() {
	return (
		<section className="py-12 px-4 dark:bg-gray-900">
			<div className="container mx-auto max-w-4xl">
				<div className="flex items-center gap-3 mb-8">
					<User className="h-8 w-8 text-purple-600 dark:text-purple-400" />
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase">
						About me
					</h2>
				</div>

				<Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
					<CardContent className="pt-6">
						<div className="prose prose-lg max-w-none text-[#5c6168] dark:text-gray-300 dark:prose-invert">
							<p>I love coding and test automation.</p>
							<p>
								I am primarily interested in front-end, but I have some
								experience with integration testing as well. I have been working
								primarily with JavaScript/TypeScript frameworks (Playwright,
								Cypress, Mocha, etc.).
							</p>
							<p>
								I have proficiency at JavaScript/TypeScript, Python and little
								bit of Go.
							</p>
							<p>
								All my coding shenanigans can be found on my{" "}
								<a
									target="_blank"
									rel="noreferrer noopener"
									href="https://github.com/radekBednarik"
									className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline decoration-purple-600 dark:decoration-purple-400 decoration-2 underline-offset-2 transition-colors duration-200 font-semibold"
								>
									Github
								</a>
								.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
