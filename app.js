const navItems = [
  {label:'Dashboard',hash:'dashboard'}, {label:'Clients',hash:'clients'},
  {label:'Mortgages',key:'mortgages',children:[['Initial Stage','initial-stage'],['Active Prospect','active-prospect'],['Submitted','submitted'],['Offered','offered'],['Completed','completed'],['Not Proceeding','not-proceeding']]},
  {label:'Remortgages',key:'remortgages',children:[['Initial Stage','initial-stage'],['Active Prospect','active-prospect'],['Submitted','submitted'],['Offered','offered'],['Completed','completed'],['Opted Out','opted-out'],['Not Proceeding','not-proceeding']]},
  {label:'Protection',key:'protection',children:[['Initial Stage','initial-stage'],['Active Prospect','active-prospect'],['Submitted','submitted'],['On Risk','on-risk'],['Replaced','replaced'],['Not Proceeding','not-proceeding']]},
  {label:'Tasks',hash:'tasks'}, {label:'Introducers',hash:'introducers'},
  {label:'Reports',key:'reports',children:[['Introducers','introducer-report'],['Management','management-report'],['Midas','midas-report']]},
  {label:'MAB Users',hash:'users'}
];

const routes = {};
navItems.forEach(i => i.children?.forEach(([label,slug]) => routes[`${i.key}-${slug}`]={family:i.key,title:label,parent:i.label}));

const mortgageColumns = {
  'initial-stage':['Type','Advisor','Client','Created','Introducer','Reference','Appointment','Proceeding','Last Action','Tasks','Status'],
  'active-prospect':['Type','Advisor','Client','Created','Introducer','Reference','Fact Find','Last Action','Tasks','Status'],
  submitted:['Type','Advisor','Client','Introducer','Reference','Lender Ref.','Lender','Submitted','Valuation Status','H2B','Last Action','Tasks','Status'],
  offered:['Type','Advisor','Client','Introducer','Reference','Lender Ref.','Lender','Submitted','Offer Expiry','H2B','Last Action','Tasks','Status'],
  completed:['Type','Advisor','Client','Introducer','Reference','Lender Ref.','Lender','Completion','Product End','Last Action','Tasks','Status'],
  'not-proceeding':['Type','Advisor','Client','Introducer','Reference','Last Action','Tasks','Status']
};
const remortgageColumns = {
  'initial-stage':['Advisor','Client','Ending In','Last Action','Months to End Date','Status'],
  'active-prospect':['Type','Advisor','Client','Existing Lender','Lender Ref','Ending In','Fact Find','Last Action','Tasks','Status'],
  submitted:['Type','Advisor','Client','Introducer','Reference','Existing Lender','Lender Ref','Submitted','Valuation Status','H2B','Last Action','Tasks','Status'],
  offered:['Type','Advisor','Client','Reference','Existing Lender','New Lender','Offer Expiry','Last Action','Tasks','Status'],
  completed:['Type','Advisor','Client','Reference','Lender','Completion','Product End','Last Action','Tasks','Status'],
  'opted-out':['Advisor','Client','Existing Lender','Ending In','Last Action','Status'],
  'not-proceeding':['Type','Advisor','Client','Reference','Last Action','Tasks','Status']
};
const protectionColumns = {
  'initial-stage':['Advisor','Client','MAB Ref','Created','Waiting On','Appointment','Last Action','Tasks','Status'],
  'active-prospect':['Advisor','Client','MAB Ref','Created','Fact Find','Last Action','Tasks','Status'],
  submitted:['Advisor','Client','MAB Ref','Created','Submitted','Applications','Last Action','Tasks','Status'],
  'on-risk':['Advisor','Client','MAB Ref','Provider','Premium','On Risk','Last Action','Tasks','Status'],
  replaced:['Advisor','Client','MAB Ref','Provider','Replaced By','Last Action','Status'],
  'not-proceeding':['Advisor','Client','MAB Ref','Created','Last Action','Tasks','Status']
};

