import { Check, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackEvent } from "@/lib/analytics";
import { triggerHaptic } from "@/lib/haptics";
import {
	getThemeMode,
	getThemeStyle,
	setThemeStyle,
	type ThemeMode,
	type ThemeStyle,
} from "@/lib/theme";

export function ThemeSwitcher() {
	const [style, setStyle] = useState<ThemeStyle>("purple");
	const [mode, setMode] = useState<ThemeMode>("light");

	// Initialize theme from localStorage on mount
	useEffect(() => {
		setStyle(getThemeStyle());
		setMode(getThemeMode());
	}, []);

	// Handle style change
	const handleStyleChange = (newStyle: ThemeStyle) => {
		const previousStyle = style;
		setStyle(newStyle);
		setThemeStyle(newStyle);
		triggerHaptic();

		// Track analytics
		trackEvent("theme_style_changed", {
			previous_style: previousStyle,
			new_style: newStyle,
			current_mode: mode,
		});
	};

	return (
		<div className="flex items-center gap-2">
			{/* Style Selector Dropdown */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
						aria-label="Select theme style"
						onTouchStart={() => triggerHaptic()}
					>
						<Palette className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="dark:bg-gray-900 dark:border-gray-800"
				>
					<DropdownMenuItem
						onClick={() => handleStyleChange("purple")}
						className="cursor-pointer dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
					>
						<Check
							className={`mr-2 h-4 w-4 ${style === "purple" ? "opacity-100" : "opacity-0"}`}
						/>
						Purple
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStyleChange("cyberpunk")}
						className="cursor-pointer dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
					>
						<Check
							className={`mr-2 h-4 w-4 ${style === "cyberpunk" ? "opacity-100" : "opacity-0"}`}
						/>
						Cyberpunk
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
