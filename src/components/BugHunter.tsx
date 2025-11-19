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
	const handleBugClick = () => {
		if (bugState.isSquashing) return;

		// Trigger haptic feedback on mobile
		triggerHaptic(30);

		// Start squashing animation
		setBugState((prev) => ({ ...prev, isSquashing: true }));

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
		<button
			type="button"
			onClick={handleBugClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleBugClick();
				}
			}}
			className={`fixed cursor-pointer ${
				bugState.isSquashing ? "animate-bugSquash" : ""
			}`}
			style={
				{
					left: `${bugState.startX}px`,
					top: `${bugState.startY}px`,
					zIndex: 1000,
					animation: bugState.isSquashing
						? "bugSquash 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
						: `bugCrawl ${bugState.duration}ms linear forwards`,
					"--bug-end-x": `${bugState.endX}px`,
					"--bug-end-y": `${bugState.endY}px`,
				} as React.CSSProperties
			}
			aria-label="Squash the bug"
		>
			<Bug
				className="text-gray-700 dark:text-gray-300 w-8 h-8 md:w-10 md:h-10"
				strokeWidth={1.5}
			/>
		</button>
	);
}