const clients = [
  ['Abbey Smith','abbey.smith@example.com','+44 7888 888888','6 Mar 2026','12 Sep 2026'],['Adam Jones','adam.jones@example.com','+44 7123 456789','23 Sep 2025','11 Sep 2026'],['Amiee Downing','amiee.downing@example.com','+44 7495 496669','26 Aug 2026','26 Aug 2026'],['Amy Read','amy.read@example.com','+44 7888 456123','6 Mar 2026','18 Aug 2026'],['Anna Herbert','anna.herbert@example.com','+44 7738 732784','10 Oct 2025','15 Aug 2026'],['Barney Ellinas','barney.ellinas@example.com','+44 7923 649944','29 Jun 2026','2 Aug 2026'],['Claire Smith','claire.smith@example.com','+44 7789 667890','2 Jul 2026','29 Jul 2026'],['Daniel Gibbs','daniel.gibbs@example.com','+44 7939 457222','4 May 2026','18 Jul 2026']
];
const caseNames=['Peter Heron','New Buyer','Scott McKeand','Fallon Test','Ivan Sevcik','John Scott'];

const navigation=document.querySelector('#navigation');
navigation.innerHTML=navItems.map(item=>item.children?`<div class="nav-group" data-group="${item.key}"><button class="nav-parent">${item.label}<span class="arrow">⌄</span></button><div class="subnav">${item.children.map(([label,slug])=>`<a class="nav-link" href="#${item.key}-${slug}">${label}</a>`).join('')}</div></div>`:`<a class="nav-link" href="#${item.hash}">${item.label}</a>`).join('');
navigation.addEventListener('click',e=>{const p=e.target.closest('.nav-parent');if(p)p.closest('.nav-group').classList.toggle('open')});

const days='<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>';
const spark='<div class="sparkline"><svg viewBox="0 0 260 40" preserveAspectRatio="none"><path d="M0 30 L88 30"/><circle cx="88" cy="30" r="2.7"/></svg></div><div class="days">'+days+'</div>';
const mortgageCards=[['Mortgages Submitted','0','⌂'],['Mortgages Completed','0','◆'],['Loan Amount Submitted','£0m','▤'],['Offers Obtained','0','⚑'],['Fact Finds Requested','0','▥'],['Appointments Booked','0','▣']];
const protectionCards=[['Protection Submitted','0','◇'],['Applications on Risk','0','◈'],['Fact Finds Requested','0','▥'],['Appointments Booked','0','▣']];
const card=([name,value,icon])=>`<button class="metric-card" data-name="${name}" data-value="${value}"><span class="metric-head"><span class="icon-tile">${icon}</span><span><span class="metric-name">${name}</span><span class="metric-value">${value}</span></span></span>${spark}</button>`;

let dropdownId=0;
function dropdown(label,options,small=''){const id='dd-'+(++dropdownId);return `<div class="filter-wrap ${small}"><button class="filter" data-filter="${id}">${label}<span>⌄</span></button><div class="menu" data-menu="${id}">${options.map(o=>`<button>${o}</button>`).join('')}</div></div>`}
function dashboardTopbar(){return `<div class="dashboard-filters">${dropdown('General',['General','New Business','Protection'],'compact')}${dropdown('All Advisors',['All Advisors','Darran Brindley','Sarah Taylor','Michael Davis'])}${dropdown('This Week',['This Week','Last Week','This Month','This Quarter'])}</div>`}
function breadcrumb(parent,title,action=''){return `<div class="crumb"><b>${parent}</b>${title?`<span>›</span><b>${title}</b>`:''}</div>${action?`<button class="top-action" data-add="${action}"><span>＋</span>${action}</button>`:''}`}
function dashboard(){return `<section class="section-title-row"><h1 class="section-heading">Mortgages</h1><span class="live">LIVE</span></section><button class="hero-card" data-name="Referrals Received" data-value="0"><span class="label">Referrals Received</span><span class="hero-metric"><strong>0</strong>${spark}</span></button><div class="metric-grid">${mortgageCards.map(card).join('')}</div><h2 class="section-heading protection">Protection</h2><div class="metric-grid wide">${[['Premium Submitted','£0'],['Premium on Risk','£0']].map(x=>`<button class="metric-card" data-name="${x[0]}" data-value="${x[1]}"><span class="metric-name">${x[0]}</span><span class="metric-value">${x[1]}</span>${spark}</button>`).join('')}</div><div class="metric-grid lower-grid">${protectionCards.map(card).join('')}</div>`}

