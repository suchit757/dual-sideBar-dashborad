const body = document.body;
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const logoBtn = document.getElementById('logoBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const searchInput = document.getElementById('searchInput');
const navBlocksDashboard = document.getElementById('navBlocksDashboard');
const navBlocksTasks = document.getElementById('navBlocksTasks');
const mainBread = document.getElementById('breadcrumb');
const navDash = document.getElementById('navDash');
const navTask = document.getElementById('navTask');
const sidebarTitle = document.getElementById('sidebarTitle');
const headingCrumb = document.getElementById('headingCrumb');
const navSettings = document.getElementById('navSettings');
const navAccount = document.getElementById('navAccount');
const navBlocksSetting = document.getElementById('navBlocksSetting');
const navBlocksAccount = document.getElementById('navBlocksAccount');

let state = { theme: 'dark', collapsed: true, section: 'dashboard' };

function applyTheme() {
  if (state.theme === 'light') {
    body.classList.add('light');
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5" stroke="currentColor"/>';
    // Add border on sidebar
    sidebar.style.borderLeft = '1px solid rgba(0,0,0,0.1)';
  } else {
    body.classList.remove('light');
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3" stroke="currentColor"/>';
    // Add border on sidebar
    sidebar.style.borderLeft = '1px solid rgba(255,255,255,0.08)';
  }
}

function setCollapsed(collapsed) {
  state.collapsed = collapsed;
  if (collapsed) {
    sidebar.classList.add('collapsed');
    collapseBtn.setAttribute('aria-expanded', 'false');
  } else {
    sidebar.classList.remove('collapsed');
    collapseBtn.setAttribute('aria-expanded', 'true');
  }
}

themeToggle.addEventListener('click', function () { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); saveState(); });
collapseBtn.addEventListener('click', function () { setCollapsed(!state.collapsed); saveState(); });

logoBtn.addEventListener('click', function () {
  if (!state.collapsed) {
    setCollapsed(true);
  }
  selectSection('dashboard');
});

// mobile open via double click on logo
logoBtn.addEventListener('dblclick', function () { if (window.innerWidth <= 700) sidebar.classList.add('open'); });

// keyboard: Esc closes mobile sidebar
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && window.innerWidth < 700) { sidebar.classList.remove('open'); } });

// handle clicking on dashboard nav blocks
navBlocksDashboard.addEventListener('click', function (e) {
  const item = e.target.closest('.item');
  const sub = e.target.closest('.sub-item');
  if (item) {
    if (item.classList.contains('has-sub')) {
      item.classList.toggle('open');
      return;
    }
    const key = item.dataset.key || '';
    mainBread.textContent = 'Dashboard > ' + key;
  } else if (sub) {
    const path = sub.dataset.path || sub.textContent;
    mainBread.textContent = 'Dashboard > ' + path;
  }
});

// handle clicking on Task nav blocks
navBlocksTasks.addEventListener('click', function (e) {
  const item = e.target.closest('.item');
  const sub = e.target.closest('.sub-item');
  if (item) {
    if (item.classList.contains('has-sub')) {
      item.classList.toggle('open');
      return;
    }
    const key = item.dataset.key || '';
    mainBread.textContent = 'Tasks > ' + key;
  } else if (sub) {
    const path = sub.dataset.path || sub.textContent;
    mainBread.textContent = 'Tasks > ' + path;
  }
});

// handle clicking on Setting nav blocks
navBlocksSetting.addEventListener('click', function (e) {
  const item = e.target.closest('.item');
  const sub = e.target.closest('.sub-item');
  if (item) {
    if (item.classList.contains('has-sub')) {
      item.classList.toggle('open');
      return;
    }
    const key = item.dataset.key || '';
    mainBread.textContent = 'Settings > ' + key;
  } else if (sub) {
    const path = sub.dataset.path || sub.textContent;
    mainBread.textContent = 'Settings > ' + path;
  }
});

// handle clicking on Account nav blocks
navBlocksAccount.addEventListener('click', function (e) {
  const item = e.target.closest('.item');
  const sub = e.target.closest('.sub-item');
  if (item) {
    if (item.classList.contains('has-sub')) {
      item.classList.toggle('open');
      return;
    }
    const key = item.dataset.key || '';
    mainBread.textContent = 'Accounts > ' + key;
  } else if (sub) {
    const path = sub.dataset.path || sub.textContent;
    mainBread.textContent = 'Accounts > ' + path;
  }
});

