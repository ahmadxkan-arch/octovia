# 🎓 Octovia — BSCS Course Portal

> **University of Science and Technology, Bannu (USTB)**  
> **Department of Computer Science**  
> *BS Computer Science (BSCS) Curriculum — Session 2023–2027 and onward*

---

## 📌 Overview

**Octovia** is an interactive, responsive course portal and academic tracker built specifically for BSCS students at the **University of Science and Technology, Bannu (UST Bannu)**. 

It organizes the complete 8-semester curriculum (47 courses: 45 credit courses totaling 132 graduation credit hours, plus 2 non-credit deficiency courses for pre-medical entrants, with 13 practical lab courses), along with prerequisite paths, syllabus topic outlines, degree progress auditing, and an integrated GPA/CGPA calculator.

---

## 🚀 Key Features

1. **8-Semester Curriculum Explorer**:
   - Filter by individual semester (1 to 8) or view the full degree at a glance.
   - Distinct color-coded category badges:
     - 🔵 **CC**: Computing Core
     - 🟣 **DC**: Domain Core
     - 🟢 **DE**: Domain Electives
     - 🟡 **GE**: General Education
     - 🔷 **MS**: Math & Supporting Sciences
     - 🟠 **ES**: Economics
     - ⚪ **NC**: Non-Credit Deficiency
   - Exact theory & lab credit hours breakdown (e.g. `3(3-0)`, `1(0-3)`).

2. **Real-time Search & Multi-Filters**:
   - Instant search across **course codes**, **titles**, and **syllabus topics** (e.g., typing *"SQL"* reveals Database Systems & Advanced DBMS; typing *"C#"* highlights Visual Programming; typing *"Python"* finds Data Science).
   - Filter by course categories or toggle **🧪 Labs Only** to inspect hands-on practical courses.

3. **Prerequisite Dependency Flow**:
   - Interactive roadmap mapping out the major prerequisite pathways (Programming track, Automata/Compilers, Databases, Computer Architecture, OS/Distributed Computing, Cyber Security, and FYP-I to FYP-II).
   - Clicking any prerequisite jumps directly to and highlights that course in the curriculum view.

4. **Semester GPA Calculator**:
   - Tailored to UST Bannu's credit weightings and the official HEC 4.0 grading scale (`A`, `A-`, `B+`, `B`, `B-`, `C+`, `C`, `D`, `F`).
   - One-click semester loader that auto-fills courses and their exact credit hours.

5. **Degree Audit & Progress Tracker**:
   - Set course status (*Not Taken*, *In Progress*, *Completed*) with persistent storage in browser `localStorage`.
   - Visual progress bar tracking completed credit hours towards the 132 CH graduation requirement.
   - Category-wise completion breakdowns.

6. **Modern, Offline-First UI**:
   - Light and Dark mode toggle.
   - Mobile and desktop responsive design.
   - Print-friendly syllabus view.

---

## 📂 Project Structure

```
octovia/
├── index.html        # Main application dashboard
├── styles.css        # Modern, responsive styles with Light/Dark mode
├── app.js            # Interactive logic, search, filters, GPA calc & audit
├── courses.js        # JavaScript course dataset with window & module exports
├── courses.json      # Raw JSON dataset of all 8 semesters
├── logo.jpg          # Official Octovia BSCS Portal Logo
└── README.md         # Documentation
```

---

## 🏃 How to Run

Because Octovia is engineered as a clean, offline-first web application, no external servers, compilers, or build tools are required:

1. Simply double-click **`index.html`** or open it in any modern browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
2. Everything runs locally in your browser.
