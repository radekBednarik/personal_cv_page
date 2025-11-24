/**
 * TypeScript definitions for Spotify iFrame API
 * Based on: https://developer.spotify.com/documentation/embeds/references/iframe-api
 */

export interface SpotifyPlaybackState {
	playingURI: string;
	isPaused: boolean;
	isBuffering: boolean;
	duration: number; // in milliseconds
	position: number; // in milliseconds
}

export interface SpotifyPlaybackUpdateEvent {
	data: SpotifyPlaybackState;
}

export interface SpotifyPlaybackStartedEvent {
	data: {
		playingURI: string;
	};
}

export interface SpotifyEmbedController {
	loadUri: (
		spotifyUri: string,
		options?: {
			preferVideo?: boolean;
			startAt?: number;
			theme?: string;
		},
	) => void;
	play: () => void;
	pause: () => void;
	resume: () => void;
	togglePlay: () => void;
	restart: () => void;
	seek: (seconds: number) => void;
	destroy: () => void;
	addListener: (eventName: string, callback: (event: unknown) => void) => void;
	removeListener: (eventName: string) => void;
}

export interface SpotifyIFrameAPI {
	createController: (
		element: HTMLElement,
		options: {
			uri: string;
			width?: string | number;
			height?: number;
		},
		callback: (controller: SpotifyEmbedController) => void,
	) => void;
}

// Extend Window interface to include Spotify iFrame API
declare global {
	interface Window {
		onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
	}
}
