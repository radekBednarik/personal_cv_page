import { getConsent } from "./consent-storage";

// Replace with your actual GA4 measurement ID
const GA_MEASUREMENT_ID = "G-VLTNCY4VQZ";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

/**
 * Initialize Google Analytics 4
 * This should only be called after user consent
 */
export function initializeGA(): void {
	if (typeof window === "undefined") {
		return;
	}

	// Check if GA is already initialized
	if (window.gtag !== undefined) {
		console.log("GA already initialized");
		return;
	}

	// Create the script tag for GA
	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	document.head.appendChild(script);

	// Initialize dataLayer
	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag(...args: unknown[]) {
		window.dataLayer?.push(args);
	};

	window.gtag("js", new Date());
	window.gtag("config", GA_MEASUREMENT_ID, {
		anonymize_ip: true, // Anonymize IP for privacy
		cookie_flags: "SameSite=None;Secure", // Modern cookie settings
	});

	console.log("GA initialized with consent");

	// Track the current page immediately after initialization
	trackPageView(window.location.pathname, document.title);
}

/**
 * Check if GA should be initialized based on consent
 * Call this on app startup
 */
export function initializeGAIfConsented(): void {
	const consent = getConsent();

	if (consent === true) {
		initializeGA();
	}
}

/**
 * Track a custom event in GA
 * Only tracks if GA is initialized (consent given)
 */
export function trackEvent(
	eventName: string,
	eventParams?: Record<string, unknown>,
): void {
	if (typeof window === "undefined" || !window.gtag) {
		return;
	}

	window.gtag("event", eventName, eventParams);
}

/**
 * Track a page view
 * Only tracks if GA is initialized (consent given)
 */
export function trackPageView(path: string, title?: string): void {
	if (typeof window === "undefined" || !window.gtag) {
		return;
	}

	window.gtag("event", "page_view", {
		page_path: path,
		page_title: title,
	});
}

/**
 * Helper function to delete a specific cookie
 */
function deleteCookie(name: string): void {
	// Delete for current domain and path
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

	// Delete for parent domain (with leading dot)
	const domain = window.location.hostname;
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
}

/**
 * Delete all Google Analytics cookies
 * Call this when user revokes consent
 */
export function clearGACookies(): void {
	if (typeof window === "undefined") {
		return;
	}

	// Get all cookies
	const cookies = document.cookie.split(";");

	// GA cookie patterns to delete
	const gaCookiePatterns = ["_ga", "_gid", "_gat", "_gac"];

	for (const cookie of cookies) {
		const cookieName = cookie.split("=")[0].trim();

		// Check if it's a GA cookie
		const isGACookie = gaCookiePatterns.some((pattern) =>
			cookieName.startsWith(pattern),
		);

		if (isGACookie) {
			// Delete the cookie for all possible paths and domains
			deleteCookie(cookieName);
		}
	}

	console.log("GA cookies cleared");
}
