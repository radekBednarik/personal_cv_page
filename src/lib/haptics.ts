/**
 * Triggers haptic feedback on mobile devices only.
 * This uses the Vibration API which is available on real mobile devices
 * but not on desktop browsers or emulators.
 *
 * @param duration - Duration in milliseconds (default: 10ms for light tap)
 */
export function triggerHaptic(duration = 10): void {
	// Check if Vibration API is available
	if (!navigator.vibrate) {
		return;
	}

	// Additional check to avoid triggering on desktop browsers
	// Real mobile devices will have both touch support and vibrate
	const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	if (isMobile) {
		navigator.vibrate(duration);
	}
}