// search filter
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const activeBlocks = state.section === 'dashboard' ? navBlocksDashboard
      : state.section === 'tasks' ? navBlocksTasks
        : state.section === 'setting' ? navBlocksSetting
          : navBlocksAccount;
    activeBlocks.querySelectorAll('.category').forEach(category => {
      let hasMatch = false;
      // check items
      category.querySelectorAll('.item, .sub-item').forEach(el => {
        const txt = (el.textContent || '').toLowerCase();
        const isMatch = !q || txt.includes(q);
        el.style.display = isMatch ? '' : 'none';
        if (isMatch) hasMatch = true;
      });
      // show/hide category based on any match
      category.style.display = hasMatch ? '' : 'none';
    });
  });
}


// top-left static nav quick buttons
navDash.addEventListener('click', function () { selectSection('dashboard'); });
navTask.addEventListener('click', function () { selectSection('tasks'); });
navSettings.addEventListener('click', function () { selectSection('setting'); });
navAccount.addEventListener('click', function () { selectSection('account'); });

function selectSection(section) {
  // Remove active from all static nav buttons
  document.querySelectorAll('.static-nav .sbtn').forEach(btn => btn.classList.remove('active'));

  // Add active class based on section
  if (section === 'dashboard')
    navDash.classList.add('active');
  else if (section === 'tasks')
    navTask.classList.add('active');
  else if (section === 'setting')
    navSettings.classList.add('active');
  else if (section === 'account')
    navAccount.classList.add('active');
    state.section = section;

  if (section === 'dashboard') {
    navBlocksDashboard.style.display = '';
    navBlocksTasks.style.display = 'none';
    navBlocksSetting.style.display = 'none';
    navBlocksAccount.style.display = 'none';
    sidebarTitle.textContent = 'Dashboard';
    mainBread.textContent = 'Dashboard';
    headingCrumb.textContent = 'Dashboard panel';
    navBlocksDashboard.querySelectorAll('.item.has-sub').forEach(i => i.classList.remove('open'));
  } else if (section === 'tasks') {
    navBlocksDashboard.style.display = 'none';
    navBlocksTasks.style.display = '';
    navBlocksSetting.style.display = 'none';
    navBlocksAccount.style.display = 'none';
    sidebarTitle.textContent = 'Tasks';
    mainBread.textContent = 'Tasks';
    headingCrumb.textContent = 'Tasks panel';
    navBlocksTasks.querySelectorAll('.item.has-sub').forEach(i => i.classList.remove('open'));
  } else if (section === 'setting') {
    navBlocksDashboard.style.display = 'none';
    navBlocksTasks.style.display = 'none';
    navBlocksSetting.style.display = '';
    navBlocksAccount.style.display = 'none';
    sidebarTitle.textContent = 'Settings';
    mainBread.textContent = 'Settings';
    headingCrumb.textContent = 'Settings panel';
  } else if (section === 'account') {
    navBlocksDashboard.style.display = 'none';
    navBlocksTasks.style.display = 'none';
    navBlocksSetting.style.display = 'none';
    navBlocksAccount.style.display = '';
    sidebarTitle.textContent = 'Account';
    mainBread.textContent = 'Account';
    headingCrumb.textContent = 'Account panel';
  }
  if (searchInput) searchInput.value = '';
  saveState();
}

const searchIconBtn = document.getElementById('searchIconBtn');
searchIconBtn.addEventListener('click', function () {
  console.log("Search icon clicked");
});

function saveState() {
  const saveObj = {
    theme: state.theme,
    collapsed: state.collapsed,
    section: state.section
  };
  localStorage.setItem('appState', JSON.stringify(saveObj));
}

function loadState() {
  const saved = localStorage.getItem('appState');
  if (saved) {
    const s = JSON.parse(saved);
    state.theme = s.theme || 'dark';
    state.collapsed = s.collapsed !== undefined ? s.collapsed : true;
    state.section = s.section || 'dashboard';
  }
}

function init() {
  loadState();
  applyTheme();
  setCollapsed(state.collapsed);
  selectSection(state.section);
  state.theme = 'dark';
}

init();