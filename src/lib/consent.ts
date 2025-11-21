/**
 * Consent management utilities for cookie consent and analytics tracking
 */

export type ConsentState = "granted" | "denied" | null;

const CONSENT_KEY = "cookie_consent";

/**
 * Get the current consent state from localStorage
 */
export function getConsentState(): ConsentState {
	try {
		const stored = localStorage.getItem(CONSENT_KEY);
		if (stored === "granted" || stored === "denied") {
			return stored;
		}
		return null;
	} catch {
		// localStorage not available (e.g., in SSR or private browsing)
		return null;
	}
}

/**
 * Set the consent state in localStorage
 */
export function setConsentState(state: "granted" | "denied"): void {
	try {
		localStorage.setItem(CONSENT_KEY, state);
	} catch {
		// Fail silently if localStorage is not available
		console.warn("Unable to save consent state to localStorage");
	}
}

/**
 * Clear the consent state from localStorage
 * Used when user wants to change their decision
 */
export function clearConsentState(): void {
	try {
		localStorage.removeItem(CONSENT_KEY);
	} catch {
		// Fail silently if localStorage is not available
		console.warn("Unable to clear consent state from localStorage");
	}
}

/**
 * Check if user has made a consent decision
 */
export function hasConsentDecision(): boolean {
	return getConsentState() !== null;
}
