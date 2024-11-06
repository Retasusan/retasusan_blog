export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-16 border-2 border-solid border-slate-400 rounded-lg p-5">
      {children}
    </div>
  );
}
