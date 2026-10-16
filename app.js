(() => {
const IC={roadmap:'<path d="M5 5h4v4H5zM15 15h4v4h-4zM5 15h4v4H5z"/><path d="M9 7h7a2 2 0 0 1 2 2v1M9 17h6M7 9v6"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>',filter:'<path d="M4 5h16l-6.3 7.1V19l-3.4 1v-7.9z"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',plus:'<path d="M12 5v14M5 12h14"/>',chevron:'<path d="m9 18 6-6-6-6"/>',users:'<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M18 8a4 4 0 0 1 0 7.7M22 20v-2a4 4 0 0 0-3-3.9"/>',flag:'<path d="M5 21V4"/><path d="M5 5h11l-2 4 2 4H5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',check:'<path d="m5 12 4 4L19 6"/>',alert:'<path d="M12 3 2.8 20h18.4z"/><path d="M12 9v4M12 17h.01"/>',link:'<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>',trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',undo:'<path d="m9 7-5 5 5 5"/><path d="M5 12h8a6 6 0 0 1 6 6v1"/>'};
const I=(n,s=18)=>`<svg aria-hidden="true" fill="none" height="${s}" viewBox="0 0 24 24" width="${s}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">${IC[n]}</svg>`;
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T=(name,start,span,duration,status,dep)=>({name,owner:'',role:'',start,span,duration,status,dep});
const phases=[
{id:'01',name:'Descoberta & alinhamento',dates:'14–23 out',color:'amber',tasks:[T('Kickoff e alinhamento de objetivos',1,1,'2 dias','done','—'),T('Mapeamento de stakeholders e riscos',1,2,'4 dias','done','Kickoff'),T('Pesquisa e levantamento de requisitos',1,2,'7 dias','active','Kickoff')]},
{id:'02',name:'Estratégia & definição',dates:'26 out–06 nov',color:'violet',tasks:[T('Síntese de insights e priorização',3,1,'3 dias','planned','Pesquisa'),T('Escopo, métricas e plano de entrega',3,2,'6 dias','planned','Requisitos'),T('Arquitetura da solução',4,2,'5 dias','planned','Escopo')]},
{id:'03',name:'Design & validação',dates:'09–20 nov',color:'blue',tasks:[T('Fluxos e protótipo de alta fidelidade',5,2,'8 dias','planned','Arquitetura'),T('Validação com usuários',6,1,'3 dias','planned','Protótipo'),T('Handoff e refinamento técnico',6,2,'4 dias','planned','Validação')]},
{id:'04',name:'Desenvolvimento',dates:'16 nov–04 dez',color:'green',tasks:[T('Implementação — ciclo 1',6,2,'8 dias','planned','Handoff'),T('Implementação — ciclo 2',7,2,'9 dias','planned','Ciclo 1'),T('QA integrado e correções',8,2,'5 dias','planned','Ciclo 2')]},
{id:'05',name:'Entrega & encerramento',dates:'07–11 dez',color:'coral',tasks:[T('Homologação e aceite final',9,1,'3 dias','planned','QA integrado'),T('Go-live, documentação e retrospectiva',9,1,'2 dias','milestone','Aceite final')]}];
const initial=()=>phases.map(p=>({...p,tasks:p.tasks.map(t=>({...t,risk:t.status==='active'||/validação|homologação/i.test(t.name)}))}));
const weeks=[['OUT','14'],['OUT','19'],['OUT','26'],['NOV','02'],['NOV','09'],['NOV','16'],['NOV','23'],['NOV','30'],['DEZ','07']];
const wk=[[9,14],[9,19],[9,26],[10,2],[10,9],[10,16],[10,23],[10,30],[11,7]].map(([m,d])=>new Date(2026,m,d));
const stL={done:'Concluída',active:'Em andamento',planned:'Planejada',milestone:'Planejada'};
const pageNames={schedule:'Cronograma do projeto',activities:'Atividades',team:'Equipe',risks:'Riscos',shopping:'Lista de Compras',bills:'Contas a Pagar'};
const labels={product:'ReciMap',project:'Lançamento plataforma',projectSubtitle:'Planejamento e execução',pageTitle:'ReciMap - lançamento'};
const period=t=>{const s=wk[t.start-1]??wk[0],en=new Date(s);en.setDate(en.getDate()+(parseInt(t.duration,10)||1)-1);return{start:s,end:en}};
const fd=d=>new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short'}).format(d).replace('.','');
const perPerson=(total,n)=>{if(!n)return'0,00';const v=parseFloat(total.includes(',')?total.replace(/\./g,'').replace(',','.'):total);return Number.isFinite(v)?new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(v/n):'0,00'};
const ld=(k,f)=>{try{const s=localStorage.getItem(k);return s?JSON.parse(s):f}catch{return f}};
const KEYS={schedule:'recimap-schedule',shop:'recimap-shopping-items',bills:'recimap-bill-items',owners:'recimap-owner-history',roles:'recimap-owner-roles'};
const S={schedule:ld(KEYS.schedule,initial()),owners:ld(KEYS.owners,[]),roles:ld(KEYS.roles,{}),shop:ld(KEYS.shop,[]),bills:ld(KEYS.bills,[])};
const ui={section:'schedule',view:'timeline',expanded:phases.map(p=>p.id),q:'',today:false,aOwner:null,aDep:null,open:[],sel:'',hist:[],sync:'loading',af:false};
const API='/api/project-state';
let ready=false,last=null,pend=false,tm=null;

/* ---------- sincronização com o servidor ---------- */
const apply=s=>{S.schedule=s.scheduleData??initial();S.owners=s.ownerHistory??[];S.roles=s.roleDirectory??{};S.shop=s.shoppingItems??[];S.bills=s.billItems??[];persist()};
const persist=()=>{try{localStorage.setItem(KEYS.schedule,JSON.stringify(S.schedule));localStorage.setItem(KEYS.shop,JSON.stringify(S.shop));localStorage.setItem(KEYS.bills,JSON.stringify(S.bills));localStorage.setItem(KEYS.owners,JSON.stringify(S.owners));localStorage.setItem(KEYS.roles,JSON.stringify(S.roles))}catch{}};
async function loadShared(){
  try{const r=await fetch(API);if(!r.ok)throw new Error(r.status);const{state}=await r.json();if(state){last=state.updatedAt??null;apply(state)}ui.sync='saved'}
  catch(err){console.error('Não foi possível carregar o estado compartilhado:',err);ui.sync='error'}
  ready=true;render();setInterval(refresh,3000);
}
async function refresh(){
  if(pend)return;
  try{const r=await fetch(API);if(!r.ok)throw new Error(r.status);const{state}=await r.json();
    if(!state?.updatedAt||state.updatedAt===last)return;
    last=state.updatedAt;apply(state);ui.sync='saved';render()}
  catch(err){console.error('Não foi possível atualizar os dados compartilhados:',err);ui.sync='error';render()}
}
function queueSave(){
  if(!ready)return;ui.sync='saving';pend=true;clearTimeout(tm);
  tm=setTimeout(async()=>{
    try{const r=await fetch(API,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({scheduleData:S.schedule,ownerHistory:S.owners,roleDirectory:S.roles,shoppingItems:S.shop,billItems:S.bills})});
      if(!r.ok)throw new Error(r.status);const j=await r.json();last=j.updatedAt??last;ui.sync='saved'}
    catch(err){console.error('Não foi possível salvar o estado compartilhado:',err);ui.sync='error'}
    pend=false;render();
  },500);
}
const commit=()=>{persist();render();queueSave()};
const snap=()=>{ui.hist=[...ui.hist.slice(-49),JSON.stringify(S)]};
const mut=fn=>{snap();fn();commit()};

/* ---------- ações ---------- */
const lc=s=>s.trim().toLocaleLowerCase();
const mapTask=(ph,i,fn)=>{S.schedule=S.schedule.map(p=>p.id===ph?{...p,tasks:p.tasks.map((t,k)=>k===i?fn(t):t)}:p)};
const upT=(ph,i,f,v)=>mut(()=>mapTask(ph,i,t=>({...t,[f]:v})));
const allT=()=>S.schedule.flatMap(p=>p.tasks);
const assign=(ph,i,owner)=>{const n=lc(owner);const role=S.roles[n]??allT().find(t=>lc(t.owner)===n&&t.role.trim())?.role??'';mut(()=>mapTask(ph,i,t=>({...t,owner,role})))};
const saveOwner=o=>{const c=o.trim();if(!c||S.owners.some(x=>lc(x)===lc(c)))return;S.owners=[...S.owners,c].sort((a,b)=>a.localeCompare(b,'pt-BR'));persist()};
const roleFor=(owner,role)=>{const n=lc(owner);if(!n)return;mut(()=>{S.schedule=S.schedule.map(p=>({...p,tasks:p.tasks.map(t=>lc(t.owner)===n?{...t,role}:t)}));S.roles={...S.roles,[n]:role}})};
const rmOwner=owner=>{const n=lc(owner);if(!n)return;mut(()=>{S.owners=S.owners.filter(x=>lc(x)!==n);const r={...S.roles};delete r[n];S.roles=r;S.schedule=S.schedule.map(p=>({...p,tasks:p.tasks.map(t=>lc(t.owner)===n?{...t,owner:'',role:''}:t)}));ui.aOwner=null})};
const delTask=(ph,i)=>{const nm=S.schedule.find(p=>p.id===ph)?.tasks[i]?.name.trim();mut(()=>{S.schedule=S.schedule.map(p=>({...p,tasks:p.tasks.filter((_,k)=>p.id!==ph||k!==i).map(t=>nm&&lc(t.dep)===lc(nm)?{...t,dep:'—'}:t)}))})};
const addTask=ph=>mut(()=>{S.schedule=S.schedule.map(p=>p.id===ph?{...p,tasks:[...p.tasks,{name:'Nova atividade',owner:'',role:'',start:p.tasks[0]?.start??1,span:1,duration:'1 dia',status:'planned',dep:'—',risk:false}]}:p);if(!ui.expanded.includes(ph))ui.expanded.push(ph)});
const upPhase=(ph,f,v)=>mut(()=>{S.schedule=S.schedule.map(p=>p.id===ph?{...p,[f]:v}:p)});
const upShop=(id,f,v)=>mut(()=>{S.shop=S.shop.map(x=>x.id===id?{...x,[f]:v}:x)});
const upBill=(id,f,v)=>mut(()=>{S.bills=S.bills.map(b=>b.id===id?{...b,[f]:v}:b);if(!ui.open.includes(id))ui.open.push(id)});
const upPerson=(b,p,f,v)=>mut(()=>{S.bills=S.bills.map(x=>x.id===b?{...x,people:x.people.map(q=>q.id===p?{...q,[f]:v}:q)}:x)});

/* ---------- render ---------- */
function view(){
  const sch=S.schedule,all=sch.flatMap(p=>p.tasks.map((t,i)=>({task:t,i,phase:p,...period(t)}))).sort((a,b)=>a.start-b.start);
  const total=all.length,done=all.filter(x=>x.task.status==='done').length,act=all.filter(x=>x.task.status==='active').length;
  const prog=total?Math.round(done/total*100):0,risks=all.filter(x=>x.task.risk);
  const today=new Date();today.setHours(0,0,0,0);
  const q=ui.q.toLowerCase(),sec=ui.section;
  const owners=[...new Set([...S.owners,...allT().map(t=>t.owner.trim())].filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  const ownSug=v=>owners.filter(o=>lc(o).includes(lc(v))&&lc(o)!==lc(v)).slice(0,6);
  const names=[...new Set(allT().map(t=>t.name.trim()).filter(Boolean))];
  const depSug=(n,v)=>{const s=v==='—'?'':lc(v);return names.filter(x=>x!==n&&lc(x).includes(s)).slice(0,7)};
  const bar=t=>{const d=Math.max(1,parseInt(t.duration,10)||1),l=(t.start-1)/weeks.length*100,w=Math.min(d/7/weeks.length*100,100-l);return`left:${l}%;width:${Math.max(w,1.6)}%`};
  const nav=(s,ic,txt,badge)=>`<button class="nav-item ${sec===s?'active':''}" data-a="nav" data-s="${s}">${I(ic)} ${txt}${badge!==undefined?` <span>${badge}</span>`:''}</button>`;
  const filtered=sch.map(p=>({...p,tasks:p.tasks.map((t,i)=>({...t,i})).filter(t=>{const m=`${t.name} ${t.owner}`.toLowerCase().includes(q);if(!ui.today)return m;const{start,end}=period(t);return m&&today>=start&&today<=end})})).filter(p=>p.tasks.length||(!q.trim()&&!ui.today));
  const row=(p,t)=>{const k=`${p.id}-${t.i}`,da=`data-ph="${p.id}" data-i="${t.i}"`,oS=ui.aOwner===k?ownSug(t.owner):[],dS=ui.aDep===k?depSug(t.name,t.dep):[];
    return`<div class="task-row"><div class="task-name"><label class="status-icon ${t.status}" title="Alterar status">${I(t.status==='done'?'check':t.status==='milestone'?'flag':'clock',13)}<select aria-label="Status de ${e(t.name)}" data-f="status" ${da}>${[['planned','Planejada'],['active','Em andamento'],['done','Concluída']].map(([v,l])=>`<option value="${v}" ${(t.status==='milestone'?'planned':t.status)===v?'selected':''}>${l}</option>`).join('')}</select></label>
<div class="editable-stack"><input aria-label="Nome da atividade" class="editable-field task-edit" data-f="name" ${da} value="${e(t.name)}">
<div class="dependency-edit dependency-autocomplete">${I('link',11)}<span>Depende de:</span><input aria-label="Dependência" class="editable-field" data-f="dep" ${da} value="${e(t.dep)}">
${dS.length?`<div class="owner-suggestions dependency-suggestions"><span class="suggestion-label">ATIVIDADES EXISTENTES</span>${dS.map(a=>`<button data-a="pickDep" ${da} data-v="${e(a)}"><span class="suggestion-link">${I('link',12)}</span>${e(a)}</button>`).join('')}</div>`:''}</div></div>
<div class="task-actions"><button aria-label="Marcar risco" class="risk-task-button ${t.risk?'marked':''}" title="${t.risk?'Remover dos riscos':'Marcar como atividade em risco'}" data-a="risk" ${da}>${I('alert',14)}</button><button aria-label="Excluir atividade" class="delete-task-button" title="Excluir atividade" data-a="delTask" ${da}>${I('trash',14)}</button></div></div>
<div class="task-owner"><span class="person-avatar empty-avatar">${I('users',13)}</span><div class="editable-stack owner-autocomplete"><input aria-label="Responsável" class="editable-field owner-edit" placeholder="Definir responsável" data-f="owner" ${da} value="${e(t.owner)}">
${oS.length?`<div class="owner-suggestions"><span class="suggestion-label">RESPONSÁVEIS SALVOS</span>${oS.map(o=>`<div class="suggestion-row"><button class="suggestion-select" data-a="pickOwner" ${da} data-v="${e(o)}"><span class="suggestion-avatar">${e(o.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span>${e(o)}</button><button aria-label="Excluir responsável" class="suggestion-delete" title="Excluir responsável cadastrado" data-a="rmOwner" data-v="${e(o)}">${I('trash',13)}</button></div>`).join('')}</div>`:''}
<input aria-label="Função do responsável" class="editable-field role-edit" placeholder="${t.owner.trim()?'Função':'Defina o responsável'}" ${t.owner.trim()?'':'disabled'} data-f="role" ${da} value="${e(t.role)}"></div></div>
<div class="task-duration"><label class="duration-control"><input aria-label="Duração em dias" class="editable-field duration-edit" type="number" min="1" max="59" data-f="duration" ${da} value="${parseInt(t.duration,10)||1}"><span>dias</span></label></div>
<div class="task-timeline"><div class="grid-lines">${weeks.map(()=>'<i></i>').join('')}</div>${ui.view==='timeline'?`<div class="gantt-bar ${t.status} color-${p.color}" style="${bar(t)}"><span>${t.status==='done'?I('check',12):''}${t.i===0?e(p.name.split(' ')[0]):e(t.duration)}</span></div>`:''}</div></div>`};
  const phase=p=>{const open=ui.expanded.includes(p.id);return`<div class="phase phase-${p.color}"><div class="phase-header"><button aria-label="${open?'Recolher':'Expandir'} fase" class="phase-chevron ${open?'open':''}" data-a="togglePhase" data-ph="${p.id}">${I('chevron',15)}</button><span class="phase-index">${p.id}</span><input aria-label="Nome da fase" class="phase-name phase-name-edit" data-f="phname" data-ph="${p.id}" value="${e(p.name)}"><input aria-label="Período da fase" class="phase-dates phase-dates-edit" data-f="phdates" data-ph="${p.id}" value="${e(p.dates)}"><span class="phase-count">${p.tasks.length} atividades</span><button class="add-task-button" data-a="addTask" data-ph="${p.id}">${I('plus',13)} Adicionar atividade</button></div>${open?p.tasks.map(t=>row(p,t)).join(''):''}${open&&!p.tasks.length?`<div class="empty-phase"><div><strong>Nenhuma atividade nesta fase</strong><span>Adicione uma atividade para continuar o planejamento.</span></div><button data-a="addTask" data-ph="${p.id}">${I('plus',14)} Adicionar atividade</button></div>`:''}</div>`};
  const schedule=`<div class="schedule ${ui.view==='list'?'list-view':''}"><div class="schedule-head"><div class="activity-column">FASE / ATIVIDADE</div><div class="owner-column">RESPONSÁVEL</div><div class="duration-column">DURAÇÃO</div><div class="week-grid">${weeks.map(([m,d],i)=>`<div class="${i===0?'current':''}"><small>${m}</small><strong>${d}</strong></div>`).join('')}</div></div><div class="schedule-body">${filtered.map(phase).join('')}${filtered.length?'':`<div class="empty-state">${ui.today?`Não há atividades previstas ou entregas para hoje, ${fd(today)}.`:`Nenhuma atividade encontrada para “${e(ui.q)}”.`}</div>`}</div></div>`;
  const match=x=>`${x.task.name} ${x.task.owner}`.toLowerCase().includes(q);
  const ov={
    activities:`<div class="overview-list">${all.filter(match).map(({task:t,phase:p,start,end})=>`<div class="overview-row"><div class="date-block"><strong>${fd(start)}</strong><span>até ${fd(end)}</span></div><span class="status-icon ${t.status}">${I(t.status==='done'?'check':'clock',13)}</span><div class="overview-copy"><strong>${e(t.name)}</strong><span>${e(p.name)} · ${e(t.owner||'Sem responsável')}</span></div><span class="status-pill ${t.status}">${stL[t.status]}</span></div>`).join('')}</div>`,
    team:`<div class="team-grid">${[...new Set(all.map(x=>x.task.owner.trim()||'Sem responsável'))].filter(o=>o.toLowerCase().includes(q)).map(o=>{const ts=all.filter(x=>(x.task.owner.trim()||'Sem responsável')===o);return`<section class="person-card"><div class="person-head"><span class="person-avatar">${I('users',14)}</span><div><strong>${e(o)}</strong><span>${ts.length} ${ts.length===1?'atividade':'atividades'}</span></div>${o!=='Sem responsável'?`<button aria-label="Excluir responsável" class="person-delete" title="Excluir responsável cadastrado" data-a="rmOwner" data-v="${e(o)}">${I('trash',14)}</button>`:''}</div><div class="person-tasks">${ts.map(({task:t,phase:p,start})=>`<div><i class="dot ${t.status==='milestone'?'planned':t.status}"></i><span><strong>${e(t.name)}</strong><small>${fd(start)} · ${e(p.name)}</small></span></div>`).join('')}</div></section>`}).join('')}</div>`,
    risks:`<div class="risk-list"><div class="risk-summary-card">${I('alert',20)}<div><strong>${risks.length} atividades requerem atenção</strong><span>Revise responsáveis, dependências e prazos para reduzir impactos na entrega.</span></div></div>${risks.filter(match).map(({task:t,phase:p,end})=>`<div class="risk-row"><span class="risk-indicator">${I('alert',15)}</span><div class="overview-copy"><strong>${e(t.name)}</strong><span>${e(p.name)} · ${e(t.owner||'Sem responsável')}</span></div><div class="risk-due"><span>Prazo</span><strong>${fd(end)}</strong></div></div>`).join('')}</div>`,
    shopping:`<div class="shopping-module"><div class="shopping-head"><div><strong>Itens para comprar</strong><span>${S.shop.length} ${S.shop.length===1?'item cadastrado':'itens cadastrados'}</span></div><button class="shopping-add" data-a="addShop">${I('plus',14)} Adicionar item</button></div>${S.shop.length?`<div class="shopping-table"><div class="shopping-table-head"><span>NOME</span><span>LINK</span><span>VALOR</span><span>STATUS</span><span></span></div>${S.shop.map((x,i)=>`<div class="shopping-row ${x.purchased?'purchased':''}"><label><small>Nome</small><input ${ui.af&&i===S.shop.length-1&&!x.name?'data-af':''} placeholder="Nome do item" data-f="sname" data-id="${x.id}" value="${e(x.name)}"></label><label class="shopping-link-field"><small>Link</small><input placeholder="https://" type="url" data-f="slink" data-id="${x.id}" value="${e(x.link)}">${x.link.trim()?`<a aria-label="Abrir link" href="${e(/^https?:\/\//i.test(x.link)?x.link:'https://'+x.link)}" target="_blank" rel="noreferrer" title="Abrir link em uma nova aba">${I('link',13)}</a>`:''}</label><label class="value-field"><small>Valor</small><span>R$</span><input inputmode="decimal" placeholder="0,00" data-f="svalue" data-id="${x.id}" value="${e(x.value)}"></label><button class="purchase-toggle ${x.purchased?'done':''}" data-a="buy" data-id="${x.id}"><span>${I(x.purchased?'check':'clock',13)}</span>${x.purchased?'Comprado':'Pendente'}</button><button aria-label="Excluir item" class="shopping-delete" data-a="delShop" data-id="${x.id}">${I('trash',14)}</button></div>`).join('')}</div>`:`<div class="shopping-empty"><span class="module-icon">${I('table',22)}</span><strong>Sua lista está vazia</strong><p>Adicione o primeiro item que precisa ser comprado.</p><button data-a="addShop">${I('plus',14)} Adicionar item</button></div>`}</div>`,
    bills:`<div class="bills-module"><div class="bills-import"><div><strong>Contas a pagar</strong><span>Importe um item da Lista de Compras para dividir e acompanhar os pagamentos.</span></div><div class="import-controls"><select aria-label="Item da Lista de Compras" data-f="sel"><option value="">Selecionar item...</option>${S.shop.map(x=>`<option value="${x.id}" ${String(x.id)===ui.sel?'selected':''}>${e(x.name||'Item sem nome')}${x.value?` · R$ ${e(x.value)}`:''}</option>`).join('')}</select><button ${ui.sel?'':'disabled'} data-a="importBill">${I('plus',14)} Importar item</button></div></div>${S.bills.length?`<div class="bill-list">${S.bills.map(b=>{const open=ui.open.includes(b.id),paid=b.people.filter(p=>p.paid).length;return`<section class="bill-card"><div class="bill-card-head"><button aria-label="Mostrar pessoas" class="bill-chevron ${open?'open':''}" data-a="toggleBill" data-id="${b.id}">${I('chevron',15)}</button><div class="bill-title"><strong>${e(b.name)}</strong><span>${b.people.length?`${paid} de ${b.people.length} pagamentos realizados`:'Nenhuma pessoa adicionada'}</span></div><label class="bill-detail-field purchaser-field"><small>RESPONSÁVEL PELA COMPRA</small><input placeholder="Nome da pessoa" data-f="purchaser" data-id="${b.id}" value="${e(b.purchaser)}"></label><label class="pix-field"><small>PIX</small><input placeholder="Chave Pix" data-f="pix" data-id="${b.id}" value="${e(b.pix)}"></label><label class="bill-detail-field bill-amount-field total-amount-field"><small>VALOR TOTAL</small><span>R$</span><input inputmode="decimal" placeholder="0,00" data-f="bvalue" data-id="${b.id}" value="${e(b.value)}"></label><label class="bill-detail-field bill-amount-field calculated-amount-field"><small>VALOR POR PESSOA</small><span>R$</span><input aria-label="Valor calculado por pessoa" readonly value="${perPerson(b.value,b.people.length)}"></label><button class="bill-delete" aria-label="Excluir conta" data-a="delBill" data-id="${b.id}">${I('trash',14)}</button></div>${open?`<div class="bill-people"><div class="people-head"><div>${I('users',15)}<strong>Pessoas</strong></div><button data-a="addPerson" data-id="${b.id}">${I('plus',13)} Adicionar pessoa</button></div>${b.people.length?b.people.map((p,i)=>`<div class="person-payment-row"><span class="suggestion-avatar">${p.name?e(p.name.slice(0,2).toUpperCase()):i+1}</span><input ${ui.af&&i===b.people.length-1&&!p.name?'data-af':''} placeholder="Nome da pessoa" data-f="pname" data-id="${b.id}" data-p="${p.id}" value="${e(p.name)}"><button class="payment-toggle ${p.paid?'paid':''}" data-a="togglePaid" data-id="${b.id}" data-p="${p.id}">${I(p.paid?'check':'clock',13)}${p.paid?'Já paguei':'Ainda não paguei'}</button><button class="person-payment-delete" aria-label="Excluir pessoa" data-a="delPerson" data-id="${b.id}" data-p="${p.id}">${I('trash',13)}</button></div>`).join(''):'<div class="people-empty">Adicione as pessoas que participarão deste pagamento.</div>'}</div>`:''}</section>`}).join('')}</div>`:`<div class="bills-empty"><span class="module-icon">${I('calendar',22)}</span><strong>Nenhuma conta importada</strong><p>${S.shop.length?'Selecione um item da Lista de Compras acima.':'Adicione itens na Lista de Compras para importá-los aqui.'}</p></div>`}</div>`};
  const sl={loading:'Carregando dados...',saving:'Salvando...',saved:'Salvo no servidor',error:'Erro ao sincronizar'}[ui.sync];
  const ctx={team:['users','Atividades por pessoa'],risks:['alert','Atividades em risco'],bills:['calendar','Contas a Pagar'],activities:['table','Todas as atividades'],shopping:['table','Lista de Compras']}[sec];
  return`<main class="app-shell"><header class="topbar"><div class="brand"><span class="brand-mark"><img src="cesar-logo.png" alt="CESAR School"></span><strong class="brand-product-name">${labels.product}</strong><span class="slash">/</span><strong class="current-page-name">${pageNames[sec]}</strong></div><div class="top-actions"><button aria-label="Desfazer última ação" class="undo-button" ${ui.hist.length?'':'disabled'} title="${ui.hist.length?'Desfazer última ação':'Nenhuma ação para desfazer'}" data-a="undo">${I('undo',17)}<span>Desfazer</span></button><span class="saved sync-${ui.sync}"><span class="saved-dot"></span>${sl}</span></div></header>
<section class="workspace"><aside class="sidebar"><div class="sidebar-heading"><span class="eyebrow">PROJETO</span><strong class="project-name-fixed">${labels.project}</strong><span class="project-subtitle-fixed">${labels.projectSubtitle}</span></div><nav class="side-nav" aria-label="Navegação do projeto">${nav('schedule','roadmap','Cronograma',total)}${nav('activities','table','Atividades')}${nav('team','users','Equipe')}${nav('risks','alert','Riscos',risks.length)}<div class="nav-divider"></div>${nav('shopping','table','Lista de Compras')}${nav('bills','calendar','Contas a Pagar')}</nav>
<div class="project-card"><div class="card-label">${I('flag',15)} Progresso geral</div><div class="progress-number"><strong>${prog}%</strong><span>do projeto</span></div><div class="progress-track"><span style="width:${prog}%"></span></div><div class="date-pair"><div><span>Início</span><strong>14 out 2026</strong></div><div><span>Entrega</span><strong>11 dez 2026</strong></div></div></div>
<div class="sidebar-footer"><div class="legend-title">STATUS</div><span><i class="dot done"></i>Concluído</span><span><i class="dot active"></i>Em andamento</span><span><i class="dot planned"></i>Planejado</span></div></aside>
<section class="content"><div class="page-head"><div><div class="title-row"><h1 class="page-title-fixed">${labels.pageTitle}</h1><span class="status-badge">NO PRAZO</span></div><p>14 de outubro a 11 de dezembro de 2026 <span>•</span> 9 semanas <span>•</span> ${total} atividades</p></div><div class="summary"><div><span>${done}</span><small>Concluídas</small></div><div><span>${act}</span><small>Em andamento</small></div><div><span>${total-done-act}</span><small>Planejadas</small></div></div></div>
<div class="toolbar">${sec==='schedule'?`<div class="view-switch"><button class="${ui.view==='timeline'?'selected':''}" data-a="view" data-v="timeline">${I('calendar',16)} Timeline</button><button class="${ui.view==='list'?'selected':''}" data-a="view" data-v="list">${I('table',16)} Lista</button></div>`:`<div class="section-context">${I(ctx[0],16)}${ctx[1]}</div>`}<div class="toolbar-actions"><label class="search-box">${I('search',16)}<input data-f="q" value="${e(ui.q)}" placeholder="${sec==='team'?'Buscar pessoa...':'Buscar atividade...'}"></label><button class="${sec==='risks'?'tool-button active-filter':'tool-button'}" data-a="nav" data-s="${sec==='risks'?'schedule':'risks'}">${I('filter',16)} Riscos ${sec==='risks'?`<b>${risks.length}</b>`:''}</button><button class="${ui.today?'today-button active-filter':'today-button'}" data-a="today">Hoje</button></div></div>
${ui.today&&sec==='schedule'?`<div class="today-banner">${I('calendar',16)}<span>Exibindo atividades previstas para hoje, ${fd(today)}.</span><button data-a="clearToday">Limpar filtro</button></div>`:''}
${sec==='schedule'?schedule:`<div class="overview-panel">${ov[sec]}</div>`}
<footer class="content-footer"><span>${I('flag',14)} Próximo marco: <strong>Aprovação de requisitos</strong> em 23 de outubro</span><span>Última revisão: 14 out 2026</span></footer></section></section></main>`;
}

/* ---------- morph: atualiza o DOM sem perder foco nos inputs ---------- */
function morph(a,b){
  if(a.nodeType!==b.nodeType||a.nodeName!==b.nodeName){a.replaceWith(b.cloneNode(true));return}
  if(a.nodeType===3){if(a.data!==b.data)a.data=b.data;return}
  for(const{name}of[...a.attributes])if(!b.hasAttribute(name))a.removeAttribute(name);
  for(const{name,value}of b.attributes)if(a.getAttribute(name)!==value)a.setAttribute(name,value);
  if(a.nodeName==='INPUT'){const v=b.getAttribute('value')??'';if(a.value!==v)a.value=v;return}
  const ac=[...a.childNodes],bc=[...b.childNodes];
  bc.forEach((n,i)=>ac[i]?morph(ac[i],n):a.appendChild(n.cloneNode(true)));
  ac.slice(bc.length).forEach(n=>n.remove());
  if(a.nodeName==='SELECT'){const o=b.querySelector('option[selected]');a.value=o?o.value:''}
}
const root=document.getElementById('root');
function render(){
  const t=document.createElement('template');t.innerHTML=view();
  if(root.firstElementChild)morph(root.firstElementChild,t.content.firstElementChild);else root.appendChild(t.content);
  const af=root.querySelector('[data-af]');if(af&&ui.af){af.focus();ui.af=false}
}

/* ---------- eventos ---------- */
const D=el=>el.dataset,num=v=>Number(v);
root.addEventListener('click',ev=>{
  const el=ev.target.closest('[data-a]');if(!el)return;const d=D(el),a=d.a;
  const ph=d.ph,i=num(d.i),id=num(d.id);
  if(a==='nav'){ui.section=d.s}
  else if(a==='view'){ui.view=d.v}
  else if(a==='today'){ui.section='schedule';ui.today=!ui.today}
  else if(a==='clearToday'){ui.today=false}
  else if(a==='togglePhase'){ui.expanded=ui.expanded.includes(ph)?ui.expanded.filter(x=>x!==ph):[...ui.expanded,ph]}
  else if(a==='toggleBill'){ui.open=ui.open.includes(id)?ui.open.filter(x=>x!==id):[...ui.open,id]}
  else if(a==='undo'){const s=ui.hist.at(-1);if(!s)return;Object.assign(S,JSON.parse(s));ui.hist=ui.hist.slice(0,-1);ui.aOwner=ui.aDep=null;return commit()}
  else if(a==='addTask')return addTask(ph);
  else if(a==='delTask')return delTask(ph,i);
  else if(a==='risk')return mut(()=>mapTask(ph,i,t=>({...t,risk:!t.risk})));
  else if(a==='rmOwner')return rmOwner(d.v);
  else if(a==='addShop'){ui.af=true;return mut(()=>{S.shop=[...S.shop,{id:Date.now(),name:'',link:'',value:'',purchased:false}]})}
  else if(a==='buy'){const x=S.shop.find(s=>s.id===id);return upShop(id,'purchased',!x.purchased)}
  else if(a==='delShop')return mut(()=>{S.shop=S.shop.filter(x=>x.id!==id)});
  else if(a==='importBill'){const src=S.shop.find(x=>x.id===num(ui.sel));if(!src)return;const nid=Date.now();ui.open.push(nid);ui.sel='';return mut(()=>{S.bills=[...S.bills,{id:nid,shoppingItemId:src.id,name:src.name||'Item sem nome',value:src.value,purchaser:'',pix:'',people:[]}]})}
  else if(a==='addPerson'){ui.af=true;return mut(()=>{S.bills=S.bills.map(b=>b.id===id?{...b,people:[...b.people,{id:Date.now(),name:'',paid:false}]}:b)})}
  else if(a==='togglePaid'){const p=S.bills.find(b=>b.id===id).people.find(x=>x.id===num(d.p));return upPerson(id,num(d.p),'paid',!p.paid)}
  else if(a==='delPerson')return mut(()=>{S.bills=S.bills.map(b=>b.id===id?{...b,people:b.people.filter(p=>p.id!==num(d.p))}:b)});
  else if(a==='delBill')return mut(()=>{S.bills=S.bills.filter(b=>b.id!==id);ui.open=ui.open.filter(x=>x!==id)});
  render();
});
// sugestões usam mousedown para não tirar o foco do campo
root.addEventListener('mousedown',ev=>{
  const el=ev.target.closest('[data-a="pickOwner"],[data-a="pickDep"],[data-a="rmOwner"].suggestion-delete');if(!el)return;
  ev.preventDefault();const d=D(el);
  if(d.a==='pickOwner'){ui.aOwner=null;assign(d.ph,num(d.i),d.v)}
  else if(d.a==='pickDep'){ui.aDep=null;upT(d.ph,num(d.i),'dep',d.v)}
  else{ev.stopPropagation();rmOwner(d.v)}
});
root.addEventListener('click',ev=>{if(ev.target.closest('.suggestion-delete'))ev.stopImmediatePropagation()},true);
root.addEventListener('input',ev=>{
  const t=ev.target,d=D(t),f=d.f,v=t.value;if(!f||t.tagName==='SELECT')return;
  const ph=d.ph,i=num(d.i),id=num(d.id);
  if(f==='q'){ui.q=v;return render()}
  if(f==='name'||f==='dep')return upT(ph,i,f,v);
  if(f==='duration')return upT(ph,i,'duration',`${Math.max(1,Number(v))} dias`);
  if(f==='owner')return assign(ph,i,v);
  if(f==='role')return roleFor(S.schedule.find(p=>p.id===ph).tasks[i].owner,v);
  if(f==='phname')return upPhase(ph,'name',v);
  if(f==='phdates')return upPhase(ph,'dates',v);
  if(f==='sname')return upShop(id,'name',v);
  if(f==='slink')return upShop(id,'link',v);
  if(f==='svalue')return upShop(id,'value',v);
  if(f==='purchaser')return upBill(id,'purchaser',v);
  if(f==='pix')return upBill(id,'pix',v);
  if(f==='bvalue')return upBill(id,'value',v);
  if(f==='pname')return upPerson(id,num(d.p),'name',v);
});
root.addEventListener('change',ev=>{
  const t=ev.target;if(t.tagName!=='SELECT')return;const d=D(t);
  if(d.f==='status')upT(d.ph,num(d.i),'status',t.value);
  else if(d.f==='sel'){ui.sel=t.value;render()}
});
root.addEventListener('focusin',ev=>{
  const t=ev.target,d=D(t);
  if(d.f==='owner'){ui.aOwner=`${d.ph}-${d.i}`;render()}
  else if(d.f==='dep'){ui.aDep=`${d.ph}-${d.i}`;render()}
});
root.addEventListener('focusout',ev=>{
  const t=ev.target,d=D(t);
  if(d.f==='dep')setTimeout(()=>{if(ui.aDep===`${d.ph}-${d.i}`){ui.aDep=null;render()}},120);
  if(d.f==='owner'){
    const box=t.closest('.owner-autocomplete'),nx=ev.relatedTarget;
    saveOwner(t.value);assign(d.ph,num(d.i),t.value);
    if(!(nx instanceof Node)||!box.contains(nx)){ui.aOwner=null;render()}
  }
});

render();
loadShared();
})();
