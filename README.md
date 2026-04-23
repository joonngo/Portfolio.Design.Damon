<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="description" content="Damon.13 — Thong Ngo, Creative Leader & Brand Designer, Ho Chi Minh City. 5+ years in Brand Identity, Digital Product, POSM & Social Media."/>
<title>Damon.13 — Thong Ngo · Creative Leader</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&family=Unbounded:wght@300;400;700;900&display=swap" rel="stylesheet"/>
<style>
/* ── RESET ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:#050505;color:#f0ede6;font-family:'Space Grotesk',sans-serif;overflow-x:hidden;cursor:none}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%;height:auto}
button{border:none;background:none;font:inherit;color:inherit;cursor:none}
@media(pointer:coarse){body,button{cursor:auto}}

/* ── TOKENS ── */
:root{
  --blue:#0047FF;
  --blue2:#3366FF;
  --white:#f0ede6;
  --black:#050505;
  --gray:#888;
  --gray2:#1a1a1a;
  --gray3:#111;
  --border:rgba(240,237,230,.06);
  --pad:clamp(20px,5vw,80px);
  --f-disp:'Unbounded',sans-serif;
  --f-head:'Syne',sans-serif;
  --f-body:'Space Grotesk',sans-serif;
  --ease:.65s cubic-bezier(.22,1,.36,1);
}

/* ── CURSOR ── */
#cur{position:fixed;width:8px;height:8px;background:var(--blue);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:transform .1s,width .2s,height .2s}
#cur-ring{position:fixed;width:36px;height:36px;border:1px solid rgba(0,71,255,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .4s var(--ease),height .4s var(--ease),border-color .3s}
body.hovering #cur{width:0;height:0}
body.hovering #cur-ring{width:56px;height:56px;border-color:var(--blue);background:rgba(0,71,255,.06)}
body.pressing #cur-ring{transform:translate(-50%,-50%) scale(.85)}

/* ── PROGRESS ── */
#prog{position:fixed;top:0;left:0;height:1px;width:0;background:var(--blue);z-index:9000;transition:width .06s linear}

/* ── PAGE SYSTEM ── */
.page{display:none;min-height:100vh}
.page.on{display:block}
.page-in{animation:pgIn .6s cubic-bezier(.22,1,.36,1) both}
@keyframes pgIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

/* ── NAV ── */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:800;
  padding:clamp(16px,2.5vw,28px) var(--pad);
  display:flex;align-items:center;justify-content:space-between;
  transition:all .5s var(--ease);
  mix-blend-mode:normal;
}
#nav::before{content:'';position:absolute;inset:0;background:rgba(5,5,5,0);backdrop-filter:blur(0px);transition:all .5s;z-index:-1}
#nav.scrolled::before{background:rgba(5,5,5,.85);backdrop-filter:blur(20px)}
.n-logo{font-family:var(--f-disp);font-size:clamp(13px,1.4vw,16px);font-weight:700;letter-spacing:.08em;color:var(--white);display:flex;align-items:center;gap:10px}
.n-logo-mark{width:26px;height:26px;background:var(--blue);display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;font-family:var(--f-body);letter-spacing:.04em}
.n-links{display:flex;align-items:center;gap:clamp(20px,3vw,44px)}
.n-link{font-family:var(--f-body);font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,237,230,.4);transition:color .2s;position:relative}
.n-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--blue);transition:width .25s}
.n-link:hover,.n-link.on{color:var(--white)}
.n-link:hover::after,.n-link.on::after{width:100%}
.n-cta{font-family:var(--f-body);font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);border:1px solid rgba(0,71,255,.4);padding:9px 22px;transition:all .25s}
.n-cta:hover{background:var(--blue);color:#fff;border-color:var(--blue)}
/* Ham */
.ham{display:none;flex-direction:column;gap:5px;padding:4px;cursor:pointer}
.ham span{display:block;width:22px;height:1.5px;background:var(--white);transition:all .3s}
.ham.open span:first-child{transform:rotate(45deg) translate(4.5px,4.5px)}
.ham.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.ham.open span:last-child{transform:rotate(-45deg) translate(4.5px,-4.5px)}
#m-nav{display:none;position:fixed;inset:0;background:var(--black);z-index:790;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:var(--pad);padding-bottom:clamp(40px,8vw,80px);opacity:0;transition:opacity .35s}
#m-nav.open{display:flex;opacity:1}
.m-link{font-family:var(--f-disp);font-size:clamp(36px,10vw,72px);font-weight:700;color:rgba(240,237,230,.15);transition:color .2s;letter-spacing:-.02em;line-height:1.1}
.m-link:hover{color:var(--white)}
.m-link.on{color:var(--blue)}

/* ── STT ── */
#stt{position:fixed;bottom:clamp(16px,3vw,32px);right:clamp(16px,3vw,32px);width:44px;height:44px;background:var(--blue);display:flex;align-items:center;justify-content:center;z-index:700;opacity:0;pointer-events:none;transform:translateY(12px);transition:opacity .35s,transform .35s}
#stt.on{opacity:1;pointer-events:auto;transform:translateY(0)}
#stt svg{color:#fff}

/* ── HERO ── */
.hero{
  min-height:100svh;
  display:grid;
  grid-template-rows:1fr auto;
  position:relative;overflow:hidden;
  background:var(--black);
  padding:clamp(100px,14vw,160px) var(--pad) clamp(40px,6vw,80px);
}
/* Huge background index number */
.hero-bg-num{
  position:absolute;
  font-family:var(--f-disp);
  font-size:clamp(300px,50vw,700px);
  font-weight:900;
  color:transparent;
  -webkit-text-stroke:1px rgba(0,71,255,.05);
  right:-5%;
  top:50%;
  transform:translateY(-50%);
  line-height:1;
  pointer-events:none;
  user-select:none;
  letter-spacing:-.05em;
}
/* Horizontal rule accent */
.hero-rule{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--blue) 0%,transparent 70%);opacity:.4}
/* Noise overlay */
.hero-noise{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:150px}

.hero-content{display:flex;flex-direction:column;justify-content:flex-end}
.hero-kicker{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--f-body);font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  color:var(--blue);margin-bottom:clamp(20px,3vw,36px);
  animation:fadeUp .7s .1s both;
}
.hero-kicker-dot{width:5px;height:5px;background:var(--blue);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

.hero-h1{
  font-family:var(--f-disp);
  font-size:clamp(52px,10vw,148px);
  font-weight:900;
  line-height:.88;
  letter-spacing:-.03em;
  text-transform:uppercase;
  animation:fadeUp .9s .2s both;
  position:relative;
}
.hero-h1 .outline{-webkit-text-stroke:1px var(--white);color:transparent}
.hero-h1 .blue{color:var(--blue)}
.hero-h1 .shift{display:inline-block;transform:translateX(clamp(40px,8vw,140px))}

.hero-sub-row{
  display:flex;align-items:flex-end;justify-content:space-between;gap:clamp(24px,4vw,60px);
  margin-top:clamp(40px,6vw,80px);
  flex-wrap:wrap;
  animation:fadeUp .9s .45s both;
}
.hero-desc{
  font-family:var(--f-body);font-size:clamp(13px,1.1vw,16px);font-weight:400;
  line-height:1.75;color:rgba(240,237,230,.5);max-width:38ch;
}
.hero-desc strong{color:var(--white);font-weight:500}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0}
.hero-stats{display:flex;gap:clamp(28px,4vw,56px);align-items:center;flex-shrink:0}
.hero-stat-n{font-family:var(--f-disp);font-size:clamp(22px,3vw,36px);font-weight:700;color:var(--white);line-height:1;letter-spacing:-.02em}
.hero-stat-l{font-family:var(--f-body);font-size:9px;font-weight:500;color:rgba(240,237,230,.35);letter-spacing:.14em;text-transform:uppercase;margin-top:4px}

/* Scrolling marquee strip at bottom of hero */
.hero-tape{
  overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);
  padding:12px 0;margin-top:clamp(40px,7vw,80px);
}
.hero-tape-track{display:flex;white-space:nowrap;animation:mqF 20s linear infinite}
.hero-tape-item{font-family:var(--f-disp);font-size:clamp(11px,1.2vw,14px);font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:0 clamp(20px,3vw,40px);color:rgba(240,237,230,.18);display:inline-flex;align-items:center;gap:16px}
.hero-tape-item .dot{color:var(--blue);font-size:.6em}
@keyframes mqF{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}

