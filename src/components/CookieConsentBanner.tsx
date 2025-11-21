import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { loadGTM, updateConsent } from "@/lib/analytics";
import { hasConsentDecision, setConsentState } from "@/lib/consent";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface CookieConsentBannerProps {
	containerId?: string;
	onConsentChange?: () => void;
}

export function CookieConsentBanner({
	containerId,
	onConsentChange,
}: CookieConsentBannerProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Show banner if user hasn't made a decision yet
		setIsVisible(!hasConsentDecision());
	}, []);

	const handleAccept = () => {
		setConsentState("granted");
		updateConsent("granted");
		if (containerId) {
			loadGTM(containerId);
		}
		setIsVisible(false);
		onConsentChange?.();
		// Notify that consent was granted for immediate page view tracking
		window.dispatchEvent(new CustomEvent("consent-granted"));
	};

	const handleDecline = () => {
		setConsentState("denied");
		updateConsent("denied");
		setIsVisible(false);
		onConsentChange?.();
	};

	const handleDismiss = () => {
		// Dismiss = Decline (reject consent)
		setConsentState("denied");
		updateConsent("denied");
		setIsVisible(false);
		onConsentChange?.();
	};

	// Allow parent to re-open banner
	useEffect(() => {
		const handleReopenBanner = () => {
			setIsVisible(true);
		};

		window.addEventListener("reopen-consent-banner", handleReopenBanner);

		return () => {
			window.removeEventListener("reopen-consent-banner", handleReopenBanner);
		};
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 p-4 pb-safe animate-in fade-in slide-in-from-bottom-4 duration-500">
			<Card className="max-w-4xl mx-auto border-2 shadow-2xl bg-white dark:bg-gray-900">
				<CardContent className="p-6">
					<div className="flex items-start gap-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								Tracking Consent
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
								This site uses analytics tracking to understand how visitors
								interact with the content. By clicking "Accept", you consent to
								usage tracking.
							</p>
							<div className="flex flex-wrap gap-3">
								<Button
									onClick={handleAccept}
									size="sm"
									className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
								>
									Accept
								</Button>
								<Button
									onClick={handleDecline}
									size="sm"
									variant="outline"
									className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									Decline
								</Button>
							</div>
						</div>
						<button
							type="button"
							onClick={handleDismiss}
							className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							aria-label="Decline tracking and close banner"
						>
							<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
						</button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

/**
 * Helper function to reopen the consent banner
 * Used by the "Manage Cookies" link
 */
export function reopenConsentBanner() {
	window.dispatchEvent(new CustomEvent("reopen-consent-banner"));
}