function tools(search,extras=''){return `<div class="list-tools"><label class="search-box">⌕<input data-search placeholder="${search}"></label>${extras}</div>`}
function pager(count){return `<div class="pager"><span>Showing 1 - ${count} of ${count}</span><span class="pages">‹‹　‹　<b>1</b>　›　››</span></div>`}
function table(headers,rows,empty=false){return `<div class="data-table"><table><thead><tr>${headers.map((h,i)=>`<th>${h}${i===0?' ↑':''}</th>`).join('')}</tr></thead><tbody>${empty?`<tr><td colspan="${headers.length}" class="empty">No results</td></tr>`:rows.map((r,ri)=>`<tr data-record="${ri}">${headers.map((_,i)=>`<td>${r[i]??'—'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function clientsScreen(){return `${tools('Search clients …','<button class="export">Export CSV ⇩</button>')}${table(['Name','Email','Phone','Date Added','Last Activity'],clients)}${pager(clients.length)}`}

function caseRows(headers,stage){return caseNames.map((name,i)=>headers.map(h=>{
  if(h==='Type')return `<span class="case-type">${i%3===0?'↔':'⌂'}</span>`; if(h==='Advisor')return i%2?'<span class="avatar tiny">DB</span>':'—'; if(h==='Client')return `<b>${name}</b>`; if(h.includes('Ref'))return `MAB26${String(i+1).padStart(3,'0')}X`; if(['Created','Submitted','Completion','On Risk'].includes(h))return `${5+i} Sep 2026`; if(['Lender','Existing Lender','New Lender','Provider'].includes(h))return ['Halifax','Nationwide','Aviva'][i%3]; if(h==='Introducer')return i%2?'Dashly':'Direct'; if(h==='Premium')return `£${42+i*8}.50`; if(h==='Applications')return '<span class="dots">○ ○ ○</span>'; if(h==='Months to End Date')return '<span class="timeline-mini"><i></i><i></i><i></i><i></i></span>'; if(h==='Tasks')return i%2?'1 <em>!</em>':'—'; if(h==='Status')return `<span class="status ${stage==='not-proceeding'?'closed':''}">${stage==='initial-stage'?'Not Assigned':stage.replaceAll('-',' ')}</span>`; if(['Proceeding','Fact Find','Appointment','H2B','Valuation Status'].includes(h))return '<span class="ring"></span>'; if(h==='Last Action')return `${i+1} mth${i?'s':''} ago`; if(['Ending In','Product End','Offer Expiry'].includes(h))return `${i+2} mths`; return '—';
}));}
function pipelineScreen(family,stage){const map=family==='mortgages'?mortgageColumns:family==='remortgages'?remortgageColumns:protectionColumns;const headers=map[stage],rows=caseRows(headers,stage),label=family==='protection'?'protection':family;const assigned='<label class="switch-label">Assigned to Me<input type="checkbox"><i></i></label>';return `${family==='remortgages'?gauges():''}${tools(`Search ${label} …`,assigned)}<div class="export-row"><button class="export">Export CSV ⇩</button></div>${table(headers,rows)}${pager(rows.length)}`}
function gauges(){return `<div class="gauge-grid">${[['12 months','0','green'],['9 months','0','mint'],['5 months','0','gold'],['3 months','1','orange'],['Less than 1 month','4','red']].map(([l,n,c])=>`<article><div class="gauge ${c}"><i></i></div><strong>${n}</strong><span>${l}</span></article>`).join('')}</div>`}

function tasksScreen(){return `<div class="tabs" data-tabs><button class="active">My Tasks</button><button>Delegated Tasks</button><button>Team Tasks</button></div>${tools('Search tasks …','<label class="switch-label">View Completed<input type="checkbox"><i></i></label>')}<div class="item-count">Items:　<b>10</b>　20　30　100</div>${table(['Type','Creation Date','Creator','Client','Summary','Deadline'],[],true)}${pager(0)}`}
function directoryScreen(type){const isUser=type==='users';const heads=isUser?['Name','User Type','Email','2FA','Office 365','Twenty7tec','Line Manager','Last Login']:['Introducer Name','Type','Fees Waived','Contact Name','Last Login','Active Referrals'];const rows=(isUser?clients.slice(0,6):clients.slice(2,8)).map((r,i)=>isUser?[r[0],i%2?'Advisor':'Administrator',r[1],'<span class="yes">Yes</span>','Connected','Connected',i%2?'Darran Brindley':'—',r[4]]:[r[0],i%2?'Estate Agent':'Referral Partner',i%3?'No':'Yes',caseNames[i],r[4],String(3+i)]);return `${tools(`Search ${isUser?'users':'introducers'} …`)}<div class="item-count">Items:　10　20　30　<b>100</b></div>${table(heads,rows)}${pager(rows.length)}`}

function introducerReport(){return `<div class="report-tabs tabs"><button class="active">Summary</button><button>Divisions</button></div><div class="report-empty"><div class="report-selects">${dropdown('Select Introducer',['Dashly','MAB Central','Direct'])}${dropdown('Monthly',['Monthly','Quarterly','Annual'])}${dropdown('Year to Date',['Year to Date','Previous Year'])}</div><p>Select an Introducer to see reports.</p></div>`}
function managementReport(){return `${reportPanel('⌂','Mortgages',['Export All Mortgages','Export Report'],['New Business Applications','Remortgages','Value of Lending','Resubmissions','Value of Lending (Resub)'])}${reportPanel('◇','Protection',['Export On Risk Applications','Export All Cases','Export Report'],['Applications','Clients Sold to','Value of Premiums','Total Premium On Risk'])}`}
function reportPanel(icon,title,exports,columns){return `<section class="report-panel"><header><span class="report-icon">${icon}</span><h2>${title}</h2><span class="panel-caret">⌄</span></header><div class="panel-exports">${exports.map(x=>`<button>${x} ⇩</button>`).join('')}</div>${table(columns,[],true)}</section>`}
function midasReport(){return `<section class="report-panel midas"><header><span class="report-icon pink">M</span><h2>Failed to Export</h2><span class="panel-caret">⌄</span></header><div class="panel-exports"><button>Export Failed Protection Cases ⇩</button><button>Export Failed Mortgage Cases ⇩</button></div></section>`}

function setHeader(route){const top=document.querySelector('#topbar');if(route==='dashboard'){top.innerHTML=dashboardTopbar();top.className='topbar dashboard-topbar';return}top.className='topbar';if(route==='clients')top.innerHTML=breadcrumb('Clients','','Add Client');else if(route==='tasks')top.innerHTML=breadcrumb('Tasks');else if(route==='introducers')top.innerHTML=breadcrumb('Introducers','','Add Introducer');else if(route==='users')top.innerHTML=breadcrumb('MAB Users','','Add MAB User');else if(route==='reports-management-report')top.innerHTML=breadcrumb('Reports','Management')+dropdown('This Week',['This Week','Last Week','This Month','This Quarter']);else if(route.endsWith('-report'))top.innerHTML=breadcrumb('Reports',routes[route]?.title||route.split('-')[0].replace(/^./,x=>x.toUpperCase()));else{const x=routes[route];top.innerHTML=breadcrumb(x.parent,x.title,x.family==='mortgages'?'Add Referral':x.family==='protection'?'Add Protection':'')}}
function setNav(route){document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.hash==='#'+route));document.querySelectorAll('.nav-group').forEach(g=>g.classList.toggle('open',route.startsWith(g.dataset.group+'-')))}
function render(){const route=(location.hash||'#dashboard').slice(1);setHeader(route);setNav(route);let html='';if(route==='dashboard')html=dashboard();else if(route==='clients')html=clientsScreen();else if(route==='tasks')html=tasksScreen();else if(route==='introducers'||route==='users')html=directoryScreen(route);else if(route==='reports-introducer-report')html=introducerReport();else if(route==='reports-management-report')html=managementReport();else if(route==='reports-midas-report')html=midasReport();else if(routes[route]){const x=routes[route];html=pipelineScreen(x.family,route.replace(x.family+'-',''))}else html='<div class="empty-state"><h1>Screen not found</h1><a href="#dashboard">Return to dashboard</a></div>';document.querySelector('#page').className='page'+(route==='dashboard'?' dashboard-page':'');document.querySelector('#page').innerHTML=html;document.title=`MAB Portal — ${route==='dashboard'?'Dashboard':routes[route]?.title||route}`;window.scrollTo({top:0})}
window.addEventListener('hashchange',render);render();

document.addEventListener('click',e=>{
  const filter=e.target.closest('.filter');if(filter){const menu=document.querySelector(`[data-menu="${filter.dataset.filter}"]`);document.querySelectorAll('.menu').forEach(m=>{if(m!==menu)m.classList.remove('open')});menu.classList.toggle('open');filter.setAttribute('aria-expanded',menu.classList.contains('open'));return}
  const option=e.target.closest('.menu button');if(option){const wrap=option.closest('.filter-wrap'),button=wrap.querySelector('.filter');button.childNodes[0].textContent=option.textContent;button.setAttribute('aria-expanded','false');option.closest('.menu').classList.remove('open');const empty=document.querySelector('.report-empty>p');if(empty&&option.textContent!=='Monthly'&&!option.textContent.includes('Year'))empty.textContent=`Showing ${option.textContent} performance for the selected period.`;return}
  if(!e.target.closest('.filter-wrap'))document.querySelectorAll('.menu').forEach(m=>m.classList.remove('open'));
  const metric=e.target.closest('[data-name][data-value]');if(metric){const d=document.querySelector('#metric-dialog');d.querySelector('h2').textContent=metric.dataset.name;d.querySelector('.dialog-value').textContent=metric.dataset.value;d.showModal();return}
  const add=e.target.closest('[data-add]');if(add){const d=document.querySelector('#form-dialog');d.querySelector('h2').textContent=add.dataset.add;d.showModal();return}
  const tab=e.target.closest('[data-tabs] button,.tabs button');if(tab){tab.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===tab));return}
  const row=e.target.closest('tbody tr[data-record]');if(row){const d=document.querySelector('#form-dialog');d.querySelector('h2').textContent='Record details';d.showModal()}
});
document.addEventListener('input',e=>{if(e.target.matches('[data-search]')){const q=e.target.value.toLowerCase();document.querySelectorAll('.data-table tbody tr').forEach(r=>r.hidden=!r.innerText.toLowerCase().includes(q))}});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close')?.addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d)d.close()})});
const formDialog=document.querySelector('#form-dialog');formDialog.querySelector('.secondary').addEventListener('click',()=>formDialog.close());formDialog.querySelector('form').addEventListener('submit',e=>{e.preventDefault();formDialog.close()});
const chat=document.querySelector('.chat-panel');document.querySelector('.chat-button').addEventListener('click',()=>chat.classList.toggle('open'));chat.querySelector('header button').addEventListener('click',()=>chat.classList.remove('open'));chat.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const input=e.target.querySelector('input');if(input.value.trim()){const p=document.createElement('p');p.textContent=input.value;Object.assign(p.style,{display:'block',marginLeft:'40px'});chat.querySelector('.chat-body').appendChild(p);input.value=''}});