/* ── BUTTONS ── */
.btn{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--f-body);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
  padding:clamp(12px,1.5vw,15px) clamp(24px,2.5vw,36px);
  transition:all .25s;white-space:nowrap;position:relative;overflow:hidden;
}
.btn-p{background:var(--blue);color:#fff;border:1px solid var(--blue)}
.btn-p::after{content:'';position:absolute;inset:0;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.22,1,.36,1);z-index:0}
.btn-p:hover::after{transform:scaleX(1)}
.btn-p:hover{color:#050505}
.btn-p > *{position:relative;z-index:1}
.btn-o{border:1px solid rgba(240,237,230,.15);color:rgba(240,237,230,.6);background:transparent}
.btn-o:hover{border-color:var(--white);color:var(--white)}
.btn svg{flex-shrink:0;transition:transform .2s}
.btn:hover svg{transform:translate(2px,-2px)}

/* ── REVEALS ── */
.rev{opacity:0;transform:translateY(28px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.rev.in{opacity:1;transform:none}
.rev-l{opacity:0;transform:translateX(-28px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.rev-l.in{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.26s}.d4{transition-delay:.36s}.d5{transition-delay:.46s}

/* ── SECTION BASE ── */
section{position:relative}
.wrap{max-width:1400px;margin:0 auto;padding:0 var(--pad)}
.s-pad{padding:clamp(80px,12vw,160px) 0}
.s-pad-sm{padding:clamp(56px,8vw,100px) 0}

/* Section label */
.sec-tag{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
  color:var(--blue);margin-bottom:clamp(40px,6vw,72px);
}
.sec-tag::before{content:'';width:32px;height:1px;background:var(--blue)}

/* ── INTRO SECTION (dark→light) ── */
.intro-s{background:#f0ede6}
.intro-inner{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:clamp(40px,6vw,100px);
  align-items:center;
}
.intro-left{}
.intro-eyebrow{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--blue);margin-bottom:clamp(16px,2.5vw,28px)}
.intro-heading{
  font-family:var(--f-disp);font-size:clamp(32px,4.5vw,64px);font-weight:900;
  line-height:.9;letter-spacing:-.03em;text-transform:uppercase;
  color:#050505;margin-bottom:clamp(24px,4vw,44px);
}
.intro-heading .accent{color:var(--blue)}
.intro-body{font-family:var(--f-body);font-size:clamp(14px,1.1vw,16px);line-height:1.8;color:#555;margin-bottom:clamp(24px,4vw,40px)}
.intro-body strong{color:#050505;font-weight:600}

/* Stat band */
.intro-stats{display:flex;gap:clamp(24px,4vw,48px);border-top:1px solid rgba(5,5,5,.08);padding-top:clamp(24px,3.5vw,36px);flex-wrap:wrap}
.intro-stat-n{font-family:var(--f-disp);font-size:clamp(28px,3.5vw,44px);font-weight:900;color:#050505;letter-spacing:-.03em;line-height:1}
.intro-stat-l{font-family:var(--f-body);font-size:9px;color:#999;letter-spacing:.14em;text-transform:uppercase;margin-top:4px}

/* Right: big quote card */
.intro-quote-card{
  background:#050505;padding:clamp(36px,5vw,60px);
  position:relative;overflow:hidden;
}
.intro-quote-card::before{
  content:'"';
  font-family:var(--f-disp);font-size:clamp(120px,18vw,220px);
  font-weight:900;color:rgba(0,71,255,.06);
  position:absolute;top:-10%;left:-2%;line-height:1;
  pointer-events:none;
}
.intro-quote-text{
  font-family:var(--f-head);font-size:clamp(20px,2.2vw,30px);
  font-weight:700;line-height:1.2;color:var(--white);
  position:relative;z-index:1;margin-bottom:clamp(20px,3vw,32px);
}
.intro-quote-text .b{color:var(--blue)}
.intro-quote-author{font-family:var(--f-body);font-size:11px;color:rgba(240,237,230,.3);letter-spacing:.1em;text-transform:uppercase;position:relative;z-index:1}
.intro-blue-bar{height:3px;background:var(--blue);margin-bottom:clamp(28px,4vw,44px)}

/* ── SERVICES — dark ── */
.svc-s{background:#050505;border-top:1px solid var(--border)}
.svc-heading{
  font-family:var(--f-disp);font-size:clamp(36px,5.5vw,80px);font-weight:900;
  line-height:.88;letter-spacing:-.04em;text-transform:uppercase;
  margin-bottom:clamp(48px,7vw,100px);color:var(--white);
}
.svc-heading .outline{-webkit-text-stroke:1px rgba(240,237,230,.2);color:transparent}
/* Service rows */
.svc{
  border-top:1px solid var(--border);
  display:grid;grid-template-columns:clamp(40px,4vw,64px) 1fr 1fr auto;
  align-items:center;gap:clamp(16px,2.5vw,40px);
  padding:clamp(20px,2.5vw,28px) 0;
  position:relative;overflow:hidden;
  transition:padding-left .3s var(--ease);cursor:pointer;
}
.svc::after{content:'';position:absolute;inset:0;background:var(--blue);transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.22,1,.36,1);z-index:0}
.svc:hover::after{transform:scaleX(1)}
.svc:hover{padding-left:clamp(8px,1.5vw,16px)}
.svc>*{position:relative;z-index:1;transition:color .3s}
.svc:hover .svc-n,.svc:hover .svc-name,.svc:hover .svc-desc,.svc:hover .svc-arr{color:#fff!important}
.svc-n{font-family:var(--f-disp);font-size:11px;font-weight:700;color:rgba(240,237,230,.2);letter-spacing:.06em}
.svc-name{font-family:var(--f-head);font-size:clamp(18px,2.2vw,30px);font-weight:700;color:var(--white);letter-spacing:-.01em}
.svc-desc{font-family:var(--f-body);font-size:12px;color:rgba(240,237,230,.35);line-height:1.6}
.svc-arr{font-size:20px;color:rgba(240,237,230,.25);flex-shrink:0}
@media(max-width:768px){.svc{grid-template-columns:40px 1fr auto}.svc-desc{display:none}}

/* ── WORKS SECTION — light ── */
.works-s{background:#f0ede6}
.works-header{
  display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:clamp(40px,6vw,80px);flex-wrap:wrap;gap:20px;
}
.works-title{
  font-family:var(--f-disp);font-size:clamp(36px,5.5vw,80px);font-weight:900;
  line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#050505;
}
.works-title .blue{color:var(--blue)}

/* Work list — editorial horizontal rows */
.wi{
  border-top:1px solid rgba(5,5,5,.07);
  display:grid;grid-template-columns:clamp(40px,4.5vw,60px) 1fr auto auto;
  align-items:center;gap:clamp(16px,2.5vw,40px);
  padding:clamp(18px,2.5vw,26px) 0;
  position:relative;overflow:hidden;cursor:pointer;
  transition:padding-left .3s var(--ease);
}
@media(min-width:700px){.wi{grid-template-columns:clamp(40px,4.5vw,60px) 1fr 180px auto}}
.wi-fill{position:absolute;inset:0;background:#050505;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.22,1,.36,1);z-index:0}
.wi:hover .wi-fill{transform:scaleX(1)}
.wi:hover{padding-left:clamp(8px,1.5vw,14px)}
.wi>*:not(.wi-fill){position:relative;z-index:1;transition:color .3s}
.wi:hover .wi-n,.wi:hover .wi-name,.wi:hover .wi-cat,.wi:hover .wi-arr,.wi:hover .wi-tags span{color:#fff!important;border-color:rgba(255,255,255,.15)!important}
.wi-n{font-family:var(--f-disp);font-size:11px;font-weight:700;color:rgba(5,5,5,.2);letter-spacing:.06em}
.wi-name{font-family:var(--f-head);font-size:clamp(18px,2.2vw,32px);font-weight:700;color:#050505;letter-spacing:-.02em}
.wi-cat{font-family:var(--f-body);font-size:11px;color:#999;margin-top:2px}
.wi-tags{display:flex;gap:6px;flex-wrap:wrap}
.wi-tags span{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(5,5,5,.1);color:#888;padding:3px 10px;transition:border-color .3s,color .3s}
.wi-arr{font-size:20px;color:rgba(5,5,5,.2);flex-shrink:0}

/* ── NUMBERS ── */
.nums-s{background:#050505;border-top:1px solid var(--border)}
.num-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-top:clamp(40px,6vw,72px)}
.nc{background:#050505;padding:clamp(36px,5vw,60px) clamp(24px,3vw,44px);position:relative;overflow:hidden;transition:background .35s}
.nc-accent{height:2px;background:var(--blue);margin-bottom:clamp(20px,3vw,32px);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease)}
.nc:hover .nc-accent{transform:scaleX(1)}
.nc:hover{background:var(--gray3)}
.nc-val{font-family:var(--f-disp);font-size:clamp(48px,6.5vw,80px);font-weight:900;color:var(--blue);line-height:1;letter-spacing:-.04em;margin-bottom:8px}
.nc-lbl{font-family:var(--f-head);font-size:13px;font-weight:700;color:var(--white);margin-bottom:6px}
.nc-desc{font-family:var(--f-body);font-size:12px;color:rgba(240,237,230,.3);line-height:1.5}
@media(max-width:640px){.num-grid{grid-template-columns:1fr 1fr}}

/* ── PROCESS — light ── */
.proc-s{background:#f0ede6}
.proc-heading{font-family:var(--f-disp);font-size:clamp(36px,5.5vw,80px);font-weight:900;line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#050505;margin-bottom:clamp(48px,7vw,100px)}
.proc-heading .accent{color:var(--blue)}
.proc-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(5,5,5,.06)}
.pc{background:#f0ede6;padding:clamp(28px,4vw,44px) clamp(20px,3vw,36px);position:relative;overflow:hidden;border-top:2px solid transparent;transition:border-color .3s,background .3s}
.pc:hover{border-color:var(--blue);background:#fff}
.pc-nn{font-family:var(--f-disp);font-size:clamp(44px,6vw,64px);font-weight:900;color:rgba(5,5,5,.04);line-height:1;margin-bottom:clamp(16px,2.5vw,24px)}
.pc-t{font-family:var(--f-head);font-size:clamp(14px,1.5vw,18px);font-weight:700;color:#050505;margin-bottom:8px;letter-spacing:-.01em}
.pc-b{font-family:var(--f-body);font-size:12px;color:#777;line-height:1.7}
.pc-time{display:inline-block;font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);border:1px solid rgba(0,71,255,.25);padding:4px 12px;margin-top:16px}
@media(max-width:768px){.proc-grid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.proc-grid{grid-template-columns:1fr}}

/* ── PHILOSOPHY — BOLD dark ── */
.phil-s{
  background:var(--blue);overflow:hidden;position:relative;
}
.phil-bg-text{
  position:absolute;top:50%;left:0;right:0;
  font-family:var(--f-disp);font-size:clamp(100px,18vw,260px);font-weight:900;
  color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.05);
  text-transform:uppercase;letter-spacing:-.04em;line-height:1;
  transform:translateY(-50%);pointer-events:none;user-select:none;
  white-space:nowrap;
}
.phil-inner{
  position:relative;z-index:2;
  display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,8vw,120px);align-items:center;
}
.phil-left{}
.phil-tag{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:clamp(20px,3vw,32px)}
.phil-q{
  font-family:var(--f-disp);font-size:clamp(28px,4vw,56px);font-weight:900;
  line-height:.9;letter-spacing:-.03em;text-transform:uppercase;color:#fff;
  margin-bottom:clamp(20px,3.5vw,36px);
}
.phil-author{font-family:var(--f-body);font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase}
.phil-right{}
.phil-card{background:rgba(0,0,0,.2);padding:clamp(32px,4.5vw,56px);border:1px solid rgba(255,255,255,.1)}
.phil-card p{font-family:var(--f-body);font-size:clamp(14px,1.2vw,17px);line-height:1.85;color:rgba(255,255,255,.75);margin-bottom:clamp(20px,3vw,28px)}
.phil-card p:last-child{margin-bottom:0}
.phil-card .highlight{color:#fff;font-weight:600}
@media(max-width:768px){.phil-inner{grid-template-columns:1fr;gap:clamp(36px,6vw,56px)}}

/* ── FUN STRIP ── */
.fun-s{background:#050505;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;padding:clamp(20px,3vw,32px) 0}
.fun-track{display:flex;white-space:nowrap;animation:mqF 12s linear infinite}
.fun-item{font-family:var(--f-disp);font-size:clamp(40px,9vw,120px);font-weight:900;letter-spacing:-.02em;text-transform:uppercase;padding:0 clamp(16px,2.5vw,36px);display:inline-flex;align-items:center;gap:clamp(16px,2.5vw,36px)}
.fun-item .s{-webkit-text-stroke:1px rgba(240,237,230,.1);color:transparent}
.fun-item .f{color:var(--white)}
.fun-dot{color:var(--blue);font-size:.35em;line-height:1}

/* ── CTA — light ── */
.cta-s{background:#f0ede6;position:relative;overflow:hidden;text-align:center}
.cta-bg-num{
  position:absolute;bottom:-5%;left:50%;transform:translateX(-50%);
  font-family:var(--f-disp);font-size:clamp(200px,35vw,500px);font-weight:900;
  color:transparent;-webkit-text-stroke:1px rgba(5,5,5,.04);
  letter-spacing:-.05em;line-height:1;pointer-events:none;user-select:none;
}
.cta-inner{position:relative;z-index:2}
.cta-tag{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--blue);margin-bottom:clamp(16px,3vw,28px)}
.cta-h{
  font-family:var(--f-disp);font-size:clamp(48px,9vw,130px);font-weight:900;
  line-height:.85;letter-spacing:-.04em;text-transform:uppercase;color:#050505;
  margin-bottom:clamp(24px,4vw,44px);
}
.cta-h .blue{color:var(--blue)}
.cta-p{font-family:var(--f-body);font-size:clamp(13px,1vw,15px);color:#777;max-width:38ch;margin:0 auto clamp(32px,5vw,56px);line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-dark-outline{border:1px solid rgba(5,5,5,.2);color:#333;background:transparent}
.btn-dark-outline:hover{background:#050505;color:#fff;border-color:#050505}

/* ── FOOTER ── */
.footer{background:#050505;border-top:1px solid var(--border);padding:clamp(24px,4vw,44px) var(--pad)}
.footer-in{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.f-logo{font-family:var(--f-disp);font-size:14px;font-weight:700;letter-spacing:.08em;color:var(--white)}
.f-links{display:flex;gap:clamp(14px,2.5vw,28px);flex-wrap:wrap}
.f-lnk{font-family:var(--f-body);font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,237,230,.25);transition:color .2s}
.f-lnk:hover{color:var(--blue)}
.f-copy{font-family:var(--f-body);font-size:11px;color:rgba(240,237,230,.18)}

/* ══ WORKS PAGE ══ */
.wp-hero{background:#050505;padding:clamp(128px,16vw,200px) 0 clamp(48px,7vw,88px)}
.wp-h1{font-family:var(--f-disp);font-size:clamp(56px,12vw,160px);font-weight:900;line-height:.85;letter-spacing:-.04em;text-transform:uppercase;margin-bottom:clamp(16px,2.5vw,28px)}
.wp-h1 .outline{-webkit-text-stroke:1px rgba(240,237,230,.15);color:transparent}
.wp-h1 .blue{color:var(--blue)}
.wp-sub{font-family:var(--f-body);font-size:clamp(13px,1vw,15px);color:rgba(240,237,230,.4);max-width:44ch;line-height:1.8}
/* Works grid */
.wg{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--border);background-color:#111}
@media(max-width:640px){.wg{grid-template-columns:1fr}}
.wc{background:#0a0a0a;overflow:hidden;cursor:pointer;position:relative;transition:background .3s}
.wc:hover{background:#111}
.wc-img{width:100%;aspect-ratio:4/3;overflow:hidden;background:#111}
.wc-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.wc:hover .wc-img img{transform:scale(1.04)}
.wc-body{padding:clamp(20px,2.5vw,32px)}
.wc-meta{display:flex;justify-content:space-between;margin-bottom:clamp(10px,1.5vw,16px)}
.wc-n{font-family:var(--f-disp);font-size:10px;font-weight:700;color:rgba(240,237,230,.2);letter-spacing:.08em}
.wc-year{font-family:var(--f-body);font-size:10px;color:rgba(240,237,230,.25)}
.wc-title{font-family:var(--f-head);font-size:clamp(18px,2vw,28px);font-weight:700;color:var(--white);letter-spacing:-.01em;margin-bottom:6px;transition:color .25s}
.wc:hover .wc-title{color:var(--blue)}
.wc-cat{font-family:var(--f-body);font-size:11px;color:rgba(240,237,230,.3);margin-bottom:clamp(12px,2vw,18px)}
.wc-tags{display:flex;gap:6px;flex-wrap:wrap}
.wc-tag{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(240,237,230,.08);padding:3px 10px;color:rgba(240,237,230,.25);transition:border-color .25s,color .25s}
.wc:hover .wc-tag{border-color:rgba(0,71,255,.3);color:var(--blue)}
.wc-arr{position:absolute;top:16px;right:16px;width:36px;height:36px;background:var(--blue);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.6) rotate(-45deg);transition:opacity .25s,transform .3s cubic-bezier(.34,1.56,.64,1);color:#fff;font-size:14px}
.wc:hover .wc-arr{opacity:1;transform:scale(1) rotate(0)}

/* ══ WORK DETAIL ══ */
.wd-hero{background:#050505;padding:clamp(120px,14vw,180px) 0 clamp(48px,7vw,80px);border-bottom:1px solid var(--border)}
.wd-back{display:inline-flex;align-items:center;gap:8px;font-family:var(--f-body);font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,237,230,.3);margin-bottom:clamp(24px,4vw,44px);transition:color .2s;cursor:pointer}
.wd-back:hover{color:var(--blue)}
.wd-cat{font-family:var(--f-body);font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-bottom:14px}
.wd-title{font-family:var(--f-disp);font-size:clamp(40px,7vw,100px);font-weight:900;letter-spacing:-.04em;text-transform:uppercase;line-height:.88;margin-bottom:clamp(36px,5vw,60px)}
.wd-meta{display:flex;gap:clamp(24px,4vw,56px);flex-wrap:wrap;padding:clamp(24px,3.5vw,36px) 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:clamp(48px,7vw,88px)}
.wd-mi label{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,237,230,.3);display:block;margin-bottom:6px}
.wd-mi span{font-family:var(--f-body);font-size:13px;font-weight:600;color:var(--white)}
.wd-img{width:100%;aspect-ratio:16/9;background:#111;overflow:hidden;margin-bottom:clamp(48px,7vw,88px)}
.wd-img img{width:100%;height:100%;object-fit:cover}
.wd-body-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,88px);margin-bottom:clamp(48px,7vw,88px)}
.wd-sub{font-family:var(--f-head);font-size:clamp(18px,2vw,26px);font-weight:700;color:var(--white);margin-bottom:16px;letter-spacing:-.01em}
.wd-desc{font-family:var(--f-body);font-size:clamp(13px,1vw,15px);color:rgba(240,237,230,.45);line-height:1.85}
.wd-pal-label{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,237,230,.3);margin-bottom:14px}
.wd-pal{display:flex;gap:8px;margin-bottom:clamp(36px,5vw,56px)}
.wd-links{display:flex;gap:12px;flex-wrap:wrap;padding-top:clamp(32px,5vw,56px);border-top:1px solid var(--border)}
@media(max-width:640px){.wd-body-grid{grid-template-columns:1fr}}

/* ══ ABOUT PAGE ══ */
.ab-hero{background:#050505;padding:clamp(120px,14vw,180px) 0 clamp(48px,7vw,88px);overflow:hidden;position:relative}
.ab-hero-bg{position:absolute;right:-5%;top:50%;transform:translateY(-50%);font-family:var(--f-disp);font-size:clamp(200px,30vw,420px);font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(0,71,255,.04);letter-spacing:-.04em;pointer-events:none;user-select:none;line-height:1}
.ab-name{font-family:var(--f-disp);font-size:clamp(64px,12vw,180px);font-weight:900;line-height:.85;letter-spacing:-.04em;text-transform:uppercase;color:var(--white);position:relative;z-index:2;margin-bottom:clamp(40px,6vw,80px)}
.ab-name .blue{color:var(--blue)}
.ab-name .outline{-webkit-text-stroke:1px rgba(240,237,230,.2);color:transparent}
.ab-bio{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,100px);align-items:start;position:relative;z-index:2}
.ab-role-tag{display:inline-block;font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);border:1px solid rgba(0,71,255,.3);padding:5px 14px;margin-bottom:clamp(20px,3vw,32px)}
.ab-lead{font-family:var(--f-head);font-size:clamp(16px,1.5vw,20px);font-weight:700;line-height:1.5;color:var(--white);margin-bottom:clamp(16px,2.5vw,24px)}
.ab-sub{font-family:var(--f-body);font-size:clamp(13px,.95vw,15px);line-height:1.85;color:rgba(240,237,230,.4);margin-bottom:clamp(20px,3vw,32px)}
.ab-img{width:100%;aspect-ratio:3/4;background:#111;overflow:hidden;position:relative;max-width:480px}
.ab-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.ab-img:hover img{transform:scale(1.03)}
.ab-info{border:1px solid var(--border);max-width:480px;margin-top:16px}
.ai-row{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--border)}
.ai-row:last-child{border-bottom:none}
.ai-c{padding:clamp(12px,1.8vw,18px) clamp(14px,2vw,22px)}
.ai-c:not(:last-child){border-right:1px solid var(--border)}
.ai-label{font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,237,230,.25);margin-bottom:5px}
.ai-val{font-family:var(--f-body);font-size:12px;font-weight:600;color:var(--white)}
.ai-val a{color:var(--white);transition:color .2s}
.ai-val a:hover{color:var(--blue)}
@media(max-width:768px){.ab-bio{grid-template-columns:1fr}}

/* Skills */
.ab-skills-s{background:#f0ede6}
.sk-heading{font-family:var(--f-disp);font-size:clamp(32px,5vw,70px);font-weight:900;letter-spacing:-.04em;text-transform:uppercase;color:#050505;margin-bottom:clamp(40px,6vw,72px);line-height:.88}
.sk-heading .blue{color:var(--blue)}
.sk-2col{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,88px);align-items:start}
.sk-group{margin-bottom:clamp(24px,3.5vw,36px)}
.sk-cat-label{font-family:var(--f-body);font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:12px}
.sk-tags{display:flex;flex-wrap:wrap;gap:8px}
.sk-tag{font-family:var(--f-body);font-size:12px;font-weight:500;color:#050505;border:1px solid rgba(5,5,5,.12);padding:6px 14px;letter-spacing:.02em;opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s,background .2s,color .2s,border-color .2s}
.sk-tag.in{opacity:1;transform:none}
.sk-tag:hover{background:#050505;color:#fff;border-color:#050505}
@media(max-width:768px){.sk-2col{grid-template-columns:1fr}}

/* Experience */
.exp-s{background:#050505;border-top:1px solid var(--border)}
.exp-heading{font-family:var(--f-disp);font-size:clamp(32px,5vw,70px);font-weight:900;letter-spacing:-.04em;text-transform:uppercase;color:var(--white);margin-bottom:clamp(40px,6vw,72px);line-height:.88}
.exp{border-top:1px solid var(--border);padding:clamp(24px,3.5vw,40px) 0;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
.exp-t{font-family:var(--f-head);font-size:clamp(18px,2vw,26px);font-weight:700;color:var(--white);margin-bottom:5px;letter-spacing:-.01em}
.exp-c{font-family:var(--f-body);font-size:11px;font-weight:600;color:var(--blue);margin-bottom:10px;letter-spacing:.06em;text-transform:uppercase}
.exp-desc{font-family:var(--f-body);font-size:clamp(12px,.9vw,14px);line-height:1.8;color:rgba(240,237,230,.35);max-width:46ch}
.exp-badge{font-family:var(--f-body);font-size:9px;font-weight:600;color:rgba(240,237,230,.3);letter-spacing:.1em;white-space:nowrap;border:1px solid var(--border);padding:6px 12px;height:fit-content;flex-shrink:0}

/* Portfolio CTA strip */
.ab-port{border-top:1px solid var(--border);padding:clamp(48px,7vw,96px) 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px}
.ab-port-label{font-family:var(--f-body);font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
.ab-port-title{font-family:var(--f-disp);font-size:clamp(22px,3vw,40px);font-weight:900;letter-spacing:-.03em;text-transform:uppercase;color:var(--white);line-height:.95}
.ab-port-sub{font-family:var(--f-body);font-size:13px;color:rgba(240,237,230,.3);margin-top:10px;max-width:44ch;line-height:1.7}
.ab-port-btns{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0}

/* ══ CONTACT PAGE ══ */
.ct-hero{background:#050505;padding:clamp(120px,14vw,180px) 0 clamp(48px,7vw,88px)}
.ct-h1{font-family:var(--f-disp);font-size:clamp(48px,9vw,130px);font-weight:900;letter-spacing:-.04em;text-transform:uppercase;line-height:.85;margin-bottom:clamp(32px,5vw,60px)}
.ct-h1 .outline{-webkit-text-stroke:1px rgba(240,237,230,.15);color:transparent}
.ct-h1 .blue{color:var(--blue)}
.ct-tagline{font-family:var(--f-body);font-size:clamp(14px,1.2vw,17px);line-height:1.8;color:rgba(240,237,230,.4);max-width:42ch;margin-bottom:clamp(48px,7vw,80px)}
.ct-methods{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:clamp(64px,9vw,120px)}
@media(max-width:640px){.ct-methods{grid-template-columns:1fr 1fr}}
.ct-card{background:#0a0a0a;padding:clamp(24px,3.5vw,40px) clamp(20px,3vw,32px);position:relative;overflow:hidden;transition:background .3s;cursor:pointer}
.ct-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--blue);transition:width .35s}
.ct-card:hover::after{width:100%}
.ct-card:hover{background:#111}
.ct-card-label{font-family:var(--f-body);font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,237,230,.25);margin-bottom:clamp(12px,2vw,20px)}
.ct-card-val{font-family:var(--f-body);font-size:clamp(12px,1vw,14px);font-weight:600;color:var(--white);word-break:break-all;line-height:1.5;transition:color .25s}
.ct-card:hover .ct-card-val{color:var(--blue)}
.ct-card-arr{position:absolute;top:20px;right:20px;font-size:14px;color:rgba(240,237,230,.2);transition:color .25s,transform .25s}
.ct-card:hover .ct-card-arr{color:var(--blue);transform:translate(2px,-2px)}

/* Avail */
.ct-avail{border:1px solid rgba(0,71,255,.2);background:rgba(0,71,255,.04);padding:clamp(20px,3vw,32px) clamp(24px,3.5vw,40px);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(64px,9vw,120px)}
.ct-avail-dot{width:8px;height:8px;background:var(--blue);border-radius:50%;flex-shrink:0;animation:pulse 2.2s infinite;display:inline-block;margin-right:12px}
.ct-avail-txt{font-family:var(--f-body);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--blue)}

/* Form */
.ct-form-s{background:#050505;border-top:1px solid var(--border)}
.ct-form-inner{display:grid;grid-template-columns:1fr 1.4fr;gap:clamp(48px,8vw,120px);align-items:start}
@media(max-width:768px){.ct-form-inner{grid-template-columns:1fr}}
.ct-form-title{font-family:var(--f-disp);font-size:clamp(24px,3.5vw,48px);font-weight:900;letter-spacing:-.03em;text-transform:uppercase;color:var(--white);line-height:.92;margin-bottom:clamp(20px,3vw,32px)}
.ct-form-sub{font-family:var(--f-body);font-size:clamp(13px,.95vw,15px);line-height:1.85;color:rgba(240,237,230,.35);margin-bottom:clamp(28px,4vw,44px)}
/* form fields */
.fg{margin-bottom:clamp(14px,2vw,20px)}
.fl{font-family:var(--f-body);font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,237,230,.3);display:block;margin-bottom:8px}
.fi,.fta,.fsl{width:100%;background:rgba(255,255,255,.03);border:1px solid rgba(240,237,230,.08);padding:14px 18px;font-family:var(--f-body);font-size:14px;color:var(--white);outline:none;transition:border-color .22s,background .22s;appearance:none;border-radius:0}
.fi:focus,.fta:focus,.fsl:focus{border-color:var(--blue);background:rgba(0,71,255,.04)}
.fta{resize:none;height:120px}
.fsl{background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23555' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;background-color:rgba(255,255,255,.03)}
.fsl option{background:#1a1a1a;color:var(--white)}
.fm-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,1.5vw,16px)}
@media(max-width:480px){.fm-row{grid-template-columns:1fr}}

/* ══ RESPONSIVE ══ */
@media(max-width:768px){
  .n-links,.n-cta{display:none}.ham{display:flex}
  .intro-inner{grid-template-columns:1fr}
}
@media(hover:none){
  /* Touch: hide hover fills, show content always */
  .svc::after,.wi-fill,.pc{transition:none}
  .svc-name{color:var(--white)!important}
  .wi-name{color:#050505!important}
  .nc-accent{transform:scaleX(1)!important}
  .ct-card::after{width:100%!important}
  .ct-card-val{color:var(--white)!important}
  .wc-title{color:var(--white)!important}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>
</head>
<body>

<div id="cur"></div>
<div id="cur-ring"></div>
<div id="prog" role="progressbar" aria-hidden="true"></div>
<button id="stt" aria-label="Scroll to top">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>

<!-- NAV -->
<nav id="nav">
  <a href="#home" class="n-logo" data-page="home">
    <span class="n-logo-mark">D13</span>DAMON.13
  </a>
  <div class="n-links">
    <a class="n-link on" data-page="home" href="#home">Home</a>
    <a class="n-link" data-page="works" href="#works">Works</a>
    <a class="n-link" data-page="about" href="#about">About</a>
    <a class="n-link" data-page="contact" href="#contact">Contact</a>
  </div>
  <a href="#contact" class="n-cta" data-page="contact">Book a Call</a>
  <button class="ham" id="ham" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<div id="m-nav">
  <a class="m-link on" data-page="home" href="#home">Home</a>
  <a class="m-link" data-page="works" href="#works">Works</a>
  <a class="m-link" data-page="about" href="#about">About</a>
  <a class="m-link" data-page="contact" href="#contact">Contact</a>
  <a class="btn btn-p" data-page="contact" href="#contact" style="margin-top:20px">Book a Call</a>
</div>


<!-- ══════════ HOME ══════════ -->
<div id="page-home" class="page on">

  <section class="hero">
    <div class="hero-rule"></div>
    <div class="hero-noise"></div>
    <div class="hero-bg-num">D13</div>

    <div class="hero-content">
      <div class="hero-kicker">
        <span class="hero-kicker-dot"></span>
        Creative Leader · Available for hire
      </div>

      <h1 class="hero-h1">
        <span class="outline">Design</span><br/>
        <span>that</span><br/>
        <span class="blue shift">Solves.</span>
      </h1>

      <div class="hero-sub-row">
        <p class="hero-desc">
          <strong>Thong Ngo — Damon.13</strong><br/>
          Creative Leader & Brand Designer.<br/>
          Ho Chi Minh City, Vietnam.<br/>
          Brand Identity · Digital Product · POSM · Social Media.
        </p>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-n">5+</div>
            <div class="hero-stat-l">Years Exp.</div>
          </div>
          <div>
            <div class="hero-stat-n">12+</div>
            <div class="hero-stat-l">Projects</div>
          </div>
          <div>
            <div class="hero-stat-n">1.1k</div>
            <div class="hero-stat-l">Views</div>
          </div>
        </div>
        <div class="hero-actions">
          <a href="#works" data-page="works" class="btn btn-p">
            See works
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
          <a href="#contact" data-page="contact" class="btn btn-o">Book a call</a>
        </div>
      </div>
    </div>

    <div class="hero-tape">
      <div class="hero-tape-track">
        <span class="hero-tape-item">Brand Identity<span class="dot">◆</span></span>
        <span class="hero-tape-item">Digital Product<span class="dot">◆</span></span>
        <span class="hero-tape-item">POSM Design<span class="dot">◆</span></span>
        <span class="hero-tape-item">Social Media<span class="dot">◆</span></span>
        <span class="hero-tape-item">Framer Website<span class="dot">◆</span></span>
        <span class="hero-tape-item">Creative Leader<span class="dot">◆</span></span>
        <span class="hero-tape-item">Art Direction<span class="dot">◆</span></span>
        <span class="hero-tape-item">Brand Identity<span class="dot">◆</span></span>
        <span class="hero-tape-item">Digital Product<span class="dot">◆</span></span>
        <span class="hero-tape-item">POSM Design<span class="dot">◆</span></span>
        <span class="hero-tape-item">Social Media<span class="dot">◆</span></span>
        <span class="hero-tape-item">Framer Website<span class="dot">◆</span></span>
        <span class="hero-tape-item">Creative Leader<span class="dot">◆</span></span>
        <span class="hero-tape-item">Art Direction<span class="dot">◆</span></span>
      </div>
    </div>
  </section>

  <!-- INTRO -->
  <section class="intro-s s-pad">
    <div class="wrap">
      <div class="intro-inner">
        <div class="intro-left rev">
          <div class="intro-eyebrow">( Who I am )</div>
          <h2 class="intro-heading">Strategic<br/>design meets<br/><span class="accent">visual</span><br/>impact.</h2>
          <p class="intro-body">I'm <strong>Thong Ngo (Damon.13)</strong> — Creative Leader & Media Lead at <strong>Milano Coffee Vietnam</strong> and Freelance Brand Designer. 5+ years leading creative teams across Brand Identity, Digital Product, POSM and Social Media — building systems, not just visuals.</p>
          <div class="intro-stats rev d2">
            <div>
              <div class="intro-stat-n">5+</div>
              <div class="intro-stat-l">Years experience</div>
            </div>
            <div>
              <div class="intro-stat-n">5</div>
              <div class="intro-stat-l">Team members led</div>
            </div>
            <div>
              <div class="intro-stat-n">12+</div>
              <div class="intro-stat-l">Projects delivered</div>
            </div>
          </div>
        </div>
        <div class="rev d1">
          <div class="intro-blue-bar"></div>
          <div class="intro-quote-card">
            <p class="intro-quote-text">"Design with <span class="b">intention</span>, deliver with <span class="b">precision</span>."</p>
            <p class="intro-quote-author">— Thong Ngo / Damon.13</p>
          </div>
          <div style="margin-top:16px;display:flex;gap:12px">
            <a href="#about" data-page="about" class="btn btn-o" style="flex:1;justify-content:center">About me</a>
            <a href="#works" data-page="works" class="btn btn-p" style="flex:1;justify-content:center">See works <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="svc-s s-pad">
    <div class="wrap">
      <div class="sec-tag rev">( Capabilities )</div>
      <h2 class="svc-heading rev">
        What I<br/><span class="outline">do.</span>
      </h2>
      <div role="list">
        <div class="svc rev"    role="listitem"><div class="svc-n">01</div><div><div class="svc-name">Brand Identity</div><div class="svc-desc">Logo · Typography · Color System · Guidelines</div></div><div class="svc-desc" style="text-align:right">Strategy → Execution</div><div class="svc-arr">↗</div></div>
        <div class="svc rev d1" role="listitem"><div class="svc-n">02</div><div><div class="svc-name">Digital Product Design</div><div class="svc-desc">UX Research · Wireframe · High-Fidelity · Prototype</div></div><div class="svc-desc" style="text-align:right">Figma · Framer</div><div class="svc-arr">↗</div></div>
        <div class="svc rev d2" role="listitem"><div class="svc-n">03</div><div><div class="svc-name">POSM & Merchandise</div><div class="svc-desc">Banner · Packaging · Print Materials · Seasonal</div></div><div class="svc-desc" style="text-align:right">Print ready</div><div class="svc-arr">↗</div></div>
        <div class="svc rev d3" role="listitem"><div class="svc-n">04</div><div><div class="svc-name">Social Media Design</div><div class="svc-desc">Content Strategy · Visual System · Multi-platform</div></div><div class="svc-desc" style="text-align:right">Growth focused</div><div class="svc-arr">↗</div></div>
        <div class="svc rev d4" role="listitem"><div class="svc-n">05</div><div><div class="svc-name">Creative Leadership</div><div class="svc-desc">Team Lead · Art Direction · Brand Strategy · KPIs</div></div><div class="svc-desc" style="text-align:right">5-member team</div><div class="svc-arr">↗</div></div>
      </div>
    </div>
  </section>

  <!-- SELECTED WORKS -->
  <section class="works-s s-pad">
    <div class="wrap">
      <div class="works-header">
        <h2 class="works-title rev">Work that<br/><span class="blue">speaks.</span></h2>
        <a href="#works" data-page="works" class="btn btn-dark-outline rev d1" style="border-color:rgba(5,5,5,.2);color:#555">All works ↗</a>
      </div>
      <div id="home-work-list" role="list"></div>
    </div>
  </section>

  <!-- NUMBERS -->
  <section class="nums-s s-pad">
    <div class="wrap">
      <div class="sec-tag rev" style="color:rgba(240,237,230,.3)">( Results )</div>
      <h2 class="svc-heading rev">By the<br/><span style="-webkit-text-stroke:1px rgba(240,237,230,.2);color:transparent">numbers.</span></h2>
      <div class="num-grid rev d2">
        <div class="nc"><div class="nc-accent"></div><div class="nc-val">35</div><div class="nc-lbl">Appreciations</div><div class="nc-desc">From the design community</div></div>
        <div class="nc"><div class="nc-accent"></div><div class="nc-val">1.1k</div><div class="nc-lbl">Project Views</div><div class="nc-desc">Across all platforms</div></div>
        <div class="nc"><div class="nc-accent"></div><div class="nc-val">12+</div><div class="nc-lbl">Projects Done</div><div class="nc-desc">Delivered end-to-end</div></div>
        <div class="nc"><div class="nc-accent"></div><div class="nc-val">5+</div><div class="nc-lbl">Years Exp.</div><div class="nc-desc">In brand & digital design</div></div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="proc-s s-pad">
    <div class="wrap">
      <div class="sec-tag rev" style="color:var(--blue)">( Process )</div>
      <h2 class="proc-heading rev">From <span class="accent">"not sure"</span><br/>to "I love it."</h2>
      <div class="proc-grid">
        <div class="pc rev"   ><div class="pc-nn">01</div><div class="pc-t">Book a Call</div><p class="pc-b">30 minutes to align vision and confirm fit.</p><div class="pc-time">30 min</div></div>
        <div class="pc rev d1"><div class="pc-nn">02</div><div class="pc-t">Project Brief</div><p class="pc-b">Define scope, timeline and deliverables together.</p><div class="pc-time">1 week</div></div>
        <div class="pc rev d2"><div class="pc-nn">03</div><div class="pc-t">Design & Build</div><p class="pc-b">Design, refine and iterate until it's perfect.</p><div class="pc-time">3–4 weeks</div></div>
        <div class="pc rev d3"><div class="pc-nn">04</div><div class="pc-t">Deliver</div><p class="pc-b">Handoff files, guidelines and full support.</p><div class="pc-time">1–2 weeks</div></div>
        <div class="pc rev d4" style="border-top:2px solid var(--blue)"><div class="pc-nn" style="color:rgba(0,71,255,.1)">05</div><div class="pc-t" style="color:var(--blue)">30-Day Support</div><p class="pc-b">Free. Minor revisions after delivery.</p><div class="pc-time">Free</div></div>
      </div>
    </div>
  </section>

  <!-- PHILOSOPHY -->
  <section class="phil-s s-pad">
    <div class="phil-bg-text">DESIGN&nbsp;&nbsp;INTENTION</div>
    <div class="wrap">
      <div class="phil-inner">
        <div class="phil-left rev">
          <div class="phil-tag">( Philosophy )</div>
          <h2 class="phil-q">"Design with intention,<br/>deliver with<br/>precision."</h2>
          <p class="phil-author">— Thong Ngo / Damon.13</p>
        </div>
        <div class="phil-right rev d2">
          <div class="phil-card">
            <p>Every pixel needs a reason to exist — and that reason must serve the end user, not just look good on a portfolio.</p>
            <p>From strategy to execution, the question is always: <span class="highlight">"What problem does this solve?"</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FUN STRIP -->
  <div class="fun-s">
    <div class="fun-track">
      <span class="fun-item"><span class="f">CRAFTED</span><span class="fun-dot">◆</span><span class="s">NOT GENERATED</span><span class="fun-dot">◆</span><span class="f">PIXELS</span><span class="fun-dot">◆</span><span class="s">WITH PURPOSE</span><span class="fun-dot">◆</span><span class="f">BOLD</span><span class="fun-dot">◆</span><span class="s">OR NOTHING</span><span class="fun-dot">◆</span></span>
      <span class="fun-item"><span class="f">CRAFTED</span><span class="fun-dot">◆</span><span class="s">NOT GENERATED</span><span class="fun-dot">◆</span><span class="f">PIXELS</span><span class="fun-dot">◆</span><span class="s">WITH PURPOSE</span><span class="fun-dot">◆</span><span class="f">BOLD</span><span class="fun-dot">◆</span><span class="s">OR NOTHING</span><span class="fun-dot">◆</span></span>
    </div>
  </div>

  <!-- CTA -->
  <section class="cta-s s-pad">
    <div class="cta-bg-num">D13</div>
    <div class="wrap cta-inner">
      <div class="cta-tag rev">( Let's work )</div>
      <h2 class="cta-h rev d1">Let's build<br/>something<br/><span class="blue">great.</span></h2>
      <p class="cta-p rev d2">Open to Creative Leader & Brand Director opportunities — let's talk.</p>
      <div class="cta-btns rev d3">
        <a href="#contact" data-page="contact" class="btn btn-p">Start a project <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="btn btn-dark-outline">Framer Portfolio ↗</a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-in">
      <div class="f-logo">DAMON.13</div>
      <div class="f-links">
        <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="f-lnk">Behance</a>
        <a href="https://www.linkedin.com/in/thong-ngo-154481264" target="_blank" rel="noopener" class="f-lnk">LinkedIn</a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="f-lnk">Framer</a>
        <a href="mailto:ngothong777@gmail.com" class="f-lnk">Email</a>
      </div>
      <div class="f-copy">© 2025 Thong Ngo. All rights reserved.</div>
    </div>
  </footer>
</div>


<!-- ══════════ WORKS ══════════ -->
<div id="page-works" class="page">
  <section class="wp-hero">
    <div class="wrap">
      <div class="wp-h1 rev">
        <div class="outline">Selected</div>
        <div><span class="blue">Work</span><span style="-webkit-text-stroke:1px rgba(240,237,230,.15);color:transparent">s.</span></div>
      </div>
      <p class="wp-sub rev d1">Branding, Digital Product, POSM & Social — every project is a solution.</p>
    </div>
  </section>
  <div id="works-grid" class="wg"></div>
  <footer class="footer" style="margin-top:2px">
    <div class="footer-in">
      <div class="f-logo">DAMON.13</div>
      <div class="f-links">
        <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="f-lnk">Behance</a>
        <a href="https://www.linkedin.com/in/thong-ngo-154481264" target="_blank" rel="noopener" class="f-lnk">LinkedIn</a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="f-lnk">Framer</a>
      </div>
      <div class="f-copy">© 2025 Thong Ngo</div>
    </div>
  </footer>
</div>


<!-- ══════════ WORK DETAIL ══════════ -->
<div id="page-work-detail" class="page">
  <section class="wd-hero">
    <div class="wrap">
      <div class="wd-back" id="work-back-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        All Works
      </div>
      <div class="wd-cat" id="wd-cat"></div>
      <h1 class="wd-title" id="wd-title"></h1>
      <div class="wd-meta" id="wd-meta"></div>
    </div>
  </section>
  <div style="background:#050505;padding:0 0 clamp(64px,10vw,120px)">
    <div class="wrap">
      <div class="wd-img" id="wd-hero-img"></div>
      <div class="wd-body-grid">
        <div>
          <h2 class="wd-sub" id="wd-sub"></h2>
          <p class="wd-desc" id="wd-desc"></p>
        </div>
        <div>
          <div class="wd-pal-label">Color palette</div>
          <div class="wd-pal" id="wd-pal"></div>
        </div>
      </div>
      <div class="wd-links" id="wd-links"></div>
    </div>
  </div>
  <footer class="footer">
    <div class="footer-in">
      <div class="f-logo">DAMON.13</div>
      <div class="f-links">
        <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="f-lnk">Behance</a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="f-lnk">Framer</a>
      </div>
      <div class="f-copy">© 2025 Thong Ngo</div>
    </div>
  </footer>
</div>


<!-- ══════════ ABOUT ══════════ -->
<div id="page-about" class="page">
  <section class="ab-hero">
    <div class="ab-hero-bg">D13</div>
    <div class="wrap">
      <h1 class="ab-name blur-r">Thong<br/><span class="blue">Ngo.</span></h1>
      <div class="ab-bio">
        <div class="rev">
          <div class="ab-role-tag">Creative Leader · Media Lead · Brand Designer</div>
          <p class="ab-lead">I lead creative teams and solve problems through strategic design.</p>
          <p class="ab-sub">5+ years across Brand Identity, POSM, Digital Product, and Social Media — currently leading a 5-member media team at Milano Coffee Vietnam. I build systems, not just visuals.</p>
          <p class="ab-sub">Philosophy: <span style="color:var(--blue);font-weight:600">Design with intention, deliver with precision.</span></p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:clamp(24px,4vw,36px)">
            <a href="#contact" data-page="contact" class="btn btn-p">Work with me</a>
            <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="btn btn-o">Framer Portfolio ↗</a>
          </div>
        </div>
        <div class="rev d1">
          <div class="ab-img">
            <img src="https://framerusercontent.com/images/FqxWcK7Cn7FE52FxtG26kHGz6I.jpeg" alt="Thong Ngo — Damon.13" onerror="this.parentElement.style.background='#111';this.remove()"/>
          </div>
          <div class="ab-info rev d2">
            <div class="ai-row">
              <div class="ai-c"><div class="ai-label">Email</div><div class="ai-val"><a href="mailto:ngothong777@gmail.com">ngothong777@gmail.com</a></div></div>
              <div class="ai-c"><div class="ai-label">Status</div><div class="ai-val" style="color:var(--blue)"><span style="display:inline-block;width:6px;height:6px;background:var(--blue);border-radius:50%;margin-right:8px;animation:pulse 2.2s infinite"></span>Available</div></div>
            </div>
            <div class="ai-row">
              <div class="ai-c"><div class="ai-label">Company</div><div class="ai-val">Milano Coffee VN</div></div>
              <div class="ai-c"><div class="ai-label">Role</div><div class="ai-val">Creative Leader</div></div>
            </div>
            <div class="ai-row">
              <div class="ai-c"><div class="ai-label">Phone</div><div class="ai-val"><a href="tel:+84367062214">+84 367 062 214</a></div></div>
              <div class="ai-c"><div class="ai-label">Based in</div><div class="ai-val">HCMC, Vietnam</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="ab-skills-s s-pad">
    <div class="wrap">
      <h2 class="sk-heading rev">Skills &<br/><span class="blue">expertise.</span></h2>
      <div class="sk-2col">
        <div id="skills-list"></div>
        <div class="rev d1">
          <div class="sk-cat-label">Experience timeline</div>
          <div class="exp" style="border-top:none;padding-top:0">
            <div>
              <div class="exp-t" style="color:#050505;font-family:var(--f-head);font-size:clamp(16px,1.8vw,22px);font-weight:700">Milano Coffee Vietnam</div>
              <div class="exp-c">Media Lead → Creative Leader</div>
              <p class="exp-desc" style="color:#777">Leading a 5-member media team — brand identity, POSM, social media and digital product. Full ownership of creative direction and KPI delivery.</p>
            </div>
            <div class="exp-badge" style="border-color:rgba(5,5,5,.1);color:#999">2022 – Now</div>
          </div>
          <div class="exp" style="border-color:rgba(5,5,5,.07)">
            <div>
              <div class="exp-t" style="color:#050505;font-family:var(--f-head);font-size:clamp(16px,1.8vw,22px);font-weight:700">Freelance Designer</div>
              <div class="exp-c">Brand Designer · UI/UX</div>
              <p class="exp-desc" style="color:#777">Brand identity, Framer websites, and digital product design for clients across Vietnam and beyond.</p>
            </div>
            <div class="exp-badge" style="border-color:rgba(5,5,5,.1);color:#999">2020 – Now</div>
          </div>
        </div>
      </div>

      <!-- Portfolio CTA -->
      <div class="ab-behance rev" style="border-top:1px solid rgba(5,5,5,.07);margin-top:clamp(56px,8vw,100px);padding:clamp(40px,6vw,72px) 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px">
        <div>
          <div style="font-family:var(--f-body);font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:10px">( Portfolio )</div>
          <div style="font-family:var(--f-disp);font-size:clamp(22px,3.5vw,44px);font-weight:900;letter-spacing:-.03em;text-transform:uppercase;color:#050505;line-height:.92">Full work on<br/><span style="color:var(--blue)">Framer & Behance.</span></div>
          <p style="font-family:var(--f-body);font-size:13px;color:#888;margin-top:10px;max-width:44ch;line-height:1.7">Brand Identity, POSM, UI/UX and Social Media — full case studies with process.</p>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0">
          <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="btn btn-p">Framer ↗</a>
          <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="btn btn-dark-outline">Behance ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Experience dark -->
  <section class="exp-s s-pad">
    <div class="wrap">
      <h2 class="exp-heading rev">Awards &<br/><span style="-webkit-text-stroke:1px rgba(240,237,230,.15);color:transparent">recognition.</span></h2>
      <div class="exp rev">
        <div>
          <div class="exp-t">Behance Featured</div>
          <div class="exp-c">Milano Coffee · Lunar New Year Packaging</div>
          <p class="exp-desc">97 views · 7 appreciations — community recognition for cultural identity design.</p>
        </div>
        <div class="exp-badge">2025</div>
      </div>
      <div class="exp rev d1">
        <div>
          <div class="exp-t">Team Leadership</div>
          <div class="exp-c">Milano Coffee Vietnam — 5 members</div>
          <p class="exp-desc">Built and led a full creative department from scratch. KPIs, workflows, and visual systems designed for scale.</p>
        </div>
        <div class="exp-badge">2022 – Now</div>
      </div>
      <div class="exp rev d2">
        <div>
          <div class="exp-t">Framer Portfolio Launch</div>
          <div class="exp-c">damon13design.framer.website</div>
          <p class="exp-desc">Custom no-code portfolio with case studies, animation, and CMS — built entirely in Framer.</p>
        </div>
        <div class="exp-badge">2024</div>
      </div>

      <div class="ab-port rev" style="margin-top:clamp(48px,7vw,88px)">
        <div>
          <div class="ab-port-label">( Contact )</div>
          <div class="ab-port-title">Open to<br/><span style="color:var(--blue)">new opportunities.</span></div>
          <p class="ab-port-sub">Creative Leader, Brand Director, Art Director — roles that need strategic creative vision.</p>
        </div>
        <div class="ab-port-btns">
          <a href="#contact" data-page="contact" class="btn btn-p">Work with me</a>
          <a href="mailto:ngothong777@gmail.com" class="btn btn-o">Email directly ↗</a>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-in">
      <div class="f-logo">DAMON.13</div>
      <div class="f-links">
        <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="f-lnk">Behance</a>
        <a href="https://www.linkedin.com/in/thong-ngo-154481264" target="_blank" rel="noopener" class="f-lnk">LinkedIn</a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="f-lnk">Framer</a>
        <a href="mailto:ngothong777@gmail.com" class="f-lnk">Email</a>
      </div>
      <div class="f-copy">© 2025 Thong Ngo. All rights reserved.</div>
    </div>
  </footer>
</div>


<!-- ══════════ CONTACT ══════════ -->
<div id="page-contact" class="page">
  <section class="ct-hero">
    <div class="wrap">
      <h1 class="ct-h1 rev">
        Let's<br/>
        <span class="outline">create</span><br/>
        <span class="blue">together.</span>
      </h1>
      <p class="ct-tagline rev d1">Open to Creative Leader & Brand Director positions, freelance brand projects, and strategic design collaborations.</p>
      <div class="ct-methods rev d2">
        <a href="mailto:ngothong777@gmail.com" class="ct-card">
          <div class="ct-card-label">Email</div>
          <div class="ct-card-val">ngothong777@gmail.com</div>
          <div class="ct-card-arr">↗</div>
        </a>
        <a href="tel:+84367062214" class="ct-card">
          <div class="ct-card-label">Phone</div>
          <div class="ct-card-val">+84 367 062 214</div>
          <div class="ct-card-arr">↗</div>
        </a>
        <a href="https://www.linkedin.com/in/thong-ngo-154481264" target="_blank" rel="noopener" class="ct-card">
          <div class="ct-card-label">LinkedIn</div>
          <div class="ct-card-val">Thong Ngo</div>
          <div class="ct-card-arr">↗</div>
        </a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="ct-card">
          <div class="ct-card-label">Portfolio</div>
          <div class="ct-card-val">damon13design.framer.website</div>
          <div class="ct-card-arr">↗</div>
        </a>
      </div>
      <div class="ct-avail rev d3">
        <div><span class="ct-avail-dot"></span><span class="ct-avail-txt">Available for Creative Leadership roles · 2026</span></div>
        <a href="mailto:ngothong777@gmail.com" class="btn btn-p">Email now ↗</a>
      </div>
    </div>
  </section>

  <section class="ct-form-s s-pad">
    <div class="wrap">
      <div class="ct-form-inner">
        <div class="rev">
          <h2 class="ct-form-title">Start a<br/>project.</h2>
          <p class="ct-form-sub">Tell me about your project — I'll respond within 24 hours. Based in Ho Chi Minh City, available worldwide for remote collaboration.</p>
          <div style="border-top:1px solid var(--border);padding-top:clamp(20px,3vw,32px)">
            <div style="font-family:var(--f-body);font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,237,230,.25);margin-bottom:12px">Response time</div>
            <div style="font-family:var(--f-head);font-size:18px;font-weight:700;color:var(--white)">&lt; 24 hours</div>
          </div>
        </div>
        <form class="rev d1" onsubmit="handleForm(event)">
          <div class="fm-row">
            <div class="fg"><label class="fl" for="fn">Name</label><input id="fn" class="fi" type="text" placeholder="Your name" required/></div>
            <div class="fg"><label class="fl" for="fe">Email</label><input id="fe" class="fi" type="email" placeholder="your@email.com" required/></div>
          </div>
          <div class="fg"><label class="fl" for="ft">Project type</label>
            <select id="ft" class="fsl">
              <option value="">Select project type</option>
              <option>Brand Identity</option>
              <option>Digital Product (UI/UX)</option>
              <option>POSM / Merchandise</option>
              <option>Social Media Design</option>
              <option>Framer Website</option>
              <option>Full-time Hire / Creative Leader</option>
              <option>Other</option>
            </select>
          </div>
          <div class="fg"><label class="fl" for="fm">Project description</label><textarea id="fm" class="fta" placeholder="What do you want to achieve? Deadline? Budget?" required></textarea></div>
          <button type="submit" class="btn btn-p" style="width:100%;justify-content:center">Send message <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></button>
        </form>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-in">
      <div class="f-logo">DAMON.13</div>
      <div class="f-links">
        <a href="https://www.behance.net/thngng17" target="_blank" rel="noopener" class="f-lnk">Behance</a>
        <a href="https://www.linkedin.com/in/thong-ngo-154481264" target="_blank" rel="noopener" class="f-lnk">LinkedIn</a>
        <a href="https://damon13design.framer.website" target="_blank" rel="noopener" class="f-lnk">Framer Portfolio</a>
        <a href="mailto:ngothong777@gmail.com" class="f-lnk">Email</a>
      </div>
      <div class="f-copy">© 2025 Thong Ngo. All rights reserved.</div>
    </div>
  </footer>
</div>


<script>
'use strict';

const WORKS=[
  {id:'posm',num:'01',title:'POSM & Merchandise',category:'Print · Merchandise',client:'Multiple Clients',year:'2024–2025',role:'Lead Designer',tags:['POSM','Merchandise','Print'],thumb:'https://framerusercontent.com/images/yTWs2d1dqQXlVqfFDrSkYeT2Hs.png',sub:'Point-of-sale materials and print products.',desc:'A comprehensive POSM project — banners, standees, paper bags and packaging. Consistent brand identity with strong visual impact at the point of sale.',pal:['#1a1a2e','#e94560','#f5f5f5'],links:[{t:'View Case Study',u:'https://damon13design.framer.website/works'},{t:'Behance ↗',u:'https://www.behance.net/thngng17'}]},
  {id:'finwise',num:'02',title:'FINWISE — Finance App',category:'UX/UI · Digital Product',client:'Personal Project',year:'2024',role:'UX/UI Designer',tags:['UX/UI','Finance','Figma'],thumb:'https://framerusercontent.com/images/A7KeuErXykS6ClCnMhn53sQU0Q.png',sub:'Personal finance app — wireframe to high-fidelity.',desc:'UX Research → Information Architecture → high-fidelity prototype in Figma. Complex personal finance made simple: understand your finances in 3 seconds.',pal:['#0f1b2d','#0047FF','#ffffff'],links:[{t:'View on Framer ↗',u:'https://damon13design.framer.website/works/lumex'}]},
  {id:'horizon',num:'03',title:'Horizon Atlas — Branding',category:'Brand Identity',client:'Horizon Atlas',year:'2024',role:'Brand Designer',tags:['Branding','Logo','Guidelines'],thumb:'https://framerusercontent.com/images/VaO3s1nRD6PBA2OlAKWutRWTs.jpg',sub:'Comprehensive Brand Identity — logo, type, color, guidelines.',desc:'Building a visual identity system from zero. Logo, typography, color system, and brand guidelines — flexible, consistent and designed to scale.',pal:['#1c1c1c','#c8a96e','#f0ede8'],links:[{t:'View on Framer ↗',u:'https://damon13design.framer.website/works/horizon-atlas'}]},
  {id:'social',num:'04',title:'Social Media — Healthcare',category:'Social Media Design',client:'Healthcare Client',year:'2024–25',role:'Visual Designer',tags:['Social','Healthcare'],thumb:'https://framerusercontent.com/images/orDawILBFOZASn9jprrexENwWM.jpg',sub:'Social media visual system for Healthcare.',desc:'Clear and compelling healthcare content designed for trust and engagement. A consistent grid system with strong visual hierarchy that performs across all platforms.',pal:['#f0f8ff','#0047FF','#212529'],links:[{t:'View on Framer ↗',u:'https://damon13design.framer.website/works/social'}]},
  {id:'milano',num:'05',title:'Milano — Lunar New Year',category:'Packaging · Seasonal',client:'Milano Coffee VN',year:'2025',role:'Media Lead',tags:['Packaging','Seasonal','Brand'],thumb:'https://mir-s3-cdn-cf.behance.net/projects/404/2a6a12242534849.6970d4ab20a30.jpg',sub:'Seasonal packaging for Lunar New Year 2025.',desc:'Blending Vietnamese cultural identity with modern brand aesthetics for Milano Coffee. Seasonal packaging campaign — Behance featured: 97 views, 7 appreciations.',pal:['#c0392b','#f39c12','#fff8f0'],links:[{t:'View on Behance ↗',u:'https://www.behance.net/gallery/242534849/Milano-Coffee-Lunar-New-Year-Packaging'},{t:'Framer Portfolio ↗',u:'https://damon13design.framer.website'}]},
];

const SKILL_GROUPS=[
  {cat:'Software',items:['Adobe Illustrator','Photoshop','Lightroom','Premiere Pro','After Effects','Figma','Framer']},
  {cat:'Creative & Art Direction',items:['Brand Identity','Art Direction','UI/UX Design','POSM & Print','Food Styling','Product Photography']},
  {cat:'Business & Strategy',items:['Team Leadership','Strategic Planning','KPI Management','Cross-functional Collaboration']},
];

/* Router */
let page='home',skillsDone=false;
function go(pg,wid){
  if(pg===page&&!wid)return;
  document.querySelectorAll('.page.on').forEach(p=>{p.classList.remove('on','page-in');setTimeout(()=>{p.style.display='none'},10)});
  document.querySelectorAll('.n-link,.m-link').forEach(l=>l.classList.remove('on'));
  const valid=['home','works','about','contact','work-detail'];
  if(pg==='work-detail'){const w=WORKS.find(x=>x.id===wid);if(!w){pg='works'}else{renderWD(w)}}
  if(!valid.includes(pg))pg='home';
  const tgt=document.getElementById('page-'+pg);
  if(tgt){tgt.style.display='block';requestAnimationFrame(()=>{tgt.classList.add('on','page-in')})}
  document.querySelectorAll(`.n-link[data-page="${pg}"],.m-link[data-page="${pg}"]`).forEach(l=>l.classList.add('on'));
  if(pg==='about'&&!skillsDone)setTimeout(initSkills,400);
  page=pg;
  const nh='#'+pg+(wid?'/'+wid:'');
  if(location.hash!==nh)history.pushState({pg,wid:wid||null},'',nh);
  closeNav();
  window.scrollTo({top:0,behavior:'instant'});
  setTimeout(initReveal,100);
  setTimeout(addHover,160);
}

function renderWD(w){
  document.getElementById('wd-cat').textContent=w.category;
  document.getElementById('wd-title').textContent=w.title;
  document.getElementById('wd-meta').innerHTML=[{l:'Client',v:w.client},{l:'Year',v:w.year},{l:'Role',v:w.role},{l:'Type',v:w.category}].map(x=>`<div class="wd-mi"><label>${x.l}</label><span>${x.v}</span></div>`).join('');
  document.getElementById('wd-hero-img').innerHTML=`<img src="${w.thumb}" alt="${w.title}" loading="eager" onerror="this.parentElement.style.background='#111';this.remove()"/>`;
  document.getElementById('wd-sub').textContent=w.sub;
  document.getElementById('wd-desc').textContent=w.desc;
  document.getElementById('wd-pal').innerHTML=w.pal.map(c=>`<div style="width:32px;height:32px;background:${c};border:1px solid rgba(255,255,255,.07)" title="${c}"></div>`).join('');
  document.getElementById('wd-links').innerHTML=w.links.map(l=>`<a href="${l.u}" target="_blank" rel="noopener" class="btn btn-p">${l.t}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>`).join('');
}

function renderGrid(){
  document.getElementById('works-grid').innerHTML=WORKS.map(w=>`
    <article class="wc" data-work="${w.id}" tabindex="0" role="button" aria-label="${w.title}">
      <div class="wc-img"><img src="${w.thumb}" alt="${w.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center\\'><span style=\\'font-family:var(--f-disp);font-size:56px;font-weight:900;color:rgba(240,237,230,.04)\\'>${w.num}</span></div>'"/></div>
      <div class="wc-body">
        <div class="wc-meta"><span class="wc-n">${w.num}</span><span class="wc-year">${w.year}</span></div>
        <div class="wc-title">${w.title}</div>
        <div class="wc-cat">${w.category}</div>
        <div class="wc-tags">${w.tags.map(t=>`<span class="wc-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="wc-arr">↗</div>
    </article>`).join('');
  document.querySelectorAll('.wc').forEach(c=>{
    c.addEventListener('click',()=>go('work-detail',c.dataset.work));
    c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')go('work-detail',c.dataset.work)});
  });
}

function renderHomeList(){
  const el=document.getElementById('home-work-list');
  el.innerHTML=WORKS.slice(0,4).map(w=>`
    <div class="wi rev" data-work="${w.id}" tabindex="0" role="button" aria-label="${w.title}">
      <div class="wi-fill"></div>
      <div class="wi-n">${w.num}</div>
      <div><div class="wi-name">${w.title}</div><div class="wi-cat">${w.category}</div></div>
      <div class="wi-tags">${w.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="wi-arr">↗</div>
    </div>`).join('');
  el.querySelectorAll('.wi').forEach(i=>{
    i.addEventListener('click',()=>go('work-detail',i.dataset.work));
    i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')go('work-detail',i.dataset.work)});
  });
}

function renderSkills(){
  document.getElementById('skills-list').innerHTML=SKILL_GROUPS.map(g=>`
    <div class="sk-group">
      <div class="sk-cat-label">${g.cat}</div>
      <div class="sk-tags">${g.items.map(i=>`<span class="sk-tag">${i}</span>`).join('')}</div>
    </div>`).join('');
}

function initSkills(){
  if(skillsDone)return;skillsDone=true;
  document.querySelectorAll('.sk-tag').forEach((t,i)=>{
    setTimeout(()=>t.classList.add('in'),i*45+200);
  });
}

/* Reveal */
let revObs;
function initReveal(){
  if(revObs)revObs.disconnect();
  revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target)}})},{threshold:.05,rootMargin:'0px 0px -15px 0px'});
  document.querySelectorAll('.rev:not(.in),.blur-r:not(.in)').forEach(el=>revObs.observe(el));
}

/* Cursor */
const $cur=document.getElementById('cur'),$ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
if(matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    $cur.style.left=mx+'px';$cur.style.top=my+'px';
  },{passive:true});
  document.addEventListener('mousedown',()=>document.body.classList.add('pressing'));
  document.addEventListener('mouseup',()=>document.body.classList.remove('pressing'));
  (function raf(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    $ring.style.left=Math.round(rx)+'px';$ring.style.top=Math.round(ry)+'px';
    requestAnimationFrame(raf);
  })();
}

function addHover(){
  document.querySelectorAll('a,button,.wc,.wi,.svc,.pc,.ct-card').forEach(el=>{
    if(el._h)return;el._h=true;
    el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'),{passive:true});
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'),{passive:true});
  });
}

/* Scroll */
let tk=false;
window.addEventListener('scroll',()=>{
  if(tk)return;tk=true;
  requestAnimationFrame(()=>{
    const y=window.scrollY,tot=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    document.getElementById('nav').classList.toggle('scrolled',y>60);
    document.getElementById('prog').style.width=(y/tot*100)+'%';
    document.getElementById('stt').classList.toggle('on',y>400);
    tk=false;
  });
},{passive:true});
document.getElementById('stt').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* Nav */
const hamBtn=document.getElementById('ham'),mNav=document.getElementById('m-nav');
function closeNav(){mNav.classList.remove('open');hamBtn.classList.remove('open');hamBtn.setAttribute('aria-expanded','false')}
hamBtn.addEventListener('click',()=>{const o=mNav.classList.toggle('open');hamBtn.classList.toggle('open',o);hamBtn.setAttribute('aria-expanded',String(o))});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});

/* Link delegation */
document.addEventListener('click',e=>{const el=e.target.closest('[data-page]');if(!el)return;e.preventDefault();go(el.dataset.page)});
document.getElementById('work-back-btn').addEventListener('click',()=>go('works'));

/* Form */
function handleForm(e){
  e.preventDefault();
  const n=document.getElementById('fn').value.trim(),em=document.getElementById('fe').value.trim(),t=document.getElementById('ft').value,m=document.getElementById('fm').value.trim();
  window.location.href=`mailto:ngothong777@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${t||'Inquiry'} — ${n}`)}&body=${encodeURIComponent(`Name: ${n}\nEmail: ${em}\nType: ${t||'—'}\n\n${m}`)}`;
}

/* Hash router */
function routeHash(){const h=location.hash.slice(1);if(!h){go('home');return}if(h.includes('work-detail/')){go('work-detail',h.split('/')[1]);return}go(['home','works','about','contact'].includes(h)?h:'home')}
window.addEventListener('popstate',routeHash);

renderGrid();renderHomeList();renderSkills();routeHash();initReveal();addHover();
</script>
</body>
</html>
