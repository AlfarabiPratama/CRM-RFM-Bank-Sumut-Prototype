// Color mappings for dynamic Tailwind classes
// Tailwind requires full class names at compile time, so we use object maps

export const bgColors: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
  yellow: 'bg-yellow-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
};

export const bgOpacityColors: Record<string, string> = {
  blue: 'bg-blue-500 bg-opacity-20',
  green: 'bg-green-500 bg-opacity-20',
  purple: 'bg-purple-500 bg-opacity-20',
  orange: 'bg-orange-500 bg-opacity-20',
  red: 'bg-red-500 bg-opacity-20',
  cyan: 'bg-cyan-500 bg-opacity-20',
  yellow: 'bg-yellow-500 bg-opacity-20',
  emerald: 'bg-emerald-500 bg-opacity-20',
  amber: 'bg-amber-500 bg-opacity-20',
  indigo: 'bg-indigo-500 bg-opacity-20',
};

export const textColors: Record<string, string> = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
  cyan: 'text-cyan-400',
  yellow: 'text-yellow-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  indigo: 'text-indigo-400',
};

export const borderColors: Record<string, string> = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  red: 'border-red-500',
  cyan: 'border-cyan-500',
  yellow: 'border-yellow-500',
  emerald: 'border-emerald-500',
  amber: 'border-amber-500',
  indigo: 'border-indigo-500',
};

export const gradientColors: Record<string, string> = {
  blue: 'from-blue-600 to-blue-500',
  green: 'from-green-600 to-green-500',
  purple: 'from-purple-600 to-purple-500',
  orange: 'from-orange-600 to-orange-500',
  red: 'from-red-600 to-red-500',
  cyan: 'from-cyan-600 to-cyan-500',
  yellow: 'from-yellow-600 to-yellow-500',
  emerald: 'from-emerald-600 to-emerald-500',
  amber: 'from-amber-600 to-amber-500',
  indigo: 'from-indigo-600 to-indigo-500',
};

export const gradientBgColors: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-600 to-blue-500',
  green: 'bg-gradient-to-br from-green-600 to-green-500',
  purple: 'bg-gradient-to-br from-purple-600 to-purple-500',
  orange: 'bg-gradient-to-br from-orange-600 to-orange-500',
  red: 'bg-gradient-to-br from-red-600 to-red-500',
  cyan: 'bg-gradient-to-br from-cyan-600 to-cyan-500',
  yellow: 'bg-gradient-to-br from-yellow-600 to-yellow-500',
  emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-500',
  amber: 'bg-gradient-to-br from-amber-600 to-amber-500',
  indigo: 'bg-gradient-to-br from-indigo-600 to-indigo-500',
};

// Status color mappings
export const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: 'bg-green-500 bg-opacity-20', text: 'text-green-400', border: 'border-green-500' },
  inactive: { bg: 'bg-slate-500 bg-opacity-20', text: 'text-slate-400', border: 'border-slate-500' },
  pending: { bg: 'bg-yellow-500 bg-opacity-20', text: 'text-yellow-400', border: 'border-yellow-500' },
  error: { bg: 'bg-red-500 bg-opacity-20', text: 'text-red-400', border: 'border-red-500' },
  success: { bg: 'bg-green-500 bg-opacity-20', text: 'text-green-400', border: 'border-green-500' },
};

// Priority color mappings
export const priorityColors: Record<string, { bg: string; text: string }> = {
  low: { bg: 'bg-slate-500 bg-opacity-20', text: 'text-slate-400' },
  medium: { bg: 'bg-blue-500 bg-opacity-20', text: 'text-blue-400' },
  high: { bg: 'bg-orange-500 bg-opacity-20', text: 'text-orange-400' },
  critical: { bg: 'bg-red-500 bg-opacity-20', text: 'text-red-400' },
};
