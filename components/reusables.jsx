export const GrayTitle = ({ children }) => (
  <span className="bg-linear-to-br from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent">
    {children}
  </span>
);
export const PurpleTitle = ({ children }) => (
  <span className="bg-linear-to-br from-violet-300 via-violet-400 to-violet-500 bg-clip-text text-transparent">
    {children}
  </span>
);
export const SectionLabel = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 tracking-[0.14em] uppercase mb-4">
    <span className="w-4 h-px bg-violet-400" />
    {children}
  </p>
);


export const SectionHeading = ({ gray, purple }) => (
  <h2
    className={`font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em]`}
  >
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <PurpleTitle>{purple}</PurpleTitle>
  </h2>
);

export default function PageHeader({ label, gray, gold, description, right }) {
  return (
    <div className="border-b border-white/8 px-8 py-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div>
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="font-serif text-5xl tracking-tight mt-1">
            {gray && <GrayTitle>{gray} </GrayTitle>}
            {gold && <PurpleTitle>{gold}</PurpleTitle>}
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
    "bg-white/5",
    "bg-white/5",
    "bg-amber-400/15",
    "bg-white/5",
    "bg-white/5",
  ];

  return (
    <div className="mt-5 rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
      <div className="h-9 bg-white/5 border-b border-white/10 flex items-center px-3.5 gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#9813cc]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
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