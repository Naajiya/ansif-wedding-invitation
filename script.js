(function(){
var cover=document.getElementById('cover'),a=document.getElementById('sc'),moon=document.getElementById('moon'),on=false;
// letters for the name animation
document.querySelectorAll('.split').forEach(function(el){
  var t=el.textContent;el.setAttribute('aria-label',t);el.textContent='';
  Array.from(t).forEach(function(ch,i){var s=document.createElement('span');s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.innerHTML=ch===' '?'&nbsp;':ch;el.appendChild(s)});
});
document.getElementById('open').onclick=function(){
  cover.classList.add('open');
  setTimeout(reveal,900);
  setTimeout(function(){cover.style.display='none'},2400);
  setTimeout(function(){a.classList.add('show')},3000);
};
function reveal(){if(on)return;on=true;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.3});
  document.querySelectorAll('.rv,.split').forEach(function(el){io.observe(el)});
}
var T=Date.UTC(2026,10,14,5,30); // 14 Nov 2026, 11:00 IST
function tick(){var s=Math.max(0,Math.floor((T-Date.now())/1000));
  var v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
  ['dd','hh','mm','ss'].forEach(function(id,i){document.getElementById(id).textContent=v[i]})}
tick();setInterval(tick,1000);
a.onclick=function(){scrollBy({top:innerHeight*.9,behavior:'smooth'})};
addEventListener('scroll',function(){
  a.classList.toggle('end',scrollY+innerHeight>=document.documentElement.scrollHeight-90);
  moon.style.transform='translateY('+(scrollY*.18)+'px)';
},{passive:true});
// stars + shooting stars
var cv=document.getElementById('c'),x=cv.getContext('2d'),W,H,d=devicePixelRatio||1,st=[],sh=null;
function rs(){W=cv.width=innerWidth*d;H=cv.height=innerHeight*d}rs();addEventListener('resize',rs);
for(var i=0;i<70;i++)st.push({x:Math.random(),y:Math.random(),r:.5+Math.random()*1.5,p:Math.random()*6,s:.012+Math.random()*.03});
setInterval(function(){if(!sh)sh={x:Math.random()*.7*W,y:Math.random()*.4*H,l:0}},4500);
function draw(){x.clearRect(0,0,W,H);
  st.forEach(function(s){s.p+=s.s;x.globalAlpha=.2+.8*Math.abs(Math.sin(s.p));x.fillStyle='#f7f1e3';x.beginPath();x.arc(s.x*W,s.y*H,s.r*d,0,6.283);x.fill()});
  if(sh){sh.l+=14*d;var g=x.createLinearGradient(sh.x+sh.l*.8,sh.y+sh.l*.5,sh.x+sh.l*.8-90*d,sh.y+sh.l*.5-56*d);
    g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');
    x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=1.6*d;x.beginPath();x.moveTo(sh.x+sh.l*.8,sh.y+sh.l*.5);x.lineTo(sh.x+sh.l*.8-90*d,sh.y+sh.l*.5-56*d);x.stroke();
    if(sh.l>W*.6)sh=null}
  requestAnimationFrame(draw)}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)draw();
})();