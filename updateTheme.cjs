const fs = require('fs');

const path = 'src/styles/dashboard.css';
let css = fs.readFileSync(path, 'utf8');

// Replace top :root section (up to the body tag)
const cssLines = css.split('\n');
const bodyIndex = cssLines.findIndex(l => l.startsWith('body {'));

// Define new palette
const newRoot = `:root {
  --bg-primary: #F8FAFC;
  --bg-card: #FFFFFF;
  --bg-sidebar: #EAF2FF;
  --bg-navbar: rgba(255,255,255,0.72);
  --accent-primary: #2563EB;
  --accent-primary-hover: #1D4ED8;
  --accent-secondary: #7C3AED;
  --accent-teal: #14B8A6;
  --accent-success: #16A34A;
  --accent-warning: #F59E0B;
  --accent-error: #DC2626;
  --accent-info: #0EA5E9;
  --text-primary: #0F172A;
  --text-secondary: #334155;
  --text-muted: #64748B;
  --glass-border: #E2E8F0;
  --bg-input: #F8FAFC;
  --border-input: #CBD5E1;
  --bg-table-header: #E2E8F0;
  --bg-table-hover: #EEF4FF;
  
  --accent-gradient: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  --glass-bg: #FFFFFF;
  --glass-bg-hover: #F8FAFC;
  --glass-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark {
  --bg-primary: #0F172A;
  --bg-card: #111827;
  --bg-sidebar: #0B1220;
  --bg-navbar: rgba(15,23,42,0.72);
  --accent-primary: #60A5FA;
  --accent-primary-hover: #3B82F6;
  --accent-secondary: #A78BFA;
  --accent-teal: #2DD4BF;
  --accent-success: #4ADE80;
  --accent-warning: #FBBF24;
  --accent-error: #F87171;
  --accent-info: #38BDF8;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --glass-border: #334155;
  --bg-input: #1E293B;
  --border-input: #475569;
  --bg-table-header: #1E293B;
  --bg-table-hover: #1E293B;

  --accent-gradient: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
  --glass-bg: #111827;
  --glass-bg-hover: #1E293B;
  --glass-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
}

/* ---------- Reset ---------- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
`;

// Replace from start to 'body {'
css = newRoot + css.substring(css.indexOf('body {'));

css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.04\)/g, 'var(--glass-bg)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.08\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.14\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.03\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.15\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.65\)/g, 'var(--text-secondary)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.7\)/g, 'var(--text-secondary)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.6\)/g, 'var(--text-secondary)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.4\)/g, 'var(--text-muted)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.06\)/g, 'var(--bg-table-header)');
css = css.replace(/rgba\(10,\s*10,\s*26,\s*0\.92\)/g, 'var(--bg-navbar)');
css = css.replace(/rgba\(10,\s*10,\s*26,\s*0\.97\)/g, 'var(--bg-card)');
css = css.replace(/rgba\(10,\s*10,\s*26,\s*0\.98\)/g, 'var(--bg-card)');
css = css.replace(/rgba\(22,\s*22,\s*56,\s*0\.97\)/g, 'var(--bg-card)');
css = css.replace(/#fff/gi, 'var(--text-primary)');
css = css.replace(/#ffffff/gi, 'var(--text-primary)');

fs.writeFileSync(path, css);
