const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const I = ({ d, size = 20 }: { d: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...P}>{d}</svg>
);
export const Search = () => <I d={<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>} />;
export const Reset = () => <I d={<><path d="M4 12a8 8 0 1 0 2.6-5.9" /><path d="M4 4v4.5h4.5" /></>} />;
export const Xray = () => <I d={<><circle cx="12" cy="12" r="8" strokeDasharray="2.5 2.5" /><circle cx="12" cy="12" r="3.2" /></>} />;
export const Slice = () => <I d={<><path d="M3 12h18" /><path d="M7 7.5c1.5-2 3.2-3 5-3s3.5 1 5 3M7 16.5c1.5 2 3.2 3 5 3s3.5-1 5-3" /></>} />;
export const Eye = () => <I d={<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></>} />;
export const EyeOff = () => <I d={<><path d="M3 3l18 18" /><path d="M10.6 5.6A9.8 9.8 0 0 1 12 5.5C18 5.5 21.5 12 21.5 12a17 17 0 0 1-3 3.8M6.4 6.9C3.9 8.6 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1" /></>} />;
export const Target = () => <I d={<><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>} />;
export const Bookmark = () => <I d={<path d="M6.5 3.5h11v17L12 16.5l-5.5 4Z" />} />;
export const Close = () => <I d={<path d="M6 6l12 12M18 6 6 18" />} />;
export const Layers = () => <I d={<><path d="m12 3.5 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>} />;
export const Flip = () => <I d={<><path d="M7 4v16M17 4v16" /><path d="m4 8 3-4 3 4M14 16l3 4 3-4" /></>} />;
export const Expand = () => <I d={<path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />} />;
export const Sun = () => <I d={<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>} />;
export const Moon = () => <I d={<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />} />;
export const Undo = () => <I d={<><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></>} />;
export const Rotate = () => <I d={<><ellipse cx="12" cy="12" rx="9" ry="3.6" /><path d="M12 3v18" strokeDasharray="2 2.5" /></>} />;
