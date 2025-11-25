import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type {
	SpotifyEmbedController,
	SpotifyIFrameAPI,
	SpotifyPlaybackStartedEvent,
	SpotifyPlaybackUpdateEvent,
} from "@/lib/spotify-types";

interface SpotifyEmbedProps {
	episodeUri: string;
	title: string;
	width?: string | number;
	height?: number;
}

export function SpotifyEmbed({
	episodeUri,
	title,
	width = "100%",
	height = 152,
}: SpotifyEmbedProps) {
	const embedRef = useRef<HTMLDivElement>(null);
	const controllerRef = useRef<SpotifyEmbedController | null>(null);

	// Tracking state stored in refs to avoid dependency issues
	const progressMilestonesRef = useRef<Set<number>>(new Set());
	const hasCompletedRef = useRef(false);
	const lastPausedStateRef = useRef(true);
	const lastPositionRef = useRef(0);
	const hasStartedRef = useRef(false);

	useEffect(() => {
		// Extract episode ID from URI for tracking
		const episodeId = episodeUri.split(":").pop() || episodeUri;

		// Check if script is already loaded
		const existingScript = document.querySelector(
			'script[src*="spotify.com/embed/iframe-api"]',
		);

		const initializeController = (IFrameAPI: SpotifyIFrameAPI) => {
			if (!embedRef.current) return;

			IFrameAPI.createController(
				embedRef.current,
				{
					uri: episodeUri,
					width,
					height,
				},
				(controller) => {
					controllerRef.current = controller;

					// Track: Embed loaded and ready
					controller.addListener("ready", () => {
						trackEvent("select_content", {
							content_type: "podcast",
							content_id: episodeUri,
							item_id: episodeId,
							title: title,
						});
					});

					// Track: Playback started
					controller.addListener("playback_started", (event: unknown) => {
						const e = event as SpotifyPlaybackStartedEvent;
						if (!hasStartedRef.current) {
							trackEvent("playback_start", {
								content_type: "podcast",
								content_id: e.data.playingURI,
								item_id: episodeId,
								title: title,
							});
							hasStartedRef.current = true;
						}
					});

					// Track: Playback updates (progress, pause, resume, seek)
					controller.addListener("playback_update", (event: unknown) => {
						const e = event as SpotifyPlaybackUpdateEvent;
						const { isPaused, position, duration, isBuffering } = e.data;

						// Skip if buffering
						if (isBuffering) return;

						const progressPercent = (position / duration) * 100;
						const currentTimeSeconds = Math.floor(position / 1000);
						const durationSeconds = Math.floor(duration / 1000);

						// Track progress milestones (25%, 50%, 75%, 90%)
						const milestones = [25, 50, 75, 90];
						for (const milestone of milestones) {
							if (
								progressPercent >= milestone &&
								!progressMilestonesRef.current.has(milestone)
							) {
								trackEvent("playback_progress", {
									content_type: "podcast",
									content_id: episodeUri,
									item_id: episodeId,
									title: title,
									percent: milestone,
									current_time: currentTimeSeconds,
									duration: durationSeconds,
								});

								progressMilestonesRef.current.add(milestone);
							}
						}

						// Track pause
						if (
							isPaused &&
							!lastPausedStateRef.current &&
							hasStartedRef.current
						) {
							trackEvent("playback_pause", {
								content_type: "podcast",
								content_id: episodeUri,
								item_id: episodeId,
								title: title,
								current_time: currentTimeSeconds,
								duration: durationSeconds,
							});
						}

						// Track resume
						if (
							!isPaused &&
							lastPausedStateRef.current &&
							hasStartedRef.current &&
							position > 0
						) {
							trackEvent("playback_resume", {
								content_type: "podcast",
								content_id: episodeUri,
								item_id: episodeId,
								title: title,
								current_time: currentTimeSeconds,
								duration: durationSeconds,
							});
						}

						// Track seeking (position jumped more than 2 seconds)
						const positionDiff = Math.abs(position - lastPositionRef.current);
						if (
							positionDiff > 2000 &&
							lastPositionRef.current > 0 &&
							hasStartedRef.current &&
							!isPaused
						) {
							trackEvent("playback_seek", {
								content_type: "podcast",
								content_id: episodeUri,
								item_id: episodeId,
								title: title,
								from_time: Math.floor(lastPositionRef.current / 1000),
								to_time: currentTimeSeconds,
								duration: durationSeconds,
							});
						}

						// Track completion (95%+)
						if (progressPercent >= 95 && !hasCompletedRef.current) {
							trackEvent("playback_complete", {
								content_type: "podcast",
								content_id: episodeUri,
								item_id: episodeId,
								title: title,
								duration: durationSeconds,
							});
							hasCompletedRef.current = true;
						}

						// Update tracking state
						lastPausedStateRef.current = isPaused;
						if (!isPaused) {
							lastPositionRef.current = position;
						}
					});
				},
			);
		};

		// Load Spotify iFrame API script if not already loaded
		if (!existingScript) {
			const script = document.createElement("script");
			script.src = "https://open.spotify.com/embed/iframe-api/v1";
			script.async = true;
			document.body.appendChild(script);
		}

		// Define global callback for when API is ready
		window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
			initializeController(IFrameAPI);
		};

		// If script already loaded, try to initialize immediately
		// Note: The API will call onSpotifyIframeApiReady when ready

		// Cleanup
		return () => {
			if (controllerRef.current) {
				controllerRef.current.destroy();
				controllerRef.current = null;
			}
		};
	}, [episodeUri, title, width, height]);

	return (
		<div
			ref={embedRef}
			style={{
				width: typeof width === "number" ? `${width}px` : width,
				height: `${height}px`,
			}}
		/>
	);
}
