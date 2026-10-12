/* G-INNOVA — interactions légères sans traçage, sans dépendance externe. */
'use strict';
const prefersReducedMotion=false;
const WA_PHONE='237672356441';
const EMAIL='gweteugene05@gmail.com';
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
function start(){
 const header=$('.header');const nav=$('.nav');const menu=$('.nav-toggle');
 const onScroll=()=>{if(header)header.classList.toggle('is-sticky',scrollY>26);const top=$('.back-top');if(top)top.classList.toggle('show',scrollY>600)};
 onScroll();addEventListener('scroll',onScroll,{passive:true});
 if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');nav.classList.toggle('open',open)});
 $$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
 addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
 document.addEventListener('click',e=>{if(!e.target.closest('.header')&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
 }
 const seen=$$('[data-reveal]');if('IntersectionObserver' in window && !prefersReducedMotion){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{rootMargin:'0px 0px -45px 0px',threshold:.08});seen.forEach(el=>io.observe(el));
 }else seen.forEach(el=>el.classList.add('visible'));
 $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;$$('.filter-btn').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});let visible=0;$$('.portfolio-card').forEach(card=>{const show=filter==='all'||card.dataset.category===filter;card.hidden=!show;if(show)visible++});const status=$('#filter-status');if(status)status.textContent=visible+' réalisation'+(visible>1?'s':'')+' affichée'+(visible>1?'s':'');}));
 const dlg=$('#lightbox');if(dlg){$$('[data-lightbox]').forEach(el=>el.addEventListener('click',()=>{const img=$('img',el);if(!img)return;$('#lightbox-img').src=img.currentSrc||img.src;$('#lightbox-img').alt=img.alt;$('#lightbox-caption').textContent=img.alt;dlg.showModal()}));$('#lightbox-close')?.addEventListener('click',()=>dlg.close());dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});dlg.addEventListener('close',()=>{const i=$('#lightbox-img');if(i)i.removeAttribute('src')})}
 const form=$('#project-form');if(form)setupForm(form);
 const share=$('#share-card');if(share)share.addEventListener('click',async()=>{const data={title:'Carte professionnelle — Eugène Samuel GWET | G-INNOVA',text:'Ingénierie, développement, design et intelligence artificielle.',url:location.href};try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);notifyCopy('Lien copié dans le presse-papiers.')}else throw Error('clipboard non disponible')}catch(e){if(e.name!=='AbortError')notifyCopy('Copiez l’adresse de cette page pour la partager.')}});
 const copy=$('#copy-card');if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);notifyCopy('Lien copié.')}catch(e){notifyCopy('Copie automatique indisponible. Utilisez la barre d’adresse.')}});
 const qr=$('#qr-code');if(qr){const expected=qr.dataset.target;if(expected&&location.protocol.startsWith('http')&&location.origin!==new URL(expected).origin){qr.title='QR préparé pour '+expected+' ; le domaine officiel doit être validé à la publication.'}}
 // Do not animate expensive elements while navigating or for users who prefer reduced motion.
 if(!prefersReducedMotion&&matchMedia('(pointer:fine)').matches){const art=$('.planet-holder');if(art){const hero=$('.hero-art');hero?.addEventListener('pointermove',e=>{const rect=hero.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;art.style.transform=`translate3d(${(x*13).toFixed(1)}px,${(y*10).toFixed(1)}px,0)`});hero?.addEventListener('pointerleave',()=>{art.style.transform=''})}}
}
function notifyCopy(msg){const el=$('#copy-status');if(el){el.textContent=msg;el.setAttribute('role','status')}}
function setupForm(form){
 const service=$('#service'),message=$('#message-preview'),status=$('#form-status'),emailBtn=$('#email-project');
 const mapping={web:'Site web / plateforme',logiciel:'Logiciel ou application',ia:'IA / agent intelligent',automatisation:'Automatisation',video:'Vidéo générée avec IA',graphisme:'Design graphique / identité',formation:'Formation / accompagnement',autre:'Autre besoin'};
 const q=new URLSearchParams(location.search).get('service');if(q&&mapping[q])service.value=q;
 const hints={web:'Présentez le type de site, les pages et les principales fonctionnalités attendues.',logiciel:'Expliquez le problème à résoudre, les utilisateurs et les fonctionnalités essentielles.',ia:'Décrivez la tâche à automatiser, les données concernées et le résultat attendu.',automatisation:'Indiquez le processus actuel, les outils utilisés et l’amélioration souhaitée.',video:'Précisez la durée, le format, la langue et le style visuel.',graphisme:'Indiquez le support, votre marque, le format et les textes disponibles.',formation:'Précisez le sujet, le niveau des participants et le format souhaité.',autre:'Décrivez librement votre besoin.'};
 service.addEventListener('change',()=>{const hint=$('#service-hint');if(hint)hint.textContent=hints[service.value]||'Décrivez votre demande avec précision.'});service.dispatchEvent(new Event('change'));
 function value(id){return (document.getElementById(id)?.value||'').trim()}
 function makeMessage(){return [
 'Bonjour G-INNOVA, je souhaite échanger au sujet d’un projet.', '',
 '📌 SERVICE : '+(mapping[value('service')]||'À préciser'),
 '🎯 OBJECTIF : '+value('objective'),
 '📝 DÉTAILS : '+value('details'),
 '📅 ÉCHÉANCE : '+(value('deadline')||'À discuter'),
 '💰 BUDGET INDICATIF : '+(value('budget')||'À définir'),'',
 '👤 NOM : '+value('name'),
 '🏢 STRUCTURE : '+(value('company')||'Particulier'),
 '📞 CONTACT : '+value('phone'),
 '✉️ EMAIL : '+(value('email')||'Non communiqué'),'',
 'Merci de me recontacter pour étudier ce projet.'
 ].join('\n')}
 const update=()=>{if(message)message.textContent=makeMessage()};form.addEventListener('input',update);form.addEventListener('change',update);update();
 const validate=()=>{if(!form.reportValidity()){status.textContent='Vérifiez les champs obligatoires avant de continuer.';return false}if(value('details').length<15){$('#details').setCustomValidity('Précisez votre besoin en au moins 15 caractères.');$('#details').reportValidity();$('#details').setCustomValidity('');status.textContent='Ajoutez quelques précisions sur votre projet.';return false}return true};
 form.addEventListener('submit',e=>{e.preventDefault();if(!validate())return;const url='https://wa.me/'+WA_PHONE+'?text='+encodeURIComponent(makeMessage());status.textContent='WhatsApp va s’ouvrir avec le message préparé. Vérifiez-le puis appuyez sur Envoyer dans WhatsApp.';const launch=document.createElement('a');launch.href=url;launch.target='_blank';launch.rel='noopener noreferrer';launch.click();const retry=document.createElement('a');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent=' Cliquez ici si WhatsApp ne s’ouvre pas.';status.appendChild(retry)});
 if(emailBtn)emailBtn.addEventListener('click',()=>{if(!validate())return;const subject='Demande de projet G-INNOVA — '+(mapping[value('service')]||'Contact');location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(makeMessage());status.textContent='Votre application e-mail va s’ouvrir. Confirmez ensuite l’envoi du message.'});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
