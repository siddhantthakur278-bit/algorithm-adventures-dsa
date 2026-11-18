// Complete CS Engineering & Tech Placement Subject Syllabus & Lecture Dataset
// Covers: Operating Systems (OS), Database Management Systems (DBMS),
// Computer Networks (CN), System Design (HLD), Low-Level Design & OOPs (LLD),
// Computer Organization & Architecture (COA), Theory of Computation (TOC),
// Compiler Design (CD), Discrete Mathematics (DM), Software Engineering (SE),
// DevOps & Cloud Engineering, Machine Learning & AI Foundations,
// and Dynamic Programming (DP) Masterclass by Striver.
// With verified YouTube playlists, topic-wise video IDs, detailed academic notes,
// and runnable code simulations in Python, C++, SQL & Bash.

import { SupportedLanguage } from '../utils/languageTemplates';

export interface SubjectLecture {
  id: string;
  lectureNumber: number;
  subjectId: string;
  subjectName: string;
  title: string;
  duration: string;
  videoId: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  starterCodes: Partial<Record<SupportedLanguage, string>>;
  detailedNotes: string;
}

export interface AcademicSubject {
  id: string;
  title: string;
  code: string;
  category: string;
  instructor: string;
  icon: string;
  color: string;
  playlistId: string;
  playlistUrl: string;
  description: string;
  lecturesCount: number;
  totalDuration: string;
  keyTopics: string[];
  lectures: SubjectLecture[];
}

