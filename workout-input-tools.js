(function(){
  'use strict';

  function plannedReps(spec){
    var m=String(spec||'').match(/[x×](\d+)(?:–|-)(\d+)/);
    if(m)return Number(m[2]);
    m=String(spec||'').match(/[x×](\d+)/);
    return m?Number(m[1]):'';
  }

  function plannedRpe(setIndex){
    if(setIndex===0)return 8;   // 2 RIR
    if(setIndex===1)return 9;   // 1 RIR
    return 10;                  // quase falha técnica
  }

  function previousSession(dayName){
    try{
      var today=new Date().toISOString().slice(0,10);
      var keys=Object.keys(D.sessions||{}).filter(function(k){
        var parts=k.split('_');
        var date=parts[0],d=parts.slice(1).join('_');
        return d===dayName && date<today && D.sessions[k] && D.sessions[k].finished;
      });
      keys.sort(function(a,b){return b.slice(0,10).localeCompare(a.slice(0,10))});
      return keys.length?D.sessions[keys[0]]:null;
    }catch(e){return null}
  }

  function sessionSummary(prev,exerciseIndex){
    try{
      var p=prev&&prev.ex&&prev.ex[exerciseIndex];
      if(!p||!p.sets||!p.sets.length)return '';
      return p.sets.map(function(x){
        if(!x||(!x.reps&&!x.load))return '—';
        var s=(x.reps?x.reps+' reps':'—');
        if(x.load)s+=' • '+x.load+' kg';
        return s;
      }).join(' / ');
    }catch(e){return ''}
  }

  function enhanceWorkout(){
    try{
      if(typeof W==='undefined'||typeof day==='undefined'||!W[day])return;
      var prev=previousSession(day);
      var exercises=document.querySelectorAll('.exercise');
      exercises.forEach(function(exEl,i){
        var item=W[day].items[i];
        if(!item)return;
        var repsDefault=plannedReps(item[1]);

        // Histórico fica como referência acima dos campos, igual ao masculino.
        if(prev&&!exEl.querySelector('.previous-session-line')){
          var summary=sessionSummary(prev,i);
          if(summary){
            var line=document.createElement('div');
            line.className='muted previous-session-line';
            line.style.marginTop='6px';
            line.innerHTML='Sessão anterior: <b>'+summary+'</b>';
            var header=exEl.querySelector('.exrow');
            if(header)header.insertAdjacentElement('afterend',line);
          }
        }

        // Sugestões ficam esmaecidas como placeholder; não são gravadas ainda.
        exEl.querySelectorAll('.setbox').forEach(function(box,j){
          var inputs=box.querySelectorAll('.inputs input');
          if(inputs.length<2)return;
          var repsInput=inputs[0],rpeInput=inputs[1];
          if(!repsInput.value&&repsDefault!=='')repsInput.placeholder=String(repsDefault);
          if(!rpeInput.value)rpeInput.placeholder=String(plannedRpe(j));
        });
      });
    }catch(e){}
  }

  // Ao concluir a série, usa a sugestão somente se o usuário não informou outro valor.
  if(typeof toggle==='function'&&!window.__femaleToggleSuggestionWrapped){
    var originalToggle=toggle;
    toggle=function(i,j){
      try{
        var current=ex(i).sets[j];
        if(current&&!current.done&&typeof W!=='undefined'&&W[day]){
          var item=W[day].items[i];
          var repsDefault=plannedReps(item&&item[1]);
          if(!current.reps&&repsDefault!=='')current.reps=String(repsDefault);
          if(!current.rpe)current.rpe=String(plannedRpe(j));
          save();
        }
      }catch(e){}
      return originalToggle.apply(this,arguments);
    };
    window.__femaleToggleSuggestionWrapped=true;
  }

  if(typeof render==='function'&&!window.__femaleWorkoutInputsWrapped){
    var originalRender=render;
    render=function(){
      originalRender.apply(this,arguments);
      setTimeout(enhanceWorkout,0);
    };
    window.__femaleWorkoutInputsWrapped=true;
  }

  setTimeout(enhanceWorkout,0);
})();