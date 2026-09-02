const nav=document.querySelector('.nav'),progress=document.querySelector('.progress'),menuButton=document.querySelector('.menu-button'),menu=document.querySelector('.menu');
const sync=()=>{const y=scrollY;nav.classList.toggle('scrolled',y>40);const max=document.documentElement.scrollHeight-innerHeight;progress.style.setProperty('--progress',`${max?y/max*100:0}%`)};addEventListener('scroll',sync,{passive:true});sync();
menuButton?.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce){document.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x))}
document.querySelectorAll('[data-slider]').forEach(track=>{const parent=track.parentElement,move=d=>track.scrollBy({left:d*track.clientWidth*.72,behavior:'smooth'});parent.querySelector('[data-prev]')?.addEventListener('click',()=>move(-1));parent.querySelector('[data-next]')?.addEventListener('click',()=>move(1))});
const owModal=document.querySelector('.ow-modal'),owOpen=document.querySelector('[data-open-water-open]'),owCloses=document.querySelectorAll('[data-open-water-close]');
const toggleOw=open=>{owModal?.classList.toggle('open',open);owModal?.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('modal-open',open);if(open)owCloses[0]?.focus();else owOpen?.focus()};
owOpen?.addEventListener('click',()=>toggleOw(true));owCloses.forEach(button=>button.addEventListener('click',()=>toggleOw(false)));owModal?.addEventListener('click',event=>{if(event.target===owModal)toggleOw(false)});addEventListener('keydown',event=>{if(event.key==='Escape'&&owModal?.classList.contains('open'))toggleOw(false)});
const windyFrame=document.querySelector('[data-windy-frame]'),windyButtons=document.querySelectorAll('[data-windy-layer]'),windyProducts={currents:'seaCurrents',waves:'ecmwfWaves',wind:'ecmwf'};
windyButtons.forEach(button=>button.addEventListener('click',()=>{const layer=button.dataset.windyLayer,product=windyProducts[layer];windyButtons.forEach(item=>item.classList.toggle('active',item===button));if(windyFrame)windyFrame.src=`https://embed.windy.com/embed2.html?lat=26.44&lon=127.75&detailLat=26.44&detailLon=127.75&zoom=9&level=surface&overlay=${layer}&product=${product}&menu=true&message=true&marker=true&calendar=now&pressure=false&type=map&location=coordinates&detail=true&metricWind=kt&metricTemp=%C2%B0C&radarRange=-1`}));
const groupCopyright=[...document.querySelectorAll('footer span')].find(element=>element.textContent.trim()==='© SAKURAYUKI GROUP');
if(groupCopyright){
  const groupLink=document.createElement('a');
  groupLink.href='./';
  groupLink.setAttribute('aria-label','返回櫻雪集團首頁');
  groupLink.textContent=groupCopyright.textContent;
  groupCopyright.replaceWith(groupLink);
}
