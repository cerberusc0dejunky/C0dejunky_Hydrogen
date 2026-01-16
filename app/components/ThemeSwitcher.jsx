import { useEffect, useState } from 'react';

/**
 * ThemeSwitcher Component
 * 
 * Allows users to toggle between Horizon and c0dene0n themes
 * Can be placed in header or footer
 */
export function ThemeSwitcher() {
    const [theme, setTheme] = useState('horizon');

    useEffect(() => {
        // Get current theme from HTML element
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'horizon';
        setTheme(currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'horizon' ? 'c0dene0n' : 'horizon';
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);

        // Optional: Save preference to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-theme', newTheme);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-switcher"
            aria-label={`Switch to ${theme === 'horizon' ? 'c0dene0n' : 'Horizon'} theme`}
            title={`Currently using ${theme === 'horizon' ? 'Horizon' : 'c0dene0n'} theme`}
        >
            {theme === 'horizon' ? '🌈 Neon' : '🎨 Classic'}
        </button>
    );
}

/**
 * CSS for ThemeSwitcher (add to app.css or components.css)
 * 
 * .theme-switcher {
 *   background: var(--button-secondary-bg);
 *   color: var(--button-secondary-text);
 *   border: 1px solid var(--button-secondary-border);
 *   border-radius: var(--border-radius-buttons);
 *   padding: 8px 16px;
 *   font-size: 14px;
 *   cursor: pointer;
 *   transition: all 0.2s ease;
 * }
 * 
 * .theme-switcher:hover {
 *   background: var(--button-secondary-hover-bg);
 *   transform: scale(1.05);
 * }
 */
