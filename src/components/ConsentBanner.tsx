import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	clearConsent,
	hasConsentDecision,
	setConsent,
} from "@/lib/consent-storage";

export function ConsentBanner() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Only show banner if user hasn't made a consent decision
		if (!hasConsentDecision()) {
			setIsVisible(true);
		}

		// Listen for custom event to show the banner
		const handleShowConsent = () => {
			clearConsent();
			setIsVisible(true);
		};

		window.addEventListener("showConsentBanner", handleShowConsent);

		return () => {
			window.removeEventListener("showConsentBanner", handleShowConsent);
		};
	}, []);

	const handleAccept = () => {
		setConsent(true);
		setIsVisible(false);
	};

	const handleDismiss = () => {
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 flex justify-center">
			<div className="max-w-2xl w-full">
				<Alert className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
					<Cookie className="h-4 w-4" />
					<AlertTitle>Cookie Consent</AlertTitle>
					<AlertDescription>
						<p className="mb-3">
							We use cookies and tracking technologies to improve your browsing
							experience and analyze site traffic. By clicking "Accept", you
							consent to our use of cookies.
						</p>
						<div className="flex gap-2 flex-wrap">
							<Button
								onClick={handleAccept}
								size="sm"
								className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
							>
								Accept
							</Button>
							<Button onClick={handleDismiss} variant="outline" size="sm">
								Dismiss
							</Button>
						</div>
					</AlertDescription>
				</Alert>
			</div>
		</div>
	);
}
