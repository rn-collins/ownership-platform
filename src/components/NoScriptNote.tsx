// Shown only when JavaScript is off, in the place a tool would have appeared (MAIN-022).
export function NoScriptNote({ children }: { children: React.ReactNode }) {
  return <noscript><p className="noscript-note" role="note">{children}</p></noscript>;
}
