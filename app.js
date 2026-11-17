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

  updateUI();
})();