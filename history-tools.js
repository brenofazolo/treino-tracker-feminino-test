(function(){
  'use strict';
  var KEY='ttf100';
  var NAMES={
    QUARTA:['Hip thrust','Stiff com halteres','Mesa flexora','Cadeira abdutora','Extensão de quadril no cabo'],
    QUINTA:['Puxada alta','Remada baixa','Desenvolvimento de ombros','Tríceps na polia com barra','Tríceps francês','Elevação lateral'],
    SEXTA:['Agachamento no Smith','Leg press','Afundo/Búlgaro','Cadeira extensora','Abdutora'],
    SÁBADO:['Hip thrust','Passada no Smith ou halteres','Coice no cabo','Tríceps corda','Tríceps testa','Prancha'],
    DOMINGO:['Supino máquina','Remada baixa','Puxada alta','Elevação lateral','Tríceps corda','Rosca direta']
  };
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{"sessions":{}}')}catch(e){return {sessions:{}}}}
  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
  function detail(k){
    var d=read(),s=d.sessions&&d.sessions[k];if(!s)return;
    var parts=k.split('_'),date=parts[0],day=parts.slice(1).join('_'),names=NAMES[day]||[];
    var html='<div class="title">'+esc(day)+'</div><div class="muted" style="margin-top:4px">'+new Date(date+'T12:00:00').toLocaleDateString('pt-BR')+'</div>';
    html+='<div class="card"><b>Treino realizado</b>';
    Object.keys(s.ex||{}).sort(function(a,b){return Number(a)-Number(b)}).forEach(function(i){
      var ex=s.ex[i],sets=ex.sets||[],name=names[i]||('Exercício '+(Number(i)+1));
      html+='<div class="history" style="padding:12px 0"><b>'+esc(name)+'</b>';
      sets.forEach(function(x,j){
        html+='<div class="muted" style="margin-top:6px">Série '+(j+1)+': '+(x.done?'✓ concluída':'não concluída')+' • '+esc(x.reps||'—')+' reps • RPE '+esc(x.rpe||'—')+' • '+esc(x.load||'—')+' kg</div>';
      });
      html+='</div>';
    });
    html+='</div><button class="primary" onclick="window.femaleHistoryList()">← Voltar ao histórico</button>';
    document.getElementById('main').innerHTML=html;
  }
  function list(){
    var d=read(),a=Object.entries(d.sessions||{}).filter(function(x){return x[1].finished}).sort(function(a,b){return (b[1].finishedAt||'').localeCompare(a[1].finishedAt||'')});
    document.getElementById('main').innerHTML='<div class="title">Histórico</div><div class="card">'+(a.length?a.map(function(x){var k=x[0],v=x[1],parts=k.split('_'),day=parts.slice(1).join('_'),date=parts[0];return '<button class="history" style="display:block;width:100%;text-align:left;background:none;border:0;cursor:pointer" onclick="window.femaleHistoryDetail(\''+k.replace(/'/g,"\\'")+'\')"><b>'+esc(day)+'</b><div class="muted">'+new Date(date+'T12:00:00').toLocaleDateString('pt-BR')+'</div><div class="muted" style="margin-top:5px">Toque para ver o treino realizado →</div></button>'}).join(''):'Nenhum treino finalizado.')+'</div>';
  }
  window.femaleHistoryDetail=detail;
  window.femaleHistoryList=list;
  function hook(){
    if(typeof window.show!=='function'||window.__femaleHistoryWrapped)return;
    var original=window.show;
    window.show=function(screen){if(screen==='historico'){list();return}return original.apply(this,arguments)};
    window.__femaleHistoryWrapped=true;
  }
  hook();setTimeout(hook,300);setTimeout(hook,1000);
})();