/**
 * Google Tag Manager and consent mode integration
 */

import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { getConsentState } from "./consent";

// Extend Window interface to include gtag
declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

/**
 * Update consent state in Google Tag Manager
 */
export function updateConsent(state: "granted" | "denied"): void {
	if (typeof window === "undefined") return;

	window.dataLayer = window.dataLayer || [];

	if (state === "granted") {
		window.gtag("consent", "update", {
			ad_user_data: "granted",
			ad_personalization: "granted",
			ad_storage: "granted",
			analytics_storage: "granted",
		});
	} else {
		window.gtag("consent", "update", {
			ad_user_data: "denied",
			ad_personalization: "denied",
			ad_storage: "denied",
			analytics_storage: "denied",
		});
	}
}

/**
 * Load Google Tag Manager script dynamically
 * Note: This function checks if GTM is already loaded from index.html
 * and skips loading if the script tag already exists
 */
export function loadGTM(containerId: string): void {
	if (typeof window === "undefined" || typeof document === "undefined") return;

	// Check if GTM is already loaded (from index.html or previous call)
	const existingScript = document.querySelector(
		`script[src*="googletagmanager.com/gtag/js"]`,
	);
	if (existingScript) {
		return;
	}

	// Create and insert GTM script (fallback if not loaded from index.html)
	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${containerId}`;

	const firstScript = document.getElementsByTagName("script")[0];
	if (firstScript?.parentNode) {
		firstScript.parentNode.insertBefore(script, firstScript);
	}
}

/**
 * Initialize analytics based on stored consent
 * Call this on app load
 *
 * Note: GTM script is loaded from index.html by default.
 * This function only updates consent state based on user's previous choice.
 */
export function initializeAnalytics(containerId?: string): void {
	if (!containerId) {
		console.warn("GTM Container ID not provided");
		return;
	}

	const consentState = getConsentState();

	if (consentState === "granted") {
		// User has previously granted consent, update consent mode
		// GTM is already loaded from index.html, so we just update consent
		updateConsent("granted");
		// Fallback: ensure GTM is loaded (will skip if already loaded)
		loadGTM(containerId);
	} else if (consentState === "denied") {
		// User has denied consent, just update the state
		updateConsent("denied");
	}
	// If null (no decision), do nothing - banner will show
}

/**
 * Track a page view event
 * Only fires if analytics consent is granted
 */
export function trackPageView(): void {
	if (typeof window === "undefined") return;

	const consentState = getConsentState();

	// Only track if consent is granted
	if (consentState !== "granted") {
		return;
	}

	// Ensure gtag is available
	if (typeof window.gtag !== "function") {
		return;
	}

	window.gtag("event", "page_view", {
		page_location: window.location.href,
		page_title: document.title,
		page_path: window.location.pathname,
	});
}

/**
 * Custom hook to track page views on route changes
 * Integrates with TanStack Router to fire page_view events on navigation
 */
export function usePageViewTracking(): void {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: We need to track pathname changes
	useEffect(() => {
		// Track page view on mount and when location changes
		trackPageView();
	}, [pathname]);

	// Listen for consent changes and track page view when granted
	useEffect(() => {
		const handleConsentGranted = () => {
			// Fire page view immediately when consent is granted
			trackPageView();
		};

		window.addEventListener("consent-granted", handleConsentGranted);

		return () => {
			window.removeEventListener("consent-granted", handleConsentGranted);
		};
	}, []);
}
