import { clearConsentState } from "@/lib/consent";
import { reopenConsentBanner } from "./CookieConsentBanner";

interface ManageCookiesProps {
	className?: string;
}

export function ManageCookies({ className = "" }: ManageCookiesProps) {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		clearConsentState();
		reopenConsentBanner();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`text-purple-600 dark:text-purple-400 font-semibold transition-colors transition-transform duration-200 hover:text-purple-700 dark:hover:text-purple-300 hover:scale-105 ${className}`}
			aria-label="Manage cookie preferences"
		>
			Manage Cookies
		</button>
	);
}
