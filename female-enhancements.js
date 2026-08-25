(function(){
'use strict';
var VARIANTS={
'Hip thrust':['Máquina hip thrust','Banco + barra','Smith','Máquina articulada'],
'Puxada alta':['Polia alta','Máquina articulada'],
'Stiff com halteres':['Halteres','Barra livre','Smith'],
'Tríceps corda':['Polia alta + corda','Polia alta + barra','Máquina de tríceps'],
'Afundo búlgaro':['Banco + halteres','Smith + banco','Peso corporal'],
'Remada baixa':['Polia baixa','Máquina remada sentada'],
'Abdutora':['Cadeira abdutora','Polia / miniband'],
'Elevação lateral':['Halteres','Máquina lateral','Polia unilateral'],
'Agachamento no Smith':['Smith','Hack squat','Agachamento livre'],
'Supino máquina':['Máquina chest press','Banco + halteres','Barra livre','Smith'],
'Leg press':['Leg press 45°','Leg press horizontal','Leg press vertical'],
'Tríceps na polia':['Polia alta + barra','Polia alta + corda'],
'Cadeira extensora':['Cadeira extensora','Máquina unilateral'],
'Desenvolvimento de ombros':['Máquina desenvolvimento','Banco + halteres','Smith sentado','Barra livre sentado'],
'Passada':['Halteres','Smith','Peso corporal'],
'Tríceps francês':['Halter unilateral','Corda na polia','Barra W'],
'Remada articulada':['Máquina articulada','T-bar com apoio','Polia'],
'Stiff':['Halteres','Barra livre','Smith'],
'Tríceps testa':['Barra W','Halteres','Polia'],
'Extensão de quadril no cabo':['Polia baixa','Máquina glúteo'],
'Puxada neutra':['Polia alta pegada neutra','Máquina articulada'],
'Agachamento sumô':['Halter / kettlebell','Barra livre','Smith'],
'Coice no cabo':['Polia baixa','Máquina glúteo'],
'Tríceps unilateral':['Polia alta unilateral','Halter unilateral'],
'Face pull':['Polia alta + corda','Elástico']
};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function variantsFor(name){return VARIANTS[name]||['Máquina','Polia','Halteres','Barra / Smith','Banco / peso livre'];}
function logoHtml(){return '<div class="lt-lockup"><svg viewBox="0 0 86 56" aria-hidden="true"><polygon points="43,2 64,27 22,27" fill="#C2185B"/><polygon points="21,29 41,54 2,54" fill="#0D1B2E"/><polygon points="65,29 84,54 45,54" fill="#B7BCC5"/></svg><div class="lt-words"><div><span class="lt-lances">LANCES</span> <span class="lt-tech">TECH</span></div><small>TECNOLOGIA • PROCESSOS • ESTRATÉGIA</small></div></div>'}
function css(){if(document.getElementById('femaleEnhCss'))return;var s=document.createElement('style');s.id='femaleEnhCss';s.textContent='.female-brand-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}.lt-lockup{display:flex;align-items:center;gap:9px;min-width:0}.lt-lockup svg{width:46px;height:31px;flex:0 0 auto;filter:drop-shadow(0 2px 3px #0005)}.lt-words{line-height:1}.lt-lances{font-weight:900;letter-spacing:.08em;font-size:17px}.lt-tech{font-weight:900;letter-spacing:.12em;color:#ff70ad;font-size:12px}.lt-words small{display:block;margin-top:5px;font-size:6px;letter-spacing:.08em;opacity:.78;white-space:nowrap}.female-app-id{text-align:right;font-size:9px;opacity:.82;line-height:1.35}.variant-box{margin-top:8px;padding:8px 9px;background:#f4f0f8;border-radius:10px}.variant-box label{display:block;font-size:9px;color:#77707d;margin-bottom:4px}.variant-box select{width:100%;padding:8px;border:1px solid #ddd6e4;border-radius:8px;background:#fff;font-size:12px}.previous-variant{margin-top:4px;font-size:10px;color:#77707d}.modal#modal{background:transparent;pointer-events:none;align-items:flex-end;padding-bottom:78px}.modal#modal.show{display:flex}.modal#modal .sheet{pointer-events:auto;width:min(460px,calc(100% - 24px));border-radius:16px;padding:10px 12px;box-shadow:0 8px 28px #0003;border:1px solid #ddd6e4;display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center}.modal#modal .sheet .title{font-size:12px}.modal#modal .clock{font-size:28px;line-height:1}.modal#modal .primary{width:auto;padding:8px 10px;font-size:11px}.timer-hint{font-size:9px;color:#77707d}.history-variant{margin-top:4px;font-size:10px;color:#77707d}';document.head.appendChild(s)}
function brand(){var h=document.querySelector('header');if(!h||h.dataset.branded)return;h.dataset.branded='1';var old=h.querySelector('.brand');if(!old)return;var row=document.createElement('div');row.className='female-brand-row';row.innerHTML=logoHtml()+'<div class="female-app-id"><b>Treino Tracker Feminino</b><br>TESTE</div>';h.insertBefore(row,old);old.style.display='none';}
var femaleSelectedDate=new Date();
function localKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
window.selectFemaleDate=function(y,m,d){femaleSelectedDate=new Date(y,m,d);day=['DOMINGO','SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO'][femaleSelectedDate.getDay()];week();render();};
function overrideWeek(){if(typeof week!=='function'||window.__femaleWeekFixed)return;week=function(){var today=new Date(),names=['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],h='';for(var n=-3;n<=3;n++){var x=new Date(today);x.setDate(today.getDate()+n);var active=localKey(x)===localKey(femaleSelectedDate);h+='<button class="day '+(active?'active':'')+'" onclick="selectFemaleDate('+x.getFullYear()+','+x.getMonth()+','+x.getDate()+')">'+names[x.getDay()]+'<br>'+String(x.getDate()).padStart(2,'0')+'</button>'}document.getElementById('week').innerHTML=h;};window.__femaleWeekFixed=true;week();}
function currentEx(i){try{return ex(i)}catch(e){return null}}
window.setFemaleVariant=function(i,v){var st=currentEx(i);if(!st)return;st.variant=v;save();};
function previousSession(dayName){try{var today=localKey(femaleSelectedDate),keys=Object.keys(D.sessions||{}).filter(function(k){var p=k.split('_'),dt=p[0],dy=p.slice(1).join('_');return dy===dayName&&dt<today&&D.sessions[k]&&D.sessions[k].finished});keys.sort(function(a,b){return b.slice(0,10).localeCompare(a.slice(0,10))});return keys.length?D.sessions[keys[0]]:null}catch(e){return null}}
function applyVariants(){try{if(typeof W==='undefined'||typeof day==='undefined'||!W[day])return;var prev=previousSession(day);document.querySelectorAll('.exercise').forEach(function(node,i){if(node.querySelector('.variant-box'))return;var item=W[day].items[i];if(!item)return;var st=currentEx(i),pv=prev&&prev.ex&&prev.ex[i]&&prev.ex[i].variant?prev.ex[i].variant:'',opts=variantsFor(item[0]);var box=document.createElement('div');box.className='variant-box';box.innerHTML='<label>Execução / equipamento</label><select onchange="setFemaleVariant('+i+',this.value)"><option value="">Selecione a execução / equipamento</option>'+opts.map(function(v){return '<option value="'+esc(v)+'" '+(st&&st.variant===v?'selected':'')+'>'+esc(v)+'</option>'}).join('')+'<option value="Outro" '+(st&&st.variant==='Outro'?'selected':'')+'>Outro</option></select>'+(pv?'<div class="previous-variant">Anterior: <b>'+esc(pv)+'</b></div>':'');var hdr=node.querySelector('.exrow');if(hdr)hdr.insertAdjacentElement('afterend',box);});}catch(e){}}
function wrapRender(){if(typeof render!=='function'||window.__femaleEnhRender)return;var orig=render;render=function(){orig.apply(this,arguments);setTimeout(function(){applyVariants();brand();},0)};window.__femaleEnhRender=true;}
function wrapHistory(){if(typeof window.femaleHistoryDetail!=='function'||window.__femaleEnhHistory)return;var orig=window.femaleHistoryDetail;window.femaleHistoryDetail=function(k){orig(k);try{var d=JSON.parse(localStorage.getItem('ttf100')||'{"sessions":{}}'),s=d.sessions&&d.sessions[k],nodes=document.querySelectorAll('#main .card .history');nodes.forEach(function(node,i){var v=s&&s.ex&&s.ex[i]&&s.ex[i].variant;if(v){var x=document.createElement('div');x.className='history-variant';x.innerHTML='Execução / equipamento: <b>'+esc(v)+'</b>';node.appendChild(x);}})}catch(e){}};window.__femaleEnhHistory=true;}
function timer(){var sheet=document.querySelector('#modal .sheet');if(sheet&&!sheet.querySelector('.timer-hint')){var t=sheet.querySelector('.title');if(t){var h=document.createElement('div');h.className='timer-hint';h.textContent='Continue navegando enquanto o descanso roda.';t.appendChild(h)}}}
css();brand();overrideWeek();wrapRender();wrapHistory();timer();applyVariants();
})();