import { useMemo, useState } from 'react';
import { Play, Copy } from 'lucide-react';

const STARTER = `// JS sandbox
const skills = ["React", "TypeScript", "AI/ML"];
const summary = skills.map((s, i) => \`\${i + 1}. \${s}\`).join("\\n");
console.log("Ketan Stack:");
console.log(summary);`;

function buildSandboxHtml(code: string): string {
  return `<!doctype html><html><body style="margin:0;padding:12px;background:#0a0a0a;color:#f8f8f8;font-family:monospace;"><pre id="out"></pre><script>
const out = document.getElementById('out');
const write = (...args) => { out.textContent += args.join(' ') + '\\n'; };
console.log = write;
try {
${code}
} catch (e) {
  write('Error:', e.message);
}
</script></body></html>`;
}

export function CodeSandboxCard() {
  const [code, setCode] = useState(STARTER);
  const [runCount, setRunCount] = useState(0);
  const srcDoc = useMemo(() => buildSandboxHtml(code), [code]);

  return (
    <section className="glass-card flex h-auto flex-col overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-surface)_96%,transparent),color-mix(in_srgb,var(--bg-elevated)_98%,transparent))] p-3 xl:h-[20.5rem] xl:min-h-[20.5rem]">
      <header className="mb-2.5 flex shrink-0 items-center justify-between">
        <h3 className="type-heading text-base text-[var(--text-100)]">Interactive Code Sandbox</h3>
        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-400)]">Isolated iframe</span>
      </header>

      <div className="grid min-h-0 flex-1 items-stretch gap-2 xl:grid-cols-2">
        <div className="flex min-h-0 h-full flex-col">
          <label htmlFor="sandbox-code" className="mb-1.5 block min-h-[1.25rem] text-xs text-[var(--text-400)]">JavaScript snippet</label>
          <textarea
            id="sandbox-code"
            className="input-surface min-h-[132px] flex-1 font-mono text-[11px] xl:min-h-0"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="mt-2.5 flex shrink-0 items-center gap-2">
            <button type="button" className="btn-primary focus-ring min-h-[40px] px-3" onClick={() => setRunCount((c) => c + 1)}>
              <Play className="h-4 w-4" /> Run
            </button>
            <button type="button" className="btn-outline focus-ring min-h-[40px] px-3" onClick={() => navigator.clipboard.writeText(code)}>
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
        </div>

        <div className="flex min-h-0 h-full flex-col">
          <p className="mb-1.5 min-h-[1.25rem] text-xs text-[var(--text-400)]">Output console</p>
          <iframe
            key={runCount}
            title="Sandbox output"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="min-h-[132px] w-full flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] xl:min-h-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
