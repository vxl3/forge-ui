// Premium Seed Data for ForgeUI - 60+ components

export const categoriesSeed = [
  { id: "cat-buttons", name: "Buttons", slug: "buttons", description: "Interactive buttons with modern effects", icon: "mouse-pointer-2", color: "#6366f1" },
  { id: "cat-inputs", name: "Inputs", slug: "inputs", description: "Form inputs & controls", icon: "text-cursor-input", color: "#06b6d4" },
  { id: "cat-cards", name: "Cards", slug: "cards", description: "Content cards & containers", icon: "layout-grid", color: "#8b5cf6" },
  { id: "cat-forms", name: "Forms", slug: "forms", description: "Login, signup, complete forms", icon: "form-input", color: "#ec4899" },
  { id: "cat-navigation", name: "Navigation", slug: "navigation", description: "Navbars, tabs, breadcrumbs", icon: "navigation", color: "#f59e0b" },
  { id: "cat-loaders", name: "Loaders", slug: "loaders", description: "Spinners, skeletons, progress", icon: "loader-2", color: "#10b981" },
  { id: "cat-effects", name: "Effects", slug: "effects", description: "Glass, neon, gradients, hover", icon: "sparkles", color: "#ef4444" },
  { id: "cat-animations", name: "Animations", slug: "animations", description: "CSS animations & micro-interactions", icon: "wand-2", color: "#14b8a6" },
  { id: "cat-layout", name: "Layout", slug: "layout", description: "Hero, footers, pricing, etc", icon: "layout", color: "#3b82f6" },
  { id: "cat-feedback", name: "Feedback", slug: "feedback", description: "Alerts, toasts, badges", icon: "bell", color: "#f97316" },
]

export const tagsSeed = [
  { id: "tag-css", name: "CSS", slug: "css", color: "#264de4" },
  { id: "tag-html", name: "HTML", slug: "html", color: "#e34c26" },
  { id: "tag-js", name: "JavaScript", slug: "javascript", color: "#f0db4f" },
  { id: "tag-responsive", name: "Responsive", slug: "responsive" },
  { id: "tag-animated", name: "Animated", slug: "animated" },
  { id: "tag-glass", name: "Glass", slug: "glass" },
  { id: "tag-neon", name: "Neon", slug: "neon" },
  { id: "tag-minimal", name: "Minimal", slug: "minimal" },
  { id: "tag-modern", name: "Modern", slug: "modern" },
  { id: "tag-gradient", name: "Gradient", slug: "gradient" },
  { id: "tag-hover", name: "Hover", slug: "hover" },
  { id: "tag-3d", name: "3D", slug: "3d" },
  { id: "tag-dark", name: "Dark", slug: "dark" },
]

type ComponentSeed = {
  title: string
  slug: string
  description: string
  categoryId: string
  html: string
  css: string
  js: string
  tags: string[]
  featured?: boolean
}

