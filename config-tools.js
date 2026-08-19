(function(){
  'use strict';
  var KEY='ttf100';
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{"sessions":{}}')}catch(e){return {sessions:{}}}}
  function write(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function esc(v){return String(v??'').replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
  function download(name,text,type){var blob=new Blob([text],{type:type||'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
  function csv(){var d=read(),rows=[['Data','Treino','Exercicio','Serie','Reps','RPE','Carga kg','Concluida']];Object.keys(d.sessions||{}).forEach(function(k){var s=d.sessions[k],parts=k.split('_'),date=parts[0],day=parts.slice(1).join('_');Object.keys(s.ex||{}).forEach(function(i){(s.ex[i].sets||[]).forEach(function(x,j){rows.push([date,day,i,j+1,x.reps||'',x.rpe||'',x.load||'',x.done?'SIM':'NAO'])})})});var out=rows.map(function(r){return r.map(function(x){var v=String(x).replace(/\"/g,'\"\"');return '"'+v+'"'}).join(';')}).join('\n');download('treino-feminino-exportacao.csv','\ufeff'+out,'text/csv;charset=utf-8')}
  function backup(){var d=read();d._backup={app:'Treino Tracker Feminino',createdAt:new Date().toISOString(),version:localStorage.getItem('ttf_version')||'1.01'};download('treino-feminino-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(d,null,2),'application/json')}
  function restore(){var input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=function(){var file=input.files&&input.files[0];if(!file)return;var r=new FileReader();r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d!=='object'||!d.sessions)throw new Error('Formato inválido');if(!confirm('Restaurar este backup? Os dados atuais deste aparelho serão substituídos.'))return;write(d);alert('Backup restaurado com sucesso.');location.reload()}catch(e){alert('Não foi possível restaurar o backup: '+e.message)}};r.readAsText(file)};input.click()}
  function saveMeasure(){var d=read();d.measurements=d.measurements||[];d.measurements.push({date:new Date().toISOString(),weight:document.getElementById('ftWeight').value,fat:document.getElementById('ftFat').value,note:document.getElementById('ftNote').value});write(d);alert('Avaliação registrada.');config();}
  function config(){
    var installed=window.INSTALLED_VERSION||localStorage.getItem('ttf_version')||'1.01';
    var available=window.AVAILABLE_VERSION||installed;
    var status=installed===available?'<div class="update-status update-ok">✓ Aplicativo atualizado</div>':'<div class="update-status update-warn">⚠️ Atualização disponível</div>';
    var d=read(),ms=d.measurements||[];
    var last=ms.length?ms[ms.length-1]:null;
    document.getElementById('main').innerHTML='<div class="title">Configurações</div>'+
      '<div class="card"><b>Treino Tracker Feminino</b><div class="muted" style="margin-top:7px">Versão instalada: <b>V'+esc(installed)+'</b></div><div style="margin-top:10px">'+status+'</div></div>'+ 
      '<div id="configUpdate"></div>'+ 
      '<div class="card"><b>Metas</b><div class="muted" style="line-height:1.7;margin-top:7px">Treinos: quarta a domingo<br>Tempo: 35 min<br>Descanso: 60–75 s; pesados até 90 s</div></div>'+ 
      '<div class="card"><div class="title" style="font-size:15px">📋 Avaliação corporal</div><div class="muted" style="margin-top:5px">Registre peso, percentual de gordura e uma observação.</div>'+ 
      '<button class="primary" style="margin-top:10px" onclick="window.openMeasure()">Registrar avaliação</button>'+ 
      (last?'<div class="muted" style="margin-top:8px">Última: '+new Date(last.date).toLocaleDateString('pt-BR')+' • '+esc(last.weight||'—')+' kg • '+esc(last.fat||'—')+'% gordura</div>':'')+'</div>'+ 
      '<div class="card"><div class="title" style="font-size:15px">💾 Dados e backup</div><div class="muted" style="margin-top:5px">Seus registros ficam neste aparelho. Faça um backup antes de trocar de aparelho ou realizar mudanças importantes.</div>'+ 
      '<button class="btn" style="width:100%;margin-top:10px" onclick="window.backupFemale()">💾 Fazer backup completo</button>'+ 
      '<button class="btn" style="width:100%;margin-top:8px" onclick="window.restoreFemale()">♻️ Restaurar backup</button>'+ 
      '<button class="btn" style="width:100%;margin-top:8px" onclick="window.exportFemale()">📤 Exportar dados (CSV)</button></div>'+ 
      '<div class="card"><b>Armazenamento</b><div class="muted" style="margin-top:7px">Os dados são salvos localmente neste aparelho. Atualizações do aplicativo não apagam seu histórico.</div></div>';
    if(typeof window.renderUpdate==='function')window.renderUpdate(true);
  }
  window.openMeasure=function(){var modal=document.createElement('div');modal.className='modal show';modal.innerHTML='<div class="sheet"><div class="title">📋 Registrar avaliação</div><label>Peso (kg)</label><input id="ftWeight" type="number" step="0.1" placeholder="Ex.: 60,5"><label>% gordura</label><input id="ftFat" type="number" step="0.1" placeholder="Ex.: 22"><label>Observação</label><input id="ftNote" placeholder="Como você está se sentindo?"><button class="primary" onclick="window.saveMeasureFemale()">Salvar avaliação</button><button class="btn" style="width:100%;margin-top:8px" onclick="this.closest(\'.modal\').remove()">Cancelar</button></div>';document.body.appendChild(modal)};
  window.saveMeasureFemale=saveMeasure;window.backupFemale=backup;window.restoreFemale=restore;window.exportFemale=csv;window.config=config;
})();