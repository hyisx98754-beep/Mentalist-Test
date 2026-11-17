(() => {
  "use strict";

  const STORAGE_KEY = "mentalist-progress-v1";
  const modules = [
    {
      id:"observe", number:"01", title:"Observación", category:"Percepción", symbol:"◉", minutes:4, level:"Inicial",
      description:"Entrena tu atención para notar detalles, cambios y patrones que suelen pasar desapercibidos.",
      lead:"Observar no es simplemente mirar. Es dirigir la atención, separar los detalles importantes y comprobar qué recuerdas.",
      principle:"La percepción tiene límites: no registramos todo lo que vemos. La atención selecciona una parte de la escena y puede dejar fuera información evidente.",
      demo:"Mira una mesa con varios objetos durante unos segundos. Cuando desaparezca, intenta recordar los objetos y dónde estaban. Notarás que mirar y recordar son habilidades relacionadas, pero distintas.",
      exercise:"observe"
    },
    {
      id:"attention", number:"02", title:"Atención y enfoque", category:"Percepción", symbol:"◌", minutes:5, level:"Inicial",
      description:"Aprende a mantener el foco e ignorar distracciones con el efecto Stroop.",
      lead:"La atención ayuda a seleccionar qué información procesas. A veces, dos tareas compiten y provocan errores o lentitud.",
      principle:"En el efecto Stroop, leer una palabra puede interferir con nombrar el color de la tinta. El cerebro procesa el significado de las palabras de forma muy automática.",
      demo:"Si la palabra «ROJO» está escrita con tinta azul, intenta decir el color de la tinta, no leer la palabra. La respuesta puede sentirse extrañamente difícil.",
      exercise:"stroop"
    },
    {
      id:"memory", number:"03", title:"Memoria", category:"Percepción", symbol:"▤", minutes:5, level:"Inicial",
      description:"Practica la codificación y recuperación de información sin confundir recuerdo con certeza.",
      lead:"La memoria no funciona como una grabación de vídeo. Reconstruye información y puede perder, mezclar o completar detalles.",
      principle:"Recordar mejor suele depender de prestar atención, relacionar información y practicar recuperarla sin mirar la respuesta.",
      demo:"Lee una lista de palabras una sola vez. Después de que desaparezca, intenta escribir todas las que recuerdes. No importa si no salen todas: el objetivo es medir tu punto de partida.",
      exercise:"memory"
    },
    {
      id:"psychology", number:"04", title:"Psicología humana", category:"Psicología", symbol:"◇", minutes:6, level:"Inicial",
      description:"Interpreta comportamientos con contexto, preguntas y pensamiento crítico.",
      lead:"La psicología estudia patrones de comportamiento, pero una conducta aislada casi nunca revela con certeza lo que alguien piensa o siente.",
      principle:"Un mismo gesto puede tener muchas causas: cansancio, costumbre, nervios, cultura, incomodidad o simplemente casualidad. El contexto importa más que una señal suelta.",
      demo:"Alguien cruza los brazos. Podría tener frío, estar cómodo, sentirse a la defensiva o hacerlo por costumbre. Sin más información, no hay una conclusión segura.",
      exercise:"psychology"
    },
    {
      id:"muscle", number:"05", title:"Lectura muscular", category:"Psicología", symbol:"↕", minutes:7, level:"Intermedio",
      description:"Conoce el efecto ideomotor y practica una observación cuidadosa con consentimiento.",
      lead:"La lectura muscular de escenario intenta percibir movimientos o cambios de presión muy pequeños mientras una persona piensa o busca algo.",
      principle:"El efecto ideomotor describe movimientos diminutos que pueden ocurrir sin intención consciente. No son un código universal: el movimiento puede ser ambiguo y no demuestra por sí solo qué piensa alguien.",
      demo:"Con permiso de otra persona, ambos pueden apoyar suavemente las yemas de los dedos. Al pensar en mover un dedo, a veces aparecen movimientos pequeños. Eso permite estudiar el fenómeno, pero no garantiza descubrir una letra o una palabra.",
      exercise:"muscle"
    },
    {
      id:"association", number:"06", title:"Asociación y sugestión", category:"Psicología", symbol:"⌁", minutes:4, level:"Intermedio",
      description:"Comprueba cómo las palabras y el contexto influyen en las respuestas espontáneas.",
      lead:"Una idea puede activar otras ideas relacionadas. La preparación previa puede hacer unas respuestas más probables que otras, sin obligar a todo el mundo a elegir lo mismo.",
      principle:"La primación (priming) es una influencia del contexto sobre el procesamiento posterior. Es una tendencia estadística, no lectura de mente ni una predicción infalible.",
      demo:"Después de leer «nieve, frío, blanco, montaña», algunas personas piensan en «invierno». Otras pueden responder «esquí», «hielo» o algo completamente diferente.",
      exercise:"association"
    },
    {
      id:"investigation", number:"07", title:"Investigación y deducción", category:"Investigación", symbol:"⌕", minutes:7, level:"Intermedio",
      description:"Separa hechos de suposiciones y construye explicaciones que puedan comprobarse.",
      lead:"Investigar significa reunir pistas, comparar explicaciones y buscar qué evidencia apoyaría o debilitaría cada hipótesis.",
      principle:"Una explicación posible no es automáticamente la explicación verdadera. Una buena conclusión indica qué sabemos, qué suponemos y qué información falta.",
      demo:"Si una ventana está abierta y hay huellas húmedas cerca, eso apoya una hipótesis, pero aún no demuestra quién entró ni cuándo. Harían falta más pruebas.",
      exercise:"investigation"
    },
    {
      id:"focus", number:"08", title:"Concentración", category:"Percepción", symbol:"◎", minutes:3, level:"Inicial",
      description:"Refuerza la atención sostenida con una pequeña tarea de búsqueda visual.",
      lead:"La concentración es la capacidad de mantener la atención en una tarea durante un tiempo. También se entrena descansando y reduciendo distracciones.",
      principle:"Buscar un símbolo repetido parece sencillo, pero exige mantener una regla en mente y revisar cada elemento con cuidado.",
      demo:"Lee una secuencia de letras y cuenta solamente las A. No cuentes otras vocales ni vuelvas a empezar desde el principio.",
      exercise:"focus"
    }
  ];

  const paths = [
    {number:"I",title:"El observador",description:"Aprende a mirar con intención, recordar detalles y mantener la atención.",tags:["Observación","Atención y enfoque","Memoria"],ids:["observe","attention","memory"]},
    {number:"II",title:"El lector de contextos",description:"Explora cómo pensamos, cómo nos influyen las palabras y qué límites tiene el lenguaje corporal.",tags:["Psicología humana","Lectura muscular","Asociación y sugestión"],ids:["psychology","muscle","association"]},
    {number:"III",title:"El investigador",description:"Convierte pistas en hipótesis y aprende a distinguir una conclusión sólida de una simple sospecha.",tags:["Investigación y deducción","Concentración"],ids:["investigation","focus"]}
  ];

  let progress = loadProgress();
  let currentModule = null;
  let activeFilter = "Todas";
  let toastTimer = null;

  function loadProgress(){
    try{
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if(saved && Array.isArray(saved.completed) && Array.isArray(saved.dates)){
        return {xp:Number(saved.xp)||0, completed:saved.completed.filter(id=>modules.some(m=>m.id===id)), dates:[...new Set(saved.dates)].sort()};
      }
    }catch(error){}
    return {xp:0,completed:[],dates:[]};
  }
  function saveProgress(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));}catch(error){showToast("El navegador no permitió guardar el progreso.");}
  }
  function todayKey(){
    const d = new Date();
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  }
  function streakCount(){
    if(!progress.dates.length) return 0;
    const dates = new Set(progress.dates);
    const cursor = new Date();
    const today = todayKey();
    if(!dates.has(today)) cursor.setDate(cursor.getDate()-1);
    let count=0;
    while(dates.has(cursor.getFullYear()+"-"+String(cursor.getMonth()+1).padStart(2,"0")+"-"+String(cursor.getDate()).padStart(2,"0"))){
      count++;cursor.setDate(cursor.getDate()-1);
    }
    return count;
  }
  function levelInfo(){
    const levels=[{name:"Observador",min:0,next:120},{name:"Explorador",min:120,next:300},{name:"Analista",min:300,next:520},{name:"Investigador",min:520,next:800},{name:"Mentalista",min:800,next:1200}];
    let current=levels[0];
    for(const level of levels){if(progress.xp>=level.min) current=level;}
    return {name:current.name,number:levels.indexOf(current)+1,min:current.min,next:current.next,percent:Math.min(100,Math.round(((progress.xp-current.min)/(current.next-current.min))*100))};
  }
  function getModule(id){return modules.find(m=>m.id===id);}
  function renderCard(m){
    const done=progress.completed.includes(m.id);
    return '<article class="module-card '+(done?'completed':'')+'">'+
      '<div class="module-card-top"><span class="module-symbol">'+m.symbol+'</span><span class="module-index">'+m.number+' / 08</span></div>'+
      '<h3>'+m.title+'</h3><p>'+m.description+'</p>'+
      '<div class="module-card-bottom"><span>'+(done?'<span class="done-tag">✓ COMPLETADA</span>':m.minutes+' MIN · '+m.level.toUpperCase())+'</span>'+
      '<button type="button" data-open-module="'+m.id+'" aria-label="Abrir '+m.title+'">'+(done?'↗':'→')+'</button></div></article>';
  }
  function renderAllModules(){
    const query=(document.getElementById("moduleSearch")?.value || "").trim().toLocaleLowerCase("es");
    const visible=modules.filter(m=>(activeFilter==="Todas"||m.category===activeFilter)&&(!query||(m.title+" "+m.description+" "+m.category).toLocaleLowerCase("es").includes(query)));
    document.getElementById("allModules").innerHTML=visible.length?visible.map(renderCard).join():'<div class="empty-state">No encontramos una habilidad con ese nombre.</div>';
  }
  function renderPaths(){
    document.getElementById("pathList").innerHTML=paths.map(path=>{
      const done=path.ids.filter(id=>progress.completed.includes(id)).length;
      const chips=path.tags.map(t=>'<span>'+t+'</span>').join("");
      return '<article class="path-card"><div class="path-number">'+path.number+'</div><div><h3>'+path.title+'</h3><p>'+path.description+'</p><div class="path-tags">'+chips+'</div></div><button class="path-action" data-open-module="'+(path.ids.find(id=>!progress.completed.includes(id))||path.ids[0])+'">'+(done===path.ids.length?"Repasar ruta":done+"/"+path.ids.length+" completadas")+" ↗</button></article>";
    }).join("");
  }
  function renderHistory(){
    const done=modules.filter(m=>progress.completed.includes(m.id));
    document.getElementById("historyList").innerHTML=done.length?done.map(m=>'<div class="history-row"><span class="history-symbol">'+m.symbol+'</span><span><strong>'+m.title+'</strong><small>'+m.category+' · Lección completada</small></span><span class="history-xp">+60 XP</span></div>').join():'<div class="history-empty">Todavía no has completado ninguna lección. Tu primera práctica aparecerá aquí.</div>';
  }
  function updateUI(){
    const count=progress.completed.length, percent=Math.round(count/modules.length*100),level=levelInfo(),streak=streakCount();
    setText("xpCount",progress.xp);setText("completedCount",count);setText("levelName",level.name);setText("levelLabel","Nivel "+level.number+" · "+level.name);
    setText("progressPercent",percent+"%");setWidth("progressBar",percent);
    setText("streakCount",streak);setText("bigXp",progress.xp);setText("bigCompleted",count);setText("bigStreak",streak);setText("bigDisciplines",new Set(modules.filter(m=>progress.completed.includes(m.id)).map(m=>m.category)).size);
    setWidth("levelProgressBar",level.percent);setText("nextLevelText",progress.xp>=800?"Has alcanzado el rango más alto de esta primera ruta.":(level.next-progress.xp)+" XP para llegar a "+(["Observador","Explorador","Analista","Investigador","Mentalista"][Math.min(4,["Observador","Explorador","Analista","Investigador","Mentalista"].indexOf(level.name)+1)]));
    document.getElementById("dashboardModules").innerHTML=modules.slice(0,4).map(renderCard).join();
    renderAllModules();renderPaths();renderHistory();
  }
  function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value;}
  function setWidth(id,value){const el=document.getElementById(id);if(el)el.style.width=value+"%";}
  function showToast(message){
    const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
  }

  function switchView(name){
    document.querySelectorAll(".view").forEach(view=>view.classList.toggle("active",view.id==="view-"+name));
    document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.view===name));
    const labels={dashboard:"INICIO",training:"ENTRENAMIENTO",paths:"RUTAS DE APRENDIZAJE",progress:"MI PROGRESO"};
    setText("breadcrumbCurrent",labels[name]||"INICIO");
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function exerciseMarkup(id){
    if(id==="observe"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Escena de observación</strong><span>RECUERDO VISUAL</span></div><p>Observa los objetos durante unos segundos. Luego pulsa «Ocultar escena» y escribe al menos cuatro que recuerdes.</p><div class="scene-board" id="sceneBoard"><div class="scene-item"><b>◷</b>reloj</div><div class="scene-item"><b>⌁</b>llave</div><div class="scene-item"><b>▤</b>libro</div><div class="scene-item"><b>◒</b>taza</div><div class="scene-item"><b>✎</b>lápiz</div><div class="scene-item"><b>◉</b>moneda</div><div class="scene-item"><b>✧</b>brújula</div><div class="scene-item"><b>♧</b>vela</div></div><button class="btn btn-outline btn-small" data-action="hide-scene" id="hideScene">Ocultar escena y responder</button><div id="observeAnswer" class="hidden"><label class="exercise-label" for="observeInput">¿Qué objetos recuerdas?</label><textarea class="exercise-input" id="observeInput" rows="2" placeholder="Escribe los objetos separados por comas..."></textarea><button class="btn btn-primary btn-small" data-action="check-observation">Comprobar recuerdo</button></div><div class="exercise-feedback" id="observeFeedback"></div></div>';
    }
    if(id==="attention"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Efecto Stroop</strong><span>6 RONDAS</span></div><p>Selecciona el color de la tinta, no lo que dice la palabra. Observa el color de las letras.</p><div id="stroopGame"><div class="stroop-word" id="stroopWord">LISTO</div><div class="exercise-feedback" id="stroopProgress">Pulsa comenzar para iniciar.</div><button class="btn btn-primary btn-small" data-action="start-stroop">Comenzar</button></div></div>';
    }
    if(id==="memory"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Lista de palabras</strong><span>7 PALABRAS</span></div><p>Memoriza la lista mientras esté visible. Después desaparecerá y podrás escribir las palabras que recuerdes.</p><div id="memoryGame"><div class="word-display" id="memoryWords">NUBE · ESPEJO · LIMÓN · PUENTE · RELOJ · BOSQUE · CARTA</div><div class="exercise-feedback" id="memoryTimer">Tienes 7 segundos para estudiar la lista.</div><button class="btn btn-primary btn-small" data-action="start-memory">Empezar prueba</button></div></div>';
    }
    if(id==="psychology"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Interpreta con cuidado</strong><span>CASO BREVE</span></div><p>Una persona evita mirarte a los ojos durante una conversación. ¿Qué conclusión es la más responsable?</p><div class="exercise-actions"><button class="answer-btn" data-action="psych-answer" data-answer="lie">Está mintiendo.</button><button class="answer-btn" data-action="psych-answer" data-answer="nervous">Está nerviosa.</button><button class="answer-btn" data-action="psych-answer" data-answer="context">No se puede saber solo por ese gesto.</button></div><div class="exercise-feedback" id="psychFeedback"></div></div>';
    }
    if(id==="muscle"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Protocolo de observación</strong><span>CON OTRA PERSONA</span></div><p>Hazlo solamente con alguien que esté de acuerdo. No intentes adivinar pensamientos privados ni uses el ejercicio para acusar o presionar.</p><ol class="protocol-list"><li>Explica que estudiaréis movimientos pequeños y pide permiso.</li><li>Ambos apoyan las manos cómodamente, sin apretar ni tirar.</li><li>La otra persona piensa en mover suavemente un dedo; observa si aparece algún movimiento diminuto.</li><li>Repite cambiando el dedo y luego intercambien los papeles.</li></ol><p><strong>Qué debes aprender:</strong> un movimiento puede ser involuntario, voluntario o accidental. No existe una regla universal que convierta tensión o relajación en una letra concreta.</p><button class="btn btn-outline btn-small" data-action="muscle-ack">He comprendido el protocolo</button><div class="exercise-feedback" id="muscleFeedback"></div></div>';
    }
    if(id==="association"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Asociación espontánea</strong><span>EXPERIMENTO PERSONAL</span></div><p>Lee estas palabras una vez y escribe la primera idea que se te ocurra. No hay respuestas correctas.</p><div class="word-display">NIEVE · FRÍO · BLANCO · MONTAÑA · ABRIGO</div><input class="exercise-input" id="associationInput" maxlength="50" placeholder="Mi primera asociación fue..."><button class="btn btn-primary btn-small" data-action="association-reveal">Ver explicación</button><div class="exercise-feedback" id="associationFeedback"></div></div>';
    }
    if(id==="investigation"){
      return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Caso de la ventana abierta</strong><span>DEDUCCIÓN</span></div><p>En una habitación falta una caja. La ventana está abierta, hay pequeñas gotas en el alféizar y el suelo justo debajo está húmedo. La puerta tiene una alarma que no se ha activado.</p><p><strong>¿Qué conclusión está mejor apoyada por las pistas?</strong></p><div class="exercise-actions"><button class="answer-btn" data-action="case-answer" data-answer="person">Sabemos quién se llevó la caja.</button><button class="answer-btn" data-action="case-answer" data-answer="window">La ventana pudo ser una vía de entrada.</button><button class="answer-btn" data-action="case-answer" data-answer="impossible">La caja nunca estuvo en la habitación.</button></div><div class="exercise-feedback" id="caseFeedback"></div></div>';
    }
    return '<div class="exercise-panel"><div class="exercise-head"><strong>Práctica · Búsqueda visual</strong><span>ATENCIÓN SOSTENIDA</span></div><p>Cuenta cuántas veces aparece la letra A en esta secuencia. Revisa una por una y no cuentes otras letras.</p><div class="word-display" style="letter-spacing:7px">M A R N A V A T L A P A S D A</div><label for="focusInput">¿Cuántas letras A encontraste?</label><input class="exercise-input" id="focusInput" type="number" min="0" max="20" placeholder="Tu respuesta"><button class="btn btn-primary btn-small" data-action="focus-check">Comprobar respuesta</button><div class="exercise-feedback" id="focusFeedback"></div></div>';
  }

  function openModule(id){
    const m=getModule(id);if(!m){showToast("No encontramos esa lección.");return;}
    currentModule=m;
    document.getElementById("modalCategory").textContent=m.category.toUpperCase()+" · "+m.minutes+" MIN";
    document.getElementById("modalContent").innerHTML=
      '<div class="lesson-number">LECCIÓN '+m.number+' / 08 · NIVEL '+m.level.toUpperCase()+'</div>'+
      '<h2 class="lesson-title" id="lessonTitle">'+m.title+'</h2><p class="lesson-lead">'+m.lead+'</p>'+
      '<div class="lesson-columns"><article class="lesson-box"><h4>01 · FUNDAMENTO</h4><p>'+m.principle+'</p></article><article class="lesson-box"><h4>02 · DEMOSTRACIÓN</h4><p>'+m.demo+'</p></article></div>'+
      '<div class="eyebrow"><span class="eyebrow-line"></span> PONLO EN PRÁCTICA</div>'+exerciseMarkup(id)+
      '<div class="lesson-complete-row"><p class="complete-note">Puedes repetir esta práctica cuando quieras. La experiencia de esta lección se acredita una sola vez.</p><button class="btn btn-primary btn-small" data-action="complete-lesson" data-id="'+id+'">'+(progress.completed.includes(id)?"Lección completada ✓":"Marcar lección como completada · +60 XP")+'</button></div>';
    const modal=document.getElementById("lessonModal");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  }
  function closeModal(){
    const modal=document.getElementById("lessonModal");modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";
    if(window.mentalMemoryTimer){clearInterval(window.mentalMemoryTimer);window.mentalMemoryTimer=null;}
    currentModule=null;
  }
  function feedback(id,message,type){
    const el=document.getElementById(id);if(!el)return;
    el.textContent=message;el.className="exercise-feedback"+(type?" "+type:"");
  }
  function completeLesson(id){
    if(!getModule(id))return;
    if(progress.completed.includes(id)){showToast("Esta lección ya está registrada en tu progreso.");return;}
    progress.completed.push(id);progress.xp+=60;const today=todayKey();if(!progress.dates.includes(today))progress.dates.push(today);
    saveProgress();updateUI();
    const btn=document.querySelector('[data-action="complete-lesson"][data-id="'+id+'"]');
    if(btn){btn.textContent="Lección completada ✓";btn.disabled=true;}
    showToast("¡Lección completada! Has ganado 60 XP.");
  }

  function startStroop(){
    const colors=[{name:"rojo",hex:"#e3786d"},{name:"azul",hex:"#77a9e8"},{name:"verde",hex:"#91c39b"},{name:"amarillo",hex:"#e4c76d"}];
    const words=["ROJO","AZUL","VERDE","AMARILLO"];
    const rounds=[];
    for(let i=0;i<6;i++){
      const ink=colors[Math.floor(Math.random()*4)];
      let word=words[Math.floor(Math.random()*4)];
      while(word===ink.name.toUpperCase())word=words[Math.floor(Math.random()*4)];
      rounds.push({ink,word});
    }
    window.mentalStroop={rounds,index:0,score:0};
    showStroopRound();
  }
  function showStroopRound(){
    const game=window.mentalStroop;if(!game)return;
    if(game.index>=game.rounds.length){
      document.getElementById("stroopGame").innerHTML='<div class="stroop-word">RESULTADO</div><div class="exercise-feedback good">Acertaste '+game.score+' de 6. Lo importante es recordar que leer la palabra puede interferir con identificar su tinta.</div><button class="btn btn-outline btn-small" data-action="start-stroop">Intentar otra vez</button>';
      return;
    }
    const item=game.rounds[game.index];
    document.getElementById("stroopGame").innerHTML='<div class="exercise-feedback">RONDA '+(game.index+1)+' DE 6</div><div class="stroop-word" style="color:'+item.ink.hex+'">'+item.word+'</div><p style="text-align:center">¿De qué color son las letras?</p><div class="exercise-actions" style="justify-content:center">'+["rojo","azul","verde","amarillo"].map(c=>'<button class="answer-btn" data-action="stroop-answer" data-answer="'+c+'">'+c[0].toUpperCase()+c.slice(1)+'</button>').join("")+'</div><div class="exercise-feedback" id="stroopFeedback"></div>';
  }
  function startMemory(){
    if(window.mentalMemoryTimer)clearInterval(window.mentalMemoryTimer);
    const game=document.getElementById("memoryGame");
    let seconds=7;
    game.innerHTML='<div class="word-display" id="memoryWords">NUBE · ESPEJO · LIMÓN · PUENTE · RELOJ · BOSQUE · CARTA</div><div class="exercise-feedback" id="memoryTimer">Estudia la lista: '+seconds+' segundos.</div>';
    window.mentalMemoryTimer=setInterval(()=>{
      seconds--;const timer=document.getElementById("memoryTimer");
      if(timer)timer.textContent=seconds>0?"Estudia la lista: "+seconds+" segundos.":"¡Tiempo! La lista se ha ocultado.";
      if(seconds<=0){
        clearInterval(window.mentalMemoryTimer);window.mentalMemoryTimer=null;
        if(!document.getElementById("memoryGame"))return;
        game.innerHTML='<p>Escribe las palabras que recuerdes, separadas por comas.</p><textarea class="exercise-input" id="memoryInput" rows="3" placeholder="Palabras que recuerdo..."></textarea><button class="btn btn-primary btn-small" data-action="memory-check">Comprobar recuerdo</button><div class="exercise-feedback" id="memoryFeedback"></div>';
      }
    },1000);
  }

  document.addEventListener("click",event=>{
    const openBtn=event.target.closest("[data-open-module]");
    if(openBtn){openModule(openBtn.dataset.openModule);return;}
    const filterBtn=event.target.closest("[data-filter]");
    if(filterBtn){
      activeFilter=filterBtn.dataset.filter;
      document.querySelectorAll(".filter-tab").forEach(b=>b.classList.toggle("active",b===filterBtn));
      renderAllModules();return;
    }
    const actionBtn=event.target.closest("[data-action]");
    if(!actionBtn)return;
    const action=actionBtn.dataset.action;
    if(action==="complete-lesson"){completeLesson(actionBtn.dataset.id);}
    if(action==="hide-scene"){
      document.getElementById("sceneBoard").classList.add("hidden");document.getElementById("hideScene").classList.add("hidden");document.getElementById("observeAnswer").classList.remove("hidden");
    }
    if(action==="check-observation"){
      const value=(document.getElementById("observeInput").value||"").toLocaleLowerCase("es");
      const objects=["reloj","llave","libro","taza","lápiz","lapiz","moneda","brújula","brujula","vela"];
      const found=new Set(objects.filter(word=>value.includes(word)));
      feedback("observeFeedback","Recordaste "+found.size+" de 8 objetos. "+(found.size>=5?"¡Buen nivel de recuerdo!":"Vuelve a intentarlo después y busca una estrategia para agrupar detalles."),found.size>=5?"good":"");
    }
    if(action==="start-stroop")startStroop();
    if(action==="stroop-answer"){
      const game=window.mentalStroop;if(!game)return;
      if(actionBtn.dataset.answer===game.rounds[game.index].ink.name)game.score++;
      game.index++;showStroopRound();
    }
    if(action==="start-memory")startMemory();
    if(action==="memory-check"){
      const input=(document.getElementById("memoryInput").value||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      const words=["nube","espejo","limon","puente","reloj","bosque","carta"];
      const score=words.filter(w=>new RegExp("(^|[^a-zñ])"+w+"([^a-zñ]|$)","i").test(input)).length;
      feedback("memoryFeedback","Recordaste "+score+" de 7 palabras. "+(score>=5?"Excelente recuperación.":"La memoria mejora con atención y práctica de recuperación."),score>=5?"good":"");
    }
    if(action==="psych-answer"){
      const answer=actionBtn.dataset.answer;
      const message=answer==="context"?"Correcto. Evitar la mirada puede tener muchas explicaciones; necesitas más contexto y otras evidencias.":"No necesariamente. Ese gesto por sí solo no permite saber si alguien miente o está nervioso.";
      feedback("psychFeedback",message,answer==="context"?"good":"bad");
      document.querySelectorAll('[data-action="psych-answer"]').forEach(b=>b.disabled=true);
    }
    if(action==="muscle-ack")feedback("muscleFeedback","Perfecto. La práctica consiste en observar sin forzar ni atribuir significados automáticos a los movimientos.","good");
    if(action==="association-reveal"){
      const value=(document.getElementById("associationInput").value||"").trim();
      feedback("associationFeedback",value?"Tu asociación fue «"+value+"». Las palabras anteriores pueden haber influido, pero esta respuesta no permite leer pensamientos ni predecir lo que elegirá otra persona.":"Escribe primero una asociación; no hay una respuesta obligatoria.");
    }
    if(action==="case-answer"){
      const answer=actionBtn.dataset.answer;
      const good=answer==="window";
      feedback("caseFeedback",good?"Bien razonado. Las pistas apoyan que la ventana pudo ser una vía de entrada, pero no revelan quién entró ni prueban por sí solas que esa fuera la ruta.":"Esa conclusión va más allá de las pistas. La explicación mejor apoyada es que la ventana pudo ser una vía de entrada; aún faltan datos.",good?"good":"bad");
      document.querySelectorAll('[data-action="case-answer"]').forEach(b=>b.disabled=true);
    }
    if(action==="focus-check"){
      const value=(document.getElementById("focusInput").value||"").trim();
      feedback("focusFeedback",value===""?"Escribe un número para comprobarlo.":Number(value)===6?"Exacto: hay 6 letras A. Has mantenido la regla durante toda la secuencia.":"No exactamente. Hay 6 letras A. Revisa la secuencia una vez más y cuenta solo la A.",Number(value)===6?"good":"bad");
    }
  });

  // Navigation controls are bound directly so they do not depend on event delegation.
  document.querySelectorAll("[data-view]").forEach(control=>{
    control.addEventListener("click",()=>switchView(control.dataset.view));
  });
  window.MENTALIST = { navigate:switchView, openLesson:openModule, closeLesson:closeModal };

  document.getElementById("moduleSearch").addEventListener("input",renderAllModules);
  document.getElementById("closeModal").addEventListener("click",closeModal);
  document.getElementById("lessonModal").addEventListener("click",event=>{if(event.target.id==="lessonModal")closeModal();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&document.getElementById("lessonModal").classList.contains("open"))closeModal();});
  document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  document.getElementById("resetProgress").addEventListener("click",()=>{
    if(!window.confirm("¿Seguro que quieres borrar el XP y las lecciones completadas de este navegador?"))return;
    progress={xp:0,completed:[],dates:[]};saveProgress();updateUI();showToast("Tu progreso se ha reiniciado.");
  });


  // ===== PROGRAMA ANUAL: 365 días x 8 disciplinas + 365 retos diarios independientes =====
  const DAY_CATEGORIES = modules.map(m=>({id:m.id,title:m.title,category:m.category,symbol:m.symbol}));
  const YEAR_LENGTH = 365;

  function ensureAnnualState(){
    progress.dayProgress = progress.dayProgress && typeof progress.dayProgress==="object" ? progress.dayProgress : {};
    progress.dailyCompleted = Array.isArray(progress.dailyCompleted) ? progress.dailyCompleted : [];
    progress.dailyHistory = progress.dailyHistory && typeof progress.dailyHistory==="object" ? progress.dailyHistory : {};
    progress.dailyStartDate = progress.dailyStartDate || todayKey();

    // Migra las ocho lecciones iniciales ya completadas a Día 1, sin hacer que el usuario las repita.
    if(!progress.dayProgress["1"]){
      const oldDone = modules.filter(m=>progress.completed.includes(m.id)).map(m=>m.id);
      if(oldDone.length) progress.dayProgress["1"] = oldDone;
    }
    saveProgress();
  }

  function currentProgramDay(){
    for(let day=1;day<=YEAR_LENGTH;day++){
      const done = new Set(progress.dayProgress[String(day)] || []);
      if(!DAY_CATEGORIES.every(m=>done.has(m.id))) return day;
    }
    return YEAR_LENGTH+1;
  }

  function programDayCount(day){
    return new Set(progress.dayProgress[String(day)] || []).size;
  }

  function totalProgramExercises(){
    return Object.keys(progress.dayProgress).reduce((sum,key)=>sum+new Set(progress.dayProgress[key]||[]).size,0);
  }

  function seededRandom(seed){
    let state = (seed>>>0) || 1;
    return function(){
      state += 0x6D2B79F5;
      let t=state;
      t=Math.imul(t^(t>>>15),t|1);
      t^=t+Math.imul(t^(t>>>7),t|61);
      return ((t^(t>>>14))>>>0)/4294967296;
    };
  }

  function shuffled(array,rng){
    const copy=array.slice();
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(rng()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function pick(array,rng){return array[Math.floor(rng()*array.length)];}
  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }

  const OBJECT_BANK = [
    ["⌚","reloj"],["🗝","llave"],["▤","libro"],["☕","taza"],["✎","lápiz"],["◉","moneda"],["✧","brújula"],["♧","vela"],
    ["✉","sobre"],["♜","torre de ajedrez"],["⌂","casa miniatura"],["♫","campana"],["⚑","bandera"],["◇","cristal"],["☂","paraguas"],["✿","flor"],
    ["⚙","engranaje"],["▱","cuaderno"],["♢","anillo"],["⚓","ancla"],["☼","sol de papel"],["♨","tetera"],["✂","tijeras"],["⚖","balanza"],
    ["☘","trébol"],["◈","dado"],["♧","hoja"],["⚽","pelota"],["♬","diapasón"],["⌘","brújula pequeña"],["▣","caja"],["✦","estrella"]
  ];
  const MEMORY_WORDS = [
    "NUBE","ESPEJO","LIMÓN","PUENTE","RELOJ","BOSQUE","CARTA","VENTANA","CAMINO","PLANETA",
    "LINTERNA","JARDÍN","MONEDA","BARCO","MÚSICA","MONTAÑA","LLUVIA","CAMISETA","TAMBOR","CASTILLO",
    "MARIPOSA","CUADERNO","BOTELLA","TREN","ARENA","FARO","NARANJA","CASCADA","GUITARRA","BRÚJULA",
    "MERCADO","ESTRELLA","PINCEL","VOLCÁN","CEREZA","MÁSCARA","SOMBRERO","CAMPANA","OCÉANO","RETRATO",
    "BICICLETA","NIDO","ESCALERA","PAPEL","BOMBILLA","TECLADO","PLUMA","PIRÁMIDE","SEMILLA","SILENCIO"
  ];
  const PSYCHOLOGY_CASES = [
    {scene:"En una conversación, Alex mira varias veces hacia la puerta.",question:"¿Qué puedes concluir con seguridad?",options:["Quiere escapar de la conversación","Ha mirado hacia la puerta varias veces","Está ocultando algo"],correct:1,why:"La observación directa es que miró hacia la puerta. El motivo todavía es una hipótesis."},
    {scene:"Una compañera habla menos de lo habitual durante una tarde.",question:"¿Cuál es la mejor siguiente pregunta?",options:["¿Estás enfadada conmigo?","¿Te pasa algo o simplemente estás cansada?","¿Por qué estás siendo tan rara?"],correct:1,why:"Una pregunta abierta y respetuosa permite conocer el contexto sin imponer una explicación."},
    {scene:"Un amigo suele gesticular mucho, pero hoy mantiene las manos quietas.",question:"¿Qué dato es más útil?",options:["Comparar con su comportamiento habitual y el contexto","Afirmar que está mintiendo","Suponer que está enfadado"],correct:0,why:"La línea base ayuda a notar cambios, pero un cambio no revela por sí solo su causa."},
    {scene:"Alguien sonríe mientras cuenta una historia difícil.",question:"¿Qué interpretación es más cuidadosa?",options:["La historia es falsa","La persona está feliz","La sonrisa tiene varias explicaciones posibles"],correct:2,why:"Una expresión no permite conocer por sí sola la emoción ni la veracidad de una historia."},
    {scene:"Durante un examen, una estudiante mueve el pie repetidamente.",question:"¿Qué puedes afirmar?",options:["Está nerviosa con certeza","Su pie se está moviendo repetidamente","No estudió"],correct:1,why:"Describe lo que ves antes de interpretar. El movimiento puede tener muchas causas."},
    {scene:"Una persona tarda en responder una pregunta sencilla.",question:"¿Qué deberías evitar?",options:["Esperar y escuchar","Aclarar la pregunta","Tratar la pausa como prueba de engaño"],correct:2,why:"Las pausas pueden deberse a pensar, buscar palabras, distraerse o muchas otras razones."}
  ];
  const ASSOCIATION_SETS = [
    ["océano","ola","arena","concha"],["invierno","bufanda","hielo","chimenea"],["laboratorio","lupa","pista","huella"],
    ["teatro","telón","máscara","aplauso"],["bosque","musgo","sendero","búho"],["viaje","maleta","mapa","estación"],
    ["música","ritmo","piano","melodía"],["espacio","cohete","órbita","astronauta"],["cocina","canela","receta","horno"],
    ["misterio","sobre","candado","secreto"],["jardín","semilla","tierra","mariposa"],["ciudad","semáforo","avenida","edificio"]
  ];
  const INVESTIGATION_CASES = [
    {scene:"En el pasillo hay gotas de agua. Junto a la puerta se ve un paraguas mojado y afuera está lloviendo.",q:"¿Qué explicación encaja mejor sin afirmar más de lo que sabes?",o:["Alguien pudo entrar con un paraguas mojado","Una persona concreta entró a las 8:00","El agua apareció sin causa"],a:0,why:"Las pistas apoyan una posibilidad, pero no identifican a la persona ni la hora."},
    {scene:"Un jarrón está roto. Hay una pelota junto a la mesa y una ventana abierta.",q:"¿Qué conclusión está justificada?",o:["La pelota pudo golpear el jarrón","Un vecino lo rompió","La ventana causó el daño"],a:0,why:"La pelota es una hipótesis plausible; hacen falta más pruebas para confirmarla."},
    {scene:"Un libro aparece abierto sobre la mesa. Una lámpara está encendida y una silla está apartada.",q:"¿Qué sabes directamente?",o:["Alguien estudió durante horas","El libro está abierto y la lámpara encendida","La persona estaba preparando un examen"],a:1,why:"La segunda opción describe observaciones, no una historia inventada."},
    {scene:"La alarma de una tienda sonó. La puerta está cerrada y el personal revisa el sistema.",q:"¿Qué información falta primero?",o:["El color favorito del dueño","El registro del sensor y qué ocurrió cuando sonó","La opinión de un desconocido"],a:1,why:"El registro del sensor ayuda a comprobar qué activó la alarma."},
    {scene:"Hay marcas de barro desde el jardín hasta el felpudo. Cerca hay unas botas sucias.",q:"¿Cuál es la hipótesis más prudente?",o:["Las botas pudieron dejar las marcas","Sabemos quién caminó allí","La casa fue visitada por un ladrón"],a:0,why:"La coincidencia es una pista, no una identificación ni una prueba de delito."},
    {scene:"En una caja faltan dos piezas. La tapa está abierta y el inventario anterior muestra diez piezas.",q:"¿Qué revisarías para avanzar?",o:["El inventario actual y quién tuvo acceso, sin acusar","Acusar al último visitante","Dar por hecho que alguien las robó"],a:0,why:"Comprobar el recuento y las posibilidades de acceso permite investigar sin saltar a conclusiones."}
  ];
  const FOCUS_SYMBOLS = ["◆","○","△","□","◇","●","✦","▽","☆","◉"];
  const MUSCLE_CONTEXTS = [
    "al pensar en una tarjeta colocada a la izquierda","al recordar una letra elegida","al imaginar que busca un objeto sobre la mesa",
    "al pensar en una dirección del mapa","al concentrarse en una de dos cajas","al imaginar una palabra corta"
  ];
  const WRIST_DIRECTIONS = ["hacia dentro","hacia fuera","ligeramente hacia arriba","ligeramente hacia abajo","hacia la izquierda","hacia la derecha"];

  function buildProgramExercise(module,day){
    const categoryIndex=modules.findIndex(m=>m.id===module.id);
    const rng=seededRandom(day*7919+(categoryIndex+1)*104729);
    const number=String(day).padStart(3,"0");
    const base={moduleId:module.id,day,title:module.title+" · Ejercicio "+number,minutes:module.minutes,category:module.category};
    if(module.id==="observe"){
      const chosen=shuffled(OBJECT_BANK,rng).slice(0,6);
      const slots=["arriba a la izquierda","arriba al centro","arriba a la derecha","abajo a la izquierda","abajo al centro","abajo a la derecha"];
      const target=Math.floor(rng()*6);
      const options=shuffled(chosen,rng).slice(0,4);
      if(!options.some(x=>x[1]===chosen[target][1])) options[0]=chosen[target];
      return {...base,type:"observe",scene:chosen.map((x,i)=>({icon:x[0],name:x[1],slot:slots[i]})),target:chosen[target][1],targetSlot:slots[target],options:shuffled(options,rng).map(x=>x[1]),prompt:"Observa la escena durante unos segundos. Después ocúltala y responde: ¿qué objeto estaba "+slots[target]+"?"};
    }
    if(module.id==="attention"){
      const chars=["A","E","R","S","M","T","P","L"];
      const target=chars[day%chars.length];
      const sequence=Array.from({length:34},()=>pick(chars,rng));
      const count=sequence.filter(x=>x===target).length;
      return {...base,type:"count",target,count,sequence:sequence.join(" "),prompt:"Cuenta cuántas veces aparece la letra "+target+". No cuentes las demás letras."};
    }
    if(module.id==="memory"){
      const list=shuffled(MEMORY_WORDS,rng).slice(0,7);
      return {...base,type:"memory",list,prompt:"Memoriza estas siete palabras. Después ocúltalas y escribe todas las que recuerdes."};
    }
    if(module.id==="psychology"){
      const sample=PSYCHOLOGY_CASES[(day*7)%PSYCHOLOGY_CASES.length];
      return {...base,type:"choice",prompt:sample.scene+" "+sample.question,options:sample.options,correct:sample.correct,why:sample.why,explain:"Distingue lo que observas de la explicación que imaginas."};
    }
    if(module.id==="muscle"){
      const direction=WRIST_DIRECTIONS[(day*5)%WRIST_DIRECTIONS.length];
      const context=MUSCLE_CONTEXTS[(day*3)%MUSCLE_CONTEXTS.length];
      const options=[
        "El pequeño movimiento puede observarse, pero no demuestra por sí solo una letra o pensamiento.",
        "La dirección confirma exactamente qué palabra está pensando.",
        "Una sola señal muscular siempre tiene el mismo significado."
      ];
      return {...base,type:"choice",prompt:"Práctica de lectura muscular con consentimiento: una persona apoya cómodamente su antebrazo y muñeca, sin presión. Notas un pequeño movimiento de la muñeca "+direction+" "+context+". ¿Qué conclusión es científicamente prudente?",options,correct:0,why:"Los movimientos ideomotores pueden ser sutiles y ambiguos. Se observan y se repiten con cuidado; no son un código universal. Nunca aprietes ni fuerces la muñeca.",explain:"Esta práctica se centra en la muñeca y el antebrazo, con permiso y sin presionar."};
    }
    if(module.id==="association"){
      const words=ASSOCIATION_SETS[(day*11)%ASSOCIATION_SETS.length];
      return {...base,type:"association",words,prompt:"Lee las cuatro palabras una vez y escribe la primera asociación que te venga a la mente. No existe una respuesta obligatoria."};
    }
    if(module.id==="investigation"){
      const sample=INVESTIGATION_CASES[(day*5)%INVESTIGATION_CASES.length];
      return {...base,type:"choice",prompt:sample.scene+" "+sample.q,options:sample.o,correct:sample.a,why:sample.why,explain:"Una buena investigación separa hechos, hipótesis y datos que todavía faltan."};
    }
    const target=FOCUS_SYMBOLS[day%FOCUS_SYMBOLS.length];
    const symbols=FOCUS_SYMBOLS.filter(x=>x!==target);
    const sequence=Array.from({length:42},()=>rng()<0.24?target:pick(symbols,rng));
    const count=sequence.filter(x=>x===target).length;
    return {...base,type:"count",target,count,sequence:sequence.join(" "),prompt:"Busca el símbolo "+target+" y cuenta cuántas veces aparece en la secuencia. Mantén la atención hasta el final."};
  }

  function dayExerciseMarkup(ex){
    if(ex.type==="observe"){
      return '<div class="annual-scene" id="annualScene">'+ex.scene.map(x=>'<div class="annual-scene-item"><b>'+x.icon+'</b><span>'+escapeHtml(x.slot)+'</span><small>'+escapeHtml(x.name)+'</small></div>').join("")+'</div>'+
      '<button class="btn btn-outline btn-small" data-program-action="hide-scene">Ocultar la escena</button><div id="annualAnswer" class="hidden"><p class="exercise-instruction">'+escapeHtml(ex.prompt)+'</p><div class="exercise-actions">'+ex.options.map(x=>'<button class="answer-btn" data-program-action="choose" data-answer="'+escapeHtml(x)+'">'+escapeHtml(x)+'</button>').join("")+'</div></div>';
    }
    if(ex.type==="count"){
      return '<div class="annual-sequence">'+escapeHtml(ex.sequence)+'</div><div class="exercise-actions"><input id="programCountInput" class="exercise-input compact-input" type="number" min="0" max="50" placeholder="Tu número"><button class="btn btn-primary btn-small" data-program-action="check-count">Comprobar</button></div>';
    }
    if(ex.type==="memory"){
      return '<div id="annualMemory"><div class="annual-word-list">'+ex.list.map(x=>'<span>'+escapeHtml(x)+'</span>').join("")+'</div><p class="exercise-feedback" id="annualMemoryTimer">Tienes 9 segundos para estudiar la lista.</p><button class="btn btn-primary btn-small" data-program-action="start-memory">Empezar los 9 segundos</button></div>';
    }
    if(ex.type==="choice"){
      return '<div class="exercise-actions vertical-actions">'+ex.options.map((x,i)=>'<button class="answer-btn" data-program-action="choose-index" data-answer="'+i+'">'+escapeHtml(x)+'</button>').join("")+'</div>';
    }
    if(ex.type==="association"){
      return '<div class="association-words">'+ex.words.map(x=>'<span>'+escapeHtml(x)+'</span>').join("")+'</div><input id="programAssociationInput" class="exercise-input" maxlength="80" placeholder="Mi primera asociación..."><button class="btn btn-primary btn-small" data-program-action="submit-association">Guardar mi observación</button><p class="exercise-feedback">Anota tu respuesta con sinceridad; no hay una opción correcta.</p>';
    }
    return "";
  }

  function openProgramExercise(moduleId,day){
    const module=getModule(moduleId);
    if(!module) return;
    const targetDay=Number(day);
    if(targetDay!==currentProgramDay() && !progress.dayProgress[String(targetDay)]){
      showToast("Primero completa los ejercicios del día actual.");
      return;
    }
    if(targetDay>currentProgramDay()){showToast("Ese día todavía está bloqueado.");return;}
    const ex=buildProgramExercise(module,targetDay);
    window.currentAnnualExercise=ex;
    document.getElementById("modalCategory").textContent="DÍA "+targetDay+" / 365 · "+module.category.toUpperCase();
    document.getElementById("modalContent").innerHTML=
      '<div class="lesson-number">PROGRAMA ANUAL · DISCIPLINA '+String(modules.findIndex(m=>m.id===moduleId)+1).padStart(2,"0")+' DE 08</div>'+
      '<h2 class="lesson-title" id="lessonTitle">'+escapeHtml(ex.title)+'</h2>'+
      '<p class="lesson-lead">'+escapeHtml(ex.prompt)+'</p>'+
      '<div class="exercise-panel annual-exercise-panel"><div class="exercise-head"><strong>Tu práctica de hoy</strong><span>+30 XP</span></div>'+
      (ex.explain?'<p>'+escapeHtml(ex.explain)+'</p>':'')+dayExerciseMarkup(ex)+
      '<div class="exercise-feedback" id="annualFeedback"></div></div>'+
      '<div class="lesson-complete-row"><p class="complete-note">Este ejercicio no se repetirá: cada día utiliza una variante diferente dentro de esta disciplina.</p><button class="btn btn-primary btn-small" data-program-action="complete" '+(programDayCount(targetDay)>=8?'disabled':'')+'>Marcar ejercicio como completado · +30 XP</button></div>';
    const modal=document.getElementById("lessonModal");
    modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  }

  function completeProgramExercise(){
    const ex=window.currentAnnualExercise;
    if(!ex)return;
    const key=String(ex.day);
    progress.dayProgress[key]=Array.isArray(progress.dayProgress[key])?progress.dayProgress[key]:[];
    if(!progress.dayProgress[key].includes(ex.moduleId)){
      progress.dayProgress[key].push(ex.moduleId);
      progress.xp+=30;
      const today=todayKey();
      if(!progress.dates.includes(today)) progress.dates.push(today);
      saveProgress();
      const finished=programDayCount(ex.day)===8;
      updateUI();
      if(finished){
        showToast(ex.day===365?"¡Has terminado los 365 días de entrenamiento!":"¡Día "+ex.day+" completado! El día "+(ex.day+1)+" ya está desbloqueado.");
      }else{
        showToast("Ejercicio completado. "+programDayCount(ex.day)+" de 8 disciplinas listas.");
      }
      const btn=document.querySelector('[data-program-action="complete"]');
      if(btn){btn.disabled=true;btn.textContent="Ejercicio completado ✓";}
    }else{
      showToast("Este ejercicio ya está registrado.");
    }
  }

  function dailyChallengeIndex(){
    const start=progress.dailyStartDate||todayKey();
    const parse=value=>{const p=value.split("-").map(Number);return new Date(p[0],p[1]-1,p[2],12,0,0,0).getTime();};
    return Math.max(1,Math.min(YEAR_LENGTH,Math.floor((parse(todayKey())-parse(start))/86400000)+1));
  }

  function buildDailyChallenge(index){
    const rng=seededRandom(900001+index*65537);
    const types=[
      {name:"El patrón oculto",kind:"pattern"},
      {name:"La pista decisiva",kind:"clue"},
      {name:"La pregunta precisa",kind:"question"},
      {name:"El orden correcto",kind:"order"},
      {name:"La probabilidad",kind:"probability"}
    ];
    const type=types[(index-1)%types.length];
    if(type.kind==="pattern"){
      const start=2+(index%7),step=2+(index%5);
      const series=[start,start+step,start+step*2,start+step*3,"?"];
      return {index,title:type.name,prompt:"Observa la secuencia y descubre qué número sigue.",detail:series.join(" · "),options:shuffled([String(start+step*4),String(start+step*4+1),String(start+step*3),String(start+step*5)],rng),answer:String(start+step*4),why:"La secuencia aumenta siempre en "+step+"."};
    }
    if(type.kind==="clue"){
      const places=["biblioteca","estación","invernadero","taller","museo","patio"];
      const objects=["una huella de barro","una gota de pintura","un hilo azul","una hoja seca","una marca circular","un papel doblado"];
      const place=places[(index*3)%places.length], clue=objects[(index*7)%objects.length];
      const options=["La pista puede orientar una búsqueda, pero no identifica por sí sola a una persona.","La pista demuestra quién estuvo allí.","La pista no tiene ninguna utilidad."];
      return {index,title:type.name,prompt:"En el/la "+place+" aparece "+clue+". ¿Cuál es la conclusión más rigurosa?",detail:"Analiza el alcance real de una pista.",options,answer:options[0],why:"Una pista puede apoyar una hipótesis y ayudar a investigar, pero no demuestra por sí sola quién la dejó."};
    }
    if(type.kind==="question"){
      const subjects=["un testigo","una compañera","un visitante","un investigador","un vecino","un estudiante"];
      const topics=["el momento en que llegó","lo que vio primero","el objeto que recuerda","el camino que tomó","los sonidos que escuchó","la posición de la caja"];
      const person=subjects[(index*5)%subjects.length],topic=topics[(index*9)%topics.length];
      const options=["¿Puedes contarme qué recuerdas sobre "+topic+"?","¿Verdad que llegaste tarde?","¿Viste exactamente lo que yo creo que pasó?"];
      return {index,title:type.name,prompt:"Quieres obtener información de "+person+" sin sugerir una respuesta. ¿Qué pregunta elegirías?",detail:"Elige la pregunta menos sugestiva.",options,answer:options[0],why:"Una pregunta abierta permite responder con palabras propias y reduce la sugestión."};
    }
    if(type.kind==="order"){
      const actions=shuffled(["observar la escena","anotar los hechos","proponer hipótesis","buscar pruebas que las comparen"],rng);
      const correct=["observar la escena","anotar los hechos","proponer hipótesis","buscar pruebas que las comparen"];
      return {index,title:type.name,prompt:"Ordena mentalmente estos pasos de investigación. ¿Cuál debería ser el primero?",detail:actions.map((x,i)=>(i+1)+". "+x).join("   /   "),options:shuffled(["Observar la escena","Acusar a alguien","Elegir la explicación más llamativa","Ignorar los datos que contradicen la idea"],rng),answer:"Observar la escena",why:"Primero se describen los hechos; después se proponen y comprueban explicaciones."};
    }
    const a=3+(index%8),b=2+((index*3)%9);
    const options=["Grupo A, porque tiene "+a+" casos de cada 10","Grupo B, porque tiene "+b+" casos de cada 10","Ambos tienen la misma proporción"];
    const answer=a>b?options[0]:b>a?options[1]:options[2];
    return {index,title:type.name,prompt:"Dos rutas tienen estos resultados en pruebas iguales: ruta A, "+a+" éxitos de 10; ruta B, "+b+" éxitos de 10. ¿Cuál mostró mayor proporción de éxito?",detail:"Compara proporciones, no impresiones.",options,answer,why:"Con el mismo número de intentos, compara los éxitos de cada grupo. Es una muestra pequeña y no garantiza el resultado futuro."};
  }

  function renderDailyChallenge(){
    const index=dailyChallengeIndex();
    const challenge=buildDailyChallenge(index);
    const completed=progress.dailyCompleted.includes(index);
    const card=document.querySelector(".focus-card");
    if(!card)return;
    card.innerHTML=
      '<div class="card-kicker">RETO DIARIO INDEPENDIENTE <span class="live-dot"></span></div>'+
      '<div class="daily-card-top"><div><h3>'+escapeHtml(challenge.title)+'</h3><p>'+escapeHtml(challenge.prompt)+'</p></div><div class="daily-counter">'+String(index).padStart(3,"0")+'<small>/365</small></div></div>'+
      '<div class="focus-meta"><span>◷ 3–5 MIN</span><span>NO ES UNA LECCIÓN DEL PROGRAMA</span></div>'+
      '<button class="btn btn-outline" data-open-daily="'+index+'" '+(completed?'disabled':'')+'>'+(completed?'Reto de hoy completado ✓':'Iniciar reto de hoy ↗')+'</button>'+
      '<p class="daily-footnote">'+(completed?'El siguiente reto aparecerá mañana.':'Un desafío diferente a tus ocho ejercicios de entrenamiento.')+'</p>';
  }

  function openDailyChallenge(index){
    const challenge=buildDailyChallenge(index);
    const completed=progress.dailyCompleted.includes(index);
    window.currentDailyChallenge=challenge;
    document.getElementById("modalCategory").textContent="RETO DIARIO "+String(index).padStart(3,"0")+" / 365";
    document.getElementById("modalContent").innerHTML=
      '<div class="lesson-number">DESAFÍO EXTRA · NO CUENTA COMO LECCIÓN</div>'+
      '<h2 class="lesson-title" id="lessonTitle">'+escapeHtml(challenge.title)+'</h2>'+
      '<p class="lesson-lead">'+escapeHtml(challenge.prompt)+'</p>'+
      '<div class="exercise-panel annual-exercise-panel"><div class="exercise-head"><strong>Resuelve el desafío</strong><span>RETO '+String(index).padStart(3,"0")+'</span></div>'+
      '<div class="daily-detail">'+escapeHtml(challenge.detail)+'</div>'+
      '<div class="exercise-actions vertical-actions">'+challenge.options.map((option,i)=>'<button class="answer-btn" data-daily-action="answer" data-answer="'+i+'">'+escapeHtml(option)+'</button>').join("")+'</div>'+
      '<div class="exercise-feedback" id="dailyFeedback"></div></div>'+
      '<div class="lesson-complete-row"><p class="complete-note">Los retos diarios tienen su propia serie de 365 desafíos y no sustituyen ni repiten las lecciones.</p><button class="btn btn-primary btn-small" data-daily-action="complete" '+(completed?'disabled':'')+'>Registrar reto completado · +15 XP</button></div>';
    const modal=document.getElementById("lessonModal");
    modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  }

  function completeDailyChallenge(){
    const challenge=window.currentDailyChallenge;
    if(!challenge)return;
    if(progress.dailyCompleted.includes(challenge.index)){showToast("Este reto diario ya está completado.");return;}
    progress.dailyCompleted.push(challenge.index);
    progress.dailyHistory[String(challenge.index)]={date:todayKey(),completed:true};
    progress.xp+=15;
    const today=todayKey();if(!progress.dates.includes(today))progress.dates.push(today);
    saveProgress();updateUI();
    showToast("¡Reto diario "+challenge.index+" completado! Mañana habrá uno nuevo.");
    const btn=document.querySelector('[data-daily-action="complete"]');
    if(btn){btn.disabled=true;btn.textContent="Reto completado ✓";}
  }

  function showProgramFeedback(message,good){
    const el=document.getElementById("annualFeedback");
    if(el){el.textContent=message;el.className="exercise-feedback"+(good?" good":" bad");}
  }

  document.addEventListener("click",event=>{
    const openExercise=event.target.closest("[data-open-exercise]");
    if(openExercise){openProgramExercise(openExercise.dataset.openExercise,openExercise.dataset.day);return;}
    const openDaily=event.target.closest("[data-open-daily]");
    if(openDaily){openDailyChallenge(Number(openDaily.dataset.openDaily));return;}

    const programAction=event.target.closest("[data-program-action]");
    if(programAction){
      const ex=window.currentAnnualExercise;
      const action=programAction.dataset.programAction;
      if(!ex)return;
      if(action==="hide-scene"){
        const scene=document.getElementById("annualScene");if(scene)scene.classList.add("hidden");
        document.getElementById("annualAnswer").classList.remove("hidden");
        programAction.disabled=true;programAction.textContent="Escena oculta";
      }
      if(action==="choose"){
        const answer=programAction.dataset.answer;
        const good=answer===ex.target;
        showProgramFeedback(good?"¡Correcto! "+ex.targetSlot+" tenía "+ex.target+".":"No era esa posición. "+ex.targetSlot+" tenía "+ex.target+".",good);
        document.querySelectorAll('[data-program-action="choose"]').forEach(b=>b.disabled=true);
      }
      if(action==="check-count"){
        const input=document.getElementById("programCountInput");
        const value=input?Number(input.value):NaN;
        if(!input || input.value.trim()===""){showProgramFeedback("Escribe primero tu respuesta.",false);return;}
        const good=value===ex.count;
        showProgramFeedback(good?"¡Exacto! El resultado era "+ex.count+".":"El resultado era "+ex.count+". Revisa la secuencia y comprueba cómo contaste.",good);
        programAction.disabled=true;
      }
      if(action==="start-memory"){
        if(window.annualMemoryTimer)clearInterval(window.annualMemoryTimer);
        let seconds=9;
        const timer=document.getElementById("annualMemoryTimer");
        const btn=programAction;btn.disabled=true;btn.textContent="Observa la lista...";
        window.annualMemoryTimer=setInterval(()=>{
          seconds--;
          if(timer)timer.textContent=seconds>0?"Quedan "+seconds+" segundos.":"¡Tiempo! Ahora escribe lo que recuerdes.";
          if(seconds<=0){
            clearInterval(window.annualMemoryTimer);window.annualMemoryTimer=null;
            const area=document.getElementById("annualMemory");
            if(area)area.innerHTML='<p>Escribe las palabras que recuerdes, separadas por comas.</p><textarea id="annualMemoryInput" class="exercise-input" rows="3" placeholder="Palabras que recuerdas..."></textarea><button class="btn btn-primary btn-small" data-program-action="check-memory">Comprobar recuerdo</button>';
          }
        },1000);
      }
      if(action==="check-memory"){
        const value=(document.getElementById("annualMemoryInput")?.value||"").toLocaleUpperCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
        const normalized=ex.list.map(x=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,""));
        const score=normalized.filter(x=>value.includes(x)).length;
        showProgramFeedback("Recordaste "+score+" de 7 palabras. "+(score>=5?"Muy buen resultado.":"Practica estrategias de agrupación y recuperación."),score>=5);
      }
      if(action==="choose-index"){
        const answer=Number(programAction.dataset.answer);
        const good=answer===ex.correct;
        showProgramFeedback((good?"Correcto. ":"No exactamente. ")+ex.why,good);
        document.querySelectorAll('[data-program-action="choose-index"]').forEach(b=>b.disabled=true);
      }
      if(action==="submit-association"){
        const value=(document.getElementById("programAssociationInput")?.value||"").trim();
        if(!value){showProgramFeedback("Escribe una asociación antes de guardarla.",false);return;}
        showProgramFeedback("Anotado: «"+value+"». La primación puede influir en las asociaciones, pero no determina la respuesta de todo el mundo.",true);
        programAction.disabled=true;
      }
      if(action==="complete") completeProgramExercise();
      return;
    }

    const dailyAction=event.target.closest("[data-daily-action]");
    if(dailyAction){
      const challenge=window.currentDailyChallenge;
      if(!challenge)return;
      if(dailyAction.dataset.dailyAction==="answer"){
        const choice=challenge.options[Number(dailyAction.dataset.answer)];
        const good=choice===challenge.answer;
        const feedback=document.getElementById("dailyFeedback");
        if(feedback){feedback.textContent=(good?"¡Correcto! ":"No exactamente. ")+challenge.why;feedback.className="exercise-feedback"+(good?" good":" bad");}
        document.querySelectorAll('[data-daily-action="answer"]').forEach(b=>b.disabled=true);
      }
      if(dailyAction.dataset.dailyAction==="complete") completeDailyChallenge();
    }
  });

  function renderProgramDay(){
    const day=currentProgramDay();
    const container=document.getElementById("view-training");
    if(!container)return;
    if(day>YEAR_LENGTH){
      container.innerHTML='<div class="view-heading"><div class="eyebrow"><span class="eyebrow-line"></span> PROGRAMA COMPLETADO</div><h1>365 días conquistados.</h1><p>Has terminado los 2.920 ejercicios del programa anual. Los retos diarios son una serie independiente.</p></div><div class="annual-finish"><div class="finish-symbol">✦</div><h2>La práctica continúa.</h2><p>Has completado todas las disciplinas. Puedes repasar cualquier día o seguir con los retos diarios restantes.</p><button class="btn btn-outline" data-view="progress">Ver mi progreso</button></div>';
      return;
    }
    const done=programDayCount(day);
    const cards=DAY_CATEGORIES.map((m,i)=>{
      const isDone=(progress.dayProgress[String(day)]||[]).includes(m.id);
      return '<article class="module-card annual-module-card '+(isDone?'completed':'')+'"><div class="module-card-top"><span class="module-symbol">'+m.symbol+'</span><span class="module-index">0'+(i+1)+' / 08</span></div><h3>'+escapeHtml(m.title)+'</h3><p>'+escapeHtml(m.id==="observe"?"Memoria visual, detalles y posiciones.":m.id==="attention"?"Selección de información y control de distracciones.":m.id==="memory"?"Codificación y recuperación de palabras.":m.id==="psychology"?"Contexto, línea base y lectura prudente.":m.id==="muscle"?"Movimientos sutiles de muñeca y efecto ideomotor.":m.id==="association"?"Asociaciones espontáneas y primación.":m.id==="investigation"?"Pistas, hipótesis y pruebas.":"Búsqueda visual y atención sostenida.")+'</p><div class="module-card-bottom"><span>'+(isDone?'<span class="done-tag">✓ COMPLETADO</span>':"EJERCICIO "+String(day).padStart(3,"0"))+'</span><button type="button" data-open-exercise="'+m.id+'" data-day="'+day+'" aria-label="Abrir ejercicio de '+escapeHtml(m.title)+'" '+(isDone?'disabled':'')+'>'+(isDone?"✓":"→")+'</button></div></article>';
    }).join("");
    const completedDays=day-1;
    const progressPct=Math.round(completedDays/YEAR_LENGTH*100);
    container.innerHTML=
      '<div class="view-heading"><div class="eyebrow"><span class="eyebrow-line"></span> PROGRAMA DE ENTRENAMIENTO · 365 DÍAS</div><h1>Día '+day+' <em>de 365.</em></h1><p>Ocho ejercicios diferentes, uno por cada disciplina. Completa los ocho para desbloquear automáticamente el día siguiente.</p></div>'+
      '<div class="annual-day-banner"><div><small>PROGRESO DEL DÍA '+day+'</small><strong>'+done+' <i>/ 8 ejercicios</i></strong><div class="progress-track"><span style="width:'+(done/8*100)+'%"></span></div></div><div class="annual-year-progress"><strong>'+completedDays+' / 365</strong><small>DÍAS COMPLETADOS</small><div class="progress-track"><span style="width:'+progressPct+'%"></span></div></div></div>'+
      '<div class="annual-section-title"><div><div class="eyebrow">LAS OCHO DISCIPLINAS</div><h2>Tu entrenamiento de hoy</h2></div><span class="daily-number">DÍA '+String(day).padStart(3,"0")+'</span></div>'+
      '<div class="module-grid full-module-grid annual-grid">'+cards+'</div>'+
      '<div class="annual-footnote"><span>✦</span> 365 ejercicios por disciplina · 2.920 ejercicios en total · Sin repetir días</div>';
  }

  function renderAnnualPaths(){
    const target=document.getElementById("pathList");
    if(!target)return;
    target.innerHTML=DAY_CATEGORIES.map((m,i)=>
      '<article class="path-card"><div class="path-number">0'+(i+1)+'</div><div><h3>'+escapeHtml(m.title)+'</h3><p>365 ejercicios diferentes, uno por cada día del programa anual.</p><div class="path-tags"><span>365 ejercicios</span><span>'+escapeHtml(m.category)+'</span></div></div><span class="path-action path-static">Día '+Math.min(365,currentProgramDay())+' / 365</span></article>'
    ).join("");
  }

  function renderAnnualHistory(){
    const target=document.getElementById("historyList");
    if(!target)return;
    const dayCount=Math.min(365,currentProgramDay()-1);
    const total=totalProgramExercises();
    const dailyCount=progress.dailyCompleted.length;
    target.innerHTML=
      '<div class="history-row"><span class="history-symbol">◈</span><span><strong>Programa anual</strong><small>'+total+' de 2.920 ejercicios completados · '+dayCount+' días terminados</small></span><span class="history-xp">'+total+' / 2920</span></div>'+
      '<div class="history-row"><span class="history-symbol">✦</span><span><strong>Retos diarios independientes</strong><small>'+dailyCount+' de 365 retos completados</small></span><span class="history-xp">'+dailyCount+' / 365</span></div>';
  }

  function updateUI(){
    const day=currentProgramDay();
    const todayDone=day<=YEAR_LENGTH?programDayCount(day):8;
    const total=totalProgramExercises();
    const percent=Math.round(todayDone/8*100);
    const level=levelInfo(),streak=streakCount();
    setText("xpCount",progress.xp);setText("completedCount",todayDone);setText("levelName",level.name);setText("levelLabel","Día "+(day>YEAR_LENGTH?365:day)+" · "+level.name);
    setText("progressPercent",percent+"%");setWidth("progressBar",percent);
    setText("streakCount",streak);setText("bigXp",progress.xp);setText("bigCompleted",total);setText("bigStreak",streak);setText("bigDisciplines",DAY_CATEGORIES.length);
    setWidth("levelProgressBar",level.percent);
    setText("nextLevelText",progress.xp>=800?"Sigue sumando experiencia en tu programa anual.":(level.next-progress.xp)+" XP para llegar al siguiente nivel.");
    const stats=document.querySelectorAll(".stat-item small");
    if(stats[1])stats[1].textContent="EJERCICIOS DEL DÍA";
    const bigStat=document.querySelector(".progress-mini small");
    if(bigStat)bigStat.textContent="EJERCICIOS COMPLETADOS";
    const completedStat=document.getElementById("bigCompleted");
    if(completedStat)completedStat.textContent=total+" / 2920";
    const course=document.querySelector(".sidebar-course");
    if(course)course.innerHTML='<div class="course-emblem">365</div><div><strong>Programa anual</strong><span>Día '+(day>YEAR_LENGTH?365:day)+' de 365</span></div><span class="course-check">✓</span>';
    const dashboardModules=document.getElementById("dashboardModules");
    if(dashboardModules){
      const d=day>YEAR_LENGTH?365:day;
      dashboardModules.innerHTML=DAY_CATEGORIES.slice(0,4).map((m,i)=>'<article class="module-card annual-mini-card"><div class="module-card-top"><span class="module-symbol">'+m.symbol+'</span><span class="module-index">0'+(i+1)+' / 08</span></div><h3>'+escapeHtml(m.title)+'</h3><p>Ejercicio exclusivo del día '+d+'.</p><div class="module-card-bottom"><span>+30 XP</span><button data-open-exercise="'+m.id+'" data-day="'+d+'">→</button></div></article>').join("");
    }
    const heroButton=document.querySelector(".welcome-row .btn-primary");
    if(heroButton){heroButton.textContent="Continuar día "+(day>YEAR_LENGTH?365:day)+" →";heroButton.removeAttribute("data-open-module");heroButton.setAttribute("data-view","training");}
    renderDailyChallenge();
    renderProgramDay();
    renderAnnualPaths();
    renderAnnualHistory();
  }

  ensureAnnualState();
  updateUI();

})();