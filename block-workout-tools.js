(function(){
  'use strict';

  var PROGRAM={
    QUARTA:{code:'A',title:'🍑 Treino A — Glúteos + costas + tríceps',time:'32–35',blocks:[
      [['Hip thrust','3x8–10','grande',90],['Puxada alta','3x8–12','superior',60]],
      [['Stiff com halteres','3x8–10','grande',90],['Tríceps corda','3x10–12','superior',60]],
      [['Afundo búlgaro','2x8–10 cada perna','grande',75],['Remada baixa','2x10–12','superior',60]],
      [['Abdutora','2x15–20','pequeno',60],['Elevação lateral','2x12–15','superior',60]]
    ]},
    QUINTA:{code:'B',title:'💪 Treino B — Quadríceps + peito + tríceps',time:'32–35',blocks:[
      [['Agachamento no Smith','3x8–10','grande',90],['Supino máquina','3x8–12','superior',60]],
      [['Leg press','3x10–12','grande',90],['Tríceps na polia','3x10–12','superior',60]],
      [['Cadeira extensora','2x12–15','pequeno',60],['Desenvolvimento de ombros','2x8–12','superior',60]],
      [['Passada','2x10 cada perna','grande',75],['Tríceps francês','2x10–12','superior',60]]
    ]},
    SEXTA:{code:'C',title:'🍑 Treino C — Glúteos + costas + ombros',time:'32–35',blocks:[
      [['Hip thrust','3x10–12','grande',90],['Remada articulada','3x8–12','superior',60]],
      [['Stiff','3x8–10','grande',90],['Tríceps testa','3x10–12','superior',60]],
      [['Extensão de quadril no cabo','2x12–15 cada perna','pequeno',60],['Puxada neutra','2x10–12','superior',60]],
      [['Abdutora','2x15–20','pequeno',60],['Elevação lateral','2x12–15','superior',60]]
    ]},
    SÁBADO:{code:'D',title:'🔥 Treino D — Glúteos + pernas + tríceps',time:'32–35',blocks:[
      [['Leg press','3x10–12','grande',90],['Tríceps corda','3x10–12','superior',60]],
      [['Agachamento sumô','3x8–12','grande',90],['Remada baixa','3x10–12','superior',60]],
      [['Coice no cabo','2x12–15 cada perna','pequeno',60],['Tríceps unilateral','2x10–12 cada lado','superior',60]],
      [['Abdutora','2x15–20','pequeno',60],['Face pull','2x12–15','superior',60]]
    ]}
  };

  function flatten(blocks){var out=[];blocks.forEach(function(b){out.push(b[0],b[1])});return out}
  Object.keys(W).forEach(function(k){delete W[k]});
  Object.keys(PROGRAM).forEach(function(dayName){
    var p=PROGRAM[dayName];
    W[dayName]={title:p.title,time:35,code:p.code,blocks:p.blocks,items:flatten(p.blocks)};
  });

  function maxReps(spec){
    var m=String(spec||'').match(/[x×](\d+)(?:–|-)(\d+)/);if(m)return Number(m[2]);
    m=String(spec||'').match(/[x×](\d+)/);return m?Number(m[1]):'';
  }
  function rpeFor(j){return j===0?8:(j===1?9:10)}
  function previous(dayName){
    var today=new Date().toISOString().slice(0,10),keys=Object.keys(D.sessions||{}).filter(function(k){
      var p=k.split('_'),dt=p[0],dy=p.slice(1).join('_');return dy===dayName&&dt<today&&D.sessions[k]&&D.sessions[k].finished;
    });
    keys.sort(function(a,b){return b.slice(0,10).localeCompare(a.slice(0,10))});
    return keys.length?D.sessions[keys[0]]:null;
  }
  function prevLine(prev,i){
    var p=prev&&prev.ex&&prev.ex[i];if(!p||!p.sets)return '';
    var s=p.sets.map(function(x){if(!x||(!x.reps&&!x.load))return '—';return (x.reps||'—')+' reps'+(x.load?' • '+x.load+' kg':'')}).join(' / ');
    return s?'<div class="muted" style="margin-top:6px">Sessão anterior: <b>'+s+'</b></div>':'';
  }
  function exerciseHtml(e,i,label,prev){
    var s=ex(i),def=maxReps(e[1]);
    return '<div class="exercise"><div class="exrow"><div><div class="name">'+label+' · '+e[0]+'</div><div class="meta">'+e[1]+' • '+e[2]+'</div></div><span class="badge">'+s.sets.filter(function(x){return x.done}).length+'/'+s.sets.length+'</span></div>'+prevLine(prev,i)+
      s.sets.map(function(x,j){return '<div class="setbox"><div class="row"><b style="font-size:11px">Série '+(j+1)+'/'+s.sets.length+'</b><span class="muted">'+(j===0?'2 RIR':j===1?'1 RIR':'quase falha')+'</span></div><div class="inputs"><label>Reps<input type="number" value="'+(x.reps||'')+'" placeholder="'+(def||'—')+'" onchange="val('+i+','+j+',\'reps\',this.value)"></label><label>RPE<input type="number" value="'+(x.rpe||'')+'" placeholder="'+rpeFor(j)+'" onchange="val('+i+','+j+',\'rpe\',this.value)"></label><label>Carga<input value="'+(x.load||'')+'" placeholder="kg" onchange="val('+i+','+j+',\'load\',this.value)"></label></div><button class="btn '+(x.done?'done':'')+'" style="width:100%;margin-top:7px" onclick="toggle('+i+','+j+')">'+(x.done?'✓ Série concluída':'Marcar série concluída')+'</button></div>'}).join('')+
      '</div>';
  }

  render=function(){
    if(!W[day]){
      main.innerHTML='<div class="card"><div class="title">Descanso / mobilidade</div><div class="muted">Sem musculação programada. Domingo pode ser usado para descanso, mobilidade ou caminhada leve.</div></div>';return;
    }
    var w=W[day],prev=previous(day),total=w.items.reduce(function(a,e){return a+count(e[1])},0),done=w.items.reduce(function(a,e,i){return a+ex(i).sets.filter(function(s){return s.done}).length},0),pct=Math.round(done/total*100);
    var h='<div id="updateSlot"></div><div class="tabs">'+Object.keys(W).map(function(k){return '<button class="'+(k===day?'sel':'')+'" onclick="day=\''+k+'\';render()">Treino '+W[k].code+'</button>'}).join('')+'</div>';
    h+='<div class="row"><div><div class="title">'+w.title+'</div><div class="muted">'+w.time+' min • '+done+'/'+total+' séries</div></div><span class="badge">'+pct+'%</span></div><div class="bar"><div class="fill" style="width:'+pct+'%"></div></div>';
    h+='<div class="card"><div class="section"><div class="section-title">🔥 Estrutura</div><div class="muted" style="margin-top:5px">4 min aquecimento/mobilidade • 25–28 min nos 4 blocos • 2–3 min finalização. Não precisa cardio antes.</div></div><div class="section"><div class="section-title">🔁 Como executar</div><div class="muted" style="margin-top:5px">A1 → A2 → descanso → A1 → A2. Termine todas as séries do bloco antes de passar ao próximo.</div></div><div class="section"><div class="section-title">⏱ Descanso</div><div class="muted" style="margin-top:5px">45–60 s após o exercício superior. Nos blocos mais pesados, use 75–90 s.</div></div><div class="section"><div class="section-title">📈 Progressão</div><div class="muted" style="margin-top:5px">Bateu o topo da faixa em todas as séries com boa técnica? Aumente um pouco a carga na próxima sessão e volte ao início da faixa.</div></div></div>';
    w.blocks.forEach(function(block,b){var i=b*2;h+='<div class="card"><div class="section-title">Bloco '+(b+1)+'</div>'+exerciseHtml(block[0],i,'A1',prev)+exerciseHtml(block[1],i+1,'A2',prev)+'<button class="btn" style="width:100%;margin-top:8px" onclick="start('+(b<2?75:60)+')">⏱ Descanso do bloco · '+(b<2?'75':'60')+' s</button></div>'});
    h+='<button class="primary" onclick="finish()">✓ Finalizar treino</button>';
    main.innerHTML=h;if(typeof renderUpdate==='function')renderUpdate();
  };

  if(typeof week==='function')week();
  render();
})();