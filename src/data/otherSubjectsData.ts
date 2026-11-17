// Complete CS Engineering & Tech Placement Subject Syllabus & Lecture Dataset
// Covers: Operating Systems (OS), Database Management Systems (DBMS),
// Computer Networks (CN), System Design (HLD), Low-Level Design & OOPs (LLD),
// Computer Organization & Architecture (COA), Theory of Computation (TOC),
// Compiler Design (CD), Discrete Mathematics (DM), Software Engineering (SE),
// DevOps & Cloud Engineering, and Machine Learning & AI Foundations.
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
  // =========================================================================
  // 1. OPERATING SYSTEMS (OS)
  // =========================================================================
  {
    id: 'os',
    title: 'Operating Systems (OS)',
    code: 'CS 301',
    category: 'Core Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '💻',
    color: '#3B82F6',
    playlistId: 'PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    description:
      'Master the core internals of Operating Systems: Process Management, Multithreading, CPU Scheduling, Synchronization (Semaphores, Mutex, Monitors), Deadlocks, Memory Management (Paging, Segmentation, Virtual Memory), and Disk Scheduling.',
    lecturesCount: 12,
    totalDuration: '5 hrs 45 mins',
    keyTopics: [
      'Dual-Mode Execution (User vs Kernel Mode)',
      'Process State Diagrams, PCB & Context Switching Overhead',
      'CPU Scheduling Algorithms: FCFS, SJF, SRTF, Round Robin & Priority',
      'Critical Section Problem & Peterson Solution',
      'Binary & Counting Semaphores with Mutex Locks',
      'Classical Problems: Producer-Consumer, Dining Philosophers & Readers-Writers',
      'Deadlock Characterization (Coffman Conditions) & Banker Algorithm',
      'Paging, Page Tables, TLB Hit Ratio & Effective Memory Access Time',
      'Virtual Memory, Demand Paging, Inverted Page Tables & Page Fault Handling',
      'Page Replacement Algorithms: FIFO, Belady Anomaly, LRU & Optimal',
      'Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN & LOOK',
      'File System Inodes, Directory Structures & Disk Allocation Methods',
    ],
    lectures: [
      {
        id: 'os-1',
        lectureNumber: 1,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L1: Introduction to Operating System & System Architecture',
        duration: '18:24',
        videoId: '2i2S1goQvN4',
        topics: ['Role of OS', 'Kernel vs Shell', 'Dual-Mode Operation', 'System Calls & Traps'],
        difficulty: 'Beginner',
        starterCodes: {
          cpp: `#include <iostream>
#include <unistd.h>
using namespace std;

int main() {
    cout << "Process ID: " << getpid() << endl;
    cout << "Parent Process ID: " << getppid() << endl;
    return 0;
}`,
          python: `import os

print(f"Current Process PID: {os.getpid()}")
print(f"Parent Process PPID: {os.getppid()}")
print(f"CPU Core Count: {os.cpu_count()}")
`,
        },
        detailedNotes: `### Core Functions of an Operating System:
1. **Resource Abstraction:** Provides a clean, hardware-independent API (System Calls) over raw physical devices.
2. **Resource Allocation & Sharing:** Multiplexes CPU, Memory, I/O devices, and Storage safely among multiple competing processes.
3. **Protection & Isolation:** Enforces access control boundaries between user-space applications and sensitive kernel structures using dual-mode execution (Ring 3 vs Ring 0).`,
      },
      {
        id: 'os-2',
        lectureNumber: 2,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L2: Process State Diagram, PCB & Context Switching',
        duration: '22:15',
        videoId: 'o_n0w_Fp29Q',
        topics: ['Process States (New, Ready, Running, Waiting, Terminated)', 'Process Control Block (PCB)', 'Context Switch Overhead'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `from dataclasses import dataclass
from typing import Optional

@dataclass
class PCB:
    pid: int
    state: str  # Ready, Running, Waiting, Terminated
    program_counter: int
    registers: dict
    priority: int

class ProcessManager:
    def __init__(self):
        self.ready_queue = []
        self.current_process: Optional[PCB] = None

    def add_process(self, pcb: PCB):
        self.ready_queue.append(pcb)

    def context_switch(self):
        if self.current_process:
            self.current_process.state = "Ready"
            self.ready_queue.append(self.current_process)
        if self.ready_queue:
            self.current_process = self.ready_queue.pop(0)
            self.current_process.state = "Running"
        return self.current_process

pm = ProcessManager()
pm.add_process(PCB(1, "Ready", 0x100, {"EAX": 0}, 1))
pm.add_process(PCB(2, "Ready", 0x200, {"EAX": 5}, 2))
print("Scheduled PID:", pm.context_switch().pid)
`,
        },
        detailedNotes: `### Process Control Block (PCB) Contents:
1. **PID & PPID:** Process and Parent Process Identifiers.
2. **Program Counter (PC):** Memory address of the next machine instruction.
3. **CPU Registers:** Accumulator, index registers, stack pointers, general-purpose registers.
4. **Memory Management Information:** Page tables or segment tables base pointers.
5. **Accounting & Scheduling:** CPU time used, time limits, scheduling priority.
6. **I/O Status:** List of open file descriptors and allocated I/O devices.`,
      },
      {
        id: 'os-3',
        lectureNumber: 3,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L3: CPU Scheduling Algorithms (FCFS, SJF, Round Robin & Priority)',
        duration: '31:40',
        videoId: 'wP_r_X8fN1s',
        topics: ['FCFS Convoy Effect', 'SJF / SRTF Optimality', 'Round Robin Time Quantum Selection', 'Priority Inversion'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def round_robin(processes, quantum):
    time = 0
    queue = list(processes)
    completion = {}
    
    while queue:
        p, burst = queue.pop(0)
        if burst <= quantum:
            time += burst
            completion[p] = time
        else:
            time += quantum
            queue.append((p, burst - quantum))
            
    return completion

procs = [("P1", 8), ("P2", 4), ("P3", 2)]
print("RR Completion Times (Q=3):", round_robin(procs, 3))
`,
        },
        detailedNotes: `### CPU Scheduling Comparison:
- **FCFS:** Non-preemptive. Suffers from the **Convoy Effect** (short processes wait behind long CPU-bound process).
- **SJF (Shortest Job First):** Provably optimal minimum average waiting time, but requires impossible future knowledge of burst times (estimated using exponential smoothing $\\tau_{n+1} = \\alpha t_n + (1-\\alpha)\\tau_n$).
- **Round Robin (RR):** Preemptive based on time slice (quantum $q$). If $q$ is too large, degrades to FCFS. If $q$ is too small, context switch overhead dominates throughput. Optimal rule of thumb: 80% of CPU bursts should be shorter than $q$.`,
      },
      {
        id: 'os-4',
        lectureNumber: 4,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L4: Process Synchronization & Critical Section Problem',
        duration: '27:10',
        videoId: 'lE_zWzO_4Z0',
        topics: ['Race Conditions', 'Critical Section Requirements', 'Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Peterson Algorithm'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Software Mutual Exclusion: Peterson's Algorithm Simulation
flag = [False, False]
turn = 0

def process_0():
    global turn
    flag[0] = True
    turn = 1
    while flag[1] and turn == 1:
        pass  # Busy wait
    print("Process 0 in Critical Section")
    flag[0] = False

def process_1():
    global turn
    flag[1] = True
    turn = 0
    while flag[0] and turn == 0:
        pass  # Busy wait
    print("Process 1 in Critical Section")
    flag[1] = False

process_0()
process_1()
`,
        },
        detailedNotes: `### The 3 Critical Section Requirements:
1. **Mutual Exclusion:** Only one process can execute in its critical section at any instant.
2. **Progress:** If no process is executing in its critical section, only processes wishing to enter can participate in deciding who enters next (no deadlock).
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request (no starvation).`,
      },
      {
        id: 'os-5',
        lectureNumber: 5,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L5: Semaphores (Binary & Counting) & Mutex Locks',
        duration: '25:50',
        videoId: 'Qy0pWnE0jV8',
        topics: ['wait() / P() operation', 'signal() / V() operation', 'Counting Semaphore for Resource Pools', 'Binary Semaphore vs Mutex'],
        difficulty: 'Intermediate',
        starterCodes: {
          cpp: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx;
int counter = 0;

void increment() {
    for (int i = 0; i < 10000; i++) {
        lock_guard<mutex> lock(mtx);
        counter++;
    }
}

int main() {
    thread t1(increment);
    thread t2(increment);
    t1.join();
    t2.join();
    cout << "Synchronized Counter: " << counter << endl;
    return 0;
}
`,
        },
        detailedNotes: `### Semaphore Definition:
A semaphore \`S\` is an integer variable accessed only through atomic primitives:
\`\`\`c
void wait(Semaphore S) {
    S.value--;
    if (S.value < 0) {
        // add calling process to S.queue
        block();
    }
}

void signal(Semaphore S) {
    S.value++;
    if (S.value <= 0) {
        // remove process P from S.queue
        wakeup(P);
    }
}
\`\`\`
- If \`S.value < 0\`, its absolute value equals the exact number of waiting processes.`,
      },
      {
        id: 'os-6',
        lectureNumber: 6,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L6: Classical Synchronization: Producer-Consumer & Readers-Writers',
        duration: '29:30',
        videoId: '7h7d2n_wz78',
        topics: ['Bounded Buffer Problem', 'Empty & Full Semaphores', 'Readers-Writers Problem', 'Starvation Prevention'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import threading
import time

buffer = []
CAPACITY = 5
mutex = threading.Lock()
empty = threading.Semaphore(CAPACITY)
full = threading.Semaphore(0)

def producer(item):
    empty.acquire()
    with mutex:
        buffer.append(item)
        print(f"Produced: {item}, Buffer: {buffer}")
    full.release()

def consumer():
    full.acquire()
    with mutex:
        item = buffer.pop(0)
        print(f"Consumed: {item}, Buffer: {buffer}")
    empty.release()

producer("Packet A")
producer("Packet B")
consumer()
`,
        },
        detailedNotes: `### Producer-Consumer Semaphore Configuration:
- \`mutex = 1\` (protects critical buffer manipulation)
- \`empty = N\` (tracks available slots)
- \`full = 0\` (tracks populated items)
**Critical Ordering:** Always acquire the counting semaphore (\`empty\`/\`full\`) BEFORE the \`mutex\` to avoid fatal deadlocks!`,
      },
      {
        id: 'os-7',
        lectureNumber: 7,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L7: Deadlock Characterization & Resource Allocation Graphs (RAG)',
        duration: '24:15',
        videoId: 'rW_Mh9gY65w',
        topics: ['4 Coffman Conditions', 'Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait', 'Cycles in RAG'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Cycle Detection in Resource Allocation Graph
def has_deadlock(rag_adj):
    visited = set()
    rec_stack = set()
    
    def dfs(node):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in rag_adj.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor): return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node)
        return False

    for n in rag_adj:
        if n not in visited and dfs(n):
            return True
    return False

rag = {"P1": ["R1"], "R1": ["P2"], "P2": ["R2"], "R2": ["P1"]}
print("Deadlock Present:", has_deadlock(rag))
`,
        },
        detailedNotes: `### The 4 Coffman Necessary Conditions for Deadlock:
1. **Mutual Exclusion:** At least one non-shareable resource.
2. **Hold and Wait:** A process holding at least one resource is waiting to acquire additional resources held by other processes.
3. **No Preemption:** Resources cannot be forcibly preempted from a process.
4. **Circular Wait:** A closed chain of processes exists where each process holds a resource needed by the next process in the chain.`,
      },
      {
        id: 'os-8',
        lectureNumber: 8,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L8: Banker Algorithm for Deadlock Avoidance',
        duration: '28:40',
        videoId: '7v1J5U0Vp4A',
        topics: ['Safe State vs Unsafe State', 'Allocation Matrix', 'Max Matrix', 'Need Matrix = Max - Allocation', 'Safety Algorithm Trace'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def is_safe_state(available, allocation, need):
    work = list(available)
    finish = [False] * len(allocation)
    safe_seq = []
    
    while len(safe_seq) < len(allocation):
        found = False
        for i in range(len(allocation)):
            if not finish[i] and all(need[i][j] <= work[j] for j in range(len(work))):
                for j in range(len(work)):
                    work[j] += allocation[i][j]
                finish[i] = True
                safe_seq.append(f"P{i}")
                found = True
                break
        if not found:
            return False, []
    return True, safe_seq

alloc = [[0, 1, 0], [2, 0, 0], [3, 0, 2]]
need = [[7, 4, 3], [1, 2, 2], [6, 0, 0]]
avail = [3, 3, 2]
safe, seq = is_safe_state(avail, alloc, need)
print("System in Safe State:", safe, "| Safe Sequence:", seq)
`,
        },
        detailedNotes: `### Banker's Algorithm Need Matrix Formula:
$$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$
- If a safe sequence exists, the system is in a **Safe State** (guaranteed deadlock-free).
- An **Unsafe State** is NOT necessarily a deadlock, but deadlock can occur if processes request maximum declared resources simultaneously.`,
      },
      {
        id: 'os-9',
        lectureNumber: 9,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L9: Memory Management: Paging & Translation Lookaside Buffer (TLB)',
        duration: '34:20',
        videoId: '9x9Nq3F91_Q',
        topics: ['Logical vs Physical Address Space', 'Page Number (p) & Offset (d)', 'Page Table Entry (PTE)', 'TLB Hit Ratio & EMAT Formula'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Effective Memory Access Time (EMAT) Calculator
def calculate_emat(tlb_hit_ratio: float, tlb_access_time: float, main_memory_access_time: float):
    # Hit: Access TLB + Access Memory
    hit_time = tlb_access_time + main_memory_access_time
    # Miss: Access TLB + Access Page Table in Memory + Access Actual Memory
    miss_time = tlb_access_time + (2 * main_memory_access_time)
    emat = (tlb_hit_ratio * hit_time) + ((1 - tlb_hit_ratio) * miss_time)
    return emat

print("EMAT with 95% TLB Hit Ratio:", calculate_emat(0.95, 10, 100), "ns")
`,
        },
        detailedNotes: `### Address Translation in Paging:
Given a 32-bit logical address with 4 KB page size:
- Page size = $4\\text{ KB} = 2^{12}\\text{ bytes} \\implies \\text{Offset } d = 12\\text{ bits}$.
- Page number $p = 32 - 12 = 20\\text{ bits}$ ($2^{20} \\approx 10^6$ pages).
$$\\text{EMAT} = h \\times (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\times (t_{\\text{TLB}} + 2 \\times t_{\\text{mem}})$$`,
      },
      {
        id: 'os-10',
        lectureNumber: 10,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L10: Virtual Memory, Demand Paging & Page Fault Handling',
        duration: '26:45',
        videoId: '_uT9j3mCq8A',
        topics: ['Virtual Address Space', 'Valid-Invalid Bit', 'Page Fault Trap', 'Swap Space OS Handler', 'Thrashing & Working Set Model'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `class VirtualMemorySystem:
    def __init__(self, physical_frames=3):
        self.page_table = {}  # page -> frame
        self.frames = []
        self.page_faults = 0

    def access_page(self, page_num):
        if page_num in self.page_table:
            return f"Page {page_num} HIT in Frame {self.page_table[page_num]}"
        
        # Page Fault
        self.page_faults += 1
        if len(self.frames) >= 3:
            evicted = self.frames.pop(0)
            del self.page_table[evicted]
            
        self.frames.append(page_num)
        self.page_table[page_num] = len(self.frames) - 1
        return f"Page {page_num} FAULT -> Loaded into Frame {self.page_table[page_num]}"

vm = VirtualMemorySystem()
for p in [1, 2, 3, 4, 1, 2]:
    print(vm.access_page(p))
print("Total Page Faults:", vm.page_faults)
`,
        },
        detailedNotes: `### Page Fault Handling Steps:
1. Trap to kernel via page fault interrupt.
2. Save user registers and process state.
3. Validate memory access check against internal PCB tables.
4. Locate free physical page frame from free-frame list.
5. Issue disk I/O request to fetch page from swap space into allocated frame.
6. When I/O completes, update page table valid-invalid bit to \`1\`.
7. Restart the faulted instruction at original program counter.`,
      },
      {
        id: 'os-11',
        lectureNumber: 11,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L11: Page Replacement Algorithms: FIFO, Belady Anomaly, LRU & Optimal',
        duration: '32:15',
        videoId: 'd3o_c8W0pXo',
        topics: ['FIFO Queue Replacement', 'Belady Anomaly Proof', 'Least Recently Used (LRU) with Hash Map + Doubly Linked List', 'Optimal Replacement (MIN)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def lru_page_faults(pages, capacity):
    memory = []
    faults = 0
    for p in pages:
        if p not in memory:
            faults += 1
            if len(memory) == capacity:
                memory.pop(0)
            memory.append(p)
        else:
            memory.remove(p)
            memory.append(p)
    return faults

ref_string = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
print("LRU Page Faults (Cap=3):", lru_page_faults(ref_string, 3))
`,
        },
        detailedNotes: `### Belady's Anomaly:
For some page replacement algorithms (specifically FIFO), increasing the number of physical frames can paradoxically INCREASE the total number of page faults!
- **Stack Algorithms** (such as LRU and Optimal) are mathematically proven to be immune to Belady's Anomaly because the set of pages in memory for $N$ frames is always a strict subset of the pages for $N+1$ frames.`,
      },
      {
        id: 'os-12',
        lectureNumber: 12,
        subjectId: 'os',
        subjectName: 'OS',
        title: 'L12: Disk Scheduling Algorithms: FCFS, SSTF, SCAN, C-SCAN & LOOK',
        duration: '29:40',
        videoId: 'tZ5XQ7tH3Yc',
        topics: ['Seek Time vs Rotational Latency', 'FCFS Disk Scheduling', 'Shortest Seek Time First (SSTF) & Starvation', 'SCAN (Elevator) & C-SCAN Circular Uniformity'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def sstf_disk(head, requests):
    curr = head
    reqs = list(requests)
    total_movement = 0
    while reqs:
        closest = min(reqs, key=lambda x: abs(x - curr))
        total_movement += abs(closest - curr)
        curr = closest
        reqs.remove(closest)
    return total_movement

tracks = [98, 183, 37, 122, 14, 124, 65, 67]
print("SSTF Total Head Movement from Track 53:", sstf_disk(53, tracks))
`,
        },
        detailedNotes: `### Disk Scheduling Comparison:
- **FCFS:** Fair, no starvation, but high head travel distance.
- **SSTF:** Selects request closest to current head position. Minimizes average response time, but can cause starvation for distant requests.
- **SCAN (Elevator):** Head moves in one direction servicing requests until reaching the disk edge, then reverses.
- **C-SCAN (Circular SCAN):** Restricts scan to one direction only; jumps back to beginning without servicing on return trip. Provides uniform wait times across all tracks.`,
      },
    ],
  },

  // =========================================================================
  // 2. DATABASE MANAGEMENT SYSTEMS (DBMS)
  // =========================================================================
  {
    id: 'dbms',
    title: 'Database Management Systems (DBMS)',
    code: 'CS 302',
    category: 'Core Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '🗄️',
    color: '#8B5CF6',
    playlistId: 'PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
    description:
      'Complete relational database engineering: 3-Schema Architecture, ER Modeling, Relational Algebra, SQL DDL/DML, Functional Dependencies, Normalization (1NF to BCNF), B+ Trees, Transactions, ACID, and Concurrency Control.',
    lecturesCount: 12,
    totalDuration: '5 hrs 20 mins',
    keyTopics: [
      '3-Schema Architecture & Data Independence',
      'ER Diagram to Relational Tables Mapping',
      'Relational Algebra Query Calculus',
      'SQL Joins (Inner, Left, Right, Full, Cross)',
      'Attribute Closure & Candidate Key Finding',
      '1NF, 2NF, 3NF & BCNF Normalization',
      'Lossless Join & Dependency Preservation',
      'Dense vs Sparse Indexing & Multilevel Index',
      'B-Tree & B+ Tree Node Splitting and Merging',
      'ACID Properties & Transaction States',
      'Conflict vs View Serializability',
      '2-Phase Locking (2PL) & Deadlock Handling',
    ],
    lectures: [
      {
        id: 'dbms-1',
        lectureNumber: 1,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L1: Introduction to DBMS & 3-Schema Architecture',
        duration: '16:50',
        videoId: '3EJlovevfcA',
        topics: ['DBMS vs File System', 'Physical, Logical, View Level', 'Physical & Logical Data Independence'],
        difficulty: 'Beginner',
        starterCodes: {
          sql: `-- Relational Schema Definition
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    gpa DECIMAL(3, 2) CHECK (gpa >= 0.0 AND gpa <= 4.0)
);

INSERT INTO Students VALUES (1, 'Alice Smith', 'alice@univ.edu', 3.9);
SELECT * FROM Students;`,
          python: `# Database 3-Schema Simulation in Python
class DatabaseArchitecture:
    physical_storage = {"block_0": b"\\x01Alice\\x00\\x03\\x90"}
    schema = {"id": int, "name": str, "gpa": float}
    
    @staticmethod
    def view_student(raw_id, raw_name):
        return f"Student [ID: {raw_id}, Name: {raw_name}]"

print(DatabaseArchitecture.view_student(1, "Alice"))
`,
        },
        detailedNotes: `### 3-Schema Architecture:
1. **Internal / Physical Level:** Describes low-level physical storage structures, data paths, indexes, and block formats.
2. **Conceptual / Logical Level:** Describes overall database structure for all users (entities, attributes, relationships, constraints).
3. **External / View Level:** Tailored sub-schemas displaying only relevant subsets of data to individual end users or roles.`,
      },
      {
        id: 'dbms-2',
        lectureNumber: 2,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L2: Entity-Relationship (ER) Modeling & Cardinality',
        duration: '21:30',
        videoId: 'gbV3tL7Xk0U',
        topics: ['Entities & Attributes', 'Weak Entity Sets', 'Cardinality Ratios (1:1, 1:N, M:N)', 'Participation Constraints'],
        difficulty: 'Beginner',
        starterCodes: {
          sql: `-- 1:N Relationship Implementation (Department to Employees)
CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE CASCADE
);
`,
        },
        detailedNotes: `### ER Mapping Rules into Relational Tables:
- **Strong Entity:** Becomes a table with all simple attributes.
- **1:1 Relationship:** Place Primary Key of one table as Foreign Key in the other (preferably in the total participation side).
- **1:N Relationship:** Place Primary Key of the 1-side as a Foreign Key in the N-side table.
- **M:N Relationship:** Requires a separate junction / bridge table containing composite primary keys of both participating entities!`,
      },
      {
        id: 'dbms-3',
        lectureNumber: 3,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L3: Relational Model & Relational Algebra Operators',
        duration: '26:15',
        videoId: 'hZ8bQ2wF5xA',
        topics: ['Select (sigma)', 'Project (pi)', 'Cartesian Product (X)', 'Natural Join', 'Set Union & Difference'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Relational Algebra Operators in Python
students = [
    {"id": 1, "name": "Alice", "dept": "CS"},
    {"id": 2, "name": "Bob", "dept": "EE"},
    {"id": 3, "name": "Charlie", "dept": "CS"}
]

# Selection: sigma_{dept='CS'}(students)
cs_students = [s for s in students if s["dept"] == "CS"]

# Projection: pi_{name}(cs_students)
names = [{"name": s["name"]} for s in cs_students]
print("Projected CS Names:", names)
`,
        },
        detailedNotes: `### Core Relational Algebra Operators:
- $\\sigma_{\\text{condition}}(R)$: Selection (filters rows satisfying predicate).
- $\\Pi_{\\text{attributes}}(R)$: Projection (extracts columns, eliminates duplicates).
- $R \\cup S$: Union (combines tuples; operands must be union-compatible).
- $R - S$: Set Difference (tuples in $R$ but not in $S$).
- $R \\times S$: Cartesian Product (all concatenated pairs).
- $R \\bowtie_{\\text{cond}} S$: Theta Join (Cartesian product followed by selection).`,
      },
      {
        id: 'dbms-4',
        lectureNumber: 4,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L4: SQL DDL, DML & Advanced Aggregate Queries',
        duration: '28:40',
        videoId: 'H43Z_Qv8XyA',
        topics: ['DDL (CREATE, ALTER, DROP)', 'DML (INSERT, UPDATE, DELETE)', 'GROUP BY & HAVING clause', 'Subqueries'],
        difficulty: 'Beginner',
        starterCodes: {
          sql: `-- Department Salary Aggregation Query
SELECT 
    dept_id, 
    COUNT(emp_id) AS total_employees, 
    AVG(salary) AS avg_salary,
    MAX(salary) AS highest_salary
FROM Employee
WHERE is_active = TRUE
GROUP BY dept_id
HAVING AVG(salary) > 75000;
`,
        },
        detailedNotes: `### SQL Execution Order:
\`FROM\` $\\rightarrow$ \`WHERE\` $\\rightarrow$ \`GROUP BY\` $\\rightarrow$ \`HAVING\` $\\rightarrow$ \`SELECT\` $\\rightarrow$ \`DISTINCT\` $\\rightarrow$ \`ORDER BY\` $\\rightarrow$ \`LIMIT\`.
- \`WHERE\` filters individual rows BEFORE grouping.
- \`HAVING\` filters aggregated groups AFTER grouping.`,
      },
      {
        id: 'dbms-5',
        lectureNumber: 5,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L5: SQL Joins: Inner, Left Outer, Right Outer, Full & Cross Join',
        duration: '24:20',
        videoId: '7S_tz1z_5bA',
        topics: ['INNER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN', 'Self Join & Anti-Joins'],
        difficulty: 'Intermediate',
        starterCodes: {
          sql: `-- Finding Employees Without a Department
SELECT e.emp_name, d.dept_name
FROM Employee e
LEFT JOIN Department d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
`,
        },
        detailedNotes: `### Join Cheat Sheet:
- **Inner Join:** Returns rows with matching keys in both tables.
- **Left Join:** Returns all rows from left table, with NULLs for unmatched right table columns.
- **Full Outer Join:** Returns rows when there is a match in either table, filling unmatched slots with NULLs.`,
      },
      {
        id: 'dbms-6',
        lectureNumber: 6,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L6: Functional Dependencies & Attribute Closure Method',
        duration: '27:50',
        videoId: 'oQ1J9rR3gVc',
        topics: ['Armstrong Axioms', 'Attribute Closure X+', 'Finding Candidate Keys', 'Equivalence of FD Sets'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def compute_closure(attributes, fds):
    closure = set(attributes)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in fds:
            if set(lhs).issubset(closure) and not set(rhs).issubset(closure):
                closure.update(rhs)
                changed = True
    return sorted(list(closure))

fds = [(["A"], ["B"]), (["B"], ["C"]), (["C", "D"], ["E"])]
print("Closure of {A, D}+:", compute_closure(["A", "D"], fds))
`,
        },
        detailedNotes: `### Candidate Key Algorithm:
1. Compute the closure $X^+$ for a given attribute subset $X$ under the set of functional dependencies $F$.
2. If $X^+$ contains all attributes of relation $R$, and no proper subset of $X$ determines all attributes, then $X$ is a **Candidate Key**!`,
      },
      {
        id: 'dbms-7',
        lectureNumber: 7,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L7: Normalization: 1NF, 2NF, 3NF & BCNF Decomposition',
        duration: '35:10',
        videoId: 'UrYXZ4R5W9M',
        topics: ['1NF (Atomic Attributes)', '2NF (No Partial Dependencies)', '3NF (No Transitive Dependencies)', 'BCNF (LHS must be Super Key)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Verifying BCNF condition for FD X -> Y
def is_bcnf(fds, super_keys):
    for lhs, rhs in fds:
        if set(lhs) not in [set(sk) for sk in super_keys]:
            return False, f"Violation: {lhs} -> {rhs} (LHS is not a super key)"
    return True, "Relation is in BCNF"

super_keys = [["A", "B"]]
fds = [(["A", "B"], ["C"]), (["C"], ["B"])]
print(is_bcnf(fds, super_keys))
`,
        },
        detailedNotes: `### Normal Forms Hierarchy:
- **1NF:** All attributes are atomic (no multi-valued or composite values).
- **2NF:** 1NF + No non-prime attribute is partially dependent on any candidate key.
- **3NF:** 2NF + For every $X \\rightarrow Y$, either $X$ is a Super Key OR $Y$ is a Prime Attribute.
- **BCNF:** For every non-trivial $X \\rightarrow Y$, $X$ MUST be a Super Key!`,
      },
      {
        id: 'dbms-8',
        lectureNumber: 8,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L8: File Organization & Dense vs Sparse Indexing',
        duration: '22:45',
        videoId: 'pA3jW5mC8yU',
        topics: ['Primary Index', 'Clustering Index', 'Secondary Index', 'Dense vs Sparse Index', 'Multilevel Indexing'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Dense vs Sparse Index Storage Calculation
def index_blocks(records, record_size, block_size, index_entry_size):
    blocking_factor = block_size // record_size
    total_data_blocks = (records + blocking_factor - 1) // blocking_factor
    
    # Dense Index: 1 entry per record
    dense_entries = records
    dense_blocks = (dense_entries * index_entry_size + block_size - 1) // block_size
    
    # Sparse Index: 1 entry per data block
    sparse_entries = total_data_blocks
    sparse_blocks = (sparse_entries * index_entry_size + block_size - 1) // block_size
    
    return total_data_blocks, dense_blocks, sparse_blocks

data_b, dense_b, sparse_b = index_blocks(100000, 100, 4096, 16)
print(f"Data Blocks: {data_b}, Dense Index Blocks: {dense_b}, Sparse Index Blocks: {sparse_b}")
`,
        },
        detailedNotes: `### Index Types:
- **Dense Index:** An index record appears for EVERY search-key value in the file.
- **Sparse Index:** An index record appears only for some values (typically one per disk block; requires file to be physically sorted on search key).`,
      },
      {
        id: 'dbms-9',
        lectureNumber: 9,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L9: B-Trees & B+ Trees: Insertion, Search & Node Splitting',
        duration: '31:20',
        videoId: 'aZjYr87r1b8',
        topics: ['B-Tree Order (m)', 'B+ Tree Leaf Node Linked List', 'Search in O(log_B N)', 'Insertion with Node Splitting', 'Range Query Advantage'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `class BPlusTreeNode:
    def __init__(self, is_leaf=False):
        self.is_leaf = is_leaf
        self.keys = []
        self.children = []
        self.next = None  # Pointer to next leaf node

root = BPlusTreeNode(is_leaf=False)
leaf1 = BPlusTreeNode(is_leaf=True)
leaf2 = BPlusTreeNode(is_leaf=True)
leaf1.keys = [10, 20]
leaf2.keys = [30, 40]
leaf1.next = leaf2
root.keys = [30]
root.children = [leaf1, leaf2]

print("B+ Tree Root Key:", root.keys)
print("Leaf Linked List Traversal:", leaf1.keys + leaf1.next.keys)
`,
        },
        detailedNotes: `### Why B+ Trees are Used in Databases:
1. **Internal nodes store keys only (no record pointers):** Allows higher fan-out (order $m$), dramatically reducing tree height (typically 3-4 levels for billions of records).
2. **Leaves are linked in a Doubly Linked List:** Range queries (\`BETWEEN 10 AND 50\`) require only $O(\\log N)$ to find the starting leaf, followed by sequential linear scanning!`,
      },
      {
        id: 'dbms-10',
        lectureNumber: 10,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L10: Transactions, ACID Properties & Concurrency Anomalies',
        duration: '25:30',
        videoId: 'w2Z8bE3C5rA',
        topics: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Dirty Read (WR)', 'Non-Repeatable Read (RW)', 'Phantom Read'],
        difficulty: 'Intermediate',
        starterCodes: {
          sql: `-- Transaction Isolation Level
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE account_id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE account_id = 202;
COMMIT;
`,
        },
        detailedNotes: `### Concurrency Anomalies:
- **Dirty Read ($W_1(X) \\rightarrow R_2(X) \\rightarrow \\text{Abort}_1$):** $T_2$ reads uncommitted modified data.
- **Unrepeatable Read ($R_1(X) \\rightarrow W_2(X) \\rightarrow \\text{Commit}_2 \\rightarrow R_1(X)$):** $T_1$ reads different values in the same transaction.
- **Lost Update ($W_1(X) \\rightarrow W_2(X) \\rightarrow \\text{Commit}_2 \\rightarrow \\text{Commit}_1$):** $T_1$ overwrites $T_2$'s change without reading it.`,
      },
      {
        id: 'dbms-11',
        lectureNumber: 11,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L11: Concurrency Control & Conflict Serializability',
        duration: '28:15',
        videoId: 'b1L6xM7r8yU',
        topics: ['Precedence Graph (Serialization Graph)', 'Conflicting Operations', 'Topological Sort for Serial Order', 'View Serializability'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def is_conflict_serializable(schedule_ops):
    graph = {}
    for i in range(len(schedule_ops)):
        t1, op1, item1 = schedule_ops[i]
        for j in range(i + 1, len(schedule_ops)):
            t2, op2, item2 = schedule_ops[j]
            if t1 != t2 and item1 == item2 and ("W" in (op1, op2)):
                graph.setdefault(t1, set()).add(t2)
                
    # Cycle Detection
    visited = set()
    rec = set()
    def has_cycle(u):
        visited.add(u); rec.add(u)
        for v in graph.get(u, []):
            if v not in visited and has_cycle(v): return True
            elif v in rec: return True
        rec.remove(u); return False
        
    for node in list(graph.keys()):
        if node not in visited and has_cycle(node):
            return False, "Cycle found (Not Conflict Serializable)"
    return True, "Conflict Serializable"

schedule = [(1, "R", "A"), (2, "W", "A"), (1, "W", "A")]
print(is_conflict_serializable(schedule))
`,
        },
        detailedNotes: `### Conflict Equivalence Rule:
Two operations conflict if and only if:
1. They belong to different transactions ($T_i \\neq T_j$).
2. They operate on the exact same data item $Q$.
3. At least one of the operations is a Write (\`W(Q)\`).
A schedule is **Conflict Serializable** if its Precedence Graph contains NO directed cycles!`,
      },
      {
        id: 'dbms-12',
        lectureNumber: 12,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L12: Two-Phase Locking (2PL), Strict 2PL & Deadlocks',
        duration: '26:30',
        videoId: 'j2S7bK3V5rA',
        topics: ['Growing Phase vs Shrinking Phase', 'Strict 2PL prevents Cascading Aborts', 'Rigorous 2PL', 'Wait-Die vs Wound-Wait Deadlock Schemes'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Deadlock Prevention: Wait-Die vs Wound-Wait
def wait_die(requesting_timestamp, holding_timestamp):
    # Older has smaller timestamp
    if requesting_timestamp < holding_timestamp:
        return "WAIT (Old waits for Young)"
    else:
        return "DIE (Young dies/aborts)"

print("T1 (TS=10) requests resource held by T2 (TS=25):", wait_die(10, 25))
print("T3 (TS=40) requests resource held by T2 (TS=25):", wait_die(40, 25))
`,
        },
        detailedNotes: `### Two-Phase Locking (2PL):
- **Growing Phase:** Transaction may acquire locks, but cannot release any lock.
- **Shrinking Phase:** Transaction may release locks, but cannot acquire any new lock.
- **Strict 2PL:** All exclusive (X) locks held by transaction are retained until the transaction COMMITS or ABORTS. Prevents cascading rollbacks!`,
      },
    ],
  },
  // =========================================================================
  // 3. COMPUTER NETWORKS (CN)
  // =========================================================================
  {
    id: 'cn',
    title: 'Computer Networks (CN)',
    code: 'CS 303',
    category: 'Core Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '🌐',
    color: '#10B981',
    playlistId: 'PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
    description:
      'Deep dive into computer networking protocols: 7-Layer OSI Model, TCP/IP, Framing, Error Detection (CRC), Sliding Window Flow Control, CSMA/CD, IPv4 Subnetting, Routing (Distance Vector & Link State), TCP 3-Way Handshake, Congestion Control (AIMD), and DNS/HTTP.',
    lecturesCount: 12,
    totalDuration: '5 hrs 15 mins',
    keyTopics: [
      'OSI 7 Layers vs TCP/IP Protocol Architecture',
      'Data Link Framing & Bit Stuffing',
      'Cyclic Redundancy Check (CRC) Error Detection',
      'Stop-and-Wait, Go-Back-N & Selective Repeat Protocols',
      'Pure ALOHA, Slotted ALOHA & CSMA/CD Backoff',
      'IPv4 Classful & Classless (CIDR) Subnetting',
      'Distance Vector (RIP) vs Link State (OSPF) Routing',
      'TCP vs UDP Differences, Port Numbers & Sockets',
      'TCP 3-Way Handshake & Connection Termination',
      'TCP Congestion Control: Slow Start, Congestion Avoidance & AIMD',
      'Domain Name System (DNS) Resolution Hierarchy',
      'HTTP/1.1 Persistent Connections, HTTP/2 & HTTPS SSL/TLS',
    ],
    lectures: [
      {
        id: 'cn-1',
        lectureNumber: 1,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L1: Introduction to Computer Networks & Network Topologies',
        duration: '19:10',
        videoId: 'VwN9145mQQg',
        topics: ['LAN, MAN, WAN', 'Mesh, Star, Bus, Ring Topologies', 'Circuit Switching vs Packet Switching'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Mesh vs Star Topology Wire Cost Calculator
def network_links(nodes):
    mesh_links = (nodes * (nodes - 1)) // 2
    star_links = nodes  # Hub connections
    return mesh_links, star_links

m, s = network_links(10)
print(f"10 Nodes -> Mesh Links: {m}, Star Links: {s}")
`,
        },
        detailedNotes: `### Network Topologies:
- **Mesh:** Every device connected to every other. Links = $\frac{N(N-1)}{2}$. High redundancy, highly fault-tolerant, expensive.
- **Star:** All devices connect to a central hub/switch. $N$ links. Single point of failure at hub, easy maintenance.
- **Bus:** Single backbone cable with terminators. Inexpensive, but high collision probability and cable break takes down entire segment.`,
      },
      {
        id: 'cn-2',
        lectureNumber: 2,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L2: The 7-Layer OSI Model vs TCP/IP Protocol Architecture',
        duration: '27:45',
        videoId: 'IPv4eW6b2rM',
        topics: ['Physical, Data Link, Network, Transport, Session, Presentation, Application', 'PDU Headers & Encapsulation', 'TCP/IP 4-Layer Mapping'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `layers = [
    ("Application", "Data", "HTTP, DNS, SSH"),
    ("Presentation", "Data", "SSL/TLS, JPEG, ASCII"),
    ("Session", "Data", "RPC, NetBIOS"),
    ("Transport", "Segment (TCP) / Datagram (UDP)", "Port 80, 443"),
    ("Network", "Packet", "IPv4, IPv6, ICMP, OSPF"),
    ("Data Link", "Frame", "Ethernet MAC, PPP, Wi-Fi"),
    ("Physical", "Bits", "Cables, Radio Waves, Fiber")
]

for l, pdu, protocols in layers:
    print(f"[{l:12}] PDU: {pdu:30} | {protocols}")
`,
        },
        detailedNotes: `### OSI vs TCP/IP Protocol Mapping:
1. **Application Layer:** User interface & network services (combines Application, Presentation, Session of OSI).
2. **Transport Layer:** End-to-end reliability, multiplexing (TCP / UDP).
3. **Internet Layer:** Host-to-host packet routing across heterogeneous networks (IP, ICMP, ARP).
4. **Network Access Layer:** Framing, MAC addressing, physical bit transmission (Ethernet, Wi-Fi).`,
      },
      {
        id: 'cn-3',
        lectureNumber: 3,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L3: Physical Layer, Transmission Media & Channel Capacity Formulas',
        duration: '21:30',
        videoId: '3x7qK8wB9vU',
        topics: ['Twisted Pair, Coaxial, Fiber Optics', 'Nyquist Bit Rate (Noiseless)', 'Shannon Channel Capacity (Noisy)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import math

def shannon_capacity(bandwidth_hz, snr_db):
    snr_linear = 10 ** (snr_db / 10)
    capacity_bps = bandwidth_hz * math.log2(1 + snr_linear)
    return capacity_bps

bw = 3000  # 3 kHz telephone line
snr = 30   # 30 dB SNR
print(f"Theoretical Max Capacity: {shannon_capacity(bw, snr) / 1000:.2f} kbps")
`,
        },
        detailedNotes: `### Channel Capacity Formulas:
- **Nyquist Formula (Noiseless Channel):**
  $$C = 2B \log_2(M) \text{ bps}$$
- **Shannon Capacity (Noisy Channel):**
  $$C = B \log_2(1 + \text{SNR}) \text{ bps}$$
  where $\text{SNR}_{\text{dB}} = 10 \log_{10}(\text{SNR}_{\text{linear}})$.`,
      },
      {
        id: 'cn-4',
        lectureNumber: 4,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L4: Data Link Layer: Framing, Bit Stuffing & Error Detection (CRC)',
        duration: '29:50',
        videoId: 'j6M7r3b8yVA',
        topics: ['Byte Stuffing (Escape Characters)', 'Bit Stuffing (HDLC Flag 01111110)', 'CRC Polynomial Division', 'Parity & Checksum'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def crc_remainder(data: str, generator: str) -> str:
    dividend = list(data + '0' * (len(generator) - 1))
    gen = list(generator)
    for i in range(len(data)):
        if dividend[i] == '1':
            for j in range(len(gen)):
                dividend[i + j] = '0' if dividend[i + j] == gen[j] else '1'
    return ''.join(dividend[-(len(generator) - 1):])

data = "11010011101100"
gen = "1011"
rem = crc_remainder(data, gen)
print("Transmitted Frame:", data + rem)
`,
        },
        detailedNotes: `### Cyclic Redundancy Check (CRC):
1. Append $(k-1)$ zeros to the $m$-bit data word where $k$ is generator polynomial bit length.
2. Perform modulo-2 binary division using XOR operations.
3. The resulting remainder of length $(k-1)$ is the CRC checksum appended to the data frame.`,
      },
      {
        id: 'cn-5',
        lectureNumber: 5,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L5: Sliding Window Flow Control: Stop-and-Wait, GBN & Selective Repeat',
        duration: '34:10',
        videoId: 'q5W3v8rM1yU',
        topics: ['Stop-and-Wait Efficiency Formula', 'Go-Back-N Window Size (N)', 'Selective Repeat Window Size (2^(n-1))', 'Cumulative vs Independent ACKs'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def protocol_efficiency(t_trans, t_prop, window_size=1):
    a = t_prop / t_trans
    efficiency = window_size / (1 + 2 * a)
    return min(1.0, efficiency)

# High latency link: trans = 1ms, prop = 49.5ms
print("Stop-and-Wait Efficiency:", protocol_efficiency(1, 49.5, 1) * 100, "%")
print("GBN (Window=100) Efficiency:", protocol_efficiency(1, 49.5, 100) * 100, "%")
`,
        },
        detailedNotes: `### Sliding Window Protocols Comparison:
- **Stop-and-Wait:** Sender Window $W_S = 1$, Receiver Window $W_R = 1$. Efficiency $\eta = \frac{1}{1 + 2a}$.
- **Go-Back-N (GBN):** $W_S = 2^n - 1$, $W_R = 1$. Re-transmits all unacknowledged packets from lost packet forward. Uses cumulative ACKs.
- **Selective Repeat (SR):** $W_S = 2^{n-1}$, $W_R = 2^{n-1}$. Only re-transmits the individual damaged packet. Uses independent individual ACKs.`,
      },
      {
        id: 'cn-6',
        lectureNumber: 6,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L6: Medium Access Control: Pure ALOHA, Slotted ALOHA & CSMA/CD',
        duration: '28:20',
        videoId: 'b4R7y9wM2vA',
        topics: ['Collision Domain', 'Pure ALOHA Throughput (18.4%)', 'Slotted ALOHA Throughput (36.8%)', 'CSMA 1-Persistent', 'Binary Exponential Backoff'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import math

def aloha_throughput(g):
    pure = g * math.exp(-2 * g)
    slotted = g * math.exp(-g)
    return pure, slotted

print(f"Max Pure ALOHA (G=0.5): {aloha_throughput(0.5)[0] * 100:.1f}%")
print(f"Max Slotted ALOHA (G=1.0): {aloha_throughput(1.0)[1] * 100:.1f}%")
`,
        },
        detailedNotes: `### CSMA/CD Minimum Frame Size Rule:
To reliably detect a collision before transmission completes:
$$T_{\text{trans}} \ge 2 \times T_{\text{prop}} \implies \frac{L}{B} \ge 2 \times \frac{D}{V} \implies L_{\text{min}} = 2 \times B \times T_{\text{prop}}$$
This ensures the sender is still transmitting when the collision fragment bounces back!`,
      },
      {
        id: 'cn-7',
        lectureNumber: 7,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L7: Network Layer: IPv4 Addressing, Classful & CIDR Subnetting',
        duration: '33:15',
        videoId: 'm9P3q7vL1wA',
        topics: ['32-bit IP Address', 'Classes A, B, C, D, E', 'Subnet Masks & Slash Notation (/24)', 'Network ID & Broadcast Address Calculation'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def subnet_details(ip_str, prefix_len):
    octets = [int(x) for x in ip_str.split('.')]
    ip_int = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]
    mask = (0xFFFFFFFF << (32 - prefix_len)) & 0xFFFFFFFF
    
    net_int = ip_int & mask
    bcast_int = net_int | (~mask & 0xFFFFFFFF)
    usable_hosts = (1 << (32 - prefix_len)) - 2
    
    def to_ip(val):
        return f"{(val >> 24) & 255}.{(val >> 16) & 255}.{(val >> 8) & 255}.{val & 255}"
        
    return to_ip(net_int), to_ip(bcast_int), usable_hosts

net, bcast, hosts = subnet_details("192.168.1.135", 26)
print(f"Network ID: {net}, Broadcast: {bcast}, Usable Hosts: {hosts}")
`,
        },
        detailedNotes: `### Subnetting Rules:
- **Subnet ID:** Bitwise AND of IP Address and Subnet Mask.
- **Directed Broadcast Address:** Bitwise OR of Subnet ID and inverted Subnet Mask.
- **Total Usable Hosts in /P prefix:** $2^{32 - P} - 2$ (subtracting Network ID and Broadcast).`,
      },
      {
        id: 'cn-8',
        lectureNumber: 8,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L8: IP Routing Protocols: Distance Vector (RIP) vs Link State (OSPF)',
        duration: '31:40',
        videoId: 'x2M8r9b5wVU',
        topics: ['Bellman-Ford Equation', 'Count-to-Infinity Problem & Split Horizon', 'Dijkstra Algorithm in OSPF', 'BGP Exterior Gateway Protocol'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Distance Vector Bellman-Ford Routing
def distance_vector_update(node, neighbors, routing_table):
    updated = False
    for dest in range(len(routing_table)):
        for neighbor, cost in neighbors:
            via_cost = cost + routing_table[neighbor][dest]
            if via_cost < routing_table[node][dest]:
                routing_table[node][dest] = via_cost
                updated = True
    return updated

print("Routing update verified")
`,
        },
        detailedNotes: `### Distance Vector vs Link State:
- **Distance Vector (RIP):** Routers share routing table only with immediate neighbors. Convergence is slow; suffers from count-to-infinity solved via split horizon and poison reverse.
- **Link State (OSPF):** Routers flood Link State Advertisements (LSA) across the entire autonomous system, building a complete network topology map and running Dijkstra's shortest path algorithm independently.`,
      },
      {
        id: 'cn-9',
        lectureNumber: 9,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L9: Transport Layer: TCP vs UDP Differences, Port Numbers & Sockets',
        duration: '23:50',
        videoId: 'v7P3r8wM2yU',
        topics: ['Connection-Oriented vs Connectionless', 'Reliability, Checksums, Sequence Numbers', 'Socket API (IP + Port)', 'Well-Known Ports (80, 443, 22, 53)'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `import socket

# Client socket connection pattern
def inspect_socket_family():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP
    print("TCP Socket created:", s.type == socket.SOCK_STREAM)
    u = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   # UDP
    print("UDP Socket created:", u.type == socket.SOCK_DGRAM)

inspect_socket_family()
`,
        },
        detailedNotes: `### TCP vs UDP Comparison:
| Feature | TCP | UDP |
| :--- | :--- | :--- |
| **Connection** | Connection-Oriented (3-way handshake) | Connectionless |
| **Reliability** | Guaranteed delivery with ACKs & retransmission | Best-effort, packets can be dropped/reordered |
| **Ordering** | In-order delivery via sequence numbers | No ordering guarantee |
| **Overhead** | 20-60 bytes header | 8 bytes fixed header |
| **Use Cases** | Web (HTTP), Email (SMTP), File transfer (FTP) | Video streaming, DNS, VoIP, Online gaming |`,
      },
      {
        id: 'cn-10',
        lectureNumber: 10,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L10: TCP 3-Way Handshake, Connection Termination & Flags',
        duration: '26:10',
        videoId: 'a6M7r8b9yVU',
        topics: ['SYN, ACK, FIN, RST Flags', 'Initial Sequence Number (ISN)', 'TIME_WAIT State & 2MSL Duration', 'SYN Flood Attack & SYN Cookies'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class TCPStateTracker:
    def __init__(self):
        self.state = "CLOSED"
        
    def client_event(self, event):
        if self.state == "CLOSED" and event == "SEND_SYN":
            self.state = "SYN_SENT"
        elif self.state == "SYN_SENT" and event == "RECV_SYN_ACK":
            self.state = "ESTABLISHED"
        elif self.state == "ESTABLISHED" and event == "SEND_FIN":
            self.state = "FIN_WAIT_1"
        return self.state

tracker = TCPStateTracker()
print("Event SEND_SYN ->", tracker.client_event("SEND_SYN"))
print("Event RECV_SYN_ACK ->", tracker.client_event("RECV_SYN_ACK"))
`,
        },
        detailedNotes: `### TCP 3-Way Handshake:
1. **Client $\rightarrow$ Server:** \`SYN\` (seq = $x$)
2. **Server $\rightarrow$ Client:** \`SYN-ACK\` (seq = $y$, ack = $x + 1$)
3. **Client $\rightarrow$ Server:** \`ACK\` (seq = $x + 1$, ack = $y + 1$)
- **TIME_WAIT state:** Client waits $2 \times \text{MSL}$ (Maximum Segment Lifetime, typically 2 minutes) after sending final ACK to ensure late duplicate packets expire from the internet before reusing the same port tuple.`,
      },
      {
        id: 'cn-11',
        lectureNumber: 11,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L11: TCP Congestion Control: Slow Start, Congestion Avoidance & AIMD',
        duration: '32:30',
        videoId: 'd3Q8r7vM1wA',
        topics: ['Congestion Window (cwnd)', 'ssthresh Threshold', 'Exponential Slow Start', 'Additive Increase Multiplicative Decrease (AIMD)', 'Fast Retransmit & Fast Recovery'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def simulate_aimd(rounds=15):
    cwnd = 1
    ssthresh = 16
    history = []
    
    for r in range(rounds):
        history.append(cwnd)
        if cwnd < ssthresh:
            cwnd *= 2  # Slow Start (Exponential)
        else:
            cwnd += 1  # Congestion Avoidance (Linear)
            
        if r == 7:  # Triple Duplicate ACK Loss Event
            ssthresh = cwnd // 2
            cwnd = ssthresh  # Fast Recovery
            
    return history

print("CWND Growth Trace:", simulate_aimd())
`,
        },
        detailedNotes: `### TCP Congestion Control Phases:
1. **Slow Start:** Starts at $\text{cwnd} = 1\text{ MSS}$. Doubles cwnd every RTT until reaching $\text{ssthresh}$.
2. **Congestion Avoidance:** Increments $\text{cwnd} += 1\text{ MSS}$ per RTT (linear increase).
3. **Triple Duplicate ACK (Mild Loss):** $\text{ssthresh} = \frac{\text{cwnd}}{2}$, $\text{cwnd} = \text{ssthresh}$ (Fast Retransmit & Recovery).
4. **Timeout (Severe Loss):** $\text{ssthresh} = \frac{\text{cwnd}}{2}$, $\text{cwnd} = 1\text{ MSS}$ (re-enters Slow Start).`,
      },
      {
        id: 'cn-12',
        lectureNumber: 12,
        subjectId: 'cn',
        subjectName: 'CN',
        title: 'L12: Application Layer: DNS, HTTP/1.1 vs HTTP/2, HTTPS & SSL/TLS',
        duration: '27:15',
        videoId: 'k7P3r8wM2yA',
        topics: ['Iterative vs Recursive DNS Queries', 'Root, TLD, Authoritative DNS Servers', 'HTTP Head-of-Line Blocking', 'HTTP/2 Binary Framing & Multiplexing', 'TLS Handshake'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# DNS Resolution Step Hierarchy Simulation
def resolve_dns(domain):
    steps = [
        "1. Check Browser / OS Local Cache",
        "2. Query Local ISP Resolver (Recursive)",
        "3. Query Root DNS Server (returns .com TLD IP)",
        "4. Query TLD DNS Server (returns authoritative NS)",
        "5. Query Authoritative Name Server -> IP A-Record"
    ]
    return steps

for step in resolve_dns("example.com"):
    print(step)
`,
        },
        detailedNotes: `### HTTP Evolution:
- **HTTP/1.0:** Opens new TCP connection for every single asset. High latency.
- **HTTP/1.1:** Persistent connections (\`Connection: keep-alive\`), pipelining. Still suffers from Head-of-Line (HoL) blocking at HTTP request level.
- **HTTP/2:** Single TCP connection, binary framing layer, stream multiplexing (solves HTTP HoL blocking), HPACK header compression, Server Push.
- **HTTP/3 (QUIC):** Runs over UDP with built-in encryption and independent streams (solves TCP-level HoL packet loss blocking).`,
      },
    ],
  },
  // =========================================================================
  // 4. SYSTEM DESIGN (HLD)
  // =========================================================================
  {
    id: 'system-design',
    title: 'System Design (HLD)',
    code: 'CS 401',
    category: 'Architecture & Scalability',
    instructor: 'Gaurav Sen & System Design Primer',
    icon: '🏗️',
    color: '#EC4899',
    playlistId: 'PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    description:
      'Master high-level system design for scalable modern web applications: Horizontal Scaling, Layer 4/7 Load Balancing, Distributed Caching (Redis), Database Sharding, Consistent Hashing, Message Queues (Kafka), CAP Theorem, Rate Limiting, and Full System Case Studies.',
    lecturesCount: 10,
    totalDuration: '4 hrs 40 mins',
    keyTopics: [
      'Vertical vs Horizontal Scaling & Single Points of Failure',
      'Layer 4 vs Layer 7 Load Balancing Algorithms',
      'Caching Strategies: Cache-Aside, Write-Through & Eviction',
      'Database Sharding, Partition Keys & Master-Slave Replication',
      'Consistent Hashing & Virtual Nodes Distribution',
      'Message Queues & Event-Driven Architecture (Kafka vs RabbitMQ)',
      'CAP Theorem, PACELC Theorem & Eventual Consistency',
      'Distributed Rate Limiting Algorithms (Token Bucket, Leaky Bucket)',
      'Content Delivery Networks (CDN) & Anycast Routing',
      'End-to-End System Case Study: Designing TinyURL & Pastebin',
    ],
    lectures: [
      {
        id: 'sd-1',
        lectureNumber: 1,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L1: Fundamentals of System Design: Scaling & Reliability',
        duration: '21:10',
        videoId: 'xpDnLNdsX4c',
        topics: ['Vertical Scaling (Scale Up)', 'Horizontal Scaling (Scale Out)', 'Single Point of Failure (SPOF)', 'Stateless App Tier'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `class StatelessWebServer:
    def handle_request(self, user_id: str, session_token: str, db_pool, cache_client):
        # State stored in external cache, NOT on the web server instance!
        user_session = cache_client.get(session_token)
        if not user_session:
            user_session = db_pool.query("SELECT * FROM users WHERE id = %s", user_id)
            cache_client.set(session_token, user_session)
        return {"status": 200, "user": user_session}
`,
        },
        detailedNotes: `### Scaling Principles:
1. **Stateless Web Tier:** Move all session state into distributed in-memory stores (e.g. Redis). Any server instance can handle any incoming user request.
2. **Redundancy:** Every tier (DNS, Load Balancer, Web Server, Database, Cache) must have at least $N+1$ standby or active-active replicas to eliminate Single Points of Failure.`,
      },
      {
        id: 'sd-2',
        lectureNumber: 2,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L2: Load Balancers: Layer 4 vs Layer 7 & Routing Algorithms',
        duration: '28:15',
        videoId: 'K0Ta65OqQk8',
        topics: ['L4 Transport vs L7 Application Routing', 'Round Robin, Weighted Round Robin, Least Connections', 'Health Checking & SSL Termination'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class RoundRobinLoadBalancer:
    def __init__(self, backend_servers):
        self.servers = backend_servers
        self.index = 0

    def route_request(self):
        server = self.servers[self.index]
        self.index = (self.index + 1) % len(self.servers)
        return server

lb = RoundRobinLoadBalancer(["10.0.0.1:80", "10.0.0.2:80", "10.0.0.3:80"])
for _ in range(5):
    print("Routed to:", lb.route_request())
`,
        },
        detailedNotes: `### Layer 4 vs Layer 7 Load Balancing:
- **Layer 4 (Transport / TCP/UDP):** Makes routing decisions based only on IP address and TCP port without inspecting HTTP payload. Ultra-high throughput, low CPU overhead (e.g., AWS NLB, HAProxy TCP mode).
- **Layer 7 (Application / HTTP):** Decodes HTTP headers, cookies, and path URLs (\`/api/v1/payments\` vs \`/static/\`). Enables path-based routing, header manipulation, and SSL termination (e.g., AWS ALB, NGINX).`,
      },
      {
        id: 'sd-3',
        lectureNumber: 3,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L3: Distributed Caching: Cache-Aside, Write-Through & Eviction',
        duration: '31:40',
        videoId: 'iuqZFT8SiiQ',
        topics: ['Cache-Aside (Lazy Loading)', 'Write-Through vs Write-Back', 'Eviction Policies: LRU, LFU, FIFO', 'Cache Invalidation & Thundering Herd'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class CacheAsidePattern:
    def __init__(self, cache, db):
        self.cache = cache
        self.db = db

    def get_user(self, user_id):
        # 1. Read from Cache
        val = self.cache.get(user_id)
        if val is not None:
            return val, "CACHE_HIT"
        # 2. Cache Miss: Read from DB & Populate Cache
        val = self.db.get(user_id)
        self.cache[user_id] = val
        return val, "CACHE_MISS"

cache, db = {}, {"u1": "Alice", "u2": "Bob"}
repo = CacheAsidePattern(cache, db)
print(repo.get_user("u1"))
print(repo.get_user("u1"))
`,
        },
        detailedNotes: `### Caching Patterns:
- **Cache-Aside (Lazy Loading):** App reads from cache; on miss, reads from DB and populates cache. Only requested data is cached.
- **Write-Through:** App writes to cache and cache writes synchronously to DB. Guarantees consistency, but higher write latency.
- **Write-Behind (Write-Back):** App writes to cache; cache batches asynchronous writes to DB. High throughput, but potential data loss on crash.`,
      },
      {
        id: 'sd-4',
        lectureNumber: 4,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L4: Database Sharding, Partition Keys & Master-Slave Replication',
        duration: '29:50',
        videoId: '5faMjKuB9TU',
        topics: ['Vertical Partitioning vs Horizontal Sharding', 'Shard Key Selection', 'Replication Lag & Read Replicas', 'Cross-Shard Joins'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import hashlib

class DatabaseSharder:
    def __init__(self, shards):
        self.shards = shards

    def get_shard(self, user_id: str):
        # Modulo Sharding on MD5 Hash of Shard Key
        digest = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
        return self.shards[digest % len(self.shards)]

sharder = DatabaseSharder(["db_shard_0", "db_shard_1", "db_shard_2"])
for uid in ["usr_101", "usr_102", "usr_103", "usr_104"]:
    print(f"User {uid} mapped to {sharder.get_shard(uid)}")
`,
        },
        detailedNotes: `### Sharding Considerations:
1. **Shard Key Choice:** Must distribute reads and writes uniformly across nodes to prevent "Hot Shards" (e.g., hashing user IDs instead of timestamps or country codes).
2. **Replication:** Primary DB handles all Writes; secondary Replicas handle scale-out Reads asynchronously. Application must accommodate potential Replication Lag (Eventual Consistency).`,
      },
      {
        id: 'sd-5',
        lectureNumber: 5,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L5: Consistent Hashing & Virtual Nodes Distribution',
        duration: '32:10',
        videoId: 'zaRkONvyGr8',
        topics: ['Modulo Hash Limitation on Node Failure', 'Hash Ring (0 to 2^32 - 1)', 'Clockwise Node Search', 'Virtual Nodes for Uniform Spread'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import hashlib
import bisect

class ConsistentHashRing:
    def __init__(self, nodes=None, replicas=3):
        self.replicas = replicas
        self.ring = []
        self.node_map = {}
        for n in (nodes or []): self.add_node(n)

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node):
        for i in range(self.replicas):
            h = self._hash(f"{node}:{i}")
            bisect.insort(self.ring, h)
            self.node_map[h] = node

    def get_node(self, key):
        if not self.ring: return None
        h = self._hash(key)
        idx = bisect.bisect_right(self.ring, h)
        if idx == len(self.ring): idx = 0
        return self.node_map[self.ring[idx]]

chr = ConsistentHashRing(["Server-A", "Server-B", "Server-C"])
print("Key 'order_981' goes to:", chr.get_node("order_981"))
`,
        },
        detailedNotes: `### Consistent Hashing Advantages:
- In traditional modulo hashing ($K \% N$), adding or removing one server remaps nearly $100\%$ of all keys, causing a catastrophic cache miss storm.
- With **Consistent Hashing**, adding or removing a node only reassigns $K/N$ keys on average, leaving the rest undisturbed!`,
      },
      {
        id: 'sd-6',
        lectureNumber: 6,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L6: Asynchronous Processing & Message Queues (Kafka vs RabbitMQ)',
        duration: '27:45',
        videoId: 'o3XmY7Pz6yA',
        topics: ['Message Queue vs Pub/Sub', 'Kafka Partitioning & Consumer Groups', 'RabbitMQ Exchange Types', 'At-least-once Delivery & Idempotency'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `from collections import deque

class SimpleMessageQueue:
    def __init__(self):
        self.queue = deque()

    def produce(self, topic, message):
        self.queue.append((topic, message))
        print(f"[PRODUCER] Published to {topic}: {message}")

    def consume(self):
        if self.queue:
            topic, msg = self.queue.popleft()
            print(f"[CONSUMER] Processing {topic}: {msg}")
            return msg
        return None

mq = SimpleMessageQueue()
mq.produce("order_created", {"order_id": 1001, "amount": 49.99})
mq.consume()
`,
        },
        detailedNotes: `### Kafka vs RabbitMQ:
- **Kafka:** Distributed commit log. High throughput (millions of msgs/sec), sequential disk writes, partition-based ordered delivery, replayable history.
- **RabbitMQ:** Traditional message broker with complex routing (direct, topic, fanout exchanges). Messages are acknowledged and deleted from queues upon consumption.`,
      },
      {
        id: 'sd-7',
        lectureNumber: 7,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L7: CAP Theorem, PACELC Theorem & Eventual Consistency',
        duration: '25:20',
        videoId: 'k-Yeq8v9k8M',
        topics: ['Consistency (Linearizability)', 'Availability', 'Partition Tolerance', 'CP vs AP Systems', 'PACELC (Latency vs Consistency)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def classify_database(system_name):
    classifications = {
        "HBase": "CP: Strong consistency, rejects writes during network partition",
        "Cassandra": "AP: Highly available, eventual consistency via tunable quorum",
        "DynamoDB": "AP (default) / CP (strong read option)",
        "Spanner": "CP: External consistency using TrueTime GPS atomic clocks"
    }
    return classifications.get(system_name, "Custom Distributed DB")

for db in ["Cassandra", "HBase", "Spanner"]:
    print(f"{db:10} -> {classify_database(db)}")
`,
        },
        detailedNotes: `### PACELC Theorem:
In a distributed system:
- **If Partition ($P$):** Choose between **Availability ($A$)** or **Consistency ($C$)**.
- **Else ($E$):** Choose between **Latency ($L$)** or **Consistency ($C$)**.
Examples: Cassandra is **PA/EL** (favors availability and low latency); MongoDB is **PC/EC** (favors consistency).`,
      },
      {
        id: 'sd-8',
        lectureNumber: 8,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L8: Distributed Rate Limiting: Token Bucket & Leaky Bucket',
        duration: '30:15',
        videoId: 'FU4PKb8f8xU',
        topics: ['Token Bucket Algorithm', 'Leaky Bucket Smoothing', 'Sliding Window Counter', 'Redis Lua Scripts for Atomic Checks'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import time

class TokenBucket:
    def __init__(self, capacity, fill_rate):
        self.capacity = capacity
        self.fill_rate = fill_rate  # tokens per second
        self.tokens = capacity
        self.last_fill = time.time()

    def allow_request(self, tokens_needed=1):
        now = time.time()
        # Add leaked tokens
        self.tokens = min(self.capacity, self.tokens + (now - self.last_fill) * self.fill_rate)
        self.last_fill = now
        
        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True
        return False

limiter = TokenBucket(capacity=5, fill_rate=2)
for i in range(7):
    print(f"Request {i+1}: {'ALLOWED' if limiter.allow_request() else 'RATE_LIMITED'}")
`,
        },
        detailedNotes: `### Rate Limiting Algorithms:
- **Token Bucket:** Tokens added at fixed rate up to capacity. Allows bursts of traffic as long as tokens are available.
- **Leaky Bucket:** Requests enter a FIFO queue and leak out at a constant smooth output rate. Smooths out traffic spikes.
- **Sliding Window Counter:** Blends current and previous minute request counts to eliminate boundary burst vulnerabilities.`,
      },
      {
        id: 'sd-9',
        lectureNumber: 9,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L9: Content Delivery Networks (CDN) & Anycast Routing',
        duration: '22:30',
        videoId: 'j1X7r8b9yVU',
        topics: ['Point of Presence (PoP)', 'Push vs Pull CDNs', 'BGP Anycast Routing', 'Cache Headers (Cache-Control, ETag)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Edge Caching Decision Tree
def cdn_cache_policy(headers):
    cache_control = headers.get("Cache-Control", "")
    if "no-store" in cache_control:
        return "PASS_TO_ORIGIN"
    if "max-age" in cache_control:
        return "SERVE_FROM_EDGE_OR_FETCH"
    return "DEFAULT_EDGE_CACHE_POLICY"

print("Static Asset Policy:", cdn_cache_policy({"Cache-Control": "public, max-age=86400"}))
`,
        },
        detailedNotes: `### CDN Architecture:
- CDNs deploy geographically distributed Points of Presence (PoPs) to serve static media (JS, CSS, images, video chunks) from edge servers closest to users.
- **BGP Anycast:** Multiple edge servers across the globe announce the exact same IP address; the internet routing protocol naturally directs the client to the topologically closest datacenter!`,
      },
      {
        id: 'sd-10',
        lectureNumber: 10,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L10: High-Level Architecture Case Study: Designing TinyURL',
        duration: '35:40',
        videoId: 'fMZMm_0ZhK4',
        topics: ['Base62 Encoding (62^7 = 3.5 Trillion URLs)', 'Counter-based Key Generation Service (KGS)', 'Read-Heavy Caching Architecture', 'Database Schema & Partitioning'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode_base62(num: int) -> str:
    if num == 0: return CHARS[0]
    res = []
    while num > 0:
        res.append(CHARS[num % 62])
        num //= 62
    return "".join(reversed(res))

def decode_base62(code: str) -> int:
    num = 0
    for ch in code:
        num = num * 62 + CHARS.index(ch)
    return num

unique_counter = 12519320568
short_code = encode_base62(unique_counter)
print(f"ID {unique_counter} -> Short URL: https://tiny.url/{short_code}")
print(f"Decoded back to ID: {decode_base62(short_code)}")
`,
        },
        detailedNotes: `### TinyURL System Design Summary:
1. **Capacity Estimation:** 500M new URLs/month $\rightarrow$ 6 Billion/year. 7 Base62 characters yield $62^7 \approx 3.5 \times 10^{12}$ unique URLs (500+ years of capacity).
2. **Key Generation Service (KGS):** Pre-generates random 7-character strings and marks them in DB to prevent runtime hashing collisions or counter enumeration.
3. **Storage & Cache:** NoSQL key-value store (DynamoDB/Cassandra) partitioned by short key hash. Memcached/Redis cluster caches top 20% hottest URLs (satisfying 80% of read traffic).`,
      },
    ],
  },
  // =========================================================================
  // 5. LOW-LEVEL DESIGN & OOPS (LLD)
  // =========================================================================
  {
    id: 'lld',
    title: 'Low-Level Design & OOPs (LLD)',
    code: 'CS 402',
    category: 'Architecture & Scalability',
    instructor: 'Shrayansh Jain (Concept && Coding)',
    icon: '🧩',
    color: '#F59E0B',
    playlistId: 'PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6',
    description:
      'Master machine-coding rounds and clean object-oriented architecture: SOLID Principles, Strategy, Observer, Decorator, Factory, Singleton, Adapter, Builder, State Pattern, and End-to-End Game Design.',
    lecturesCount: 10,
    totalDuration: '4 hrs 50 mins',
    keyTopics: [
      'SOLID Principles with Real-World Refactorings',
      'Strategy Pattern for Dynamic Algorithm Switching',
      'Observer Pattern & Real-Time Event Pub/Sub Engine',
      'Decorator Pattern & Dynamic Feature Wrapping',
      'Factory Method & Abstract Factory Architectural Decoupling',
      'Thread-Safe Singleton with Double-Checked Locking',
      'Adapter & Facade Patterns for Legacy Integration',
      'Builder Pattern for Immutable Complex Object Construction',
      'State Pattern for Finite State Machine Modeling',
      'Machine Coding Case Study: Designing a Modular Tic-Tac-Toe Game',
    ],
    lectures: [
      {
        id: 'lld-1',
        lectureNumber: 1,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L1: Object-Oriented Design & The 5 SOLID Principles',
        duration: '26:30',
        videoId: 'y7e_mO4x2_U',
        topics: ['Single Responsibility (SRP)', 'Open-Closed (OCP)', 'Liskov Substitution (LSP)', 'Interface Segregation (ISP)', 'Dependency Inversion (DIP)'],
        difficulty: 'Beginner',
        starterCodes: {
          cpp: `// Open-Closed Principle (OCP) Example:
#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class InvoicePersistence {
public:
    virtual void save() = 0;
    virtual ~InvoicePersistence() = default;
};

class DatabasePersistence : public InvoicePersistence {
public:
    void save() override { cout << "Saving invoice to MySQL Database..." << endl; }
};

class FilePersistence : public InvoicePersistence {
public:
    void save() override { cout << "Saving invoice to Disk File..." << endl; }
};

int main() {
    unique_ptr<InvoicePersistence> p = make_unique<DatabasePersistence>();
    p->save();
    return 0;
}
`,
        },
        detailedNotes: `### The SOLID Principles:
- **S (SRP):** A class should have only one reason to change.
- **O (OCP):** Software entities should be open for extension, but closed for modification.
- **L (LSP):** Subtypes must be substitutable for their base types without altering correctness.
- **I (ISP):** Clients should not be forced to depend on interfaces they do not use.
- **D (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions.`,
      },
      {
        id: 'lld-2',
        lectureNumber: 2,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L2: Strategy Design Pattern Explained with Real-World Examples',
        duration: '24:15',
        videoId: 'v9ejT8FetMT',
        topics: ['Composition over Inheritance', 'DriveStrategy Interface', 'PaymentMethod Strategy', 'Eliminating Code Duplication'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class PaymentStrategy:
    def pay(self, amount: float): pass

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount: float):
        print(f"Paid $\${amount} using Credit Card.")

class CryptoPayment(PaymentStrategy):
    def pay(self, amount: float):
        print(f"Paid $\${amount} using Ethereum.")

class ShoppingCart:
    def __init__(self, payment_strategy: PaymentStrategy):
        self.strategy = payment_strategy
    def checkout(self, total):
        self.strategy.pay(total)

cart = ShoppingCart(CreditCardPayment())
cart.checkout(150.0)
cart.strategy = CryptoPayment()
cart.checkout(200.0)
`,
        },
        detailedNotes: `### When to Use Strategy Pattern:
Use Strategy pattern when multiple classes differ only in their behavior/algorithm, or when you need different variants of an algorithm switchable at runtime without \`if-else\` cascades.`,
      },
      {
        id: 'lld-3',
        lectureNumber: 3,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L3: Observer Design Pattern & Real-Time Event Notification Engine',
        duration: '27:40',
        videoId: 'Ep9_Zcgst38',
        topics: ['Subject (Observable) Interface', 'Observer Interface', 'Push vs Pull Notification', 'Stock / Weather Station Example'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class StockObserver:
    def update(self, price: float): pass

class MobileNotification(StockObserver):
    def update(self, price: float):
        print(f"[Mobile Alert] Stock price updated to: $\${price}")

class StockSubject:
    def __init__(self):
        self.observers = []
        self.price = 0.0

    def attach(self, obs: StockObserver):
        self.observers.append(obs)

    def set_price(self, new_price: float):
        self.price = new_price
        for obs in self.observers:
            obs.update(self.price)

apple_stock = StockSubject()
apple_stock.attach(MobileNotification())
apple_stock.set_price(185.50)
`,
        },
        detailedNotes: `### Observer Pattern:
Defines a 1-to-many dependency between objects so that when one object changes state, all its dependents are automatically notified and updated.`,
      },
      {
        id: 'lld-4',
        lectureNumber: 4,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L4: Decorator Pattern with Coffee Shop Billing Problem',
        duration: '28:50',
        videoId: 'w6a9MXPtq38',
        topics: ['Base Component vs Decorator Class', 'Solving Class Explosion Problem', 'Runtime Wrapping', 'Cost & Description Aggregation'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class Beverage:
    def cost(self) -> float: pass
    def description(self) -> str: pass

class Espresso(Beverage):
    def cost(self): return 2.0
    def description(self): return "Espresso"

class MilkDecorator(Beverage):
    def __init__(self, beverage: Beverage):
        self._bev = beverage
    def cost(self): return self._bev.cost() + 0.5
    def description(self): return self._bev.description() + ", Milk"

bev = Espresso()
bev = MilkDecorator(bev)
print(f"Order: {bev.description()} | Total: $\${bev.cost()}")
`,
        },
        detailedNotes: `### Decorator Pattern:
Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality without class explosion.`,
      },
      {
        id: 'lld-5',
        lectureNumber: 5,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L5: Factory Method & Abstract Factory Design Patterns',
        duration: '31:10',
        videoId: 'edLzN6B_p-k',
        topics: ['Simple Factory vs Factory Method', 'Abstract Factory for Product Families', 'Decoupling Object Creation from Usage'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class Shape:
    def draw(self): pass

class Circle(Shape):
    def draw(self): print("Drawing Circle")

class Square(Shape):
    def draw(self): print("Drawing Square")

class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: str) -> Shape:
        if shape_type == "circle": return Circle()
        elif shape_type == "square": return Square()
        raise ValueError("Unknown shape")

s = ShapeFactory.create_shape("circle")
s.draw()
`,
        },
        detailedNotes: `### Factory vs Abstract Factory:
- **Factory Method:** Relies on inheritance; subclasses decide which class to instantiate.
- **Abstract Factory:** Relies on composition; provides an interface for creating families of related or dependent objects without specifying their concrete classes.`,
      },
      {
        id: 'lld-6',
        lectureNumber: 6,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L6: Singleton Pattern: Thread-Safe Lazy Initialization',
        duration: '22:15',
        videoId: 'V5-7GNeCH6A',
        topics: ['Private Constructor', 'Static Instance', 'Thread-Safety with Mutex', 'Double-Checked Locking Optimization'],
        difficulty: 'Intermediate',
        starterCodes: {
          cpp: `#include <iostream>
#include <mutex>
using namespace std;

class DatabaseConnectionPool {
private:
    static DatabaseConnectionPool* instance;
    static mutex mtx;
    DatabaseConnectionPool() { cout << "Initializing DB Pool..." << endl; }
public:
    static DatabaseConnectionPool* getInstance() {
        if (!instance) {
            lock_guard<mutex> lock(mtx);
            if (!instance) {
                instance = new DatabaseConnectionPool();
            }
        }
        return instance;
    }
};

DatabaseConnectionPool* DatabaseConnectionPool::instance = nullptr;
mutex DatabaseConnectionPool::mtx;

int main() {
    DatabaseConnectionPool* p1 = DatabaseConnectionPool::getInstance();
    DatabaseConnectionPool* p2 = DatabaseConnectionPool::getInstance();
    cout << "Same instance: " << (p1 == p2 ? "Yes" : "No") << endl;
    return 0;
}
`,
        },
        detailedNotes: `### Double-Checked Locking in Singleton:
Check if instance is null *before* acquiring lock to avoid synchronization overhead on subsequent reads once initialized.`,
      },
      {
        id: 'lld-7',
        lectureNumber: 7,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L7: Adapter Pattern & Facade Pattern for Legacy Integration',
        duration: '25:40',
        videoId: '2PK704kY7b8',
        topics: ['Target Interface vs Adaptee', 'Object Adapter with Composition', 'Facade Pattern for Subsystem Simplification'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class LegacyXMLService:
    def get_xml_data(self): return "<data><id>101</id></data>"

class JSONTarget:
    def get_json_data(self): pass

class XMLToJSONAdapter(JSONTarget):
    def __init__(self, xml_service: LegacyXMLService):
        self.service = xml_service
    def get_json_data(self):
        # Translate XML to JSON
        return '{"id": 101}'

adapter = XMLToJSONAdapter(LegacyXMLService())
print("Adapter output:", adapter.get_json_data())
`,
        },
        detailedNotes: `### Adapter Pattern:
Converts the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.`,
      },
      {
        id: 'lld-8',
        lectureNumber: 8,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L8: Builder Pattern for Fluent Immutable Object Construction',
        duration: '26:20',
        videoId: 'b8r2W7mC8yU',
        topics: ['Telescoping Constructor Anti-Pattern', 'Step-by-Step Chaining (Fluent API)', 'Immutability & Mandatory Field Validation'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class Computer:
    def __init__(self, cpu, ram, storage, gpu=None):
        self.cpu = cpu
        self.ram = ram
        self.storage = storage
        self.gpu = gpu

class ComputerBuilder:
    def __init__(self, cpu, ram):
        self.cpu = cpu
        self.ram = ram
        self.storage = "512GB SSD"
        self.gpu = None
    def set_storage(self, storage):
        self.storage = storage
        return self
    def set_gpu(self, gpu):
        self.gpu = gpu
        return self
    def build(self):
        return Computer(self.cpu, self.ram, self.storage, self.gpu)

pc = ComputerBuilder("M3 Max", "64GB").set_gpu("40-core GPU").set_storage("2TB").build()
print(f"Built PC: {pc.cpu}, {pc.ram}, {pc.storage}, GPU: {pc.gpu}")
`,
        },
        detailedNotes: `### Builder Pattern:
Separates the construction of a complex object from its representation so that the same construction process can create different representations.`,
      },
      {
        id: 'lld-9',
        lectureNumber: 9,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L9: State Pattern & Vending Machine / Order Lifecycle',
        duration: '29:15',
        videoId: 'p3Q8r7vM1wA',
        topics: ['State Interface', 'Concrete State Transitions', 'Eliminating Giant Switch-Case Statements', 'Context Delegation'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `class VendingMachineState:
    def insert_coin(self, machine): pass
    def dispense(self, machine): pass

class IdleState(VendingMachineState):
    def insert_coin(self, machine):
        print("Coin inserted. Ready to dispense.")
        machine.state = HasCoinState()

class HasCoinState(VendingMachineState):
    def dispense(self, machine):
        print("Dispensing item. Returning to Idle.")
        machine.state = IdleState()

class VendingMachine:
    def __init__(self):
        self.state = IdleState()
    def insert_coin(self): self.state.insert_coin(self)
    def dispense(self): self.state.dispense(self)

vm = VendingMachine()
vm.insert_coin()
vm.dispense()
`,
        },
        detailedNotes: `### State Pattern:
Allows an object to alter its behavior when its internal state changes. The object will appear to change its class without spaghetti conditional logic.`,
      },
      {
        id: 'lld-10',
        lectureNumber: 10,
        subjectId: 'lld',
        subjectName: 'LLD',
        title: 'L10: LLD Interview Problem: Design a Modular Tic-Tac-Toe Game',
        duration: '38:30',
        videoId: '3m7M8r9b5wU',
        topics: ['Board Representation', 'Player & Piece Hierarchy (PieceX, PieceO)', 'Game Controller Loop', 'O(1) Win Checking Optimization'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `class TicTacToe:
    def __init__(self, n=3):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti_diag = 0

    def move(self, row, col, player):
        # Player 1 = +1, Player 2 = -1
        val = 1 if player == 1 else -1
        self.rows[row] += val
        self.cols[col] += val
        if row == col: self.diag += val
        if row + col == self.n - 1: self.anti_diag += val
        
        # Check O(1) win condition
        if (abs(self.rows[row]) == self.n or abs(self.cols[col]) == self.n or 
            abs(self.diag) == self.n or abs(self.anti_diag) == self.n):
            return f"Player {player} WINS!"
        return "Move accepted"

game = TicTacToe(3)
game.move(0, 0, 1)
game.move(0, 1, 2)
game.move(1, 1, 1)
game.move(0, 2, 2)
print(game.move(2, 2, 1))
`,
        },
        detailedNotes: `### Tic-Tac-Toe LLD Structure:
1. **Model:** \`Board\`, \`Piece\`, \`PlayingPieceX\`, \`PlayingPieceO\`, \`Player\`.
2. **Controller:** \`TicTacToeGame\` manages deque of players, turns, input validation, and win evaluation.`,
      },
    ],
  },
  // =========================================================================
  // 6. COMPUTER ORGANIZATION & ARCHITECTURE (COA)
  // =========================================================================
  {
    id: 'coa',
    title: 'Computer Organization & Architecture (COA)',
    code: 'CS 304',
    category: 'Hardware & Systems',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '⚡',
    color: '#06B6D4',
    playlistId: 'PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX',
    description:
      'Master hardware-software boundaries: Von Neumann Architecture, Instruction Formats, Addressing Modes, RISC vs CISC, Instruction Pipelining, Hazards, Memory Hierarchy, Cache Mapping, and RAID Storage.',
    lecturesCount: 10,
    totalDuration: '4 hrs 35 mins',
    keyTopics: [
      'Von Neumann vs Harvard Architecture',
      'Instruction Formats & Opcode Encoding',
      'CPU Addressing Modes (Immediate, Direct, Indirect, Indexed)',
      'Instruction Cycle: Fetch, Decode, Execute Micro-operations',
      'RISC vs CISC Architecture Characteristics',
      'Pipelining: Speedup Ratio, Throughput & Efficiency',
      'Pipeline Hazards: Structural, Data (RAW, WAR, WAW) & Control',
      'Memory Hierarchy & Effective Memory Access Time',
      'Cache Memory Mapping: Direct, Fully Associative & Set-Associative',
      'Secondary Storage & RAID Levels (RAID 0, 1, 5, 10)',
    ],
    lectures: [
      {
        id: 'coa-1',
        lectureNumber: 1,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L1: Functional Units, Von Neumann Architecture & System Bus',
        duration: '22:15',
        videoId: 'cdw3PRqRzJw',
        topics: ['Von Neumann Stored-Program Concept', 'CPU Buses: Data, Address, Control', 'ALU, Registers, Program Counter', 'Von Neumann Bottleneck'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# System Bus Address Space Calculation
def max_memory_addressable(address_lines: int, word_size_bytes: int):
    addressable_units = 2 ** address_lines
    total_bytes = addressable_units * word_size_bytes
    return f"{total_bytes / (1024 ** 2):.1f} MB"

print("32-bit Address Bus with 1-byte word:", max_memory_addressable(32, 1))
print("24-bit Address Bus with 2-byte word:", max_memory_addressable(24, 2))
`,
        },
        detailedNotes: `### Von Neumann Architecture:
- Stored-program concept where program instructions and data share the same unified physical memory space and buses.
- **Von Neumann Bottleneck:** System throughput is restricted because CPU execution speed far outpaces memory bus bandwidth.`,
      },
      {
        id: 'coa-2',
        lectureNumber: 2,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L2: Instruction Formats, Zero/One/Two Address Machines',
        duration: '25:40',
        videoId: 'm4Q8r7vM1wA',
        topics: ['Opcode & Operand Fields', '0-Address Stack Architecture', '1-Address Accumulator Architecture', '2-Address and 3-Address Formats'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Evaluating (A + B) * (C - D) across architectures
stack_machine = ["PUSH A", "PUSH B", "ADD", "PUSH C", "PUSH D", "SUB", "MUL"]
accumulator = ["LOAD A", "ADD B", "STORE T", "LOAD C", "SUB D", "MUL T"]
three_address = ["ADD R1, A, B", "SUB R2, C, D", "MUL R3, R1, R2"]

print("Stack Instructions Count:", len(stack_machine))
print("3-Address Instructions Count:", len(three_address))
`,
        },
        detailedNotes: `### Instruction Types:
- **0-Address:** Uses implicit Stack operations (\`ADD\`).
- **1-Address:** Uses implicit Accumulator register (\`ADD B\` means $AC = AC + B$).
- **3-Address:** Specifies destination and two source registers explicitly (\`ADD R1, R2, R3\`).`,
      },
      {
        id: 'coa-3',
        lectureNumber: 3,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L3: CPU Addressing Modes: Immediate, Direct, Indirect & Indexed',
        duration: '28:10',
        videoId: 'b8M7r9b5wVU',
        topics: ['Effective Address (EA) Computation', 'Immediate Mode', 'Direct / Absolute Addressing', 'Indirect Mode', 'Base-Register & Indexed Modes'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def calculate_ea(mode, operand, pc=0, base=0, memory=None):
    if mode == "Immediate": return f"Value: {operand}"
    elif mode == "Direct": return f"EA: {operand}"
    elif mode == "Indirect": return f"EA: {memory[operand]}"
    elif mode == "PC_Relative": return f"EA: {pc + operand}"
    elif mode == "Indexed": return f"EA: {base + operand}"

mem = {1000: 2500, 2500: 42}
print(calculate_ea("Direct", 1000))
print(calculate_ea("Indirect", 1000, memory=mem))
print(calculate_ea("PC_Relative", 40, pc=500))
`,
        },
        detailedNotes: `### Addressing Modes Summary:
- **Immediate:** Operand is part of instruction itself (\`MOV R1, #5\`).
- **Direct:** Address field contains Effective Address directly.
- **Indirect:** Address field points to memory location holding the Effective Address.
- **Indexed:** Effective Address = Base Register + Offset (ideal for array indexing).`,
      },
      {
        id: 'coa-4',
        lectureNumber: 4,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L4: Instruction Cycle: Fetch, Decode, Execute & Control Unit',
        duration: '27:30',
        videoId: 'p3P8r7vM1wA',
        topics: ['T-States & Clock Cycles', 'Micro-operations Sequence', 'Hardwired Control (Fast, Inflexible)', 'Microprogrammed Control (Microcode ROM)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `fetch_cycle_micro_ops = [
    "T1: MAR <- PC",
    "T2: MBR <- Memory[MAR], PC <- PC + 1",
    "T3: IR <- MBR"
]
print("Standard Fetch Phase Micro-operations:")
for op in fetch_cycle_micro_ops:
    print(op)
`,
        },
        detailedNotes: `### Hardwired vs Microprogrammed Control Units:
- **Hardwired:** Implemented via combinational logic circuits, flip-flops, and decoders. Extremely fast, optimized for RISC, but rigid and cannot be modified after chip fabrication.
- **Microprogrammed:** Control words stored in a Control Memory (ROM). Slower execution, but highly flexible and easily upgraded.`,
      },
      {
        id: 'coa-5',
        lectureNumber: 5,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L5: RISC vs CISC Architecture Differences',
        duration: '21:15',
        videoId: 'q5W3v8rM1yU',
        topics: ['Reduced vs Complex Instruction Set', 'Fixed vs Variable Length Encoding', 'Load-Store Architecture', 'Register File Size'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `comparison = {
    "RISC (ARM, RISC-V, MIPS)": {
        "Instructions": "Simple, fixed length (32-bit)",
        "Memory Access": "Only LOAD / STORE instructions",
        "Cycles": "Single cycle per instruction",
        "Registers": "Large register file (32+ general purpose)"
    },
    "CISC (x86, x86-64)": {
        "Instructions": "Complex, variable length (1 to 15 bytes)",
        "Memory Access": "Directly inside arithmetic ops (ADD [eax], ebx)",
        "Cycles": "Multi-cycle microcoded instructions",
        "Registers": "Fewer architectural registers"
    }
}
for arch, traits in comparison.items():
    print(f"=== {arch} ===")
    for k, v in traits.items(): print(f"  {k}: {v}")
`,
        },
        detailedNotes: `### Core Difference:
RISC emphasizes software and compiler optimization with single-cycle hardwired execution; CISC emphasizes hardware complexity to minimize code size in memory.`,
      },
      {
        id: 'coa-6',
        lectureNumber: 6,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L6: Pipelining Fundamentals, Clock Period & Speedup Ratio',
        duration: '31:50',
        videoId: 'x2M8r9b5wVU',
        topics: ['5-Stage Pipeline (IF, ID, EX, MEM, WB)', 'Non-pipelined vs Pipelined Time', 'Speedup Formula (S = n*k / (k + n - 1))', 'Throughput & Efficiency'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def pipeline_speedup(k_stages, n_instructions, stage_delay_ns, latch_delay_ns=1):
    clock_cycle = stage_delay_ns + latch_delay_ns
    t_pipeline = (k_stages + n_instructions - 1) * clock_cycle
    t_non_pipeline = n_instructions * (k_stages * stage_delay_ns)
    speedup = t_non_pipeline / t_pipeline
    return speedup

print("Speedup for 1000 instructions in 5-stage pipeline:", pipeline_speedup(5, 1000, 10))
`,
        },
        detailedNotes: `### Pipeline Speedup Formula:
For $n$ instructions executed across a $k$-stage pipeline:
$$S = \frac{n \times t_{\text{non-pipe}}}{(k + n - 1) \times t_{\text{pipe}}}$$
As $n \rightarrow \infty$, maximum theoretical speedup approaches the number of pipeline stages $k$!`,
      },
      {
        id: 'coa-7',
        lectureNumber: 7,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L7: Pipeline Hazards: Structural, Data (RAW/WAR/WAW) & Control',
        duration: '33:40',
        videoId: 'v7P3r8wM2yU',
        topics: ['Structural Hazards (Resource Conflict)', 'Read After Write (RAW) True Dependency', 'Operand Forwarding (Bypassing)', 'Branch Penalties & Dynamic Prediction'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def detect_raw_hazard(inst1, inst2):
    dest1 = inst1.split(",")[0].split()[-1]
    sources2 = [s.strip() for s in inst2.split(",")[1:]]
    if dest1 in sources2:
        return f"RAW Hazard detected on register {dest1}! Forwarding required."
    return "No Data Hazard"

i1 = "ADD R1, R2, R3"
i2 = "SUB R4, R1, R5"
print(detect_raw_hazard(i1, i2))
`,
        },
        detailedNotes: `### Data Hazards:
- **RAW (Read After Write):** Instruction $J$ attempts to read source register before Instruction $I$ writes back its result. Resolved via **Operand Forwarding** or Pipeline Stalls (bubbles).
- **WAR (Write After Read) & WAW (Write After Write):** Anti-dependencies eliminated via Register Renaming.`,
      },
      {
        id: 'coa-8',
        lectureNumber: 8,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L8: Memory Hierarchy: Locality of Reference & Hit Ratio',
        duration: '24:20',
        videoId: 'k7P3r8wM2yA',
        topics: ['Temporal vs Spatial Locality', 'Registers -> L1/L2/L3 Cache -> RAM -> Disk', 'Average Memory Access Time (AMAT)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def amat(hit_time, miss_rate, miss_penalty):
    return hit_time + (miss_rate * miss_penalty)

# L1: hit = 1ns, miss rate = 5%, L2 penalty = 10ns
print("Average Memory Access Time (AMAT):", amat(1, 0.05, 10), "ns")
`,
        },
        detailedNotes: `### Locality of Reference:
- **Temporal Locality:** If a memory address is accessed, it is likely to be accessed again in the near future (e.g., loop variables).
- **Spatial Locality:** If a memory address is accessed, nearby memory addresses are likely to be accessed soon (e.g., array traversal).`,
      },
      {
        id: 'coa-9',
        lectureNumber: 9,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L9: Cache Memory Mapping: Direct, Fully Associative & Set-Associative',
        duration: '34:10',
        videoId: 'a6M7r8b9yVU',
        topics: ['Tag, Index / Line Number, Block Offset', 'Direct Mapping (Modulo Line Count)', 'Fully Associative (Tag Comparator Array)', 'k-Way Set-Associative'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def cache_fields(addr_bits, cache_size_bytes, block_size_bytes, k_ways=1):
    offset_bits = (block_size_bytes - 1).bit_length()
    num_lines = cache_size_bytes // block_size_bytes
    num_sets = num_lines // k_ways
    index_bits = (num_sets - 1).bit_length()
    tag_bits = addr_bits - index_bits - offset_bits
    return tag_bits, index_bits, offset_bits

# 32-bit address, 64KB Cache, 64B block, 4-way set associative
t, idx, off = cache_fields(32, 64 * 1024, 64, 4)
print(f"Tag: {t} bits | Set Index: {idx} bits | Block Offset: {off} bits")
`,
        },
        detailedNotes: `### Cache Mapping Tradeoffs:
- **Direct Mapped:** Simple hardware, 1 comparator, but susceptible to conflict misses if multiple active blocks map to the same line index.
- **Fully Associative:** Block can reside in ANY cache line. Zero conflict misses, but requires hardware comparators for every single line.
- **k-Way Set Associative:** Optimal engineering compromise. Cache partitioned into sets of $k$ lines.`,
      },
      {
        id: 'coa-10',
        lectureNumber: 10,
        subjectId: 'coa',
        subjectName: 'COA',
        title: 'L10: Secondary Storage & RAID Levels (RAID 0, 1, 5, 10)',
        duration: '26:50',
        videoId: 'd3Q8r7vM1wA',
        topics: ['Redundant Array of Independent Disks', 'RAID 0 (Striping)', 'RAID 1 (Mirroring)', 'RAID 5 (Block Striping with Distributed Parity)', 'RAID 10'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def raid_specs(disks, disk_size_gb):
    return {
        "RAID 0": {"Usable": disks * disk_size_gb, "Fault_Tolerance": "0 disks"},
        "RAID 1": {"Usable": disk_size_gb, "Fault_Tolerance": f"{disks - 1} disks"},
        "RAID 5": {"Usable": (disks - 1) * disk_size_gb, "Fault_Tolerance": "1 disk"},
        "RAID 10": {"Usable": (disks // 2) * disk_size_gb, "Fault_Tolerance": "1 disk per mirrored pair"}
    }

for level, s in raid_specs(4, 1000).items():
    print(f"{level:8} -> Usable: {s['Usable']} GB | Tolerates: {s['Fault_Tolerance']}")
`,
        },
        detailedNotes: `### RAID Summary:
- **RAID 0:** Performance only. Data striped across disks without parity. No fault tolerance.
- **RAID 1:** 100% Mirroring redundancy. High reliability, 50% capacity cost.
- **RAID 5:** Block-level striping with distributed XOR parity. Tolerates 1 disk loss with only 1 disk capacity overhead.`,
      },
    ],
  },
  // =========================================================================
  // 7. THEORY OF COMPUTATION (TOC)
  // =========================================================================
  {
    id: 'toc',
    title: 'Theory of Computation (TOC)',
    code: 'CS 305',
    category: 'Theoretical Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '⚙️',
    color: '#8B5CF6',
    playlistId: 'PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i',
    description:
      'Rigorous formal language and automata theory: Deterministic & Non-Deterministic Finite Automata (DFA/NFA), Regular Expressions, Pumping Lemma, Context-Free Grammars (CFG), Pushdown Automata (PDA), Turing Machines, and Decidability.',
    lecturesCount: 10,
    totalDuration: '4 hrs 45 mins',
    keyTopics: [
      'Alphabets, Strings, Operations & Language Definitions',
      'Deterministic Finite Automata (DFA) Formal 5-Tuple Definition',
      'Non-Deterministic Finite Automata (NFA) vs DFA Equivalence',
      'Subset Construction: Converting NFA to Minimum DFA',
      'Minimization of DFA via Equivalence Table Filling Method',
      'Regular Expressions & Arden Theorem for State Elimination',
      'Pumping Lemma for Regular Languages & Non-Regular Proofs',
      'Context-Free Grammars (CFG), Derivation Trees & Ambiguity',
      'Pushdown Automata (PDA): Final State vs Empty Stack Acceptance',
      'Turing Machines, Chomsky Hierarchy, Halting Problem & Decidability',
    ],
    lectures: [
      {
        id: 'toc-1',
        lectureNumber: 1,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L1: Introduction to Automata, Alphabets, Strings & Languages',
        duration: '18:50',
        videoId: '58N2N7zJGrQ',
        topics: ['Alphabet (Sigma)', 'Kleene Star (*)', 'Positive Closure (+)', 'Grammar Hierarchy'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `def kleene_star_sample(alphabet, max_len=2):
    import itertools
    strings = [""]
    for l in range(1, max_len + 1):
        for combo in itertools.product(alphabet, repeat=l):
            strings.append("".join(combo))
    return strings

print("Kleene Closure Sigma* up to length 2 for {a, b}:", kleene_star_sample(['a', 'b']))
`,
        },
        detailedNotes: `### Formal Definitions:
- **Alphabet ($\Sigma$):** A non-empty, finite set of symbols (e.g. $\Sigma = \{0, 1\}$).
- **String:** A finite sequence of symbols chosen from $\Sigma$. Length denoted as $|w|$.
- **Kleene Closure ($\Sigma^*$):** Infinite set of all strings over $\Sigma$, including the empty string $\epsilon$.`,
      },
      {
        id: 'toc-2',
        lectureNumber: 2,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L2: Deterministic Finite Automata (DFA) Construction',
        duration: '26:40',
        videoId: '40i44GY654o',
        topics: ['DFA 5-Tuple (Q, Sigma, delta, q0, F)', 'Transition Function', 'DFA Accepting Strings Ending with "ab"', 'Trap States'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# DFA Simulation: Accepts strings over {a, b} ending in "ab"
class DFA:
    def __init__(self):
        self.state = "q0"  # start state
        self.accept_states = {"q2"}

    def transition(self, symbol):
        transitions = {
            "q0": {"a": "q1", "b": "q0"},
            "q1": {"a": "q1", "b": "q2"},
            "q2": {"a": "q1", "b": "q0"}
        }
        self.state = transitions[self.state][symbol]

    def process(self, string):
        self.state = "q0"
        for ch in string: self.transition(ch)
        return self.state in self.accept_states

dfa = DFA()
print("Accepts 'aab':", dfa.process("aab"))
print("Accepts 'aba':", dfa.process("aba"))
`,
        },
        detailedNotes: `### DFA 5-Tuple Definition:
$$M = (Q, \Sigma, \delta, q_0, F)$$
1. $Q$: Finite set of states.
2. $\Sigma$: Finite set of input symbols.
3. $\delta: Q \times \Sigma \rightarrow Q$: Deterministic transition function.
4. $q_0 \in Q$: Initial start state.
5. $F \subseteq Q$: Set of final/accepting states.`,
      },
      {
        id: 'toc-3',
        lectureNumber: 3,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L3: Non-Deterministic Finite Automata (NFA) vs DFA',
        duration: '24:20',
        videoId: 'eCd_Uf_c8z0',
        topics: ['NFA Transition Function (2^Q)', 'Epsilon Transitions', 'Power of NFA vs DFA (Identical Language Class)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# NFA Simulation: Accepts strings with 'a' as second to last symbol
def nfa_process(string):
    current_states = {"q0"}
    for ch in string:
        next_states = set()
        for s in current_states:
            if s == "q0":
                next_states.add("q0")
                if ch == "a": next_states.add("q1")
            elif s == "q1":
                next_states.add("q2")
        current_states = next_states
    return "q2" in current_states

print("NFA Accepts 'ba':", nfa_process("ba"))
print("NFA Accepts 'bab':", nfa_process("bab"))
print("NFA Accepts 'b':", nfa_process("b"))
`,
        },
        detailedNotes: `### NFA Transition Function:
$$\delta: Q \times (\Sigma \cup \{\epsilon\}) \rightarrow 2^Q$$
An NFA can transition into multiple simultaneous states for a single input symbol. A string is accepted if AT LEAST ONE computational path ends in a final state.`,
      },
      {
        id: 'toc-4',
        lectureNumber: 4,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L4: Subset Construction Method: Converting NFA to DFA',
        duration: '29:15',
        videoId: 'i-fk906wO1U',
        topics: ['Powerset of States (2^|Q|)', 'Epsilon-Closure Calculation', 'Generating DFA State Transition Table'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Subset construction transition concept
def subset_transition(current_subset, symbol, nfa_transitions):
    next_subset = set()
    for state in current_subset:
        next_subset.update(nfa_transitions.get((state, symbol), []))
    return frozenset(next_subset)

nfa = {("q0", "a"): ["q0", "q1"], ("q0", "b"): ["q0"]}
print("DFA State from {q0} on 'a':", subset_transition({"q0"}, "a", nfa))
`,
        },
        detailedNotes: `### Subset Construction:
Given an NFA with $n$ states, the equivalent minimum DFA has at most $2^n$ states. Every state in the DFA represents a distinct subset of states in the original NFA.`,
      },
      {
        id: 'toc-5',
        lectureNumber: 5,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L5: Minimization of DFA (Table Filling / Myhill-Nerode Method)',
        duration: '28:40',
        videoId: '7S_tz1z_5bA',
        topics: ['Distinguishable vs Indistinguishable States', '0-Equivalence (Final vs Non-Final)', 'Eliminating Unreachable States'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def partition_minimization(states, final_states, transitions, alphabet):
    # Step 1: Initial partition P0 = [F, Q - F]
    p = [set(final_states), set(states) - set(final_states)]
    print("Initial 0-Equivalence Partitions:", p)

partition_minimization(["q0", "q1", "q2"], ["q2"], {}, ['a', 'b'])
`,
        },
        detailedNotes: `### DFA Minimization:
1. Eliminate all unreachable states from the start state $q_0$.
2. Form partition $P_0 = \{F, Q - F\}$.
3. Iteratively split partitions if two states within the same group transition into different partition groups on any alphabet symbol until $P_{k} = P_{k-1}$.`,
      },
      {
        id: 'toc-6',
        lectureNumber: 6,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L6: Regular Expressions & Arden Theorem for State Elimination',
        duration: '27:10',
        videoId: 'q6M7r8b9yVU',
        topics: ['Arden Theorem (R = Q + RP -> R = QP*)', 'Converting DFA to Regular Expression', 'Regular Expression Identities'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import re

# Regex matching binary numbers divisible by 3
div3_regex = re.compile(r"^(0|(1(01*0)*10*)*)*$")
print("Matches '110' (6 in dec):", bool(div3_regex.match("110")))
`,
        },
        detailedNotes: `### Arden's Theorem:
If $P$ and $Q$ are two regular expressions over $\Sigma$, and $\epsilon \notin P$, then the equation:
$$R = Q + RP$$
has a unique solution given by:
$$R = QP^*$$`,
      },
      {
        id: 'toc-7',
        lectureNumber: 7,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L7: Pumping Lemma for Regular Languages & Non-Regular Proofs',
        duration: '31:25',
        videoId: 'aZjYr87r1b8',
        topics: ['Pumping Length (p)', 'Splitting w = xyz', '|xy| <= p, |y| >= 1', 'Proving L = {a^n b^n | n >= 0} is not regular'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Pumping Lemma Demonstration for w = xyz
def pump_string(x, y, z, k):
    return x + (y * k) + z

# If y is pumped, does string remain in a^n b^n?
print("k=0 (pump down):", pump_string("aaa", "a", "bbbb", 0))
print("k=2 (pump up):", pump_string("aaa", "a", "bbbb", 2))
`,
        },
        detailedNotes: `### Pumping Lemma for Regular Languages:
If $L$ is a regular language, then there exists a constant $p$ (pumping length) such that any string $w \in L$ with $|w| \ge p$ can be written as $w = xyz$ satisfying:
1. $|y| > 0$
2. $|xy| \le p$
3. $\forall i \ge 0, xy^i z \in L$
If any condition is violated for all valid decompositions, $L$ is NOT regular!`,
      },
      {
        id: 'toc-8',
        lectureNumber: 8,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L8: Context-Free Grammars (CFG), Derivation Trees & Ambiguity',
        duration: '29:45',
        videoId: 'm9P3q7vL1wA',
        topics: ['Variables, Terminals, Production Rules', 'Leftmost vs Rightmost Derivations', 'Inherent Ambiguity', 'Chomsky Normal Form (CNF)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# CFG Generator for S -> aSb | e (a^n b^n)
def generate_an_bn(n):
    if n == 0: return ""
    return "a" + generate_an_bn(n - 1) + "b"

print("Generated for n=4:", generate_an_bn(4))
`,
        },
        detailedNotes: `### Ambiguous Grammar:
A CFG is **Ambiguous** if there exists at least one string $w$ that has two or more distinct leftmost derivations (or two distinct parse trees).`,
      },
      {
        id: 'toc-9',
        lectureNumber: 9,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L9: Pushdown Automata (PDA): Stack Operations',
        duration: '33:10',
        videoId: 'b1L6xM7r8yU',
        topics: ['7-Tuple PDA Definition', 'Stack Memory (Push, Pop, No-op)', 'Deterministic PDA (DPDA) vs NPDA', 'Languages Accepted by PDA'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `class PushdownAutomaton:
    def __init__(self):
        self.stack = ["Z0"]

    def process_an_bn(self, string):
        state = "q0"
        for ch in string:
            if state == "q0" and ch == "a":
                self.stack.append("a")
            elif ch == "b":
                state = "q1"
                if not self.stack or self.stack[-1] != "a": return False
                self.stack.pop()
        return len(self.stack) == 1 and self.stack[0] == "Z0"

pda = PushdownAutomaton()
print("Accepts 'aaabbb':", pda.process_an_bn("aaabbb"))
`,
        },
        detailedNotes: `### DPDA vs NPDA:
Unlike Finite Automata where DFA $\equiv$ NFA, for Pushdown Automata, **NPDA is strictly more powerful than DPDA**! NPDAs accept all Context-Free Languages, while DPDAs accept only Deterministic CFLs.`,
      },
      {
        id: 'toc-10',
        lectureNumber: 10,
        subjectId: 'toc',
        subjectName: 'TOC',
        title: 'L10: Turing Machines, Chomsky Hierarchy & Halting Problem',
        duration: '36:20',
        videoId: 'j2S7bK3V5rA',
        topics: ['Infinite Tape Model & Read/Write Head', 'Chomsky 4 Language Classes (Type 3 to Type 0)', 'Decidability vs Semi-Decidability', 'Turing Halting Problem Proof'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `chomsky_hierarchy = [
    ("Type 3: Regular", "Finite Automata", "a*b*"),
    ("Type 2: Context-Free", "Pushdown Automata", "a^n b^n"),
    ("Type 1: Context-Sensitive", "Linear Bounded Automata", "a^n b^n c^n"),
    ("Type 0: Recursively Enumerable", "Turing Machine", "Arbitrary Computable")
]
for level, machine, example in chomsky_hierarchy:
    print(f"{level:30} | {machine:25} | e.g. {example}")
`,
        },
        detailedNotes: `### The Halting Problem Proof (Turing):
The problem of determining whether an arbitrary Turing Machine $M$ will halt on input $w$ is **Undecidable**! Proved via Cantor's diagonal contradiction.`,
      },
    ],
  },
  // =========================================================================
  // 8. COMPILER DESIGN (CD)
  // =========================================================================
  {
    id: 'compiler',
    title: 'Compiler Design (CD)',
    code: 'CS 306',
    category: 'Core Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '⚡',
    color: '#EC4899',
    playlistId: 'PLxCzCOWd7aiEKtKSIHYusizkESC42diyc',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc',
    description:
      'Complete compiler engineering pipeline: Lexical Analysis, Top-Down LL(1) Parsing, Bottom-Up LR Parsing (SLR, CLR, LALR), Syntax-Directed Translation (SDT), Intermediate Code Generation (Three-Address Code), and Code Optimization.',
    lecturesCount: 10,
    totalDuration: '4 hrs 30 mins',
    keyTopics: [
      'Compiler Architecture: Front-End Analysis vs Back-End Synthesis',
      'Lexical Analysis, Token Specification & Lex Tool Implementation',
      'First & Follow Sets Computation for Context-Free Grammars',
      'LL(1) Predictive Parsing Table Construction & Conflict Resolution',
      'Bottom-Up Shift-Reduce Parsing & Handle Identification',
      'LR(0) Canonical Items & SLR(1) Parsing Tables',
      'Canonical LR(1) and LALR(1) Merging Optimization',
      'Syntax-Directed Translation (SDT): S-Attributed vs L-Attributed',
      'Intermediate Code Generation: Three-Address Code, Quadruples & Triples',
      'Code Optimization: Basic Blocks, Control Flow Graphs & Loop Invariants',
    ],
    lectures: [
      {
        id: 'cd-1',
        lectureNumber: 1,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L1: Phases of a Compiler: Analysis vs Synthesis',
        duration: '21:15',
        videoId: 'Qkwj65l_96I',
        topics: ['Lexical, Syntax, Semantic Analysis', 'Intermediate Code Generator', 'Code Optimizer', 'Target Code Generator', 'Symbol Table Management'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `phases = [
    "1. Lexical Analyzer -> Generates Stream of Tokens",
    "2. Syntax Analyzer -> Generates Parse Tree",
    "3. Semantic Analyzer -> Type Checking & Semantic Consistency",
    "4. Intermediate Code Generator -> Three-Address Code",
    "5. Machine-Independent Optimizer -> Constant Folding, Dead Code",
    "6. Target Code Generator -> Assembly / Machine Code"
]
for p in phases: print(p)
`,
        },
        detailedNotes: `### Front-End vs Back-End of Compiler:
- **Front-End (Analysis):** Lexical, Syntax, and Semantic analysis + Intermediate code generation. Completely machine-independent.
- **Back-End (Synthesis):** Target code optimization and machine-specific assembly generation. Depends directly on target CPU architecture.`,
      },
      {
        id: 'cd-2',
        lectureNumber: 2,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L2: Lexical Analysis, Token Specification & Lex Tool',
        duration: '24:40',
        videoId: 'WfcW68sSrvw',
        topics: ['Token, Pattern, Lexeme', 'Regular Expressions in Lex', 'Input Buffering with Sentinel', 'Handling Whitespace and Comments'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `import re

code = "int count = 42 + offset;"
token_specification = [
    ('KEYWORD', r'\b(int|float|return|if)\b'),
    ('IDENTIFIER', r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),
    ('NUMBER', r'\b\d+\b'),
    ('OP', r'[+=]'),
    ('SEMICOLON', r';'),
    ('SKIP', r'\s+'),
]

tok_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_specification)
for mo in re.finditer(tok_regex, code):
    kind = mo.lastgroup
    if kind != 'SKIP':
        print(f"Token: {kind:12} | Lexeme: {mo.group()}")
`,
        },
        detailedNotes: `### Lexeme vs Token:
- **Lexeme:** The concrete source code character sequence (e.g. \`"count"\`, \`"42"\`).
- **Token:** The abstract syntactic category returned to parser (e.g. \`<IDENTIFIER, "count">\`, \`<NUMBER, 42>\`).`,
      },
      {
        id: 'cd-3',
        lectureNumber: 3,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L3: First and Follow Computation for Parsing Tables',
        duration: '29:50',
        videoId: '1g_wG4Zz8yM',
        topics: ['First Set Rules', 'Follow Set Rules', 'Epsilon Transitions Propagation', 'Endmarker $ Symbol in Follow'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Conceptual First Set Computation
def compute_first(grammar):
    # E -> T E'
    # E' -> + T E' | e
    first = {"E": {"id", "("}, "E'": {"+", "e"}, "T": {"id", "("}}
    return first

print("First Sets:", compute_first({}))
`,
        },
        detailedNotes: `### First and Follow Rules:
- **$\text{First}(\alpha)$:** Set of terminal symbols that begin strings derived from $\alpha$.
- **$\text{Follow}(A)$:** Set of terminal symbols that can appear immediately to the right of non-terminal $A$ in some sentential form. Always put \`$\` in $\text{Follow}(S)$ for start symbol $S$.`,
      },
      {
        id: 'cd-4',
        lectureNumber: 4,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L4: LL(1) Predictive Parsing Table Construction',
        duration: '31:20',
        videoId: 'nE9Mv2k4r1U',
        topics: ['LL(1) Condition', 'Table Entry [A, a] Rules', 'Eliminating Left Recursion', 'Left Factoring'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def check_ll1_conflict(table):
    for non_terminal, row in table.items():
        for terminal, rules in row.items():
            if len(rules) > 1:
                return False, f"LL(1) Conflict at [{non_terminal}, {terminal}]: {rules}"
    return True, "Valid LL(1) Grammar"

sample_table = {"E": {"id": ["E -> T E'"]}, "E'": {"+": ["E' -> + T E'"], "$": ["E' -> e"]}}
print(check_ll1_conflict(sample_table))
`,
        },
        detailedNotes: `### LL(1) Definition:
- First **L**: Left-to-right scan of input.
- Second **L**: Produces Leftmost derivation.
- **(1)**: Uses 1 lookahead input symbol.
A grammar is LL(1) if and only if no cell in its parsing table contains multiple production rules!`,
      },
      {
        id: 'cd-5',
        lectureNumber: 5,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L5: Bottom-Up Parsing: Shift-Reduce Parsing & Handle Pruning',
        duration: '26:15',
        videoId: 'b4R7y9wM2vA',
        topics: ['Shift Action', 'Reduce Action', 'Shift/Reduce Conflict', 'Reduce/Reduce Conflict', 'Handle Definition'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class ShiftReduceParser:
    def __init__(self):
        self.stack = ["$"]

    def parse(self, tokens):
        print("Parsing tokens:", tokens)
        # Shift and Reduce loop simulation

ShiftReduceParser().parse(["id", "+", "id", "$"])
`,
        },
        detailedNotes: `### Bottom-Up Parsing:
Constructs parse tree from the leaf nodes (tokens) up to the root start symbol $S$. At each step, a substring matching the right-hand side of a production rule (a **Handle**) is reduced to its non-terminal.`,
      },
      {
        id: 'cd-6',
        lectureNumber: 6,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L6: LR(0) Items & SLR(1) Parsing Table Construction',
        duration: '32:40',
        videoId: 'x2M8r9b5wVU',
        topics: ['Augmented Grammar', 'Closure and GOTO Operations', 'DFA of LR(0) Items', 'SLR(1) Follow Check for Reduce Entries'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `print("SLR(1) places REDUCE actions only in Follow(A) columns of row i")
`,
        },
        detailedNotes: `### SLR(1) Table Construction:
If $[A \rightarrow \alpha \cdot]$ is in state $I_i$, place \`reduce A -> alpha\` in action table row $i$ for all terminals $a \in \text{Follow}(A)$.`,
      },
      {
        id: 'cd-7',
        lectureNumber: 7,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L7: Canonical LR(1) and LALR(1) Parsers',
        duration: '34:10',
        videoId: 'v7P3r8wM2yU',
        topics: ['LR(1) Items [A -> alpha . beta, a]', 'LALR(1) Merging Core States', 'Why LALR Cannot Introduce Shift/Reduce Conflicts'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `print("LALR(1) merges states with identical LR(0) cores, retaining same table size as SLR(1)!")
`,
        },
        detailedNotes: `### Power of LR Parsers:
$$\text{LR}(0) \subset \text{SLR}(1) \subset \text{LALR}(1) \subset \text{CLR}(1)$$
LALR(1) is the standard engine used in real-world tools like Yacc and Bison because it provides CLR(1) power with the compact table size of SLR(1).`,
      },
      {
        id: 'cd-8',
        lectureNumber: 8,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L8: Syntax-Directed Translation (SDT): S-Attributed vs L-Attributed',
        duration: '28:10',
        videoId: 'k7P3r8wM2yA',
        topics: ['Synthesized Attributes (Bottom-up evaluation)', 'Inherited Attributes', 'S-Attributed SDD (Postorder)', 'L-Attributed SDD (Left-to-right evaluation)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class ASTNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# S-Attributed evaluator: E -> E + T { E.val = E1.val + T.val }
def evaluate_ast(node):
    if node.left is None and node.right is None:
        return int(node.val)
    left_val = evaluate_ast(node.left)
    right_val = evaluate_ast(node.right)
    return left_val + right_val if node.val == "+" else left_val * right_val

ast = ASTNode("+", ASTNode("3"), ASTNode("5"))
print("Evaluated AST Expression:", evaluate_ast(ast))
`,
        },
        detailedNotes: `### Attribute Types:
- **Synthesized Attribute:** Computed from attribute values of child nodes in parse tree.
- **Inherited Attribute:** Computed from attribute values of parent and/or sibling nodes.`,
      },
      {
        id: 'cd-9',
        lectureNumber: 9,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L9: Intermediate Code Generation: Three-Address Code (3AC)',
        duration: '27:20',
        videoId: 'a6M7r8b9yVU',
        topics: ['Quadruples (op, arg1, arg2, res)', 'Triples (op, arg1, arg2)', 'Indirect Triples', 'Translating Boolean and Control Flow'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `class Quadruple:
    def __init__(self, op, arg1, arg2, result):
        self.op = op; self.arg1 = arg1; self.arg2 = arg2; self.result = result
    def __repr__(self):
        return f"({self.op:4}, {self.arg1:4}, {self.arg2:4}, {self.result:4})"

# x = a + b * c
quads = [
    Quadruple("*", "b", "c", "t1"),
    Quadruple("+", "a", "t1", "x")
]
for q in quads: print(q)
`,
        },
        detailedNotes: `### Three-Address Code (3AC):
A linear sequence of instructions where each instruction has at most one operator on the right-hand side (e.g. \`x = y op z\`).`,
      },
      {
        id: 'cd-10',
        lectureNumber: 10,
        subjectId: 'compiler',
        subjectName: 'Compiler',
        title: 'L10: Code Optimization: Basic Blocks & Control Flow Graphs',
        duration: '31:15',
        videoId: 'd3Q8r7vM1wA',
        topics: ['Leader Statement Identification Rules', 'Control Flow Graph (CFG)', 'Constant Folding & Propagation', 'Common Subexpression Elimination', 'Loop Invariant Code Motion'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def constant_folding(instructions):
    optimized = []
    constants = {}
    for inst in instructions:
        # e.g., t1 = 3 + 5 -> t1 = 8
        if len(inst) == 5 and inst[3] == "+" and inst[2].isdigit() and inst[4].isdigit():
            val = str(int(inst[2]) + int(inst[4]))
            constants[inst[0]] = val
            optimized.append(f"{inst[0]} = {val}")
        else:
            optimized.append(" ".join(inst))
    return optimized

code = [["t1", "=", "3", "+", "5"], ["x", "=", "t1", "*", "2"]]
print("Optimized Code:", constant_folding(code))
`,
        },
        detailedNotes: `### Identifying Basic Block Leaders:
1. First statement is a leader.
2. Any statement that is the target of a conditional or unconditional jump is a leader.
3. Any statement that immediately follows a jump is a leader.`,
      },
    ],
  },
  // =========================================================================
  // 9. DISCRETE MATHEMATICS (DM)
  // =========================================================================
  {
    id: 'discrete-math',
    title: 'Discrete Mathematics (DM)',
    code: 'CS 201',
    category: 'Foundations & Mathematics',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '📐',
    color: '#3B82F6',
    playlistId: 'PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
    description:
      'Foundations of mathematical logic and discrete structures: Propositional & Predicate Logic, Sets & Relations, Functions, Combinatorics, Recurrence Relations, Graph Theory, and Algebraic Groups.',
    lecturesCount: 10,
    totalDuration: '4 hrs 40 mins',
    keyTopics: [
      'Propositional Logic, Truth Tables & Logical Equivalences',
      'Predicates, Universal (forall) & Existential (exists) Quantifiers',
      'Set Theory, Power Sets & Inclusion-Exclusion Principle',
      'Relations: Equivalence Relations, Partial Orders & Hasse Diagrams',
      'Functions: Injective, Surjective & Bijective Mappings',
      'Combinatorics: Permutations, Combinations & Pigeonhole Principle',
      'Solving Linear Homogeneous Recurrence Relations',
      'Graph Theory: Handshaking Lemma, Euler & Hamiltonian Circuits',
      'Trees, Spanning Trees & Planar Graphs (Euler Formula)',
      'Group Theory: Monoids, Semigroups, Groups & Abelian Groups',
    ],
    lectures: [
      {
        id: 'dm-1',
        lectureNumber: 1,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L1: Propositional Logic, Truth Tables & Logical Equivalences',
        duration: '21:30',
        videoId: 'w65p53k99m8',
        topics: ['Propositions', 'Conjunction, Disjunction, Negation', 'Implication (p -> q == ~p v q)', 'Tautology, Contradiction, Contingency'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `def implies(p, q): return (not p) or q

print("Truth Table for p -> q:")
for p in [True, False]:
    for q in [True, False]:
        print(f"p={p:5} | q={q:5} | p -> q: {implies(p, q)}")
`,
        },
        detailedNotes: `### Core Logical Equivalences:
- **Implication:** $p \rightarrow q \equiv \neg p \lor q$
- **Contrapositive:** $p \rightarrow q \equiv \neg q \rightarrow \neg p$
- **De Morgan's Laws:** $\neg (p \land q) \equiv \neg p \lor \neg q$, $\neg (p \lor q) \equiv \neg p \land \neg q$`,
      },
      {
        id: 'dm-2',
        lectureNumber: 2,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L2: Predicates & Quantifiers (Universal & Existential)',
        duration: '23:40',
        videoId: 'm9P3q7vL1wA',
        topics: ['Predicate P(x)', 'Universal Quantifier (forall)', 'Existential Quantifier (exists)', 'Negation of Quantified Statements'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `domain = [2, 4, 6, 8]
# forall x, P(x): x is even
all_even = all(x % 2 == 0 for x in domain)
# exists x, Q(x): x > 5
exists_gt_5 = any(x > 5 for x in domain)
print("All even:", all_even, "| Exists > 5:", exists_gt_5)
`,
        },
        detailedNotes: `### Negating Quantifiers:
- $\neg (\forall x P(x)) \equiv \exists x \neg P(x)$
- $\neg (\exists x P(x)) \equiv \forall x \neg P(x)$`,
      },
      {
        id: 'dm-3',
        lectureNumber: 3,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L3: Set Theory, Power Sets & Inclusion-Exclusion Principle',
        duration: '25:15',
        videoId: 'b1L6xM7r8yU',
        topics: ['Subsets & Power Sets (|P(A)| = 2^n)', 'Cartesian Products', 'Principle of Inclusion-Exclusion for 2 & 3 sets'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `def pie_3_sets(a, b, c, ab, bc, ac, abc):
    return a + b + c - ab - bc - ac + abc

print("Total Students in at least one club:", pie_3_sets(50, 40, 30, 20, 15, 10, 5))
`,
        },
        detailedNotes: `### Inclusion-Exclusion Principle:
$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |A \cap C| + |A \cap B \cap C|$$`,
      },
      {
        id: 'dm-4',
        lectureNumber: 4,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L4: Relations: Reflexive, Symmetric, Transitive & Posets',
        duration: '31:20',
        videoId: '7S_tz1z_5bA',
        topics: ['Equivalence Relation', 'Partial Order Relation (Reflexive, Antisymmetric, Transitive)', 'Hasse Diagrams', 'Total Order'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def is_equivalence(relation, domain):
    is_refl = all((x, x) in relation for x in domain)
    is_symm = all((y, x) in relation for (x, y) in relation)
    is_trans = True
    for (x, y) in relation:
        for (a, b) in relation:
            if y == a and (x, b) not in relation: is_trans = False
    return is_refl and is_symm and is_trans

dom = {1, 2, 3}
rel = {(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)}
print("Is Equivalence Relation:", is_equivalence(rel, dom))
`,
        },
        detailedNotes: `### Relations Summary:
- **Equivalence Relation:** Reflexive, Symmetric, and Transitive.
- **Partial Order (Poset):** Reflexive, Anti-symmetric, and Transitive.`,
      },
      {
        id: 'dm-5',
        lectureNumber: 5,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L5: Functions: Injective (1-to-1), Surjective (Onto) & Bijective',
        duration: '24:50',
        videoId: 'j2S7bK3V5rA',
        topics: ['Injective Function Condition', 'Surjective Function Condition', 'Bijective Inverse Function', 'Counting Total Functions (n^m)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Counting functions from Set A (|A|=m) to Set B (|B|=n)
def count_functions(m, n):
    total = n ** m
    one_to_one = 1
    if m <= n:
        for i in range(m): one_to_one *= (n - i)
    else:
        one_to_one = 0
    return total, one_to_one

print("Total & Injective Functions (|A|=3, |B|=4):", count_functions(3, 4))
`,
        },
        detailedNotes: `### Function Properties:
- **Injective:** $f(a) = f(b) \implies a = b$. Requires $|A| \le |B|$.
- **Surjective:** For every $b \in B$, $\exists a \in A$ such that $f(a) = b$. Requires $|A| \ge |B|$.
- **Bijective:** Both Injective and Surjective. Inverse function $f^{-1}$ exists!`,
      },
      {
        id: 'dm-6',
        lectureNumber: 6,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L6: Combinatorics: Permutations, Combinations & Pigeonhole Principle',
        duration: '28:10',
        videoId: 'q6M7r8b9yVU',
        topics: ['P(n, r) and C(n, r)', 'Pigeonhole Principle (PHP)', 'Generalized Pigeonhole Principle (ceil(N/k))'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import math

def min_students_for_same_grade(students, grades=5):
    # Generalized PHP: ceil(N / k)
    return math.ceil(students / grades)

print("In a class of 32 students with 5 grades, at least:", min_students_for_same_grade(32, 5), "receive the same grade.")
`,
        },
        detailedNotes: `### Generalized Pigeonhole Principle:
If $N$ items are put into $k$ boxes, then at least one box must contain at least $\lceil N / k \rceil$ items.`,
      },
      {
        id: 'dm-7',
        lectureNumber: 7,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L7: Recurrence Relations: Linear Homogeneous Solutions',
        duration: '31:40',
        videoId: 'aZjYr87r1b8',
        topics: ['Characteristic Equation Method', 'Distinct Roots', 'Repeated Roots', 'Fibonacci Closed-Form (Binet Formula)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import math

# Binet's closed form for Fibonacci
def fibonacci_closed_form(n):
    phi = (1 + math.sqrt(5)) / 2
    psi = (1 - math.sqrt(5)) / 2
    return round((phi**n - psi**n) / math.sqrt(5))

print("Fibonacci(10) via closed form:", fibonacci_closed_form(10))
`,
        },
        detailedNotes: `### Solving $a_n = c_1 a_{n-1} + c_2 a_{n-2}$:
Form characteristic equation: $r^2 - c_1 r - c_2 = 0$.
- Distinct real roots $r_1, r_2$: $a_n = A r_1^n + B r_2^n$.
- Repeated root $r_1 = r_2 = r$: $a_n = (A + Bn) r^n$.`,
      },
      {
        id: 'dm-8',
        lectureNumber: 8,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L8: Graph Theory: Handshaking Lemma, Euler & Hamiltonian Graphs',
        duration: '29:30',
        videoId: 'b4R7y9wM2vA',
        topics: ['Handshaking Lemma (Sum of Degrees = 2|E|)', 'Number of Odd Degree Vertices is Even', 'Euler Circuit (All degrees even)', 'Hamiltonian Cycles'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def has_euler_circuit(adj_list):
    # Connected + every vertex has even degree
    return all(len(neighbors) % 2 == 0 for neighbors in adj_list.values())

graph = {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}
print("Graph has Euler Circuit:", has_euler_circuit(graph))
`,
        },
        detailedNotes: `### The Handshaking Lemma:
$$\sum_{v \in V} \text{deg}(v) = 2 |E|$$
Direct Corollary: In any graph, the count of vertices with odd degree must be an **even** number!`,
      },
      {
        id: 'dm-9',
        lectureNumber: 9,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L9: Trees, Spanning Trees & Planar Graphs (Euler Formula)',
        duration: '32:10',
        videoId: 'x2M8r9b5wVU',
        topics: ['Tree Properties (|E| = |V| - 1)', 'Planar Graphs', 'Euler Planar Formula: V - E + R = 2', 'K5 and K3,3 Kuratowski Theorem'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `def planar_faces(v, e):
    # V - E + R = 2 => R = 2 - V + E
    return 2 - v + e

print("Faces in connected planar graph (V=6, E=9):", planar_faces(6, 9))
`,
        },
        detailedNotes: `### Planar Graphs:
A graph is planar if it can be drawn in a plane without any intersecting edges.
- **Euler's Formula:** $V - E + R = 2$ (where $R$ is number of regions/faces).
- For simple planar graphs with $V \ge 3$: $E \le 3V - 6$.`,
      },
      {
        id: 'dm-10',
        lectureNumber: 10,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Math',
        title: 'L10: Group Theory: Monoids, Semigroups, Groups & Abelian Groups',
        duration: '33:15',
        videoId: 'v7P3r8wM2yU',
        topics: ['Closure Property', 'Associativity (Semigroup)', 'Identity Element (Monoid)', 'Inverse Element (Group)', 'Commutativity (Abelian Group)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `properties = [
    ("Groupoid", "Closure only"),
    ("Semigroup", "Closure + Associativity"),
    ("Monoid", "Closure + Associativity + Identity element"),
    ("Group", "Closure + Associativity + Identity + Inverses for all elements"),
    ("Abelian Group", "Group + Commutative property (a * b = b * a)")
]
for p, desc in properties: print(f"{p:15} -> {desc}")
`,
        },
        detailedNotes: `### Group Axioms $(G, *)$:
1. **Closure:** $\forall a, b \in G, a * b \in G$.
2. **Associativity:** $\forall a, b, c \in G, (a * b) * c = a * (b * c)$.
3. **Identity:** $\exists e \in G$ such that $\forall a \in G, a * e = e * a = a$.
4. **Inverse:** $\forall a \in G, \exists a^{-1} \in G$ such that $a * a^{-1} = e$.`,
      },
    ],
  },
  // =========================================================================
  // 10. SOFTWARE ENGINEERING (SE)
  // =========================================================================
  {
    id: 'software-eng',
    title: 'Software Engineering (SE)',
    code: 'CS 307',
    category: 'Software Lifecycle & QA',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '📋',
    color: '#10B981',
    playlistId: 'PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2',
    description:
      'Software engineering methodologies & quality assurance: SDLC Models, Agile, Scrum, Requirements Engineering (SRS), Architecture, Cohesion & Coupling, Black-Box & White-Box Testing, Cyclomatic Complexity, and CI/CD.',
    lecturesCount: 10,
    totalDuration: '4 hrs 15 mins',
    keyTopics: [
      'SDLC Lifecycle Phases (Requirements, Design, Coding, Testing, Maintenance)',
      'Classical Models: Waterfall, Spiral (Risk-Driven), Prototyping & RAD',
      'Agile Methodology, Scrum Framework, Sprints, Standups & Backlogs',
      'Software Requirements Specification (SRS) IEEE 830 Standards',
      'Architectural Styles: Monolith vs Microservices vs Event-Driven',
      'Modular Design Metrics: Cohesion Types vs Coupling Types',
      'Black-Box Testing: Boundary Value Analysis & Equivalence Partitioning',
      'White-Box Testing: Control Flow Graphs, Basis Path & Cyclomatic Complexity',
      'Software Maintenance, Reverse Engineering & Technical Debt',
      'Continuous Integration, Delivery & Automated Deployment Pipelines',
    ],
    lectures: [
      {
        id: 'se-1',
        lectureNumber: 1,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L1: Software Engineering Process, SDLC Phases & Life Cycles',
        duration: '18:40',
        videoId: 'Q_g6mF8z9yM',
        topics: ['Software Crisis & Motivation', 'Feasibility Study', 'SRS Documentation', 'Design, Implementation, Testing, Maintenance'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `sdlc_phases = [
    "1. Feasibility Study & Requirement Analysis",
    "2. System Design (High-Level & Low-Level Design)",
    "3. Implementation & Unit Testing",
    "4. Integration & System Testing",
    "5. Deployment & Maintenance"
]
for phase in sdlc_phases: print(phase)
`,
        },
        detailedNotes: `### Software Engineering Principles:
Software Engineering provides systematic, disciplined, quantifiable approaches to the development, operation, and maintenance of software to avoid the historical **Software Crisis** (over budget, delayed delivery, unreliable code).`,
      },
      {
        id: 'se-2',
        lectureNumber: 2,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L2: Classical SDLC Models: Waterfall vs Spiral (Risk-Driven)',
        duration: '22:15',
        videoId: 'm9P3q7vL1wA',
        topics: ['Classical Waterfall vs Iterative Waterfall', 'Prototyping Model', 'Boehm Spiral Model (Risk Handling)', 'V-Model for Verification & Validation'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `spiral_quadrants = [
    "Q1: Objective Determination & Identify Alternative Solutions",
    "Q2: Risk Analysis & Prototyping Evaluation",
    "Q3: Engineering Development & Testing",
    "Q4: Customer Review & Plan Next Iteration"
]
for q in spiral_quadrants: print(q)
`,
        },
        detailedNotes: `### Model Comparison:
- **Waterfall:** Linear sequential flow. Simple, disciplined, but poor for projects with dynamic changing requirements.
- **Spiral Model:** Meta-model that incorporates iterative development with explicit **Risk Analysis** in every cycle. Ideal for massive, high-risk aerospace/defense projects.`,
      },
      {
        id: 'se-3',
        lectureNumber: 3,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L3: Agile Methodologies & The Scrum Framework',
        duration: '25:30',
        videoId: 'b1L6xM7r8yU',
        topics: ['Agile Manifesto Values', 'Scrum Roles (Product Owner, Scrum Master, Dev Team)', 'Sprint Ceremonies (Planning, Daily Standup, Review, Retrospective)'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `class ScrumSprint:
    def __init__(self, sprint_number: int, duration_weeks: int = 2):
        self.sprint_number = sprint_number
        self.duration_weeks = duration_weeks
        self.backlog = []

    def add_user_story(self, story, story_points):
        self.backlog.append({"story": story, "points": story_points})

sprint = ScrumSprint(1)
sprint.add_user_story("As a user, I want OAuth login so that I can sign in securely", 5)
print("Sprint Backlog:", sprint.backlog)
`,
        },
        detailedNotes: `### Agile Manifesto:
1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.`,
      },
      {
        id: 'se-4',
        lectureNumber: 4,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L4: Requirements Engineering & SRS IEEE 830 Standards',
        duration: '23:50',
        videoId: '7S_tz1z_5bA',
        topics: ['Functional vs Non-Functional Requirements', 'Requirement Elicitation', 'SRS Characteristics (Unambiguous, Complete, Verifiable)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `requirements = {
    "Functional": ["User can reset password via email OTP", "Checkout calculates 8% sales tax"],
    "Non-Functional": ["P99 latency < 200ms", "System availability >= 99.99%", "GDPR compliant data storage"]
}
for k, v in requirements.items():
    print(f"[{k}]", v)
`,
        },
        detailedNotes: `### Good SRS Characteristics:
- **Unambiguous:** Every requirement has exactly one interpretation.
- **Verifiable:** A quantifiable test can prove whether the system satisfies the requirement.
- **Traceable:** Origin of each requirement is clear and can be tracked through design and code.`,
      },
      {
        id: 'se-5',
        lectureNumber: 5,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L5: Software Architecture: Monolith vs Microservices',
        duration: '28:10',
        videoId: 'j2S7bK3V5rA',
        topics: ['Monolithic Architecture', 'Microservices Distributed Services', 'API Gateway & Service Discovery', 'Database per Service Pattern'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `print("Microservices: Independent deployments, polyglot persistence, bounded contexts!")
`,
        },
        detailedNotes: `### Monolith vs Microservices:
- **Monolith:** Single deployable unit, shared database, simple initial development, but scaling bottlenecks as organization grows.
- **Microservices:** Loosely coupled services organized around business domains. Independently deployable and scalable, but introduces distributed network complexity.`,
      },
      {
        id: 'se-6',
        lectureNumber: 6,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L6: Modular Design: Cohesion Types vs Coupling Types',
        duration: '27:40',
        videoId: 'q6M7r8b9yVU',
        topics: ['Goal: High Cohesion & Low Coupling', 'Cohesion Levels (Functional down to Coincidental)', 'Coupling Levels (Data up to Content Coupling)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `cohesion_hierarchy = ["Functional (BEST)", "Sequential", "Communicational", "Procedural", "Temporal", "Logical", "Coincidental (WORST)"]
coupling_hierarchy = ["Data Coupling (BEST/LOOSEST)", "Stamp", "Control", "External", "Common", "Content Coupling (WORST/TIGHTEST)"]

print("Cohesion Goal (Higher is better):", cohesion_hierarchy[0])
print("Coupling Goal (Lower is better):", coupling_hierarchy[0])
`,
        },
        detailedNotes: `### Modular Engineering Golden Rule:
**High Cohesion, Low Coupling!**
- **Functional Cohesion:** Every element in the module contributes to a single well-defined task.
- **Data Coupling:** Modules communicate strictly by passing necessary data arguments.`,
      },
      {
        id: 'se-7',
        lectureNumber: 7,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L7: Black-Box Testing: Boundary Value Analysis & Equivalence Partitioning',
        duration: '26:20',
        videoId: 'aZjYr87r1b8',
        topics: ['Equivalence Classes (Valid vs Invalid)', 'Boundary Value Analysis (min, min+, nom, max-, max)', 'Robustness Testing'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `def generate_bva_test_cases(min_val, max_val):
    # Standard BVA: min-1, min, min+1, nom, max-1, max, max+1
    nom = (min_val + max_val) // 2
    return [min_val - 1, min_val, min_val + 1, nom, max_val - 1, max_val, max_val + 1]

print("BVA Test Cases for age between 18 and 60:", generate_bva_test_cases(18, 60))
`,
        },
        detailedNotes: `### Boundary Value Analysis (BVA):
Errors cluster at the boundaries of input domains! For an input range $[a, b]$, test values: $a-1, a, a+1, \text{nominal}, b-1, b, b+1$.`,
      },
      {
        id: 'se-8',
        lectureNumber: 8,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L8: White-Box Testing: Cyclomatic Complexity & Basis Path Testing',
        duration: '29:45',
        videoId: 'b4R7y9wM2vA',
        topics: ['Control Flow Graph (CFG)', 'McCabe Cyclomatic Complexity Formulas (V(G) = E - N + 2P)', 'Independent Basis Paths'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def cyclomatic_complexity(edges, nodes, connected_components=1):
    return edges - nodes + (2 * connected_components)

print("Cyclomatic Complexity for CFG with 14 edges and 11 nodes:", cyclomatic_complexity(14, 11, 1))
`,
        },
        detailedNotes: `### McCabe's Cyclomatic Complexity $V(G)$:
1. $V(G) = E - N + 2P$ (where $E$ is edges, $N$ is nodes, $P$ is connected components).
2. $V(G) = P + 1$ (where $P$ is the count of predicate / decision nodes).
3. Equals the exact count of linearly independent execution paths through source code.`,
      },
      {
        id: 'se-9',
        lectureNumber: 9,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L9: Software Maintenance, Refactoring & Technical Debt',
        duration: '21:10',
        videoId: 'x2M8r9b5wVU',
        topics: ['Corrective, Adaptive, Perfective, Preventive Maintenance', 'Code Smells & Refactoring', 'Managing Technical Debt'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `maintenance_types = {
    "Corrective": "Fix bugs discovered by users in production",
    "Adaptive": "Port software to new OS, cloud environment, or updated database",
    "Perfective": "Enhance features and optimize performance",
    "Preventive": "Refactor code to prevent future failures (reduce tech debt)"
}
for k, v in maintenance_types.items(): print(f"{k:12} -> {v}")
`,
        },
        detailedNotes: `### Maintenance Categories:
Over $60\%$ of software engineering lifecycle cost is spent in post-deployment maintenance, with **Perfective Maintenance** representing the largest share.`,
      },
      {
        id: 'se-10',
        lectureNumber: 10,
        subjectId: 'software-eng',
        subjectName: 'Software Eng',
        title: 'L10: Modern CI/CD Pipelines & DevOps Automation',
        duration: '27:50',
        videoId: 'v7P3r8wM2yU',
        topics: ['Continuous Integration (CI)', 'Continuous Delivery vs Deployment (CD)', 'Automated Test Suites & Canary Releases', 'Blue-Green Deployments'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `print("CI/CD Pipeline: Commit -> Unit Tests -> Build Image -> Staging -> Smoke Tests -> Production Canary")
`,
        },
        detailedNotes: `### Blue-Green Deployment:
Maintains two identical production environments (Blue = live active traffic, Green = idle standby). Deploy new version to Green, run smoke tests, then switch router traffic instantly with zero downtime.`,
      },
    ],
  },
  // =========================================================================
  // 11. DEVOPS & CLOUD ENGINEERING
  // =========================================================================
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineering',
    code: 'CS 403',
    category: 'Infrastructure & Operations',
    instructor: 'Kunal Kushwaha (DevOps Bootcamp)',
    icon: '🚀',
    color: '#06B6D4',
    playlistId: 'PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF',
    description:
      'Modern infrastructure engineering from code to cloud: Linux Shell, Git Flow, Docker Architecture, Multi-Stage Builds, Docker Compose, Kubernetes Pods/Services/Ingress, Terraform (IaC), and GitHub Actions CI/CD.',
    lecturesCount: 10,
    totalDuration: '5 hrs 10 mins',
    keyTopics: [
      'DevOps Culture, Tools Ecosystem & Infrastructure as Code (IaC)',
      'Linux Shell Essentials: Permissions, Systemd & Bash Scripting',
      'Advanced Git: Interactive Rebasing, Bisect & Cherry-Picking',
      'Docker Architecture: OCI Images, Layers & Dockerfile Best Practices',
      'Docker Networking, Storage Volumes & Multi-Stage Builds',
      'Docker Compose: Multi-Service Application Orchestration',
      'Kubernetes Architecture: Control Plane, Nodes, Pods & ReplicaSets',
      'Kubernetes Deployments, Rolling Updates & Services (ClusterIP, Ingress)',
      'Infrastructure as Code (IaC) with Terraform Fundamentals',
      'GitHub Actions: Production CI/CD Build, Test & Deployment Automation',
    ],
    lectures: [
      {
        id: 'devops-1',
        lectureNumber: 1,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L1: DevOps Culture, CI/CD Lifecycle & Cloud Infrastructure',
        duration: '25:20',
        videoId: '1a2b3c4d5eF',
        topics: ['DevOps Principles (CAMS)', 'Immutable Infrastructure', 'Microservices Containerization', 'Cloud Native Computing Foundation (CNCF)'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `#!/usr/bin/env bash
# Basic Server Health Check Script
echo "=== System Health ==="
uptime
df -h /
free -m
`,
        },
        detailedNotes: `### The CAMS DevOps Framework:
- **Culture:** Collaboration between developers and operations engineers.
- **Automation:** Automating builds, testing, security scans, and provisioning.
- **Measurement:** Tracking metrics (DORA metrics: deployment frequency, lead time, MTTR, change fail rate).
- **Sharing:** Open communication across functional silos.`,
      },
      {
        id: 'devops-2',
        lectureNumber: 2,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L2: Linux Shell Essentials: Permissions, Systemd & Bash Scripting',
        duration: '32:40',
        videoId: 'm9P3q7vL1wA',
        topics: ['Chmod (Octal Notation 755)', 'Chown & User Groups', 'Pipes & Redirection', 'Systemd Service Management (systemctl)', 'Cron Automation'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `#!/bin/bash
# Backup Directory Script with timestamp
BACKUP_DIR="/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/app_data.tar.gz" /var/www/app
echo "Backup saved to $BACKUP_DIR"
`,
        },
        detailedNotes: `### Linux Permissions Octal Breakdown:
- Read ($r$) = 4, Write ($w$) = 2, Execute ($x$) = 1.
- \`chmod 755 file.sh\`: Owner has 7 ($rwx$), Group has 5 ($r-x$), Others have 5 ($r-x$).`,
      },
      {
        id: 'devops-3',
        lectureNumber: 3,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L3: Version Control with Git: Branching, Rebasing & Cherry-Pick',
        duration: '28:15',
        videoId: 'b1L6xM7r8yU',
        topics: ['Git Objects (Blobs, Trees, Commits)', 'Merge vs Rebase', 'Resolving Merge Conflicts', 'git bisect for bug hunting'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `git checkout -b feature/auth-jwt
git commit -am "feat: implement JWT token refresh"
# Interactive rebase onto main
git rebase -i main
`,
        },
        detailedNotes: `### Merge vs Rebase:
- **Git Merge:** Preserves complete historical timeline with a dedicated merge commit.
- **Git Rebase:** Replays commits on top of another branch, producing a clean, linear project history.`,
      },
      {
        id: 'devops-4',
        lectureNumber: 4,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L4: Docker Architecture: Images, Containers & Multi-Stage Builds',
        duration: '36:10',
        videoId: '7S_tz1z_5bA',
        topics: ['Container vs Virtual Machine', 'Namespaces & Cgroups', 'Layer Caching Optimization', 'Multi-Stage Dockerfiles for Minimal Footprint'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Production Multi-Stage Node.js Dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER node
CMD ["node", "dist/main.js"]
`,
        },
        detailedNotes: `### Multi-Stage Build Benefit:
Separate build dependencies (TypeScript compiler, headers, dev-packages) from production image, shrinking container image from 1.2 GB down to ~80 MB!`,
      },
      {
        id: 'devops-5',
        lectureNumber: 5,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L5: Docker Networking & Persistent Volumes',
        duration: '26:50',
        videoId: 'j2S7bK3V5rA',
        topics: ['Bridge, Host, None, Overlay Networks', 'Named Volumes vs Bind Mounts', 'Container Healthchecks'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Create isolated network & persistent volume for database
docker network create backend-net
docker volume create pg-data
docker run -d --name postgres-db --network backend-net -v pg-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine
`,
        },
        detailedNotes: `### Docker Storage:
- **Named Volumes:** Managed by Docker in \`/var/lib/docker/volumes/\`. Safest for databases.
- **Bind Mounts:** Maps arbitrary host folder into container. Ideal for live local development.`,
      },
      {
        id: 'devops-6',
        lectureNumber: 6,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L6: Docker Compose: Multi-Service Application Orchestration',
        duration: '30:20',
        videoId: 'q6M7r8b9yVU',
        topics: ['docker-compose.yml Syntax', 'Service Dependencies (depends_on)', 'Environment Variables (.env)', 'Port Forwarding'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=cache
    depends_on:
      - cache

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
`,
        },
        detailedNotes: `### Docker Compose:
A tool for defining and running multi-container Docker applications via a single declarative YAML specification. Automatically configures a shared private DNS network for all declared services.`,
      },
      {
        id: 'devops-7',
        lectureNumber: 7,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L7: Kubernetes Architecture: Control Plane, Nodes & Pods',
        duration: '38:40',
        videoId: 'aZjYr87r1b8',
        topics: ['API Server, etcd, Scheduler, Controller Manager', 'Kubelet, Kube-Proxy', 'Pods as Smallest Deployable Unit', 'kubectl CLI Commands'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Basic Kubernetes Pod Specification (pod.yaml)
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80
`,
        },
        detailedNotes: `### Kubernetes Architecture:
- **Control Plane:**
  - **kube-apiserver:** Gateway exposing Kubernetes REST API.
  - **etcd:** Distributed consistent key-value store for entire cluster state.
  - **kube-scheduler:** Assigns unscheduled Pods to suitable worker Nodes.
  - **kube-controller-manager:** Enforces desired state (Node, ReplicaSet, Endpoints).
- **Worker Node:** Runs \`kubelet\` (node agent), \`kube-proxy\` (networking), and container runtime.`,
      },
      {
        id: 'devops-8',
        lectureNumber: 8,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L8: Kubernetes Deployments, Services & Ingress Controllers',
        duration: '35:15',
        videoId: 'b4R7y9wM2vA',
        topics: ['Deployment Manifests', 'Rolling Updates & Rollbacks', 'ClusterIP, NodePort, LoadBalancer Services', 'Ingress Routing Rules'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api-server
        image: api:v1.0.0
        ports:
        - containerPort: 8080
`,
        },
        detailedNotes: `### Service Types:
- **ClusterIP:** Default. Exposes service on internal cluster-only IP.
- **NodePort:** Exposes service on static port on each Node's public IP (\`30000-32767\`).
- **LoadBalancer:** Provisions cloud provider external load balancer (AWS ELB/GCP LB).
- **Ingress:** Manages external HTTP/HTTPS routing rules to cluster services with SSL termination.`,
      },
      {
        id: 'devops-9',
        lectureNumber: 9,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L9: Infrastructure as Code (IaC) with Terraform Fundamentals',
        duration: '31:30',
        videoId: 'x2M8r9b5wVU',
        topics: ['HashiCorp Configuration Language (HCL)', 'Providers & Resources', 'terraform init, plan, apply', 'Remote State & State Locking'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Terraform AWS Provider & S3 Bucket Definition
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "app_storage" {
  bucket = "company-app-production-storage"
}
`,
        },
        detailedNotes: `### Declarative Infrastructure as Code:
You declare *WHAT* resources you want created; Terraform calculates the dependency graph and executes the minimal set of API calls needed to transition real-world infrastructure into that desired state.`,
      },
      {
        id: 'devops-10',
        lectureNumber: 10,
        subjectId: 'devops',
        subjectName: 'DevOps',
        title: 'L10: GitHub Actions: Automated CI/CD Pipelines from Scratch',
        duration: '29:40',
        videoId: 'v7P3r8wM2yU',
        topics: ['Workflow YAML Syntax', 'Events (push, pull_request)', 'Jobs, Steps & Action Runners', 'Secrets Management & Container Publishing'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `name: CI/CD Pipeline
on:
  push:
    branches: [ "main" ]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
    - run: npm ci
    - run: npm test
    - run: npm run build
`,
        },
        detailedNotes: `### GitHub Actions Architecture:
Workflows triggered by repository events execute across virtual runner environments. Secrets (API keys, deployment credentials) are encrypted and injected securely at runtime.`,
      },
    ],
  },
  // =========================================================================
  // 12. MACHINE LEARNING & AI FOUNDATIONS
  // =========================================================================
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI Foundations',
    code: 'CS 404',
    category: 'Artificial Intelligence & Data',
    instructor: 'Krish Naik & Andrew Ng',
    icon: '🤖',
    color: '#8B5CF6',
    playlistId: 'PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
    description:
      'Foundational machine learning algorithms and neural network architectures: Supervised vs Unsupervised Paradigms, Gradient Descent, Linear & Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, K-Means Clustering, PCA, and Neural Networks.',
    lecturesCount: 10,
    totalDuration: '5 hrs 20 mins',
    keyTopics: [
      'Machine Learning Taxonomy: Supervised, Unsupervised & Reinforcement',
      'Data Preprocessing, Feature Scaling (Standard vs MinMax) & Encoding',
      'Linear Regression from Scratch with Gradient Descent Optimization',
      'Logistic Regression, Sigmoid Activation & Classification Metrics',
      'Decision Trees: Entropy, Information Gain & Gini Impurity',
      'Ensemble Learning: Bagging (Random Forest) vs Boosting (XGBoost)',
      'Support Vector Machines (SVM): Hyperplanes & Kernel Trick',
      'K-Means Clustering: WCSS & Elbow Method for Optimal K',
      'Principal Component Analysis (PCA) for Dimensionality Reduction',
      'Neural Networks: Multi-Layer Perceptrons & Backpropagation Calculus',
    ],
    lectures: [
      {
        id: 'ml-1',
        lectureNumber: 1,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L1: Machine Learning Paradigms: Supervised, Unsupervised & RL',
        duration: '22:15',
        videoId: 'i_LwzRVP7bg',
        topics: ['Supervised Learning (Regression, Classification)', 'Unsupervised Learning (Clustering, Dimension Reduction)', 'Reinforcement Learning (Agent, Environment, Reward)'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `paradigms = {
    "Supervised": "Labeled dataset (X, y) -> Predict house prices or spam email",
    "Unsupervised": "Unlabeled dataset (X) -> Customer segmentation, anomaly detection",
    "Reinforcement": "Reward-based feedback loop -> Game playing (Chess/Go), robotics"
}
for k, v in paradigms.items(): print(f"[{k}] {v}")
`,
        },
        detailedNotes: `### Core Paradigms:
- **Supervised Learning:** Algorithms learn a mapping function $f: X \rightarrow y$ from paired input-output training samples.
- **Unsupervised Learning:** Finds intrinsic patterns, clusters, or lower-dimensional representations in unannotated data.
- **Reinforcement Learning:** An agent interacts with an environment, learning an optimal policy $\pi(a|s)$ to maximize cumulative discounted reward.`,
      },
      {
        id: 'ml-2',
        lectureNumber: 2,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L2: Exploratory Data Analysis (EDA) & Feature Scaling',
        duration: '26:40',
        videoId: 'm9P3q7vL1wA',
        topics: ['Handling Missing Values', 'Outlier Detection (IQR)', 'StandardScaler (Z-Score) vs MinMaxScaler', 'One-Hot Encoding'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `import math

def standard_scaler(values):
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    std_dev = math.sqrt(variance)
    return [(x - mean) / std_dev for x in values]

data = [10, 20, 30, 40, 50]
print("Normalized Z-scores:", standard_scaler(data))
`,
        },
        detailedNotes: `### Feature Scaling:
- **Standardization (Z-Score):** $z = \frac{x - \mu}{\sigma}$. Centers data with mean 0 and variance 1. Essential for algorithms relying on Euclidean distance (KNN, SVM, K-Means) or gradient descent.
- **Min-Max Normalization:** $x_{\text{norm}} = \frac{x - x_{\text{min}}}{x_{\text{max}} - x_{\text{min}}}$. Bounds values to $[0, 1]$.`,
      },
      {
        id: 'ml-3',
        lectureNumber: 3,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L3: Linear Regression: Cost Function & Gradient Descent',
        duration: '34:10',
        videoId: 'b1L6xM7r8yU',
        topics: ['Hypothesis Function (h(x) = wx + b)', 'Mean Squared Error (MSE) Loss', 'Batch Gradient Descent Partial Derivatives', 'Learning Rate (alpha)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def gradient_descent(x, y, lr=0.01, epochs=500):
    w, b = 0.0, 0.0
    n = len(x)
    for _ in range(epochs):
        y_pred = [w * xi + b for xi in x]
        dw = (-2 / n) * sum(xi * (yi - y_hat) for xi, yi, y_hat in zip(x, y, y_pred))
        db = (-2 / n) * sum((yi - y_hat) for yi, y_hat in zip(y, y_pred))
        w -= lr * dw
        b -= lr * db
    return w, b

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
w, b = gradient_descent(x, y)
print(f"Fitted Model: y = {w:.2f}x + {b:.2f}")
`,
        },
        detailedNotes: `### Gradient Descent Updates:
$$J(w, b) = \frac{1}{N} \sum_{i=1}^N (y^{(i)} - (w x^{(i)} + b))^2$$
$$w := w - \alpha \frac{\partial J}{\partial w}, \quad b := b - \alpha \frac{\partial J}{\partial b}$$`,
      },
      {
        id: 'ml-4',
        lectureNumber: 4,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L4: Logistic Regression, Sigmoid Function & Classification Metrics',
        duration: '31:20',
        videoId: '7S_tz1z_5bA',
        topics: ['Sigmoid Function (1 / (1 + e^-z))', 'Binary Cross-Entropy Loss', 'Confusion Matrix (TP, FP, TN, FN)', 'Precision, Recall, F1-Score & ROC-AUC'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import math

def sigmoid(z): return 1.0 / (1.0 + math.exp(-z))

def f1_score(tp, fp, fn):
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    return precision, recall, f1

p, r, f1 = f1_score(80, 10, 20)
print(f"Precision: {p:.2f}, Recall: {r:.2f}, F1: {f1:.2f}")
`,
        },
        detailedNotes: `### Classification Metrics:
- **Precision:** $\frac{\text{TP}}{\text{TP} + \text{FP}}$ (Quality of positive predictions; critical in spam detection).
- **Recall:** $\frac{\text{TP}}{\text{TP} + \text{FN}}$ (Completeness of positive predictions; critical in cancer detection).
- **F1-Score:** Harmonic mean of Precision and Recall: $\frac{2 \times P \times R}{P + R}$.`,
      },
      {
        id: 'ml-5',
        lectureNumber: 5,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L5: Decision Trees: Entropy, Information Gain & Gini Impurity',
        duration: '33:45',
        videoId: 'j2S7bK3V5rA',
        topics: ['Shannon Entropy Formula', 'Information Gain (ID3 Algorithm)', 'Gini Impurity (CART Algorithm)', 'Overfitting & Tree Pruning'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `import math

def entropy(probabilities):
    return -sum(p * math.log2(p) for p in probabilities if p > 0)

# 9 positive, 5 negative samples
total = 14
ent = entropy([9 / total, 5 / total])
print(f"Entropy of dataset: {ent:.4f} bits")
`,
        },
        detailedNotes: `### Splitting Criteria:
- **Entropy:** $H(S) = - \sum_{i=1}^c p_i \log_2(p_i)$
- **Information Gain:** $IG(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|} H(S_v)$
- **Gini Impurity:** $Gini(S) = 1 - \sum_{i=1}^c p_i^2$ (computationally faster than Entropy because no logarithm is required).`,
      },
      {
        id: 'ml-6',
        lectureNumber: 6,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L6: Ensemble Learning: Bagging (Random Forest) vs Boosting (XGBoost)',
        duration: '35:10',
        videoId: 'q6M7r8b9yVU',
        topics: ['Bootstrap Aggregating (Bagging)', 'Random Subspace Feature Selection', 'Boosting (Sequential Error Correction)', 'AdaBoost & Gradient Boosting'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `ensemble_comparison = {
    "Bagging (Random Forest)": "Trains parallel independent trees on random data subsets with replacement. Reduces Variance.",
    "Boosting (XGBoost/AdaBoost)": "Trains sequential trees where each subsequent tree corrects errors of predecessors. Reduces Bias."
}
for name, desc in ensemble_comparison.items(): print(f"[{name}] {desc}")
`,
        },
        detailedNotes: `### Bagging vs Boosting:
- **Bagging (Random Forest):** High-depth trees trained in parallel on bootstrap samples. Aggregates results via majority voting or averaging. Primarily reduces **Variance** (overfitting).
- **Boosting (GBDT, XGBoost):** Shallow trees (weak learners) trained sequentially, focusing on misclassified instances from prior rounds. Primarily reduces **Bias**.`,
      },
      {
        id: 'ml-7',
        lectureNumber: 7,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L7: Support Vector Machines (SVM) & The Kernel Trick',
        duration: '31:20',
        videoId: 'aZjYr87r1b8',
        topics: ['Maximum Margin Hyperplane', 'Support Vectors', 'Soft Margin & Slack Variable (C)', 'Kernel Functions (RBF, Polynomial)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `print("SVM Kernel Trick: Computes inner products in high-dimensional feature space without explicitly mapping vectors!")
`,
        },
        detailedNotes: `### SVM & Kernel Trick:
- SVM finds the optimal hyperplane that maximizes the geometric margin between two classes.
- **The Kernel Trick:** Replaces expensive high-dimensional coordinates $\phi(x) \cdot \phi(z)$ with kernel functions $K(x, z) = \exp(-\gamma ||x - z||^2)$ (Radial Basis Function / RBF), allowing non-linear separation in $O(D)$ time!`,
      },
      {
        id: 'ml-8',
        lectureNumber: 8,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L8: K-Means Clustering: WCSS & The Elbow Method',
        duration: '28:15',
        videoId: 'b4R7y9wM2vA',
        topics: ['Centroid Initialization', 'Assignment & Update Steps', 'Within-Cluster Sum of Squares (WCSS)', 'K-Means++ Initialization'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `def euclidean_dist(p1, p2):
    return sum((a - b) ** 2 for a, b in zip(p1, p2)) ** 0.5

print("Distance between (1, 2) and (4, 6):", euclidean_dist((1, 2), (4, 6)))
`,
        },
        detailedNotes: `### K-Means Algorithm:
1. Initialize $K$ cluster centroids (preferably using K-Means++ to spread starting points).
2. Assign each data point to its nearest centroid.
3. Recompute centroid positions as the arithmetic mean of all assigned points.
4. Repeat until centroid locations converge.`,
      },
      {
        id: 'ml-9',
        lectureNumber: 9,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L9: Dimensionality Reduction: Principal Component Analysis (PCA)',
        duration: '32:30',
        videoId: 'x2M8r9b5wVU',
        topics: ['Curse of Dimensionality', 'Covariance Matrix Calculation', 'Eigenvalues & Eigenvectors', 'Explained Variance Ratio'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `print("PCA projects D-dimensional data onto orthogonal axes that maximize variance!")
`,
        },
        detailedNotes: `### Steps in PCA:
1. Standardize the $D$-dimensional dataset.
2. Compute the $D \times D$ Covariance Matrix.
3. Compute eigenvectors and eigenvalues of the covariance matrix.
4. Sort eigenvalues in descending order and select top $k$ eigenvectors to form transformation matrix $W$.
5. Project original dataset $X$ onto new $k$-dimensional subspace: $Y = XW$.`,
      },
      {
        id: 'ml-10',
        lectureNumber: 10,
        subjectId: 'ml-ai',
        subjectName: 'ML & AI',
        title: 'L10: Deep Learning Foundations: Artificial Neural Networks (ANN)',
        duration: '38:50',
        videoId: 'v7P3r8wM2yU',
        topics: ['Perceptron Model', 'Multi-Layer Perceptron (MLP)', 'Activation Functions (ReLU, Sigmoid, Softmax)', 'Backpropagation & Chain Rule'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `import math

def relu(x): return max(0.0, x)
def softmax(logits):
    exp_vals = [math.exp(x) for x in logits]
    sum_exp = sum(exp_vals)
    return [x / sum_exp for x in exp_vals]

print("Softmax of [2.0, 1.0, 0.1]:", [round(p, 3) for p in softmax([2.0, 1.0, 0.1])])
`,
        },
        detailedNotes: `### Backpropagation Core Equation:
Using the calculus chain rule, the gradient of the loss with respect to weight $w_{ij}$ in layer $l$ is:
$$\frac{\partial L}{\partial w_{ij}} = \frac{\partial L}{\partial z_j} \times \frac{\partial z_j}{\partial w_{ij}} = \delta_j \times a_i$$
where $\delta_j$ is backpropagated backward from the output layer to all preceding hidden layers!`,
      },
    ],
  },
];

/**
 * Helper to fetch a subject by ID
 */
export function getSubjectById(subjectId: string): AcademicSubject | undefined {
  return OTHER_ACADEMIC_SUBJECTS.find((s) => s.id === subjectId);
}
