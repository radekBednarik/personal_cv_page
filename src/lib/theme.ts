/**
 * Theme management utilities for style and mode switching
 */

export type ThemeStyle = "purple" | "cyberpunk";
export type ThemeMode = "light" | "dark";

const THEME_STYLE_KEY = "site_theme_style";
const THEME_MODE_KEY = "site_theme_mode";

/**
 * Get the current theme style from localStorage
 * @returns The saved theme style or "purple" as default
 */
export function getThemeStyle(): ThemeStyle {
	try {
		const stored = localStorage.getItem(THEME_STYLE_KEY);
		if (stored === "purple" || stored === "cyberpunk") {
			return stored;
		}
		return "purple";
	} catch {
		// localStorage not available (e.g., in SSR or private browsing)
		return "purple";
	}
}

/**
 * Set the theme style in localStorage and apply it to the DOM
 * @param style - The theme style to set
 */
export function setThemeStyle(style: ThemeStyle): void {
	try {
		localStorage.setItem(THEME_STYLE_KEY, style);
		applyThemeStyle(style);
	} catch {
		// Fail silently if localStorage is not available
		console.warn("Unable to save theme style to localStorage");
		applyThemeStyle(style);
	}
}

/**
 * Get the current theme mode from localStorage or system preference
 * @returns The saved theme mode, system preference, or "light" as default
 */
export function getThemeMode(): ThemeMode {
	try {
		const stored = localStorage.getItem(THEME_MODE_KEY);
		if (stored === "light" || stored === "dark") {
			return stored;
		}
		// Check system preference
		if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		return "light";
	} catch {
		// localStorage not available, check system preference
		if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		return "light";
	}
}

/**
 * Set the theme mode in localStorage and apply it to the DOM
 * @param mode - The theme mode to set
 */
export function setThemeMode(mode: ThemeMode): void {
	try {
		localStorage.setItem(THEME_MODE_KEY, mode);
		applyThemeMode(mode);
	} catch {
		// Fail silently if localStorage is not available
		console.warn("Unable to save theme mode to localStorage");
		applyThemeMode(mode);
	}
}

/**
 * Apply theme style to the DOM
 * @param style - The theme style to apply
 */
function applyThemeStyle(style: ThemeStyle): void {
	if (typeof document !== "undefined") {
		document.documentElement.setAttribute("data-theme", style);
	}
}

/**
 * Apply theme mode to the DOM
 * @param mode - The theme mode to apply
 */
function applyThemeMode(mode: ThemeMode): void {
	if (typeof document !== "undefined") {
		document.documentElement.setAttribute("data-mode", mode);
	}
}

/**
 * Apply both theme style and mode to the DOM
 * @param style - The theme style to apply
 * @param mode - The theme mode to apply
 */
export function applyTheme(style: ThemeStyle, mode: ThemeMode): void {
	applyThemeStyle(style);
	applyThemeMode(mode);
}

/**
 * Initialize theme on page load
 * Should be called before React renders to prevent flash of unstyled content
 */
export function initializeTheme(): void {
	const style = getThemeStyle();
	const mode = getThemeMode();
	applyTheme(style, mode);
}

/**
 * Listen to system theme preference changes
 * @param callback - Function to call when system preference changes
 * @returns Cleanup function to remove the listener
 */
export function watchSystemThemePreference(
	callback: (mode: ThemeMode) => void,
): () => void {
	if (typeof window === "undefined") {
		return () => {};
	}

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = (e: MediaQueryListEvent) => {
		callback(e.matches ? "dark" : "light");
	};

	mediaQuery.addEventListener("change", handler);

	return () => {
		mediaQuery.removeEventListener("change", handler);
	};
}
