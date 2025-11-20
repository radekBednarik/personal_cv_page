import { Bug } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { triggerHaptic } from "@/lib/haptics";

interface BugRank {
	id: number;
	name: string;
	minBugs: number;
}

const BUG_RANKS: BugRank[] = [
	{ id: 1, name: "Junior Test Engineer", minBugs: 1 },
	{ id: 2, name: "Bug Reproduction Intern", minBugs: 3 },
	{ id: 3, name: "Flaky Test Whisperer", minBugs: 7 },
	{ id: 4, name: "Automation Script Goblin", minBugs: 15 },
	{ id: 5, name: "Regression Necromancer", minBugs: 35 },
	{ id: 6, name: "QA Chaos Wrangler", minBugs: 80 },
	{ id: 7, name: "Senior Defect Detective", minBugs: 180 },
	{ id: 8, name: "SDET of Doom Scenarios", minBugs: 400 },
	{ id: 9, name: "Principal Flaky Test Exorcist", minBugs: 700 },
	{ id: 10, name: "Legendary Production Firefighter", minBugs: 1000 },
];

const BUG_HUNTER_TOTAL_KEY = "bugHunter.totalBugsSquashed";

function getRankForTotal(total: number): BugRank | null {
	if (total <= 0) return null;

	let currentRank: BugRank | null = null;
	for (const rank of BUG_RANKS) {
		if (total >= rank.minBugs) {
			currentRank = rank;
		} else {
			break;
		}
	}
	return currentRank;
}

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
	const [score, setScore] = useState(0);
	const [showScoreAnimation, setShowScoreAnimation] = useState(false);
	const [showFloatingOne, setShowFloatingOne] = useState(false);
	const [totalBugsSquashed, setTotalBugsSquashed] = useState(0);
	const [currentRank, setCurrentRank] = useState<BugRank | null>(null);

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

	const scoreAnimationTimeoutRef = useRef<number | null>(null);
	const floatingOneTimeoutRef = useRef<number | null>(null);
	const squashTimeoutRef = useRef<number | null>(null);
	const hasSpawnedOnceRef = useRef(false);

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
	}, [getRandomEdgePosition, getOppositeEdgePosition]);

	// Handle bug click/tap
	const handleBugClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (bugState.isSquashing) return;

		// Get the bug's current position in the viewport
		const rect = event.currentTarget.getBoundingClientRect();
		const squashX = rect.left;
		const squashY = rect.top;

		// Trigger haptic feedback on mobile
		triggerHaptic(30);

		// Increment score and trigger animations
		setScore((prev) => prev + 1);
		setShowScoreAnimation(true);
		setShowFloatingOne(true);

		// Determine latest total from localStorage (source of truth)
		let latestTotalFromStorage: number | null = null;
		if (typeof window !== "undefined") {
			try {
				const stored = window.localStorage.getItem(BUG_HUNTER_TOTAL_KEY);
				if (stored) {
					const parsed = Number.parseInt(stored, 10);
					if (!Number.isNaN(parsed) && parsed > 0) {
						latestTotalFromStorage = parsed;
					}
				}
			} catch {
				// Ignore storage errors
			}
		}

		// Update total bugs squashed and rank, and persist to localStorage
		setTotalBugsSquashed((prevTotal) => {
			const baseTotal = latestTotalFromStorage ?? prevTotal;
			const nextTotal = baseTotal + 1;
			setCurrentRank(getRankForTotal(nextTotal));

			if (typeof window !== "undefined") {
				try {
					window.localStorage.setItem(BUG_HUNTER_TOTAL_KEY, String(nextTotal));
				} catch {
					// Ignore storage errors
				}
			}

			return nextTotal;
		});

		// Reset animations after they complete
		if (scoreAnimationTimeoutRef.current) {
			clearTimeout(scoreAnimationTimeoutRef.current);
		}
		scoreAnimationTimeoutRef.current = window.setTimeout(() => {
			setShowScoreAnimation(false);
		}, 400);

		if (floatingOneTimeoutRef.current) {
			clearTimeout(floatingOneTimeoutRef.current);
		}
		floatingOneTimeoutRef.current = window.setTimeout(() => {
			setShowFloatingOne(false);
		}, 1000);

		// Start squashing animation with captured position
		setBugState((prev) => ({ ...prev, isSquashing: true, squashX, squashY }));

		// Remove bug after squash animation completes
		if (squashTimeoutRef.current) {
			clearTimeout(squashTimeoutRef.current);
		}
		squashTimeoutRef.current = window.setTimeout(() => {
			setBugState((prev) => ({ ...prev, isVisible: false }));
		}, 300);
	};

	// Load total bugs squashed and rank from localStorage, then spawn first bug
	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const storedTotal = window.localStorage.getItem(BUG_HUNTER_TOTAL_KEY);
				if (storedTotal) {
					const parsedTotal = Number.parseInt(storedTotal, 10);
					if (!Number.isNaN(parsedTotal) && parsedTotal > 0) {
						setTotalBugsSquashed(parsedTotal);
						setCurrentRank(getRankForTotal(parsedTotal));
					}
				}
			} catch {
				// Ignore storage errors
			}
		}

		spawnBug();
	}, [spawnBug]);

	// Spawn next bug when the previous one disappears
	useEffect(() => {
		if (!bugState.isVisible && hasSpawnedOnceRef.current) {
			spawnBug();
		}
		hasSpawnedOnceRef.current = bugState.isVisible;
	}, [bugState.isVisible, spawnBug]);

	// Cleanup pending timeouts on unmount
	useEffect(() => {
		return () => {
			if (scoreAnimationTimeoutRef.current !== null) {
				clearTimeout(scoreAnimationTimeoutRef.current);
			}
			if (floatingOneTimeoutRef.current !== null) {
				clearTimeout(floatingOneTimeoutRef.current);
			}
			if (squashTimeoutRef.current !== null) {
				clearTimeout(squashTimeoutRef.current);
			}
		};
	}, []);

	return (
		<>
			{/* Bug crawling across screen */}
			{bugState.isVisible && (
				<div
					className="fixed"
					onAnimationEnd={() => {
						// Bug finished traveling across the viewport without being squashed
						setBugState((prev) => {
							if (!prev.isVisible || prev.isSquashing) {
								return prev;
							}
							return { ...prev, isVisible: false };
						});
					}}
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
			)}

			{/* Score display in lower left corner */}
			{score > 0 && (
				<div className="fixed bottom-4 left-4 z-50">
					<div className="bg-gray-800/90 dark:bg-gray-700/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3">
						{/* Squashed bug icon with purple crossed circle */}
						<div className="relative flex items-center justify-center w-10 h-10">
							<Bug className="w-7 h-7 text-gray-300" strokeWidth={2.5} />
							<svg
								viewBox="0 0 24 24"
								className="absolute inset-0 w-full h-full text-purple-600 dark:text-purple-400"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								role="img"
								aria-label="Squashed bug indicator"
							>
								<circle cx="12" cy="12" r="11" />
								<line x1="5" y1="5" x2="19" y2="19" />
							</svg>
						</div>
						<span
							className={`text-2xl font-bold ${showScoreAnimation ? "animate-score-increment" : ""}`}
						>
							{score}
						</span>
					</div>

					{/* Floating +1 animation */}
					{showFloatingOne && (
						<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-float-up">
							<span className="text-green-500 text-3xl font-bold">+1</span>
						</div>
					)}
				</div>
			)}
		</>
	);
}
