# Campus_Parking
My project for automatic vehicle parking system in campus.

Zip file about my project: 
[parkingwebsite.zip](https://github.com/user-attachments/files/21522311/parkingwebsite.zip)
Aa
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 🚘 Automatic Vehicle Parking System

A responsive web interface showcasing an automated vehicle parking service. Includes service details, trust indicators, contact options, and informative content—all styled with custom CSS and supporting visuals.

## 📁 Files Included

- `style.css` — Custom styling for all HTML pages  
- `trust.html` — Displays trust metrics or testimonials  
- `service.html` — Details of services offered  
- `contact.html` — Contact form and information  
- `about.html` — About the project and its purpose  
- `/images` — Supporting visuals for the UI

## 🌟 Key Features

- Fully responsive layout  
- Modular page structure for scalability  
- Simple navigation across service and contact sections  
- Custom-styled with CSS for a smooth user experience

## 🔧 Technologies Used

- HTML5  
- CSS3  
- Image assets (JPG/PNG)


```bash

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📊 Use Case Diagram – Campus Parking System

The Use Case Diagram illustrates how different actors interact with the system to perform key parking operations.

### 👥 Actors
- **Student**
  - Book parking slot
  - Cancel reservation
  - View slot availability
- **Admin**
  - Manage users
  - Add/Edit/Delete parking spaces
  - Generate reports
- **Security Staff**
  - Monitor entry/exit logs
  - Verify vehicle access

### 🎯 Use Cases
- Slot Booking & Cancellation  
- Availability Check  
- User & Space Management  
- Entry/Exit Verification  



### ⚙️ System Features  
- User registration and authentication  
- Real-time parking slot availability tracking  
- Automated gate control using AI and sensors  
- Slot booking and cancellation  
- Admin dashboard for monitoring and reporting

### 🚧 Key Challenges  
- Handling multiple user roles with distinct privileges  
- Ensuring accurate, real-time updates of parking data  
- Integrating hardware (e.g., sensors, cameras) with software logic  
- Maintaining data consistency across modules  
- Generating actionable insights for campus authorities

### 🗂️ Scope of DFD Documentation  
| DFD Level | Description |
|-----------|-------------|
| **Level 0** | Context diagram showing external entities (Users, Admin, Sensors) and system boundaries |
| **Level 1** | Breakdown of core processes: Login/Signup, Slot Booking, Availability Monitoring, Admin Control |
| **Level 2** | Detailed sub-processes: AI-based slot allocation, sensor data processing, report generation |

 
The DFDs serve as a blueprint for understanding the internal workings of the Campus Parking Automation System. They help developers, stakeholders, and contributors visualize system behavior, identify data dependencies, and support future enhancements with clarity and precision.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧩 UML Diagrams

### 🔄 Activity Diagram
The activity diagram illustrates the end-to-end flow of the parking system—from user login and slot booking to gate access and vehicle parking. It captures decision points like booking verification and highlights system interactions across roles.

**Key Activities**:
- User Login/Register  
- Check Slot Availability  
- Book Parking Slot  
- Receive Confirmation  
- Arrive at Campus  
- Gate Access & Parking

### 🧍 Swimlane Diagram
The swimlane diagram breaks down the responsibilities across four roles:
- **Student/User**: Initiates booking and arrives at campus  
- **System**: Handles backend logic and slot management  
- **Admin**: Manages slot database and generates reports  
- **Security Staff**: Verifies booking and controls gate access

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###📊 Project Cost Estimation (COCOMO Model)

We estimated the development effort, schedule, and cost of this project using the COCOMO software cost estimation model, based on ~28,000 lines of code (28 KLOC).

1️⃣ Basic COCOMO Model (Semi-Detached)
Effort (E): 125.30 Person-Months
Development Time (T): 13.56 Months
Average Staffing (P): 9 Developers
Estimated Cost: $626,481.50

2️⃣ Intermediate COCOMO Model (with Cost Drivers)
Adjusted Effort (E): 144.10 Person-Months
Development Time (T): 14.47 Months
Average Staffing (P): 10 Developers
Estimated Cost: $720,500.00

3️⃣ Detailed COCOMO Model (Phase-Wise Effort)
Phase	% Effort	Effort (PM)
Planning & Requirements	6%	8.65
System Design	16%	23.06
Detailed Design	26%	37.47
Coding & Unit Testing	42%	60.12
Integration & Testing	10%	14.41
Total	100%	144.10
📈 Insights

The project requires ~125–144 person-months of effort.
A realistic development timeline is 13–15 months.
Average team size is 9–10 developers.
Estimated project budget: $626K – $720K.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
###📊 RMMM Plan (Risk Mitigation, Monitoring, and Management)

To ensure reliable project delivery, a structured RMMM strategy has been applied.

| Risk ID | Description                          | Likelihood | Impact | Mitigation Plan                               | Monitoring Strategy                  | Contingency Plan                               | Status  |
| ------- | ------------------------------------ | ---------- | ------ | --------------------------------------------- | ------------------------------------ | ---------------------------------------------- | ------- |
| R1      | Sensor Integration Failure           | Medium     | High   | Modular API, start with mock testing          | Weekly integration testing & logs    | Revert to manual entry mode                    | Open    |
| R2      | Peak-time Server Slowdown            | High       | Medium | DB optimization, caching, load balancing      | Monitor response times & stress test | Scale server resources, add caching layer      | Open    |
| R3      | Security Vulnerability / Data Breach | Medium     | High   | HTTPS, input validation, RBAC, encryption     | Monthly security scans & log reviews | Patch immediately, rotate credentials, notify  | Open    |
| R4      | Scope Creep (Feature Expansion)      | Medium     | Medium | Freeze scope post-MVP, backlog prioritization | Bi-weekly scope review meetings      | Postpone non-critical features to next release | Open    |
| R5      | Network Outage at Campus             | Low        | Medium | Offline fallback mode, local caching          | Monitor connectivity uptime          | Switch to offline mode, notify users           | Planned |

1️⃣ Risk Table Creation (Full RMMM Register)
| Risk ID | Description                          | Likelihood | Impact | Priority | Mitigation Plan                               | Monitoring Strategy                  | Contingency Plan                               | Status  |
| ------- | ------------------------------------ | ---------- | ------ | -------- | --------------------------------------------- | ------------------------------------ | ---------------------------------------------- | ------- |
| R1      | Sensor Integration Failure           | Medium     | High   | **High** | Modular API, start with mock testing          | Weekly integration testing & logs    | Revert to manual entry mode                    | Open    |
| R2      | Peak-time Server Slowdown            | High       | Medium | **High** | DB optimization, caching, load balancing      | Monitor response times & stress test | Scale server resources, add caching layer      | Open    |
| R3      | Security Vulnerability / Data Breach | Medium     | High   | **High** | HTTPS, input validation, RBAC, encryption     | Monthly security scans & log reviews | Patch immediately, rotate credentials, notify  | Open    |
| R4      | Scope Creep (Feature Expansion)      | Medium     | Medium | Medium   | Freeze scope post-MVP, backlog prioritization | Bi-weekly scope review meetings      | Postpone non-critical features to next release | Open    |
| R5      | Network Outage at Campus             | Low        | Medium | Low      | Offline fallback mode, local caching          | Monitor connectivity uptime          | Switch to offline mode, notify users           | Planned |

2️⃣ First Order Priority List
| Priority Rank | Risk ID | Description                          | Reason (Likelihood × Impact) |
| ------------- | ------- | ------------------------------------ | ---------------------------- |
| 1             | R1      | Sensor Integration Failure           | Medium × High → Critical     |
| 2             | R2      | Peak-time Server Slowdown            | High × Medium → Critical     |
| 3             | R3      | Security Vulnerability / Data Breach | Medium × High → Critical     |

3️⃣ Risk Information Sheet (RIS) – Top 3 Priority Risks
| Risk ID | Category         | Likelihood | Impact | Triggers                           | Mitigation Strategy                                    | Monitoring Strategy                          | Contingency Plan                                    | Status |
| ------- | ---------------- | ---------- | ------ | ---------------------------------- | ------------------------------------------------------ | -------------------------------------------- | --------------------------------------------------- | ------ |
| R1      | Technical Risk   | Medium     | High   | Sensor errors, API failures        | Modular API, test with mock data                       | Weekly integration testing, error logs       | Switch to manual entry system temporarily           | Open   |
| R2      | Performance Risk | High       | Medium | Peak-hour traffic load             | Optimize DB queries, caching, enable load balancing    | Response-time monitoring, weekly stress test | Scale server resources, add caching layer           | Open   |
| R3      | Security Risk    | Medium     | High   | Unauthorized access, SQL injection | HTTPS, encryption, input validation, role-based access | Monthly vulnerability scans, log reviews     | Patch immediately, rotate credentials, notify users | Open   |



