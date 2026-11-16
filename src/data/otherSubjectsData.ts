// Complete CS Engineering & Tech Placement Subject Syllabus & Lecture Dataset
// Covers: Operating Systems (OS), Database Management Systems (DBMS),
// Computer Networks (CN), System Design (HLD), Low-Level Design & OOPs (LLD),
// and Computer Organization & Architecture (COA).
// With verified YouTube playlists, topic-wise video IDs, detailed academic notes,
// and runnable code simulations in Python & C++.

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
    color: '#10B981', // Emerald
    playlistId: 'PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    description:
      'Master the interface between hardware and software: Process Management, CPU Scheduling, Synchronization, Deadlocks, Virtual Memory Paging, and Disk Scheduling.',
    lecturesCount: 9,
    totalDuration: '3 hrs 45 mins',
    keyTopics: [
      'Dual Mode Operation & System Calls',
      'Process Control Block (PCB) & Context Switching',
      'CPU Scheduling (FCFS, SJF, SRTF, RR, Priority)',
      'Critical Section & Peterson’s Algorithm',
      'Semaphores & Classical IPC Problems',
      'Deadlock Prevention & Banker’s Algorithm',
      'Paging, Page Tables, TLB & Segmentation',
      'Page Replacement (FIFO, LRU, Optimal)',
      'Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN)',
    ],
    lectures: [
      {
        id: 'os-1',
        lectureNumber: 1,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L1: Introduction to Operating System, Functions & Architecture',
        duration: '18:42',
        videoId: 'bkSWJJZNgf8',
        topics: ['Kernel vs Shell', 'Dual Mode Operation', 'System Calls', 'Monolithic vs Microkernel'],
        difficulty: 'Beginner',
        starterCodes: {
          cpp: `// Simulating Dual-Mode System Call Execution in C++
#include <iostream>
#include <string>
using namespace std;

enum ExecutionMode { USER_MODE = 1, KERNEL_MODE = 0 };

void executeSystemCall(const string& callName) {
    ExecutionMode currentMode = USER_MODE;
    cout << "[User Space] Executing application in User Mode (Mode bit: 1)" << endl;
    cout << "[Trap / Software Interrupt] Invoking " << callName << "(). Switching to Kernel Mode..." << endl;
    
    currentMode = KERNEL_MODE; // Hardware flips mode bit to 0
    cout << "[Kernel Space] Handling " << callName << " with root device privileges (Mode bit: 0)" << endl;
    
    currentMode = USER_MODE; // Restoring mode bit to 1
    cout << "[Return from Trap] Returning control to user application (Mode bit: 1)" << endl;
}

int main() {
    executeSystemCall("sys_read");
    return 0;
}`,
          python: `# Simulating Dual-Mode System Call Execution in Python
class CPUState:
    USER_MODE = 1
    KERNEL_MODE = 0

def execute_system_call(syscall_name: str):
    mode = CPUState.USER_MODE
    print(f"[User Space] Application executing in User Mode (Mode bit: {mode})")
    print(f"[Trap / Interrupt] Issuing {syscall_name}(). Switching CPU context...")
    
    mode = CPUState.KERNEL_MODE
    print(f"[Kernel Space] Executing kernel service {syscall_name} (Mode bit: {mode})")
    
    mode = CPUState.USER_MODE
    print(f"[Return from Trap] Mode bit restored to {mode}. Back in User Space.")

if __name__ == "__main__":
    execute_system_call("sys_open")`,
        },
        detailedNotes: `### Lecture 1: Introduction to Operating Systems

#### 1. What is an Operating System?
An Operating System is an intermediary program between computer hardware and user applications. Its primary goals are:
- **Convenience:** Making the computer system user-friendly.
- **Efficiency:** Managing CPU, RAM, disk, and I/O devices optimally.

#### 2. Dual Mode Operation
To prevent errant user programs from corrupting hardware or the OS itself:
- **User Mode (Mode bit = 1):** User applications execute here. Direct hardware access is forbidden.
- **Kernel Mode / Supervisor Mode (Mode bit = 0):** Privileged mode. The OS kernel executes instructions directly on hardware.

#### 3. System Calls
A system call is the programmatic way in which a computer program requests a service from the kernel:
\`\`\`
User Application ──(calls read())──> Trap / Interrupt ──> OS Kernel (Kernel Mode)
                                                                 │
                                                       Performs hardware I/O
                                                                 │
User Application <──(returns data)── Return from Trap <──────────┘
\`\`\`
- **Process Control:** \`fork()\`, \`exec()\`, \`wait()\`, \`exit()\`
- **File Manipulation:** \`open()\`, \`read()\`, \`write()\`, \`close()\`
- **Device Management:** \`ioctl()\`, \`read()\`, \`write()\`
- **Communication:** \`pipe()\`, \`shmget()\`, \`socket()\``,
      },
      {
        id: 'os-2',
        lectureNumber: 2,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L2: Process State Transition Diagram & Process Control Block (PCB)',
        duration: '22:15',
        videoId: '4VbnhpQ84Y4',
        topics: ['New, Ready, Running, Waiting, Terminated', 'PCB Structure', 'Context Switching', 'Schedulers (LTS, STS, MTS)'],
        difficulty: 'Beginner',
        starterCodes: {
          cpp: `// Process Control Block (PCB) Simulation in C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

enum ProcessState { NEW, READY, RUNNING, WAITING, TERMINATED };

struct PCB {
    int pid;
    ProcessState state;
    int programCounter;
    int cpuRegisters[4]; // General registers R0-R3
    int priority;
};

void contextSwitch(PCB& from, PCB& to) {
    cout << "== CONTEXT SWITCH ==" << endl;
    cout << "Saving CPU registers of PID " << from.pid << " into PCB..." << endl;
    from.state = READY;
    
    cout << "Loading state & Program Counter of PID " << to.pid << " from PCB..." << endl;
    to.state = RUNNING;
    cout << "PID " << to.pid << " is now RUNNING on the CPU." << endl;
}

int main() {
    PCB p1 = {101, RUNNING, 0x4002, {10, 20, 0, 0}, 1};
    PCB p2 = {102, READY, 0x8004, {5, 15, 30, 0}, 2};
    contextSwitch(p1, p2);
    return 0;
}`,
          python: `# Process Control Block (PCB) Simulation in Python
from dataclasses import dataclass, field
from typing import List

@dataclass
class PCB:
    pid: int
    state: str = "READY"
    pc: int = 0
    registers: List[int] = field(default_factory=lambda: [0, 0, 0, 0])

def context_switch(p_out: PCB, p_in: PCB):
    print("=== CONTEXT SWITCH INITIATED ===")
    print(f"1. Halting CPU. Saving registers {p_out.registers} into PCB #{p_out.pid}")
    p_out.state = "READY"
    print(f"2. Restoring PC (0x{p_in.pc:04X}) and registers from PCB #{p_in.pid}")
    p_in.state = "RUNNING"
    print(f"3. Process #{p_in.pid} dispatched to core.")

if __name__ == "__main__":
    p1 = PCB(pid=1, state="RUNNING", pc=0x1000, registers=[42, 10, 0, 1])
    p2 = PCB(pid=2, state="READY", pc=0x2500, registers=[99, 12, 4, 0])
    context_switch(p1, p2)`,
        },
        detailedNotes: `### Lecture 2: Process Management & PCB

#### 1. Process vs Program
- **Program:** Passive entity stored on disk (executable file \`a.out\`).
- **Process:** Active entity; a program in execution with associated resources (Program Counter, Stack, Heap, Data, Text).

#### 2. Process State Transition Diagram
\`\`\`
       [New] ──(Admit)──> [Ready] <──(Timeout / Preemption)── [Running] ──(Exit)──> [Terminated]
                             ^                                    │
                             │                                    │ (I/O or Event Wait)
                             └──────(I/O Complete / Event)────── [Waiting]
\`\`\`

#### 3. Process Control Block (PCB)
The PCB is the data structure stored in OS kernel memory representing a process:
- **Process ID (PID)**
- **Process State** (New, Ready, Running, Waiting, Terminated)
- **Program Counter (PC):** Address of the next instruction to execute
- **CPU Registers:** Accumulator, index registers, stack pointer
- **CPU-Scheduling Information:** Priority, scheduling queue pointers
- **Memory-Management Information:** Page tables, segment tables
- **Accounting & I/O Status:** CPU time used, list of open files

#### 4. Context Switching Overhead
Context Switching is the process of saving the state of the old process and loading the saved state of the new process. **Context switch time is pure overhead** because the system does no useful work while switching. Typically takes 1 to 10 microseconds.`,
      },
      {
        id: 'os-3',
        lectureNumber: 3,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L3: CPU Scheduling Algorithms (FCFS, SJF, Round Robin & Priority)',
        duration: '29:50',
        videoId: 'ewA_j81z2Z8',
        topics: ['Gantt Chart', 'Turnaround Time & Waiting Time', 'FCFS Convoy Effect', 'SJF / SRTF Starvation', 'Round Robin Quantum Tuning'],
        difficulty: 'Intermediate',
        starterCodes: {
          cpp: `// Round Robin CPU Scheduling Simulation in C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Process {
    int pid;
    int burstTime;
    int remainingTime;
    int waitingTime;
    int turnaroundTime;
};

void roundRobinScheduling(vector<Process>& procs, int timeQuantum) {
    int time = 0;
    queue<int> q;
    for (int i = 0; i < procs.size(); i++) q.push(i);

    while (!q.empty()) {
        int idx = q.front();
        q.pop();

        if (procs[idx].remainingTime > timeQuantum) {
            time += timeQuantum;
            procs[idx].remainingTime -= timeQuantum;
            q.push(idx);
        } else {
            time += procs[idx].remainingTime;
            procs[idx].waitingTime = time - procs[idx].burstTime;
            procs[idx].turnaroundTime = time;
            procs[idx].remainingTime = 0;
            cout << "Process P" << procs[idx].pid << " finished at time " << time << endl;
        }
    }
}

int main() {
    vector<Process> p = {{1, 10, 10, 0, 0}, {2, 5, 5, 0, 0}, {3, 8, 8, 0, 0}};
    roundRobinScheduling(p, 4);
    return 0;
}`,
          python: `# Round Robin CPU Scheduling Simulation in Python
from collections import deque

def round_robin(processes, quantum):
    queue = deque(processes)
    time = 0
    results = {}

    while queue:
        pid, burst, remaining = queue.popleft()
        if remaining > quantum:
            time += quantum
            queue.append((pid, burst, remaining - quantum))
        else:
            time += remaining
            tat = time
            wt = tat - burst
            results[pid] = {"TAT": tat, "WT": wt}
            print(f"P{pid} finished at t={time} | TAT={tat}, WT={wt}")

    avg_wt = sum(r["WT"] for r in results.values()) / len(results)
    print(f"Average Waiting Time: {avg_wt:.2f} ms")

if __name__ == "__main__":
    # (PID, BurstTime, RemainingTime)
    procs = [(1, 10, 10), (2, 5, 5), (3, 8, 8)]
    round_robin(procs, quantum=4)`,
        },
        detailedNotes: `### Lecture 3: CPU Scheduling Algorithms

#### 1. Core Scheduling Formulas
- **Completion Time (CT):** Time at which process completes execution.
- **Turnaround Time (TAT):** \`TAT = Completion Time - Arrival Time\`
- **Waiting Time (WT):** \`Waiting Time = Turnaround Time - Burst Time\`
- **Response Time (RT):** Time from arrival to first time CPU is allocated.

#### 2. Comparison Matrix of Scheduling Algorithms

| Algorithm | Preemptive? | Optimal For | Major Drawback |
| :--- | :--- | :--- | :--- |
| **FCFS** | No | Simple batch systems | **Convoy Effect:** Short processes stuck behind long CPU-bound process |
| **SJF (Shortest Job First)** | No | Minimizing average waiting time | **Cannot predict future burst time; Starvation** of long jobs |
| **SRTF (Preemptive SJF)** | Yes | Shortest average waiting time | Starvation of long jobs, higher context switch overhead |
| **Round Robin (RR)** | Yes | Time-sharing systems / Interactive | Dependent on Quantum: too small = high overhead; too large = FCFS |
| **Priority Scheduling** | Both | Critical task priority | **Starvation (Defeated via Aging: gradually increasing priority)** |

#### 3. Tuning the Time Quantum in Round Robin
- Rule of thumb: **80% of CPU bursts should be shorter than the time quantum.**
- Typical quantum in modern OS: **10 to 100 milliseconds.**`,
      },
      {
        id: 'os-4',
        lectureNumber: 4,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L4: Process Synchronization & Critical Section Problem',
        duration: '24:18',
        videoId: 'l4p3F6P_yXg',
        topics: ['Race Conditions', 'Critical Section 3 Requirements', 'Peterson’s Solution Proof', 'Hardware Atomic TestAndSet'],
        difficulty: 'Intermediate',
        starterCodes: {
          cpp: `// Peterson's Algorithm for 2-Process Mutual Exclusion in C++
#include <iostream>
#include <atomic>
using namespace std;

bool flag[2] = {false, false};
int turn = 0;

void processEntry(int i) {
    int j = 1 - i;
    flag[i] = true;
    turn = j;
    // Busy wait: wait while other process wants to enter and it's their turn
    while (flag[j] && turn == j) {
        // Spin-lock wait
    }
}

void processExit(int i) {
    flag[i] = false;
}

int main() {
    cout << "Peterson's Algorithm satisfies Mutual Exclusion, Progress, and Bounded Waiting." << endl;
    return 0;
}`,
          python: `# Race Condition Demonstration in Python
import threading

counter = 0

def worker():
    global counter
    for _ in range(100000):
        # Non-atomic increment: read, modify, write
        counter += 1

threads = [threading.Thread(target=worker) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()

print(f"Final counter: {counter} (Expected: 200000, shows race condition without mutex)")`,
        },
        detailedNotes: `### Lecture 4: Process Synchronization

#### 1. What is a Race Condition?
A situation where several processes access and manipulate the same shared data concurrently, and the outcome depends on the particular order in which the access takes place.

#### 2. The Critical Section Problem
A code segment where shared variables/resources are accessed. A valid synchronization solution **MUST satisfy 3 requirements:**
1. **Mutual Exclusion (Mandatory):** If process P is executing in its critical section, no other process can execute in theirs.
2. **Progress (Mandatory):** If no process is in its critical section and some wish to enter, only those not in remainder section can participate in the decision. Selection cannot be postponed indefinitely.
3. **Bounded Waiting (Mandatory):** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter.

#### 3. Peterson's Solution (Software Dual-Process Algorithm)
\`\`\`cpp
// Process i:
flag[i] = true;
turn = j;
while (flag[j] && turn == j); // Wait
// === CRITICAL SECTION ===
flag[i] = false;
// === REMAINDER SECTION ===
\`\`\`
- Satisfies all 3 requirements: Mutual Exclusion, Progress, and Bounded Waiting!`,
      },
      {
        id: 'os-5',
        lectureNumber: 5,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L5: Semaphores & Classical Synchronization Problems',
        duration: '26:40',
        videoId: 'X31dEc_zPCE',
        topics: ['Wait (P) & Signal (V)', 'Counting vs Binary Semaphore', 'Producer-Consumer Problem', 'Dining Philosophers'],
        difficulty: 'Advanced',
        starterCodes: {
          cpp: `// Producer-Consumer Bounded Buffer with Semaphores
#include <iostream>
#include <vector>
using namespace std;

// Pseudo-semaphore representation
struct Semaphore {
    int value;
    void wait() {
        while (value <= 0); // busy wait or block
        value--;
    }
    void signal() {
        value++;
    }
};

int main() {
    Semaphore mutex = {1};
    Semaphore emptySlots = {5}; // Buffer size 5
    Semaphore fullSlots = {0};

    cout << "Initialized Bounded Buffer IPC: mutex=1, empty=5, full=0" << endl;
    return 0;
}`,
          python: `# Producer-Consumer Solution using Python Threading Semaphores
import threading
import time

BUFFER_SIZE = 5
buffer = []

mutex = threading.Lock()
empty_slots = threading.Semaphore(BUFFER_SIZE)
full_slots = threading.Semaphore(0)

def producer():
    for i in range(10):
        empty_slots.acquire()
        with mutex:
            buffer.append(f"item-{i}")
            print(f"Produced item-{i}. Buffer: {buffer}")
        full_slots.release()
        time.sleep(0.05)

def consumer():
    for _ in range(10):
        full_slots.acquire()
        with mutex:
            item = buffer.pop(0)
            print(f"Consumed {item}. Buffer: {buffer}")
        empty_slots.release()
        time.sleep(0.1)

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start(); t2.start()
t1.join(); t2.join()`,
        },
        detailedNotes: `### Lecture 5: Semaphores & Synchronization Problems

#### 1. Semaphore Definition (Dijkstra)
A semaphore \(S\) is an integer variable accessed only through two standard atomic operations: \`wait()\` (or \`P\`) and \`signal()\` (or \`V\`).
- \`wait(S)\`: Decrements \(S\). If \(S < 0\), the calling process blocks.
- \`signal(S)\`: Increments \(S\). If there are waiting processes, wakes one up.

#### 2. Types of Semaphores
- **Counting Semaphore:** Integer value can range over an unrestricted domain. Used to control access to a resource pool with multiple instances.
- **Binary Semaphore (Mutex):** Value can only be 0 or 1. Used for mutual exclusion.

#### 3. Producer-Consumer Solution:
\`\`\`c
// Producer:
wait(empty);
wait(mutex);
// Add item to buffer
signal(mutex);
signal(full);

// Consumer:
wait(full);
wait(mutex);
// Remove item from buffer
signal(mutex);
signal(empty);
\`\`\``,
      },
      {
        id: 'os-6',
        lectureNumber: 6,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L6: Deadlocks: Characterization & Banker’s Algorithm',
        duration: '28:10',
        videoId: '2V2FmP_4Y60',
        topics: ['Coffman 4 Conditions', 'Resource Allocation Graph', 'Banker’s Safety Algorithm', 'Deadlock Detection vs Prevention'],
        difficulty: 'Advanced',
        starterCodes: {
          cpp: `// Banker's Algorithm for Deadlock Avoidance in C++
#include <iostream>
#include <vector>
using namespace std;

bool isSafeState(int n, int m, vector<vector<int>>& alloc, vector<vector<int>>& maxM, vector<int>& avail) {
    vector<vector<int>> need(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            need[i][j] = maxM[i][j] - alloc[i][j];

    vector<bool> finish(n, false);
    vector<int> work = avail;
    vector<int> safeSeq;

    for (int count = 0; count < n; count++) {
        bool found = false;
        for (int p = 0; p < n; p++) {
            if (!finish[p]) {
                bool canAllocate = true;
                for (int j = 0; j < m; j++) {
                    if (need[p][j] > work[j]) { canAllocate = false; break; }
                }
                if (canAllocate) {
                    for (int j = 0; j < m; j++) work[j] += alloc[p][j];
                    safeSeq.push_back(p);
                    finish[p] = true;
                    found = true;
                    break;
                }
            }
        }
        if (!found) return false;
    }
    cout << "System is in SAFE STATE! Safe Sequence: ";
    for (int p : safeSeq) cout << "P" << p << " ";
    cout << endl;
    return true;
}

int main() {
    int n = 5, m = 3;
    vector<vector<int>> alloc = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}, {2, 1, 1}, {0, 0, 2}};
    vector<vector<int>> maxM = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}, {2, 2, 2}, {4, 3, 3}};
    vector<int> avail = {3, 3, 2};
    isSafeState(n, m, alloc, maxM, avail);
    return 0;
}`,
          python: `# Banker's Algorithm Implementation in Python
def bankers_algorithm(alloc, max_matrix, avail):
    n = len(alloc)
    m = len(avail)
    need = [[max_matrix[i][j] - alloc[i][j] for j in range(m)] for i in range(n)]
    work = list(avail)
    finish = [False] * n
    safe_sequence = []

    for _ in range(n):
        allocated = False
        for i in range(n):
            if not finish[i] and all(need[i][j] <= work[j] for j in range(m)):
                for j in range(m):
                    work[j] += alloc[i][j]
                safe_sequence.append(i)
                finish[i] = True
                allocated = True
                break
        if not allocated:
            return False, []

    return True, safe_sequence

if __name__ == "__main__":
    alloc = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]]
    max_m = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]]
    avail = [3, 3, 2]
    safe, seq = bankers_algorithm(alloc, max_m, avail)
    print(f"Safe: {safe}, Sequence: {[f'P{i}' for i in seq]}")`,
        },
        detailedNotes: `### Lecture 6: Deadlocks & Banker's Algorithm

#### 1. The 4 Necessary Coffman Conditions for Deadlock:
All four conditions must hold simultaneously for a deadlock to occur:
1. **Mutual Exclusion:** At least one resource must be non-shareable.
2. **Hold and Wait:** A process holding at least one resource is waiting to acquire additional resources held by others.
3. **No Preemption:** Resources cannot be preempted; released only voluntarily.
4. **Circular Wait:** There exists a set \(\{P_0, P_1, \dots, P_n\}\) such that \(P_0\) waits for resource held by \(P_1\), and \(P_n\) waits for \(P_0\).

#### 2. Banker's Algorithm Formula
\`\`\`
Need[i][j] = Max[i][j] - Allocation[i][j]
\`\`\`
- If \(\text{Need}[i] \le \text{Work}\), the system can safely satisfy process \(P_i\). When \(P_i\) finishes, it releases all allocated resources:
\`\`\`
Work = Work + Allocation[i]
\`\`\``,
      },
      {
        id: 'os-7',
        lectureNumber: 7,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L7: Memory Management: Paging, Page Tables, TLB & Segmentation',
        duration: '27:35',
        videoId: 'pJ6qrCB8pZw',
        topics: ['Logical vs Physical Address', 'Page Size & Offset Calculation', 'Translation Lookaside Buffer (TLB)', 'Internal vs External Fragmentation'],
        difficulty: 'Advanced',
        starterCodes: {
          cpp: `// Paging Address Translation Simulator in C++
#include <iostream>
using namespace std;

void translateAddress(int logicalAddr, int pageSize, int pageTable[]) {
    int pageNumber = logicalAddr / pageSize;
    int offset = logicalAddr % pageSize;
    int frameNumber = pageTable[pageNumber];
    int physicalAddr = (frameNumber * pageSize) + offset;

    cout << "Logical Address: " << logicalAddr << endl;
    cout << "Page Number: " << pageNumber << " | Offset: " << offset << endl;
    cout << "Mapped Frame Number: " << frameNumber << endl;
    cout << "Calculated Physical Address: " << physicalAddr << endl;
}

int main() {
    int pageTable[] = {5, 6, 1, 2}; // Page 0 -> Frame 5, etc.
    translateAddress(1024 + 50, 1024, pageTable);
    return 0;
}`,
          python: `# Paging Address Translation Simulator in Python
def translate_address(logical_addr: int, page_size: int, page_table: dict):
    page_num = logical_addr // page_size
    offset = logical_addr % page_size
    if page_num not in page_table:
        raise MemoryError(f"Segmentation / Page Fault for page {page_num}")
    frame_num = page_table[page_num]
    physical_addr = (frame_num * page_size) + offset
    print(f"Virtual: {logical_addr} (p={page_num}, d={offset}) -> Frame {frame_num} -> Physical: {physical_addr}")

if __name__ == "__main__":
    pt = {0: 5, 1: 6, 2: 1, 3: 2}
    translate_address(1074, 1024, pt)`,
        },
        detailedNotes: `### Lecture 7: Memory Management & Paging

#### 1. Why Paging?
Paging eliminates **External Fragmentation** by dividing physical memory into fixed-sized blocks called **Frames**, and logical memory into blocks of the same size called **Pages**.
- **Internal Fragmentation:** Occurs when allocated memory is larger than requested (e.g. process needs 100 bytes, allocated 4 KB page; remaining 3996 bytes wasted).
- **External Fragmentation:** Total memory space exists to satisfy request, but is non-contiguous.

#### 2. Address Translation Architecture
\`\`\`
Logical Address = [ Page Number (p) | Offset (d) ]
                          │
                   (Indexed into Page Table)
                          │
                          ▼
Physical Address = [ Frame Number (f) | Offset (d) ]
\`\`\`

#### 3. Effective Memory Access Time (EMAT) with TLB:
\`\`\`
EMAT = Hit_Ratio * (TLB_Time + Mem_Time) + (1 - Hit_Ratio) * (TLB_Time + 2 * Mem_Time)
\`\`\``,
      },
      {
        id: 'os-8',
        lectureNumber: 8,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L8: Page Replacement Algorithms: FIFO, Optimal & LRU',
        duration: '25:12',
        videoId: 'dYIoWkC_l4w',
        topics: ['Page Fault Rate', 'Belady’s Anomaly in FIFO', 'Least Recently Used (LRU)', 'Optimal / MIN Algorithm'],
        difficulty: 'Intermediate',
        starterCodes: {
          cpp: `// LRU Page Replacement in C++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

int lruPageFaults(vector<int>& pages, int capacity) {
    unordered_set<int> memory;
    unordered_map<int, int> lastUsed;
    int pageFaults = 0;

    for (int i = 0; i < pages.size(); i++) {
        int p = pages[i];
        if (memory.find(p) == memory.end()) {
            if (memory.size() == capacity) {
                // Find least recently used page
                int lru = -1, minTime = 1e9;
                for (int page : memory) {
                    if (lastUsed[page] < minTime) {
                        minTime = lastUsed[page];
                        lru = page;
                    }
                }
                memory.erase(lru);
            }
            memory.insert(p);
            pageFaults++;
        }
        lastUsed[p] = i;
    }
    return pageFaults;
}

int main() {
    vector<int> pages = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    cout << "LRU Page Faults (Cap 3): " << lruPageFaults(pages, 3) << endl; // 9
    return 0;
}`,
          python: `# LRU Page Replacement Simulation in Python
from collections import OrderedDict

def lru_page_faults(pages, capacity):
    memory = OrderedDict()
    faults = 0

    for page in pages:
        if page not in memory:
            faults += 1
            if len(memory) == capacity:
                memory.popitem(last=False) # Evict oldest (LRU)
            memory[page] = True
        else:
            memory.move_to_end(page) # Mark as recently used

    return faults

if __name__ == "__main__":
    ref = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
    print(f"LRU Page Faults: {lru_page_faults(ref, capacity=3)}") # 9`,
        },
        detailedNotes: `### Lecture 8: Page Replacement Algorithms

#### 1. Page Fault
Occurs when an executing program accesses a memory page mapped in the virtual address space but not currently loaded in physical RAM. Triggers OS trap to fetch page from swap disk.

#### 2. Belady's Anomaly
In FIFO page replacement, **increasing the number of page frames can result in an INCREASE in the number of page faults!**
- LRU and Optimal algorithms do NOT suffer from Belady's Anomaly because they are **Stack Algorithms**.

#### 3. Optimal (Bélády's MIN)
Replace the page that will not be used for the longest period of time in the future.
- Theoretical benchmark with the minimum possible page fault rate, but impossible to implement in practice because the future is unknown.`,
      },
      {
        id: 'os-9',
        lectureNumber: 9,
        subjectId: 'os',
        subjectName: 'Operating Systems',
        title: 'L9: Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN & LOOK',
        duration: '21:30',
        videoId: '9v8N9oQ4uL0',
        topics: ['Seek Time vs Rotational Latency', 'SSTF Starvation', 'Elevator Algorithm (SCAN)', 'Circular SCAN (C-SCAN)'],
        difficulty: 'Beginner',
        starterCodes: {
          cpp: `// SCAN (Elevator) Disk Scheduling in C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int scanDisk(vector<int> requests, int head, int diskSize) {
    requests.push_back(head);
    requests.push_back(diskSize - 1);
    sort(requests.begin(), requests.end());

    // Total head movement when scanning to end then back
    int maxReq = requests.back();
    int minReq = requests.front();
    return (maxReq - head) + (maxReq - minReq);
}

int main() {
    vector<int> req = {98, 183, 37, 122, 14, 124, 65, 67};
    cout << "SCAN Seek Distance: " << scanDisk(req, 53, 200) << endl;
    return 0;
}`,
          python: `# SSTF (Shortest Seek Time First) Simulation in Python
def sstf(requests, head):
    reqs = list(requests)
    cur = head
    total_movement = 0
    seq = [cur]

    while reqs:
        closest = min(reqs, key=lambda x: abs(x - cur))
        total_movement += abs(closest - cur)
        cur = closest
        seq.append(cur)
        reqs.remove(cur)

    return total_movement, seq

if __name__ == "__main__":
    req = [98, 183, 37, 122, 14, 124, 65, 67]
    dist, sequence = sstf(req, 53)
    print(f"Total Head Movement: {dist} cylinders | Path: {sequence}")`,
        },
        detailedNotes: `### Lecture 9: Disk Scheduling Algorithms

#### 1. Hard Disk Access Time Components:
- **Seek Time:** Time for read/write head to move to the destination cylinder/track. **(Dominant factor!)**
- **Rotational Latency:** Time for the platter to rotate the desired sector under the head.
- **Transfer Time:** Time to read/write the data.

#### 2. Comparison of Disk Scheduling Algorithms:
- **FCFS:** Fair, no starvation, but high head movement.
- **SSTF (Shortest Seek Time First):** Greedily selects request with minimum seek distance. Causes **starvation** for requests far from the head.
- **SCAN (Elevator Algorithm):** Head moves in one direction servicing requests until it reaches the edge of the disk, then reverses direction.
- **C-SCAN (Circular SCAN):** Moves in one direction servicing requests until the edge, then returns immediately to the beginning without servicing requests on the return trip. Provides uniform wait times.`,
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
    color: '#8B5CF6', // Purple
    playlistId: 'PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
    description:
      'Complete relational database theory: ER Modeling, Relational Algebra, Functional Dependencies, Normalization (1NF to BCNF), Transactions, ACID, Concurrency Control, and B+ Trees.',
    lecturesCount: 8,
    totalDuration: '3 hrs 20 mins',
    keyTopics: [
      '3-Schema Architecture & Data Independence',
      'ER Diagram to Relational Tables Mapping',
      'Relational Algebra Query Calculus',
      'Attribute Closure & Candidate Key Finding',
      '1NF, 2NF, 3NF & BCNF Normalization',
      'ACID Properties & Transaction States',
      'Conflict vs View Serializability',
      '2-Phase Locking (2PL) & Deadlock Handling',
      'Indexing & B / B+ Tree Operations',
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
    # 1. Physical Level (Storage on disk)
    physical_storage = {"block_0": b"\\x01Alice\\x00\\x03\\x90"}

    # 2. Logical Level (Table definition)
    schema = {"id": int, "name": str, "gpa": float}

    # 3. View Level (User customized view)
    @staticmethod
    def get_student_view():
        return {"name": "Alice", "status": "Honors"}

print(DatabaseArchitecture.get_student_view())`,
        },
        detailedNotes: `### Lecture 1: DBMS & 3-Schema Architecture

#### 1. Why DBMS over File Processing Systems?
- Eliminates **Data Redundancy and Inconsistency**.
- Enforces **Data Integrity Constraints** automatically.
- Provides **Atomicity** for transactional operations.
- Offers **Concurrent Access** with conflict control.
- Enforces **Security and Access Control**.

#### 2. Three-Schema ANSI/SPARC Architecture
1. **Physical / Internal Level:** How data is actually stored on magnetic disk (blocks, B+ trees, hashing).
2. **Conceptual / Logical Level:** What data is stored in the database, and the relationships among data (tables, columns, foreign keys).
3. **External / View Level:** What individual end-users see (views, permissions).

#### 3. Data Independence
- **Physical Data Independence:** The capacity to change the internal schema (e.g., adding an index or moving from HDD to SSD) without having to change the logical schema.
- **Logical Data Independence:** The capacity to change the logical schema (e.g., adding a new column) without having to change external schemas or application programs.`,
      },
      {
        id: 'dbms-2',
        lectureNumber: 2,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L2: Functional Dependencies & Finding Candidate Keys',
        duration: '24:10',
        videoId: 'g_33w7l4y6s',
        topics: ['Armstrong Axioms', 'Attribute Closure Algorithm', 'Super Key vs Candidate Key vs Primary Key'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Attribute Closure Algorithm in Python
def attribute_closure(attributes, functional_deps):
    closure = set(attributes)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in functional_deps:
            if set(lhs).issubset(closure) and not set(rhs).issubset(closure):
                closure.update(rhs)
                changed = True
    return sorted(list(closure))

if __name__ == "__main__":
    # Relation R(A, B, C, D, E)
    # F = {A -> B, B -> C, C -> D}
    fds = [(['A'], ['B']), (['B'], ['C']), (['C'], ['D'])]
    print("A+ Closure:", attribute_closure(['A'], fds)) # ['A', 'B', 'C', 'D']`,
        },
        detailedNotes: `### Lecture 2: Functional Dependencies & Keys

#### 1. Functional Dependency Definition
Given relation \(R\), a functional dependency \(\alpha \rightarrow \beta\) means that whenever two tuples agree on attributes \(\alpha\), they MUST agree on attributes \(\beta\).

#### 2. Armstrong's Axioms (Sound and Complete)
- **Reflexivity:** If \(\beta \subseteq \alpha\), then \(\alpha \rightarrow \beta\).
- **Augmentation:** If \(\alpha \rightarrow \beta\), then \(\alpha\gamma \rightarrow \beta\gamma\).
- **Transitivity:** If \(\alpha \rightarrow \beta\) and \(\beta \rightarrow \gamma\), then \(\alpha \rightarrow \gamma\).

#### 3. How to Find Candidate Keys:
1. Identify all attributes that never appear on the Right-Hand Side (RHS) of any FD. These **MUST** be part of every candidate key!
2. Compute the attribute closure of these essential attributes.
3. If closure equals all attributes of the relation, it is the unique minimal candidate key.
4. If not, combine with other attributes and test for closure.`,
      },
      {
        id: 'dbms-3',
        lectureNumber: 3,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L3: Normalization Masterclass: 1NF, 2NF, 3NF & BCNF',
        duration: '31:40',
        videoId: 'UrYLYV7WSHM',
        topics: ['Insertion, Deletion & Update Anomalies', 'Partial Dependency', 'Transitive Dependency', 'BCNF vs 3NF Tradeoffs'],
        difficulty: 'Advanced',
        starterCodes: {
          sql: `-- Demonstration of 3NF Normalized Tables
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    dept_id INT REFERENCES Departments(dept_id)
);`,
        },
        detailedNotes: `### Lecture 3: Normalization (1NF, 2NF, 3NF, BCNF)

#### 1. The Normal Forms Hierarchy
\`\`\`
1NF ──> 2NF ──> 3NF ──> BCNF (Boyce-Codd Normal Form)
\`\`\`

#### 2. Rules for Each Normal Form:
- **1NF (First Normal Form):** All attribute values must be **atomic** (no multi-valued or composite attributes).
- **2NF (Second Normal Form):** Must be in 1NF and **NO Partial Dependency** exists (no non-prime attribute depends on a proper subset of any candidate key).
- **3NF (Third Normal Form):** Must be in 2NF and **NO Transitive Dependency** exists. For every non-trivial FD \(\alpha \rightarrow \beta\):
  - Either \(\alpha\) is a **Super Key**, OR
  - \(\beta\) is a **Prime Attribute** (part of some candidate key).
- **BCNF (Boyce-Codd Normal Form):** Stricter than 3NF. For every non-trivial FD \(\alpha \rightarrow \beta\):
  - \(\alpha\) MUST be a **Super Key**!`,
      },
      {
        id: 'dbms-4',
        lectureNumber: 4,
        subjectId: 'dbms',
        subjectName: 'DBMS',
        title: 'L4: Transactions, ACID Properties & Concurrency Control',
        duration: '26:15',
        videoId: 'P80im_gHh8w',
        topics: ['ACID Definitions', 'Dirty Read, Unrepeatable Read, Phantom Read', 'Conflict Serializability', 'Two-Phase Locking (2PL)'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# ACID Transaction Simulator in Python
class BankDatabase:
    def __init__(self):
        self.accounts = {"Alice": 500, "Bob": 200}

    def transfer(self, from_user, to_user, amount):
        print(f"--- BEGIN TRANSACTION: Transfer {amount} from {from_user} to {to_user} ---")
        snapshot = dict(self.accounts) # Rollback point
        try:
            if self.accounts[from_user] < amount:
                raise ValueError("Insufficient balance!")
            self.accounts[from_user] -= amount
            self.accounts[to_user] += amount
            print("--- COMMIT TRANSACTION: Success ---")
        except Exception as e:
            print(f"--- ROLLBACK TRANSACTION: {e} ---")
            self.accounts = snapshot

db = BankDatabase()
db.transfer("Alice", "Bob", 100)
db.transfer("Alice", "Bob", 1000) # Fails and rolls back
print("Final balances:", db.accounts)`,
        },
        detailedNotes: `### Lecture 4: Transactions & Concurrency Control

#### 1. ACID Properties:
- **Atomicity:** All operations in the transaction succeed, or none do (All-or-Nothing). Managed by the **Recovery Manager (Write-Ahead Logging)**.
- **Consistency:** Database transitions from one valid state to another, preserving all integrity constraints.
- **Isolation:** Concurrent transactions execute without interfering with one another. Managed by the **Concurrency Control Manager**.
- **Durability:** Once committed, changes survive even system crashes. Managed by the **Recovery Manager (Non-volatile storage)**.

#### 2. Two-Phase Locking (2PL):
- **Growing Phase:** Locks may be acquired, but none released.
- **Shrinking Phase:** Locks may be released, but none acquired.
- **Strict 2PL:** Holds all Exclusive (X) locks until transaction commits or aborts to guarantee **Cascadeless Recoverability**.`,
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
    color: '#06B6D4', // Cyan
    playlistId: 'PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
    description:
      'The entire packet transmission journey: OSI 7-Layer model, CRC Error Detection, Go-Back-N, IPv4 Subnetting & CIDR, Dijkstra Routing, TCP 3-Way Handshake, and HTTP/3.',
    lecturesCount: 8,
    totalDuration: '3 hrs 35 mins',
    keyTopics: [
      'OSI 7 Layers vs TCP/IP Protocol Stack',
      'Cyclic Redundancy Check (CRC) Polynomial Math',
      'Flow Control: Stop & Wait vs Go-Back-N vs Selective Repeat',
      'CSMA/CD & Exponential Backoff Algorithm',
      'IPv4 Subnetting, Network ID & Broadcast ID',
      'Distance Vector vs Link State Routing (Dijkstra)',
      'TCP 3-Way Handshake & Flow Control Window',
      'TCP Congestion Control (Slow Start & AIMD)',
    ],
    lectures: [
      {
        id: 'cn-1',
        lectureNumber: 1,
        subjectId: 'cn',
        subjectName: 'Computer Networks',
        title: 'L1: OSI 7-Layer Model & TCP/IP Architecture',
        duration: '20:10',
        videoId: 'vv4y_uOneC0',
        topics: ['Application, Presentation, Session, Transport, Network, Data Link, Physical', 'PDU: Data, Segment, Packet, Frame, Bits'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Protocol Data Unit (PDU) Encapsulation Demonstration
def encapsulate_http_message(message: str) -> dict:
    l7_data = f"HTTP/1.1 200 OK\\r\\nContent: {message}"
    l4_segment = f"[TCP Port 80 -> 54321] {l7_data}"
    l3_packet = f"[IP 192.168.1.10 -> 10.0.0.1] {l4_segment}"
    l2_frame = f"[MAC AA:BB:CC:DD -> EE:FF:00:11] {l3_packet} [CRC32 Checksum]"
    l1_bits = "".join(f"{ord(c):08b}" for c in l2_frame[:10]) + "..."
    return {"Application": l7_data, "Transport": l4_segment, "Network": l3_packet, "DataLink": l2_frame, "Physical": l1_bits}

print(encapsulate_http_message("Hello Multi-Platform Web!"))`,
        },
        detailedNotes: `### Lecture 1: OSI 7-Layer Model

#### 1. The 7 Layers and their PDUs:
1. **Application (Layer 7):** Network services for apps (\`HTTP\`, \`DNS\`, \`FTP\`). PDU: **Data**.
2. **Presentation (Layer 6):** Data translation, encryption, compression (\`TLS\`, \`JPEG\`, \`ASCII\`).
3. **Session (Layer 5):** Dialog control and synchronization checkpoints.
4. **Transport (Layer 4):** End-to-end connection, port addressing, segmentation (\`TCP\`, \`UDP\`). PDU: **Segment**.
5. **Network (Layer 3):** Logical addressing and shortest path routing (\`IP\`, \`ICMP\`, \`OSPF\`). PDU: **Packet**.
6. **Data Link (Layer 2):** Framing, MAC physical addressing, hop-to-hop delivery, error detection. PDU: **Frame**.
7. **Physical (Layer 1):** Unstructured transmission of raw bits over cable, fiber, or air. PDU: **Bits**.`,
      },
      {
        id: 'cn-2',
        lectureNumber: 2,
        subjectId: 'cn',
        subjectName: 'Computer Networks',
        title: 'L2: IPv4 Addressing, Subnetting & CIDR Calculation',
        duration: '27:50',
        videoId: 's_Ntd04nS8c',
        topics: ['Classful vs CIDR Notation', 'Subnet Mask', 'Number of Usable Hosts', 'Network ID & Broadcast ID'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# IPv4 Subnet Calculator in Python
import ipaddress

def inspect_subnet(cidr: str):
    net = ipaddress.IPv4Network(cidr, strict=False)
    print(f"CIDR: {cidr}")
    print(f"Network ID: {net.network_address}")
    print(f"Broadcast ID: {net.broadcast_address}")
    print(f"Subnet Mask: {net.netmask}")
    print(f"Total Usable Hosts: {net.num_addresses - 2}")

if __name__ == "__main__":
    inspect_subnet("192.168.1.130/26")`,
        },
        detailedNotes: `### Lecture 2: IPv4 Subnetting & CIDR

#### 1. IPv4 Address Structure
An IPv4 address is 32 bits divided into 4 octets separated by dots (e.g. \`192.168.1.1\`).
- In CIDR \`/24\`: 24 bits are Network Bits, 8 bits are Host Bits.
- Number of Total IP Addresses = \(2^{(32 - \text{prefix})}\)
- Number of Usable Host IPs = \(2^{(32 - \text{prefix})} - 2\) (subtract Network ID and Directed Broadcast ID).

#### 2. Calculation Steps for \`192.168.1.130/26\`:
- Host bits \(h = 32 - 26 = 6\) bits.
- Block size = \(2^6 = 64\).
- Subnets:
  - 1st: \`192.168.1.0\` to \`192.168.1.63\`
  - 2nd: \`192.168.1.64\` to \`192.168.1.127\`
  - 3rd: \`192.168.1.128\` to \`192.168.1.191\` -> **Our IP falls here!**
- Network ID = \`192.168.1.128\`
- Broadcast ID = \`192.168.1.191\`
- Usable Host Range = \`192.168.1.129\` - \`192.168.1.190\` (62 hosts).`,
      },
      {
        id: 'cn-3',
        lectureNumber: 3,
        subjectId: 'cn',
        subjectName: 'Computer Networks',
        title: 'L3: TCP 3-Way Handshake & Congestion Control (AIMD)',
        duration: '28:30',
        videoId: 'F27PLNigTjw',
        topics: ['SYN, SYN-ACK, ACK', 'Connection Teardown FIN-ACK', 'Slow Start & Congestion Avoidance', 'Fast Retransmit & Fast Recovery'],
        difficulty: 'Advanced',
        starterCodes: {
          cpp: `// TCP 3-Way Handshake Handshake Simulator in C++
#include <iostream>
using namespace std;

void tcpHandshake(uint32_t clientISN, uint32_t serverISN) {
    cout << "[Step 1] Client -> Server: SYN (seq = " << clientISN << ")" << endl;
    cout << "[Step 2] Server -> Client: SYN-ACK (seq = " << serverISN << ", ack = " << clientISN + 1 << ")" << endl;
    cout << "[Step 3] Client -> Server: ACK (seq = " << clientISN + 1 << ", ack = " << serverISN + 1 << ")" << endl;
    cout << "== TCP CONNECTION ESTABLISHED ==" << endl;
}

int main() {
    tcpHandshake(1000, 5000);
    return 0;
}`,
        },
        detailedNotes: `### Lecture 3: TCP Handshake & Congestion Control

#### 1. TCP 3-Way Handshake
\`\`\`
Client                                          Server
  │                 1. SYN (seq=x)                 │
  ├───────────────────────────────────────────────>│
  │                                                │
  │            2. SYN-ACK (seq=y, ack=x+1)         │
  │<───────────────────────────────────────────────┤
  │                                                │
  │                 3. ACK (ack=y+1)               │
  ├───────────────────────────────────────────────>│
\`\`\`

#### 2. TCP Congestion Control Stages:
1. **Slow Start:** Congestion Window (cwnd) starts at 1 MSS and doubles every RTT (\(1 \rightarrow 2 \rightarrow 4 \rightarrow 8\)).
2. **Congestion Avoidance:** When cwnd reaches Slow Start Threshold (ssthresh), switches to Additive Increase (+1 MSS per RTT).
3. **Triple Duplicate ACK (Packet Loss):**
   - \`ssthresh = cwnd / 2\`
   - \`cwnd = ssthresh\` (Fast Recovery)
4. **Timeout:**
   - \`ssthresh = cwnd / 2\`
   - \`cwnd = 1 MSS\` (Resets to Slow Start)`,
      },
    ],
  },

  // =========================================================================
  // 4. SYSTEM DESIGN (HIGH-LEVEL DESIGN / HLD)
  // =========================================================================
  {
    id: 'system-design',
    title: 'System Design (HLD)',
    code: 'SYS 401',
    category: 'Architecture & Scalability',
    instructor: 'Gaurav Sen (InterviewReady)',
    icon: '🏗️',
    color: '#FFDE59', // Amber
    playlistId: 'PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    description:
      'Design large-scale distributed systems: Horizontal Scaling, Load Balancing, Consistent Hashing, Caching (Redis), Sharding, Message Queues (Kafka), TinyURL, and WhatsApp Architecture.',
    lecturesCount: 8,
    totalDuration: '3 hrs 10 mins',
    keyTopics: [
      'Vertical vs Horizontal Scaling & Bottlenecks',
      'Consistent Hashing & Virtual Nodes',
      'Caching Strategies: Eviction, Write-Through & Write-Back',
      'Database Sharding & Partitioning Strategies',
      'CAP Theorem & PACELC Tradeoffs',
      'Message Queues & Event-Driven Architecture (Kafka)',
      'Designing TinyURL (URL Shortener) with Base62',
      'Designing Real-Time Chat (WhatsApp / Slack) with WebSockets',
    ],
    lectures: [
      {
        id: 'sd-1',
        lectureNumber: 1,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L1: Horizontal Scaling, Load Balancing & Consistent Hashing',
        duration: '22:30',
        videoId: 'zaRkONvyGr8',
        topics: ['Modulo Hashing vs Consistent Hashing', 'Hash Ring & Virtual Nodes', 'Load Balancers (Layer 4 vs Layer 7)'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Consistent Hashing Implementation in Python with Virtual Nodes
import hashlib
import bisect

class ConsistentHashRing:
    def __init__(self, replicas=3):
        self.replicas = replicas
        self.ring = []
        self.node_map = {}

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node: str):
        for i in range(self.replicas):
            v_key = f"{node}#v{i}"
            h = self._hash(v_key)
            bisect.insort(self.ring, h)
            self.node_map[h] = node

    def get_node(self, key: str) -> str:
        if not self.ring: return None
        h = self._hash(key)
        idx = bisect.bisect_right(self.ring, h)
        if idx == len(self.ring): idx = 0
        return self.node_map[self.ring[idx]]

if __name__ == "__main__":
    ring = ConsistentHashRing()
    ring.add_node("cache-server-1")
    ring.add_node("cache-server-2")
    ring.add_node("cache-server-3")
    print("User user_42 routed to:", ring.get_node("user_42"))`,
        },
        detailedNotes: `### Lecture 1: Consistent Hashing & Load Balancing

#### 1. Why Standard Modulo Hashing Fails at Scale:
With standard \`server = hash(key) % N\`, when a server is added or removed (\(N \rightarrow N+1\)), almost **every existing key rehashes** to a different server! This causes a catastrophic cache stampede.

#### 2. Consistent Hashing Solution:
- Both servers and keys are hashed onto a circular ring \([0 \dots 2^{32} - 1]\).
- A key is mapped to the **first server clockwise on the ring**.
- When a server is added or removed, only \(\frac{1}{N}\) of the keys need to be remapped on average!
- **Virtual Nodes:** Adding multiple replica points for each physical node ensures uniform distribution and eliminates hot spots.`,
      },
      {
        id: 'sd-2',
        lectureNumber: 2,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L2: Caching Strategies, Eviction & Redis Architecture',
        duration: '24:15',
        videoId: 'U3RkDLtS7uY',
        topics: ['Cache-Aside vs Read-Through vs Write-Through vs Write-Back', 'Cache Penetration, Breakdown, Avalanche', 'LRU & LFU Eviction'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Cache-Aside Pattern Implementation
class CacheAsideService:
    def __init__(self):
        self.cache = {}
        self.database = {"item_1": "Widget A", "item_2": "Widget B"}

    def get_item(self, item_id: str) -> str:
        if item_id in self.cache:
            print(f"[CACHE HIT] Returning {item_id} from Redis cache")
            return self.cache[item_id]
        
        print(f"[CACHE MISS] Fetching {item_id} from primary DB...")
        val = self.database.get(item_id, None)
        if val:
            self.cache[item_id] = val
        return val

svc = CacheAsideService()
svc.get_item("item_1") # Miss
svc.get_item("item_1") # Hit`,
        },
        detailedNotes: `### Lecture 2: Caching Strategies

#### 1. Caching Invalidation Patterns:
- **Cache-Aside:** Application reads from cache; if miss, reads from DB and writes to cache. Application is responsible for cache coherence.
- **Write-Through:** Application writes to cache, which synchronously writes to DB before acknowledging. Strong consistency, higher latency.
- **Write-Back (Write-Behind):** Application writes to cache and acknowledges immediately. Cache asynchronously batches writes to DB. Extremely fast, but risk of data loss on cache crash.

#### 2. The 3 Classic Cache Failures:
1. **Cache Penetration:** Requests for non-existent keys bypass cache and hit DB directly. *Fix: Bloom Filters or caching null values.*
2. **Cache Breakdown:** Hot key with high traffic expires. Hundreds of requests hit DB simultaneously. *Fix: Mutex locks on cache miss.*
3. **Cache Avalanche:** Many cache keys expire at the same exact time. *Fix: Add random jitter to TTL.*`,
      },
      {
        id: 'sd-3',
        lectureNumber: 3,
        subjectId: 'system-design',
        subjectName: 'System Design',
        title: 'L3: Designing TinyURL (URL Shortener) with Base62',
        duration: '28:40',
        videoId: 'fMZMm_0ZhK4',
        topics: ['Base62 Encoding', 'UUID vs Counter vs Pre-generated Keys (KGS)', 'Capacity Estimation', '301 vs 302 Redirect'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Base62 Bijective Encoder for URL Shorteners
BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode_base62(num: int) -> str:
    if num == 0: return BASE62[0]
    res = []
    while num > 0:
        res.append(BASE62[num % 62])
        num //= 62
    return "".join(reversed(res))

def decode_base62(s: str) -> int:
    num = 0
    for char in s:
        num = num * 62 + BASE62.index(char)
    return num

if __name__ == "__main__":
    short_hash = encode_base62(1000000000)
    print(f"ID 1,000,000,000 -> TinyURL: https://tiny.url/{short_hash}")
    print(f"Decoded ID: {decode_base62(short_hash)}")`,
        },
        detailedNotes: `### Lecture 3: Designing TinyURL (URL Shortener)

#### 1. Capacity Estimation (Back-of-the-Envelope):
- **Write Traffic:** 100 Million URLs created per month \(\approx 40 \text{ writes/sec}\).
- **Read Traffic:** 100:1 read-to-write ratio \(\approx 4,000 \text{ reads/sec}\).
- **Storage for 5 Years:** 100M \(\times 12 \times 5 = 6 \text{ Billion URLs}\).
- With Base62 \([0-9, a-z, A-Z]\), a 7-character string provides \(62^7 \approx 3.5 \text{ Trillion URLs}\), which is plenty!

#### 2. Key Generation Architecture (KGS):
Instead of hashing at write time, use a **Key Generation Service (KGS)** that pre-generates random 7-character Base62 keys in advance and stores them in memory/DB. When a user creates a shortened URL, simply grab an unused key instantly without collisions!`,
      },
    ],
  },

  // =========================================================================
  // 5. LOW-LEVEL DESIGN & OOPS (LLD)
  // =========================================================================
  {
    id: 'lld',
    title: 'Low-Level Design & OOPs (LLD)',
    code: 'LLD 301',
    category: 'Clean Code & Machine Coding',
    instructor: 'Concept && Coding (Shrayansh Jain)',
    icon: '🧩',
    color: '#F43F5E', // Rose
    playlistId: 'PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_KS28vTrDD5sRhBABJS6',
    description:
      'Master Object-Oriented Design for technical machine-coding rounds: 4 OOPs Pillars, SOLID Principles, GoF Design Patterns (Factory, Strategy, Observer, Decorator), and real systems like Parking Lot and Tic-Tac-Toe.',
    lecturesCount: 6,
    totalDuration: '2 hrs 50 mins',
    keyTopics: [
      'OOPs Pillars (Encapsulation, Polymorphism, Inheritance, Abstraction)',
      'SOLID Principles with Code Refactoring',
      'Strategy Design Pattern (Composition over Inheritance)',
      'Observer Design Pattern (Event-Driven State Changes)',
      'Factory & Abstract Factory Pattern',
      'Machine Coding Case Study: Parking Lot System',
    ],
    lectures: [
      {
        id: 'lld-1',
        lectureNumber: 1,
        subjectId: 'lld',
        subjectName: 'Low-Level Design',
        title: 'L1: SOLID Principles with Practical Code Refactoring',
        duration: '25:10',
        videoId: 'E4g9a6y8gG8',
        topics: ['Single Responsibility (S)', 'Open/Closed (O)', 'Liskov Substitution (L)', 'Interface Segregation (I)', 'Dependency Inversion (D)'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# SOLID: Open-Closed & Dependency Inversion in Python
from abc import ABC, abstractmethod

# Open-Closed: Open for extension, closed for modification
class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount: float):
        pass

class CreditCardPayment(PaymentMethod):
    def pay(self, amount: float):
        print(f"Paid \${amount} via Credit Card.")

class CryptoPayment(PaymentMethod):
    def pay(self, amount: float):
        print(f"Paid \${amount} via Bitcoin.")

# Dependency Inversion: Depend on abstractions, not concretions
class CheckoutService:
    def __init__(self, payment_method: PaymentMethod):
        self.payment_method = payment_method

    def process_order(self, amount: float):
        self.payment_method.pay(amount)

if __name__ == "__main__":
    service = CheckoutService(CryptoPayment())
    service.process_order(150.00)`,
        },
        detailedNotes: `### Lecture 1: SOLID Principles

#### The 5 Pillars of Clean Object-Oriented Architecture:
1. **S - Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change.
2. **O - Open/Closed Principle (OCP):** Software entities should be open for extension, but closed for modification. (Use polymorphism and interfaces!).
3. **L - Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering program correctness.
4. **I - Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. Split fat interfaces into smaller, cohesive ones.
5. **D - Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions.`,
      },
      {
        id: 'lld-2',
        lectureNumber: 2,
        subjectId: 'lld',
        subjectName: 'Low-Level Design',
        title: 'L2: Strategy Design Pattern (Composition over Inheritance)',
        duration: '19:40',
        videoId: 'w6a9b4s8kL0',
        topics: ['Inheritance Drawbacks', 'Dynamic Behavioral Switching', 'Duck Strategy Example'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Strategy Pattern: Dynamic Drive Behavior
from abc import ABC, abstractmethod

class DriveStrategy(ABC):
    @abstractmethod
    def drive(self): pass

class NormalDrive(DriveStrategy):
    def drive(self): print("Normal drive capability.")

class SportsDrive(DriveStrategy):
    def drive(self): print("Special sports drive capability with turbo!")

class Vehicle:
    def __init__(self, strategy: DriveStrategy):
        self.strategy = strategy

    def drive(self):
        self.strategy.drive()

if __name__ == "__main__":
    sedan = Vehicle(NormalDrive())
    ferrari = Vehicle(SportsDrive())
    sedan.drive()
    ferrari.drive()`,
        },
        detailedNotes: `### Lecture 2: Strategy Design Pattern

#### 1. The Problem with Pure Inheritance:
When sibling subclasses share common functionality that their parent class does not possess, traditional inheritance leads to code duplication across subclasses.

#### 2. The Solution:
Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.`,
      },
    ],
  },

  // =========================================================================
  // 6. COMPUTER ORGANIZATION & ARCHITECTURE (COA)
  // =========================================================================
  {
    id: 'coa',
    title: 'Computer Organization & Architecture (COA)',
    code: 'CS 202',
    category: 'Hardware & Systems',
    instructor: 'Gate Smashers',
    icon: '⚡',
    color: '#3B82F6', // Blue
    playlistId: 'PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX',
    description:
      'Understanding modern hardware execution: Von Neumann Architecture, Instruction Cycles, Addressing Modes, Cache Mapping (Direct/Associative), and Instruction Pipelining Hazards.',
    lecturesCount: 4,
    totalDuration: '1 hr 45 mins',
    keyTopics: [
      'Von Neumann vs Harvard Architecture',
      'Instruction Cycle (Fetch, Decode, Execute)',
      'Addressing Modes (Immediate, Direct, Register, Indirect)',
      'Cache Mapping: Direct, Associative & Set-Associative',
      'Pipelining & Hazards (Structural, Data, Control)',
    ],
    lectures: [
      {
        id: 'coa-1',
        lectureNumber: 1,
        subjectId: 'coa',
        subjectName: 'Computer Organization',
        title: 'L1: Cache Memory Mapping (Direct, Associative, Set-Associative)',
        duration: '24:30',
        videoId: 's8q7k6m2p4A',
        topics: ['Cache Lines & Blocks', 'Tag, Set/Line, Word/Offset Bits', 'Cache Hit Ratio & Speedup'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Cache Memory Address Breakdown Calculator in Python
import math

def calculate_cache_bits(main_mem_size_bytes: int, cache_size_bytes: int, block_size_bytes: int, k_way: int = 1):
    total_addr_bits = int(math.log2(main_mem_size_bytes))
    word_bits = int(math.log2(block_size_bytes))
    num_blocks = cache_size_bytes // block_size_bytes
    num_sets = num_blocks // k_way
    set_bits = int(math.log2(num_sets))
    tag_bits = total_addr_bits - set_bits - word_bits

    print(f"Total Address: {total_addr_bits} bits")
    print(f"Breakdown: Tag = {tag_bits} bits | Set = {set_bits} bits | Word = {word_bits} bits")

if __name__ == "__main__":
    # Example: 64 MB RAM, 64 KB 4-way set associative cache, 64-byte block
    calculate_cache_bits(64 * 1024 * 1024, 64 * 1024, 64, k_way=4)`,
        },
        detailedNotes: `### Lecture 1: Cache Memory Mapping

#### 1. Why Cache Memory?
Cache bridges the speed gap between high-speed CPU registers and relatively slow DRAM main memory, leveraging **Temporal Locality** (recently referenced items) and **Spatial Locality** (items near recently referenced items).

#### 2. Mapping Techniques:
- **Direct Mapping:** Each main memory block maps to exactly one cache line: \`line = (block_number) mod (total_lines)\`. Fast, but high conflict misses.
- **Fully Associative:** A memory block can be placed in any cache line. Eliminates conflict misses, but requires expensive hardware comparators.
- **K-Way Set Associative:** Compromise. Cache divided into sets of \(k\) lines. Block maps to a specific set, and can reside in any line within that set.`,
      },
    ],
  },

  // =========================================================================
  // 7. THEORY OF COMPUTATION (TOC / AUTOMATA)
  // =========================================================================
  {
    id: 'toc',
    title: 'Theory of Computation (TOC)',
    code: 'CS 401',
    category: 'Theoretical Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '⚙️',
    color: '#6366F1', // Indigo
    playlistId: 'PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i',
    description:
      'Formal languages, automata theory, computability, and complexity: DFA, NFA, Regular Expressions, Pumping Lemma, Pushdown Automata, Context-Free Grammars, and Turing Machines.',
    lecturesCount: 6,
    totalDuration: '2 hrs 25 mins',
    keyTopics: [
      'Alphabet, String, Formal Language & Kleene Star',
      'Deterministic Finite Automata (DFA) 5-Tuple Definition',
      'Non-Deterministic Finite Automata (NFA) to DFA Subset Construction',
      'Pumping Lemma for Proving Non-Regularity',
      'Pushdown Automata (PDA) & Context-Free Grammars (CFG)',
      'Turing Machines, Church-Turing Thesis & Halting Problem',
    ],
    lectures: [
      {
        id: 'toc-1',
        lectureNumber: 1,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L1: What is Automata, Alphabet, String & Formal Language',
        duration: '14:20',
        videoId: 'XslI8h7cGDs',
        topics: ['Alphabet Sigma', 'Powers of Sigma', 'Kleene Star vs Positive Closure', 'Finite Automata Model'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# DFA String Simulator in Python
class SimpleDFA:
    def __init__(self, states, alphabet, transition_func, start_state, accept_states):
        self.states = states
        self.alphabet = alphabet
        self.delta = transition_func
        self.start_state = start_state
        self.accept_states = accept_states

    def process(self, w: str) -> bool:
        curr = self.start_state
        for char in w:
            if char not in self.alphabet:
                return False
            curr = self.delta.get((curr, char), None)
            if curr is None:
                return False
        return curr in self.accept_states

# Language: Strings over {0, 1} ending with '01'
delta = {
    ('q0', '0'): 'q1', ('q0', '1'): 'q0',
    ('q1', '0'): 'q1', ('q1', '1'): 'q2',
    ('q2', '0'): 'q1', ('q2', '1'): 'q0',
}
dfa = SimpleDFA({'q0', 'q1', 'q2'}, {'0', '1'}, delta, 'q0', {'q2'})

test_strings = ["101", "1001", "110", "01", "111"]
for s in test_strings:
    print(f"String '{s}': Accepted = {dfa.process(s)}")
`,
          cpp: `#include <iostream>
#include <string>
#include <map>
#include <set>
using namespace std;

// DFA accepting strings ending with '01'
bool processDFA(const string& w) {
    int state = 0; // 0=q0, 1=q1, 2=q2(accept)
    for (char c : w) {
        if (state == 0) state = (c == '0') ? 1 : 0;
        else if (state == 1) state = (c == '0') ? 1 : 2;
        else if (state == 2) state = (c == '0') ? 1 : 0;
    }
    return state == 2;
}

int main() {
    string tests[] = {"101", "1001", "110", "01"};
    for (const string& s : tests) {
        cout << "String: " << s << " -> Accepted: " << (processDFA(s) ? "YES" : "NO") << endl;
    }
    return 0;
}
`,
        },
        detailedNotes: `### Lecture 1: Formal Languages & Automata Foundations

#### 1. Core Mathematical Definitions:
- **Alphabet (\\(\\Sigma\\)):** A finite, non-empty set of symbols. E.g., \\(\\Sigma = \\{0, 1\\}\\) or \\(\\Sigma = \\{a, b, c\\}\\).
- **String / Word (\\(w\\)):** A finite sequence of symbols chosen from \\(\\Sigma\\). Length is denoted \\(|w|\\). Empty string is \\(\\epsilon\\) (where \\(|\\epsilon| = 0\\)).
- **Powers of Alphabet:**
  - \\(\\Sigma^0 = \\{\\epsilon\\}\\)
  - \\(\\Sigma^1 = \\{0, 1\\}\\)
  - \\(\\Sigma^2 = \\{00, 01, 10, 11\\}\\)
- **Kleene Closure (\\(\\Sigma^*\\)):** Set of all strings of all lengths over \\(\\Sigma\\), including \\(\\epsilon\\):
  \\[
  \\Sigma^* = \\Sigma^0 \\cup \\Sigma^1 \\cup \\Sigma^2 \\cup \\dots
  \\]
- **Positive Closure (\\(\\Sigma^+\\)):** Excludes \\(\\epsilon\\): \\(\\Sigma^+ = \\Sigma^* - \\{\\epsilon\\}\\).

#### 2. What is a Formal Language?
A language \\(L\\) over \\(\\Sigma\\) is any subset of \\(\\Sigma^*\\) (\\(L \\subseteq \\Sigma^*\\)).
- Finite Language: \\(L_1 = \\{01, 10\\}\\)
- Infinite Language: \\(L_2 = \\{0^n 1^n \\mid n \\ge 1\\}\\)

#### 3. Chomsky Hierarchy of Grammars:
| Type | Language Family | Automaton Recognizer | Production Rules |
| :--- | :--- | :--- | :--- |
| **Type 3** | Regular Languages | Finite Automata (DFA / NFA) | \\(A \\to aB\\) or \\(A \\to a\\) |
| **Type 2** | Context-Free (CFL) | Pushdown Automata (PDA) | \\(A \\to \\alpha\\) (where \\(A \\in V_N\\)) |
| **Type 1** | Context-Sensitive (CSL) | Linear Bounded Automata (LBA) | \\(\\alpha A \\beta \\to \\alpha \\gamma \\beta\\) (\\(|\\alpha| \\le |\\beta|\\)) |
| **Type 0** | Recursively Enumerable | Turing Machine | Unrestricted \\(\\alpha \\to \\beta\\) |`,
      },
      {
        id: 'toc-2',
        lectureNumber: 2,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L2: Deterministic Finite Automata (DFA) Construction & 5-Tuples',
        duration: '16:45',
        videoId: 'vsEKN2f22bE',
        topics: ['DFA 5-Tuple', 'Transition Function Delta', 'Trap / Dead State', 'Minimization of DFA'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# DFA Constructor: Accepts binary numbers divisible by 3
def is_divisible_by_3(binary_str: str) -> bool:
    # State represents remainder mod 3: 0, 1, or 2
    state = 0
    for bit in binary_str:
        if bit not in ('0', '1'):
            return False
        state = (state * 2 + int(bit)) % 3
    return state == 0

nums = ["0", "11", "110", "1001", "1010"] # 0, 3, 6, 9, 10
for b in nums:
    val = int(b, 2)
    print(f"Binary {b} (Dec {val}): Divisible by 3? {is_divisible_by_3(b)}")
`,
          cpp: `#include <iostream>
#include <string>
using namespace std;

// DFA mod 3
bool divBy3(const string& s) {
    int rem = 0;
    for (char c : s) {
        rem = (rem * 2 + (c - '0')) % 3;
    }
    return rem == 0;
}

int main() {
    cout << "Binary 110 (6): " << (divBy3("110") ? "ACCEPTED" : "REJECTED") << endl;
    cout << "Binary 101 (5): " << (divBy3("101") ? "ACCEPTED" : "REJECTED") << endl;
    return 0;
}
`,
        },
        detailedNotes: `### Lecture 2: DFA 5-Tuple Mathematical Formalism

#### 1. Formal Definition:
A Deterministic Finite Automaton (DFA) is defined as a 5-tuple:
\\[
M = (Q, \\Sigma, \\delta, q_0, F)
\\]
Where:
1. \\(Q\\): Finite, non-empty set of states.
2. \\(\\Sigma\\): Finite alphabet of input symbols.
3. \\(\\delta\\): Transition function mapping \\(Q \\times \\Sigma \\to Q\\). Every state must have exactly ONE outgoing transition for each symbol in \\(\\Sigma\\).
4. \\(q_0 \\in Q\\): Initial / Start state.
5. \\(F \\subseteq Q\\): Set of Final / Accepting states (can be empty).

#### 2. Key DFA Design Patterns:
- **Substring Matching:** To accept strings containing 'ab':
  - \\(q_0 \\xrightarrow{a} q_1 \\xrightarrow{b} q_2\\) (where \\(q_2\\) is final with self-loop on \\(a, b\\)).
- **Modulo Counters:** To test if binary value is divisible by \\(k\\), create \\(k\\) states \\(q_0, q_1, \\dots, q_{k-1}\\). Transition on bit \\(b\\):
  \\[
  \\delta(q_r, b) = q_{(2r + b) \\bmod k}
  \\]
- **Dead / Trap State:** If an input sequence violates the condition irrevocably, transition to a non-final trap state with self-loops on all symbols.`,
      },
      {
        id: 'toc-3',
        lectureNumber: 3,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L3: Non-Deterministic Finite Automata (NFA) & Subset Construction',
        duration: '18:10',
        videoId: 'h4v7x0IMhtI',
        topics: ['NFA vs DFA', 'Epsilon Transitions', 'Subset Construction Algorithm', 'Equivalence Proof'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# NFA Subset Construction Simulation
def nfa_epsilon_closure(states, transitions):
    stack = list(states)
    closure = set(states)
    while stack:
        curr = stack.pop()
        for next_st in transitions.get((curr, 'eps'), []):
            if next_st not in closure:
                closure.add(next_st)
                stack.append(next_st)
    return closure

print("Epsilon closure of state q0:", nfa_epsilon_closure({'q0'}, {('q0', 'eps'): ['q1', 'q2']}))
`,
        },
        detailedNotes: `### Lecture 3: NFA Definition & DFA Equivalence

#### 1. NFA 5-Tuple Definition:
\\[
M = (Q, \\Sigma, \\delta, q_0, F)
\\]
Where the transition function maps to the power set of states:
\\[
\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\to 2^Q
\\]
In an NFA:
- A state can have 0, 1, or multiple outgoing transitions on the same symbol.
- It can transition without consuming input (\\(\\epsilon\\)-transition).
- A string is accepted if AT LEAST ONE computational path ends in an accepting state \\(q \\in F\\).

#### 2. Power of NFA vs DFA:
- **Equivalence Theorem:** For every NFA, there exists an equivalent DFA that accepts the exact same language (\\(L(NFA) = L(DFA)\\)).
- **State Complexity:** If an NFA has \\(n\\) states, the minimized equivalent DFA has at most \\(2^n\\) states.`,
      },
      {
        id: 'toc-4',
        lectureNumber: 4,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L4: Pumping Lemma for Regular Languages & Non-Regularity Proofs',
        duration: '21:05',
        videoId: 'WdmbZnUesRw',
        topics: ['Pumping Lemma Theorem', 'Pumping Length p', 'Pigeonhole Principle in Automata', 'Proof of a^n b^n'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Demonstrating that a^n b^n cannot be counted by finite states
def cannot_be_regular():
    print("Proof that L = {a^n b^n | n >= 0} is NOT regular:")
    print("1. Assume L is regular with pumping length p.")
    print("2. Choose string s = a^p b^p in L, |s| = 2p >= p.")
    print("3. Split s = xyz such that |xy| <= p and |y| >= 1.")
    print("4. Therefore y consists strictly of 'a's: y = a^k (k >= 1).")
    print("5. Pump with i=2: xy^2 z = a^(p+k) b^p.")
    print("6. Since p+k != p, xy^2 z is NOT in L. Contradiction!")
    print("Conclusion: L is NOT regular.")

if __name__ == "__main__":
    cannot_be_regular()
`,
        },
        detailedNotes: `### Lecture 4: Pumping Lemma for Regular Languages

#### 1. Formal Statement:
If \\(A\\) is a regular language, then there exists a number \\(p\\) (the **pumping length**) such that any string \\(s \\in A\\) of length \\(|s| \\ge p\\) may be divided into three pieces, \\(s = xyz\\), satisfying:
1. For each \\(i \\ge 0\\), \\(x y^i z \\in A\\).
2. \\(|y| > 0\\) (the pumped substring is non-empty).
3. \\(|xy| \\le p\\) (the pumped substring occurs within the first \\(p\\) symbols).

#### 2. Intuition & Pigeonhole Principle:
Any DFA recognizing \\(A\\) has a finite number of states \\(p = |Q|\\). If a string has \\(|s| \\ge p\\), by the Pigeonhole Principle, the automaton MUST visit at least one state twice during the first \\(p\\) transitions. That state cycle corresponds to substring \\(y\\). That loop can be repeated \\(i\\) times (pumped) or skipped (\\(i=0\\)).`,
      },
      {
        id: 'toc-5',
        lectureNumber: 5,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L5: Pushdown Automata (PDA) & Context-Free Grammars (CFG)',
        duration: '19:30',
        videoId: '7lcwlNNCP1E',
        topics: ['Stack Memory Model', 'PDA 7-Tuple', 'Acceptance by Final State vs Empty Stack', 'Deterministic vs Non-Deterministic PDA'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Simulating a Pushdown Automaton for L = {0^n 1^n | n >= 1}
def pda_simulate(w: str) -> bool:
    stack = ['Z0'] # Initial stack symbol
    state = 'q0'

    for char in w:
        if state == 'q0':
            if char == '0':
                stack.append('0')
            elif char == '1':
                if stack[-1] == '0':
                    stack.pop()
                    state = 'q1'
                else:
                    return False
        elif state == 'q1':
            if char == '1':
                if stack[-1] == '0':
                    stack.pop()
                else:
                    return False
            else:
                return False

    return state == 'q1' and stack == ['Z0']

tests = ["01", "0011", "000111", "001", "011"]
for t in tests:
    print(f"'{t}': {pda_simulate(t)}")
`,
        },
        detailedNotes: `### Lecture 5: Pushdown Automata (PDA)

#### 1. PDA Formal 7-Tuple:
\\[
M = (Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)
\\]
Where:
- \\(\\Gamma\\): Finite stack alphabet.
- \\(Z_0 \\in \\Gamma\\): Initial bottom-of-stack symbol.
- \\(\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to 2^{Q \\times \\Gamma^*}\\).

#### 2. Key Difference: DPDA vs NPDA
- **NPDA > DPDA in expressive power!** Unlike finite automata where NFA = DFA, a Non-Deterministic PDA is strictly more expressive than a Deterministic PDA.
- Example: The language of palindromes \\(L = \\{w w^R \\mid w \\in \\Sigma^*\\}\\) requires an NPDA (to guess the midpoint), and cannot be recognized by a DPDA.`,
      },
      {
        id: 'toc-6',
        lectureNumber: 6,
        subjectId: 'toc',
        subjectName: 'Theory of Computation',
        title: 'L6: Turing Machines, Halting Problem & Undecidability',
        duration: '22:15',
        videoId: 'LE_7krgRGt8',
        topics: ['Infinite Tape Model', 'Turing 7-Tuple', 'Church-Turing Thesis', 'Halting Problem Proof via Diagonalization'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Turing Machine Tape Simulator for bit inversion
def tm_invert_bits(tape_input: str):
    tape = list(tape_input) + ['_'] # Infinite blank symbol
    head = 0
    state = 'q_invert'

    while state != 'q_halt':
        symbol = tape[head]
        if state == 'q_invert':
            if symbol == '0':
                tape[head] = '1'
                head += 1
            elif symbol == '1':
                tape[head] = '0'
                head += 1
            elif symbol == '_':
                state = 'q_halt'

    return "".join(tape[:-1])

print("Inverted: 101100 ->", tm_invert_bits("101100"))
`,
        },
        detailedNotes: `### Lecture 6: Turing Machines & Decidability

#### 1. Turing Machine 7-Tuple:
\\[
M = (Q, \\Sigma, \\Gamma, \\delta, q_0, B, F)
\\]
- Unlimited, infinite tape divided into cells.
- Read/Write head can move both Left (\\(L\\)) and Right (\\(R\\)).
- Transition function: \\(\\delta: Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}\\).

#### 2. The Halting Problem (Undecidable):
- **Theorem (Alan Turing, 1936):** There is NO general algorithm that can determine whether an arbitrary program \\(M\\) on input \\(w\\) will eventually halt or loop forever.
- **Proof by Diagonalization:** Assume decider \\(H(M, w)\\) exists. Construct adversary machine \\(D(M)\\):
  - If \\(H(M, M)\\) says "halts", \\(D\\) enters an infinite loop.
  - If \\(H(M, M)\\) says "loops", \\(D\\) immediately halts.
  - What does \\(D(D)\\) do? If \\(D(D)\\) halts \\(\\implies\\) it loops. Contradiction!`,
      },
    ],
  },

  // =========================================================================
  // 8. COMPILER DESIGN (CD)
  // =========================================================================
  {
    id: 'compiler',
    title: 'Compiler Design (CD)',
    code: 'CS 402',
    category: 'Theoretical Computer Science',
    instructor: 'Gate Smashers (Varun Singla)',
    icon: '📜',
    color: '#EC4899', // Pink
    playlistId: 'PLxCzCOWd7aiEKtKSIHYusizkESC42diyc',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc',
    description:
      'Translating high-level source code into target machine code: Lexical Analysis, Context-Free Parsing (LL(1), LR(0), SLR, LALR), Syntax-Directed Translation, Intermediate Code Generation, and Optimization.',
    lecturesCount: 5,
    totalDuration: '2 hrs 10 mins',
    keyTopics: [
      'Phases of Compiler (Analysis & Synthesis)',
      'Lexical Analysis, Tokenization & Symbol Tables',
      'First() and Follow() Sets for LL(1) Grammar',
      'Bottom-Up LR(0) and SLR(1) Parsing Table Items',
      'Three-Address Code (TAC), Quadruples & DAG Optimization',
    ],
    lectures: [
      {
        id: 'cd-1',
        lectureNumber: 1,
        subjectId: 'compiler',
        subjectName: 'Compiler Design',
        title: 'L1: Phases of a Compiler & Lexical Analysis Tokens',
        duration: '16:20',
        videoId: 'XUsw5igq4DM',
        topics: ['Analysis vs Synthesis', 'Lexical, Syntax, Semantic Phases', 'Intermediate Code Generator', 'Code Optimizer'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Simple Lexical Analyzer (Tokenizer) in Python
import re

TOKEN_TYPES = [
    ('KEYWORD', r'\\b(if|else|while|int|float|return)\\b'),
    ('NUMBER', r'\\b\\d+(\\.\\d+)?\\b'),
    ('IDENTIFIER', r'\\b[a-zA-Z_][a-zA-Z0-9_]*\\b'),
    ('OPERATOR', r'[+\\-*/=><]'),
    ('PUNCTUATION', r'[;(),{}]'),
    ('WHITESPACE', r'\\s+'),
]

def tokenize(code: str):
    tokens = []
    pos = 0
    while pos < len(code):
        matched = False
        for tok_name, regex in TOKEN_TYPES:
            match = re.match(regex, code[pos:])
            if match:
                val = match.group(0)
                if tok_name != 'WHITESPACE':
                    tokens.append((tok_name, val))
                pos += len(val)
                matched = True
                break
        if not matched:
            raise ValueError(f"Lexical Error at pos {pos}: {code[pos]}")
    return tokens

source = "int x = 42 + y;"
print("Tokens:", tokenize(source))
`,
        },
        detailedNotes: `### Lecture 1: Compiler Architecture & Phases

#### 1. Analysis Phase (Front-End) - Machine Independent:
1. **Lexical Analysis (Scanner):** Reads stream of source characters and groups them into meaningful **Tokens** \\(\\langle\\text{token\\_name}, \\text{attribute\\_value}\\rangle\\).
2. **Syntax Analysis (Parser):** Validates tokens against Context-Free Grammar, generating a **Parse Tree** or Abstract Syntax Tree (AST).
3. **Semantic Analysis (Type Checker):** Verifies type compatibility, scope resolution, and array bounds.
4. **Intermediate Code Generator (ICG):** Generates machine-independent representation (e.g., Three-Address Code).

#### 2. Synthesis Phase (Back-End) - Machine Dependent:
5. **Code Optimizer:** Transforms IR to execute faster and consume less memory (e.g., dead code elimination, constant folding, loop unrolling).
6. **Code Generator:** Maps IR into target assembly or machine instructions, performing register allocation.`,
      },
      {
        id: 'cd-2',
        lectureNumber: 2,
        subjectId: 'compiler',
        subjectName: 'Compiler Design',
        title: 'L2: First() and Follow() Sets in LL(1) Grammar',
        duration: '19:45',
        videoId: 'UXYqQ_CJsVE',
        topics: ['First Set Rules', 'Follow Set Rules', 'Epsilon Propagation', 'End-of-Input Dollar Marker'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Computation of First and Follow in Python
grammar = {
    'E': ['T E1'],
    'E1': ['+ T E1', 'eps'],
    'T': ['F T1'],
    'T1': ['* F T1', 'eps'],
    'F': ['( E )', 'id']
}
print("Grammar loaded for arithmetic expressions.")
`,
        },
        detailedNotes: `### Lecture 2: First & Follow Calculation Rules

#### Rules for FIRST(\\(\\alpha\\)):
1. If \\(X\\) is terminal, \\(\\text{FIRST}(X) = \\{X\\}\\).
2. If \\(X \\to \\epsilon\\), then add \\(\\epsilon\\) to \\(\\text{FIRST}(X)\\).
3. If \\(X \\to Y_1 Y_2 \\dots Y_k\\):
   - Add all non-\\(\\epsilon\\) symbols of \\(\\text{FIRST}(Y_1)\\) to \\(\\text{FIRST}(X)\\).
   - If \\(Y_1 \\implies \\epsilon\\), add \\(\\text{FIRST}(Y_2)\\), and so on.

#### Rules for FOLLOW(\\(\\alpha\\)):
1. Put \\(\\$\\) in \\(\\text{FOLLOW}(S)\\) where \\(S\\) is the start symbol.
2. If \\(A \\to \\alpha B \\beta\\), everything in \\(\\text{FIRST}(\\beta)\\) (except \\(\\epsilon\\)) is in \\(\\text{FOLLOW}(B)\\).
3. If \\(A \\to \\alpha B\\) or \\(A \\to \\alpha B \\beta\\) where \\(\\text{FIRST}(\\beta)\\) contains \\(\\epsilon\\), everything in \\(\\text{FOLLOW}(A)\\) is in \\(\\text{FOLLOW}(B)\\).`,
      },
      {
        id: 'cd-3',
        lectureNumber: 3,
        subjectId: 'compiler',
        subjectName: 'Compiler Design',
        title: 'L3: Predictive Parsing Table Construction & LL(1) Conditions',
        duration: '18:15',
        videoId: 'YvGW4Z_6POU',
        topics: ['LL(1) Table Construction', 'Parsing Conflicts', 'Left Recursion Removal', 'Left Factoring'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Verifying LL(1) Non-Ambiguity Condition
print("LL(1) Condition: For any production A -> alpha | beta:")
print("1. FIRST(alpha) ∩ FIRST(beta) = empty")
print("2. If beta -> eps, then FIRST(alpha) ∩ FOLLOW(A) = empty")
`,
        },
        detailedNotes: `### Lecture 3: LL(1) Parsing Table

#### 1. What does LL(1) Mean?
- First **L**: Left-to-right scan of the input.
- Second **L**: Leftmost derivation is produced.
- **1**: 1 symbol of lookahead is required to make a deterministic parsing decision.

#### 2. Conflicts in LL(1):
A grammar is NOT LL(1) if:
- It contains **Left Recursion** (\\(A \\to A\\alpha\\)).
- It is not **Left Factored** (common prefix in alternatives).
- There is a multiply-defined entry in parsing table \\(M[A, a]\\).`,
      },
      {
        id: 'cd-4',
        lectureNumber: 4,
        subjectId: 'compiler',
        subjectName: 'Compiler Design',
        title: 'L4: Bottom-Up Parsing: LR(0) Items & SLR(1) Table',
        duration: '21:30',
        videoId: 'QNv2g-lwH2c',
        topics: ['Handle Pruning', 'LR(0) Items & Dot Notation', 'Shift-Reduce Conflict', 'Reduce-Reduce Conflict'],
        difficulty: 'Advanced',
        starterCodes: {
          python: `# Demonstrating Shift vs Reduce
print("Shift: Push current terminal onto stack and read next symbol.")
print("Reduce: Replace handle on top of stack with Non-Terminal using A -> gamma.")
`,
        },
        detailedNotes: `### Lecture 4: LR Parsing (Bottom-Up)

#### 1. Types of LR Parsers:
\\[
\\text{LR}(0) < \\text{SLR}(1) < \\text{LALR}(1) < \\text{CLR}(1)
\\]
- **LR(0):** Uses canonical collection of LR(0) items with dot notation: \\(A \\to \\alpha \\cdot \\beta\\).
- **SLR(1):** Uses FOLLOW sets to disambiguate reductions: only reduce \\(A \\to \\alpha\\) for terminal \\(a \\in \\text{FOLLOW}(A)\\).
- **CLR(1):** Carries lookahead directly inside items \\([A \\to \\alpha \\cdot \\beta, a]\\). Most powerful, but large state space.
- **LALR(1):** Merges CLR(1) states that have identical LR(0) cores. Used in Yacc & Bison.`,
      },
      {
        id: 'cd-5',
        lectureNumber: 5,
        subjectId: 'compiler',
        subjectName: 'Compiler Design',
        title: 'L5: Three-Address Code (TAC), Quadruples & Optimization',
        duration: '15:50',
        videoId: 'j-bLeUysUiE',
        topics: ['Three Address Code Formats', 'Quadruples vs Triples', 'DAG Construction', 'Common Subexpression Elimination'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Generate Three-Address Code for: x = a + b * c - d
print("Generated TAC:")
print("t1 = b * c")
print("t2 = a + t1")
print("t3 = t2 - d")
print("x = t3")
`,
        },
        detailedNotes: `### Lecture 5: Intermediate Representations & DAGs

#### 1. Three-Address Code (TAC):
Linear sequence of instructions where each instruction has at most one operator on the right-hand side: \\(x = y \\text{ op } z\\).

#### 2. Data Structures for TAC:
- **Quadruples:** Record with 4 fields: \\((\\text{op}, \\text{arg1}, \\text{arg2}, \\text{result})\\).
- **Triples:** Avoids explicit temporary names by referencing array indices: \\((\\text{op}, \\text{arg1}, \\text{arg2})\\).

#### 3. Directed Acyclic Graph (DAG):
Constructing a DAG over a Basic Block automatically eliminates **Common Subexpressions** and identifies dead variables.`,
      },
    ],
  },

  // =========================================================================
  // 9. DISCRETE MATHEMATICS (DM)
  // =========================================================================
  {
    id: 'discrete-math',
    title: 'Discrete Mathematics (DM)',
    code: 'CS 202',
    category: 'Theoretical Computer Science',
    instructor: 'Gate Smashers',
    icon: '🔢',
    color: '#F59E0B', // Amber
    playlistId: 'PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
    description:
      'Mathematical foundations of CS: Propositional & Predicate Logic, Sets, Equivalence Relations & Posets, Functions, Combinatorics, and Graph Theory.',
    lecturesCount: 3,
    totalDuration: '1 hr 35 mins',
    keyTopics: [
      'Propositional Logic, Truth Tables & Logical Equivalences',
      'Relations: Reflexive, Symmetric, Transitive & Partial Orders',
      'Graph Theory: Eulerian Trails, Hamiltonian Cycles & Planar Graphs',
    ],
    lectures: [
      {
        id: 'dm-1',
        lectureNumber: 1,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Mathematics',
        title: 'L1: Propositional Logic, Truth Tables & Tautologies',
        duration: '22:40',
        videoId: '6490tKrGEic',
        topics: ['Connectives (AND, OR, NOT, IMPLIES)', 'Truth Tables', 'Tautology vs Contradiction', 'De Morgan Laws'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Truth Table Generator for p -> q <=> ~p v q
print(" p | q | p -> q | ~p v q | Equivalent?")
print("-" * 38)
for p in [True, False]:
    for q in [True, False]:
        p_imp_q = (not p) or q
        not_p_or_q = (not p) or q
        equiv = (p_imp_q == not_p_or_q)
        print(f" {int(p)} | {int(q)} |   {int(p_imp_q)}    |   {int(not_p_or_q)}    |    {equiv}")
`,
        },
        detailedNotes: `### Lecture 1: Propositional Logic Foundations

#### 1. Fundamental Connectives:
- **Negation (\\(\\neg P\\)):** Inverts truth value.
- **Conjunction (\\(P \\land Q\\)):** True only when BOTH are True.
- **Disjunction (\\(P \\lor Q\\)):** False only when BOTH are False.
- **Conditional / Implication (\\(P \\to Q\\)):** Equivalent to \\(\\neg P \\lor Q\\). False ONLY when \\(P = T\\) and \\(Q = F\\).
- **Biconditional (\\(P \\leftrightarrow Q\\)):** True when both share the same truth value.

#### 2. Key Equivalence Laws:
- **Contrapositive:** \\(P \\to Q \\equiv \\neg Q \\to \\neg P\\)
- **De Morgan’s Laws:**
  \\[
  \\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q \\qquad \\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q
  \\]`,
      },
      {
        id: 'dm-2',
        lectureNumber: 2,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Mathematics',
        title: 'L2: Relations, Equivalence Relations & Partial Orderings (Posets)',
        duration: '18:50',
        videoId: 'VkWGSqRGozw',
        topics: ['Reflexive, Symmetric, Transitive', 'Equivalence Classes', 'Antisymmetric & Posets', 'Hasse Diagrams'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Equivalence Relation Validator
def check_relation_properties(domain, R):
    # Reflexive: (a, a) in R for all a
    reflexive = all((a, a) in R for a in domain)
    # Symmetric: if (a, b) in R, then (b, a) in R
    symmetric = all((b, a) in R for (a, b) in R)
    # Transitive: if (a, b) and (b, c) in R, then (a, c) in R
    transitive = all((a, c) in R for (a, b) in R for (b2, c) in R if b == b2)
    return reflexive, symmetric, transitive

domain = {1, 2, 3}
R = {(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)}
refl, symm, trans = check_relation_properties(domain, R)
print(f"Reflexive: {refl}, Symmetric: {symm}, Transitive: {trans}")
print("Is Equivalence Relation?", refl and symm and trans)
`,
        },
        detailedNotes: `### Lecture 2: Relations & Posets

#### 1. Properties of Binary Relations on Set \\(A\\):
1. **Reflexive:** \\(\\forall a \\in A, (a, a) \\in R\\). Total reflexive relations on set of \\(n\\) elements = \\(2^{n(n-1)}\\).
2. **Symmetric:** \\(\\forall a, b \\in A, (a, b) \\in R \\implies (b, a) \\in R\\).
3. **Transitive:** \\(\\forall a, b, c \\in A, (a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R\\).
4. **Antisymmetric:** \\(\\forall a, b \\in A, (a, b) \\in R \\land (b, a) \\in R \\implies a = b\\).

#### 2. Classification:
- **Equivalence Relation:** Reflexive + Symmetric + Transitive. Partitions set into disjoint equivalence classes.
- **Partial Order Relation (Poset):** Reflexive + Antisymmetric + Transitive. Visualized using a **Hasse Diagram**.`,
      },
      {
        id: 'dm-3',
        lectureNumber: 3,
        subjectId: 'discrete-math',
        subjectName: 'Discrete Mathematics',
        title: 'L3: Graph Theory: Eulerian vs Hamiltonian Cycles & Planarity',
        duration: '21:10',
        videoId: 'GiClUAJMMtw',
        topics: ['Handshaking Lemma', 'Eulerian Path & Circuit Criteria', 'Hamiltonian Cycles', 'Euler Formula for Planar Graphs'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Eulerian Circuit Checker using Degree Parity
def has_eulerian_circuit(adj_list):
    # In connected graph, Eulerian circuit exists iff all vertices have EVEN degree
    for node, neighbors in adj_list.items():
        if len(neighbors) % 2 != 0:
            return False
    return True

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']
}
print("Has Eulerian Circuit?", has_eulerian_circuit(graph))
`,
        },
        detailedNotes: `### Lecture 3: Graph Theory Invariants

#### 1. Handshaking Lemma:
\\[
\\sum_{v \\in V} \\deg(v) = 2|E|
\\]
**Corollary:** The number of vertices of odd degree in any undirected graph is ALWAYS EVEN.

#### 2. Euler’s Criterion:
- A connected graph has an **Eulerian Circuit** (traversing every edge exactly once and returning to start) if and only if **EVERY vertex has an EVEN degree**.
- It has an **Eulerian Path** if and only if exactly 0 or 2 vertices have odd degrees.

#### 3. Planar Graph Invariant (Euler’s Formula):
For any connected planar graph with \\(V\\) vertices, \\(E\\) edges, and \\(R\\) faces/regions:
\\[
V - E + R = 2
\\]`,
      },
    ],
  },

  // =========================================================================
  // 10. SOFTWARE ENGINEERING (SE)
  // =========================================================================
  {
    id: 'software-eng',
    title: 'Software Engineering (SE)',
    code: 'CS 304',
    category: 'Software Architecture',
    instructor: 'Gate Smashers',
    icon: '📋',
    color: '#14B8A6', // Teal
    playlistId: 'PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2',
    description:
      'Industrial software processes: SDLC models (Waterfall, Spiral, Agile/Scrum), Requirement Engineering, Testing Strategies (Black Box & White Box), and Quality Metrics.',
    lecturesCount: 2,
    totalDuration: '45 mins',
    keyTopics: [
      'SDLC Models: Waterfall vs Prototype vs Spiral vs Agile Scrum',
      'Testing: White Box (Basis Path, Cyclomatic Complexity) vs Black Box (BVA, Equivalence Partitioning)',
    ],
    lectures: [
      {
        id: 'se-1',
        lectureNumber: 1,
        subjectId: 'software-eng',
        subjectName: 'Software Engineering',
        title: 'L1: SDLC Models: Waterfall, Spiral, Agile & Scrum Framework',
        duration: '18:15',
        videoId: 'y2CnstDLhXM',
        topics: ['Spiral Risk Driven Model', 'Agile Manifestos', 'Scrum Roles & Sprints', 'Burn-down Charts'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Scrum Sprint Velocity Simulator
sprints = [
    {"sprint": 1, "committed_points": 30, "completed_points": 26},
    {"sprint": 2, "committed_points": 28, "completed_points": 28},
    {"sprint": 3, "committed_points": 32, "completed_points": 30},
]
avg_velocity = sum(s["completed_points"] for s in sprints) / len(sprints)
print(f"Average Team Velocity: {avg_velocity:.1f} story points per sprint")
`,
        },
        detailedNotes: `### Lecture 1: SDLC Process Models Comparison

| Model | Strengths | Weaknesses | Best Fit |
| :--- | :--- | :--- | :--- |
| **Waterfall** | Simple, clear milestones | High risk, zero customer feedback until late | Well-defined, stable requirements (e.g. defense, hardware drivers) |
| **Spiral** | Risk analysis at every cycle | Expensive, requires expert risk analysts | Large, mission-critical projects |
| **Agile (Scrum)** | Rapid iterations, continuous feedback | Hard to budget fixed time/cost | Modern web/mobile products with evolving requirements |`,
      },
      {
        id: 'se-2',
        lectureNumber: 2,
        subjectId: 'software-eng',
        subjectName: 'Software Engineering',
        title: 'L2: White Box vs Black Box Testing & Cyclomatic Complexity',
        duration: '19:40',
        videoId: '89VOHd8F8Ao',
        topics: ['Boundary Value Analysis', 'Equivalence Class Partitioning', 'Control Flow Graph (CFG)', 'McCabe Cyclomatic Complexity Formula'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Cyclomatic Complexity: V(G) = E - N + 2P
def cyclomatic_complexity(edges: int, nodes: int, components: int = 1):
    return edges - nodes + 2 * components

# Example: CFG with 7 edges and 6 nodes
print("Cyclomatic Complexity V(G):", cyclomatic_complexity(7, 6))
`,
        },
        detailedNotes: `### Lecture 2: Software Testing & McCabe’s Complexity

#### 1. Black Box Testing:
- **Boundary Value Analysis (BVA):** Tests values at limits: \\(\\min, \\min+1, \\text{nominal}, \\max-1, \\max\\).
- **Equivalence Class Partitioning:** Divides input domain into valid and invalid equivalence classes.

#### 2. White Box Testing & Cyclomatic Complexity \\(V(G)\\):
Calculates the number of linearly independent paths through program source code:
\\[
V(G) = E - N + 2P \\quad \\text{or} \\quad V(G) = P + 1 \\quad \\text{(where \\(P\\) is number of predicate nodes)}
\\]`,
      },
    ],
  },

  // =========================================================================
  // 11. DEVOPS & CLOUD INFRASTRUCTURE
  // =========================================================================
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineering',
    code: 'DEVOPS 101',
    category: 'Applied Cloud & Infrastructure',
    instructor: 'Kunal Kushwaha',
    icon: '🐳',
    color: '#06B6D4', // Cyan
    playlistId: 'PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnqWM4O5w4nQBGnviQcekgDF',
    description:
      'Modern cloud deployments: Linux fundamentals, Git & GitHub Actions CI/CD, Docker containerization, multi-stage builds, and Kubernetes orchestration.',
    lecturesCount: 2,
    totalDuration: '1 hr 15 mins',
    keyTopics: [
      'Docker Containerization, Dockerfile & Layer Caching',
      'Kubernetes Core Architecture: Master Node, Worker Nodes, Pods & Services',
    ],
    lectures: [
      {
        id: 'devops-1',
        lectureNumber: 1,
        subjectId: 'devops',
        subjectName: 'DevOps & Cloud Engineering',
        title: 'L1: Docker Containerization, Images & Multi-Stage Builds',
        duration: '38:20',
        videoId: 'fqMOX6JJhGo',
        topics: ['Containers vs Virtual Machines', 'Dockerfile Commands', 'Layer Caching', 'Multi-Stage Optimization'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Production Multi-Stage Dockerfile Blueprint
dockerfile = """# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage (Minimal footprint)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
"""
print(dockerfile)
`,
        },
        detailedNotes: `### Lecture 1: Docker Containerization

#### 1. Container vs Virtual Machine:
- **Virtual Machine:** Virtualizes the hardware layer (hypervisor). Each VM runs a full guest operating system (Gigabytes in size, minutes to boot).
- **Container:** Virtualizes the OS kernel using Linux **cgroups** (resource limits) and **namespaces** (process isolation). Shares host kernel (Megabytes in size, milliseconds to boot).`,
      },
      {
        id: 'devops-2',
        lectureNumber: 2,
        subjectId: 'devops',
        subjectName: 'DevOps & Cloud Engineering',
        title: 'L2: Kubernetes (K8s) Architecture: Control Plane, Pods & Services',
        duration: '35:10',
        videoId: 'KVBON1lA9N8',
        topics: ['Control Plane (API Server, etcd, Scheduler)', 'Worker Node (Kubelet, Kube-Proxy)', 'Pods & ReplicaSets', 'ClusterIP vs NodePort vs LoadBalancer'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Kubernetes Deployment Manifest Template
k8s_yaml = """apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-service
  template:
    metadata:
      labels:
        app: api-service
    spec:
      containers:
      - name: api
        image: myorg/api:v1.0
        ports:
        - containerPort: 8080
"""
print(k8s_yaml)
`,
        },
        detailedNotes: `### Lecture 2: Kubernetes Architecture

#### 1. Control Plane Components:
- **kube-apiserver:** Gateway exposing the Kubernetes API.
- **etcd:** Distributed consistent key-value store holding cluster state.
- **kube-scheduler:** Assigns unassigned Pods to worker nodes based on resource constraints.
- **kube-controller-manager:** Runs controller processes (Node Controller, Replication Controller).

#### 2. Worker Node Components:
- **kubelet:** Agent ensuring containers declared in PodSpecs are running and healthy.
- **kube-proxy:** Manages network rules and packet forwarding for Services.
- **Container Runtime:** (containerd / CRI-O) pulls images and runs containers.`,
      },
    ],
  },

  // =========================================================================
  // 12. MACHINE LEARNING & AI FOUNDATIONS
  // =========================================================================
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI Foundations',
    code: 'AI 401',
    category: 'Data Science & AI',
    instructor: 'Krish Naik & 3Blue1Brown',
    icon: '🤖',
    color: '#8B5CF6', // Purple
    playlistId: 'PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
    description:
      'Mathematical foundations of ML and Deep Learning: Linear Regression, Cost Functions, Gradient Descent, Decision Trees, Entropy, and Neural Network Backpropagation.',
    lecturesCount: 3,
    totalDuration: '1 hr 20 mins',
    keyTopics: [
      'Supervised vs Unsupervised Learning & Overfitting',
      'Linear Regression, Mean Squared Error (MSE) & Gradient Descent',
      'Decision Trees, Shannon Entropy & Information Gain',
      'Deep Learning: Neural Networks, Activation Functions & Backpropagation',
    ],
    lectures: [
      {
        id: 'ml-1',
        lectureNumber: 1,
        subjectId: 'ml-ai',
        subjectName: 'Machine Learning & AI',
        title: 'L1: Linear Regression & Gradient Descent Mathematics',
        duration: '26:15',
        videoId: '7uwa9aPbBRU',
        topics: ['Hypothesis Function', 'Mean Squared Error (MSE)', 'Partial Derivatives', 'Learning Rate Alpha'],
        difficulty: 'Beginner',
        starterCodes: {
          python: `# Gradient Descent from Scratch in Python
def gradient_descent(x_vals, y_vals, lr=0.01, epochs=1000):
    m, c = 0.0, 0.0 # Slope and intercept
    n = len(x_vals)

    for _ in range(epochs):
        y_pred = [m * x + c for x in x_vals]
        # Partial derivatives of MSE
        dm = (-2 / n) * sum(x * (y - y_p) for x, y, y_p in zip(x_vals, y_vals, y_pred))
        dc = (-2 / n) * sum(y - y_p for y, y_p in zip(y_vals, y_pred))
        m -= lr * dm
        c -= lr * dc

    return m, c

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
slope, intercept = gradient_descent(x, y)
print(f"Learned Equation: y = {slope:.2f}x + {intercept:.2f}")
`,
        },
        detailedNotes: `### Lecture 1: Linear Regression & Gradient Descent

#### 1. Hypothesis & Cost Function:
\\[
h_\\theta(x) = \\theta_0 + \\theta_1 x \\qquad J(\\theta_0, \\theta_1) = \\frac{1}{2m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)})^2
\\]

#### 2. Gradient Descent Update Rule:
\\[
\\theta_j := \\theta_j - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta_0, \\theta_1)
\\]
Where \\(\\alpha\\) is the **learning rate**. Too large \\(\\implies\\) divergence. Too small \\(\\implies\\) slow convergence.`,
      },
      {
        id: 'ml-2',
        lectureNumber: 2,
        subjectId: 'ml-ai',
        subjectName: 'Machine Learning & AI',
        title: 'L2: Decision Trees, Shannon Entropy & Information Gain',
        duration: '24:40',
        videoId: '1IQOtJ4NI_0',
        topics: ['Shannon Entropy Formula', 'Information Gain', 'Gini Impurity', 'Pruning Decision Trees'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# Shannon Entropy & Information Gain in Python
import math

def entropy(probs):
    return -sum(p * math.log2(p) for p in probs if p > 0)

# Equal distribution (highest uncertainty): [0.5, 0.5]
print("Entropy of fair coin [0.5, 0.5]:", entropy([0.5, 0.5]), "bits")
# Pure distribution (zero uncertainty): [1.0, 0.0]
print("Entropy of biased coin [1.0, 0.0]:", entropy([1.0, 0.0]), "bits")
`,
        },
        detailedNotes: `### Lecture 2: Decision Trees & Information Theory

#### 1. Shannon Entropy:
Measures impurity / disorder in a dataset:
\\[
H(S) = - \\sum_{i=1}^{c} p_i \\log_2(p_i)
\\]

#### 2. Information Gain:
Expected reduction in entropy when splitting on attribute \\(A\\):
\\[
\\text{Gain}(S, A) = H(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v)
\\]
Decision tree algorithms (ID3, C4.5) choose the split that **maximizes Information Gain**.`,
      },
      {
        id: 'ml-3',
        lectureNumber: 3,
        subjectId: 'ml-ai',
        subjectName: 'Machine Learning & AI',
        title: 'L3: Deep Learning: What is a Neural Network? (3Blue1Brown)',
        duration: '19:12',
        videoId: 'aircAruvnKk',
        topics: ['Neurons & Activations', 'Weights and Biases', 'Sigmoid & ReLU Functions', 'Matrix Form of Layer Propagation'],
        difficulty: 'Intermediate',
        starterCodes: {
          python: `# 2-Layer Neural Network Forward Propagation
import math

def relu(x): return max(0.0, x)
def sigmoid(x): return 1.0 / (1.0 + math.exp(-x))

# Simple neuron: a = sigma(w1*x1 + w2*x2 + b)
w = [0.8, -0.5]
x = [1.0, 2.0]
bias = 0.1
z = sum(wi * xi for wi, xi in zip(w, x)) + bias
activation = sigmoid(z)
print(f"Weighted sum z = {z:.3f}, Activation a = {activation:.3f}")
`,
        },
        detailedNotes: `### Lecture 3: Neural Networks Architecture

#### 1. Neuron Mathematical Operation:
\\[
a^{(l)} = \\sigma(W^{(l)} a^{(l-1)} + b^{(l)})
\\]
Where:
- \\(a^{(l-1)}\\): Activation vector from the previous layer.
- \\(W^{(l)}\\): Weight matrix connecting layers.
- \\(b^{(l)}\\): Bias vector adjusting threshold.
- \\(\\sigma\\): Non-linear activation function (ReLU, Sigmoid, Tanh, GELU).

#### 2. Why Non-Linear Activations?
Without non-linear activations, stacking multiple layers collapses mathematically into a single linear transformation: \\(W_2 (W_1 x) = (W_2 W_1) x = W' x\\). Non-linearity enables neural networks to approximate ANY arbitrary continuous function (**Universal Approximation Theorem**).`,
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
