## Packages
framer-motion | Complex animations for the quiz wizard steps
lucide-react | Iconography throughout the application
zod | Schema validation for the form wizard
react-hook-form | Form state management
@hookform/resolvers | Zod resolver for react-hook-form
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge tailwind classes without conflicts

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
colors: {
  allianz: {
    DEFAULT: "#003781",
    light: "#004A93",
    dark: "#00285E",
    50: "#E6F0FA",
    100: "#CCE0F5",
  }
}