export const componentsSeed: ComponentSeed[] = [
  // BUTTONS 10
  {
    title: "Glass Morph Button",
    slug: "glass-morph-button",
    description: "Elegant glassmorphism button with blur and subtle border glow",
    categoryId: "cat-buttons",
    html: `<button class="glass-btn">Glass Button</button>`,
    css: `.glass-btn {
  position: relative;
  padding: 12px 28px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 12px;
  color: white;
  font-weight: 500;
  letter-spacing: -0.01em;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2);
}
.glass-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(200px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}
.glass-btn:hover::before { opacity: 1; }
.glass-btn:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25);
}
body { background: #0a0a0b; display: grid; place-items: center; min-height: 100vh; margin: 0; }`,
    js: `const btn = document.querySelector('.glass-btn');
btn.addEventListener('mousemove', (e)=>{
  const r = btn.getBoundingClientRect();
  btn.style.setProperty('--x', (e.clientX - r.left)+'px');
  btn.style.setProperty('--y', (e.clientY - r.top)+'px');
});`,
    tags: ["tag-css","tag-glass","tag-modern","tag-hover"],
    featured: true,
  },
  {
    title: "Neon Pulse Button",
    slug: "neon-pulse-button",
    description: "Cyberpunk neon button with pulsating glow",
    categoryId: "cat-buttons",
    html: `<button class="neon-btn"><span>NEON</span><div class="glow"></div></button>`,
    css: `.neon-btn {
  position: relative;
  padding: 14px 36px;
  background: #111;
  border: 1px solid #ff00ff;
  border-radius: 8px;
  color: #ff00ff;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 10px #ff00ff60, inset 0 0 10px #ff00ff20;
  transition: all 0.3s;
}
.neon-btn .glow {
  position: absolute;
  inset: -50%;
  background: conic-gradient(from 0deg, transparent, #ff00ff, transparent);
  animation: rotate 2s linear infinite;
  opacity: 0.5;
  z-index: -1;
}
.neon-btn:hover { box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff80, inset 0 0 20px #ff00ff30; color: white; text-shadow: 0 0 10px #ff00ff; }
@keyframes rotate { to { transform: rotate(360deg); } }
body { background: #0a0a0a; display: grid; place-items: center; min-height: 100vh; margin: 0; }`,
    js: ``,
    tags: ["tag-css","tag-neon","tag-animated"],
    featured: true,
  },
  {
    title: "Gradient Shift Button",
    slug: "gradient-shift-button",
    description: "Button with animated gradient border and shift on hover",
    categoryId: "cat-buttons",
    html: `<button class="grad-btn">Shift Gradient</button>`,
    css: `.grad-btn {
  padding: 13px 30px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(100deg, #6366f1, #8b5cf6, #ec4899, #6366f1);
  background-size: 300% 100%;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  animation: shiftBg 4s linear infinite;
  box-shadow: 0 4px 14px rgba(99,102,241,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.grad-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(99,102,241,0.4); }
.grad-btn:active { transform: translateY(0) scale(0.98); }
@keyframes shiftBg { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
body{ background:#fafafa; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-gradient","tag-modern","tag-animated"],
  },
  {
    title: "3D Pressable Button",
    slug: "3d-pressable-button",
    description: "Tactile 3D button with depth and press animation",
    categoryId: "cat-buttons",
    html: `<button class="btn-3d"><span class="front">Press Me</span></button>`,
    css: `.btn-3d { background: #111827; border: none; border-radius: 12px; padding: 0; cursor: pointer; }
.btn-3d .front {
  display: block;
  padding: 12px 28px;
  border-radius: 12px;
  background: #f9fafb;
  color: #111827;
  font-weight: 600;
  transform: translateY(-6px);
  box-shadow: 0 1px 0 #e5e7eb;
  transition: transform 0.15s cubic-bezier(.3,.7,.4,1.5);
}
.btn-3d:active .front { transform: translateY(-2px); }
.btn-3d:hover .front { transform: translateY(-8px); background: white; }
.btn-3d { position: relative; }
.btn-3d::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(to bottom, #374151, #111827);
  z-index: -1;
  transform: translateY(4px);
}
body { background: #f3f4f6; display: grid; place-items: center; min-height: 100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-3d","tag-minimal"],
  },
  {
    title: "Shimmer Border Button",
    slug: "shimmer-border-button",
    description: "Premium button with shimmering border animation",
    categoryId: "cat-buttons",
    html: `<button class="shimmer-btn">Premium Access</button>`,
    css: `.shimmer-btn {
  position: relative;
  padding: 12px 26px;
  background: #0a0a0a;
  color: white;
  border-radius: 12px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
}
.shimmer-btn::before {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1px;
  background: linear-gradient(90deg, transparent, white, transparent);
  border-radius: 12px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: shimmerMove 2s linear infinite;
}
@keyframes shimmerMove { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.shimmer-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(400px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.shimmer-btn:hover::after { opacity: 1; }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const b=document.querySelector('.shimmer-btn');
b.addEventListener('mousemove', e=>{
  const r=b.getBoundingClientRect();
  b.style.setProperty('--mx', (e.clientX-r.left)+'px');
  b.style.setProperty('--my', (e.clientY-r.top)+'px');
})`,
    tags: ["tag-css","tag-modern","tag-dark","tag-hover"],
    featured: true,
  },
  {
    title: "Magnetic Hover Button",
    slug: "magnetic-hover-button",
    description: "Button that follows cursor with magnetic effect",
    categoryId: "cat-buttons",
    html: `<a class="mag-wrap"><button class="mag-btn">Hover Magnet</button></a>`,
    css: `.mag-wrap { display: inline-block; padding: 40px; }
.mag-btn {
  padding: 14px 32px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.mag-btn:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const wrap=document.querySelector('.mag-wrap');
const btn=document.querySelector('.mag-btn');
wrap.addEventListener('mousemove', (e)=>{
  const r=wrap.getBoundingClientRect();
  const x=e.clientX - r.left - r.width/2;
  const y=e.clientY - r.top - r.height/2;
  btn.style.transform='translate('+x*0.3+'px,'+y*0.5+'px)';
});
wrap.addEventListener('mouseleave',()=>{ btn.style.transform='translate(0,0)'; });`,
    tags: ["tag-js","tag-hover","tag-modern"],
  },
  {
    title: "Liquid Blob Button",
    slug: "liquid-blob-button",
    description: "Playful liquid morphing button",
    categoryId: "cat-buttons",
    html: `<button class="liquid-btn"><span>GOOEY</span><div class="blob"></div><div class="blob"></div><div class="blob"></div></button>`,
    css: `.liquid-btn {
  position: relative;
  padding: 14px 36px;
  border: none;
  border-radius: 999px;
  background: #111;
  color: white;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
}
.liquid-btn .blob {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #6366f1;
  border-radius: 50%;
  filter: blur(2px);
  z-index: -1;
  transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
}
.blob:nth-child(2){ left:-20px; top:-10px; }
.blob:nth-child(3){ right:-20px; top:10px; background:#8b5cf6; }
.blob:nth-child(4){ left:30%; bottom:-30px; background:#ec4899; }
.liquid-btn:hover .blob { transform: scale(1.8); }
body { background:#fff; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated","tag-modern"],
  },
  {
    title: "Retro Pixel Button",
    slug: "retro-pixel-button",
    description: "8-bit style pixel button with shadow",
    categoryId: "cat-buttons",
    html: `<button class="pixel-btn">START GAME</button>`,
    css: `.pixel-btn {
  padding: 12px 24px;
  background: #facc15;
  border: 3px solid black;
  box-shadow: 4px 4px 0 black;
  font-family: monospace;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.1s;
  image-rendering: pixelated;
}
.pixel-btn:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 black; }
.pixel-btn:hover { background: #fde047; }
body { background:#fef9c3; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Minimal Underline Button",
    slug: "minimal-underline-button",
    description: "Ultra minimal button with animated underline",
    categoryId: "cat-buttons",
    html: `<button class="mini-btn">View Project <span class="arrow">→</span></button>`,
    css: `.mini-btn {
  position: relative;
  background: none;
  border: none;
  padding: 8px 0;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.mini-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform-origin: right;
  transform: scaleX(1);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.mini-btn:hover::after { transform-origin: left; transform: scaleX(0); }
.mini-btn .arrow { transition: transform 0.3s; }
.mini-btn:hover .arrow { transform: translateX(4px); }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal","tag-hover"],
  },
  {
    title: "Icon Expand Button",
    slug: "icon-expand-button",
    description: "Button expands to reveal icon animation",
    categoryId: "cat-buttons",
    html: `<button class="expand-btn"><span class="text">Send Message</span><span class="icon">✦</span></button>`,
    css: `.expand-btn {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 20px 12px 24px;
  background: #111;
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}
.expand-btn .icon {
  width: 0;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  margin-left: 0;
}
.expand-btn:hover { padding-right: 16px; }
.expand-btn:hover .icon { width: 20px; opacity: 1; transform: translateX(0); margin-left: 8px; }
body { background:#f5f5f5; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern","tag-hover"],
  },

  // INPUTS 10
  {
    title: "Floating Label Input",
    slug: "floating-label-input",
    description: "Modern input with floating label animation",
    categoryId: "cat-inputs",
    html: `<div class="field"><input type="text" id="f1" placeholder=" " required><label for="f1">Email Address</label><div class="line"></div></div>`,
    css: `.field { position: relative; width: 300px; }
.field input {
  width: 100%;
  padding: 18px 16px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  background: white;
}
.field label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 15px;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
}
.field input:focus + label, .field input:not(:placeholder-shown) + label {
  top: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #111827;
}
.field input:focus { border-color: #111827; box-shadow: 0 0 0 3px rgba(0,0,0,0.05); }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
    featured: true,
  },
  {
    title: "Glass Input",
    slug: "glass-input",
    description: "Translucent glass input with blur",
    categoryId: "cat-inputs",
    html: `<div class="glass-field"><span class="icon">⌕</span><input placeholder="Search..."><span class="kbd">⌘K</span></div>`,
    css: `.glass-field {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 340px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}
.glass-field input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
}
.glass-field input::placeholder { color: rgba(255,255,255,0.5); }
.glass-field .kbd {
  font-size: 11px;
  padding: 3px 6px;
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
}
body { background: linear-gradient(135deg,#667eea,#764ba2); display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-glass"],
  },
  {
    title: "Neon Focus Input",
    slug: "neon-focus-input",
    description: "Input with neon glow on focus",
    categoryId: "cat-inputs",
    html: `<div class="neon-field"><input type="text" placeholder="Enter username"></div>`,
    css: `.neon-field { position: relative; width: 300px; }
.neon-field input {
  width: 100%;
  padding: 14px 16px;
  background: #111;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  outline: none;
  transition: all 0.3s;
}
.neon-field input:focus { border-color: #0ff; box-shadow: 0 0 0 3px rgba(0,255,255,0.1), 0 0 20px rgba(0,255,255,0.2); }
body { background:#0a0a0a; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-neon","tag-dark"],
  },
  {
    title: "OTP Code Input",
    slug: "otp-code-input",
    description: "OTP with auto-focus and animation",
    categoryId: "cat-inputs",
    html: `<div class="otp"><input maxlength="1"><input maxlength="1"><input maxlength="1"><input maxlength="1"></div>`,
    css: `.otp { display: flex; gap: 10px; }
.otp input {
  width: 52px;
  height: 64px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s;
  background: white;
}
.otp input:focus { border-color: #111; box-shadow: 0 0 0 3px rgba(0,0,0,0.08); transform: translateY(-2px); }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const inputs=document.querySelectorAll('.otp input');
inputs.forEach((inp,i)=>{
  inp.addEventListener('input',()=>{
    if(inp.value && i<3) inputs[i+1].focus();
  });
  inp.addEventListener('keydown',(e)=>{
    if(e.key==='Backspace' && !inp.value && i>0) inputs[i-1].focus();
  });
});`,
    tags: ["tag-js","tag-modern"],
  },
  {
    title: "Password Strength Input",
    slug: "password-strength-input",
    description: "Input with live strength meter",
    categoryId: "cat-inputs",
    html: `<div class="pw-wrap"><input type="password" id="pw" placeholder="Password"><div class="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div><span class="hint">Type to check strength</span></div>`,
    css: `.pw-wrap { width: 320px; }
.pw-wrap input { width: 100%; padding: 14px 16px; border: 1px solid #e5e7eb; border-radius: 12px; outline: none; font-size: 14px; }
.bars { display: flex; gap: 6px; margin-top: 10px; }
.bar { height: 4px; flex: 1; background: #f3f4f6; border-radius: 999px; transition: all 0.3s; }
.bar.active { background: #ef4444; }
.bar.active.mid { background: #f59e0b; }
.bar.active.strong { background: #10b981; }
.hint { font-size: 12px; color: #9ca3af; margin-top: 8px; display: block; }
body { background:#fff; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const pw=document.getElementById('pw');
const bars=document.querySelectorAll('.bar');
const hint=document.querySelector('.hint');
pw.addEventListener('input',()=>{
  const v=pw.value;
  let score=0;
  if(v.length>3) score++;
  if(v.length>6) score++;
  if(/[A-Z]/.test(v) && /[0-9]/.test(v)) score++;
  if(/[^A-Za-z0-9]/.test(v)) score++;
  bars.forEach((b,i)=>{
    b.className='bar';
    if(i<score){
      b.classList.add('active');
      if(score>2) b.classList.add(score>3?'strong':'mid');
    }
  });
  hint.textContent=['Too weak','Weak','Fair','Good','Strong'][score]||'Type to check';
});`,
    tags: ["tag-js","tag-modern"],
  },
  {
    title: "Search with Suggestions",
    slug: "search-suggestions-input",
    description: "Search input with dropdown suggestions",
    categoryId: "cat-inputs",
    html: `<div class="s-wrap"><div class="s-box"><span>⌕</span><input placeholder="Search docs"><span class="esc">ESC</span></div><div class="suggest"><div>⚡ Quick Start</div><div>🎨 Components API</div><div>📚 Guides</div></div></div>`,
    css: `.s-wrap { width: 360px; position: relative; }
.s-box { display:flex; align-items:center; gap:10px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; background:white; box-shadow:0 4px 12px rgba(0,0,0,0.05); }
.s-box input { flex:1; border:none; outline:none; font-size:14px; }
.s-box .esc { font-size:10px; border:1px solid #e5e7eb; padding:2px 6px; border-radius:4px; color:#9ca3af; }
.suggest { margin-top:8px; background:white; border:1px solid #e5e7eb; border-radius:12px; padding:8px; box-shadow:0 8px 24px rgba(0,0,0,0.08); }
.suggest div { padding:10px 12px; border-radius:8px; font-size:13px; cursor:pointer; }
.suggest div:hover { background:#f9fafb; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
  },
  {
    title: "Currency Input",
    slug: "currency-input",
    description: "Input with currency selector",
    categoryId: "cat-inputs",
    html: `<div class="cur-wrap"><select><option>USD $</option><option>EUR €</option><option>IQD ع.د</option></select><input value="1,250.00"></div>`,
    css: `.cur-wrap { display:flex; width:320px; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:white; }
.cur-wrap select { border:none; padding:14px 12px; background:#f9fafb; border-right:1px solid #e5e7eb; font-weight:500; outline:none; }
.cur-wrap input { flex:1; border:none; padding:14px 16px; font-weight:600; font-size:15px; outline:none; }
body { background:#fff; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Tag Input",
    slug: "tag-input",
    description: "Input that creates tags on enter",
    categoryId: "cat-inputs",
    html: `<div class="tags-wrap"><div class="tags"><span class="tag">React <b>×</b></span><span class="tag">Tailwind <b>×</b></span></div><input placeholder="Add tag..."></div>`,
    css: `.tags-wrap { width:360px; min-height:56px; display:flex; flex-wrap:wrap; gap:8px; padding:10px 12px; border:1px solid #e5e7eb; border-radius:12px; background:white; }
.tags { display:flex; gap:6px; flex-wrap:wrap; }
.tag { background:#111; color:white; padding:4px 10px; border-radius:999px; font-size:13px; display:flex; align-items:center; gap:6px; }
.tag b { cursor:pointer; opacity:0.6; }
.tags-wrap input { flex:1; min-width:100px; border:none; outline:none; font-size:14px; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const wrap=document.querySelector('.tags-wrap');
const input=wrap.querySelector('input');
const tagsEl=wrap.querySelector('.tags');
input.addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && input.value.trim()){
    const tag=document.createElement('span');
    tag.className='tag';
    tag.innerHTML=input.value+' <b>×</b>';
    tag.querySelector('b').onclick=()=>tag.remove();
    tagsEl.appendChild(tag);
    input.value='';
  }
});
tagsEl.querySelectorAll('b').forEach(b=> b.onclick=()=> b.parentElement.remove());`,
    tags: ["tag-js","tag-modern"],
  },
  {
    title: "File Drop Input",
    slug: "file-drop-input",
    description: "Drag & drop file upload zone",
    categoryId: "cat-inputs",
    html: `<div class="drop-zone"><div class="icon">⇡</div><p>Drop files or <span>browse</span></p><small>PNG, JPG up to 10MB</small></div>`,
    css: `.drop-zone { width:360px; padding:32px; border:1.5px dashed #d1d5db; border-radius:16px; text-align:center; background:#fcfcfc; transition: all 0.2s; cursor:pointer; }
.drop-zone:hover { border-color:#111; background:white; }
.drop-zone .icon { width:40px; height:40px; margin:0 auto 12px; background:#111; color:white; border-radius:10px; display:grid; place-items:center; font-size:18px; }
.drop-zone p { font-weight:500; font-size:14px; margin:0; }
.drop-zone span { text-decoration:underline; }
.drop-zone small { color:#9ca3af; font-size:12px; }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
  },
  {
    title: "Toggle Switch",
    slug: "toggle-switch-premium",
    description: "iOS style toggle with spring animation",
    categoryId: "cat-inputs",
    html: `<label class="switch"><input type="checkbox"><span class="slider"></span></label>`,
    css: `.switch { position:relative; display:inline-block; width:52px; height:32px; }
.switch input { opacity:0; width:0; height:0; }
.slider { position:absolute; inset:0; background:#e5e7eb; border-radius:999px; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
.slider::before { content:''; position:absolute; width:28px; height:28px; left:2px; bottom:2px; background:white; border-radius:50%; box-shadow:0 1px 3px rgba(0,0,0,0.2); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
input:checked + .slider { background:#111; }
input:checked + .slider::before { transform: translateX(20px); }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern","tag-minimal"],
    featured: true,
  },

  // CARDS 10
  {
    title: "Glassmorphism Card",
    slug: "glassmorphism-card",
    description: "Frosted glass card with gradient border",
    categoryId: "cat-cards",
    html: `<div class="glass-card"><div class="glow"></div><h3>Glassmorphism</h3><p>Modern frosted glass effect with vibrant gradients and subtle blur.</p><a>Explore →</a></div>`,
    css: `.glass-card { position:relative; width:320px; padding:28px; background: rgba(255,255,255,0.08); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius:20px; color:white; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.2); }
.glass-card .glow { position:absolute; width:200px; height:200px; background: radial-gradient(circle, rgba(99,102,241,0.3), transparent); top:-50px; right:-50px; filter: blur(20px); }
.glass-card h3 { font-size:20px; font-weight:600; margin:0 0 10px; letter-spacing:-0.02em; }
.glass-card p { opacity:0.7; font-size:14px; line-height:1.6; margin:0 0 20px; }
.glass-card a { font-size:13px; font-weight:500; cursor:pointer; }
body { background: radial-gradient(1200px at 20% 30%, #6366f1, transparent), radial-gradient(1200px at 80% 70%, #ec4899, #0a0a0a); min-height:100vh; display:grid; place-items:center; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-glass","tag-gradient"],
    featured: true,
  },
  {
    title: "Tilt 3D Card",
    slug: "tilt-3d-card",
    description: "Card that tilts in 3D on mouse move",
    categoryId: "cat-cards",
    html: `<div class="tilt-card"><div class="content"><div class="badge">NEW</div><h3>3D Tilt Effect</h3><p>Move your mouse over this card</p></div></div>`,
    css: `.tilt-card { width:300px; height:380px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius:20px; padding:1px; transform-style: preserve-3d; transition: transform 0.2s; cursor:pointer; }
.tilt-card .content { width:100%; height:100%; background:#0a0a0a; border-radius:19px; padding:24px; display:flex; flex-direction:column; justify-content:flex-end; transform: translateZ(30px); }
.tilt-card .badge { background:white; color:black; font-size:10px; font-weight:700; letter-spacing:0.1em; padding:4px 8px; border-radius:999px; width:fit-content; }
.tilt-card h3 { color:white; margin:16px 0 8px; font-size:22px; }
.tilt-card p { color:rgba(255,255,255,0.6); font-size:14px; margin:0; }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; perspective:1000px; }`,
    js: `const card=document.querySelector('.tilt-card');
card.addEventListener('mousemove', (e)=>{
  const r=card.getBoundingClientRect();
  const x=e.clientX - r.left - r.width/2;
  const y=e.clientY - r.top - r.height/2;
  card.style.transform='rotateY('+(x/10)+'deg) rotateX('+(-y/10)+'deg)';
});
card.addEventListener('mouseleave',()=> card.style.transform='rotateY(0) rotateX(0)');`,
    tags: ["tag-js","tag-3d","tag-hover"],
  },
  {
    title: "Pricing Card Minimal",
    slug: "pricing-card-minimal",
    description: "Clean pricing card with toggle",
    categoryId: "cat-cards",
    html: `<div class="price-card"><div class="header"><h3>Pro Plan</h3><div class="price"><span>$</span>29<span>/mo</span></div></div><ul><li>✓ Unlimited projects</li><li>✓ Team collaboration</li><li>✓ Advanced analytics</li><li>✓ Priority support</li></ul><button>Start Free Trial</button></div>`,
    css: `.price-card { width:320px; background:white; border:1px solid #e5e7eb; border-radius:20px; padding:24px; box-shadow:0 4px 24px rgba(0,0,0,0.04); }
.header { padding-bottom:20px; border-bottom:1px solid #f3f4f6; margin-bottom:20px; }
.header h3 { font-size:16px; font-weight:600; margin:0 0 12px; }
.price { font-size:36px; font-weight:700; letter-spacing:-0.03em; display:flex; align-items:baseline; gap:2px; }
.price span:first-child{ font-size:18px; }
.price span:last-child{ font-size:14px; font-weight:400; color:#9ca3af; }
ul { list-style:none; padding:0; margin:0 0 24px; display:grid; gap:10px; }
li { font-size:14px; color:#374151; }
button { width:100%; padding:12px; background:#111; color:white; border:none; border-radius:10px; font-weight:500; cursor:pointer; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal","tag-modern"],
  },
  {
    title: "User Profile Card",
    slug: "user-profile-card",
    description: "Modern profile card with stats",
    categoryId: "cat-cards",
    html: `<div class="profile-card"><div class="banner"></div><div class="avatar">JD</div><h3>John Doe</h3><p>Product Designer @ Linear</p><div class="stats"><div><b>124</b><span>Projects</span></div><div><b>4.9k</b><span>Followers</span></div><div><b>89</b><span>Following</span></div></div></div>`,
    css: `.profile-card { width:320px; background:white; border-radius:20px; overflow:hidden; border:1px solid #e5e7eb; text-align:center; }
.banner { height:80px; background: linear-gradient(90deg,#6366f1,#8b5cf6); }
.avatar { width:72px; height:72px; margin:-36px auto 12px; background:#111; color:white; border-radius:50%; display:grid; place-items:center; font-weight:700; border:4px solid white; font-size:18px; }
h3 { margin:0; font-size:18px; font-weight:600; }
p { margin:4px 0 20px; color:#6b7280; font-size:13px; }
.stats { display:flex; border-top:1px solid #f3f4f6; }
.stats div { flex:1; padding:16px 8px; display:flex; flex-direction:column; }
.stats b { font-size:18px; }
.stats span { font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em; margin-top:2px; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
  },
  {
    title: "Notification Card",
    slug: "notification-card",
    description: "SaaS notification card",
    categoryId: "cat-cards",
    html: `<div class="notif-card"><div class="dot"></div><div><h4>New team member</h4><p>Sarah joined design team 2 hours ago</p></div><button>×</button></div>`,
    css: `.notif-card { display:flex; gap:12px; width:360px; padding:16px; background:white; border:1px solid #e5e7eb; border-radius:14px; box-shadow:0 4px 12px rgba(0,0,0,0.06); align-items:flex-start; }
.dot { width:8px; height:8px; background:#10b981; border-radius:50%; margin-top:6px; box-shadow:0 0 0 4px rgba(16,185,129,0.15); }
h4 { margin:0 0 4px; font-size:14px; font-weight:600; }
p { margin:0; font-size:13px; color:#6b7280; line-height:1.4; }
button { margin-left:auto; background:#f3f4f6; border:none; width:24px; height:24px; border-radius:6px; cursor:pointer; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Image Hover Card",
    slug: "image-hover-card",
    description: "Card with image zoom and overlay on hover",
    categoryId: "cat-cards",
    html: `<div class="img-card"><div class="img"></div><div class="overlay"><span>Featured</span><h3>Mountain Retreat</h3><p>Discover serene landscapes</p></div></div>`,
    css: `.img-card { width:300px; height:380px; border-radius:16px; overflow:hidden; position:relative; cursor:pointer; }
.img { position:absolute; inset:0; background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600') center/cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.img-card:hover .img { transform: scale(1.08); }
.overlay { position:absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%); padding:20px; display:flex; flex-direction:column; justify-content:flex-end; color:white; }
.overlay span { background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); padding:4px 8px; border-radius:999px; font-size:10px; width:fit-content; letter-spacing:0.05em; margin-bottom:8px; }
.overlay h3 { margin:0 0 4px; font-size:20px; }
.overlay p { margin:0; opacity:0.7; font-size:13px; }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-hover","tag-modern"],
  },
  {
    title: "Stats Card Gradient",
    slug: "stats-card-gradient",
    description: "Metrics card with gradient",
    categoryId: "cat-cards",
    html: `<div class="stats-card"><div class="icon">↗</div><div class="value">$42,346</div><div class="label">Total Revenue</div><div class="change">+12.5% from last month</div></div>`,
    css: `.stats-card { width:280px; padding:20px; background: linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%); border:1px solid #262626; border-radius:16px; color:white; }
.icon { width:36px; height:36px; background:#262626; border-radius:8px; display:grid; place-items:center; font-size:16px; margin-bottom:20px; }
.value { font-size:28px; font-weight:700; letter-spacing:-0.03em; }
.label { font-size:13px; color:#a3a3a3; margin:4px 0 12px; }
.change { font-size:12px; color:#10b981; background: rgba(16,185,129,0.1); padding:4px 8px; border-radius:999px; width:fit-content; }
body { background:#0a0a0a; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-dark","tag-modern"],
  },
  {
    title: "Testimonial Card",
    slug: "testimonial-card",
    description: "Quote testimonial with avatar",
    categoryId: "cat-cards",
    html: `<div class="test-card"><div class="stars">★★★★★</div><p>"ForgeUI saved us 100+ hours. The components are production-ready and beautiful."</p><div class="author"><div class="av">AK</div><div><b>Alex Kim</b><span>CTO @ Stripe</span></div></div></div>`,
    css: `.test-card { width:340px; padding:24px; background:white; border:1px solid #e5e7eb; border-radius:16px; }
.stars { color:#f59e0b; font-size:14px; margin-bottom:12px; letter-spacing:2px; }
p { font-size:15px; line-height:1.6; margin:0 0 20px; font-weight:450; }
.author { display:flex; align-items:center; gap:12px; }
.av { width:36px; height:36px; background:#111; color:white; border-radius:50%; display:grid; place-items:center; font-weight:600; font-size:13px; }
.author b { display:block; font-size:13px; }
.author span { font-size:12px; color:#6b7280; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "File Card",
    slug: "file-card",
    description: "File preview card",
    categoryId: "cat-cards",
    html: `<div class="file-card"><div class="thumb">PDF</div><div class="info"><b>Design-System.pdf</b><span>2.4 MB • 3 days ago</span></div><button>⋮</button></div>`,
    css: `.file-card { width:320px; display:flex; align-items:center; gap:12px; padding:12px; background:white; border:1px solid #e5e7eb; border-radius:12px; }
.thumb { width:48px; height:48px; background:#fef3c7; color:#d97706; border-radius:8px; display:grid; place-items:center; font-weight:800; font-size:12px; }
.info b { display:block; font-size:13px; }
.info span { font-size:12px; color:#9ca3af; }
button { margin-left:auto; background:none; border:none; font-size:18px; cursor:pointer; width:28px; height:28px; border-radius:6px; }
button:hover { background:#f3f4f6; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Credit Card UI",
    slug: "credit-card-ui",
    description: "Realistic credit card design",
    categoryId: "cat-cards",
    html: `<div class="cc"><div class="top"><span>● ● ● ●</span><span> VISA</span></div><div class="num">4242 4242 4242 4242</div><div class="bottom"><div><small>CARD HOLDER</small><b>JOHN DOE</b></div><div><small>EXPIRES</small><b>12/28</b></div></div></div>`,
    css: `.cc { width:340px; height:210px; background: linear-gradient(135deg,#1a1a1a,#000); border-radius:16px; padding:24px; color:white; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 20px 40px rgba(0,0,0,0.3); position:relative; overflow:hidden; }
.cc::before { content:''; position:absolute; width:200px; height:200px; background: radial-gradient(circle, rgba(99,102,241,0.4), transparent); top:-50px; right:-50px; }
.top { display:flex; justify-content:space-between; font-size:14px; opacity:0.8; }
.num { font-size:20px; letter-spacing:3px; font-family: monospace; margin:20px 0; }
.bottom { display:flex; justify-content:space-between; }
small { display:block; font-size:9px; letter-spacing:0.1em; opacity:0.5; margin-bottom:4px; }
b { font-size:13px; font-weight:500; }
body { background:#f3f4f6; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-dark","tag-modern"],
    featured: true,
  },

  // LOADERS 5
  {
    title: "Morphing Loader",
    slug: "morphing-loader",
    description: "Shape morphing loader",
    categoryId: "cat-loaders",
    html: `<div class="morph-loader"></div>`,
    css: `.morph-loader { width:48px; height:48px; background:#111; animation: morph 2s ease-in-out infinite; }
@keyframes morph { 0%{border-radius:0; transform:rotate(0)} 25%{border-radius:50% 0 0 0} 50%{border-radius:50%} 75%{border-radius:0 0 50% 50%} 100%{border-radius:0; transform:rotate(360deg)} }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Dots Wave Loader",
    slug: "dots-wave-loader",
    description: "Three dots with wave animation",
    categoryId: "cat-loaders",
    html: `<div class="dots"><div></div><div></div><div></div></div>`,
    css: `.dots { display:flex; gap:8px; }
.dots div { width:12px; height:12px; background:#111; border-radius:50%; animation: wave 1s ease-in-out infinite; }
.dots div:nth-child(2){ animation-delay:0.1s; }
.dots div:nth-child(3){ animation-delay:0.2s; }
@keyframes wave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Skeleton Loader",
    slug: "skeleton-loader",
    description: "Content skeleton loading",
    categoryId: "cat-loaders",
    html: `<div class="skel"><div class="skel-avatar"></div><div class="skel-lines"><div class="line w-60"></div><div class="line w-40"></div><div class="line w-80"></div></div></div>`,
    css: `.skel { display:flex; gap:16px; width:360px; padding:16px; background:white; border:1px solid #e5e7eb; border-radius:12px; }
.skel-avatar { width:48px; height:48px; border-radius:50%; background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
.skel-lines { flex:1; display:grid; gap:10px; }
.line { height:12px; border-radius:999px; background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
.w-60{ width:60%; } .w-40{ width:40%; } .w-80{ width:80%; }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Progress Bar",
    slug: "progress-bar-modern",
    description: "Animated progress bar",
    categoryId: "cat-loaders",
    html: `<div class="progress-wrap"><div class="bar"><div class="fill"></div></div><span>68%</span></div>`,
    css: `.progress-wrap { width:320px; display:flex; align-items:center; gap:12px; }
.bar { flex:1; height:6px; background:#f3f4f6; border-radius:999px; overflow:hidden; }
.fill { height:100%; width:68%; background:#111; border-radius:999px; position:relative; overflow:hidden; }
.fill::after { content:''; position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shine 1.5s infinite; }
@keyframes shine { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
span { font-size:13px; font-weight:500; }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Neon Spinner",
    slug: "neon-spinner",
    description: "Glowing neon spinner",
    categoryId: "cat-loaders",
    html: `<div class="neon-spinner"></div>`,
    css: `.neon-spinner { width:40px; height:40px; border:2px solid rgba(0,255,255,0.1); border-top-color:#0ff; border-radius:50%; animation: spin 0.8s linear infinite; box-shadow: 0 0 10px rgba(0,255,255,0.2); }
@keyframes spin { to{transform:rotate(360deg)} }
body { background:#0a0a0a; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-neon","tag-animated"],
  },

  // FORMS 5
  {
    title: "Minimal Login Form",
    slug: "minimal-login-form",
    description: "Clean login form with social",
    categoryId: "cat-forms",
    html: `<form class="login-form"><h2>Welcome back</h2><p>Sign in to your account</p><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button>Continue</button><div class="divider"><span>or</span></div><button type="button" class="secondary">Continue with Google</button></form>`,
    css: `.login-form { width:360px; background:white; border:1px solid #e5e7eb; border-radius:20px; padding:32px; box-shadow:0 4px 24px rgba(0,0,0,0.04); }
h2 { margin:0; font-size:22px; font-weight:600; letter-spacing:-0.02em; }
p { margin:8px 0 24px; color:#6b7280; font-size:14px; }
input { width:100%; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:12px; outline:none; font-size:14px; transition: all 0.2s; }
input:focus { border-color:#111; box-shadow:0 0 0 3px rgba(0,0,0,0.05); }
button { width:100%; padding:12px; background:#111; color:white; border:none; border-radius:10px; font-weight:500; cursor:pointer; margin-top:4px; }
button.secondary { background:white; color:#111; border:1px solid #e5e7eb; }
.divider { display:flex; align-items:center; gap:12px; margin:20px 0; color:#9ca3af; font-size:12px; }
.divider::before, .divider::after { content:''; flex:1; height:1px; background:#f3f4f6; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
    featured: true,
  },
  {
    title: "Newsletter Subscribe",
    slug: "newsletter-subscribe",
    description: "Newsletter with inline button",
    categoryId: "cat-forms",
    html: `<div class="news"><h3>Get updates</h3><p>No spam, unsubscribe anytime.</p><div class="row"><input placeholder="your@email.com"><button>Subscribe</button></div></div>`,
    css: `.news { width:360px; padding:24px; background:#111; border-radius:16px; color:white; }
h3 { margin:0 0 6px; font-size:18px; }
p { margin:0 0 16px; font-size:13px; opacity:0.6; }
.row { display:flex; gap:8px; background:rgba(255,255,255,0.08); padding:4px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); }
input { flex:1; background:transparent; border:none; outline:none; color:white; padding:8px 12px; font-size:14px; }
button { padding:8px 16px; background:white; color:black; border:none; border-radius:8px; font-weight:500; font-size:13px; cursor:pointer; }
body { background:#f3f4f6; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-dark"],
  },
  {
    title: "Contact Form Floating",
    slug: "contact-form-floating",
    description: "Contact form with floating labels",
    categoryId: "cat-forms",
    html: `<form class="contact"><div class="field"><input placeholder=" "><label>Name</label></div><div class="field"><input placeholder=" "><label>Email</label></div><div class="field"><textarea placeholder=" "></textarea><label>Message</label></div><button>Send Message</button></form>`,
    css: `.contact { width:360px; display:grid; gap:16px; background:white; padding:24px; border:1px solid #e5e7eb; border-radius:16px; }
.field { position:relative; }
.field input, .field textarea { width:100%; padding:20px 14px 8px; border:1px solid #e5e7eb; border-radius:10px; outline:none; font-size:14px; font-family:inherit; }
.field textarea { min-height:100px; resize:none; }
.field label { position:absolute; left:14px; top:16px; font-size:14px; color:#9ca3af; pointer-events:none; transition: all 0.2s; }
.field input:focus + label, .field input:not(:placeholder-shown)+label, .field textarea:focus+label, .field textarea:not(:placeholder-shown)+label { top:6px; font-size:10px; text-transform:uppercase; letter-spacing:0.05em; color:#111; }
button { padding:12px; background:#111; color:white; border:none; border-radius:10px; font-weight:500; cursor:pointer; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
  },
  {
    title: "Payment Form",
    slug: "payment-form",
    description: "Credit card payment form",
    categoryId: "cat-forms",
    html: `<form class="pay"><h3>Payment details</h3><input placeholder="Card number"><div class="row"><input placeholder="MM/YY"><input placeholder="CVC"></div><input placeholder="Card holder name"><button>Pay $29.00</button></form>`,
    css: `.pay { width:360px; background:white; border:1px solid #e5e7eb; border-radius:16px; padding:24px; display:grid; gap:12px; }
h3 { margin:0 0 8px; font-size:16px; }
input { padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; outline:none; font-size:14px; }
.row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
button { padding:12px; background:#111; color:white; border:none; border-radius:10px; margin-top:8px; font-weight:500; cursor:pointer; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Search Filter Bar",
    slug: "search-filter-bar",
    description: "Search with filters",
    categoryId: "cat-forms",
    html: `<div class="filter-bar"><div class="search"><span>⌕</span><input placeholder="Search products"><kbd>⌘K</kbd></div><div class="filters"><button class="active">All</button><button>Active</button><button>Archived</button></div></div>`,
    css: `.filter-bar { width:480px; background:white; border:1px solid #e5e7eb; border-radius:14px; padding:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05); }
.search { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#f9fafb; border-radius:10px; }
.search input { flex:1; border:none; background:transparent; outline:none; font-size:14px; }
.search kbd { font-size:10px; background:white; border:1px solid #e5e7eb; padding:2px 6px; border-radius:4px; }
.filters { display:flex; gap:6px; margin-top:8px; padding:4px; }
.filters button { padding:6px 12px; border:1px solid #e5e7eb; background:white; border-radius:999px; font-size:13px; cursor:pointer; }
.filters button.active { background:#111; color:white; border-color:#111; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
  },

  // NAVIGATION 5
  {
    title: "Command Palette",
    slug: "command-palette",
    description: "VSCode style command menu",
    categoryId: "cat-navigation",
    html: `<div class="cmd"><div class="header"><span>⌕</span><input placeholder="Type a command or search..." autofocus><span class="esc">ESC</span></div><div class="list"><div class="group">Suggestions</div><div class="item active"><span>📄</span><div><b>New File</b><small>Create a new file</small></div><kbd>⌘N</kbd></div><div class="item"><span>🎨</span><div><b>Change Theme</b><small>Switch appearance</small></div></div><div class="item"><span>🔍</span><div><b>Search Files</b><small>Find across project</small></div></div></div></div>`,
    css: `.cmd { width:560px; background:white; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; box-shadow:0 16px 40px rgba(0,0,0,0.15); }
.header { display:flex; align-items:center; gap:12px; padding:16px; border-bottom:1px solid #f3f4f6; }
.header input { flex:1; border:none; outline:none; font-size:14px; }
.esc { font-size:10px; border:1px solid #e5e7eb; padding:2px 6px; border-radius:4px; }
.list { padding:8px; }
.group { font-size:11px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#9ca3af; padding:8px 12px; }
.item { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:8px; cursor:pointer; }
.item.active, .item:hover { background:#f9fafb; }
.item b { display:block; font-size:13px; font-weight:500; }
.item small { font-size:12px; color:#6b7280; }
.item kbd { margin-left:auto; font-size:11px; background:#f3f4f6; padding:2px 6px; border-radius:4px; }
body { background:#f3f4f6; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern"],
    featured: true,
  },
  {
    title: "Tabs Animated",
    slug: "tabs-animated",
    description: "Animated indicator tabs",
    categoryId: "cat-navigation",
    html: `<div class="tabs"><div class="list"><button class="active">Overview</button><button>Analytics</button><button>Settings</button><div class="indicator"></div></div><div class="panel">Content for overview tab</div></div>`,
    css: `.tabs { width:400px; }
.list { position:relative; display:flex; gap:4px; background:#f3f4f6; padding:4px; border-radius:10px; width:fit-content; }
.list button { position:relative; z-index:1; padding:8px 16px; border:none; background:transparent; font-size:13px; font-weight:500; cursor:pointer; border-radius:7px; transition: color 0.2s; color:#6b7280; }
.list button.active { color:#111; }
.indicator { position:absolute; top:4px; bottom:4px; width:80px; background:white; border-radius:7px; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); left:4px; }
.panel { margin-top:16px; padding:20px; background:white; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const btns=document.querySelectorAll('.list button');
const ind=document.querySelector('.indicator');
btns.forEach((b,i)=>{
  b.addEventListener('click',()=>{
    btns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    ind.style.transform='translateX('+(b.offsetLeft-4)+'px)';
    ind.style.width=b.offsetWidth+'px';
  });
});`,
    tags: ["tag-js","tag-animated"],
  },
  {
    title: "Breadcrumb Minimal",
    slug: "breadcrumb-minimal",
    description: "Minimal breadcrumb navigation",
    categoryId: "cat-navigation",
    html: `<nav class="crumb"><a>Home</a><span>/</span><a>Components</a><span>/</span><span class="current">Buttons</span></nav>`,
    css: `.crumb { display:flex; align-items:center; gap:8px; font-size:13px; background:white; padding:10px 14px; border:1px solid #e5e7eb; border-radius:999px; }
.crumb a { color:#6b7280; cursor:pointer; }
.crumb a:hover { color:#111; }
.crumb span { color:#d1d5db; }
.crumb .current { color:#111; font-weight:500; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Sidebar Nav",
    slug: "sidebar-nav",
    description: "Vertical sidebar navigation",
    categoryId: "cat-navigation",
    html: `<div class="sidebar"><div class="logo">◆ Forge</div><nav><a class="active"><span>◧</span> Dashboard</a><a><span>◫</span> Projects</a><a><span>◨</span> Analytics</a><a><span>◩</span> Team</a><a><span>⬙</span> Settings</a></nav><div class="user"><div class="av">JD</div><div><b>John Doe</b><small>Admin</small></div></div></div>`,
    css: `.sidebar { width:240px; height:400px; background:#0a0a0a; border:1px solid #262626; border-radius:16px; padding:16px; display:flex; flex-direction:column; color:white; }
.logo { font-weight:700; letter-spacing:-0.02em; padding:8px; margin-bottom:16px; }
nav { display:grid; gap:2px; flex:1; }
nav a { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px; font-size:13px; color:#a3a3a3; cursor:pointer; transition: all 0.2s; }
nav a.active, nav a:hover { background:#1a1a1a; color:white; }
.user { display:flex; gap:10px; align-items:center; padding:12px; border-top:1px solid #1a1a1a; margin-top:16px; }
.av { width:32px; height:32px; background:white; color:black; border-radius:50%; display:grid; place-items:center; font-weight:600; font-size:12px; }
.user b { font-size:12px; display:block; }
.user small { font-size:11px; color:#737373; }
body { background:#f3f4f6; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-dark","tag-modern"],
  },
  {
    title: "Pagination Dots",
    slug: "pagination-dots",
    description: "Pagination with dots and arrows",
    categoryId: "cat-navigation",
    html: `<div class="pag"><button>←</button><button>1</button><button class="active">2</button><button>3</button><span>…</span><button>8</button><button>→</button></div>`,
    css: `.pag { display:flex; align-items:center; gap:6px; background:white; padding:6px; border:1px solid #e5e7eb; border-radius:999px; }
.pag button { width:32px; height:32px; border:none; background:transparent; border-radius:50%; font-size:13px; font-weight:500; cursor:pointer; }
.pag button:hover { background:#f3f4f6; }
.pag button.active { background:#111; color:white; }
.pag span { padding:0 4px; color:#9ca3af; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },

  // EFFECTS 5
  {
    title: "Spotlight Card",
    slug: "spotlight-card",
    description: "Card with spotlight following mouse",
    categoryId: "cat-effects",
    html: `<div class="spot-card"><div class="spot"></div><h3>Spotlight</h3><p>Hover over this card to see the spotlight effect.</p></div>`,
    css: `.spot-card { position:relative; width:300px; padding:24px; background:#111; border:1px solid #262626; border-radius:16px; color:white; overflow:hidden; }
.spot { position:absolute; width:200px; height:200px; background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%); pointer-events:none; opacity:0; transition: opacity 0.3s; }
.spot-card:hover .spot { opacity:1; }
h3 { position:relative; margin:0 0 8px; }
p { position:relative; margin:0; font-size:13px; color:#a3a3a3; line-height:1.5; }
body { background:#0a0a0a; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const card=document.querySelector('.spot-card');
const spot=card.querySelector('.spot');
card.addEventListener('mousemove', e=>{
  const r=card.getBoundingClientRect();
  spot.style.left=(e.clientX - r.left -100)+'px';
  spot.style.top=(e.clientY - r.top -100)+'px';
});`,
    tags: ["tag-js","tag-hover","tag-dark"],
    featured: true,
  },
  {
    title: "Noise Gradient Background",
    slug: "noise-gradient-bg",
    description: "Noisy gradient background",
    categoryId: "cat-effects",
    html: `<div class="noise-bg"><div class="content"><h2>Texture</h2><p>Grainy gradient</p></div><canvas id="noise"></canvas></div>`,
    css: `.noise-bg { position:relative; width:400px; height:250px; border-radius:20px; overflow:hidden; background: linear-gradient(135deg,#6366f1,#ec4899); }
#noise { position:absolute; inset:0; opacity:0.18; width:100%; height:100%; }
.content { position:relative; z-index:1; padding:24px; color:white; }
h2 { margin:0; font-size:24px; }
p { margin:4px 0 0; opacity:0.8; }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const c=document.getElementById('noise');
const ctx=c.getContext('2d');
c.width=400; c.height=250;
const img=ctx.createImageData(400,250);
for(let i=0;i<img.data.length;i+=4){
  const v=Math.random()*255;
  img.data[i]=v; img.data[i+1]=v; img.data[i+2]=v; img.data[i+3]=255;
}
ctx.putImageData(img,0,0);`,
    tags: ["tag-js","tag-gradient"],
  },
  {
    title: "Grid Pattern Card",
    slug: "grid-pattern-card",
    description: "Subtle grid pattern background",
    categoryId: "cat-effects",
    html: `<div class="grid-card"><div class="grid"></div><div class="c"><h3>Grid System</h3><p>Perfect alignment</p></div></div>`,
    css: `.grid-card { position:relative; width:300px; height:200px; background:white; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; }
.grid { position:absolute; inset:0; background-image: linear-gradient(#f3f4f6 1px, transparent 1px), linear-gradient(90deg,#f3f4f6 1px, transparent 1px); background-size:24px 24px; }
.c { position:relative; padding:24px; }
h3 { margin:0; font-size:16px; }
p { margin:4px 0 0; font-size:13px; color:#6b7280; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Glow Orbs",
    slug: "glow-orbs",
    description: "Floating glow orbs background",
    categoryId: "cat-effects",
    html: `<div class="orbs-wrap"><div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div><div class="content">Glow Effect</div></div>`,
    css: `.orbs-wrap { position:relative; width:400px; height:260px; background:#0a0a0a; border-radius:20px; overflow:hidden; display:grid; place-items:center; }
.orb { position:absolute; width:200px; height:200px; border-radius:50%; filter: blur(40px); opacity:0.5; animation: float 8s ease-in-out infinite; }
.o1{ background:#6366f1; top:-50px; left:-50px; }
.o2{ background:#ec4899; bottom:-50px; right:-50px; animation-delay:-2s; }
.o3{ background:#06b6d4; top:50%; left:50%; animation-delay:-4s; }
.content { position:relative; z-index:1; color:white; font-weight:600; font-size:20px; background: rgba(255,255,255,0.08); backdrop-filter:blur(12px); padding:12px 20px; border-radius:999px; border:1px solid rgba(255,255,255,0.1); }
@keyframes float { 0%,100%{ transform: translate(0,0) scale(1)} 50%{ transform: translate(20px,-20px) scale(1.1)} }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated","tag-gradient"],
  },
  {
    title: "Border Beam",
    slug: "border-beam",
    description: "Animated border beam effect",
    categoryId: "cat-effects",
    html: `<div class="beam-card"><div class="beam"></div><p>Border Beam</p></div>`,
    css: `.beam-card { position:relative; width:300px; height:160px; background:#0a0a0a; border-radius:16px; overflow:hidden; display:grid; place-items:center; border:1px solid #262626; }
.beam { position:absolute; inset:-1px; border-radius:16px; padding:1px; background: conic-gradient(from var(--a), transparent 20%, white, transparent 40%); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; animation: rotate 3s linear infinite; }
.beam-card p { color:white; position:relative; font-weight:500; }
@property --a { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@keyframes rotate { to{ --a:360deg; } }
body { background:#111; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated","tag-modern"],
    featured: true,
  },

  // ANIMATIONS 5
  {
    title: "Text Reveal",
    slug: "text-reveal-animation",
    description: "Staggered text reveal",
    categoryId: "cat-animations",
    html: `<h1 class="reveal"><span>Design</span> <span>is</span> <span>intelligence</span> <span>made</span> <span>visible</span></h1>`,
    css: `.reveal { font-size:42px; font-weight:700; letter-spacing:-0.04em; line-height:1; max-width:400px; }
.reveal span { display:inline-block; overflow:hidden; }
.reveal span::after { content: attr(data-text); display:block; }
.reveal span { animation: reveal 0.8s cubic-bezier(0.16,1,0.3,1) both; }
.reveal span:nth-child(1){animation-delay:0.05s}
.reveal span:nth-child(2){animation-delay:0.1s}
.reveal span:nth-child(3){animation-delay:0.15s}
.reveal span:nth-child(4){animation-delay:0.2s}
.reveal span:nth-child(5){animation-delay:0.25s}
@keyframes reveal { from{ transform:translateY(100%); } to{ transform:translateY(0); } }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; padding:20px; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Magnetic Text",
    slug: "magnetic-text",
    description: "Text with magnetic hover",
    categoryId: "cat-animations",
    html: `<div class="mag-text"><span>F</span><span>O</span><span>R</span><span>G</span><span>E</span></div>`,
    css: `.mag-text { display:flex; gap:4px; font-size:64px; font-weight:800; letter-spacing:-0.05em; cursor:pointer; }
.mag-text span { display:inline-block; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const letters=document.querySelectorAll('.mag-text span');
document.querySelector('.mag-text').addEventListener('mousemove', (e)=>{
  letters.forEach(l=>{
    const r=l.getBoundingClientRect();
    const cx=r.left+r.width/2;
    const cy=r.top+r.height/2;
    const dx=e.clientX-cx;
    const dy=e.clientY-cy;
    const dist=Math.hypot(dx,dy);
    if(dist<100){
      const f=(100-dist)/100;
      l.style.transform='translate('+(dx*f*-0.2)+'px,'+(dy*f*-0.3)+'px)';
    } else l.style.transform='translate(0,0)';
  });
});
document.querySelector('.mag-text').addEventListener('mouseleave',()=>{
  letters.forEach(l=> l.style.transform='translate(0,0)');
});`,
    tags: ["tag-js","tag-hover","tag-animated"],
  },
  {
    title: "Infinite Marquee",
    slug: "infinite-marquee",
    description: "Seamless scrolling marquee",
    categoryId: "cat-animations",
    html: `<div class="marquee"><div class="track"><span>DESIGN • CODE • SHIP • REPEAT • </span><span>DESIGN • CODE • SHIP • REPEAT • </span></div></div>`,
    css: `.marquee { width:100%; overflow:hidden; background:#111; color:white; padding:16px 0; }
.track { display:flex; white-space:nowrap; animation: scroll 12s linear infinite; }
.track span { font-size:18px; font-weight:600; letter-spacing:0.05em; padding-right:20px; }
@keyframes scroll { from{ transform:translateX(0)} to{ transform:translateX(-50%)} }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Cursor Follow",
    slug: "cursor-follow",
    description: "Custom cursor that follows",
    categoryId: "cat-animations",
    html: `<div class="area">Move cursor here<div class="cursor"></div></div>`,
    css: `.area { width:400px; height:240px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:16px; display:grid; place-items:center; position:relative; overflow:hidden; color:#9ca3af; }
.cursor { position:absolute; width:20px; height:20px; background:#111; border-radius:50%; pointer-events:none; mix-blend-mode: difference; transition: transform 0.15s; }
.area:hover .cursor { transform: scale(3); }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const area=document.querySelector('.area');
const cur=area.querySelector('.cursor');
area.addEventListener('mousemove', e=>{
  const r=area.getBoundingClientRect();
  cur.style.left=(e.clientX-r.left-10)+'px';
  cur.style.top=(e.clientY-r.top-10)+'px';
});`,
    tags: ["tag-js","tag-hover"],
  },
  {
    title: "Typewriter Effect",
    slug: "typewriter-effect",
    description: "Typewriter with cursor",
    categoryId: "cat-animations",
    html: `<div class="type"><span id="tw"></span><span class="cur">|</span></div>`,
    css: `.type { font-family: monospace; font-size:20px; font-weight:500; }
.cur { animation: blink 1s step-end infinite; }
@keyframes blink { 50%{ opacity:0; } }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `const el=document.getElementById('tw');
const text='npm install forge-ui';
let i=0;
(function type(){
  if(i<text.length){
    el.textContent+=text[i++];
    setTimeout(type, 80+Math.random()*80);
  }
})();`,
    tags: ["tag-js","tag-animated"],
  },

  // FEEDBACK 5
  {
    title: "Toast Notification",
    slug: "toast-notification",
    description: "Modern toast with progress",
    categoryId: "cat-feedback",
    html: `<div class="toast"><div class="icon">✓</div><div class="cnt"><b>Successfully saved</b><span>Your changes have been saved</span></div><div class="prog"></div></div>`,
    css: `.toast { position:relative; width:360px; display:flex; gap:12px; padding:16px; background:white; border:1px solid #e5e7eb; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.08); overflow:hidden; }
.icon { width:28px; height:28px; background:#10b981; color:white; border-radius:50%; display:grid; place-items:center; font-size:14px; }
.cnt b { display:block; font-size:13px; }
.cnt span { font-size:12px; color:#6b7280; }
.prog { position:absolute; bottom:0; left:0; height:2px; background:#10b981; width:100%; animation: shrink 4s linear forwards; }
@keyframes shrink { from{ width:100%} to{ width:0% } }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Badge Pulse",
    slug: "badge-pulse",
    description: "Live badge with pulse",
    categoryId: "cat-feedback",
    html: `<div class="badge-live"><span class="dot"></span> Live</div>`,
    css: `.badge-live { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; background:#fef2f2; border:1px solid #fecaca; border-radius:999px; color:#dc2626; font-size:12px; font-weight:600; letter-spacing:0.02em; }
.dot { width:6px; height:6px; background:#ef4444; border-radius:50%; position:relative; }
.dot::after { content:''; position:absolute; inset:0; background:#ef4444; border-radius:50%; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%{ transform:scale(1); opacity:1} 100%{ transform:scale(2.5); opacity:0} }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-animated"],
  },
  {
    title: "Alert Banner",
    slug: "alert-banner",
    description: "Dismissible alert banner",
    categoryId: "cat-feedback",
    html: `<div class="alert"><span>🚀</span><p>New version available: v2.4.0 with 20 new components</p><button>Update</button><button class="close">×</button></div>`,
    css: `.alert { display:flex; align-items:center; gap:12px; width:560px; padding:12px 16px; background:#111; color:white; border-radius:10px; font-size:13px; }
.alert p { flex:1; margin:0; }
.alert button { background:white; color:black; border:none; padding:6px 12px; border-radius:6px; font-weight:500; font-size:12px; cursor:pointer; }
.alert button.close { background:transparent; color:white; border:1px solid #262626; width:28px; height:28px; padding:0; display:grid; place-items:center; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: `document.querySelector('.close').onclick=()=> document.querySelector('.alert').style.display='none';`,
    tags: ["tag-css","tag-dark"],
  },
  {
    title: "Empty State",
    slug: "empty-state",
    description: "Beautiful empty state",
    categoryId: "cat-feedback",
    html: `<div class="empty"><div class="illus"><div class="box"></div><div class="box2"></div></div><h3>No components yet</h3><p>Create your first component to get started</p><button>Create Component</button></div>`,
    css: `.empty { width:360px; text-align:center; padding:32px; background:white; border:1px solid #e5e7eb; border-radius:16px; }
.illus { width:80px; height:80px; margin:0 auto 16px; position:relative; }
.box { width:48px; height:48px; background:#f3f4f6; border:2px dashed #d1d5db; border-radius:12px; position:absolute; left:16px; top:8px; }
.box2 { width:48px; height:48px; background:white; border:1px solid #e5e7eb; border-radius:12px; position:absolute; left:28px; top:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05); }
h3 { margin:0; font-size:16px; }
p { margin:8px 0 20px; font-size:13px; color:#6b7280; }
button { padding:10px 18px; background:#111; color:white; border:none; border-radius:8px; font-weight:500; font-size:13px; cursor:pointer; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Cookie Consent",
    slug: "cookie-consent",
    description: "Minimal cookie banner",
    categoryId: "cat-feedback",
    html: `<div class="cookie"><p>We use cookies to improve your experience. <a>Learn more</a></p><div class="actions"><button class="ghost">Decline</button><button>Accept</button></div></div>`,
    css: `.cookie { display:flex; align-items:center; justify-content:space-between; gap:16px; width:560px; padding:16px 20px; background:white; border:1px solid #e5e7eb; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.08); }
.cookie p { margin:0; font-size:13px; color:#374151; }
.cookie a { text-decoration:underline; cursor:pointer; }
.actions { display:flex; gap:8px; }
.actions button { padding:8px 14px; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; }
.actions button { background:#111; color:white; border:none; }
.actions button.ghost { background:#f3f4f6; color:#111; }
body { background:#fcfcfc; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },

  // LAYOUT 5
  {
    title: "Hero Gradient",
    slug: "hero-gradient",
    description: "Modern hero section",
    categoryId: "cat-layout",
    html: `<section class="hero"><div class="badge">✦ New components weekly</div><h1>Build beautiful<br>interfaces faster</h1><p>Production-ready components crafted for modern developers</p><div class="cta"><button class="primary">Explore Components</button><button>View Docs</button></div></section>`,
    css: `.hero { text-align:center; max-width:640px; padding:40px 20px; }
.badge { display:inline-flex; padding:6px 12px; background:#f3f4f6; border:1px solid #e5e7eb; border-radius:999px; font-size:12px; font-weight:500; margin-bottom:20px; }
h1 { font-size:48px; font-weight:700; letter-spacing:-0.04em; line-height:0.95; margin:0 0 16px; }
p { font-size:16px; color:#6b7280; margin:0 0 24px; line-height:1.5; }
.cta { display:flex; gap:10px; justify-content:center; }
.cta button { padding:12px 20px; border-radius:10px; font-weight:500; font-size:14px; cursor:pointer; border:1px solid #e5e7eb; background:white; }
.cta button.primary { background:#111; color:white; border-color:#111; }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-modern","tag-minimal"],
    featured: true,
  },
  {
    title: "Footer Minimal",
    slug: "footer-minimal",
    description: "Clean footer",
    categoryId: "cat-layout",
    html: `<footer class="foot"><div class="top"><div class="brand">◆ ForgeUI</div><div class="links"><a>Components</a><a>Documentation</a><a>Blog</a><a>Twitter</a></div></div><div class="bottom"><span>© 2026 ForgeUI</span><span>Built by developers, for developers</span></div></footer>`,
    css: `.foot { width:600px; border-top:1px solid #e5e7eb; padding-top:24px; }
.top { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
.brand { font-weight:700; letter-spacing:-0.02em; }
.links { display:flex; gap:16px; font-size:13px; color:#6b7280; }
.links a:hover { color:#111; cursor:pointer; }
.bottom { display:flex; justify-content:space-between; font-size:12px; color:#9ca3af; border-top:1px solid #f3f4f6; padding-top:16px; }
body { background:white; display:grid; place-items:center; min-height:100vh; margin:0; padding:20px; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Navbar Floating",
    slug: "navbar-floating",
    description: "Floating navbar with blur",
    categoryId: "cat-layout",
    html: `<nav class="float-nav"><div class="logo">◆</div><div class="links"><a>Products</a><a>Solutions</a><a>Pricing</a></div><button>Sign in</button></nav>`,
    css: `.float-nav { display:flex; align-items:center; justify-content:space-between; width:520px; padding:10px 16px; background:rgba(255,255,255,0.8); backdrop-filter:blur(20px); border:1px solid rgba(0,0,0,0.08); border-radius:999px; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
.logo { width:32px; height:32px; background:#111; color:white; border-radius:50%; display:grid; place-items:center; font-size:14px; }
.links { display:flex; gap:20px; font-size:13px; font-weight:500; color:#374151; }
.links a { cursor:pointer; }
.links a:hover { color:#111; }
button { padding:8px 14px; background:#111; color:white; border:none; border-radius:999px; font-size:13px; font-weight:500; cursor:pointer; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-glass"],
  },
  {
    title: "Feature Grid",
    slug: "feature-grid",
    description: "Feature showcase grid",
    categoryId: "cat-layout",
    html: `<div class="features"><div class="feat"><div class="ic">⚡</div><h4>Lightning Fast</h4><p>Optimized for performance</p></div><div class="feat"><div class="ic">🎨</div><h4>Beautiful</h4><p>Crafted with attention</p></div><div class="feat"><div class="ic">🔒</div><h4>Secure</h4><p>Enterprise-grade security</p></div></div>`,
    css: `.features { display:grid; grid-template-columns: repeat(3,1fr); gap:16px; width:600px; }
.feat { padding:20px; background:white; border:1px solid #e5e7eb; border-radius:12px; }
.ic { width:32px; height:32px; background:#f3f4f6; border-radius:8px; display:grid; place-items:center; font-size:16px; margin-bottom:12px; }
h4 { margin:0 0 4px; font-size:14px; }
p { margin:0; font-size:12px; color:#6b7280; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
  {
    title: "Testimonial Wall",
    slug: "testimonial-wall",
    description: "Masonry testimonial layout",
    categoryId: "cat-layout",
    html: `<div class="wall"><div class="col"><div class="t"><p>"Amazing!"</p><b>@alex</b></div><div class="t"><p>"Saved 100 hours"</p><b>@sarah</b></div></div><div class="col"><div class="t"><p>"Production ready"</p><b>@mike</b></div></div></div>`,
    css: `.wall { display:flex; gap:12px; width:400px; }
.col { flex:1; display:grid; gap:12px; }
.t { padding:16px; background:white; border:1px solid #e5e7eb; border-radius:12px; }
.t p { margin:0 0 8px; font-size:13px; font-weight:500; }
.t b { font-size:11px; color:#9ca3af; }
body { background:#f9fafb; display:grid; place-items:center; min-height:100vh; margin:0; }`,
    js: ``,
    tags: ["tag-css","tag-minimal"],
  },
]