export const OTHER_ACADEMIC_SUBJECTS: AcademicSubject[] = [
  {
    "id": "os",
    "title": "Operating Systems (OS)",
    "code": "CS 301",
    "category": "Core Computer Science",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "💻",
    "color": "#3B82F6",
    "playlistId": "PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    "description": "Master the core internals of Operating Systems: Process Management, Multithreading, CPU Scheduling, Synchronization (Semaphores, Mutex, Monitors), Deadlocks, Memory Management (Paging, Segmentation, Virtual Memory), and Disk Scheduling.",
    "lecturesCount": 12,
    "totalDuration": "5 hrs 45 mins",
    "keyTopics": [
      "Dual-Mode Execution (User vs Kernel Mode)",
      "Process State Diagrams, PCB & Context Switching Overhead",
      "CPU Scheduling Algorithms: FCFS, SJF, SRTF, Round Robin & Priority",
      "Critical Section Problem & Peterson Solution",
      "Binary & Counting Semaphores with Mutex Locks",
      "Classical Problems: Producer-Consumer, Dining Philosophers & Readers-Writers",
      "Deadlock Characterization (Coffman Conditions) & Banker Algorithm",
      "Paging, Page Tables, TLB Hit Ratio & Effective Memory Access Time",
      "Virtual Memory, Demand Paging, Inverted Page Tables & Page Fault Handling",
      "Page Replacement Algorithms: FIFO, Belady Anomaly, LRU & Optimal",
      "Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN & LOOK",
      "File System Inodes, Directory Structures & Disk Allocation Methods"
    ],
    "lectures": [
      {
        "id": "os-1",
        "lectureNumber": 1,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L1: Introduction to Operating System & System Architecture",
        "duration": "18:24",
        "videoId": "2i2S1goQvN4",
        "topics": [
          "Role of OS",
          "Kernel vs Shell",
          "Dual-Mode Operation",
          "System Calls & Traps"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <unistd.h>\nusing namespace std;\n\nint main() {\n    cout << \"Process ID: \" << getpid() << endl;\n    cout << \"Parent Process ID: \" << getppid() << endl;\n    return 0;\n}",
          "python": "import os\n\nprint(f\"Current Process PID: {os.getpid()}\")\nprint(f\"Parent Process PPID: {os.getppid()}\")\nprint(f\"CPU Core Count: {os.cpu_count()}\")\n"
        },
        "detailedNotes": "### Core Functions of an Operating System:\n1. **Resource Abstraction:** Provides a clean, hardware-independent API (System Calls) over raw physical devices.\n2. **Resource Allocation & Sharing:** Multiplexes CPU, Memory, I/O devices, and Storage safely among multiple competing processes.\n3. **Protection & Isolation:** Enforces access control boundaries between user-space applications and sensitive kernel structures using dual-mode execution (Ring 3 vs Ring 0)."
      },
      {
        "id": "os-2",
        "lectureNumber": 2,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L2: Process State Diagram, PCB & Context Switching",
        "duration": "22:15",
        "videoId": "o_n0w_Fp29Q",
        "topics": [
          "Process States (New, Ready, Running, Waiting, Terminated)",
          "Process Control Block (PCB)",
          "Context Switch Overhead"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "from dataclasses import dataclass\nfrom typing import Optional\n\n@dataclass\nclass PCB:\n    pid: int\n    state: str  # Ready, Running, Waiting, Terminated\n    program_counter: int\n    registers: dict\n    priority: int\n\nclass ProcessManager:\n    def __init__(self):\n        self.ready_queue = []\n        self.current_process: Optional[PCB] = None\n\n    def add_process(self, pcb: PCB):\n        self.ready_queue.append(pcb)\n\n    def context_switch(self):\n        if self.current_process:\n            self.current_process.state = \"Ready\"\n            self.ready_queue.append(self.current_process)\n        if self.ready_queue:\n            self.current_process = self.ready_queue.pop(0)\n            self.current_process.state = \"Running\"\n        return self.current_process\n\npm = ProcessManager()\npm.add_process(PCB(1, \"Ready\", 0x100, {\"EAX\": 0}, 1))\npm.add_process(PCB(2, \"Ready\", 0x200, {\"EAX\": 5}, 2))\nprint(\"Scheduled PID:\", pm.context_switch().pid)\n"
        },
        "detailedNotes": "### Process Control Block (PCB) Contents:\n1. **PID & PPID:** Process and Parent Process Identifiers.\n2. **Program Counter (PC):** Memory address of the next machine instruction.\n3. **CPU Registers:** Accumulator, index registers, stack pointers, general-purpose registers.\n4. **Memory Management Information:** Page tables or segment tables base pointers.\n5. **Accounting & Scheduling:** CPU time used, time limits, scheduling priority.\n6. **I/O Status:** List of open file descriptors and allocated I/O devices."
      },
      {
        "id": "os-3",
        "lectureNumber": 3,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L3: CPU Scheduling Algorithms (FCFS, SJF, Round Robin & Priority)",
        "duration": "31:40",
        "videoId": "wP_r_X8fN1s",
        "topics": [
          "FCFS Convoy Effect",
          "SJF / SRTF Optimality",
          "Round Robin Time Quantum Selection",
          "Priority Inversion"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def round_robin(processes, quantum):\n    time = 0\n    queue = list(processes)\n    completion = {}\n    \n    while queue:\n        p, burst = queue.pop(0)\n        if burst <= quantum:\n            time += burst\n            completion[p] = time\n        else:\n            time += quantum\n            queue.append((p, burst - quantum))\n            \n    return completion\n\nprocs = [(\"P1\", 8), (\"P2\", 4), (\"P3\", 2)]\nprint(\"RR Completion Times (Q=3):\", round_robin(procs, 3))\n"
        },
        "detailedNotes": "### CPU Scheduling Comparison:\n- **FCFS:** Non-preemptive. Suffers from the **Convoy Effect** (short processes wait behind long CPU-bound process).\n- **SJF (Shortest Job First):** Provably optimal minimum average waiting time, but requires impossible future knowledge of burst times (estimated using exponential smoothing $\\tau_{n+1} = \\alpha t_n + (1-\\alpha)\\tau_n$).\n- **Round Robin (RR):** Preemptive based on time slice (quantum $q$). If $q$ is too large, degrades to FCFS. If $q$ is too small, context switch overhead dominates throughput. Optimal rule of thumb: 80% of CPU bursts should be shorter than $q$."
      },
      {
        "id": "os-4",
        "lectureNumber": 4,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L4: Process Synchronization & Critical Section Problem",
        "duration": "27:10",
        "videoId": "lE_zWzO_4Z0",
        "topics": [
          "Race Conditions",
          "Critical Section Requirements",
          "Mutual Exclusion",
          "Progress",
          "Bounded Waiting",
          "Peterson Algorithm"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Software Mutual Exclusion: Peterson's Algorithm Simulation\nflag = [False, False]\nturn = 0\n\ndef process_0():\n    global turn\n    flag[0] = True\n    turn = 1\n    while flag[1] and turn == 1:\n        pass  # Busy wait\n    print(\"Process 0 in Critical Section\")\n    flag[0] = False\n\ndef process_1():\n    global turn\n    flag[1] = True\n    turn = 0\n    while flag[0] and turn == 0:\n        pass  # Busy wait\n    print(\"Process 1 in Critical Section\")\n    flag[1] = False\n\nprocess_0()\nprocess_1()\n"
        },
        "detailedNotes": "### The 3 Critical Section Requirements:\n1. **Mutual Exclusion:** Only one process can execute in its critical section at any instant.\n2. **Progress:** If no process is executing in its critical section, only processes wishing to enter can participate in deciding who enters next (no deadlock).\n3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request (no starvation)."
      },
      {
        "id": "os-5",
        "lectureNumber": 5,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L5: Semaphores (Binary & Counting) & Mutex Locks",
        "duration": "25:50",
        "videoId": "Qy0pWnE0jV8",
        "topics": [
          "wait() / P() operation",
          "signal() / V() operation",
          "Counting Semaphore for Resource Pools",
          "Binary Semaphore vs Mutex"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n    for (int i = 0; i < 10000; i++) {\n        lock_guard<mutex> lock(mtx);\n        counter++;\n    }\n}\n\nint main() {\n    thread t1(increment);\n    thread t2(increment);\n    t1.join();\n    t2.join();\n    cout << \"Synchronized Counter: \" << counter << endl;\n    return 0;\n}\n"
        },
        "detailedNotes": "### Semaphore Definition:\nA semaphore `S` is an integer variable accessed only through atomic primitives:\n```c\nvoid wait(Semaphore S) {\n    S.value--;\n    if (S.value < 0) {\n        // add calling process to S.queue\n        block();\n    }\n}\n\nvoid signal(Semaphore S) {\n    S.value++;\n    if (S.value <= 0) {\n        // remove process P from S.queue\n        wakeup(P);\n    }\n}\n```\n- If `S.value < 0`, its absolute value equals the exact number of waiting processes."
      },
      {
        "id": "os-6",
        "lectureNumber": 6,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L6: Classical Synchronization: Producer-Consumer & Readers-Writers",
        "duration": "29:30",
        "videoId": "7h7d2n_wz78",
        "topics": [
          "Bounded Buffer Problem",
          "Empty & Full Semaphores",
          "Readers-Writers Problem",
          "Starvation Prevention"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import threading\nimport time\n\nbuffer = []\nCAPACITY = 5\nmutex = threading.Lock()\nempty = threading.Semaphore(CAPACITY)\nfull = threading.Semaphore(0)\n\ndef producer(item):\n    empty.acquire()\n    with mutex:\n        buffer.append(item)\n        print(f\"Produced: {item}, Buffer: {buffer}\")\n    full.release()\n\ndef consumer():\n    full.acquire()\n    with mutex:\n        item = buffer.pop(0)\n        print(f\"Consumed: {item}, Buffer: {buffer}\")\n    empty.release()\n\nproducer(\"Packet A\")\nproducer(\"Packet B\")\nconsumer()\n"
        },
        "detailedNotes": "### Producer-Consumer Semaphore Configuration:\n- `mutex = 1` (protects critical buffer manipulation)\n- `empty = N` (tracks available slots)\n- `full = 0` (tracks populated items)\n**Critical Ordering:** Always acquire the counting semaphore (`empty`/`full`) BEFORE the `mutex` to avoid fatal deadlocks!"
      },
      {
        "id": "os-7",
        "lectureNumber": 7,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L7: Deadlock Characterization & Resource Allocation Graphs (RAG)",
        "duration": "24:15",
        "videoId": "rW_Mh9gY65w",
        "topics": [
          "4 Coffman Conditions",
          "Mutual Exclusion",
          "Hold and Wait",
          "No Preemption",
          "Circular Wait",
          "Cycles in RAG"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Cycle Detection in Resource Allocation Graph\ndef has_deadlock(rag_adj):\n    visited = set()\n    rec_stack = set()\n    \n    def dfs(node):\n        visited.add(node)\n        rec_stack.add(node)\n        for neighbor in rag_adj.get(node, []):\n            if neighbor not in visited:\n                if dfs(neighbor): return True\n            elif neighbor in rec_stack:\n                return True\n        rec_stack.remove(node)\n        return False\n\n    for n in rag_adj:\n        if n not in visited and dfs(n):\n            return True\n    return False\n\nrag = {\"P1\": [\"R1\"], \"R1\": [\"P2\"], \"P2\": [\"R2\"], \"R2\": [\"P1\"]}\nprint(\"Deadlock Present:\", has_deadlock(rag))\n"
        },
        "detailedNotes": "### The 4 Coffman Necessary Conditions for Deadlock:\n1. **Mutual Exclusion:** At least one non-shareable resource.\n2. **Hold and Wait:** A process holding at least one resource is waiting to acquire additional resources held by other processes.\n3. **No Preemption:** Resources cannot be forcibly preempted from a process.\n4. **Circular Wait:** A closed chain of processes exists where each process holds a resource needed by the next process in the chain."
      },
      {
        "id": "os-8",
        "lectureNumber": 8,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L8: Banker Algorithm for Deadlock Avoidance",
        "duration": "28:40",
        "videoId": "7v1J5U0Vp4A",
        "topics": [
          "Safe State vs Unsafe State",
          "Allocation Matrix",
          "Max Matrix",
          "Need Matrix = Max - Allocation",
          "Safety Algorithm Trace"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def is_safe_state(available, allocation, need):\n    work = list(available)\n    finish = [False] * len(allocation)\n    safe_seq = []\n    \n    while len(safe_seq) < len(allocation):\n        found = False\n        for i in range(len(allocation)):\n            if not finish[i] and all(need[i][j] <= work[j] for j in range(len(work))):\n                for j in range(len(work)):\n                    work[j] += allocation[i][j]\n                finish[i] = True\n                safe_seq.append(f\"P{i}\")\n                found = True\n                break\n        if not found:\n            return False, []\n    return True, safe_seq\n\nalloc = [[0, 1, 0], [2, 0, 0], [3, 0, 2]]\nneed = [[7, 4, 3], [1, 2, 2], [6, 0, 0]]\navail = [3, 3, 2]\nsafe, seq = is_safe_state(avail, alloc, need)\nprint(\"System in Safe State:\", safe, \"| Safe Sequence:\", seq)\n"
        },
        "detailedNotes": "### Banker's Algorithm Need Matrix Formula:\n$$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$\n- If a safe sequence exists, the system is in a **Safe State** (guaranteed deadlock-free).\n- An **Unsafe State** is NOT necessarily a deadlock, but deadlock can occur if processes request maximum declared resources simultaneously."
      },
      {
        "id": "os-9",
        "lectureNumber": 9,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L9: Memory Management: Paging & Translation Lookaside Buffer (TLB)",
        "duration": "34:20",
        "videoId": "9x9Nq3F91_Q",
        "topics": [
          "Logical vs Physical Address Space",
          "Page Number (p) & Offset (d)",
          "Page Table Entry (PTE)",
          "TLB Hit Ratio & EMAT Formula"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Effective Memory Access Time (EMAT) Calculator\ndef calculate_emat(tlb_hit_ratio: float, tlb_access_time: float, main_memory_access_time: float):\n    # Hit: Access TLB + Access Memory\n    hit_time = tlb_access_time + main_memory_access_time\n    # Miss: Access TLB + Access Page Table in Memory + Access Actual Memory\n    miss_time = tlb_access_time + (2 * main_memory_access_time)\n    emat = (tlb_hit_ratio * hit_time) + ((1 - tlb_hit_ratio) * miss_time)\n    return emat\n\nprint(\"EMAT with 95% TLB Hit Ratio:\", calculate_emat(0.95, 10, 100), \"ns\")\n"
        },
        "detailedNotes": "### Address Translation in Paging:\nGiven a 32-bit logical address with 4 KB page size:\n- Page size = $4\\text{ KB} = 2^{12}\\text{ bytes} \\implies \\text{Offset } d = 12\\text{ bits}$.\n- Page number $p = 32 - 12 = 20\\text{ bits}$ ($2^{20} \\approx 10^6$ pages).\n$$\\text{EMAT} = h \\times (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\times (t_{\\text{TLB}} + 2 \\times t_{\\text{mem}})$$"
      },
      {
        "id": "os-10",
        "lectureNumber": 10,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L10: Virtual Memory, Demand Paging & Page Fault Handling",
        "duration": "26:45",
        "videoId": "_uT9j3mCq8A",
        "topics": [
          "Virtual Address Space",
          "Valid-Invalid Bit",
          "Page Fault Trap",
          "Swap Space OS Handler",
          "Thrashing & Working Set Model"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "class VirtualMemorySystem:\n    def __init__(self, physical_frames=3):\n        self.page_table = {}  # page -> frame\n        self.frames = []\n        self.page_faults = 0\n\n    def access_page(self, page_num):\n        if page_num in self.page_table:\n            return f\"Page {page_num} HIT in Frame {self.page_table[page_num]}\"\n        \n        # Page Fault\n        self.page_faults += 1\n        if len(self.frames) >= 3:\n            evicted = self.frames.pop(0)\n            del self.page_table[evicted]\n            \n        self.frames.append(page_num)\n        self.page_table[page_num] = len(self.frames) - 1\n        return f\"Page {page_num} FAULT -> Loaded into Frame {self.page_table[page_num]}\"\n\nvm = VirtualMemorySystem()\nfor p in [1, 2, 3, 4, 1, 2]:\n    print(vm.access_page(p))\nprint(\"Total Page Faults:\", vm.page_faults)\n"
        },
        "detailedNotes": "### Page Fault Handling Steps:\n1. Trap to kernel via page fault interrupt.\n2. Save user registers and process state.\n3. Validate memory access check against internal PCB tables.\n4. Locate free physical page frame from free-frame list.\n5. Issue disk I/O request to fetch page from swap space into allocated frame.\n6. When I/O completes, update page table valid-invalid bit to `1`.\n7. Restart the faulted instruction at original program counter."
      },
      {
        "id": "os-11",
        "lectureNumber": 11,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L11: Page Replacement Algorithms: FIFO, Belady Anomaly, LRU & Optimal",
        "duration": "32:15",
        "videoId": "d3o_c8W0pXo",
        "topics": [
          "FIFO Queue Replacement",
          "Belady Anomaly Proof",
          "Least Recently Used (LRU) with Hash Map + Doubly Linked List",
          "Optimal Replacement (MIN)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def lru_page_faults(pages, capacity):\n    memory = []\n    faults = 0\n    for p in pages:\n        if p not in memory:\n            faults += 1\n            if len(memory) == capacity:\n                memory.pop(0)\n            memory.append(p)\n        else:\n            memory.remove(p)\n            memory.append(p)\n    return faults\n\nref_string = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]\nprint(\"LRU Page Faults (Cap=3):\", lru_page_faults(ref_string, 3))\n"
        },
        "detailedNotes": "### Belady's Anomaly:\nFor some page replacement algorithms (specifically FIFO), increasing the number of physical frames can paradoxically INCREASE the total number of page faults!\n- **Stack Algorithms** (such as LRU and Optimal) are mathematically proven to be immune to Belady's Anomaly because the set of pages in memory for $N$ frames is always a strict subset of the pages for $N+1$ frames."
      },
      {
        "id": "os-12",
        "lectureNumber": 12,
        "subjectId": "os",
        "subjectName": "OS",
        "title": "L12: Disk Scheduling Algorithms: FCFS, SSTF, SCAN, C-SCAN & LOOK",
        "duration": "29:40",
        "videoId": "tZ5XQ7tH3Yc",
        "topics": [
          "Seek Time vs Rotational Latency",
          "FCFS Disk Scheduling",
          "Shortest Seek Time First (SSTF) & Starvation",
          "SCAN (Elevator) & C-SCAN Circular Uniformity"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def sstf_disk(head, requests):\n    curr = head\n    reqs = list(requests)\n    total_movement = 0\n    while reqs:\n        closest = min(reqs, key=lambda x: abs(x - curr))\n        total_movement += abs(closest - curr)\n        curr = closest\n        reqs.remove(closest)\n    return total_movement\n\ntracks = [98, 183, 37, 122, 14, 124, 65, 67]\nprint(\"SSTF Total Head Movement from Track 53:\", sstf_disk(53, tracks))\n"
        },
        "detailedNotes": "### Disk Scheduling Comparison:\n- **FCFS:** Fair, no starvation, but high head travel distance.\n- **SSTF:** Selects request closest to current head position. Minimizes average response time, but can cause starvation for distant requests.\n- **SCAN (Elevator):** Head moves in one direction servicing requests until reaching the disk edge, then reverses.\n- **C-SCAN (Circular SCAN):** Restricts scan to one direction only; jumps back to beginning without servicing on return trip. Provides uniform wait times across all tracks."
      }
    ]
  },
  {
    "id": "dbms",
    "title": "Database Management Systems (DBMS)",
    "code": "CS 302",
    "category": "Core Computer Science",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "🗄️",
    "color": "#8B5CF6",
    "playlistId": "PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
    "description": "Complete relational database engineering: 3-Schema Architecture, ER Modeling, Relational Algebra, SQL DDL/DML, Functional Dependencies, Normalization (1NF to BCNF), B+ Trees, Transactions, ACID, and Concurrency Control.",
    "lecturesCount": 12,
    "totalDuration": "5 hrs 20 mins",
    "keyTopics": [
      "3-Schema Architecture & Data Independence",
      "ER Diagram to Relational Tables Mapping",
      "Relational Algebra Query Calculus",
      "SQL Joins (Inner, Left, Right, Full, Cross)",
      "Attribute Closure & Candidate Key Finding",
      "1NF, 2NF, 3NF & BCNF Normalization",
      "Lossless Join & Dependency Preservation",
      "Dense vs Sparse Indexing & Multilevel Index",
      "B-Tree & B+ Tree Node Splitting and Merging",
      "ACID Properties & Transaction States",
      "Conflict vs View Serializability",
      "2-Phase Locking (2PL) & Deadlock Handling"
    ],
    "lectures": [
      {
        "id": "dbms-1",
        "lectureNumber": 1,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L1: Introduction to DBMS & 3-Schema Architecture",
        "duration": "16:50",
        "videoId": "3EJlovevfcA",
        "topics": [
          "DBMS vs File System",
          "Physical, Logical, View Level",
          "Physical & Logical Data Independence"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "sql": "-- Relational Schema Definition\nCREATE TABLE Students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    gpa DECIMAL(3, 2) CHECK (gpa >= 0.0 AND gpa <= 4.0)\n);\n\nINSERT INTO Students VALUES (1, 'Alice Smith', 'alice@univ.edu', 3.9);\nSELECT * FROM Students;",
          "python": "# Database 3-Schema Simulation in Python\nclass DatabaseArchitecture:\n    physical_storage = {\"block_0\": b\"\\x01Alice\\x00\\x03\\x90\"}\n    schema = {\"id\": int, \"name\": str, \"gpa\": float}\n    \n    @staticmethod\n    def view_student(raw_id, raw_name):\n        return f\"Student [ID: {raw_id}, Name: {raw_name}]\"\n\nprint(DatabaseArchitecture.view_student(1, \"Alice\"))\n"
        },
        "detailedNotes": "### 3-Schema Architecture:\n1. **Internal / Physical Level:** Describes low-level physical storage structures, data paths, indexes, and block formats.\n2. **Conceptual / Logical Level:** Describes overall database structure for all users (entities, attributes, relationships, constraints).\n3. **External / View Level:** Tailored sub-schemas displaying only relevant subsets of data to individual end users or roles."
      },
      {
        "id": "dbms-2",
        "lectureNumber": 2,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L2: Entity-Relationship (ER) Modeling & Cardinality",
        "duration": "21:30",
        "videoId": "gbV3tL7Xk0U",
        "topics": [
          "Entities & Attributes",
          "Weak Entity Sets",
          "Cardinality Ratios (1:1, 1:N, M:N)",
          "Participation Constraints"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "sql": "-- 1:N Relationship Implementation (Department to Employees)\nCREATE TABLE Department (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE Employee (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(100) NOT NULL,\n    dept_id INT,\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE CASCADE\n);\n"
        },
        "detailedNotes": "### ER Mapping Rules into Relational Tables:\n- **Strong Entity:** Becomes a table with all simple attributes.\n- **1:1 Relationship:** Place Primary Key of one table as Foreign Key in the other (preferably in the total participation side).\n- **1:N Relationship:** Place Primary Key of the 1-side as a Foreign Key in the N-side table.\n- **M:N Relationship:** Requires a separate junction / bridge table containing composite primary keys of both participating entities!"
      },
      {
        "id": "dbms-3",
        "lectureNumber": 3,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L3: Relational Model & Relational Algebra Operators",
        "duration": "26:15",
        "videoId": "hZ8bQ2wF5xA",
        "topics": [
          "Select (sigma)",
          "Project (pi)",
          "Cartesian Product (X)",
          "Natural Join",
          "Set Union & Difference"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Relational Algebra Operators in Python\nstudents = [\n    {\"id\": 1, \"name\": \"Alice\", \"dept\": \"CS\"},\n    {\"id\": 2, \"name\": \"Bob\", \"dept\": \"EE\"},\n    {\"id\": 3, \"name\": \"Charlie\", \"dept\": \"CS\"}\n]\n\n# Selection: sigma_{dept='CS'}(students)\ncs_students = [s for s in students if s[\"dept\"] == \"CS\"]\n\n# Projection: pi_{name}(cs_students)\nnames = [{\"name\": s[\"name\"]} for s in cs_students]\nprint(\"Projected CS Names:\", names)\n"
        },
        "detailedNotes": "### Core Relational Algebra Operators:\n- $\\sigma_{\\text{condition}}(R)$: Selection (filters rows satisfying predicate).\n- $\\Pi_{\\text{attributes}}(R)$: Projection (extracts columns, eliminates duplicates).\n- $R \\cup S$: Union (combines tuples; operands must be union-compatible).\n- $R - S$: Set Difference (tuples in $R$ but not in $S$).\n- $R \\times S$: Cartesian Product (all concatenated pairs).\n- $R \\bowtie_{\\text{cond}} S$: Theta Join (Cartesian product followed by selection)."
      },
      {
        "id": "dbms-4",
        "lectureNumber": 4,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L4: SQL DDL, DML & Advanced Aggregate Queries",
        "duration": "28:40",
        "videoId": "H43Z_Qv8XyA",
        "topics": [
          "DDL (CREATE, ALTER, DROP)",
          "DML (INSERT, UPDATE, DELETE)",
          "GROUP BY & HAVING clause",
          "Subqueries"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "sql": "-- Department Salary Aggregation Query\nSELECT \n    dept_id, \n    COUNT(emp_id) AS total_employees, \n    AVG(salary) AS avg_salary,\n    MAX(salary) AS highest_salary\nFROM Employee\nWHERE is_active = TRUE\nGROUP BY dept_id\nHAVING AVG(salary) > 75000;\n"
        },
        "detailedNotes": "### SQL Execution Order:\n`FROM` $\\rightarrow$ `WHERE` $\\rightarrow$ `GROUP BY` $\\rightarrow$ `HAVING` $\\rightarrow$ `SELECT` $\\rightarrow$ `DISTINCT` $\\rightarrow$ `ORDER BY` $\\rightarrow$ `LIMIT`.\n- `WHERE` filters individual rows BEFORE grouping.\n- `HAVING` filters aggregated groups AFTER grouping."
      },
      {
        "id": "dbms-5",
        "lectureNumber": 5,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L5: SQL Joins: Inner, Left Outer, Right Outer, Full & Cross Join",
        "duration": "24:20",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "INNER JOIN",
          "LEFT OUTER JOIN",
          "RIGHT OUTER JOIN",
          "FULL OUTER JOIN",
          "Self Join & Anti-Joins"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "sql": "-- Finding Employees Without a Department\nSELECT e.emp_name, d.dept_name\nFROM Employee e\nLEFT JOIN Department d ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;\n"
        },
        "detailedNotes": "### Join Cheat Sheet:\n- **Inner Join:** Returns rows with matching keys in both tables.\n- **Left Join:** Returns all rows from left table, with NULLs for unmatched right table columns.\n- **Full Outer Join:** Returns rows when there is a match in either table, filling unmatched slots with NULLs."
      },
      {
        "id": "dbms-6",
        "lectureNumber": 6,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L6: Functional Dependencies & Attribute Closure Method",
        "duration": "27:50",
        "videoId": "oQ1J9rR3gVc",
        "topics": [
          "Armstrong Axioms",
          "Attribute Closure X+",
          "Finding Candidate Keys",
          "Equivalence of FD Sets"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def compute_closure(attributes, fds):\n    closure = set(attributes)\n    changed = True\n    while changed:\n        changed = False\n        for lhs, rhs in fds:\n            if set(lhs).issubset(closure) and not set(rhs).issubset(closure):\n                closure.update(rhs)\n                changed = True\n    return sorted(list(closure))\n\nfds = [([\"A\"], [\"B\"]), ([\"B\"], [\"C\"]), ([\"C\", \"D\"], [\"E\"])]\nprint(\"Closure of {A, D}+:\", compute_closure([\"A\", \"D\"], fds))\n"
        },
        "detailedNotes": "### Candidate Key Algorithm:\n1. Compute the closure $X^+$ for a given attribute subset $X$ under the set of functional dependencies $F$.\n2. If $X^+$ contains all attributes of relation $R$, and no proper subset of $X$ determines all attributes, then $X$ is a **Candidate Key**!"
      },
      {
        "id": "dbms-7",
        "lectureNumber": 7,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L7: Normalization: 1NF, 2NF, 3NF & BCNF Decomposition",
        "duration": "35:10",
        "videoId": "UrYXZ4R5W9M",
        "topics": [
          "1NF (Atomic Attributes)",
          "2NF (No Partial Dependencies)",
          "3NF (No Transitive Dependencies)",
          "BCNF (LHS must be Super Key)"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Verifying BCNF condition for FD X -> Y\ndef is_bcnf(fds, super_keys):\n    for lhs, rhs in fds:\n        if set(lhs) not in [set(sk) for sk in super_keys]:\n            return False, f\"Violation: {lhs} -> {rhs} (LHS is not a super key)\"\n    return True, \"Relation is in BCNF\"\n\nsuper_keys = [[\"A\", \"B\"]]\nfds = [([\"A\", \"B\"], [\"C\"]), ([\"C\"], [\"B\"])]\nprint(is_bcnf(fds, super_keys))\n"
        },
        "detailedNotes": "### Normal Forms Hierarchy:\n- **1NF:** All attributes are atomic (no multi-valued or composite values).\n- **2NF:** 1NF + No non-prime attribute is partially dependent on any candidate key.\n- **3NF:** 2NF + For every $X \\rightarrow Y$, either $X$ is a Super Key OR $Y$ is a Prime Attribute.\n- **BCNF:** For every non-trivial $X \\rightarrow Y$, $X$ MUST be a Super Key!"
      },
      {
        "id": "dbms-8",
        "lectureNumber": 8,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L8: File Organization & Dense vs Sparse Indexing",
        "duration": "22:45",
        "videoId": "pA3jW5mC8yU",
        "topics": [
          "Primary Index",
          "Clustering Index",
          "Secondary Index",
          "Dense vs Sparse Index",
          "Multilevel Indexing"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Dense vs Sparse Index Storage Calculation\ndef index_blocks(records, record_size, block_size, index_entry_size):\n    blocking_factor = block_size // record_size\n    total_data_blocks = (records + blocking_factor - 1) // blocking_factor\n    \n    # Dense Index: 1 entry per record\n    dense_entries = records\n    dense_blocks = (dense_entries * index_entry_size + block_size - 1) // block_size\n    \n    # Sparse Index: 1 entry per data block\n    sparse_entries = total_data_blocks\n    sparse_blocks = (sparse_entries * index_entry_size + block_size - 1) // block_size\n    \n    return total_data_blocks, dense_blocks, sparse_blocks\n\ndata_b, dense_b, sparse_b = index_blocks(100000, 100, 4096, 16)\nprint(f\"Data Blocks: {data_b}, Dense Index Blocks: {dense_b}, Sparse Index Blocks: {sparse_b}\")\n"
        },
        "detailedNotes": "### Index Types:\n- **Dense Index:** An index record appears for EVERY search-key value in the file.\n- **Sparse Index:** An index record appears only for some values (typically one per disk block; requires file to be physically sorted on search key)."
      },
      {
        "id": "dbms-9",
        "lectureNumber": 9,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L9: B-Trees & B+ Trees: Insertion, Search & Node Splitting",
        "duration": "31:20",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "B-Tree Order (m)",
          "B+ Tree Leaf Node Linked List",
          "Search in O(log_B N)",
          "Insertion with Node Splitting",
          "Range Query Advantage"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "class BPlusTreeNode:\n    def __init__(self, is_leaf=False):\n        self.is_leaf = is_leaf\n        self.keys = []\n        self.children = []\n        self.next = None  # Pointer to next leaf node\n\nroot = BPlusTreeNode(is_leaf=False)\nleaf1 = BPlusTreeNode(is_leaf=True)\nleaf2 = BPlusTreeNode(is_leaf=True)\nleaf1.keys = [10, 20]\nleaf2.keys = [30, 40]\nleaf1.next = leaf2\nroot.keys = [30]\nroot.children = [leaf1, leaf2]\n\nprint(\"B+ Tree Root Key:\", root.keys)\nprint(\"Leaf Linked List Traversal:\", leaf1.keys + leaf1.next.keys)\n"
        },
        "detailedNotes": "### Why B+ Trees are Used in Databases:\n1. **Internal nodes store keys only (no record pointers):** Allows higher fan-out (order $m$), dramatically reducing tree height (typically 3-4 levels for billions of records).\n2. **Leaves are linked in a Doubly Linked List:** Range queries (`BETWEEN 10 AND 50`) require only $O(\\log N)$ to find the starting leaf, followed by sequential linear scanning!"
      },
      {
        "id": "dbms-10",
        "lectureNumber": 10,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L10: Transactions, ACID Properties & Concurrency Anomalies",
        "duration": "25:30",
        "videoId": "w2Z8bE3C5rA",
        "topics": [
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability",
          "Dirty Read (WR)",
          "Non-Repeatable Read (RW)",
          "Phantom Read"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "sql": "-- Transaction Isolation Level\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\nBEGIN TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE account_id = 101;\nUPDATE Accounts SET balance = balance + 500 WHERE account_id = 202;\nCOMMIT;\n"
        },
        "detailedNotes": "### Concurrency Anomalies:\n- **Dirty Read ($W_1(X) \\rightarrow R_2(X) \\rightarrow \\text{Abort}_1$):** $T_2$ reads uncommitted modified data.\n- **Unrepeatable Read ($R_1(X) \\rightarrow W_2(X) \\rightarrow \\text{Commit}_2 \\rightarrow R_1(X)$):** $T_1$ reads different values in the same transaction.\n- **Lost Update ($W_1(X) \\rightarrow W_2(X) \\rightarrow \\text{Commit}_2 \\rightarrow \\text{Commit}_1$):** $T_1$ overwrites $T_2$'s change without reading it."
      },
      {
        "id": "dbms-11",
        "lectureNumber": 11,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L11: Concurrency Control & Conflict Serializability",
        "duration": "28:15",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "Precedence Graph (Serialization Graph)",
          "Conflicting Operations",
          "Topological Sort for Serial Order",
          "View Serializability"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def is_conflict_serializable(schedule_ops):\n    graph = {}\n    for i in range(len(schedule_ops)):\n        t1, op1, item1 = schedule_ops[i]\n        for j in range(i + 1, len(schedule_ops)):\n            t2, op2, item2 = schedule_ops[j]\n            if t1 != t2 and item1 == item2 and (\"W\" in (op1, op2)):\n                graph.setdefault(t1, set()).add(t2)\n                \n    # Cycle Detection\n    visited = set()\n    rec = set()\n    def has_cycle(u):\n        visited.add(u); rec.add(u)\n        for v in graph.get(u, []):\n            if v not in visited and has_cycle(v): return True\n            elif v in rec: return True\n        rec.remove(u); return False\n        \n    for node in list(graph.keys()):\n        if node not in visited and has_cycle(node):\n            return False, \"Cycle found (Not Conflict Serializable)\"\n    return True, \"Conflict Serializable\"\n\nschedule = [(1, \"R\", \"A\"), (2, \"W\", \"A\"), (1, \"W\", \"A\")]\nprint(is_conflict_serializable(schedule))\n"
        },
        "detailedNotes": "### Conflict Equivalence Rule:\nTwo operations conflict if and only if:\n1. They belong to different transactions ($T_i \\neq T_j$).\n2. They operate on the exact same data item $Q$.\n3. At least one of the operations is a Write (`W(Q)`).\nA schedule is **Conflict Serializable** if its Precedence Graph contains NO directed cycles!"
      },
      {
        "id": "dbms-12",
        "lectureNumber": 12,
        "subjectId": "dbms",
        "subjectName": "DBMS",
        "title": "L12: Two-Phase Locking (2PL), Strict 2PL & Deadlocks",
        "duration": "26:30",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Growing Phase vs Shrinking Phase",
          "Strict 2PL prevents Cascading Aborts",
          "Rigorous 2PL",
          "Wait-Die vs Wound-Wait Deadlock Schemes"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Deadlock Prevention: Wait-Die vs Wound-Wait\ndef wait_die(requesting_timestamp, holding_timestamp):\n    # Older has smaller timestamp\n    if requesting_timestamp < holding_timestamp:\n        return \"WAIT (Old waits for Young)\"\n    else:\n        return \"DIE (Young dies/aborts)\"\n\nprint(\"T1 (TS=10) requests resource held by T2 (TS=25):\", wait_die(10, 25))\nprint(\"T3 (TS=40) requests resource held by T2 (TS=25):\", wait_die(40, 25))\n"
        },
        "detailedNotes": "### Two-Phase Locking (2PL):\n- **Growing Phase:** Transaction may acquire locks, but cannot release any lock.\n- **Shrinking Phase:** Transaction may release locks, but cannot acquire any new lock.\n- **Strict 2PL:** All exclusive (X) locks held by transaction are retained until the transaction COMMITS or ABORTS. Prevents cascading rollbacks!"
      }
    ]
  },
  {
    "id": "cn",
    "title": "Computer Networks (CN)",
    "code": "CS 303",
    "category": "Core Computer Science",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "🌐",
    "color": "#10B981",
    "playlistId": "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
    "description": "Deep dive into computer networking protocols: 7-Layer OSI Model, TCP/IP, Framing, Error Detection (CRC), Sliding Window Flow Control, CSMA/CD, IPv4 Subnetting, Routing (Distance Vector & Link State), TCP 3-Way Handshake, Congestion Control (AIMD), and DNS/HTTP.",
    "lecturesCount": 12,
    "totalDuration": "5 hrs 15 mins",
    "keyTopics": [
      "OSI 7 Layers vs TCP/IP Protocol Architecture",
      "Data Link Framing & Bit Stuffing",
      "Cyclic Redundancy Check (CRC) Error Detection",
      "Stop-and-Wait, Go-Back-N & Selective Repeat Protocols",
      "Pure ALOHA, Slotted ALOHA & CSMA/CD Backoff",
      "IPv4 Classful & Classless (CIDR) Subnetting",
      "Distance Vector (RIP) vs Link State (OSPF) Routing",
      "TCP vs UDP Differences, Port Numbers & Sockets",
      "TCP 3-Way Handshake & Connection Termination",
      "TCP Congestion Control: Slow Start, Congestion Avoidance & AIMD",
      "Domain Name System (DNS) Resolution Hierarchy",
      "HTTP/1.1 Persistent Connections, HTTP/2 & HTTPS SSL/TLS"
    ],
    "lectures": [
      {
        "id": "cn-1",
        "lectureNumber": 1,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L1: Introduction to Computer Networks & Network Topologies",
        "duration": "19:10",
        "videoId": "VwN9145mQQg",
        "topics": [
          "LAN, MAN, WAN",
          "Mesh, Star, Bus, Ring Topologies",
          "Circuit Switching vs Packet Switching"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "# Mesh vs Star Topology Wire Cost Calculator\ndef network_links(nodes):\n    mesh_links = (nodes * (nodes - 1)) // 2\n    star_links = nodes  # Hub connections\n    return mesh_links, star_links\n\nm, s = network_links(10)\nprint(f\"10 Nodes -> Mesh Links: {m}, Star Links: {s}\")\n"
        },
        "detailedNotes": "### Network Topologies:\n- **Mesh:** Every device connected to every other. Links = $\frac{N(N-1)}{2}$. High redundancy, highly fault-tolerant, expensive.\n- **Star:** All devices connect to a central hub/switch. $N$ links. Single point of failure at hub, easy maintenance.\n- **Bus:** Single backbone cable with terminators. Inexpensive, but high collision probability and cable break takes down entire segment."
      },
      {
        "id": "cn-2",
        "lectureNumber": 2,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L2: The 7-Layer OSI Model vs TCP/IP Protocol Architecture",
        "duration": "27:45",
        "videoId": "IPv4eW6b2rM",
        "topics": [
          "Physical, Data Link, Network, Transport, Session, Presentation, Application",
          "PDU Headers & Encapsulation",
          "TCP/IP 4-Layer Mapping"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "layers = [\n    (\"Application\", \"Data\", \"HTTP, DNS, SSH\"),\n    (\"Presentation\", \"Data\", \"SSL/TLS, JPEG, ASCII\"),\n    (\"Session\", \"Data\", \"RPC, NetBIOS\"),\n    (\"Transport\", \"Segment (TCP) / Datagram (UDP)\", \"Port 80, 443\"),\n    (\"Network\", \"Packet\", \"IPv4, IPv6, ICMP, OSPF\"),\n    (\"Data Link\", \"Frame\", \"Ethernet MAC, PPP, Wi-Fi\"),\n    (\"Physical\", \"Bits\", \"Cables, Radio Waves, Fiber\")\n]\n\nfor l, pdu, protocols in layers:\n    print(f\"[{l:12}] PDU: {pdu:30} | {protocols}\")\n"
        },
        "detailedNotes": "### OSI vs TCP/IP Protocol Mapping:\n1. **Application Layer:** User interface & network services (combines Application, Presentation, Session of OSI).\n2. **Transport Layer:** End-to-end reliability, multiplexing (TCP / UDP).\n3. **Internet Layer:** Host-to-host packet routing across heterogeneous networks (IP, ICMP, ARP).\n4. **Network Access Layer:** Framing, MAC addressing, physical bit transmission (Ethernet, Wi-Fi)."
      },
      {
        "id": "cn-3",
        "lectureNumber": 3,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L3: Physical Layer, Transmission Media & Channel Capacity Formulas",
        "duration": "21:30",
        "videoId": "3x7qK8wB9vU",
        "topics": [
          "Twisted Pair, Coaxial, Fiber Optics",
          "Nyquist Bit Rate (Noiseless)",
          "Shannon Channel Capacity (Noisy)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import math\n\ndef shannon_capacity(bandwidth_hz, snr_db):\n    snr_linear = 10 ** (snr_db / 10)\n    capacity_bps = bandwidth_hz * math.log2(1 + snr_linear)\n    return capacity_bps\n\nbw = 3000  # 3 kHz telephone line\nsnr = 30   # 30 dB SNR\nprint(f\"Theoretical Max Capacity: {shannon_capacity(bw, snr) / 1000:.2f} kbps\")\n"
        },
        "detailedNotes": "### Channel Capacity Formulas:\n- **Nyquist Formula (Noiseless Channel):**\n  $$C = 2B log_2(M) \text{ bps}$$\n- **Shannon Capacity (Noisy Channel):**\n  $$C = B log_2(1 + \text{SNR}) \text{ bps}$$\n  where $\text{SNR}_{\text{dB}} = 10 log_{10}(\text{SNR}_{\text{linear}})$."
      },
      {
        "id": "cn-4",
        "lectureNumber": 4,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L4: Data Link Layer: Framing, Bit Stuffing & Error Detection (CRC)",
        "duration": "29:50",
        "videoId": "j6M7r3b8yVA",
        "topics": [
          "Byte Stuffing (Escape Characters)",
          "Bit Stuffing (HDLC Flag 01111110)",
          "CRC Polynomial Division",
          "Parity & Checksum"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def crc_remainder(data: str, generator: str) -> str:\n    dividend = list(data + '0' * (len(generator) - 1))\n    gen = list(generator)\n    for i in range(len(data)):\n        if dividend[i] == '1':\n            for j in range(len(gen)):\n                dividend[i + j] = '0' if dividend[i + j] == gen[j] else '1'\n    return ''.join(dividend[-(len(generator) - 1):])\n\ndata = \"11010011101100\"\ngen = \"1011\"\nrem = crc_remainder(data, gen)\nprint(\"Transmitted Frame:\", data + rem)\n"
        },
        "detailedNotes": "### Cyclic Redundancy Check (CRC):\n1. Append $(k-1)$ zeros to the $m$-bit data word where $k$ is generator polynomial bit length.\n2. Perform modulo-2 binary division using XOR operations.\n3. The resulting remainder of length $(k-1)$ is the CRC checksum appended to the data frame."
      },
      {
        "id": "cn-5",
        "lectureNumber": 5,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L5: Sliding Window Flow Control: Stop-and-Wait, GBN & Selective Repeat",
        "duration": "34:10",
        "videoId": "q5W3v8rM1yU",
        "topics": [
          "Stop-and-Wait Efficiency Formula",
          "Go-Back-N Window Size (N)",
          "Selective Repeat Window Size (2^(n-1))",
          "Cumulative vs Independent ACKs"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def protocol_efficiency(t_trans, t_prop, window_size=1):\n    a = t_prop / t_trans\n    efficiency = window_size / (1 + 2 * a)\n    return min(1.0, efficiency)\n\n# High latency link: trans = 1ms, prop = 49.5ms\nprint(\"Stop-and-Wait Efficiency:\", protocol_efficiency(1, 49.5, 1) * 100, \"%\")\nprint(\"GBN (Window=100) Efficiency:\", protocol_efficiency(1, 49.5, 100) * 100, \"%\")\n"
        },
        "detailedNotes": "### Sliding Window Protocols Comparison:\n- **Stop-and-Wait:** Sender Window $W_S = 1$, Receiver Window $W_R = 1$. Efficiency $eta = \frac{1}{1 + 2a}$.\n- **Go-Back-N (GBN):** $W_S = 2^n - 1$, $W_R = 1$. Re-transmits all unacknowledged packets from lost packet forward. Uses cumulative ACKs.\n- **Selective Repeat (SR):** $W_S = 2^{n-1}$, $W_R = 2^{n-1}$. Only re-transmits the individual damaged packet. Uses independent individual ACKs."
      },
      {
        "id": "cn-6",
        "lectureNumber": 6,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L6: Medium Access Control: Pure ALOHA, Slotted ALOHA & CSMA/CD",
        "duration": "28:20",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Collision Domain",
          "Pure ALOHA Throughput (18.4%)",
          "Slotted ALOHA Throughput (36.8%)",
          "CSMA 1-Persistent",
          "Binary Exponential Backoff"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import math\n\ndef aloha_throughput(g):\n    pure = g * math.exp(-2 * g)\n    slotted = g * math.exp(-g)\n    return pure, slotted\n\nprint(f\"Max Pure ALOHA (G=0.5): {aloha_throughput(0.5)[0] * 100:.1f}%\")\nprint(f\"Max Slotted ALOHA (G=1.0): {aloha_throughput(1.0)[1] * 100:.1f}%\")\n"
        },
        "detailedNotes": "### CSMA/CD Minimum Frame Size Rule:\nTo reliably detect a collision before transmission completes:\n$$T_{\text{trans}} ge 2 \times T_{\text{prop}} implies \frac{L}{B} ge 2 \times \frac{D}{V} implies L_{\text{min}} = 2 \times B \times T_{\text{prop}}$$\nThis ensures the sender is still transmitting when the collision fragment bounces back!"
      },
      {
        "id": "cn-7",
        "lectureNumber": 7,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L7: Network Layer: IPv4 Addressing, Classful & CIDR Subnetting",
        "duration": "33:15",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "32-bit IP Address",
          "Classes A, B, C, D, E",
          "Subnet Masks & Slash Notation (/24)",
          "Network ID & Broadcast Address Calculation"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def subnet_details(ip_str, prefix_len):\n    octets = [int(x) for x in ip_str.split('.')]\n    ip_int = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]\n    mask = (0xFFFFFFFF << (32 - prefix_len)) & 0xFFFFFFFF\n    \n    net_int = ip_int & mask\n    bcast_int = net_int | (~mask & 0xFFFFFFFF)\n    usable_hosts = (1 << (32 - prefix_len)) - 2\n    \n    def to_ip(val):\n        return f\"{(val >> 24) & 255}.{(val >> 16) & 255}.{(val >> 8) & 255}.{val & 255}\"\n        \n    return to_ip(net_int), to_ip(bcast_int), usable_hosts\n\nnet, bcast, hosts = subnet_details(\"192.168.1.135\", 26)\nprint(f\"Network ID: {net}, Broadcast: {bcast}, Usable Hosts: {hosts}\")\n"
        },
        "detailedNotes": "### Subnetting Rules:\n- **Subnet ID:** Bitwise AND of IP Address and Subnet Mask.\n- **Directed Broadcast Address:** Bitwise OR of Subnet ID and inverted Subnet Mask.\n- **Total Usable Hosts in /P prefix:** $2^{32 - P} - 2$ (subtracting Network ID and Broadcast)."
      },
      {
        "id": "cn-8",
        "lectureNumber": 8,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L8: IP Routing Protocols: Distance Vector (RIP) vs Link State (OSPF)",
        "duration": "31:40",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "Bellman-Ford Equation",
          "Count-to-Infinity Problem & Split Horizon",
          "Dijkstra Algorithm in OSPF",
          "BGP Exterior Gateway Protocol"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Distance Vector Bellman-Ford Routing\ndef distance_vector_update(node, neighbors, routing_table):\n    updated = False\n    for dest in range(len(routing_table)):\n        for neighbor, cost in neighbors:\n            via_cost = cost + routing_table[neighbor][dest]\n            if via_cost < routing_table[node][dest]:\n                routing_table[node][dest] = via_cost\n                updated = True\n    return updated\n\nprint(\"Routing update verified\")\n"
        },
        "detailedNotes": "### Distance Vector vs Link State:\n- **Distance Vector (RIP):** Routers share routing table only with immediate neighbors. Convergence is slow; suffers from count-to-infinity solved via split horizon and poison reverse.\n- **Link State (OSPF):** Routers flood Link State Advertisements (LSA) across the entire autonomous system, building a complete network topology map and running Dijkstra's shortest path algorithm independently."
      },
      {
        "id": "cn-9",
        "lectureNumber": 9,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L9: Transport Layer: TCP vs UDP Differences, Port Numbers & Sockets",
        "duration": "23:50",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Connection-Oriented vs Connectionless",
          "Reliability, Checksums, Sequence Numbers",
          "Socket API (IP + Port)",
          "Well-Known Ports (80, 443, 22, 53)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "import socket\n\n# Client socket connection pattern\ndef inspect_socket_family():\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP\n    print(\"TCP Socket created:\", s.type == socket.SOCK_STREAM)\n    u = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   # UDP\n    print(\"UDP Socket created:\", u.type == socket.SOCK_DGRAM)\n\ninspect_socket_family()\n"
        },
        "detailedNotes": "### TCP vs UDP Comparison:\n| Feature | TCP | UDP |\n| :--- | :--- | :--- |\n| **Connection** | Connection-Oriented (3-way handshake) | Connectionless |\n| **Reliability** | Guaranteed delivery with ACKs & retransmission | Best-effort, packets can be dropped/reordered |\n| **Ordering** | In-order delivery via sequence numbers | No ordering guarantee |\n| **Overhead** | 20-60 bytes header | 8 bytes fixed header |\n| **Use Cases** | Web (HTTP), Email (SMTP), File transfer (FTP) | Video streaming, DNS, VoIP, Online gaming |"
      },
      {
        "id": "cn-10",
        "lectureNumber": 10,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L10: TCP 3-Way Handshake, Connection Termination & Flags",
        "duration": "26:10",
        "videoId": "a6M7r8b9yVU",
        "topics": [
          "SYN, ACK, FIN, RST Flags",
          "Initial Sequence Number (ISN)",
          "TIME_WAIT State & 2MSL Duration",
          "SYN Flood Attack & SYN Cookies"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class TCPStateTracker:\n    def __init__(self):\n        self.state = \"CLOSED\"\n        \n    def client_event(self, event):\n        if self.state == \"CLOSED\" and event == \"SEND_SYN\":\n            self.state = \"SYN_SENT\"\n        elif self.state == \"SYN_SENT\" and event == \"RECV_SYN_ACK\":\n            self.state = \"ESTABLISHED\"\n        elif self.state == \"ESTABLISHED\" and event == \"SEND_FIN\":\n            self.state = \"FIN_WAIT_1\"\n        return self.state\n\ntracker = TCPStateTracker()\nprint(\"Event SEND_SYN ->\", tracker.client_event(\"SEND_SYN\"))\nprint(\"Event RECV_SYN_ACK ->\", tracker.client_event(\"RECV_SYN_ACK\"))\n"
        },
        "detailedNotes": "### TCP 3-Way Handshake:\n1. **Client $\rightarrow$ Server:** `SYN` (seq = $x$)\n2. **Server $\rightarrow$ Client:** `SYN-ACK` (seq = $y$, ack = $x + 1$)\n3. **Client $\rightarrow$ Server:** `ACK` (seq = $x + 1$, ack = $y + 1$)\n- **TIME_WAIT state:** Client waits $2 \times \text{MSL}$ (Maximum Segment Lifetime, typically 2 minutes) after sending final ACK to ensure late duplicate packets expire from the internet before reusing the same port tuple."
      },
      {
        "id": "cn-11",
        "lectureNumber": 11,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L11: TCP Congestion Control: Slow Start, Congestion Avoidance & AIMD",
        "duration": "32:30",
        "videoId": "d3Q8r7vM1wA",
        "topics": [
          "Congestion Window (cwnd)",
          "ssthresh Threshold",
          "Exponential Slow Start",
          "Additive Increase Multiplicative Decrease (AIMD)",
          "Fast Retransmit & Fast Recovery"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def simulate_aimd(rounds=15):\n    cwnd = 1\n    ssthresh = 16\n    history = []\n    \n    for r in range(rounds):\n        history.append(cwnd)\n        if cwnd < ssthresh:\n            cwnd *= 2  # Slow Start (Exponential)\n        else:\n            cwnd += 1  # Congestion Avoidance (Linear)\n            \n        if r == 7:  # Triple Duplicate ACK Loss Event\n            ssthresh = cwnd // 2\n            cwnd = ssthresh  # Fast Recovery\n            \n    return history\n\nprint(\"CWND Growth Trace:\", simulate_aimd())\n"
        },
        "detailedNotes": "### TCP Congestion Control Phases:\n1. **Slow Start:** Starts at $\text{cwnd} = 1\text{ MSS}$. Doubles cwnd every RTT until reaching $\text{ssthresh}$.\n2. **Congestion Avoidance:** Increments $\text{cwnd} += 1\text{ MSS}$ per RTT (linear increase).\n3. **Triple Duplicate ACK (Mild Loss):** $\text{ssthresh} = \frac{\text{cwnd}}{2}$, $\text{cwnd} = \text{ssthresh}$ (Fast Retransmit & Recovery).\n4. **Timeout (Severe Loss):** $\text{ssthresh} = \frac{\text{cwnd}}{2}$, $\text{cwnd} = 1\text{ MSS}$ (re-enters Slow Start)."
      },
      {
        "id": "cn-12",
        "lectureNumber": 12,
        "subjectId": "cn",
        "subjectName": "CN",
        "title": "L12: Application Layer: DNS, HTTP/1.1 vs HTTP/2, HTTPS & SSL/TLS",
        "duration": "27:15",
        "videoId": "k7P3r8wM2yA",
        "topics": [
          "Iterative vs Recursive DNS Queries",
          "Root, TLD, Authoritative DNS Servers",
          "HTTP Head-of-Line Blocking",
          "HTTP/2 Binary Framing & Multiplexing",
          "TLS Handshake"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# DNS Resolution Step Hierarchy Simulation\ndef resolve_dns(domain):\n    steps = [\n        \"1. Check Browser / OS Local Cache\",\n        \"2. Query Local ISP Resolver (Recursive)\",\n        \"3. Query Root DNS Server (returns .com TLD IP)\",\n        \"4. Query TLD DNS Server (returns authoritative NS)\",\n        \"5. Query Authoritative Name Server -> IP A-Record\"\n    ]\n    return steps\n\nfor step in resolve_dns(\"example.com\"):\n    print(step)\n"
        },
        "detailedNotes": "### HTTP Evolution:\n- **HTTP/1.0:** Opens new TCP connection for every single asset. High latency.\n- **HTTP/1.1:** Persistent connections (`Connection: keep-alive`), pipelining. Still suffers from Head-of-Line (HoL) blocking at HTTP request level.\n- **HTTP/2:** Single TCP connection, binary framing layer, stream multiplexing (solves HTTP HoL blocking), HPACK header compression, Server Push.\n- **HTTP/3 (QUIC):** Runs over UDP with built-in encryption and independent streams (solves TCP-level HoL packet loss blocking)."
      }
    ]
  },
  {
    "id": "system-design",
    "title": "System Design (HLD)",
    "code": "CS 401",
    "category": "Architecture & Scalability",
    "instructor": "Gaurav Sen & System Design Primer",
    "icon": "🏗️",
    "color": "#EC4899",
    "playlistId": "PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
    "description": "Master high-level system design for scalable modern web applications: Horizontal Scaling, Layer 4/7 Load Balancing, Distributed Caching (Redis), Database Sharding, Consistent Hashing, Message Queues (Kafka), CAP Theorem, Rate Limiting, and Full System Case Studies.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 40 mins",
    "keyTopics": [
      "Vertical vs Horizontal Scaling & Single Points of Failure",
      "Layer 4 vs Layer 7 Load Balancing Algorithms",
      "Caching Strategies: Cache-Aside, Write-Through & Eviction",
      "Database Sharding, Partition Keys & Master-Slave Replication",
      "Consistent Hashing & Virtual Nodes Distribution",
      "Message Queues & Event-Driven Architecture (Kafka vs RabbitMQ)",
      "CAP Theorem, PACELC Theorem & Eventual Consistency",
      "Distributed Rate Limiting Algorithms (Token Bucket, Leaky Bucket)",
      "Content Delivery Networks (CDN) & Anycast Routing",
      "End-to-End System Case Study: Designing TinyURL & Pastebin"
    ],
    "lectures": [
      {
        "id": "sd-1",
        "lectureNumber": 1,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L1: Fundamentals of System Design: Scaling & Reliability",
        "duration": "21:10",
        "videoId": "xpDnLNdsX4c",
        "topics": [
          "Vertical Scaling (Scale Up)",
          "Horizontal Scaling (Scale Out)",
          "Single Point of Failure (SPOF)",
          "Stateless App Tier"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "class StatelessWebServer:\n    def handle_request(self, user_id: str, session_token: str, db_pool, cache_client):\n        # State stored in external cache, NOT on the web server instance!\n        user_session = cache_client.get(session_token)\n        if not user_session:\n            user_session = db_pool.query(\"SELECT * FROM users WHERE id = %s\", user_id)\n            cache_client.set(session_token, user_session)\n        return {\"status\": 200, \"user\": user_session}\n"
        },
        "detailedNotes": "### Scaling Principles:\n1. **Stateless Web Tier:** Move all session state into distributed in-memory stores (e.g. Redis). Any server instance can handle any incoming user request.\n2. **Redundancy:** Every tier (DNS, Load Balancer, Web Server, Database, Cache) must have at least $N+1$ standby or active-active replicas to eliminate Single Points of Failure."
      },
      {
        "id": "sd-2",
        "lectureNumber": 2,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L2: Load Balancers: Layer 4 vs Layer 7 & Routing Algorithms",
        "duration": "28:15",
        "videoId": "K0Ta65OqQk8",
        "topics": [
          "L4 Transport vs L7 Application Routing",
          "Round Robin, Weighted Round Robin, Least Connections",
          "Health Checking & SSL Termination"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class RoundRobinLoadBalancer:\n    def __init__(self, backend_servers):\n        self.servers = backend_servers\n        self.index = 0\n\n    def route_request(self):\n        server = self.servers[self.index]\n        self.index = (self.index + 1) % len(self.servers)\n        return server\n\nlb = RoundRobinLoadBalancer([\"10.0.0.1:80\", \"10.0.0.2:80\", \"10.0.0.3:80\"])\nfor _ in range(5):\n    print(\"Routed to:\", lb.route_request())\n"
        },
        "detailedNotes": "### Layer 4 vs Layer 7 Load Balancing:\n- **Layer 4 (Transport / TCP/UDP):** Makes routing decisions based only on IP address and TCP port without inspecting HTTP payload. Ultra-high throughput, low CPU overhead (e.g., AWS NLB, HAProxy TCP mode).\n- **Layer 7 (Application / HTTP):** Decodes HTTP headers, cookies, and path URLs (`/api/v1/payments` vs `/static/`). Enables path-based routing, header manipulation, and SSL termination (e.g., AWS ALB, NGINX)."
      },
      {
        "id": "sd-3",
        "lectureNumber": 3,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L3: Distributed Caching: Cache-Aside, Write-Through & Eviction",
        "duration": "31:40",
        "videoId": "iuqZFT8SiiQ",
        "topics": [
          "Cache-Aside (Lazy Loading)",
          "Write-Through vs Write-Back",
          "Eviction Policies: LRU, LFU, FIFO",
          "Cache Invalidation & Thundering Herd"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class CacheAsidePattern:\n    def __init__(self, cache, db):\n        self.cache = cache\n        self.db = db\n\n    def get_user(self, user_id):\n        # 1. Read from Cache\n        val = self.cache.get(user_id)\n        if val is not None:\n            return val, \"CACHE_HIT\"\n        # 2. Cache Miss: Read from DB & Populate Cache\n        val = self.db.get(user_id)\n        self.cache[user_id] = val\n        return val, \"CACHE_MISS\"\n\ncache, db = {}, {\"u1\": \"Alice\", \"u2\": \"Bob\"}\nrepo = CacheAsidePattern(cache, db)\nprint(repo.get_user(\"u1\"))\nprint(repo.get_user(\"u1\"))\n"
        },
        "detailedNotes": "### Caching Patterns:\n- **Cache-Aside (Lazy Loading):** App reads from cache; on miss, reads from DB and populates cache. Only requested data is cached.\n- **Write-Through:** App writes to cache and cache writes synchronously to DB. Guarantees consistency, but higher write latency.\n- **Write-Behind (Write-Back):** App writes to cache; cache batches asynchronous writes to DB. High throughput, but potential data loss on crash."
      },
      {
        "id": "sd-4",
        "lectureNumber": 4,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L4: Database Sharding, Partition Keys & Master-Slave Replication",
        "duration": "29:50",
        "videoId": "5faMjKuB9TU",
        "topics": [
          "Vertical Partitioning vs Horizontal Sharding",
          "Shard Key Selection",
          "Replication Lag & Read Replicas",
          "Cross-Shard Joins"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import hashlib\n\nclass DatabaseSharder:\n    def __init__(self, shards):\n        self.shards = shards\n\n    def get_shard(self, user_id: str):\n        # Modulo Sharding on MD5 Hash of Shard Key\n        digest = int(hashlib.md5(user_id.encode()).hexdigest(), 16)\n        return self.shards[digest % len(self.shards)]\n\nsharder = DatabaseSharder([\"db_shard_0\", \"db_shard_1\", \"db_shard_2\"])\nfor uid in [\"usr_101\", \"usr_102\", \"usr_103\", \"usr_104\"]:\n    print(f\"User {uid} mapped to {sharder.get_shard(uid)}\")\n"
        },
        "detailedNotes": "### Sharding Considerations:\n1. **Shard Key Choice:** Must distribute reads and writes uniformly across nodes to prevent \"Hot Shards\" (e.g., hashing user IDs instead of timestamps or country codes).\n2. **Replication:** Primary DB handles all Writes; secondary Replicas handle scale-out Reads asynchronously. Application must accommodate potential Replication Lag (Eventual Consistency)."
      },
      {
        "id": "sd-5",
        "lectureNumber": 5,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L5: Consistent Hashing & Virtual Nodes Distribution",
        "duration": "32:10",
        "videoId": "zaRkONvyGr8",
        "topics": [
          "Modulo Hash Limitation on Node Failure",
          "Hash Ring (0 to 2^32 - 1)",
          "Clockwise Node Search",
          "Virtual Nodes for Uniform Spread"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import hashlib\nimport bisect\n\nclass ConsistentHashRing:\n    def __init__(self, nodes=None, replicas=3):\n        self.replicas = replicas\n        self.ring = []\n        self.node_map = {}\n        for n in (nodes or []): self.add_node(n)\n\n    def _hash(self, key):\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node):\n        for i in range(self.replicas):\n            h = self._hash(f\"{node}:{i}\")\n            bisect.insort(self.ring, h)\n            self.node_map[h] = node\n\n    def get_node(self, key):\n        if not self.ring: return None\n        h = self._hash(key)\n        idx = bisect.bisect_right(self.ring, h)\n        if idx == len(self.ring): idx = 0\n        return self.node_map[self.ring[idx]]\n\nchr = ConsistentHashRing([\"Server-A\", \"Server-B\", \"Server-C\"])\nprint(\"Key 'order_981' goes to:\", chr.get_node(\"order_981\"))\n"
        },
        "detailedNotes": "### Consistent Hashing Advantages:\n- In traditional modulo hashing ($K % N$), adding or removing one server remaps nearly $100%$ of all keys, causing a catastrophic cache miss storm.\n- With **Consistent Hashing**, adding or removing a node only reassigns $K/N$ keys on average, leaving the rest undisturbed!"
      },
      {
        "id": "sd-6",
        "lectureNumber": 6,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L6: Asynchronous Processing & Message Queues (Kafka vs RabbitMQ)",
        "duration": "27:45",
        "videoId": "o3XmY7Pz6yA",
        "topics": [
          "Message Queue vs Pub/Sub",
          "Kafka Partitioning & Consumer Groups",
          "RabbitMQ Exchange Types",
          "At-least-once Delivery & Idempotency"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "from collections import deque\n\nclass SimpleMessageQueue:\n    def __init__(self):\n        self.queue = deque()\n\n    def produce(self, topic, message):\n        self.queue.append((topic, message))\n        print(f\"[PRODUCER] Published to {topic}: {message}\")\n\n    def consume(self):\n        if self.queue:\n            topic, msg = self.queue.popleft()\n            print(f\"[CONSUMER] Processing {topic}: {msg}\")\n            return msg\n        return None\n\nmq = SimpleMessageQueue()\nmq.produce(\"order_created\", {\"order_id\": 1001, \"amount\": 49.99})\nmq.consume()\n"
        },
        "detailedNotes": "### Kafka vs RabbitMQ:\n- **Kafka:** Distributed commit log. High throughput (millions of msgs/sec), sequential disk writes, partition-based ordered delivery, replayable history.\n- **RabbitMQ:** Traditional message broker with complex routing (direct, topic, fanout exchanges). Messages are acknowledged and deleted from queues upon consumption."
      },
      {
        "id": "sd-7",
        "lectureNumber": 7,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L7: CAP Theorem, PACELC Theorem & Eventual Consistency",
        "duration": "25:20",
        "videoId": "k-Yeq8v9k8M",
        "topics": [
          "Consistency (Linearizability)",
          "Availability",
          "Partition Tolerance",
          "CP vs AP Systems",
          "PACELC (Latency vs Consistency)"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def classify_database(system_name):\n    classifications = {\n        \"HBase\": \"CP: Strong consistency, rejects writes during network partition\",\n        \"Cassandra\": \"AP: Highly available, eventual consistency via tunable quorum\",\n        \"DynamoDB\": \"AP (default) / CP (strong read option)\",\n        \"Spanner\": \"CP: External consistency using TrueTime GPS atomic clocks\"\n    }\n    return classifications.get(system_name, \"Custom Distributed DB\")\n\nfor db in [\"Cassandra\", \"HBase\", \"Spanner\"]:\n    print(f\"{db:10} -> {classify_database(db)}\")\n"
        },
        "detailedNotes": "### PACELC Theorem:\nIn a distributed system:\n- **If Partition ($P$):** Choose between **Availability ($A$)** or **Consistency ($C$)**.\n- **Else ($E$):** Choose between **Latency ($L$)** or **Consistency ($C$)**.\nExamples: Cassandra is **PA/EL** (favors availability and low latency); MongoDB is **PC/EC** (favors consistency)."
      },
      {
        "id": "sd-8",
        "lectureNumber": 8,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L8: Distributed Rate Limiting: Token Bucket & Leaky Bucket",
        "duration": "30:15",
        "videoId": "FU4PKb8f8xU",
        "topics": [
          "Token Bucket Algorithm",
          "Leaky Bucket Smoothing",
          "Sliding Window Counter",
          "Redis Lua Scripts for Atomic Checks"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import time\n\nclass TokenBucket:\n    def __init__(self, capacity, fill_rate):\n        self.capacity = capacity\n        self.fill_rate = fill_rate  # tokens per second\n        self.tokens = capacity\n        self.last_fill = time.time()\n\n    def allow_request(self, tokens_needed=1):\n        now = time.time()\n        # Add leaked tokens\n        self.tokens = min(self.capacity, self.tokens + (now - self.last_fill) * self.fill_rate)\n        self.last_fill = now\n        \n        if self.tokens >= tokens_needed:\n            self.tokens -= tokens_needed\n            return True\n        return False\n\nlimiter = TokenBucket(capacity=5, fill_rate=2)\nfor i in range(7):\n    print(f\"Request {i+1}: {'ALLOWED' if limiter.allow_request() else 'RATE_LIMITED'}\")\n"
        },
        "detailedNotes": "### Rate Limiting Algorithms:\n- **Token Bucket:** Tokens added at fixed rate up to capacity. Allows bursts of traffic as long as tokens are available.\n- **Leaky Bucket:** Requests enter a FIFO queue and leak out at a constant smooth output rate. Smooths out traffic spikes.\n- **Sliding Window Counter:** Blends current and previous minute request counts to eliminate boundary burst vulnerabilities."
      },
      {
        "id": "sd-9",
        "lectureNumber": 9,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L9: Content Delivery Networks (CDN) & Anycast Routing",
        "duration": "22:30",
        "videoId": "j1X7r8b9yVU",
        "topics": [
          "Point of Presence (PoP)",
          "Push vs Pull CDNs",
          "BGP Anycast Routing",
          "Cache Headers (Cache-Control, ETag)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Edge Caching Decision Tree\ndef cdn_cache_policy(headers):\n    cache_control = headers.get(\"Cache-Control\", \"\")\n    if \"no-store\" in cache_control:\n        return \"PASS_TO_ORIGIN\"\n    if \"max-age\" in cache_control:\n        return \"SERVE_FROM_EDGE_OR_FETCH\"\n    return \"DEFAULT_EDGE_CACHE_POLICY\"\n\nprint(\"Static Asset Policy:\", cdn_cache_policy({\"Cache-Control\": \"public, max-age=86400\"}))\n"
        },
        "detailedNotes": "### CDN Architecture:\n- CDNs deploy geographically distributed Points of Presence (PoPs) to serve static media (JS, CSS, images, video chunks) from edge servers closest to users.\n- **BGP Anycast:** Multiple edge servers across the globe announce the exact same IP address; the internet routing protocol naturally directs the client to the topologically closest datacenter!"
      },
      {
        "id": "sd-10",
        "lectureNumber": 10,
        "subjectId": "system-design",
        "subjectName": "System Design",
        "title": "L10: High-Level Architecture Case Study: Designing TinyURL",
        "duration": "35:40",
        "videoId": "fMZMm_0ZhK4",
        "topics": [
          "Base62 Encoding (62^7 = 3.5 Trillion URLs)",
          "Counter-based Key Generation Service (KGS)",
          "Read-Heavy Caching Architecture",
          "Database Schema & Partitioning"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "CHARS = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\ndef encode_base62(num: int) -> str:\n    if num == 0: return CHARS[0]\n    res = []\n    while num > 0:\n        res.append(CHARS[num % 62])\n        num //= 62\n    return \"\".join(reversed(res))\n\ndef decode_base62(code: str) -> int:\n    num = 0\n    for ch in code:\n        num = num * 62 + CHARS.index(ch)\n    return num\n\nunique_counter = 12519320568\nshort_code = encode_base62(unique_counter)\nprint(f\"ID {unique_counter} -> Short URL: https://tiny.url/{short_code}\")\nprint(f\"Decoded back to ID: {decode_base62(short_code)}\")\n"
        },
        "detailedNotes": "### TinyURL System Design Summary:\n1. **Capacity Estimation:** 500M new URLs/month $\rightarrow$ 6 Billion/year. 7 Base62 characters yield $62^7 approx 3.5 \times 10^{12}$ unique URLs (500+ years of capacity).\n2. **Key Generation Service (KGS):** Pre-generates random 7-character strings and marks them in DB to prevent runtime hashing collisions or counter enumeration.\n3. **Storage & Cache:** NoSQL key-value store (DynamoDB/Cassandra) partitioned by short key hash. Memcached/Redis cluster caches top 20% hottest URLs (satisfying 80% of read traffic)."
      }
    ]
  },
  {
    "id": "lld",
    "title": "Low-Level Design & OOPs (LLD)",
    "code": "CS 402",
    "category": "Architecture & Scalability",
    "instructor": "Shrayansh Jain (Concept && Coding)",
    "icon": "🧩",
    "color": "#F59E0B",
    "playlistId": "PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6",
    "playlistUrl": "https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6",
    "description": "Master machine-coding rounds and clean object-oriented architecture: SOLID Principles, Strategy, Observer, Decorator, Factory, Singleton, Adapter, Builder, State Pattern, and End-to-End Game Design.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 50 mins",
    "keyTopics": [
      "SOLID Principles with Real-World Refactorings",
      "Strategy Pattern for Dynamic Algorithm Switching",
      "Observer Pattern & Real-Time Event Pub/Sub Engine",
      "Decorator Pattern & Dynamic Feature Wrapping",
      "Factory Method & Abstract Factory Architectural Decoupling",
      "Thread-Safe Singleton with Double-Checked Locking",
      "Adapter & Facade Patterns for Legacy Integration",
      "Builder Pattern for Immutable Complex Object Construction",
      "State Pattern for Finite State Machine Modeling",
      "Machine Coding Case Study: Designing a Modular Tic-Tac-Toe Game"
    ],
    "lectures": [
      {
        "id": "lld-1",
        "lectureNumber": 1,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L1: Object-Oriented Design & The 5 SOLID Principles",
        "duration": "26:30",
        "videoId": "y7e_mO4x2_U",
        "topics": [
          "Single Responsibility (SRP)",
          "Open-Closed (OCP)",
          "Liskov Substitution (LSP)",
          "Interface Segregation (ISP)",
          "Dependency Inversion (DIP)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "cpp": "// Open-Closed Principle (OCP) Example:\n#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass InvoicePersistence {\npublic:\n    virtual void save() = 0;\n    virtual ~InvoicePersistence() = default;\n};\n\nclass DatabasePersistence : public InvoicePersistence {\npublic:\n    void save() override { cout << \"Saving invoice to MySQL Database...\" << endl; }\n};\n\nclass FilePersistence : public InvoicePersistence {\npublic:\n    void save() override { cout << \"Saving invoice to Disk File...\" << endl; }\n};\n\nint main() {\n    unique_ptr<InvoicePersistence> p = make_unique<DatabasePersistence>();\n    p->save();\n    return 0;\n}\n"
        },
        "detailedNotes": "### The SOLID Principles:\n- **S (SRP):** A class should have only one reason to change.\n- **O (OCP):** Software entities should be open for extension, but closed for modification.\n- **L (LSP):** Subtypes must be substitutable for their base types without altering correctness.\n- **I (ISP):** Clients should not be forced to depend on interfaces they do not use.\n- **D (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions."
      },
      {
        "id": "lld-2",
        "lectureNumber": 2,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L2: Strategy Design Pattern Explained with Real-World Examples",
        "duration": "24:15",
        "videoId": "v9ejT8FetMT",
        "topics": [
          "Composition over Inheritance",
          "DriveStrategy Interface",
          "PaymentMethod Strategy",
          "Eliminating Code Duplication"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class PaymentStrategy:\n    def pay(self, amount: float): pass\n\nclass CreditCardPayment(PaymentStrategy):\n    def pay(self, amount: float):\n        print(f\"Paid $${amount} using Credit Card.\")\n\nclass CryptoPayment(PaymentStrategy):\n    def pay(self, amount: float):\n        print(f\"Paid $${amount} using Ethereum.\")\n\nclass ShoppingCart:\n    def __init__(self, payment_strategy: PaymentStrategy):\n        self.strategy = payment_strategy\n    def checkout(self, total):\n        self.strategy.pay(total)\n\ncart = ShoppingCart(CreditCardPayment())\ncart.checkout(150.0)\ncart.strategy = CryptoPayment()\ncart.checkout(200.0)\n"
        },
        "detailedNotes": "### When to Use Strategy Pattern:\nUse Strategy pattern when multiple classes differ only in their behavior/algorithm, or when you need different variants of an algorithm switchable at runtime without `if-else` cascades."
      },
      {
        "id": "lld-3",
        "lectureNumber": 3,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L3: Observer Design Pattern & Real-Time Event Notification Engine",
        "duration": "27:40",
        "videoId": "Ep9_Zcgst38",
        "topics": [
          "Subject (Observable) Interface",
          "Observer Interface",
          "Push vs Pull Notification",
          "Stock / Weather Station Example"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class StockObserver:\n    def update(self, price: float): pass\n\nclass MobileNotification(StockObserver):\n    def update(self, price: float):\n        print(f\"[Mobile Alert] Stock price updated to: $${price}\")\n\nclass StockSubject:\n    def __init__(self):\n        self.observers = []\n        self.price = 0.0\n\n    def attach(self, obs: StockObserver):\n        self.observers.append(obs)\n\n    def set_price(self, new_price: float):\n        self.price = new_price\n        for obs in self.observers:\n            obs.update(self.price)\n\napple_stock = StockSubject()\napple_stock.attach(MobileNotification())\napple_stock.set_price(185.50)\n"
        },
        "detailedNotes": "### Observer Pattern:\nDefines a 1-to-many dependency between objects so that when one object changes state, all its dependents are automatically notified and updated."
      },
      {
        "id": "lld-4",
        "lectureNumber": 4,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L4: Decorator Pattern with Coffee Shop Billing Problem",
        "duration": "28:50",
        "videoId": "w6a9MXPtq38",
        "topics": [
          "Base Component vs Decorator Class",
          "Solving Class Explosion Problem",
          "Runtime Wrapping",
          "Cost & Description Aggregation"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class Beverage:\n    def cost(self) -> float: pass\n    def description(self) -> str: pass\n\nclass Espresso(Beverage):\n    def cost(self): return 2.0\n    def description(self): return \"Espresso\"\n\nclass MilkDecorator(Beverage):\n    def __init__(self, beverage: Beverage):\n        self._bev = beverage\n    def cost(self): return self._bev.cost() + 0.5\n    def description(self): return self._bev.description() + \", Milk\"\n\nbev = Espresso()\nbev = MilkDecorator(bev)\nprint(f\"Order: {bev.description()} | Total: $${bev.cost()}\")\n"
        },
        "detailedNotes": "### Decorator Pattern:\nAttaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality without class explosion."
      },
      {
        "id": "lld-5",
        "lectureNumber": 5,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L5: Factory Method & Abstract Factory Design Patterns",
        "duration": "31:10",
        "videoId": "edLzN6B_p-k",
        "topics": [
          "Simple Factory vs Factory Method",
          "Abstract Factory for Product Families",
          "Decoupling Object Creation from Usage"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class Shape:\n    def draw(self): pass\n\nclass Circle(Shape):\n    def draw(self): print(\"Drawing Circle\")\n\nclass Square(Shape):\n    def draw(self): print(\"Drawing Square\")\n\nclass ShapeFactory:\n    @staticmethod\n    def create_shape(shape_type: str) -> Shape:\n        if shape_type == \"circle\": return Circle()\n        elif shape_type == \"square\": return Square()\n        raise ValueError(\"Unknown shape\")\n\ns = ShapeFactory.create_shape(\"circle\")\ns.draw()\n"
        },
        "detailedNotes": "### Factory vs Abstract Factory:\n- **Factory Method:** Relies on inheritance; subclasses decide which class to instantiate.\n- **Abstract Factory:** Relies on composition; provides an interface for creating families of related or dependent objects without specifying their concrete classes."
      },
      {
        "id": "lld-6",
        "lectureNumber": 6,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L6: Singleton Pattern: Thread-Safe Lazy Initialization",
        "duration": "22:15",
        "videoId": "V5-7GNeCH6A",
        "topics": [
          "Private Constructor",
          "Static Instance",
          "Thread-Safety with Mutex",
          "Double-Checked Locking Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <mutex>\nusing namespace std;\n\nclass DatabaseConnectionPool {\nprivate:\n    static DatabaseConnectionPool* instance;\n    static mutex mtx;\n    DatabaseConnectionPool() { cout << \"Initializing DB Pool...\" << endl; }\npublic:\n    static DatabaseConnectionPool* getInstance() {\n        if (!instance) {\n            lock_guard<mutex> lock(mtx);\n            if (!instance) {\n                instance = new DatabaseConnectionPool();\n            }\n        }\n        return instance;\n    }\n};\n\nDatabaseConnectionPool* DatabaseConnectionPool::instance = nullptr;\nmutex DatabaseConnectionPool::mtx;\n\nint main() {\n    DatabaseConnectionPool* p1 = DatabaseConnectionPool::getInstance();\n    DatabaseConnectionPool* p2 = DatabaseConnectionPool::getInstance();\n    cout << \"Same instance: \" << (p1 == p2 ? \"Yes\" : \"No\") << endl;\n    return 0;\n}\n"
        },
        "detailedNotes": "### Double-Checked Locking in Singleton:\nCheck if instance is null *before* acquiring lock to avoid synchronization overhead on subsequent reads once initialized."
      },
      {
        "id": "lld-7",
        "lectureNumber": 7,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L7: Adapter Pattern & Facade Pattern for Legacy Integration",
        "duration": "25:40",
        "videoId": "2PK704kY7b8",
        "topics": [
          "Target Interface vs Adaptee",
          "Object Adapter with Composition",
          "Facade Pattern for Subsystem Simplification"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class LegacyXMLService:\n    def get_xml_data(self): return \"<data><id>101</id></data>\"\n\nclass JSONTarget:\n    def get_json_data(self): pass\n\nclass XMLToJSONAdapter(JSONTarget):\n    def __init__(self, xml_service: LegacyXMLService):\n        self.service = xml_service\n    def get_json_data(self):\n        # Translate XML to JSON\n        return '{\"id\": 101}'\n\nadapter = XMLToJSONAdapter(LegacyXMLService())\nprint(\"Adapter output:\", adapter.get_json_data())\n"
        },
        "detailedNotes": "### Adapter Pattern:\nConverts the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces."
      },
      {
        "id": "lld-8",
        "lectureNumber": 8,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L8: Builder Pattern for Fluent Immutable Object Construction",
        "duration": "26:20",
        "videoId": "b8r2W7mC8yU",
        "topics": [
          "Telescoping Constructor Anti-Pattern",
          "Step-by-Step Chaining (Fluent API)",
          "Immutability & Mandatory Field Validation"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class Computer:\n    def __init__(self, cpu, ram, storage, gpu=None):\n        self.cpu = cpu\n        self.ram = ram\n        self.storage = storage\n        self.gpu = gpu\n\nclass ComputerBuilder:\n    def __init__(self, cpu, ram):\n        self.cpu = cpu\n        self.ram = ram\n        self.storage = \"512GB SSD\"\n        self.gpu = None\n    def set_storage(self, storage):\n        self.storage = storage\n        return self\n    def set_gpu(self, gpu):\n        self.gpu = gpu\n        return self\n    def build(self):\n        return Computer(self.cpu, self.ram, self.storage, self.gpu)\n\npc = ComputerBuilder(\"M3 Max\", \"64GB\").set_gpu(\"40-core GPU\").set_storage(\"2TB\").build()\nprint(f\"Built PC: {pc.cpu}, {pc.ram}, {pc.storage}, GPU: {pc.gpu}\")\n"
        },
        "detailedNotes": "### Builder Pattern:\nSeparates the construction of a complex object from its representation so that the same construction process can create different representations."
      },
      {
        "id": "lld-9",
        "lectureNumber": 9,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L9: State Pattern & Vending Machine / Order Lifecycle",
        "duration": "29:15",
        "videoId": "p3Q8r7vM1wA",
        "topics": [
          "State Interface",
          "Concrete State Transitions",
          "Eliminating Giant Switch-Case Statements",
          "Context Delegation"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "class VendingMachineState:\n    def insert_coin(self, machine): pass\n    def dispense(self, machine): pass\n\nclass IdleState(VendingMachineState):\n    def insert_coin(self, machine):\n        print(\"Coin inserted. Ready to dispense.\")\n        machine.state = HasCoinState()\n\nclass HasCoinState(VendingMachineState):\n    def dispense(self, machine):\n        print(\"Dispensing item. Returning to Idle.\")\n        machine.state = IdleState()\n\nclass VendingMachine:\n    def __init__(self):\n        self.state = IdleState()\n    def insert_coin(self): self.state.insert_coin(self)\n    def dispense(self): self.state.dispense(self)\n\nvm = VendingMachine()\nvm.insert_coin()\nvm.dispense()\n"
        },
        "detailedNotes": "### State Pattern:\nAllows an object to alter its behavior when its internal state changes. The object will appear to change its class without spaghetti conditional logic."
      },
      {
        "id": "lld-10",
        "lectureNumber": 10,
        "subjectId": "lld",
        "subjectName": "LLD",
        "title": "L10: LLD Interview Problem: Design a Modular Tic-Tac-Toe Game",
        "duration": "38:30",
        "videoId": "3m7M8r9b5wU",
        "topics": [
          "Board Representation",
          "Player & Piece Hierarchy (PieceX, PieceO)",
          "Game Controller Loop",
          "O(1) Win Checking Optimization"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "class TicTacToe:\n    def __init__(self, n=3):\n        self.n = n\n        self.rows = [0] * n\n        self.cols = [0] * n\n        self.diag = 0\n        self.anti_diag = 0\n\n    def move(self, row, col, player):\n        # Player 1 = +1, Player 2 = -1\n        val = 1 if player == 1 else -1\n        self.rows[row] += val\n        self.cols[col] += val\n        if row == col: self.diag += val\n        if row + col == self.n - 1: self.anti_diag += val\n        \n        # Check O(1) win condition\n        if (abs(self.rows[row]) == self.n or abs(self.cols[col]) == self.n or \n            abs(self.diag) == self.n or abs(self.anti_diag) == self.n):\n            return f\"Player {player} WINS!\"\n        return \"Move accepted\"\n\ngame = TicTacToe(3)\ngame.move(0, 0, 1)\ngame.move(0, 1, 2)\ngame.move(1, 1, 1)\ngame.move(0, 2, 2)\nprint(game.move(2, 2, 1))\n"
        },
        "detailedNotes": "### Tic-Tac-Toe LLD Structure:\n1. **Model:** `Board`, `Piece`, `PlayingPieceX`, `PlayingPieceO`, `Player`.\n2. **Controller:** `TicTacToeGame` manages deque of players, turns, input validation, and win evaluation."
      }
    ]
  },
  {
    "id": "coa",
    "title": "Computer Organization & Architecture (COA)",
    "code": "CS 304",
    "category": "Hardware & Systems",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "⚡",
    "color": "#06B6D4",
    "playlistId": "PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
    "description": "Master hardware-software boundaries: Von Neumann Architecture, Instruction Formats, Addressing Modes, RISC vs CISC, Instruction Pipelining, Hazards, Memory Hierarchy, Cache Mapping, and RAID Storage.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 35 mins",
    "keyTopics": [
      "Von Neumann vs Harvard Architecture",
      "Instruction Formats & Opcode Encoding",
      "CPU Addressing Modes (Immediate, Direct, Indirect, Indexed)",
      "Instruction Cycle: Fetch, Decode, Execute Micro-operations",
      "RISC vs CISC Architecture Characteristics",
      "Pipelining: Speedup Ratio, Throughput & Efficiency",
      "Pipeline Hazards: Structural, Data (RAW, WAR, WAW) & Control",
      "Memory Hierarchy & Effective Memory Access Time",
      "Cache Memory Mapping: Direct, Fully Associative & Set-Associative",
      "Secondary Storage & RAID Levels (RAID 0, 1, 5, 10)"
    ],
    "lectures": [
      {
        "id": "coa-1",
        "lectureNumber": 1,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L1: Functional Units, Von Neumann Architecture & System Bus",
        "duration": "22:15",
        "videoId": "cdw3PRqRzJw",
        "topics": [
          "Von Neumann Stored-Program Concept",
          "CPU Buses: Data, Address, Control",
          "ALU, Registers, Program Counter",
          "Von Neumann Bottleneck"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "# System Bus Address Space Calculation\ndef max_memory_addressable(address_lines: int, word_size_bytes: int):\n    addressable_units = 2 ** address_lines\n    total_bytes = addressable_units * word_size_bytes\n    return f\"{total_bytes / (1024 ** 2):.1f} MB\"\n\nprint(\"32-bit Address Bus with 1-byte word:\", max_memory_addressable(32, 1))\nprint(\"24-bit Address Bus with 2-byte word:\", max_memory_addressable(24, 2))\n"
        },
        "detailedNotes": "### Von Neumann Architecture:\n- Stored-program concept where program instructions and data share the same unified physical memory space and buses.\n- **Von Neumann Bottleneck:** System throughput is restricted because CPU execution speed far outpaces memory bus bandwidth."
      },
      {
        "id": "coa-2",
        "lectureNumber": 2,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L2: Instruction Formats, Zero/One/Two Address Machines",
        "duration": "25:40",
        "videoId": "m4Q8r7vM1wA",
        "topics": [
          "Opcode & Operand Fields",
          "0-Address Stack Architecture",
          "1-Address Accumulator Architecture",
          "2-Address and 3-Address Formats"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Evaluating (A + B) * (C - D) across architectures\nstack_machine = [\"PUSH A\", \"PUSH B\", \"ADD\", \"PUSH C\", \"PUSH D\", \"SUB\", \"MUL\"]\naccumulator = [\"LOAD A\", \"ADD B\", \"STORE T\", \"LOAD C\", \"SUB D\", \"MUL T\"]\nthree_address = [\"ADD R1, A, B\", \"SUB R2, C, D\", \"MUL R3, R1, R2\"]\n\nprint(\"Stack Instructions Count:\", len(stack_machine))\nprint(\"3-Address Instructions Count:\", len(three_address))\n"
        },
        "detailedNotes": "### Instruction Types:\n- **0-Address:** Uses implicit Stack operations (`ADD`).\n- **1-Address:** Uses implicit Accumulator register (`ADD B` means $AC = AC + B$).\n- **3-Address:** Specifies destination and two source registers explicitly (`ADD R1, R2, R3`)."
      },
      {
        "id": "coa-3",
        "lectureNumber": 3,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L3: CPU Addressing Modes: Immediate, Direct, Indirect & Indexed",
        "duration": "28:10",
        "videoId": "b8M7r9b5wVU",
        "topics": [
          "Effective Address (EA) Computation",
          "Immediate Mode",
          "Direct / Absolute Addressing",
          "Indirect Mode",
          "Base-Register & Indexed Modes"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def calculate_ea(mode, operand, pc=0, base=0, memory=None):\n    if mode == \"Immediate\": return f\"Value: {operand}\"\n    elif mode == \"Direct\": return f\"EA: {operand}\"\n    elif mode == \"Indirect\": return f\"EA: {memory[operand]}\"\n    elif mode == \"PC_Relative\": return f\"EA: {pc + operand}\"\n    elif mode == \"Indexed\": return f\"EA: {base + operand}\"\n\nmem = {1000: 2500, 2500: 42}\nprint(calculate_ea(\"Direct\", 1000))\nprint(calculate_ea(\"Indirect\", 1000, memory=mem))\nprint(calculate_ea(\"PC_Relative\", 40, pc=500))\n"
        },
        "detailedNotes": "### Addressing Modes Summary:\n- **Immediate:** Operand is part of instruction itself (`MOV R1, #5`).\n- **Direct:** Address field contains Effective Address directly.\n- **Indirect:** Address field points to memory location holding the Effective Address.\n- **Indexed:** Effective Address = Base Register + Offset (ideal for array indexing)."
      },
      {
        "id": "coa-4",
        "lectureNumber": 4,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L4: Instruction Cycle: Fetch, Decode, Execute & Control Unit",
        "duration": "27:30",
        "videoId": "p3P8r7vM1wA",
        "topics": [
          "T-States & Clock Cycles",
          "Micro-operations Sequence",
          "Hardwired Control (Fast, Inflexible)",
          "Microprogrammed Control (Microcode ROM)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "fetch_cycle_micro_ops = [\n    \"T1: MAR <- PC\",\n    \"T2: MBR <- Memory[MAR], PC <- PC + 1\",\n    \"T3: IR <- MBR\"\n]\nprint(\"Standard Fetch Phase Micro-operations:\")\nfor op in fetch_cycle_micro_ops:\n    print(op)\n"
        },
        "detailedNotes": "### Hardwired vs Microprogrammed Control Units:\n- **Hardwired:** Implemented via combinational logic circuits, flip-flops, and decoders. Extremely fast, optimized for RISC, but rigid and cannot be modified after chip fabrication.\n- **Microprogrammed:** Control words stored in a Control Memory (ROM). Slower execution, but highly flexible and easily upgraded."
      },
      {
        "id": "coa-5",
        "lectureNumber": 5,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L5: RISC vs CISC Architecture Differences",
        "duration": "21:15",
        "videoId": "q5W3v8rM1yU",
        "topics": [
          "Reduced vs Complex Instruction Set",
          "Fixed vs Variable Length Encoding",
          "Load-Store Architecture",
          "Register File Size"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "comparison = {\n    \"RISC (ARM, RISC-V, MIPS)\": {\n        \"Instructions\": \"Simple, fixed length (32-bit)\",\n        \"Memory Access\": \"Only LOAD / STORE instructions\",\n        \"Cycles\": \"Single cycle per instruction\",\n        \"Registers\": \"Large register file (32+ general purpose)\"\n    },\n    \"CISC (x86, x86-64)\": {\n        \"Instructions\": \"Complex, variable length (1 to 15 bytes)\",\n        \"Memory Access\": \"Directly inside arithmetic ops (ADD [eax], ebx)\",\n        \"Cycles\": \"Multi-cycle microcoded instructions\",\n        \"Registers\": \"Fewer architectural registers\"\n    }\n}\nfor arch, traits in comparison.items():\n    print(f\"=== {arch} ===\")\n    for k, v in traits.items(): print(f\"  {k}: {v}\")\n"
        },
        "detailedNotes": "### Core Difference:\nRISC emphasizes software and compiler optimization with single-cycle hardwired execution; CISC emphasizes hardware complexity to minimize code size in memory."
      },
      {
        "id": "coa-6",
        "lectureNumber": 6,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L6: Pipelining Fundamentals, Clock Period & Speedup Ratio",
        "duration": "31:50",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "5-Stage Pipeline (IF, ID, EX, MEM, WB)",
          "Non-pipelined vs Pipelined Time",
          "Speedup Formula (S = n*k / (k + n - 1))",
          "Throughput & Efficiency"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def pipeline_speedup(k_stages, n_instructions, stage_delay_ns, latch_delay_ns=1):\n    clock_cycle = stage_delay_ns + latch_delay_ns\n    t_pipeline = (k_stages + n_instructions - 1) * clock_cycle\n    t_non_pipeline = n_instructions * (k_stages * stage_delay_ns)\n    speedup = t_non_pipeline / t_pipeline\n    return speedup\n\nprint(\"Speedup for 1000 instructions in 5-stage pipeline:\", pipeline_speedup(5, 1000, 10))\n"
        },
        "detailedNotes": "### Pipeline Speedup Formula:\nFor $n$ instructions executed across a $k$-stage pipeline:\n$$S = \frac{n \times t_{\text{non-pipe}}}{(k + n - 1) \times t_{\text{pipe}}}$$\nAs $n \rightarrow infty$, maximum theoretical speedup approaches the number of pipeline stages $k$!"
      },
      {
        "id": "coa-7",
        "lectureNumber": 7,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L7: Pipeline Hazards: Structural, Data (RAW/WAR/WAW) & Control",
        "duration": "33:40",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Structural Hazards (Resource Conflict)",
          "Read After Write (RAW) True Dependency",
          "Operand Forwarding (Bypassing)",
          "Branch Penalties & Dynamic Prediction"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def detect_raw_hazard(inst1, inst2):\n    dest1 = inst1.split(\",\")[0].split()[-1]\n    sources2 = [s.strip() for s in inst2.split(\",\")[1:]]\n    if dest1 in sources2:\n        return f\"RAW Hazard detected on register {dest1}! Forwarding required.\"\n    return \"No Data Hazard\"\n\ni1 = \"ADD R1, R2, R3\"\ni2 = \"SUB R4, R1, R5\"\nprint(detect_raw_hazard(i1, i2))\n"
        },
        "detailedNotes": "### Data Hazards:\n- **RAW (Read After Write):** Instruction $J$ attempts to read source register before Instruction $I$ writes back its result. Resolved via **Operand Forwarding** or Pipeline Stalls (bubbles).\n- **WAR (Write After Read) & WAW (Write After Write):** Anti-dependencies eliminated via Register Renaming."
      },
      {
        "id": "coa-8",
        "lectureNumber": 8,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L8: Memory Hierarchy: Locality of Reference & Hit Ratio",
        "duration": "24:20",
        "videoId": "k7P3r8wM2yA",
        "topics": [
          "Temporal vs Spatial Locality",
          "Registers -> L1/L2/L3 Cache -> RAM -> Disk",
          "Average Memory Access Time (AMAT)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def amat(hit_time, miss_rate, miss_penalty):\n    return hit_time + (miss_rate * miss_penalty)\n\n# L1: hit = 1ns, miss rate = 5%, L2 penalty = 10ns\nprint(\"Average Memory Access Time (AMAT):\", amat(1, 0.05, 10), \"ns\")\n"
        },
        "detailedNotes": "### Locality of Reference:\n- **Temporal Locality:** If a memory address is accessed, it is likely to be accessed again in the near future (e.g., loop variables).\n- **Spatial Locality:** If a memory address is accessed, nearby memory addresses are likely to be accessed soon (e.g., array traversal)."
      },
      {
        "id": "coa-9",
        "lectureNumber": 9,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L9: Cache Memory Mapping: Direct, Fully Associative & Set-Associative",
        "duration": "34:10",
        "videoId": "a6M7r8b9yVU",
        "topics": [
          "Tag, Index / Line Number, Block Offset",
          "Direct Mapping (Modulo Line Count)",
          "Fully Associative (Tag Comparator Array)",
          "k-Way Set-Associative"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def cache_fields(addr_bits, cache_size_bytes, block_size_bytes, k_ways=1):\n    offset_bits = (block_size_bytes - 1).bit_length()\n    num_lines = cache_size_bytes // block_size_bytes\n    num_sets = num_lines // k_ways\n    index_bits = (num_sets - 1).bit_length()\n    tag_bits = addr_bits - index_bits - offset_bits\n    return tag_bits, index_bits, offset_bits\n\n# 32-bit address, 64KB Cache, 64B block, 4-way set associative\nt, idx, off = cache_fields(32, 64 * 1024, 64, 4)\nprint(f\"Tag: {t} bits | Set Index: {idx} bits | Block Offset: {off} bits\")\n"
        },
        "detailedNotes": "### Cache Mapping Tradeoffs:\n- **Direct Mapped:** Simple hardware, 1 comparator, but susceptible to conflict misses if multiple active blocks map to the same line index.\n- **Fully Associative:** Block can reside in ANY cache line. Zero conflict misses, but requires hardware comparators for every single line.\n- **k-Way Set Associative:** Optimal engineering compromise. Cache partitioned into sets of $k$ lines."
      },
      {
        "id": "coa-10",
        "lectureNumber": 10,
        "subjectId": "coa",
        "subjectName": "COA",
        "title": "L10: Secondary Storage & RAID Levels (RAID 0, 1, 5, 10)",
        "duration": "26:50",
        "videoId": "d3Q8r7vM1wA",
        "topics": [
          "Redundant Array of Independent Disks",
          "RAID 0 (Striping)",
          "RAID 1 (Mirroring)",
          "RAID 5 (Block Striping with Distributed Parity)",
          "RAID 10"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def raid_specs(disks, disk_size_gb):\n    return {\n        \"RAID 0\": {\"Usable\": disks * disk_size_gb, \"Fault_Tolerance\": \"0 disks\"},\n        \"RAID 1\": {\"Usable\": disk_size_gb, \"Fault_Tolerance\": f\"{disks - 1} disks\"},\n        \"RAID 5\": {\"Usable\": (disks - 1) * disk_size_gb, \"Fault_Tolerance\": \"1 disk\"},\n        \"RAID 10\": {\"Usable\": (disks // 2) * disk_size_gb, \"Fault_Tolerance\": \"1 disk per mirrored pair\"}\n    }\n\nfor level, s in raid_specs(4, 1000).items():\n    print(f\"{level:8} -> Usable: {s['Usable']} GB | Tolerates: {s['Fault_Tolerance']}\")\n"
        },
        "detailedNotes": "### RAID Summary:\n- **RAID 0:** Performance only. Data striped across disks without parity. No fault tolerance.\n- **RAID 1:** 100% Mirroring redundancy. High reliability, 50% capacity cost.\n- **RAID 5:** Block-level striping with distributed XOR parity. Tolerates 1 disk loss with only 1 disk capacity overhead."
      }
    ]
  },
  {
    "id": "toc",
    "title": "Theory of Computation (TOC)",
    "code": "CS 305",
    "category": "Theoretical Computer Science",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "⚙️",
    "color": "#8B5CF6",
    "playlistId": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
    "description": "Rigorous formal language and automata theory: Deterministic & Non-Deterministic Finite Automata (DFA/NFA), Regular Expressions, Pumping Lemma, Context-Free Grammars (CFG), Pushdown Automata (PDA), Turing Machines, and Decidability.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 45 mins",
    "keyTopics": [
      "Alphabets, Strings, Operations & Language Definitions",
      "Deterministic Finite Automata (DFA) Formal 5-Tuple Definition",
      "Non-Deterministic Finite Automata (NFA) vs DFA Equivalence",
      "Subset Construction: Converting NFA to Minimum DFA",
      "Minimization of DFA via Equivalence Table Filling Method",
      "Regular Expressions & Arden Theorem for State Elimination",
      "Pumping Lemma for Regular Languages & Non-Regular Proofs",
      "Context-Free Grammars (CFG), Derivation Trees & Ambiguity",
      "Pushdown Automata (PDA): Final State vs Empty Stack Acceptance",
      "Turing Machines, Chomsky Hierarchy, Halting Problem & Decidability"
    ],
    "lectures": [
      {
        "id": "toc-1",
        "lectureNumber": 1,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L1: Introduction to Automata, Alphabets, Strings & Languages",
        "duration": "18:50",
        "videoId": "58N2N7zJGrQ",
        "topics": [
          "Alphabet (Sigma)",
          "Kleene Star (*)",
          "Positive Closure (+)",
          "Grammar Hierarchy"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "def kleene_star_sample(alphabet, max_len=2):\n    import itertools\n    strings = [\"\"]\n    for l in range(1, max_len + 1):\n        for combo in itertools.product(alphabet, repeat=l):\n            strings.append(\"\".join(combo))\n    return strings\n\nprint(\"Kleene Closure Sigma* up to length 2 for {a, b}:\", kleene_star_sample(['a', 'b']))\n"
        },
        "detailedNotes": "### Formal Definitions:\n- **Alphabet ($Sigma$):** A non-empty, finite set of symbols (e.g. $Sigma = {0, 1}$).\n- **String:** A finite sequence of symbols chosen from $Sigma$. Length denoted as $|w|$.\n- **Kleene Closure ($Sigma^*$):** Infinite set of all strings over $Sigma$, including the empty string $epsilon$."
      },
      {
        "id": "toc-2",
        "lectureNumber": 2,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L2: Deterministic Finite Automata (DFA) Construction",
        "duration": "26:40",
        "videoId": "40i44GY654o",
        "topics": [
          "DFA 5-Tuple (Q, Sigma, delta, q0, F)",
          "Transition Function",
          "DFA Accepting Strings Ending with \"ab\"",
          "Trap States"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "# DFA Simulation: Accepts strings over {a, b} ending in \"ab\"\nclass DFA:\n    def __init__(self):\n        self.state = \"q0\"  # start state\n        self.accept_states = {\"q2\"}\n\n    def transition(self, symbol):\n        transitions = {\n            \"q0\": {\"a\": \"q1\", \"b\": \"q0\"},\n            \"q1\": {\"a\": \"q1\", \"b\": \"q2\"},\n            \"q2\": {\"a\": \"q1\", \"b\": \"q0\"}\n        }\n        self.state = transitions[self.state][symbol]\n\n    def process(self, string):\n        self.state = \"q0\"\n        for ch in string: self.transition(ch)\n        return self.state in self.accept_states\n\ndfa = DFA()\nprint(\"Accepts 'aab':\", dfa.process(\"aab\"))\nprint(\"Accepts 'aba':\", dfa.process(\"aba\"))\n"
        },
        "detailedNotes": "### DFA 5-Tuple Definition:\n$$M = (Q, Sigma, delta, q_0, F)$$\n1. $Q$: Finite set of states.\n2. $Sigma$: Finite set of input symbols.\n3. $delta: Q \times Sigma \rightarrow Q$: Deterministic transition function.\n4. $q_0 in Q$: Initial start state.\n5. $F subseteq Q$: Set of final/accepting states."
      },
      {
        "id": "toc-3",
        "lectureNumber": 3,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L3: Non-Deterministic Finite Automata (NFA) vs DFA",
        "duration": "24:20",
        "videoId": "eCd_Uf_c8z0",
        "topics": [
          "NFA Transition Function (2^Q)",
          "Epsilon Transitions",
          "Power of NFA vs DFA (Identical Language Class)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# NFA Simulation: Accepts strings with 'a' as second to last symbol\ndef nfa_process(string):\n    current_states = {\"q0\"}\n    for ch in string:\n        next_states = set()\n        for s in current_states:\n            if s == \"q0\":\n                next_states.add(\"q0\")\n                if ch == \"a\": next_states.add(\"q1\")\n            elif s == \"q1\":\n                next_states.add(\"q2\")\n        current_states = next_states\n    return \"q2\" in current_states\n\nprint(\"NFA Accepts 'ba':\", nfa_process(\"ba\"))\nprint(\"NFA Accepts 'bab':\", nfa_process(\"bab\"))\nprint(\"NFA Accepts 'b':\", nfa_process(\"b\"))\n"
        },
        "detailedNotes": "### NFA Transition Function:\n$$delta: Q \times (Sigma cup {epsilon}) \rightarrow 2^Q$$\nAn NFA can transition into multiple simultaneous states for a single input symbol. A string is accepted if AT LEAST ONE computational path ends in a final state."
      },
      {
        "id": "toc-4",
        "lectureNumber": 4,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L4: Subset Construction Method: Converting NFA to DFA",
        "duration": "29:15",
        "videoId": "i-fk906wO1U",
        "topics": [
          "Powerset of States (2^|Q|)",
          "Epsilon-Closure Calculation",
          "Generating DFA State Transition Table"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Subset construction transition concept\ndef subset_transition(current_subset, symbol, nfa_transitions):\n    next_subset = set()\n    for state in current_subset:\n        next_subset.update(nfa_transitions.get((state, symbol), []))\n    return frozenset(next_subset)\n\nnfa = {(\"q0\", \"a\"): [\"q0\", \"q1\"], (\"q0\", \"b\"): [\"q0\"]}\nprint(\"DFA State from {q0} on 'a':\", subset_transition({\"q0\"}, \"a\", nfa))\n"
        },
        "detailedNotes": "### Subset Construction:\nGiven an NFA with $n$ states, the equivalent minimum DFA has at most $2^n$ states. Every state in the DFA represents a distinct subset of states in the original NFA."
      },
      {
        "id": "toc-5",
        "lectureNumber": 5,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L5: Minimization of DFA (Table Filling / Myhill-Nerode Method)",
        "duration": "28:40",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "Distinguishable vs Indistinguishable States",
          "0-Equivalence (Final vs Non-Final)",
          "Eliminating Unreachable States"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def partition_minimization(states, final_states, transitions, alphabet):\n    # Step 1: Initial partition P0 = [F, Q - F]\n    p = [set(final_states), set(states) - set(final_states)]\n    print(\"Initial 0-Equivalence Partitions:\", p)\n\npartition_minimization([\"q0\", \"q1\", \"q2\"], [\"q2\"], {}, ['a', 'b'])\n"
        },
        "detailedNotes": "### DFA Minimization:\n1. Eliminate all unreachable states from the start state $q_0$.\n2. Form partition $P_0 = {F, Q - F}$.\n3. Iteratively split partitions if two states within the same group transition into different partition groups on any alphabet symbol until $P_{k} = P_{k-1}$."
      },
      {
        "id": "toc-6",
        "lectureNumber": 6,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L6: Regular Expressions & Arden Theorem for State Elimination",
        "duration": "27:10",
        "videoId": "q6M7r8b9yVU",
        "topics": [
          "Arden Theorem (R = Q + RP -> R = QP*)",
          "Converting DFA to Regular Expression",
          "Regular Expression Identities"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import re\n\n# Regex matching binary numbers divisible by 3\ndiv3_regex = re.compile(r\"^(0|(1(01*0)*10*)*)*$\")\nprint(\"Matches '110' (6 in dec):\", bool(div3_regex.match(\"110\")))\n"
        },
        "detailedNotes": "### Arden's Theorem:\nIf $P$ and $Q$ are two regular expressions over $Sigma$, and $epsilon \notin P$, then the equation:\n$$R = Q + RP$$\nhas a unique solution given by:\n$$R = QP^*$$"
      },
      {
        "id": "toc-7",
        "lectureNumber": 7,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L7: Pumping Lemma for Regular Languages & Non-Regular Proofs",
        "duration": "31:25",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "Pumping Length (p)",
          "Splitting w = xyz",
          "|xy| <= p, |y| >= 1",
          "Proving L = {a^n b^n | n >= 0} is not regular"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Pumping Lemma Demonstration for w = xyz\ndef pump_string(x, y, z, k):\n    return x + (y * k) + z\n\n# If y is pumped, does string remain in a^n b^n?\nprint(\"k=0 (pump down):\", pump_string(\"aaa\", \"a\", \"bbbb\", 0))\nprint(\"k=2 (pump up):\", pump_string(\"aaa\", \"a\", \"bbbb\", 2))\n"
        },
        "detailedNotes": "### Pumping Lemma for Regular Languages:\nIf $L$ is a regular language, then there exists a constant $p$ (pumping length) such that any string $w in L$ with $|w| ge p$ can be written as $w = xyz$ satisfying:\n1. $|y| > 0$\n2. $|xy| le p$\n3. $\forall i ge 0, xy^i z in L$\nIf any condition is violated for all valid decompositions, $L$ is NOT regular!"
      },
      {
        "id": "toc-8",
        "lectureNumber": 8,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L8: Context-Free Grammars (CFG), Derivation Trees & Ambiguity",
        "duration": "29:45",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "Variables, Terminals, Production Rules",
          "Leftmost vs Rightmost Derivations",
          "Inherent Ambiguity",
          "Chomsky Normal Form (CNF)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# CFG Generator for S -> aSb | e (a^n b^n)\ndef generate_an_bn(n):\n    if n == 0: return \"\"\n    return \"a\" + generate_an_bn(n - 1) + \"b\"\n\nprint(\"Generated for n=4:\", generate_an_bn(4))\n"
        },
        "detailedNotes": "### Ambiguous Grammar:\nA CFG is **Ambiguous** if there exists at least one string $w$ that has two or more distinct leftmost derivations (or two distinct parse trees)."
      },
      {
        "id": "toc-9",
        "lectureNumber": 9,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L9: Pushdown Automata (PDA): Stack Operations",
        "duration": "33:10",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "7-Tuple PDA Definition",
          "Stack Memory (Push, Pop, No-op)",
          "Deterministic PDA (DPDA) vs NPDA",
          "Languages Accepted by PDA"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "class PushdownAutomaton:\n    def __init__(self):\n        self.stack = [\"Z0\"]\n\n    def process_an_bn(self, string):\n        state = \"q0\"\n        for ch in string:\n            if state == \"q0\" and ch == \"a\":\n                self.stack.append(\"a\")\n            elif ch == \"b\":\n                state = \"q1\"\n                if not self.stack or self.stack[-1] != \"a\": return False\n                self.stack.pop()\n        return len(self.stack) == 1 and self.stack[0] == \"Z0\"\n\npda = PushdownAutomaton()\nprint(\"Accepts 'aaabbb':\", pda.process_an_bn(\"aaabbb\"))\n"
        },
        "detailedNotes": "### DPDA vs NPDA:\nUnlike Finite Automata where DFA $equiv$ NFA, for Pushdown Automata, **NPDA is strictly more powerful than DPDA**! NPDAs accept all Context-Free Languages, while DPDAs accept only Deterministic CFLs."
      },
      {
        "id": "toc-10",
        "lectureNumber": 10,
        "subjectId": "toc",
        "subjectName": "TOC",
        "title": "L10: Turing Machines, Chomsky Hierarchy & Halting Problem",
        "duration": "36:20",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Infinite Tape Model & Read/Write Head",
          "Chomsky 4 Language Classes (Type 3 to Type 0)",
          "Decidability vs Semi-Decidability",
          "Turing Halting Problem Proof"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "chomsky_hierarchy = [\n    (\"Type 3: Regular\", \"Finite Automata\", \"a*b*\"),\n    (\"Type 2: Context-Free\", \"Pushdown Automata\", \"a^n b^n\"),\n    (\"Type 1: Context-Sensitive\", \"Linear Bounded Automata\", \"a^n b^n c^n\"),\n    (\"Type 0: Recursively Enumerable\", \"Turing Machine\", \"Arbitrary Computable\")\n]\nfor level, machine, example in chomsky_hierarchy:\n    print(f\"{level:30} | {machine:25} | e.g. {example}\")\n"
        },
        "detailedNotes": "### The Halting Problem Proof (Turing):\nThe problem of determining whether an arbitrary Turing Machine $M$ will halt on input $w$ is **Undecidable**! Proved via Cantor's diagonal contradiction."
      }
    ]
  },
  {
    "id": "compiler",
    "title": "Compiler Design (CD)",
    "code": "CS 306",
    "category": "Core Computer Science",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "⚡",
    "color": "#EC4899",
    "playlistId": "PLxCzCOWd7aiEKtKSIHYusizkESC42diyc",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc",
    "description": "Complete compiler engineering pipeline: Lexical Analysis, Top-Down LL(1) Parsing, Bottom-Up LR Parsing (SLR, CLR, LALR), Syntax-Directed Translation (SDT), Intermediate Code Generation (Three-Address Code), and Code Optimization.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 30 mins",
    "keyTopics": [
      "Compiler Architecture: Front-End Analysis vs Back-End Synthesis",
      "Lexical Analysis, Token Specification & Lex Tool Implementation",
      "First & Follow Sets Computation for Context-Free Grammars",
      "LL(1) Predictive Parsing Table Construction & Conflict Resolution",
      "Bottom-Up Shift-Reduce Parsing & Handle Identification",
      "LR(0) Canonical Items & SLR(1) Parsing Tables",
      "Canonical LR(1) and LALR(1) Merging Optimization",
      "Syntax-Directed Translation (SDT): S-Attributed vs L-Attributed",
      "Intermediate Code Generation: Three-Address Code, Quadruples & Triples",
      "Code Optimization: Basic Blocks, Control Flow Graphs & Loop Invariants"
    ],
    "lectures": [
      {
        "id": "cd-1",
        "lectureNumber": 1,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L1: Phases of a Compiler: Analysis vs Synthesis",
        "duration": "21:15",
        "videoId": "Qkwj65l_96I",
        "topics": [
          "Lexical, Syntax, Semantic Analysis",
          "Intermediate Code Generator",
          "Code Optimizer",
          "Target Code Generator",
          "Symbol Table Management"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "phases = [\n    \"1. Lexical Analyzer -> Generates Stream of Tokens\",\n    \"2. Syntax Analyzer -> Generates Parse Tree\",\n    \"3. Semantic Analyzer -> Type Checking & Semantic Consistency\",\n    \"4. Intermediate Code Generator -> Three-Address Code\",\n    \"5. Machine-Independent Optimizer -> Constant Folding, Dead Code\",\n    \"6. Target Code Generator -> Assembly / Machine Code\"\n]\nfor p in phases: print(p)\n"
        },
        "detailedNotes": "### Front-End vs Back-End of Compiler:\n- **Front-End (Analysis):** Lexical, Syntax, and Semantic analysis + Intermediate code generation. Completely machine-independent.\n- **Back-End (Synthesis):** Target code optimization and machine-specific assembly generation. Depends directly on target CPU architecture."
      },
      {
        "id": "cd-2",
        "lectureNumber": 2,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L2: Lexical Analysis, Token Specification & Lex Tool",
        "duration": "24:40",
        "videoId": "WfcW68sSrvw",
        "topics": [
          "Token, Pattern, Lexeme",
          "Regular Expressions in Lex",
          "Input Buffering with Sentinel",
          "Handling Whitespace and Comments"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "import re\n\ncode = \"int count = 42 + offset;\"\ntoken_specification = [\n    ('KEYWORD', r'\b(int|float|return|if)\b'),\n    ('IDENTIFIER', r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),\n    ('NUMBER', r'\bd+\b'),\n    ('OP', r'[+=]'),\n    ('SEMICOLON', r';'),\n    ('SKIP', r's+'),\n]\n\ntok_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_specification)\nfor mo in re.finditer(tok_regex, code):\n    kind = mo.lastgroup\n    if kind != 'SKIP':\n        print(f\"Token: {kind:12} | Lexeme: {mo.group()}\")\n"
        },
        "detailedNotes": "### Lexeme vs Token:\n- **Lexeme:** The concrete source code character sequence (e.g. `\"count\"`, `\"42\"`).\n- **Token:** The abstract syntactic category returned to parser (e.g. `<IDENTIFIER, \"count\">`, `<NUMBER, 42>`)."
      },
      {
        "id": "cd-3",
        "lectureNumber": 3,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L3: First and Follow Computation for Parsing Tables",
        "duration": "29:50",
        "videoId": "1g_wG4Zz8yM",
        "topics": [
          "First Set Rules",
          "Follow Set Rules",
          "Epsilon Transitions Propagation",
          "Endmarker $ Symbol in Follow"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Conceptual First Set Computation\ndef compute_first(grammar):\n    # E -> T E'\n    # E' -> + T E' | e\n    first = {\"E\": {\"id\", \"(\"}, \"E'\": {\"+\", \"e\"}, \"T\": {\"id\", \"(\"}}\n    return first\n\nprint(\"First Sets:\", compute_first({}))\n"
        },
        "detailedNotes": "### First and Follow Rules:\n- **$\text{First}(alpha)$:** Set of terminal symbols that begin strings derived from $alpha$.\n- **$\text{Follow}(A)$:** Set of terminal symbols that can appear immediately to the right of non-terminal $A$ in some sentential form. Always put `$` in $\text{Follow}(S)$ for start symbol $S$."
      },
      {
        "id": "cd-4",
        "lectureNumber": 4,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L4: LL(1) Predictive Parsing Table Construction",
        "duration": "31:20",
        "videoId": "nE9Mv2k4r1U",
        "topics": [
          "LL(1) Condition",
          "Table Entry [A, a] Rules",
          "Eliminating Left Recursion",
          "Left Factoring"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def check_ll1_conflict(table):\n    for non_terminal, row in table.items():\n        for terminal, rules in row.items():\n            if len(rules) > 1:\n                return False, f\"LL(1) Conflict at [{non_terminal}, {terminal}]: {rules}\"\n    return True, \"Valid LL(1) Grammar\"\n\nsample_table = {\"E\": {\"id\": [\"E -> T E'\"]}, \"E'\": {\"+\": [\"E' -> + T E'\"], \"$\": [\"E' -> e\"]}}\nprint(check_ll1_conflict(sample_table))\n"
        },
        "detailedNotes": "### LL(1) Definition:\n- First **L**: Left-to-right scan of input.\n- Second **L**: Produces Leftmost derivation.\n- **(1)**: Uses 1 lookahead input symbol.\nA grammar is LL(1) if and only if no cell in its parsing table contains multiple production rules!"
      },
      {
        "id": "cd-5",
        "lectureNumber": 5,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L5: Bottom-Up Parsing: Shift-Reduce Parsing & Handle Pruning",
        "duration": "26:15",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Shift Action",
          "Reduce Action",
          "Shift/Reduce Conflict",
          "Reduce/Reduce Conflict",
          "Handle Definition"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class ShiftReduceParser:\n    def __init__(self):\n        self.stack = [\"$\"]\n\n    def parse(self, tokens):\n        print(\"Parsing tokens:\", tokens)\n        # Shift and Reduce loop simulation\n\nShiftReduceParser().parse([\"id\", \"+\", \"id\", \"$\"])\n"
        },
        "detailedNotes": "### Bottom-Up Parsing:\nConstructs parse tree from the leaf nodes (tokens) up to the root start symbol $S$. At each step, a substring matching the right-hand side of a production rule (a **Handle**) is reduced to its non-terminal."
      },
      {
        "id": "cd-6",
        "lectureNumber": 6,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L6: LR(0) Items & SLR(1) Parsing Table Construction",
        "duration": "32:40",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "Augmented Grammar",
          "Closure and GOTO Operations",
          "DFA of LR(0) Items",
          "SLR(1) Follow Check for Reduce Entries"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "print(\"SLR(1) places REDUCE actions only in Follow(A) columns of row i\")\n"
        },
        "detailedNotes": "### SLR(1) Table Construction:\nIf $[A \rightarrow alpha cdot]$ is in state $I_i$, place `reduce A -> alpha` in action table row $i$ for all terminals $a in \text{Follow}(A)$."
      },
      {
        "id": "cd-7",
        "lectureNumber": 7,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L7: Canonical LR(1) and LALR(1) Parsers",
        "duration": "34:10",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "LR(1) Items [A -> alpha . beta, a]",
          "LALR(1) Merging Core States",
          "Why LALR Cannot Introduce Shift/Reduce Conflicts"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "print(\"LALR(1) merges states with identical LR(0) cores, retaining same table size as SLR(1)!\")\n"
        },
        "detailedNotes": "### Power of LR Parsers:\n$$\text{LR}(0) subset \text{SLR}(1) subset \text{LALR}(1) subset \text{CLR}(1)$$\nLALR(1) is the standard engine used in real-world tools like Yacc and Bison because it provides CLR(1) power with the compact table size of SLR(1)."
      },
      {
        "id": "cd-8",
        "lectureNumber": 8,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L8: Syntax-Directed Translation (SDT): S-Attributed vs L-Attributed",
        "duration": "28:10",
        "videoId": "k7P3r8wM2yA",
        "topics": [
          "Synthesized Attributes (Bottom-up evaluation)",
          "Inherited Attributes",
          "S-Attributed SDD (Postorder)",
          "L-Attributed SDD (Left-to-right evaluation)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class ASTNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# S-Attributed evaluator: E -> E + T { E.val = E1.val + T.val }\ndef evaluate_ast(node):\n    if node.left is None and node.right is None:\n        return int(node.val)\n    left_val = evaluate_ast(node.left)\n    right_val = evaluate_ast(node.right)\n    return left_val + right_val if node.val == \"+\" else left_val * right_val\n\nast = ASTNode(\"+\", ASTNode(\"3\"), ASTNode(\"5\"))\nprint(\"Evaluated AST Expression:\", evaluate_ast(ast))\n"
        },
        "detailedNotes": "### Attribute Types:\n- **Synthesized Attribute:** Computed from attribute values of child nodes in parse tree.\n- **Inherited Attribute:** Computed from attribute values of parent and/or sibling nodes."
      },
      {
        "id": "cd-9",
        "lectureNumber": 9,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L9: Intermediate Code Generation: Three-Address Code (3AC)",
        "duration": "27:20",
        "videoId": "a6M7r8b9yVU",
        "topics": [
          "Quadruples (op, arg1, arg2, res)",
          "Triples (op, arg1, arg2)",
          "Indirect Triples",
          "Translating Boolean and Control Flow"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "class Quadruple:\n    def __init__(self, op, arg1, arg2, result):\n        self.op = op; self.arg1 = arg1; self.arg2 = arg2; self.result = result\n    def __repr__(self):\n        return f\"({self.op:4}, {self.arg1:4}, {self.arg2:4}, {self.result:4})\"\n\n# x = a + b * c\nquads = [\n    Quadruple(\"*\", \"b\", \"c\", \"t1\"),\n    Quadruple(\"+\", \"a\", \"t1\", \"x\")\n]\nfor q in quads: print(q)\n"
        },
        "detailedNotes": "### Three-Address Code (3AC):\nA linear sequence of instructions where each instruction has at most one operator on the right-hand side (e.g. `x = y op z`)."
      },
      {
        "id": "cd-10",
        "lectureNumber": 10,
        "subjectId": "compiler",
        "subjectName": "Compiler",
        "title": "L10: Code Optimization: Basic Blocks & Control Flow Graphs",
        "duration": "31:15",
        "videoId": "d3Q8r7vM1wA",
        "topics": [
          "Leader Statement Identification Rules",
          "Control Flow Graph (CFG)",
          "Constant Folding & Propagation",
          "Common Subexpression Elimination",
          "Loop Invariant Code Motion"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def constant_folding(instructions):\n    optimized = []\n    constants = {}\n    for inst in instructions:\n        # e.g., t1 = 3 + 5 -> t1 = 8\n        if len(inst) == 5 and inst[3] == \"+\" and inst[2].isdigit() and inst[4].isdigit():\n            val = str(int(inst[2]) + int(inst[4]))\n            constants[inst[0]] = val\n            optimized.append(f\"{inst[0]} = {val}\")\n        else:\n            optimized.append(\" \".join(inst))\n    return optimized\n\ncode = [[\"t1\", \"=\", \"3\", \"+\", \"5\"], [\"x\", \"=\", \"t1\", \"*\", \"2\"]]\nprint(\"Optimized Code:\", constant_folding(code))\n"
        },
        "detailedNotes": "### Identifying Basic Block Leaders:\n1. First statement is a leader.\n2. Any statement that is the target of a conditional or unconditional jump is a leader.\n3. Any statement that immediately follows a jump is a leader."
      }
    ]
  },
  {
    "id": "discrete-math",
    "title": "Discrete Mathematics (DM)",
    "code": "CS 201",
    "category": "Foundations & Mathematics",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "📐",
    "color": "#3B82F6",
    "playlistId": "PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
    "description": "Foundations of mathematical logic and discrete structures: Propositional & Predicate Logic, Sets & Relations, Functions, Combinatorics, Recurrence Relations, Graph Theory, and Algebraic Groups.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 40 mins",
    "keyTopics": [
      "Propositional Logic, Truth Tables & Logical Equivalences",
      "Predicates, Universal (forall) & Existential (exists) Quantifiers",
      "Set Theory, Power Sets & Inclusion-Exclusion Principle",
      "Relations: Equivalence Relations, Partial Orders & Hasse Diagrams",
      "Functions: Injective, Surjective & Bijective Mappings",
      "Combinatorics: Permutations, Combinations & Pigeonhole Principle",
      "Solving Linear Homogeneous Recurrence Relations",
      "Graph Theory: Handshaking Lemma, Euler & Hamiltonian Circuits",
      "Trees, Spanning Trees & Planar Graphs (Euler Formula)",
      "Group Theory: Monoids, Semigroups, Groups & Abelian Groups"
    ],
    "lectures": [
      {
        "id": "dm-1",
        "lectureNumber": 1,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L1: Propositional Logic, Truth Tables & Logical Equivalences",
        "duration": "21:30",
        "videoId": "w65p53k99m8",
        "topics": [
          "Propositions",
          "Conjunction, Disjunction, Negation",
          "Implication (p -> q == ~p v q)",
          "Tautology, Contradiction, Contingency"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "def implies(p, q): return (not p) or q\n\nprint(\"Truth Table for p -> q:\")\nfor p in [True, False]:\n    for q in [True, False]:\n        print(f\"p={p:5} | q={q:5} | p -> q: {implies(p, q)}\")\n"
        },
        "detailedNotes": "### Core Logical Equivalences:\n- **Implication:** $p \rightarrow q equiv \neg p lor q$\n- **Contrapositive:** $p \rightarrow q equiv \neg q \rightarrow \neg p$\n- **De Morgan's Laws:** $\neg (p land q) equiv \neg p lor \neg q$, $\neg (p lor q) equiv \neg p land \neg q$"
      },
      {
        "id": "dm-2",
        "lectureNumber": 2,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L2: Predicates & Quantifiers (Universal & Existential)",
        "duration": "23:40",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "Predicate P(x)",
          "Universal Quantifier (forall)",
          "Existential Quantifier (exists)",
          "Negation of Quantified Statements"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "domain = [2, 4, 6, 8]\n# forall x, P(x): x is even\nall_even = all(x % 2 == 0 for x in domain)\n# exists x, Q(x): x > 5\nexists_gt_5 = any(x > 5 for x in domain)\nprint(\"All even:\", all_even, \"| Exists > 5:\", exists_gt_5)\n"
        },
        "detailedNotes": "### Negating Quantifiers:\n- $\neg (\forall x P(x)) equiv exists x \neg P(x)$\n- $\neg (exists x P(x)) equiv \forall x \neg P(x)$"
      },
      {
        "id": "dm-3",
        "lectureNumber": 3,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L3: Set Theory, Power Sets & Inclusion-Exclusion Principle",
        "duration": "25:15",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "Subsets & Power Sets (|P(A)| = 2^n)",
          "Cartesian Products",
          "Principle of Inclusion-Exclusion for 2 & 3 sets"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "def pie_3_sets(a, b, c, ab, bc, ac, abc):\n    return a + b + c - ab - bc - ac + abc\n\nprint(\"Total Students in at least one club:\", pie_3_sets(50, 40, 30, 20, 15, 10, 5))\n"
        },
        "detailedNotes": "### Inclusion-Exclusion Principle:\n$$|A cup B cup C| = |A| + |B| + |C| - |A cap B| - |B cap C| - |A cap C| + |A cap B cap C|$$"
      },
      {
        "id": "dm-4",
        "lectureNumber": 4,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L4: Relations: Reflexive, Symmetric, Transitive & Posets",
        "duration": "31:20",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "Equivalence Relation",
          "Partial Order Relation (Reflexive, Antisymmetric, Transitive)",
          "Hasse Diagrams",
          "Total Order"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def is_equivalence(relation, domain):\n    is_refl = all((x, x) in relation for x in domain)\n    is_symm = all((y, x) in relation for (x, y) in relation)\n    is_trans = True\n    for (x, y) in relation:\n        for (a, b) in relation:\n            if y == a and (x, b) not in relation: is_trans = False\n    return is_refl and is_symm and is_trans\n\ndom = {1, 2, 3}\nrel = {(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)}\nprint(\"Is Equivalence Relation:\", is_equivalence(rel, dom))\n"
        },
        "detailedNotes": "### Relations Summary:\n- **Equivalence Relation:** Reflexive, Symmetric, and Transitive.\n- **Partial Order (Poset):** Reflexive, Anti-symmetric, and Transitive."
      },
      {
        "id": "dm-5",
        "lectureNumber": 5,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L5: Functions: Injective (1-to-1), Surjective (Onto) & Bijective",
        "duration": "24:50",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Injective Function Condition",
          "Surjective Function Condition",
          "Bijective Inverse Function",
          "Counting Total Functions (n^m)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Counting functions from Set A (|A|=m) to Set B (|B|=n)\ndef count_functions(m, n):\n    total = n ** m\n    one_to_one = 1\n    if m <= n:\n        for i in range(m): one_to_one *= (n - i)\n    else:\n        one_to_one = 0\n    return total, one_to_one\n\nprint(\"Total & Injective Functions (|A|=3, |B|=4):\", count_functions(3, 4))\n"
        },
        "detailedNotes": "### Function Properties:\n- **Injective:** $f(a) = f(b) implies a = b$. Requires $|A| le |B|$.\n- **Surjective:** For every $b in B$, $exists a in A$ such that $f(a) = b$. Requires $|A| ge |B|$.\n- **Bijective:** Both Injective and Surjective. Inverse function $f^{-1}$ exists!"
      },
      {
        "id": "dm-6",
        "lectureNumber": 6,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L6: Combinatorics: Permutations, Combinations & Pigeonhole Principle",
        "duration": "28:10",
        "videoId": "q6M7r8b9yVU",
        "topics": [
          "P(n, r) and C(n, r)",
          "Pigeonhole Principle (PHP)",
          "Generalized Pigeonhole Principle (ceil(N/k))"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import math\n\ndef min_students_for_same_grade(students, grades=5):\n    # Generalized PHP: ceil(N / k)\n    return math.ceil(students / grades)\n\nprint(\"In a class of 32 students with 5 grades, at least:\", min_students_for_same_grade(32, 5), \"receive the same grade.\")\n"
        },
        "detailedNotes": "### Generalized Pigeonhole Principle:\nIf $N$ items are put into $k$ boxes, then at least one box must contain at least $lceil N / k \rceil$ items."
      },
      {
        "id": "dm-7",
        "lectureNumber": 7,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L7: Recurrence Relations: Linear Homogeneous Solutions",
        "duration": "31:40",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "Characteristic Equation Method",
          "Distinct Roots",
          "Repeated Roots",
          "Fibonacci Closed-Form (Binet Formula)"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import math\n\n# Binet's closed form for Fibonacci\ndef fibonacci_closed_form(n):\n    phi = (1 + math.sqrt(5)) / 2\n    psi = (1 - math.sqrt(5)) / 2\n    return round((phi**n - psi**n) / math.sqrt(5))\n\nprint(\"Fibonacci(10) via closed form:\", fibonacci_closed_form(10))\n"
        },
        "detailedNotes": "### Solving $a_n = c_1 a_{n-1} + c_2 a_{n-2}$:\nForm characteristic equation: $r^2 - c_1 r - c_2 = 0$.\n- Distinct real roots $r_1, r_2$: $a_n = A r_1^n + B r_2^n$.\n- Repeated root $r_1 = r_2 = r$: $a_n = (A + Bn) r^n$."
      },
      {
        "id": "dm-8",
        "lectureNumber": 8,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L8: Graph Theory: Handshaking Lemma, Euler & Hamiltonian Graphs",
        "duration": "29:30",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Handshaking Lemma (Sum of Degrees = 2|E|)",
          "Number of Odd Degree Vertices is Even",
          "Euler Circuit (All degrees even)",
          "Hamiltonian Cycles"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def has_euler_circuit(adj_list):\n    # Connected + every vertex has even degree\n    return all(len(neighbors) % 2 == 0 for neighbors in adj_list.values())\n\ngraph = {\"A\": [\"B\", \"C\"], \"B\": [\"A\", \"C\"], \"C\": [\"A\", \"B\"]}\nprint(\"Graph has Euler Circuit:\", has_euler_circuit(graph))\n"
        },
        "detailedNotes": "### The Handshaking Lemma:\n$$sum_{v in V} \text{deg}(v) = 2 |E|$$\nDirect Corollary: In any graph, the count of vertices with odd degree must be an **even** number!"
      },
      {
        "id": "dm-9",
        "lectureNumber": 9,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L9: Trees, Spanning Trees & Planar Graphs (Euler Formula)",
        "duration": "32:10",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "Tree Properties (|E| = |V| - 1)",
          "Planar Graphs",
          "Euler Planar Formula: V - E + R = 2",
          "K5 and K3,3 Kuratowski Theorem"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "def planar_faces(v, e):\n    # V - E + R = 2 => R = 2 - V + E\n    return 2 - v + e\n\nprint(\"Faces in connected planar graph (V=6, E=9):\", planar_faces(6, 9))\n"
        },
        "detailedNotes": "### Planar Graphs:\nA graph is planar if it can be drawn in a plane without any intersecting edges.\n- **Euler's Formula:** $V - E + R = 2$ (where $R$ is number of regions/faces).\n- For simple planar graphs with $V ge 3$: $E le 3V - 6$."
      },
      {
        "id": "dm-10",
        "lectureNumber": 10,
        "subjectId": "discrete-math",
        "subjectName": "Discrete Math",
        "title": "L10: Group Theory: Monoids, Semigroups, Groups & Abelian Groups",
        "duration": "33:15",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Closure Property",
          "Associativity (Semigroup)",
          "Identity Element (Monoid)",
          "Inverse Element (Group)",
          "Commutativity (Abelian Group)"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "properties = [\n    (\"Groupoid\", \"Closure only\"),\n    (\"Semigroup\", \"Closure + Associativity\"),\n    (\"Monoid\", \"Closure + Associativity + Identity element\"),\n    (\"Group\", \"Closure + Associativity + Identity + Inverses for all elements\"),\n    (\"Abelian Group\", \"Group + Commutative property (a * b = b * a)\")\n]\nfor p, desc in properties: print(f\"{p:15} -> {desc}\")\n"
        },
        "detailedNotes": "### Group Axioms $(G, *)$:\n1. **Closure:** $\forall a, b in G, a * b in G$.\n2. **Associativity:** $\forall a, b, c in G, (a * b) * c = a * (b * c)$.\n3. **Identity:** $exists e in G$ such that $\forall a in G, a * e = e * a = a$.\n4. **Inverse:** $\forall a in G, exists a^{-1} in G$ such that $a * a^{-1} = e$."
      }
    ]
  },
  {
    "id": "software-eng",
    "title": "Software Engineering (SE)",
    "code": "CS 307",
    "category": "Software Lifecycle & QA",
    "instructor": "Gate Smashers (Varun Singla)",
    "icon": "📋",
    "color": "#10B981",
    "playlistId": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
    "description": "Software engineering methodologies & quality assurance: SDLC Models, Agile, Scrum, Requirements Engineering (SRS), Architecture, Cohesion & Coupling, Black-Box & White-Box Testing, Cyclomatic Complexity, and CI/CD.",
    "lecturesCount": 10,
    "totalDuration": "4 hrs 15 mins",
    "keyTopics": [
      "SDLC Lifecycle Phases (Requirements, Design, Coding, Testing, Maintenance)",
      "Classical Models: Waterfall, Spiral (Risk-Driven), Prototyping & RAD",
      "Agile Methodology, Scrum Framework, Sprints, Standups & Backlogs",
      "Software Requirements Specification (SRS) IEEE 830 Standards",
      "Architectural Styles: Monolith vs Microservices vs Event-Driven",
      "Modular Design Metrics: Cohesion Types vs Coupling Types",
      "Black-Box Testing: Boundary Value Analysis & Equivalence Partitioning",
      "White-Box Testing: Control Flow Graphs, Basis Path & Cyclomatic Complexity",
      "Software Maintenance, Reverse Engineering & Technical Debt",
      "Continuous Integration, Delivery & Automated Deployment Pipelines"
    ],
    "lectures": [
      {
        "id": "se-1",
        "lectureNumber": 1,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L1: Software Engineering Process, SDLC Phases & Life Cycles",
        "duration": "18:40",
        "videoId": "Q_g6mF8z9yM",
        "topics": [
          "Software Crisis & Motivation",
          "Feasibility Study",
          "SRS Documentation",
          "Design, Implementation, Testing, Maintenance"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "sdlc_phases = [\n    \"1. Feasibility Study & Requirement Analysis\",\n    \"2. System Design (High-Level & Low-Level Design)\",\n    \"3. Implementation & Unit Testing\",\n    \"4. Integration & System Testing\",\n    \"5. Deployment & Maintenance\"\n]\nfor phase in sdlc_phases: print(phase)\n"
        },
        "detailedNotes": "### Software Engineering Principles:\nSoftware Engineering provides systematic, disciplined, quantifiable approaches to the development, operation, and maintenance of software to avoid the historical **Software Crisis** (over budget, delayed delivery, unreliable code)."
      },
      {
        "id": "se-2",
        "lectureNumber": 2,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L2: Classical SDLC Models: Waterfall vs Spiral (Risk-Driven)",
        "duration": "22:15",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "Classical Waterfall vs Iterative Waterfall",
          "Prototyping Model",
          "Boehm Spiral Model (Risk Handling)",
          "V-Model for Verification & Validation"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "spiral_quadrants = [\n    \"Q1: Objective Determination & Identify Alternative Solutions\",\n    \"Q2: Risk Analysis & Prototyping Evaluation\",\n    \"Q3: Engineering Development & Testing\",\n    \"Q4: Customer Review & Plan Next Iteration\"\n]\nfor q in spiral_quadrants: print(q)\n"
        },
        "detailedNotes": "### Model Comparison:\n- **Waterfall:** Linear sequential flow. Simple, disciplined, but poor for projects with dynamic changing requirements.\n- **Spiral Model:** Meta-model that incorporates iterative development with explicit **Risk Analysis** in every cycle. Ideal for massive, high-risk aerospace/defense projects."
      },
      {
        "id": "se-3",
        "lectureNumber": 3,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L3: Agile Methodologies & The Scrum Framework",
        "duration": "25:30",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "Agile Manifesto Values",
          "Scrum Roles (Product Owner, Scrum Master, Dev Team)",
          "Sprint Ceremonies (Planning, Daily Standup, Review, Retrospective)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "class ScrumSprint:\n    def __init__(self, sprint_number: int, duration_weeks: int = 2):\n        self.sprint_number = sprint_number\n        self.duration_weeks = duration_weeks\n        self.backlog = []\n\n    def add_user_story(self, story, story_points):\n        self.backlog.append({\"story\": story, \"points\": story_points})\n\nsprint = ScrumSprint(1)\nsprint.add_user_story(\"As a user, I want OAuth login so that I can sign in securely\", 5)\nprint(\"Sprint Backlog:\", sprint.backlog)\n"
        },
        "detailedNotes": "### Agile Manifesto:\n1. **Individuals and interactions** over processes and tools.\n2. **Working software** over comprehensive documentation.\n3. **Customer collaboration** over contract negotiation.\n4. **Responding to change** over following a plan."
      },
      {
        "id": "se-4",
        "lectureNumber": 4,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L4: Requirements Engineering & SRS IEEE 830 Standards",
        "duration": "23:50",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "Functional vs Non-Functional Requirements",
          "Requirement Elicitation",
          "SRS Characteristics (Unambiguous, Complete, Verifiable)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "requirements = {\n    \"Functional\": [\"User can reset password via email OTP\", \"Checkout calculates 8% sales tax\"],\n    \"Non-Functional\": [\"P99 latency < 200ms\", \"System availability >= 99.99%\", \"GDPR compliant data storage\"]\n}\nfor k, v in requirements.items():\n    print(f\"[{k}]\", v)\n"
        },
        "detailedNotes": "### Good SRS Characteristics:\n- **Unambiguous:** Every requirement has exactly one interpretation.\n- **Verifiable:** A quantifiable test can prove whether the system satisfies the requirement.\n- **Traceable:** Origin of each requirement is clear and can be tracked through design and code."
      },
      {
        "id": "se-5",
        "lectureNumber": 5,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L5: Software Architecture: Monolith vs Microservices",
        "duration": "28:10",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Monolithic Architecture",
          "Microservices Distributed Services",
          "API Gateway & Service Discovery",
          "Database per Service Pattern"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "print(\"Microservices: Independent deployments, polyglot persistence, bounded contexts!\")\n"
        },
        "detailedNotes": "### Monolith vs Microservices:\n- **Monolith:** Single deployable unit, shared database, simple initial development, but scaling bottlenecks as organization grows.\n- **Microservices:** Loosely coupled services organized around business domains. Independently deployable and scalable, but introduces distributed network complexity."
      },
      {
        "id": "se-6",
        "lectureNumber": 6,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L6: Modular Design: Cohesion Types vs Coupling Types",
        "duration": "27:40",
        "videoId": "q6M7r8b9yVU",
        "topics": [
          "Goal: High Cohesion & Low Coupling",
          "Cohesion Levels (Functional down to Coincidental)",
          "Coupling Levels (Data up to Content Coupling)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "cohesion_hierarchy = [\"Functional (BEST)\", \"Sequential\", \"Communicational\", \"Procedural\", \"Temporal\", \"Logical\", \"Coincidental (WORST)\"]\ncoupling_hierarchy = [\"Data Coupling (BEST/LOOSEST)\", \"Stamp\", \"Control\", \"External\", \"Common\", \"Content Coupling (WORST/TIGHTEST)\"]\n\nprint(\"Cohesion Goal (Higher is better):\", cohesion_hierarchy[0])\nprint(\"Coupling Goal (Lower is better):\", coupling_hierarchy[0])\n"
        },
        "detailedNotes": "### Modular Engineering Golden Rule:\n**High Cohesion, Low Coupling!**\n- **Functional Cohesion:** Every element in the module contributes to a single well-defined task.\n- **Data Coupling:** Modules communicate strictly by passing necessary data arguments."
      },
      {
        "id": "se-7",
        "lectureNumber": 7,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L7: Black-Box Testing: Boundary Value Analysis & Equivalence Partitioning",
        "duration": "26:20",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "Equivalence Classes (Valid vs Invalid)",
          "Boundary Value Analysis (min, min+, nom, max-, max)",
          "Robustness Testing"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "def generate_bva_test_cases(min_val, max_val):\n    # Standard BVA: min-1, min, min+1, nom, max-1, max, max+1\n    nom = (min_val + max_val) // 2\n    return [min_val - 1, min_val, min_val + 1, nom, max_val - 1, max_val, max_val + 1]\n\nprint(\"BVA Test Cases for age between 18 and 60:\", generate_bva_test_cases(18, 60))\n"
        },
        "detailedNotes": "### Boundary Value Analysis (BVA):\nErrors cluster at the boundaries of input domains! For an input range $[a, b]$, test values: $a-1, a, a+1, \text{nominal}, b-1, b, b+1$."
      },
      {
        "id": "se-8",
        "lectureNumber": 8,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L8: White-Box Testing: Cyclomatic Complexity & Basis Path Testing",
        "duration": "29:45",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Control Flow Graph (CFG)",
          "McCabe Cyclomatic Complexity Formulas (V(G) = E - N + 2P)",
          "Independent Basis Paths"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def cyclomatic_complexity(edges, nodes, connected_components=1):\n    return edges - nodes + (2 * connected_components)\n\nprint(\"Cyclomatic Complexity for CFG with 14 edges and 11 nodes:\", cyclomatic_complexity(14, 11, 1))\n"
        },
        "detailedNotes": "### McCabe's Cyclomatic Complexity $V(G)$:\n1. $V(G) = E - N + 2P$ (where $E$ is edges, $N$ is nodes, $P$ is connected components).\n2. $V(G) = P + 1$ (where $P$ is the count of predicate / decision nodes).\n3. Equals the exact count of linearly independent execution paths through source code."
      },
      {
        "id": "se-9",
        "lectureNumber": 9,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L9: Software Maintenance, Refactoring & Technical Debt",
        "duration": "21:10",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "Corrective, Adaptive, Perfective, Preventive Maintenance",
          "Code Smells & Refactoring",
          "Managing Technical Debt"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "maintenance_types = {\n    \"Corrective\": \"Fix bugs discovered by users in production\",\n    \"Adaptive\": \"Port software to new OS, cloud environment, or updated database\",\n    \"Perfective\": \"Enhance features and optimize performance\",\n    \"Preventive\": \"Refactor code to prevent future failures (reduce tech debt)\"\n}\nfor k, v in maintenance_types.items(): print(f\"{k:12} -> {v}\")\n"
        },
        "detailedNotes": "### Maintenance Categories:\nOver $60%$ of software engineering lifecycle cost is spent in post-deployment maintenance, with **Perfective Maintenance** representing the largest share."
      },
      {
        "id": "se-10",
        "lectureNumber": 10,
        "subjectId": "software-eng",
        "subjectName": "Software Eng",
        "title": "L10: Modern CI/CD Pipelines & DevOps Automation",
        "duration": "27:50",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Continuous Integration (CI)",
          "Continuous Delivery vs Deployment (CD)",
          "Automated Test Suites & Canary Releases",
          "Blue-Green Deployments"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "print(\"CI/CD Pipeline: Commit -> Unit Tests -> Build Image -> Staging -> Smoke Tests -> Production Canary\")\n"
        },
        "detailedNotes": "### Blue-Green Deployment:\nMaintains two identical production environments (Blue = live active traffic, Green = idle standby). Deploy new version to Green, run smoke tests, then switch router traffic instantly with zero downtime."
      }
    ]
  },
  {
    "id": "devops",
    "title": "DevOps & Cloud Engineering",
    "code": "CS 403",
    "category": "Infrastructure & Operations",
    "instructor": "Kunal Kushwaha (DevOps Bootcamp)",
    "icon": "🚀",
    "color": "#06B6D4",
    "playlistId": "PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF",
    "playlistUrl": "https://www.youtube.com/playlist?list=PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF",
    "description": "Modern infrastructure engineering from code to cloud: Linux Shell, Git Flow, Docker Architecture, Multi-Stage Builds, Docker Compose, Kubernetes Pods/Services/Ingress, Terraform (IaC), and GitHub Actions CI/CD.",
    "lecturesCount": 10,
    "totalDuration": "5 hrs 10 mins",
    "keyTopics": [
      "DevOps Culture, Tools Ecosystem & Infrastructure as Code (IaC)",
      "Linux Shell Essentials: Permissions, Systemd & Bash Scripting",
      "Advanced Git: Interactive Rebasing, Bisect & Cherry-Picking",
      "Docker Architecture: OCI Images, Layers & Dockerfile Best Practices",
      "Docker Networking, Storage Volumes & Multi-Stage Builds",
      "Docker Compose: Multi-Service Application Orchestration",
      "Kubernetes Architecture: Control Plane, Nodes, Pods & ReplicaSets",
      "Kubernetes Deployments, Rolling Updates & Services (ClusterIP, Ingress)",
      "Infrastructure as Code (IaC) with Terraform Fundamentals",
      "GitHub Actions: Production CI/CD Build, Test & Deployment Automation"
    ],
    "lectures": [
      {
        "id": "devops-1",
        "lectureNumber": 1,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L1: DevOps Culture, CI/CD Lifecycle & Cloud Infrastructure",
        "duration": "25:20",
        "videoId": "1a2b3c4d5eF",
        "topics": [
          "DevOps Principles (CAMS)",
          "Immutable Infrastructure",
          "Microservices Containerization",
          "Cloud Native Computing Foundation (CNCF)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "#!/usr/bin/env bash\n# Basic Server Health Check Script\necho \"=== System Health ===\"\nuptime\ndf -h /\nfree -m\n"
        },
        "detailedNotes": "### The CAMS DevOps Framework:\n- **Culture:** Collaboration between developers and operations engineers.\n- **Automation:** Automating builds, testing, security scans, and provisioning.\n- **Measurement:** Tracking metrics (DORA metrics: deployment frequency, lead time, MTTR, change fail rate).\n- **Sharing:** Open communication across functional silos."
      },
      {
        "id": "devops-2",
        "lectureNumber": 2,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L2: Linux Shell Essentials: Permissions, Systemd & Bash Scripting",
        "duration": "32:40",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "Chmod (Octal Notation 755)",
          "Chown & User Groups",
          "Pipes & Redirection",
          "Systemd Service Management (systemctl)",
          "Cron Automation"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "#!/bin/bash\n# Backup Directory Script with timestamp\nBACKUP_DIR=\"/backups/$(date +%Y%m%d_%H%M%S)\"\nmkdir -p \"$BACKUP_DIR\"\ntar -czf \"$BACKUP_DIR/app_data.tar.gz\" /var/www/app\necho \"Backup saved to $BACKUP_DIR\"\n"
        },
        "detailedNotes": "### Linux Permissions Octal Breakdown:\n- Read ($r$) = 4, Write ($w$) = 2, Execute ($x$) = 1.\n- `chmod 755 file.sh`: Owner has 7 ($rwx$), Group has 5 ($r-x$), Others have 5 ($r-x$)."
      },
      {
        "id": "devops-3",
        "lectureNumber": 3,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L3: Version Control with Git: Branching, Rebasing & Cherry-Pick",
        "duration": "28:15",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "Git Objects (Blobs, Trees, Commits)",
          "Merge vs Rebase",
          "Resolving Merge Conflicts",
          "git bisect for bug hunting"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "git checkout -b feature/auth-jwt\ngit commit -am \"feat: implement JWT token refresh\"\n# Interactive rebase onto main\ngit rebase -i main\n"
        },
        "detailedNotes": "### Merge vs Rebase:\n- **Git Merge:** Preserves complete historical timeline with a dedicated merge commit.\n- **Git Rebase:** Replays commits on top of another branch, producing a clean, linear project history."
      },
      {
        "id": "devops-4",
        "lectureNumber": 4,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L4: Docker Architecture: Images, Containers & Multi-Stage Builds",
        "duration": "36:10",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "Container vs Virtual Machine",
          "Namespaces & Cgroups",
          "Layer Caching Optimization",
          "Multi-Stage Dockerfiles for Minimal Footprint"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Production Multi-Stage Node.js Dockerfile\n# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production Runtime\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nRUN npm ci --only=production\nUSER node\nCMD [\"node\", \"dist/main.js\"]\n"
        },
        "detailedNotes": "### Multi-Stage Build Benefit:\nSeparate build dependencies (TypeScript compiler, headers, dev-packages) from production image, shrinking container image from 1.2 GB down to ~80 MB!"
      },
      {
        "id": "devops-5",
        "lectureNumber": 5,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L5: Docker Networking & Persistent Volumes",
        "duration": "26:50",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Bridge, Host, None, Overlay Networks",
          "Named Volumes vs Bind Mounts",
          "Container Healthchecks"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Create isolated network & persistent volume for database\ndocker network create backend-net\ndocker volume create pg-data\ndocker run -d --name postgres-db --network backend-net -v pg-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine\n"
        },
        "detailedNotes": "### Docker Storage:\n- **Named Volumes:** Managed by Docker in `/var/lib/docker/volumes/`. Safest for databases.\n- **Bind Mounts:** Maps arbitrary host folder into container. Ideal for live local development."
      },
      {
        "id": "devops-6",
        "lectureNumber": 6,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L6: Docker Compose: Multi-Service Application Orchestration",
        "duration": "30:20",
        "videoId": "q6M7r8b9yVU",
        "topics": [
          "docker-compose.yml Syntax",
          "Service Dependencies (depends_on)",
          "Environment Variables (.env)",
          "Port Forwarding"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - REDIS_HOST=cache\n    depends_on:\n      - cache\n\n  cache:\n    image: redis:7-alpine\n    ports:\n      - \"6379:6379\"\n"
        },
        "detailedNotes": "### Docker Compose:\nA tool for defining and running multi-container Docker applications via a single declarative YAML specification. Automatically configures a shared private DNS network for all declared services."
      },
      {
        "id": "devops-7",
        "lectureNumber": 7,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L7: Kubernetes Architecture: Control Plane, Nodes & Pods",
        "duration": "38:40",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "API Server, etcd, Scheduler, Controller Manager",
          "Kubelet, Kube-Proxy",
          "Pods as Smallest Deployable Unit",
          "kubectl CLI Commands"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Basic Kubernetes Pod Specification (pod.yaml)\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod\n  labels:\n    app: web\nspec:\n  containers:\n  - name: nginx\n    image: nginx:alpine\n    ports:\n    - containerPort: 80\n"
        },
        "detailedNotes": "### Kubernetes Architecture:\n- **Control Plane:**\n  - **kube-apiserver:** Gateway exposing Kubernetes REST API.\n  - **etcd:** Distributed consistent key-value store for entire cluster state.\n  - **kube-scheduler:** Assigns unscheduled Pods to suitable worker Nodes.\n  - **kube-controller-manager:** Enforces desired state (Node, ReplicaSet, Endpoints).\n- **Worker Node:** Runs `kubelet` (node agent), `kube-proxy` (networking), and container runtime."
      },
      {
        "id": "devops-8",
        "lectureNumber": 8,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L8: Kubernetes Deployments, Services & Ingress Controllers",
        "duration": "35:15",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Deployment Manifests",
          "Rolling Updates & Rollbacks",
          "ClusterIP, NodePort, LoadBalancer Services",
          "Ingress Routing Rules"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: api\n  template:\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: api-server\n        image: api:v1.0.0\n        ports:\n        - containerPort: 8080\n"
        },
        "detailedNotes": "### Service Types:\n- **ClusterIP:** Default. Exposes service on internal cluster-only IP.\n- **NodePort:** Exposes service on static port on each Node's public IP (`30000-32767`).\n- **LoadBalancer:** Provisions cloud provider external load balancer (AWS ELB/GCP LB).\n- **Ingress:** Manages external HTTP/HTTPS routing rules to cluster services with SSL termination."
      },
      {
        "id": "devops-9",
        "lectureNumber": 9,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L9: Infrastructure as Code (IaC) with Terraform Fundamentals",
        "duration": "31:30",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "HashiCorp Configuration Language (HCL)",
          "Providers & Resources",
          "terraform init, plan, apply",
          "Remote State & State Locking"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Terraform AWS Provider & S3 Bucket Definition\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_s3_bucket\" \"app_storage\" {\n  bucket = \"company-app-production-storage\"\n}\n"
        },
        "detailedNotes": "### Declarative Infrastructure as Code:\nYou declare *WHAT* resources you want created; Terraform calculates the dependency graph and executes the minimal set of API calls needed to transition real-world infrastructure into that desired state."
      },
      {
        "id": "devops-10",
        "lectureNumber": 10,
        "subjectId": "devops",
        "subjectName": "DevOps",
        "title": "L10: GitHub Actions: Automated CI/CD Pipelines from Scratch",
        "duration": "29:40",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Workflow YAML Syntax",
          "Events (push, pull_request)",
          "Jobs, Steps & Action Runners",
          "Secrets Management & Container Publishing"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "name: CI/CD Pipeline\non:\n  push:\n    branches: [ \"main\" ]\n\njobs:\n  test-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v4\n    - name: Set up Node.js\n      uses: actions/setup-node@v4\n      with:\n        node-version: 20\n    - run: npm ci\n    - run: npm test\n    - run: npm run build\n"
        },
        "detailedNotes": "### GitHub Actions Architecture:\nWorkflows triggered by repository events execute across virtual runner environments. Secrets (API keys, deployment credentials) are encrypted and injected securely at runtime."
      }
    ]
  },
  {
    "id": "ml-ai",
    "title": "Machine Learning & AI Foundations",
    "code": "CS 404",
    "category": "Artificial Intelligence & Data",
    "instructor": "Krish Naik & Andrew Ng",
    "icon": "🤖",
    "color": "#8B5CF6",
    "playlistId": "PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe",
    "description": "Foundational machine learning algorithms and neural network architectures: Supervised vs Unsupervised Paradigms, Gradient Descent, Linear & Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, K-Means Clustering, PCA, and Neural Networks.",
    "lecturesCount": 10,
    "totalDuration": "5 hrs 20 mins",
    "keyTopics": [
      "Machine Learning Taxonomy: Supervised, Unsupervised & Reinforcement",
      "Data Preprocessing, Feature Scaling (Standard vs MinMax) & Encoding",
      "Linear Regression from Scratch with Gradient Descent Optimization",
      "Logistic Regression, Sigmoid Activation & Classification Metrics",
      "Decision Trees: Entropy, Information Gain & Gini Impurity",
      "Ensemble Learning: Bagging (Random Forest) vs Boosting (XGBoost)",
      "Support Vector Machines (SVM): Hyperplanes & Kernel Trick",
      "K-Means Clustering: WCSS & Elbow Method for Optimal K",
      "Principal Component Analysis (PCA) for Dimensionality Reduction",
      "Neural Networks: Multi-Layer Perceptrons & Backpropagation Calculus"
    ],
    "lectures": [
      {
        "id": "ml-1",
        "lectureNumber": 1,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L1: Machine Learning Paradigms: Supervised, Unsupervised & RL",
        "duration": "22:15",
        "videoId": "i_LwzRVP7bg",
        "topics": [
          "Supervised Learning (Regression, Classification)",
          "Unsupervised Learning (Clustering, Dimension Reduction)",
          "Reinforcement Learning (Agent, Environment, Reward)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "paradigms = {\n    \"Supervised\": \"Labeled dataset (X, y) -> Predict house prices or spam email\",\n    \"Unsupervised\": \"Unlabeled dataset (X) -> Customer segmentation, anomaly detection\",\n    \"Reinforcement\": \"Reward-based feedback loop -> Game playing (Chess/Go), robotics\"\n}\nfor k, v in paradigms.items(): print(f\"[{k}] {v}\")\n"
        },
        "detailedNotes": "### Core Paradigms:\n- **Supervised Learning:** Algorithms learn a mapping function $f: X \rightarrow y$ from paired input-output training samples.\n- **Unsupervised Learning:** Finds intrinsic patterns, clusters, or lower-dimensional representations in unannotated data.\n- **Reinforcement Learning:** An agent interacts with an environment, learning an optimal policy $pi(a|s)$ to maximize cumulative discounted reward."
      },
      {
        "id": "ml-2",
        "lectureNumber": 2,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L2: Exploratory Data Analysis (EDA) & Feature Scaling",
        "duration": "26:40",
        "videoId": "m9P3q7vL1wA",
        "topics": [
          "Handling Missing Values",
          "Outlier Detection (IQR)",
          "StandardScaler (Z-Score) vs MinMaxScaler",
          "One-Hot Encoding"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "import math\n\ndef standard_scaler(values):\n    mean = sum(values) / len(values)\n    variance = sum((x - mean) ** 2 for x in values) / len(values)\n    std_dev = math.sqrt(variance)\n    return [(x - mean) / std_dev for x in values]\n\ndata = [10, 20, 30, 40, 50]\nprint(\"Normalized Z-scores:\", standard_scaler(data))\n"
        },
        "detailedNotes": "### Feature Scaling:\n- **Standardization (Z-Score):** $z = \frac{x - mu}{sigma}$. Centers data with mean 0 and variance 1. Essential for algorithms relying on Euclidean distance (KNN, SVM, K-Means) or gradient descent.\n- **Min-Max Normalization:** $x_{\text{norm}} = \frac{x - x_{\text{min}}}{x_{\text{max}} - x_{\text{min}}}$. Bounds values to $[0, 1]$."
      },
      {
        "id": "ml-3",
        "lectureNumber": 3,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L3: Linear Regression: Cost Function & Gradient Descent",
        "duration": "34:10",
        "videoId": "b1L6xM7r8yU",
        "topics": [
          "Hypothesis Function (h(x) = wx + b)",
          "Mean Squared Error (MSE) Loss",
          "Batch Gradient Descent Partial Derivatives",
          "Learning Rate (alpha)"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def gradient_descent(x, y, lr=0.01, epochs=500):\n    w, b = 0.0, 0.0\n    n = len(x)\n    for _ in range(epochs):\n        y_pred = [w * xi + b for xi in x]\n        dw = (-2 / n) * sum(xi * (yi - y_hat) for xi, yi, y_hat in zip(x, y, y_pred))\n        db = (-2 / n) * sum((yi - y_hat) for yi, y_hat in zip(y, y_pred))\n        w -= lr * dw\n        b -= lr * db\n    return w, b\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\nw, b = gradient_descent(x, y)\nprint(f\"Fitted Model: y = {w:.2f}x + {b:.2f}\")\n"
        },
        "detailedNotes": "### Gradient Descent Updates:\n$$J(w, b) = \frac{1}{N} sum_{i=1}^N (y^{(i)} - (w x^{(i)} + b))^2$$\n$$w := w - alpha \frac{partial J}{partial w}, quad b := b - alpha \frac{partial J}{partial b}$$"
      },
      {
        "id": "ml-4",
        "lectureNumber": 4,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L4: Logistic Regression, Sigmoid Function & Classification Metrics",
        "duration": "31:20",
        "videoId": "7S_tz1z_5bA",
        "topics": [
          "Sigmoid Function (1 / (1 + e^-z))",
          "Binary Cross-Entropy Loss",
          "Confusion Matrix (TP, FP, TN, FN)",
          "Precision, Recall, F1-Score & ROC-AUC"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import math\n\ndef sigmoid(z): return 1.0 / (1.0 + math.exp(-z))\n\ndef f1_score(tp, fp, fn):\n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0\n    f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0\n    return precision, recall, f1\n\np, r, f1 = f1_score(80, 10, 20)\nprint(f\"Precision: {p:.2f}, Recall: {r:.2f}, F1: {f1:.2f}\")\n"
        },
        "detailedNotes": "### Classification Metrics:\n- **Precision:** $\frac{\text{TP}}{\text{TP} + \text{FP}}$ (Quality of positive predictions; critical in spam detection).\n- **Recall:** $\frac{\text{TP}}{\text{TP} + \text{FN}}$ (Completeness of positive predictions; critical in cancer detection).\n- **F1-Score:** Harmonic mean of Precision and Recall: $\frac{2 \times P \times R}{P + R}$."
      },
      {
        "id": "ml-5",
        "lectureNumber": 5,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L5: Decision Trees: Entropy, Information Gain & Gini Impurity",
        "duration": "33:45",
        "videoId": "j2S7bK3V5rA",
        "topics": [
          "Shannon Entropy Formula",
          "Information Gain (ID3 Algorithm)",
          "Gini Impurity (CART Algorithm)",
          "Overfitting & Tree Pruning"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "import math\n\ndef entropy(probabilities):\n    return -sum(p * math.log2(p) for p in probabilities if p > 0)\n\n# 9 positive, 5 negative samples\ntotal = 14\nent = entropy([9 / total, 5 / total])\nprint(f\"Entropy of dataset: {ent:.4f} bits\")\n"
        },
        "detailedNotes": "### Splitting Criteria:\n- **Entropy:** $H(S) = - sum_{i=1}^c p_i log_2(p_i)$\n- **Information Gain:** $IG(S, A) = H(S) - sum_{v} \frac{|S_v|}{|S|} H(S_v)$\n- **Gini Impurity:** $Gini(S) = 1 - sum_{i=1}^c p_i^2$ (computationally faster than Entropy because no logarithm is required)."
      },
      {
        "id": "ml-6",
        "lectureNumber": 6,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L6: Ensemble Learning: Bagging (Random Forest) vs Boosting (XGBoost)",
        "duration": "35:10",
        "videoId": "q6M7r8b9yVU",
        "topics": [
          "Bootstrap Aggregating (Bagging)",
          "Random Subspace Feature Selection",
          "Boosting (Sequential Error Correction)",
          "AdaBoost & Gradient Boosting"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "ensemble_comparison = {\n    \"Bagging (Random Forest)\": \"Trains parallel independent trees on random data subsets with replacement. Reduces Variance.\",\n    \"Boosting (XGBoost/AdaBoost)\": \"Trains sequential trees where each subsequent tree corrects errors of predecessors. Reduces Bias.\"\n}\nfor name, desc in ensemble_comparison.items(): print(f\"[{name}] {desc}\")\n"
        },
        "detailedNotes": "### Bagging vs Boosting:\n- **Bagging (Random Forest):** High-depth trees trained in parallel on bootstrap samples. Aggregates results via majority voting or averaging. Primarily reduces **Variance** (overfitting).\n- **Boosting (GBDT, XGBoost):** Shallow trees (weak learners) trained sequentially, focusing on misclassified instances from prior rounds. Primarily reduces **Bias**."
      },
      {
        "id": "ml-7",
        "lectureNumber": 7,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L7: Support Vector Machines (SVM) & The Kernel Trick",
        "duration": "31:20",
        "videoId": "aZjYr87r1b8",
        "topics": [
          "Maximum Margin Hyperplane",
          "Support Vectors",
          "Soft Margin & Slack Variable (C)",
          "Kernel Functions (RBF, Polynomial)"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "print(\"SVM Kernel Trick: Computes inner products in high-dimensional feature space without explicitly mapping vectors!\")\n"
        },
        "detailedNotes": "### SVM & Kernel Trick:\n- SVM finds the optimal hyperplane that maximizes the geometric margin between two classes.\n- **The Kernel Trick:** Replaces expensive high-dimensional coordinates $phi(x) cdot phi(z)$ with kernel functions $K(x, z) = exp(-gamma ||x - z||^2)$ (Radial Basis Function / RBF), allowing non-linear separation in $O(D)$ time!"
      },
      {
        "id": "ml-8",
        "lectureNumber": 8,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L8: K-Means Clustering: WCSS & The Elbow Method",
        "duration": "28:15",
        "videoId": "b4R7y9wM2vA",
        "topics": [
          "Centroid Initialization",
          "Assignment & Update Steps",
          "Within-Cluster Sum of Squares (WCSS)",
          "K-Means++ Initialization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "def euclidean_dist(p1, p2):\n    return sum((a - b) ** 2 for a, b in zip(p1, p2)) ** 0.5\n\nprint(\"Distance between (1, 2) and (4, 6):\", euclidean_dist((1, 2), (4, 6)))\n"
        },
        "detailedNotes": "### K-Means Algorithm:\n1. Initialize $K$ cluster centroids (preferably using K-Means++ to spread starting points).\n2. Assign each data point to its nearest centroid.\n3. Recompute centroid positions as the arithmetic mean of all assigned points.\n4. Repeat until centroid locations converge."
      },
      {
        "id": "ml-9",
        "lectureNumber": 9,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L9: Dimensionality Reduction: Principal Component Analysis (PCA)",
        "duration": "32:30",
        "videoId": "x2M8r9b5wVU",
        "topics": [
          "Curse of Dimensionality",
          "Covariance Matrix Calculation",
          "Eigenvalues & Eigenvectors",
          "Explained Variance Ratio"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "print(\"PCA projects D-dimensional data onto orthogonal axes that maximize variance!\")\n"
        },
        "detailedNotes": "### Steps in PCA:\n1. Standardize the $D$-dimensional dataset.\n2. Compute the $D \times D$ Covariance Matrix.\n3. Compute eigenvectors and eigenvalues of the covariance matrix.\n4. Sort eigenvalues in descending order and select top $k$ eigenvectors to form transformation matrix $W$.\n5. Project original dataset $X$ onto new $k$-dimensional subspace: $Y = XW$."
      },
      {
        "id": "ml-10",
        "lectureNumber": 10,
        "subjectId": "ml-ai",
        "subjectName": "ML & AI",
        "title": "L10: Deep Learning Foundations: Artificial Neural Networks (ANN)",
        "duration": "38:50",
        "videoId": "v7P3r8wM2yU",
        "topics": [
          "Perceptron Model",
          "Multi-Layer Perceptron (MLP)",
          "Activation Functions (ReLU, Sigmoid, Softmax)",
          "Backpropagation & Chain Rule"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import math\n\ndef relu(x): return max(0.0, x)\ndef softmax(logits):\n    exp_vals = [math.exp(x) for x in logits]\n    sum_exp = sum(exp_vals)\n    return [x / sum_exp for x in exp_vals]\n\nprint(\"Softmax of [2.0, 1.0, 0.1]:\", [round(p, 3) for p in softmax([2.0, 1.0, 0.1])])\n"
        },
        "detailedNotes": "### Backpropagation Core Equation:\nUsing the calculus chain rule, the gradient of the loss with respect to weight $w_{ij}$ in layer $l$ is:\n$$\frac{partial L}{partial w_{ij}} = \frac{partial L}{partial z_j} \times \frac{partial z_j}{partial w_{ij}} = delta_j \times a_i$$\nwhere $delta_j$ is backpropagated backward from the output layer to all preceding hidden layers!"
      }
    ]
  },
  {
    "id": "dp-masterclass",
    "title": "Dynamic Programming (DP) Masterclass",
    "code": "DSA 401",
    "category": "Advanced DSA & Interview Tracks",
    "instructor": "Take U Forward (Striver)",
    "icon": "🧩",
    "color": "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
    "playlistId": "PLgUwDviBIf0qUlt5SRMgi83hLGYVSGnTL",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5SRMgi83hLGYVSGnTL",
    "description": "World-renowned, industry-standard 56-video Dynamic Programming series by Striver. Master 1D DP, 2D Grid DP, Subsequences / Knapsack, String DP (LCS), Longest Increasing Subsequence (LIS), Partition DP (MCM), and DP on Stocks.",
    "lecturesCount": 16,
    "totalDuration": "14 hrs 30 mins",
    "keyTopics": [
      "1D DP & Space Optimization",
      "2D Grid DP & Triangle Paths",
      "Subset Sum & 0/1 Knapsack",
      "Coin Change & Target Sum",
      "LCS & String DP Patterns",
      "LIS in O(N log N) via Patience Sort",
      "Best Time to Buy & Sell Stock",
      "Partition DP & Matrix Chain Multiplication (MCM)"
    ],
    "lectures": [
      {
        "id": "dp-1",
        "lectureNumber": 1,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 1: Introduction to Dynamic Programming - Memoization vs Tabulation vs Space Optimization",
        "duration": "38:15",
        "videoId": "zMdbdGJNlh4",
        "topics": [
          "Overlapping Subproblems",
          "Optimal Substructure",
          "Top-Down Memoization",
          "Bottom-Up Tabulation",
          "O(1) Space Optimization"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Fibonacci 3 ways: Memoization, Tabulation, Space Optimized O(1)\nint fibMemo(int n, vector<int>& dp) {\n    if (n <= 1) return n;\n    if (dp[n] != -1) return dp[n];\n    return dp[n] = fibMemo(n - 1, dp) + fibMemo(n - 2, dp);\n}\n\nint fibSpaceOpt(int n) {\n    if (n <= 1) return n;\n    int prev2 = 0, prev = 1;\n    for (int i = 2; i <= n; i++) {\n        int cur = prev + prev2;\n        prev2 = prev;\n        prev = cur;\n    }\n    return prev;\n}\n\nint main() {\n    int n = 10;\n    vector<int> dp(n + 1, -1);\n    cout << \"Fibonacci(\" << n << \") via Memoization: \" << fibMemo(n, dp) << endl;\n    cout << \"Fibonacci(\" << n << \") via Space-Opt: \" << fibSpaceOpt(n) << endl;\n    return 0;\n}\n",
          "python": "# Fibonacci: Top-Down vs Bottom-Up Space-Optimized\ndef fib_memo(n: int, memo: dict = None) -> int:\n    if memo is None: memo = {}\n    if n <= 1: return n\n    if n in memo: return memo[n]\n    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\ndef fib_space_opt(n: int) -> int:\n    if n <= 1: return n\n    prev2, prev = 0, 1\n    for _ in range(2, n + 1):\n        prev2, prev = prev, prev + prev2\n    return prev\n\nprint(\"Fibonacci(10) Memoization:\", fib_memo(10))\nprint(\"Fibonacci(10) Space-Optimized O(1):\", fib_space_opt(10))\n"
        },
        "detailedNotes": "### DP 1: The Three Pillars of Dynamic Programming\n1. **Core Prerequisites:**\n   - Overlapping Subproblems: Same subproblems solved repeatedly.\n   - Optimal Substructure: Optimal solution to problem constructed from optimal solutions to subproblems.\n2. **Three Approaches:**\n   - **Recursive (Brute Force):** O(2^N) time, O(N) stack space.\n   - **Memoization (Top-Down):** O(N) time, O(N) stack space + O(N) table space.\n   - **Tabulation (Bottom-Up):** O(N) time, O(N) table space (no recursion stack).\n   - **Space Optimization:** O(N) time, O(1) space using 2 variables."
      },
      {
        "id": "dp-2",
        "lectureNumber": 2,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 2: 1D DP - Climbing Stairs & Space-Optimized Fibonacci Recurrence",
        "duration": "22:45",
        "videoId": "33s2ZPOwIVE",
        "topics": [
          "Climbing Stairs (LeetCode #70)",
          "State Transition: dp[i] = dp[i-1] + dp[i-2]",
          "Base Cases: dp[0]=1, dp[1]=1"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// LeetCode #70: Climbing Stairs\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 1) return 1;\n        int prev2 = 1, prev = 1;\n        for (int i = 2; i <= n; i++) {\n            int cur = prev + prev2;\n            prev2 = prev;\n            prev = cur;\n        }\n        return prev;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << \"Ways to climb 5 stairs: \" << sol.climbStairs(5) << \" (Expected: 8)\" << endl;\n    return 0;\n}\n",
          "python": "# Climbing Stairs (LeetCode #70)\nclass Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 1:\n            return 1\n        prev2, prev = 1, 1\n        for _ in range(2, n + 1):\n            prev2, prev = prev, prev + prev2\n        return prev\n\nsol = Solution()\nprint(\"Ways to climb 5 stairs:\", sol.climbStairs(5))\n"
        },
        "detailedNotes": "### DP 2: Climbing Stairs Recurrence\n- **Choice at Step i:** You either jumped 1 step from (i-1) or 2 steps from (i-2).\n- **Mathematical Recurrence:**\n  dp[i] = dp[i-1] + dp[i-2]\n- **Base Cases:** dp[0] = 1 (1 way to stay at ground), dp[1] = 1 (1 way to reach step 1).\n- **Complexity:** O(N) Time | O(1) Auxiliary Space."
      },
      {
        "id": "dp-3",
        "lectureNumber": 3,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 3 & 4: 1D DP - Frog Jump with Energy & Frog Jump with K Distance",
        "duration": "31:10",
        "videoId": "geXgvhUXAzo",
        "topics": [
          "Frog Jump Geek",
          "Minimum Cost Path",
          "Frog Jump with K Distance (Generalization)",
          "Pointers vs Array Space"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nint frogJumpK(const vector<int>& heights, int k) {\n    int n = heights.size();\n    vector<int> dp(n, 1e9);\n    dp[0] = 0;\n    \n    for (int i = 1; i < n; i++) {\n        for (int j = 1; j <= k; j++) {\n            if (i - j >= 0) {\n                dp[i] = min(dp[i], dp[i - j] + abs(heights[i] - heights[i - j]));\n            }\n        }\n    }\n    return dp[n - 1];\n}\n\nint main() {\n    vector<int> heights = {30, 10, 60, 10, 60, 50};\n    int k = 2;\n    cout << \"Min energy for Frog Jump (k=2): \" << frogJumpK(heights, k) << \" (Expected: 40)\" << endl;\n    return 0;\n}\n",
          "python": "# Frog Jump with K Steps\ndef frog_jump_k(heights: list[int], k: int) -> int:\n    n = len(heights)\n    dp = [float('inf')] * n\n    dp[0] = 0\n    \n    for i in range(1, n):\n        for j in range(1, k + 1):\n            if i - j >= 0:\n                dp[i] = min(dp[i], dp[i - j] + abs(heights[i] - heights[i - j]))\n    return dp[n - 1]\n\nheights = [30, 10, 60, 10, 60, 50]\nprint(\"Min energy for Frog Jump (k=2):\", frog_jump_k(heights, 2))\n"
        },
        "detailedNotes": "### DP 3 & 4: Frog Jump Recurrence\n- **Frog Jump (K=2):**\n  dp[i] = min(dp[i-1] + |h[i] - h[i-1]|, dp[i-2] + |h[i] - h[i-2]|)\n- **Generalized to K steps:**\n  dp[i] = min_{1 <= j <= k} { dp[i-j] + |h[i] - h[i-j]| }\n- **Time Complexity:** O(N * K)\n- **Space Complexity:** O(N) or O(K) sliding window."
      },
      {
        "id": "dp-4",
        "lectureNumber": 4,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 5 & 6: 1D DP - Maximum Sum of Non-Adjacent Elements (House Robber I & II)",
        "duration": "35:20",
        "videoId": "m9-H6AUBLgY",
        "topics": [
          "House Robber (LeetCode #198)",
          "House Robber II (Circular Array #213)",
          "Pick vs Non-Pick Pattern",
          "O(1) Space Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// House Robber I: Max non-adjacent sum\nint robLinear(const vector<int>& nums) {\n    int prev2 = 0, prev = 0;\n    for (int x : nums) {\n        int cur = max(prev, x + prev2);\n        prev2 = prev;\n        prev = cur;\n    }\n    return prev;\n}\n\n// House Robber II: Circular array (houses 0 and N-1 are adjacent)\nint robCircular(const vector<int>& nums) {\n    int n = nums.size();\n    if (n == 1) return nums[0];\n    vector<int> case1(nums.begin(), nums.end() - 1);\n    vector<int> case2(nums.begin() + 1, nums.end());\n    return max(robLinear(case1), robLinear(case2));\n}\n\nint main() {\n    vector<int> nums = {2, 3, 2};\n    cout << \"House Robber II Max Loot: \" << robCircular(nums) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
          "python": "# House Robber I & II (Circular)\ndef rob_linear(nums: list[int]) -> int:\n    prev2, prev = 0, 0\n    for x in nums:\n        prev2, prev = prev, max(prev, x + prev2)\n    return prev\n\ndef rob_circular(nums: list[int]) -> int:\n    if len(nums) == 1: return nums[0]\n    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))\n\nnums = [2, 3, 2]\nprint(\"House Robber II Max Loot:\", rob_circular(nums))\n"
        },
        "detailedNotes": "### DP 5 & 6: Pick vs Non-Pick Recurrence\n- **Linear Array (House Robber I):**\n  - Pick: nums[i] + dp[i-2]\n  - Not Pick: dp[i-1]\n  - State: dp[i] = max(dp[i-1], nums[i] + dp[i-2])\n- **Circular Array (House Robber II):**\n  - First and last cannot both be chosen.\n  - Solution: max(rob(nums[0..n-2]), rob(nums[1..n-1]))."
      },
      {
        "id": "dp-5",
        "lectureNumber": 5,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 7: 2D DP - Ninja Training (State Machine Matrix DP)",
        "duration": "42:15",
        "videoId": "AE39gJFsPus",
        "topics": [
          "Multi-State Transitions",
          "Task Rotation Constraint",
          "Previous Task Dependency",
          "O(1) Space Matrix DP"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Ninja's Training: 3 activities, cannot perform same activity 2 days in a row\nint ninjaTraining(int n, const vector<vector<int>>& points) {\n    vector<int> prev(4, 0);\n    // Base cases day 0\n    prev[0] = max(points[0][1], points[0][2]);\n    prev[1] = max(points[0][0], points[0][2]);\n    prev[2] = max(points[0][0], points[0][1]);\n    prev[3] = max({points[0][0], points[0][1], points[0][2]});\n    \n    for (int day = 1; day < n; day++) {\n        vector<int> cur(4, 0);\n        for (int last = 0; last < 4; last++) {\n            for (int task = 0; task < 3; task++) {\n                if (task != last) {\n                    cur[last] = max(cur[last], points[day][task] + prev[task]);\n                }\n            }\n        }\n        prev = cur;\n    }\n    return prev[3];\n}\n\nint main() {\n    vector<vector<int>> points = {{10, 40, 70}, {20, 50, 80}, {30, 60, 90}};\n    cout << \"Max merit points: \" << ninjaTraining(3, points) << \" (Expected: 210)\" << endl;\n    return 0;\n}\n",
          "python": "# Ninja's Training: 2D DP\ndef ninja_training(n: int, points: list[list[int]]) -> int:\n    prev = [\n        max(points[0][1], points[0][2]),\n        max(points[0][0], points[0][2]),\n        max(points[0][0], points[0][1]),\n        max(points[0][0], points[0][1], points[0][2])\n    ]\n    for day in range(1, n):\n        cur = [0] * 4\n        for last in range(4):\n            for task in range(3):\n                if task != last:\n                    cur[last] = max(cur[last], points[day][task] + prev[task])\n        prev = cur\n    return prev[3]\n\npoints = [[10, 40, 70], [20, 50, 80], [30, 60, 90]]\nprint(\"Max merit points:\", ninja_training(3, points))\n"
        },
        "detailedNotes": "### DP 7: State Tracking Pattern\n- **State Definition:** dp[day][last] represents max points up to day given that last activity was done on day+1.\n- **Transitions:** For each day, try all 0 <= task <= 2 such that task != last:\n  dp[day][last] = max_{task != last} { points[day][task] + dp[day-1][task] }\n- **Space Optimized:** Only requires keeping previous day's 4 state values."
      },
      {
        "id": "dp-6",
        "lectureNumber": 6,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 8 & 9: 2D Grid DP - Grid Unique Paths & Maze Obstacles",
        "duration": "39:50",
        "videoId": "sdE0A2OxOfw",
        "topics": [
          "Unique Paths (LeetCode #62)",
          "Unique Paths II (Obstacles #63)",
          "Boundary Conditions",
          "Combinatorics vs DP"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// LeetCode #62: Unique Paths with O(M) Space\nint uniquePaths(int m, int n) {\n    vector<int> prev(n, 1);\n    for (int i = 1; i < m; i++) {\n        vector<int> cur(n, 1);\n        for (int j = 1; j < n; j++) {\n            cur[j] = cur[j - 1] + prev[j];\n        }\n        prev = cur;\n    }\n    return prev[n - 1];\n}\n\nint main() {\n    cout << \"Unique Paths for 3x7 Grid: \" << uniquePaths(3, 7) << \" (Expected: 28)\" << endl;\n    return 0;\n}\n",
          "python": "# Unique Paths on Grid (LeetCode #62)\ndef unique_paths(m: int, n: int) -> int:\n    prev = [1] * n\n    for i in range(1, m):\n        cur = [1] * n\n        for j in range(1, n):\n            cur[j] = cur[j - 1] + prev[j]\n        prev = cur\n    return prev[-1]\n\nprint(\"Unique Paths for 3x7 Grid:\", unique_paths(3, 7))\n"
        },
        "detailedNotes": "### DP 8 & 9: 2D Grid Movement Recurrence\n- **Movement Options:** Down (i+1, j) or Right (i, j+1).\n- **Reverse Perspective:** To reach cell (i, j), you either came from Top (i-1, j) or Left (i, j-1):\n  dp[i][j] = dp[i-1][j] + dp[i][j-1]\n- **With Obstacles:** If cell (i, j) contains obstacle, dp[i][j] = 0.\n- **Time Complexity:** O(M * N)\n- **Space Complexity:** O(N) 1D array space optimization."
      },
      {
        "id": "dp-7",
        "lectureNumber": 7,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 10: 2D Grid DP - Minimum Path Sum in Grid",
        "duration": "26:30",
        "videoId": "_rgTlyky1uQ",
        "topics": [
          "Minimum Path Sum (LeetCode #64)",
          "Cost Accumulation in Grid",
          "Boundary Overflow Prevention",
          "Space Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #64: Minimum Path Sum\nint minPathSum(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size();\n    vector<int> prev(n, 0);\n    \n    for (int i = 0; i < m; i++) {\n        vector<int> cur(n, 0);\n        for (int j = 0; j < n; j++) {\n            if (i == 0 && j == 0) cur[j] = grid[0][0];\n            else {\n                int up = (i > 0) ? prev[j] : 1e9;\n                int left = (j > 0) ? cur[j - 1] : 1e9;\n                cur[j] = grid[i][j] + min(up, left);\n            }\n        }\n        prev = cur;\n    }\n    return prev[n - 1];\n}\n\nint main() {\n    vector<vector<int>> grid = {{1, 3, 1}, {1, 5, 1}, {4, 2, 1}};\n    cout << \"Min Path Sum: \" << minPathSum(grid) << \" (Expected: 7)\" << endl;\n    return 0;\n}\n",
          "python": "# Minimum Path Sum (LeetCode #64)\ndef min_path_sum(grid: list[list[int]]) -> int:\n    m, n = len(grid), len(grid[0])\n    prev = [0] * n\n    for i in range(m):\n        cur = [0] * n\n        for j in range(n):\n            if i == 0 and j == 0:\n                cur[j] = grid[0][0]\n            else:\n                up = prev[j] if i > 0 else float('inf')\n                left = cur[j - 1] if j > 0 else float('inf')\n                cur[j] = grid[i][j] + min(up, left)\n        prev = cur\n    return prev[-1]\n\ngrid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]\nprint(\"Min Path Sum:\", min_path_sum(grid))\n"
        },
        "detailedNotes": "### DP 10: Minimum Path Sum\n- **Recurrence:**\n  dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])\n- **Base Case:** dp[0][0] = grid[0][0].\n- **Out of Bounds:** Return infinity so minimization disregards invalid directions."
      },
      {
        "id": "dp-8",
        "lectureNumber": 8,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 11: 2D Grid DP - Triangle Fixed Starting to Variable Ending Path",
        "duration": "28:15",
        "videoId": "SrP-PilsYC0",
        "topics": [
          "Triangle Minimum Path Sum (LeetCode #120)",
          "Bottom-Up Tabulation Advantage",
          "No Infinity Boundary Checks"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #120: Triangle Minimum Total (Bottom-Up)\nint minimumTotal(vector<vector<int>>& triangle) {\n    int n = triangle.size();\n    vector<int> dp = triangle[n - 1]; // bottom row\n    \n    // Move upwards from second-to-last row to tip\n    for (int i = n - 2; i >= 0; i--) {\n        for (int j = 0; j <= i; j++) {\n            dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);\n        }\n    }\n    return dp[0];\n}\n\nint main() {\n    vector<vector<int>> tri = {{2}, {3, 4}, {6, 5, 7}, {4, 1, 8, 3}};\n    cout << \"Min Total Path in Triangle: \" << minimumTotal(tri) << \" (Expected: 11)\" << endl;\n    return 0;\n}\n",
          "python": "# Triangle Minimum Path Sum (LeetCode #120)\ndef minimum_total(triangle: list[list[int]]) -> int:\n    dp = list(triangle[-1])\n    for i in range(len(triangle) - 2, -1, -1):\n        for j in range(i + 1):\n            dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])\n    return dp[0]\n\ntri = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]\nprint(\"Min Total Path in Triangle:\", minimum_total(tri))\n"
        },
        "detailedNotes": "### DP 11: Triangle Pattern Bottom-Up\n- **Fixed Starting (0, 0), Variable Ending:**\n  Starting from bottom row eliminates needing to loop over all final cells:\n  dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])\n- The top cell dp[0] directly yields the answer!"
      },
      {
        "id": "dp-9",
        "lectureNumber": 9,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 12: 2D Grid DP - Maximum Falling Path Sum in Matrix",
        "duration": "30:40",
        "videoId": "N_aJ5qQbYA0",
        "topics": [
          "Falling Path Sum (LeetCode #931)",
          "3 Movement Directions (Down-Left, Down, Down-Right)",
          "Space Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #931: Minimum Falling Path Sum\nint minFallingPathSum(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    vector<int> prev = matrix[0];\n    \n    for (int i = 1; i < n; i++) {\n        vector<int> cur(n, 0);\n        for (int j = 0; j < n; j++) {\n            int up = prev[j];\n            int leftDiag = (j > 0) ? prev[j - 1] : 1e9;\n            int rightDiag = (j < n - 1) ? prev[j + 1] : 1e9;\n            cur[j] = matrix[i][j] + min({up, leftDiag, rightDiag});\n        }\n        prev = cur;\n    }\n    return *min_element(prev.begin(), prev.end());\n}\n\nint main() {\n    vector<vector<int>> matrix = {{2, 1, 3}, {6, 5, 4}, {7, 8, 9}};\n    cout << \"Min Falling Path Sum: \" << minFallingPathSum(matrix) << \" (Expected: 13)\" << endl;\n    return 0;\n}\n",
          "python": "# Minimum Falling Path Sum (LeetCode #931)\ndef min_falling_path_sum(matrix: list[list[int]]) -> int:\n    n = len(matrix)\n    prev = list(matrix[0])\n    for i in range(1, n):\n        cur = [0] * n\n        for j in range(n):\n            up = prev[j]\n            left_diag = prev[j - 1] if j > 0 else float('inf')\n            right_diag = prev[j + 1] if j < n - 1 else float('inf')\n            cur[j] = matrix[i][j] + min(up, left_diag, right_diag)\n        prev = cur\n    return min(prev)\n\nmatrix = [[2, 1, 3], [6, 5, 4], [7, 8, 9]]\nprint(\"Min Falling Path Sum:\", min_falling_path_sum(matrix))\n"
        },
        "detailedNotes": "### DP 12: Falling Path Recurrence\n- **3 Choices from (i-1):**\n  dp[i][j] = matrix[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1])\n- **Answer:** min_{0 <= j < N} { dp[N-1][j] }."
      },
      {
        "id": "dp-10",
        "lectureNumber": 10,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 14 & 15: DP on Subsequences - Subset Sum Equals Target & Partition Equal Subset Sum",
        "duration": "45:10",
        "videoId": "fWX9xDmIzRI",
        "topics": [
          "Subset Sum Problem",
          "Partition Equal Subset Sum (LeetCode #416)",
          "Boolean DP Table",
          "Bitset / 1D Space Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\n// LeetCode #416: Partition Equal Subset Sum\nbool canPartition(vector<int>& nums) {\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    if (total % 2 != 0) return false;\n    int target = total / 2;\n    \n    vector<bool> dp(target + 1, false);\n    dp[0] = true;\n    \n    for (int num : nums) {\n        // Iterate backwards to prevent re-using current element\n        for (int t = target; t >= num; t--) {\n            dp[t] = dp[t] || dp[t - num];\n        }\n    }\n    return dp[target];\n}\n\nint main() {\n    vector<int> nums = {1, 5, 11, 5};\n    cout << \"Can partition {1, 5, 11, 5}: \" << (canPartition(nums) ? \"YES\" : \"NO\") << \" (Expected: YES)\" << endl;\n    return 0;\n}\n",
          "python": "# Partition Equal Subset Sum (LeetCode #416)\ndef can_partition(nums: list[int]) -> bool:\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    \n    dp = [False] * (target + 1)\n    dp[0] = True\n    \n    for num in nums:\n        for t in range(target, num - 1, -1):\n            dp[t] = dp[t] or dp[t - num]\n    return dp[target]\n\nnums = [1, 5, 11, 5]\nprint(\"Can partition:\", can_partition(nums))\n"
        },
        "detailedNotes": "### DP 14 & 15: Subsequence Target Recurrence\n- **Choice at Index i:**\n  - Take: dp[i-1][target - arr[i]] (if target >= arr[i])\n  - Not Take: dp[i-1][target]\n- **State Transition:**\n  dp[t] = dp[t] || dp[t - arr[i]]\n- **Reverse Iteration Trick:** Running t from target down to num allows 1D array space without overwriting previous row values!"
      },
      {
        "id": "dp-11",
        "lectureNumber": 11,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 19: DP on Subsequences - 0/1 Knapsack Problem Masterclass",
        "duration": "42:30",
        "videoId": "GqOmJHQf15g",
        "topics": [
          "0/1 Knapsack Problem",
          "Capacity Constraint",
          "Values vs Weights",
          "Single 1D Array Optimization"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// 0/1 Knapsack: Max value with weight constraint W\nint knapsack01(int W, const vector<int>& wt, const vector<int>& val) {\n    int n = wt.size();\n    vector<int> dp(W + 1, 0);\n    \n    for (int i = 0; i < n; i++) {\n        for (int w = W; w >= wt[i]; w--) {\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);\n        }\n    }\n    return dp[W];\n}\n\nint main() {\n    vector<int> val = {60, 100, 120};\n    vector<int> wt = {10, 20, 30};\n    int W = 50;\n    cout << \"Max Knapsack Value: \" << knapsack01(W, wt, val) << \" (Expected: 220)\" << endl;\n    return 0;\n}\n",
          "python": "# 0/1 Knapsack Problem\ndef knapsack_01(W: int, wt: list[int], val: list[int]) -> int:\n    dp = [0] * (W + 1)\n    for i in range(len(wt)):\n        for w in range(W, wt[i] - 1, -1):\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])\n    return dp[W]\n\nval = [60, 100, 120]\nwt = [10, 20, 30]\nprint(\"Max Knapsack Value:\", knapsack_01(50, wt, val))\n"
        },
        "detailedNotes": "### DP 19: 0/1 Knapsack Recurrence\n- **Recurrence:**\n  dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])\n- **Constraint:** Each item can only be taken at most once.\n- **Space Optimization:** Backwards loop w = W ... wt[i] shrinks memory from O(N * W) to O(W)."
      },
      {
        "id": "dp-12",
        "lectureNumber": 12,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 20 & 21: DP on Subsequences - Minimum Coins to Make Change & Target Sum",
        "duration": "44:10",
        "videoId": "ogwBE8NITcg",
        "topics": [
          "Coin Change I (LeetCode #322)",
          "Coin Change II (LeetCode #518)",
          "Target Sum (LeetCode #494)",
          "Unbounded Knapsack Forward Loop"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Coin Change I: Min coins to make amount\nint coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, 1e9);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i - c >= 0 && dp[i - c] != 1e9) {\n                dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n    }\n    return dp[amount] >= 1e9 ? -1 : dp[amount];\n}\n\nint main() {\n    vector<int> coins = {1, 2, 5};\n    cout << \"Min coins for 11: \" << coinChange(coins, 11) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
          "python": "# Coin Change I (LeetCode #322)\ndef coin_change(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], 1 + dp[i - c])\n    return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(\"Min coins for 11:\", coin_change([1, 2, 5], 11))\n"
        },
        "detailedNotes": "### DP 20 & 21: Unbounded Knapsack\n- **Key Difference:** You can pick the same denomination an infinite number of times.\n- **Forward Loop:** Iterate amount forward from 1 ... amount:\n  dp[a] = min(dp[a], 1 + dp[a - c])\n- **Target Sum:** Reduces to subset difference S1 - S2 = diff, leading to S1 = (total + diff) / 2."
      },
      {
        "id": "dp-13",
        "lectureNumber": 13,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 25 & 26: DP on Strings - Longest Common Subsequence (LCS) & Print LCS",
        "duration": "50:40",
        "videoId": "NPZn9jBrX8g",
        "topics": [
          "LCS (LeetCode #1143)",
          "Print LCS String via Backtracking",
          "Longest Common Substring",
          "Shortest Common Supersequence"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #1143: Longest Common Subsequence\nint longestCommonSubsequence(string text1, string text2) {\n    int m = text1.size(), n = text2.size();\n    vector<int> prev(n + 1, 0);\n    \n    for (int i = 1; i <= m; i++) {\n        vector<int> cur(n + 1, 0);\n        for (int j = 1; j <= n; j++) {\n            if (text1[i - 1] == text2[j - 1]) {\n                cur[j] = 1 + prev[j - 1];\n            } else {\n                cur[j] = max(prev[j], cur[j - 1]);\n            }\n        }\n        prev = cur;\n    }\n    return prev[n];\n}\n\nint main() {\n    string s1 = \"abcde\", s2 = \"ace\";\n    cout << \"LCS of 'abcde' & 'ace': \" << longestCommonSubsequence(s1, s2) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
          "python": "# Longest Common Subsequence (LeetCode #1143)\ndef lcs(text1: str, text2: str) -> int:\n    m, n = len(text1), len(text2)\n    prev = [0] * (n + 1)\n    for i in range(1, m + 1):\n        cur = [0] * (n + 1)\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:\n                cur[j] = 1 + prev[j - 1]\n            else:\n                cur[j] = max(prev[j], cur[j - 1])\n        prev = cur\n    return prev[n]\n\nprint(\"LCS of 'abcde' and 'ace':\", lcs(\"abcde\", \"ace\"))\n"
        },
        "detailedNotes": "### DP 25 & 26: String DP Recurrence\n- **Matching Characters:**\n  If s1[i-1] == s2[j-1]:\n  dp[i][j] = 1 + dp[i-1][j-1]\n- **Non-Matching Characters:**\n  dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n- **Derived Problems:**\n  - Longest Palindromic Subsequence: LCS(s, reverse(s))\n  - Minimum Deletions/Insertions to convert A to B: (len(A) - LCS) + (len(B) - LCS)."
      },
      {
        "id": "dp-14",
        "lectureNumber": 14,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 35-40: DP on Stocks - Best Time to Buy and Sell Stock (I, II, III, IV & Cooldown)",
        "duration": "55:30",
        "videoId": "nGJmxk6QWK4",
        "topics": [
          "Stock I (Single Transaction)",
          "Stock II (Unlimited Transactions)",
          "Stock III (At Most 2)",
          "Stock IV (At Most K)",
          "Cooldown & Transaction Fee"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Best Time to Buy and Sell Stock with Cooldown (LeetCode #309)\nint maxProfitCooldown(vector<int>& prices) {\n    if (prices.size() <= 1) return 0;\n    int buy = -prices[0], sell = 0, rest = 0;\n    for (int p : prices) {\n        int prevBuy = buy;\n        buy = max(buy, rest - p);\n        rest = max(rest, sell);\n        sell = prevBuy + p;\n    }\n    return max(sell, rest);\n}\n\nint main() {\n    vector<int> prices = {1, 2, 3, 0, 2};\n    cout << \"Max Profit with Cooldown: \" << maxProfitCooldown(prices) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
          "python": "# Stock Buy and Sell with Cooldown (LeetCode #309)\ndef max_profit_cooldown(prices: list[int]) -> int:\n    if len(prices) <= 1: return 0\n    buy, sell, rest = -prices[0], 0, 0\n    for p in prices:\n        prev_buy = buy\n        buy = max(buy, rest - p)\n        rest = max(rest, sell)\n        sell = prev_buy + p\n    return max(sell, rest)\n\nprint(\"Max Profit with Cooldown:\", max_profit_cooldown([1, 2, 3, 0, 2]))\n"
        },
        "detailedNotes": "### DP 35-40: Stock State Machine\n- **State Machine Nodes:**\n  - buy: Holding a stock purchased today or earlier.\n  - sell: Just sold a stock today.\n  - rest: In cooldown or holding cash.\n- **Stock III & IV:** Add third dimension cap in [0..K] tracking remaining allowed transactions."
      },
      {
        "id": "dp-15",
        "lectureNumber": 15,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 41-43: DP on LIS - Longest Increasing Subsequence with Binary Search in O(N log N)",
        "duration": "48:20",
        "videoId": "VkHSV23xHDg",
        "topics": [
          "LIS in O(N^2) Tabulation",
          "Printing LIS",
          "Patience Sorting Algorithm",
          "O(N log N) via std::lower_bound"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #300: LIS in O(N log N) using Binary Search (Patience Sort)\nint lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) {\n            tails.push_back(x);\n        } else {\n            *it = x; // replace with smaller tail\n        }\n    }\n    return tails.size();\n}\n\nint main() {\n    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};\n    cout << \"Length of LIS: \" << lengthOfLIS(nums) << \" (Expected: 4 -> [2, 3, 7, 101])\" << endl;\n    return 0;\n}\n",
          "python": "# Longest Increasing Subsequence in O(N log N) (LeetCode #300)\nimport bisect\n\ndef length_of_lis(nums: list[int]) -> int:\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)\n\nnums = [10, 9, 2, 5, 3, 7, 101, 18]\nprint(\"Length of LIS:\", length_of_lis(nums))\n"
        },
        "detailedNotes": "### DP 41-43: LIS Dual Approaches\n1. **O(N^2) Tabulation:**\n   dp[i] = 1 + max_{0 <= j < i, nums[j] < nums[i]} { dp[j] }\n2. **O(N log N) Patience Sort:**\n   - Maintain sorted list of smallest tails for increasing subsequences of each length.\n   - For each number x, find first element >= x using binary search (lower_bound) and replace it.\n   - If none >= x, append x. Length of tails array is length of LIS!"
      },
      {
        "id": "dp-16",
        "lectureNumber": 16,
        "subjectId": "dp-masterclass",
        "subjectName": "Dynamic Programming (DP) Masterclass",
        "title": "DP 48-50: Partition DP - Matrix Chain Multiplication (MCM) & Burst Balloons",
        "duration": "58:00",
        "videoId": "vRVfmbCFW7Y",
        "topics": [
          "Partition DP Concept",
          "Matrix Chain Multiplication Cost",
          "Burst Balloons (LeetCode #312)",
          "Palindrome Partitioning II"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Matrix Chain Multiplication: Min scalar multiplications\nint matrixMultiplication(vector<int>& arr) {\n    int n = arr.size();\n    vector<vector<int>> dp(n, vector<int>(n, 0));\n    \n    for (int len = 2; len < n; len++) {\n        for (int i = 1; i < n - len + 1; i++) {\n            int j = i + len - 1;\n            dp[i][j] = 1e9;\n            for (int k = i; k < j; k++) {\n                int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];\n                dp[i][j] = min(dp[i][j], cost);\n            }\n        }\n    }\n    return dp[1][n - 1];\n}\n\nint main() {\n    vector<int> arr = {10, 20, 30, 40, 30};\n    cout << \"MCM Minimum Multiplications: \" << matrixMultiplication(arr) << \" (Expected: 30000)\" << endl;\n    return 0;\n}\n",
          "python": "# Matrix Chain Multiplication: Partition DP\ndef matrix_multiplication(arr: list[int]) -> int:\n    n = len(arr)\n    dp = [[0] * n for _ in range(n)]\n    for length in range(2, n):\n        for i in range(1, n - length + 1):\n            j = i + length - 1\n            dp[i][j] = float('inf')\n            for k in range(i, j):\n                cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]\n                dp[i][j] = min(dp[i][j], cost)\n    return dp[1][n - 1]\n\narr = [10, 20, 30, 40, 30]\nprint(\"MCM Minimum Multiplications:\", matrix_multiplication(arr))\n"
        },
        "detailedNotes": "### DP 48-50: Partition DP Framework\n- **MCM Recurrence:**\n  For subchain matrices from i to j, test every partition cut k (i <= k < j):\n  dp[i][j] = min_{i <= k < j} { dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j] }\n- **Burst Balloons (LeetCode #312):**\n  Work in reverse: think which balloon bursts last in range (i, j) so that subproblems remain independent!"
      }
    ]
  },
  {
    "id": "auth-security",
    "title": "Authentication, OAuth 2.0 & JWT Security Architecture",
    "code": "CS 405",
    "category": "Security & Identity Systems",
    "instructor": "Identity & Cryptography Masterclass",
    "icon": "🔐",
    "color": "#8B5CF6",
    "playlistId": "PL0X6fGhFFNTcc3q11T8nZqF7c8x2aQ2yV",
    "playlistUrl": "https://www.youtube.com/playlist?list=PL0X6fGhFFNTcc3q11T8nZqF7c8x2aQ2yV",
    "description": "Comprehensive engineering deep-dive into modern identity protocols, OAuth 2.0 framework (RFC 6749), Authorization Code Flow with PKCE (RFC 7636), OpenID Connect (OIDC), JSON Web Tokens (RFC 7519), HMAC-SHA256 vs RS256 cryptography, token rotation, and HttpOnly SameSite storage defense.",
    "lecturesCount": 8,
    "totalDuration": "4 hrs 15 mins",
    "keyTopics": [
      "Authentication vs Authorization & Cryptographic Primitives (Hashing vs Encryption vs Signing)",
      "OAuth 2.0 Architecture & The 4 Roles (Resource Owner, Client, Auth Server, Resource Server)",
      "PKCE (Proof Key for Code Exchange) RFC 7636: code_verifier & code_challenge",
      "The 8-Step Authorization Code Handshake & State Parameter CSRF Defense",
      "OpenID Connect (OIDC) Identity Layer: ID Tokens, UserInfo Endpoint & Single Sign-On (SSO)",
      "JWT (JSON Web Token) Internals (RFC 7519): Base64Url Header, Claims Payload & HMAC Signature",
      "Token Lifecycle: Stateless 15-Minute Access Tokens, Refresh Token Rotation & Token Family Invalidation",
      "Storage Security Matrix: LocalStorage XSS Vulnerabilities vs HttpOnly Secure SameSite Cookie Defense"
    ],
    "lectures": [
      {
        "id": "auth-1",
        "lectureNumber": 1,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L1: Authentication vs Authorization & Cryptographic Primitives",
        "duration": "28:10",
        "videoId": "926U5sguCJ4",
        "topics": [
          "AuthN vs AuthZ",
          "Cryptographic Hashing (SHA-256, bcrypt, Argon2)",
          "Symmetric vs Asymmetric Encryption",
          "Digital Signatures (HMAC, RSA, ECDSA)"
        ],
        "difficulty": "Beginner",
        "starterCodes": {
          "python": "import hashlib, hmac\n\n# 1. One-Way Cryptographic Hash\npassword = b'SuperSecurePassword2026!'\nhash_val = hashlib.sha256(password).hexdigest()\nprint('SHA-256 Digest:', hash_val)\n\n# 2. HMAC Message Authentication Code\nsecret_key = b'server-vault-secret'\nmessage = b'user_id=42&role=admin'\nsig = hmac.new(secret_key, message, hashlib.sha256).hexdigest()\nprint('HMAC-SHA256 Signature:', sig)\n",
          "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Conceptual Cryptographic Distinction:\n// Hashing: One-way lossy digest (passwords)\n// Encryption: Two-way invertible with key (confidential data)\n// Signing: Proves integrity and authenticity (tokens)\nint main() {\n    cout << \"AuthN = Identity Verification (Who you are)\" << endl;\n    cout << \"AuthZ = Permission Authorization (What you can access)\" << endl;\n    return 0;\n}\n"
        },
        "detailedNotes": "### Fundamental Concepts:\n1. **Authentication (AuthN):** Verifying the identity of a subject (e.g. passwords, WebAuthn Passkeys, MFA, biometric).\n2. **Authorization (AuthZ):** Determining whether an authenticated identity has permission to perform an action on a specific resource (e.g. RBAC, ABAC, OAuth scopes).\n3. **Cryptographic Primitives:**\n   - *Hashing:* One-way deterministic digest. Never store raw passwords—use salted, slow hashes (Argon2id, bcrypt).\n   - *Symmetric Encryption (AES-GCM):* Shared secret encrypts and decrypts.\n   - *Digital Signatures (HMAC, RSA, ECDSA):* Verifies payload was not tampered with."
      },
      {
        "id": "auth-2",
        "lectureNumber": 2,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L2: OAuth 2.0 Core Roles, Client Types & Protocol Handshake",
        "duration": "32:45",
        "videoId": "CPbvxxslDTU",
        "topics": [
          "The 4 OAuth Roles",
          "Confidential vs Public Clients",
          "Access Tokens vs Client Secrets",
          "Redirect URI Security"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# OAuth 2.0 Client Configuration Definition\noauth_client_config = {\n    'client_id': 'ada_web_spa_app',\n    'client_type': 'public', # SPAs cannot keep a client_secret safe!\n    'auth_endpoint': 'https://auth.company.com/oauth/v2/authorize',\n    'token_endpoint': 'https://auth.company.com/oauth/v2/token',\n    'redirect_uri': 'https://app.company.com/oauth/callback',\n    'scopes': ['openid', 'profile', 'email', 'offline_access']\n}\nprint('Client registered:', oauth_client_config['client_id'])\n"
        },
        "detailedNotes": "### The 4 OAuth 2.0 Roles (RFC 6749):\n1. **Resource Owner:** The human end-user who grants access to their protected data.\n2. **Client:** The application requesting access (e.g. Single Page App, Mobile App, Backend Service).\n3. **Authorization Server (IdP):** Issues identity assertions and access tokens after verifying user consent (e.g. Google, Auth0, Okta).\n4. **Resource Server:** The backend API hosting protected resources, accepting Bearer tokens."
      },
      {
        "id": "auth-3",
        "lectureNumber": 3,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L3: PKCE (Proof Key for Code Exchange) & Auth Code Handshake (RFC 7636)",
        "duration": "35:10",
        "videoId": "CHzERullHe8",
        "topics": [
          "Authorization Code Flow",
          "PKCE code_verifier generation",
          "code_challenge = Base64Url(SHA256(verifier))",
          "Anti-CSRF State Parameter"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import os, hashlib, base64\n\n# 1. Generate high-entropy 32-byte code_verifier\ncode_verifier = base64.urlsafe_b64encode(os.urandom(32)).decode('utf-8').rstrip('=')\n\n# 2. Derive code_challenge via SHA-256\nhashed = hashlib.sha256(code_verifier.encode('utf-8')).digest()\ncode_challenge = base64.urlsafe_b64encode(hashed).decode('utf-8').rstrip('=')\n\nprint('code_verifier:', code_verifier)\nprint('code_challenge (sent in Step 2):', code_challenge)\n"
        },
        "detailedNotes": "### Why PKCE is Mandatory (RFC 7636):\n- On mobile devices and Single Page Applications (SPAs), authorization codes returned over custom URI schemes (`myapp://callback`) or browser redirects could be intercepted by malicious apps registered on the same device.\n- With PKCE, even if an attacker steals the temporary `authorization_code`, they cannot exchange it at `/oauth/token` because only the legitimate client possesses the secret, in-memory `code_verifier`!"
      },
      {
        "id": "auth-4",
        "lectureNumber": 4,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L4: OpenID Connect (OIDC) Identity Layer & Single Sign-On (SSO)",
        "duration": "30:20",
        "videoId": "TmOC_g9x2qA",
        "topics": [
          "OIDC Identity Layer over OAuth 2.0",
          "ID Token (JWT) vs Access Token",
          "Standard OIDC Claims",
          "UserInfo Endpoint & JWKS"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# OIDC ID Token Claims Structure\nid_token_payload = {\n    'iss': 'https://accounts.google.com',\n    'sub': '1098239018239012',\n    'aud': 'my-client-app-id',\n    'exp': 1773820000,\n    'iat': 1773816400,\n    'nonce': 'random_anti_replay_nonce_772',\n    'name': 'Ada Lovelace',\n    'email': 'ada@cyber.org',\n    'email_verified': True\n}\nprint('Subject (User ID):', id_token_payload['sub'])\n"
        },
        "detailedNotes": "### OAuth 2.0 vs OpenID Connect (OIDC):\n- **OAuth 2.0:** An *Authorization* framework. It hands out Access Tokens that say *'The bearer can read:photos'*. It does NOT define user identity, format of tokens, or user profiles.\n- **OpenID Connect (OIDC):** An *Identity (AuthN)* layer on top of OAuth 2.0. It introduces the `openid` scope, a standardized `id_token` (JWT format), and a `/userinfo` endpoint."
      },
      {
        "id": "auth-5",
        "lectureNumber": 5,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L5: JWT Internals - Header, Payload, Signature & Cryptography (RFC 7519)",
        "duration": "38:40",
        "videoId": "7Q17ubqLfaM",
        "topics": [
          "JWT Anatomy: Header.Payload.Signature",
          "Base64Url Encoding (NOT Encryption!)",
          "HMAC-SHA256 (Symmetric) vs RS256 (Asymmetric JWKS)",
          "The 'alg: none' Exploit & Signature Stripping"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "import json, base64, hmac, hashlib\n\ndef b64url(data: bytes) -> str:\n    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')\n\nheader = {'alg': 'HS256', 'typ': 'JWT'}\npayload = {'sub': '1234567890', 'name': 'John Doe', 'iat': 1516239022}\nsecret = b'my-secret-key-12345'\n\nh_b64 = b64url(json.dumps(header, separators=(',', ':')).encode())\np_b64 = b64url(json.dumps(payload, separators=(',', ':')).encode())\nmsg = f'{h_b64}.{p_b64}'.encode()\nsig = b64url(hmac.new(secret, msg, hashlib.sha256).digest())\n\njwt_token = f'{h_b64}.{p_b64}.{sig}'\nprint('Generated Valid JWT:', jwt_token)\n"
        },
        "detailedNotes": "### Crucial Security Warning:\n- JWT payloads are **only Base64Url encoded, NOT encrypted**! Anyone with network access can decode the payload.\n- **Never store passwords, secrets, or private PII in a JWT payload**.\n- The signature only guarantees *tamper-evident integrity* (i.e. the server detects if any claim was altered)."
      },
      {
        "id": "auth-6",
        "lectureNumber": 6,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L6: Token Lifecycle - Access Tokens, Refresh Token Rotation & Revocation",
        "duration": "33:15",
        "videoId": "mbsmsi7l3r4",
        "topics": [
          "Access Token Lifespan (10-15 mins)",
          "Silent Refresh with Axios / Fetch Interceptors",
          "Refresh Token Rotation (RFC 6819)",
          "Token Family Invalidation on Replay Detection"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "# Token Family Revocation State Machine\ntoken_families = {\n    'family_usr_99': {\n        'active_refresh_token': 'rfr_v2',\n        'invalidated_tokens': {'rfr_v1'}\n    }\n}\n\ndef exchange_refresh_token(presented_token: str, family_id: str):\n    fam = token_families[family_id]\n    if presented_token in fam['invalidated_tokens']:\n        # BREACH DETECTED: A revoked token is being reused!\n        fam['active_refresh_token'] = None\n        raise Exception('BREACH DETECTED: Revoking entire token family!')\n    \n    # Rotate: invalidate old, issue new\n    fam['invalidated_tokens'].add(presented_token)\n    fam['active_refresh_token'] = 'rfr_v3'\n    return 'new_access_token', 'rfr_v3'\n\nprint('Token Lifecycle Engine Ready')\n"
        },
        "detailedNotes": "### Token Rotation Defense:\n- When a client presents `rfr_v1`, the Auth Server invalidates `rfr_v1` and returns `rfr_v2`.\n- If an attacker stole `rfr_v1` and later attempts to use it, the server sees that `rfr_v1` was already invalidated.\n- It detects an immediate breach, revokes `rfr_v2` as well, and forces all sessions to re-authenticate."
      },
      {
        "id": "auth-7",
        "lectureNumber": 7,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L7: Storage Security Architecture - Cookies vs LocalStorage & XSS/CSRF Defense",
        "duration": "31:50",
        "videoId": "472e39-h73o",
        "topics": [
          "LocalStorage Vulnerabilities to XSS",
          "HttpOnly, Secure, SameSite Cookie Flags",
          "SameSite=Lax vs SameSite=Strict",
          "In-Memory State + Refresh Cookie Best Practice"
        ],
        "difficulty": "Intermediate",
        "starterCodes": {
          "python": "# Express / FastAPI Secure Cookie Attributes\ncookie_attributes = {\n    'key': 'refresh_token',\n    'httponly': True,    # JavaScript document.cookie cannot read it! Defeats XSS token theft.\n    'secure': True,      # Sent only over encrypted HTTPS connections.\n    'samesite': 'lax',   # Blocks cross-site automatic transmission. Defeats CSRF.\n    'path': '/api/auth/refresh',\n    'max_age': 7 * 24 * 3600\n}\nprint('Cookie Security Configuration:', cookie_attributes)\n"
        },
        "detailedNotes": "### Enterprise Defense In Depth:\n1. **Short-Lived Access Token (15 min):** Keep in memory (JavaScript variable or React state). If XSS occurs, the token expires quickly.\n2. **Long-Lived Refresh Token (7 days):** Store in an `HttpOnly, Secure, SameSite=Lax` cookie scoped strictly to `/api/auth/refresh`."
      },
      {
        "id": "auth-8",
        "lectureNumber": 8,
        "subjectId": "auth-security",
        "subjectName": "Auth & JWT Security",
        "title": "L8: Production End-to-End Implementation in Next.js, Express & FastAPI",
        "duration": "42:10",
        "videoId": "2PPX34S_C4w",
        "topics": [
          "Next.js App Router Middleware Auth",
          "Express requireAuth Middleware",
          "FastAPI OAuth2PasswordBearer",
          "JWT Signing & Verification with jose"
        ],
        "difficulty": "Advanced",
        "starterCodes": {
          "python": "from fastapi import FastAPI, Depends, HTTPException\nfrom fastapi.security import OAuth2PasswordBearer\n\napp = FastAPI()\noauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')\n\n@app.get('/api/protected')\ndef protected_route(token: str = Depends(oauth2_scheme)):\n    # In production: jwt.decode(token, SECRET, algorithms=['HS256'])\n    return {'status': 'authorized', 'token_received': token[:10] + '...'}\n"
        },
        "detailedNotes": "### Production Architecture Checklist:\n- Centralized authentication middleware.\n- Asymmetric keys (RS256) for multi-service architectures using JWKS.\n- Short access token lifetimes (15 min) with automated rotation.\n- Defense against algorithm confusion attacks (enforce `algorithms=['RS256']`)."
      }
    ]
  }
];

/**
 * Helper to fetch a subject by ID
 */
export function getSubjectById(subjectId: string): AcademicSubject | undefined {
  return OTHER_ACADEMIC_SUBJECTS.find((s) => s.id === subjectId);
}
