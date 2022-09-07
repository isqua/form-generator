type UnresolvedClassName = string | undefined | boolean | null;

export const clx = (...args: UnresolvedClassName[]): string => args.filter(Boolean).join(' ');
