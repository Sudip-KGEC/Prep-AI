export const GrayTitle = ({ children }) => (
  <span className="bg-gradient-to-br from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent">
    {children}
  </span>
);

export const PurpleTitle = ({ children }) => (
  <span className="bg-gradient-to-br from-violet-300 via-violet-400 to-violet-500 bg-clip-text text-transparent">
    {children}
  </span>
);

export const SectionLabel = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-[11px] font-semibold text-violet-400/70 tracking-[0.2em] uppercase mb-4">
    <span className="w-4 h-px bg-violet-400/50" />
    {children}
    <span className="w-4 h-px bg-violet-400/50" />
  </p>
);

export const SectionHeading = ({ gray, purple }) => (
  <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em]">
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <PurpleTitle>{purple}</PurpleTitle>
  </h2>
);

export default function PageHeader({ label, gray, purple, description, right }) {
  return (
    <div className="border-b border-violet-500/10 px-8 py-10 bg-[#09090f]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div>
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="font-serif text-5xl tracking-tight mt-1">
            {gray && <GrayTitle>{gray} </GrayTitle>}
            {purple && <PurpleTitle>{purple}</PurpleTitle>}
          </h1>
          {description && (
            <p className="text-sm text-stone-500 font-light mt-2">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}

export function MockUI({ rows = 3 }) {
  const widths = ["w-4/5", "w-3/5", "w-2/5", "w-4/5", "w-1/2"];
  const colors = [
    "bg-violet-400/10",
    "bg-white/5",
    "bg-violet-500/15",
    "bg-white/5",
    "bg-violet-400/8",
  ];

  return (
    <div className="mt-4 rounded-xl bg-[#141417] border border-violet-500/10 overflow-hidden">
      <div className="h-9 bg-violet-500/[0.03] border-b border-violet-500/10 flex items-center px-3.5 gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${widths[i]} ${colors[i]}`}
          />
        ))}
      </div>
    </div>
  );
}