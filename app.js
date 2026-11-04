// Octovia - BSCS Course Portal (Cyberpunk Dashboard Controller)
// University of Science and Technology, Bannu

document.addEventListener("DOMContentLoaded", () => {
  const courseData = window.octoviaSemesters || [];

  // State Management
  const state = {
    currentView: "dashboard",
    selectedCategory: "all",
    selectedSemester: "all",
    labOnly: false,
    searchQuery: "",
    studentName: localStorage.getItem("octovia_student_name") || "Ahmed Khan",
    currentActiveSem: parseInt(localStorage.getItem("octovia_active_sem") || "5", 10),
    expandedTopics: {}
  };

  // Category Configuration
  const categoryMeta = {
    CC: { label: "Computing Core", badgeClass: "badge-cc", dotClass: "dot-cc" },
    DC: { label: "Domain Core", badgeClass: "badge-dc", dotClass: "dot-dc" },
    DE: { label: "Domain Electives", badgeClass: "badge-de", dotClass: "dot-de" },
    GE: { label: "General Education", badgeClass: "badge-ge", dotClass: "dot-ge" },
    MS: { label: "Math & Science", badgeClass: "badge-ms", dotClass: "dot-ms" },
    ES: { label: "Economics", badgeClass: "badge-es", dotClass: "dot-es" },
    NC: { label: "Non-Credit", badgeClass: "badge-nc", dotClass: "dot-nc" }
  };

  function getCategory(code) {
    if (!code) return "GE";
    const prefix = code.split("-")[0];
    return categoryMeta[prefix] ? prefix : "GE";
  }

  function getCourseCreditHours(course) {
    if (course.credits === "Non-credit") return 0;
    let credits = 0;
    const match = course.credits.match(/^(\d+)/);
    if (match) credits += parseInt(match[1], 10);
    if (course.lab) {
      const labMatch = course.lab.match(/^(\d+)/);
      if (labMatch) credits += parseInt(labMatch[1], 10);
    }
    return credits;
  }

  // View Navigation
  const navItems = document.querySelectorAll(".sidebar-nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const view = item.getAttribute("data-view");
      switchView(view);
    });
  });

  const btnBrandHome = document.getElementById("brandHomeLink");
  if (btnBrandHome) {
    btnBrandHome.addEventListener("click", (e) => {
      e.preventDefault();
      switchView("dashboard");
    });
  }

  const btnViewAllSemesters = document.getElementById("btnViewAllSemesters");
  if (btnViewAllSemesters) {
    btnViewAllSemesters.addEventListener("click", () => {
      state.selectedSemester = "all";
      switchView("courses");
    });
  }

  function switchView(viewName) {
    state.currentView = viewName;

    // Update active nav item
    navItems.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });

    // Update view panels
    const viewMap = {
      dashboard: document.getElementById("dashboardView"),
      courses: document.getElementById("coursesView"),
      assignments: document.getElementById("assignmentsView"),
      labs: document.getElementById("labsView"),
      resources: document.getElementById("resourcesView"),
      grades: document.getElementById("gradesView"),
      schedule: document.getElementById("scheduleView"),
      settings: document.getElementById("settingsView"),
      support: document.getElementById("settingsView")
    };

    const titles = {
      dashboard: "Dashboard",
      courses: "Curriculum & Courses",
      assignments: "Assignments & Projects",
      labs: "Practical Laboratories",
      resources: "Prerequisites & Resources",
      grades: "HEC Grades & GPA",
      schedule: "Class & Lab Schedule",
      settings: "Portal Settings",
      support: "Help & CS Dept Support"
    };

    const topTitle = document.getElementById("topbarViewTitle");
    const topSubtitle = document.getElementById("topbarGreetingSubtitle");
    if (topTitle) topTitle.textContent = titles[viewName] || "Dashboard";
    if (topSubtitle) {
      if (viewName === "dashboard") {
        topSubtitle.textContent = `Welcome back, ${state.studentName} — here's your semester overview`;
      } else {
        topSubtitle.textContent = `University of Science and Technology, Bannu • BSCS Portal`;
      }
    }

    Object.keys(viewMap).forEach(key => {
      if (viewMap[key]) {
        viewMap[key].style.display = key === viewName ? "block" : "none";
      }
    });

    if (viewName === "courses") {
      renderCourses();
    } else if (viewName === "labs") {
      renderLabs();
    } else if (viewName === "grades") {
      loadGradesCalculator(document.getElementById("gradesSemesterSelect").value);
    } else if (viewName === "resources") {
      renderPrereqFlow();
    }
  }

  // ==========================================
  // RENDER DASHBOARD (8 SEMESTERS GRID)
  // ==========================================
  function renderDashboardSemesters() {
    const grid = document.getElementById("dashboardSemestersGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const semesterMetaStats = [
      { num: 1, status: "completed", statusLabel: "COMPLETED", gpa: "3.5", progress: 100, note: "100%" },
      { num: 2, status: "completed", statusLabel: "COMPLETED", gpa: "3.6", progress: 100, note: "100%" },
      { num: 3, status: "completed", statusLabel: "COMPLETED", gpa: "3.7", progress: 100, note: "100%" },
      { num: 4, status: "completed", statusLabel: "COMPLETED", gpa: "3.68", progress: 100, note: "100%" },
      { num: 5, status: "in-progress", statusLabel: "IN PROGRESS", gpa: "3.72", progress: 72, note: "Active • CC-353 DSA | DC-352 CC" },
      { num: 6, status: "upcoming", statusLabel: "UPCOMING", gpa: null, progress: 0, note: "Starts Jan 2025" },
      { num: 7, status: "upcoming", statusLabel: "UPCOMING", gpa: null, progress: 0, note: "0" },
      { num: 8, status: "upcoming", statusLabel: "UPCOMING", gpa: null, progress: 0, note: "Final Project" }
    ];

    courseData.forEach((sem, idx) => {
      const meta = semesterMetaStats[idx] || {
        status: "upcoming",
        statusLabel: "UPCOMING",
        progress: 0,
        note: ""
      };

      let semCredits = 0;
      sem.courses.forEach(c => {
        semCredits += getCourseCreditHours(c);
      });

      const card = document.createElement("div");
      card.className = `sem-dash-card ${meta.status === "in-progress" ? "active-sem" : ""}`;

      let fillClass = meta.status === "completed" ? "fill-completed" : (meta.status === "in-progress" ? "fill-inprogress" : "");

      card.innerHTML = `
        <div>
          <div class="sem-card-header">
            <span class="status-pill ${meta.status}">${meta.statusLabel}</span>
          </div>
          <h3 class="sem-dash-title">Semester ${sem.number}</h3>
          <div class="sem-dash-meta">
            ${sem.courses.length} Courses • ${semCredits} Credits ${meta.gpa ? `• GPA ${meta.gpa}` : ""}
          </div>
        </div>

        <div>
          <div class="sem-progress-wrap">
            <div class="sem-progress-bar">
              <div class="sem-progress-fill ${fillClass}" style="width: ${meta.progress}%;"></div>
            </div>
          </div>
          <div class="sem-dash-footer">
            <span class="sem-percent-text">${meta.progress > 0 ? `${meta.progress}%` : "0"}</span>
            <span class="sem-detail-tag">${meta.note}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        state.selectedSemester = sem.number.toString();
        switchView("courses");
      });

      grid.appendChild(card);
    });
  }

  // ==========================================
  // RENDER COURSES VIEW
  // ==========================================
  function renderCourses() {
    const container = document.getElementById("cyberCourseCardsContainer");
    if (!container) return;

    container.innerHTML = "";

    // Sync semester buttons in courses view
    const semBtns = document.querySelectorAll("#coursesSemesterFilterBtns .cyber-chip");
    semBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-sem") === state.selectedSemester.toString());
    });

    const query = state.searchQuery.trim().toLowerCase();

    let matchedCourses = [];

    courseData.forEach(sem => {
      if (state.selectedSemester !== "all" && sem.number.toString() !== state.selectedSemester.toString()) {
        return;
      }

      sem.courses.forEach(course => {
        const cat = getCategory(course.code);
        if (state.selectedCategory !== "all" && cat !== state.selectedCategory) return;
        if (state.labOnly && !course.lab) return;

        if (query) {
          const matchCode = course.code.toLowerCase().includes(query);
          const matchTitle = course.title.toLowerCase().includes(query);
          const matchPrereq = course.prereq && course.prereq.toLowerCase().includes(query);
          const matchTopics = course.topics && course.topics.some(t => t.toLowerCase().includes(query));
          if (!matchCode && !matchTitle && !matchPrereq && !matchTopics) return;
        }

        matchedCourses.push({ ...course, semester: sem.number });
      });
    });

    if (matchedCourses.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle); color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="color: #fff; margin-bottom: 0.25rem;">No courses found</h3>
          <p style="font-size: 0.85rem;">Try adjusting your search terms or category filters.</p>
        </div>
      `;
      return;
    }

    matchedCourses.forEach(course => {
      const cat = getCategory(course.code);
      const catInfo = categoryMeta[cat] || { label: "Core", badgeClass: "badge-cc" };
      const ch = getCourseCreditHours(course);
      const isExpanded = state.expandedTopics[course.code] || false;

      const card = document.createElement("div");
      card.className = "cyber-course-card";

      const prereqHtml = course.prereq ? `
        <div class="cyber-prereq-box">
          <span>Prereq: <strong>${escapeHtml(course.prereq)}</strong></span>
        </div>
      ` : "";

      const topicsHtml = (course.topics || []).map(t => `<li class="cyber-topic-item">${escapeHtml(t)}</li>`).join("");

      card.innerHTML = `
        <div>
          <div class="cyber-card-top">
            <span class="cyber-code-badge ${catInfo.badgeClass}">${course.code} • ${catInfo.label}</span>
            <span class="cyber-badge-sm">Sem ${course.semester}</span>
          </div>

          <h3 class="cyber-course-title">${escapeHtml(course.title)}</h3>

          <div class="cyber-course-badges">
            <span class="cyber-badge-sm">📖 ${course.credits}</span>
            ${course.lab ? `<span class="cyber-badge-sm cyber-badge-lab">🧪 Lab: ${course.lab}</span>` : ""}
            <span class="cyber-badge-sm" style="color: var(--neon-cyan); font-weight: 700;">${ch === 0 ? "Non-Credit" : `${ch} CH`}</span>
          </div>

          ${prereqHtml}
        </div>

        <div>
          <button class="cyber-topics-toggle" data-code="${course.code}">
            <span>Syllabus Topics (${course.topics ? course.topics.length : 0})</span>
            <span>${isExpanded ? "▲" : "▼"}</span>
          </button>
          <ul class="cyber-topics-list" style="display: ${isExpanded ? "flex" : "none"};">
            ${topicsHtml}
          </ul>
        </div>
      `;

      const toggleBtn = card.querySelector(".cyber-topics-toggle");
      const listEl = card.querySelector(".cyber-topics-list");
      if (toggleBtn && listEl) {
        toggleBtn.addEventListener("click", () => {
          const currentlyExpanded = listEl.style.display === "flex";
          listEl.style.display = currentlyExpanded ? "none" : "flex";
          toggleBtn.querySelector("span:last-child").textContent = currentlyExpanded ? "▼" : "▲";
          state.expandedTopics[course.code] = !currentlyExpanded;
        });
      }

      container.appendChild(card);
    });
  }

  // Category filter handlers in Courses view
  const cyberCatChips = document.querySelectorAll("#cyberCategoryChips .cyber-chip");
  cyberCatChips.forEach(chip => {
    chip.addEventListener("click", () => {
      cyberCatChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedCategory = chip.getAttribute("data-cat");
      renderCourses();
    });
  });

  // Semester filter handlers in Courses view
  const cyberSemBtns = document.querySelectorAll("#coursesSemesterFilterBtns .cyber-chip");
  cyberSemBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      cyberSemBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedSemester = btn.getAttribute("data-sem");
      renderCourses();
    });
  });

  // Lab Toggle in Courses View
  const cyberLabToggle = document.getElementById("cyberLabToggle");
  if (cyberLabToggle) {
    cyberLabToggle.addEventListener("click", () => {
      state.labOnly = !state.labOnly;
      cyberLabToggle.classList.toggle("active", state.labOnly);
      renderCourses();
    });
  }

  // ==========================================
  // RENDER LABS VIEW
  // ==========================================
  function renderLabs() {
    const container = document.getElementById("labsGridContainer");
    if (!container) return;

    container.innerHTML = "";

    const labCourses = [];
    courseData.forEach(sem => {
      sem.courses.forEach(c => {
        if (c.lab) labCourses.push({ ...c, semester: sem.number });
      });
    });

    labCourses.forEach(c => {
      const card = document.createElement("div");
      card.className = "cyber-course-card";
      card.innerHTML = `
        <div>
          <div class="cyber-card-top">
            <span class="cyber-code-badge badge-cc">${c.code}</span>
            <span class="cyber-badge-sm cyber-badge-lab">Semester ${c.semester}</span>
          </div>
          <h3 class="cyber-course-title">${escapeHtml(c.title)} Lab</h3>
          <div class="cyber-course-badges">
            <span class="cyber-badge-sm cyber-badge-lab">🧪 Lab Contact: 0-3 Hours</span>
            <span class="cyber-badge-sm">1 Credit Hour Practical</span>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.5rem;">
            Practical programming implementation, laboratory experiments, and terminal projects at UST Bannu CS Dept.
          </p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // ==========================================
  // RENDER GPA CALCULATOR
  // ==========================================
  const gradeScale = {
    "A": 4.0, "A-": 3.67, "B+": 3.33, "B": 3.0,
    "B-": 2.67, "C+": 2.33, "C": 2.0, "D": 1.0, "F": 0.0
  };

  const gradesSemesterSelect = document.getElementById("gradesSemesterSelect");
  if (gradesSemesterSelect) {
    gradesSemesterSelect.addEventListener("change", (e) => {
      loadGradesCalculator(e.target.value);
    });
  }

  function loadGradesCalculator(semNum) {
    const sem = courseData.find(s => s.number.toString() === semNum.toString());
    const tbody = document.getElementById("gradesTableBody");
    if (!sem || !tbody) return;

    tbody.innerHTML = "";

    sem.courses.forEach(c => {
      const ch = getCourseCreditHours(c);
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><strong style="color: var(--neon-cyan);">${c.code}</strong></td>
        <td style="color: #fff; font-weight: 600;">${escapeHtml(c.title)}</td>
        <td>${ch === 0 ? "Non-Credit" : `${ch} CH`}</td>
        <td>
          ${ch === 0 ? `<span style="color: var(--text-subtle);">Satisfactory</span>` : `
            <select class="cyber-select calc-grade-select" data-credits="${ch}">
              <option value="A" selected>A (4.0)</option>
              <option value="A-">A- (3.67)</option>
              <option value="B+">B+ (3.33)</option>
              <option value="B">B (3.0)</option>
              <option value="B-">B- (2.67)</option>
              <option value="C+">C+ (2.33)</option>
              <option value="C">C (2.0)</option>
              <option value="D">D (1.0)</option>
              <option value="F">F (0.0)</option>
            </select>
          `}
        </td>
        <td class="grade-points-cell" style="font-weight: 700; color: #fff;">
          ${ch === 0 ? "—" : (4.0 * ch).toFixed(2)}
        </td>
      `;

      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".calc-grade-select").forEach(sel => {
      sel.addEventListener("change", () => {
        recalculateGpaDisplay();
      });
    });

    recalculateGpaDisplay();
  }

  function recalculateGpaDisplay() {
    const rows = document.querySelectorAll("#gradesTableBody tr");
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(tr => {
      const select = tr.querySelector(".calc-grade-select");
      const pointsCell = tr.querySelector(".grade-points-cell");
      if (select && pointsCell) {
        const credits = parseInt(select.getAttribute("data-credits"), 10);
        const grade = select.value;
        const pts = (gradeScale[grade] || 0) * credits;
        totalCredits += credits;
        totalPoints += pts;
        pointsCell.textContent = pts.toFixed(2);
      }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

    const gpaScoreEl = document.getElementById("calcGpaScore");
    const pointsScoreEl = document.getElementById("calcTotalPointsScore");
    const creditsScoreEl = document.getElementById("calcTotalCreditsScore");
    const standingScoreEl = document.getElementById("calcStandingScore");

    if (gpaScoreEl) gpaScoreEl.textContent = gpa.toFixed(2);
    if (pointsScoreEl) pointsScoreEl.textContent = totalPoints.toFixed(2);
    if (creditsScoreEl) creditsScoreEl.textContent = `${totalCredits} CH`;

    if (standingScoreEl) {
      if (gpa >= 3.7) standingScoreEl.textContent = "🌟 President's Honor Roll";
      else if (gpa >= 3.5) standingScoreEl.textContent = "Dean's Honor Roll";
      else if (gpa >= 3.0) standingScoreEl.textContent = "Good Standing";
      else standingScoreEl.textContent = "Satisfactory";
    }
  }

  // ==========================================
  // RENDER PREREQUISITES FLOW
  // ==========================================
  const prereqTracks = [
    { title: "Core Software & Algorithms", path: ["CC-116: Programming Fundamentals", "CC-125: OOP", "CC-242: Data Structures", "CC-353: Analysis of Algorithms"] },
    { title: "Theoretical Computer Science", path: ["DC-246: Theory of Automata", "DC-352: Compiler Construction"] },
    { title: "Database Systems", path: ["CC-232: Data Base Systems", "DC-355: Advance Database Management System"] },
    { title: "Hardware & Architecture", path: ["CC-243: Computer Organization & Assembly", "DC-481: Computer Architecture"] },
    { title: "Operating & Distributed Systems", path: ["CC-245: Operating Systems", "DC-363: Parallel and Distributed Computing"] },
    { title: "Information & Cyber Security", path: ["CC-362: Information Security", "DE-483: Cyber Security"] },
    { title: "Senior Capstone Design", path: ["CC-475: Final Year Project - I", "CC-484: Final Year Project - II"] }
  ];

  function renderPrereqFlow() {
    const container = document.getElementById("prereqFlowContainer");
    if (!container) return;

    container.innerHTML = "";

    prereqTracks.forEach(track => {
      const card = document.createElement("div");
      card.className = "cyber-course-card";
      const steps = track.path.map((p, i) => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 6px; border: 1px solid var(--border-subtle); margin-bottom: 0.35rem;">
          <span style="font-size: 0.8rem; font-weight: 600; color: #fff;">${p}</span>
          <span style="font-size: 0.7rem; color: var(--neon-cyan);">Step ${i + 1}</span>
        </div>
      `).join("");

      card.innerHTML = `
        <h3 class="cyber-course-title" style="color: var(--neon-cyan); margin-bottom: 0.85rem;">🔗 ${track.title}</h3>
        <div>${steps}</div>
      `;
      container.appendChild(card);
    });
  }

  // Global Search Handler
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.currentView !== "courses" && state.searchQuery.trim().length > 0) {
        switchView("courses");
      } else if (state.currentView === "courses") {
        renderCourses();
      }
    });
  }

  // Settings Save
  const btnSaveSettings = document.getElementById("btnSaveSettings");
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener("click", () => {
      const nameInput = document.getElementById("settingStudentName");
      const semSelect = document.getElementById("settingCurrentSemester");
      if (nameInput) {
        state.studentName = nameInput.value.trim() || "Ahmed Khan";
        localStorage.setItem("octovia_student_name", state.studentName);
      }
      if (semSelect) {
        state.currentActiveSem = parseInt(semSelect.value, 10);
        localStorage.setItem("octovia_active_sem", state.currentActiveSem.toString());
      }

      const sidebarName = document.getElementById("sidebarProfileName");
      if (sidebarName) sidebarName.textContent = state.studentName;

      alert("Settings updated successfully!");
      switchView("dashboard");
    });
  }

  // Initialize Name & Dashboard
  const sidebarName = document.getElementById("sidebarProfileName");
  if (sidebarName) sidebarName.textContent = state.studentName;

  renderDashboardSemesters();
});

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
