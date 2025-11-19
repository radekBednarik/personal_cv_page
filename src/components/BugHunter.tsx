import { Bug } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { triggerHaptic } from "@/lib/haptics";

interface BugState {
	isVisible: boolean;
	isSquashing: boolean;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	duration: number;
	squashX?: number;
	squashY?: number;
}

export function BugHunter() {
	const [bugState, setBugState] = useState<BugState>({
		isVisible: false,
		isSquashing: false,
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0,
		duration: 0,
	});

	// Generate random position on viewport edges
	const getRandomEdgePosition = useCallback((): {
		x: number;
		y: number;
		edge: "top" | "right" | "bottom" | "left";
	} => {
		const edge = ["top", "right", "bottom", "left"][
			Math.floor(Math.random() * 4)
		] as "top" | "right" | "bottom" | "left";
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		switch (edge) {
			case "top":
				return { x: Math.random() * viewportWidth, y: -50, edge };
			case "right":
				return {
					x: viewportWidth + 50,
					y: Math.random() * viewportHeight,
					edge,
				};
			case "bottom":
				return {
					x: Math.random() * viewportWidth,
					y: viewportHeight + 50,
					edge,
				};
			case "left":
				return { x: -50, y: Math.random() * viewportHeight, edge };
		}
	}, []);

	// Get opposite edge position for movement target
	const getOppositeEdgePosition = useCallback(
		(edge: "top" | "right" | "bottom" | "left"): { x: number; y: number } => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			switch (edge) {
				case "top":
					return { x: Math.random() * viewportWidth, y: viewportHeight + 50 };
				case "right":
					return { x: -50, y: Math.random() * viewportHeight };
				case "bottom":
					return { x: Math.random() * viewportWidth, y: -50 };
				case "left":
					return { x: viewportWidth + 50, y: Math.random() * viewportHeight };
			}
		},
		[],
	);

	// Spawn a new bug
	const spawnBug = useCallback(() => {
		const start = getRandomEdgePosition();
		const end = getOppositeEdgePosition(start.edge);
		const duration = 10000 + Math.random() * 5000; // 10-15 seconds

		setBugState({
			isVisible: true,
			isSquashing: false,
			startX: start.x,
			startY: start.y,
			endX: end.x,
			endY: end.y,
			duration,
		});

		// Auto-remove bug after it crosses viewport
		setTimeout(() => {
			setBugState((prev) =>
				prev.isVisible && !prev.isSquashing
					? { ...prev, isVisible: false }
					: prev,
			);
		}, duration);
	}, [getRandomEdgePosition, getOppositeEdgePosition]);

	// Schedule next bug spawn (5s initial, 10s subsequent)
	const scheduleNextBug = useCallback(
		(isInitial = false) => {
			// 5s initial, 10s subsequent for both dev and production
			const delay = isInitial ? 5000 : 10000;

			setTimeout(() => {
				spawnBug();
			}, delay);
		},
		[spawnBug],
	);

	// Handle bug click/tap
	const handleBugClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (bugState.isSquashing) return;

		// Get the bug's current position in the viewport
		const rect = event.currentTarget.getBoundingClientRect();
		const squashX = rect.left;
		const squashY = rect.top;

		// Trigger haptic feedback on mobile
		triggerHaptic(30);

		// Start squashing animation with captured position
		setBugState((prev) => ({ ...prev, isSquashing: true, squashX, squashY }));

		// Remove bug after squash animation completes
		setTimeout(() => {
			setBugState((prev) => ({ ...prev, isVisible: false }));
		}, 300);
	};

	// Initial setup and bug lifecycle management
	useEffect(() => {
		// Schedule first bug (with isInitial flag)
		scheduleNextBug(true);

		return () => {
			// Cleanup timers on unmount
		};
	}, [scheduleNextBug]);

	// Schedule next bug when current one disappears
	useEffect(() => {
		if (!bugState.isVisible) {
			scheduleNextBug(false);
		}
	}, [bugState.isVisible, scheduleNextBug]);

	if (!bugState.isVisible) return null;

	return (
		<div
			className="fixed"
			style={
				{
					left: bugState.isSquashing
						? `${bugState.squashX}px`
						: `${bugState.startX}px`,
					top: bugState.isSquashing
						? `${bugState.squashY}px`
						: `${bugState.startY}px`,
					zIndex: 1000,
					animation: bugState.isSquashing
						? undefined
						: `bugCrawl ${bugState.duration}ms linear forwards`,
					"--bug-start-x": `${bugState.startX}px`,
					"--bug-start-y": `${bugState.startY}px`,
					"--bug-end-x": `${bugState.endX}px`,
					"--bug-end-y": `${bugState.endY}px`,
				} as React.CSSProperties
			}
		>
			<button
				type="button"
				onClick={handleBugClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						// For keyboard, create a mock event with the current target
						const mockEvent = {
							currentTarget: e.currentTarget,
						} as React.MouseEvent<HTMLButtonElement>;
						handleBugClick(mockEvent);
					}
				}}
				className="cursor-crosshair relative"
				aria-label="Squash the bug"
			>
				{!bugState.isSquashing ? (
					<Bug
						className="text-gray-700 dark:text-gray-300 w-8 h-8 md:w-10 md:h-10"
						strokeWidth={1.5}
					/>
				) : (
					<div className="relative">
						{/* Squashed bug */}
						<Bug
							className="text-gray-700 dark:text-gray-300 w-8 h-8 md:w-10 md:h-10 animate-bugSquash"
							strokeWidth={1.5}
						/>
						{/* Splat effect - multiple circles expanding */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="absolute w-4 h-4 bg-red-500/40 rounded-full animate-splatExpand" />
							<div className="absolute w-6 h-6 bg-red-400/30 rounded-full animate-splatExpand animation-delay-50" />
							<div className="absolute w-8 h-8 bg-red-300/20 rounded-full animate-splatExpand animation-delay-100" />
						</div>
						{/* Particle effects */}
						<div className="absolute top-0 left-0 w-2 h-2 bg-gray-600 rounded-full animate-particle-1" />
						<div className="absolute top-0 right-0 w-2 h-2 bg-gray-600 rounded-full animate-particle-2" />
						<div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-600 rounded-full animate-particle-3" />
						<div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-600 rounded-full animate-particle-4" />
					</div>
				)}
			</button>
		</div>
	);
}
