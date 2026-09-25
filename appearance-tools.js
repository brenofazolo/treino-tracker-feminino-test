(function(){
'use strict';
var KEY='ttf_appearance';
function mode(){return localStorage.getItem(KEY)==='comfort'?'comfort':'light'}
function apply(value){
 var next=value||mode();
 document.body.classList.toggle('comfort-mode',next==='comfort');
 var meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.setAttribute('content',next==='comfort'?'#0D1B2E':'#e2f4ef');
}
function card(){
 var anchor=document.getElementById('configUpdate');
 if(!anchor||document.getElementById('appearanceCard'))return;
 var box=document.createElement('div');
 box.id='appearanceCard';
 box.className='card appearance-card';
 var current=mode();
 box.innerHTML='<div class="title" style="font-size:15px">👓 Aparência</div><div class="muted" style="margin-top:5px">Escolha o visual mais confortável para leitura. A preferência fica salva neste aparelho.</div><div class="appearance-options" role="group" aria-label="Escolher aparência"><button class="appearance-option '+(current==='light'?'selected':'')+'" aria-pressed="'+(current==='light')+'" onclick="window.setFemaleAppearance(\'light\')"><span class="appearance-preview light-preview"></span><b>Claro</b><small>Visual atual</small></button><button class="appearance-option '+(current==='comfort'?'selected':'')+'" aria-pressed="'+(current==='comfort')+'" onclick="window.setFemaleAppearance(\'comfort\')"><span class="appearance-preview comfort-preview"></span><b>Conforto</b><small>Alto contraste</small></button></div>';
 anchor.insertAdjacentElement('afterend',box);
}
window.setFemaleAppearance=function(value){
 localStorage.setItem(KEY,value==='comfort'?'comfort':'light');
 apply(value);
 if(typeof window.config==='function')window.config();
};
var originalConfig=window.config;
if(typeof originalConfig==='function'){
 window.config=function(){originalConfig.apply(this,arguments);card();};
}
var css=document.createElement('style');
css.id='femaleAppearanceCss';
css.textContent='.appearance-options{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:12px}.appearance-option{border:2px solid var(--line,#dfe7e5);background:var(--card,#fff);color:var(--text,#17191d);border-radius:13px;padding:10px;text-align:left;display:grid;grid-template-columns:34px 1fr;column-gap:9px;align-items:center}.appearance-option.selected{border-color:#C2185B;box-shadow:0 0 0 2px rgba(194,24,91,.13)}.appearance-option b,.appearance-option small{grid-column:2}.appearance-option small{color:var(--muted,#737984);margin-top:2px}.appearance-preview{grid-row:1/3;width:34px;height:34px;border-radius:9px;border:1px solid #ccd5dc}.light-preview{background:linear-gradient(135deg,#e2f4ef 0 45%,#fff 45%)}.comfort-preview{background:linear-gradient(135deg,#0D1B2E 0 45%,#17283D 45%);border-color:#52657a}body.comfort-mode{--bg:#0D1B2E!important;--card:#17283D!important;--text:#F5F7FA!important;--muted:#C6CED8!important;--line:#395069!important;--dark:#C2185B!important;--soft:#223750!important;--green:#28A866!important;background:#0D1B2E!important;color:#F5F7FA!important}body.comfort-mode .app{background:#0D1B2E!important}body.comfort-mode header{background:linear-gradient(145deg,#17283D,#102136)!important;color:#F5F7FA!important;border-color:#395069!important;box-shadow:0 8px 22px rgba(0,0,0,.28)!important}body.comfort-mode .lt-lockup{background:#F5F7FA!important;border-radius:12px!important;padding:6px 9px!important;max-width:245px!important}body.comfort-mode .app-id,body.comfort-mode .female-app-id,body.comfort-mode .app-id b,body.comfort-mode .female-app-id b{color:#F5F7FA!important}body.comfort-mode main,body.comfort-mode .title,body.comfort-mode .name,body.comfort-mode .section-title,body.comfort-mode b{color:#F5F7FA}body.comfort-mode .muted,body.comfort-mode .meta,body.comfort-mode .timer-hint,body.comfort-mode .previous-variant{color:#C6CED8!important}body.comfort-mode .card,body.comfort-mode .setbox,body.comfort-mode .stat,body.comfort-mode .intensity,body.comfort-mode .variant-box{background:#17283D!important;border-color:#395069!important;color:#F5F7FA!important}body.comfort-mode .exercise,body.comfort-mode .section,body.comfort-mode .history,body.comfort-mode .profile-measure{border-color:#395069!important}body.comfort-mode .week .day{background:#223750!important;color:#F5F7FA!important;border-color:#52657A!important}body.comfort-mode .week .day.active{background:#C2185B!important;color:#fff!important;border-color:#E04B87!important}body.comfort-mode .tabs button{background:#17283D!important;color:#F5F7FA!important;border-color:#52657A!important}body.comfort-mode .tabs .sel,body.comfort-mode .tabs button.sel{background:#C2185B!important;color:#fff!important;border-color:#E04B87!important}body.comfort-mode .primary,body.comfort-mode .update-banner button{background:#C2185B!important;color:#fff!important}body.comfort-mode .btn,body.comfort-mode .appearance-option{background:#223750!important;color:#F5F7FA!important;border-color:#52657A!important}body.comfort-mode .appearance-option.selected{border-color:#E04B87!important;box-shadow:0 0 0 2px rgba(224,75,135,.3)}body.comfort-mode input,body.comfort-mode select{background:#0F2034!important;color:#F5F7FA!important;border-color:#60758B!important}body.comfort-mode input::placeholder{color:#AAB7C5!important}body.comfort-mode nav{background:#102136!important;border-color:#395069!important}body.comfort-mode nav button{color:#C6CED8!important}body.comfort-mode nav button.on,body.comfort-mode nav .on{color:#F5F7FA!important}body.comfort-mode .badge{background:#223750!important;color:#F5F7FA!important}body.comfort-mode .bar{background:#223750!important}body.comfort-mode .fill{background:#28A866!important}body.comfort-mode .update-banner{background:#17283D!important;border-color:#52657A!important;color:#F5F7FA!important}body.comfort-mode .modal .sheet{background:#17283D!important;color:#F5F7FA!important;border-color:#52657A!important}body.comfort-mode .lt-footer{border-color:#395069!important;color:#C6CED8!important}body.comfort-mode .lt-footer b{color:#F5F7FA!important}body.comfort-mode .note{background:#3B3020!important;color:#FFF1C2!important}@media(max-width:380px){.appearance-options{grid-template-columns:1fr}.appearance-option{min-height:58px}}';
document.head.appendChild(css);
apply();
if(document.getElementById('configUpdate'))card();
})();