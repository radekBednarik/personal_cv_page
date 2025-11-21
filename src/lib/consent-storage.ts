const CONSENT_KEY = "tracking-consent";

/**
 * Get the current consent status from localStorage
 * @returns true if consent was given, false if declined, null if no decision made
 */
export function getConsent(): boolean | null {
	if (typeof window === "undefined") {
		return null;
	}

	const stored = localStorage.getItem(CONSENT_KEY);
	if (stored === null) {
		return null;
	}

	return stored === "true";
}

/**
 * Set the consent status in localStorage
 * @param accepted - true if user accepts tracking, false if declined
 */
export function setConsent(accepted: boolean): void {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.setItem(CONSENT_KEY, String(accepted));
}

/**
 * Check if user has made any consent decision
 * @returns true if user has accepted or declined, false if no decision made
 */
export function hasConsentDecision(): boolean {
	return getConsent() !== null;
}

/**
 * Clear the consent decision from localStorage
 * This allows the user to see the consent banner again
 */
export function clearConsent(): void {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.removeItem(CONSENT_KEY);
}
