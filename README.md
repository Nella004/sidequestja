# sidequestja
SideQuest is a web app that turns everyday errands and local challenges into paid missions. Post a quest, accept one nearby, get rewarded.
1. Basic Premise
The RBAC Proven System can be developed as an internal Cybersecurity Operations Center (SOC) Management Platform.
The SOC monitors an organization's:
Networks
Servers
Applications
Endpoints
Cloud infrastructure
Authentication systems
Security events
The RBAC website is used by SOC personnel to manage:
Security alerts
Security incidents
Investigations
Users
Roles
Permissions
Audit logs
Security events
The central purpose of using Role-Based Access Control (RBAC) is that not every employee in a SOC should have access to every system or security record.
Different employees have different responsibilities, and therefore they should have different levels of access.
For example:
SOC Analyst
      ↓
Can investigate assigned incidents

SOC Manager
      ↓
Can manage incidents and analysts

Security Auditor
      ↓
Can review audit activity

SOC Administrator
      ↓
Can manage users, roles and permissions
2. Users and Roles
2.1 SOC Analyst
The SOC Analyst is responsible for monitoring and investigating security events.
Can:
View assigned alerts
View assigned incidents
Update incident status
Add investigation notes
Search security logs
View basic security dashboards
Cannot:
Create users
Change user roles
Delete incidents
Modify security policies
Manage system permissions
2.2 Senior SOC Analyst
The Senior SOC Analyst has additional responsibilities compared with a standard analyst.
Can:
Perform all SOC Analyst functions
View all incidents
Reassign incidents
Escalate incidents
Investigate suspicious activity
View advanced security logs
Close incidents
The Senior Analyst acts as a higher-level investigator who can assist other analysts.
3. Incident Response Manager
The Incident Response Manager is responsible for overseeing major security incidents.
Can:
View all incidents
Assign analysts to incidents
Escalate incidents
Approve incident closure
Review investigation reports
View security metrics
Monitor the overall incident-response process
The manager does not necessarily need access to system administration functions such as creating accounts or changing system permissions.
4. Security Auditor
The Security Auditor is responsible for reviewing activity and ensuring that users and administrators are following organizational policies.
Can:
View audit logs
Search audit logs
Filter audit logs
Generate reports
Review user activity
Investigate administrative actions
Cannot:
Modify incidents
Change user roles
Delete users
Modify security configurations
This makes the existing Audit Logs functionality particularly useful.
5. SOC Administrator
The SOC Administrator manages the technical operation of the RBAC platform.
Can:
Create users
Delete users
Unlock accounts
Change roles
Manage permissions
View audit logs
Manage system settings
Manage user accounts
This role corresponds closely with the existing Admin/User Management functionality in RBAC Proven.
6. Permission Matrix
A more advanced version of the system could use the following permission structure:
Function	Analyst	Senior Analyst	Manager	Auditor	Administrator
View Alerts	✓	✓	✓	View Only	✓
Investigate Alerts	✓	✓	✓	✗	✓
Create Incident	✓	✓	✓	✗	✓
Close Incident	✗	✓	✓	✗	✓
Assign Analyst	✗	✓	✓	✗	✓
View Audit Logs	✗	✓	✓	✓	✓
Modify Users	✗	✗	✗	✗	✓
Change Roles	✗	✗	✗	✗	✓
Unlock Accounts	✗	✗	✗	✗	✓
The permission system ensures that users can only perform actions appropriate to their responsibilities.
7. SOC Dashboard
The existing RBAC dashboard can eventually be redesigned into a Security Operations Center Dashboard.
Instead of simply displaying a welcome message, the dashboard can display security information.
Example:
┌─────────────────────────────────────────┐
│          SECURITY OPERATIONS            │
├───────────┬───────────┬─────────────────┤
│ Critical  │ High      │ Open Incidents  │
│    4      │    17     │       32        │
├───────────┼───────────┼─────────────────┤
│ Analysts  │ Alerts    │ Resolved Today  │
│    12     │   248     │       56        │
└───────────┴───────────┴─────────────────┘
The dashboard could contain:
Critical Incidents
Number of incidents currently classified as critical.
High Severity Incidents
Number of high-severity incidents.
Open Incidents
Number of incidents that have not yet been resolved.
Active Analysts
Number of analysts currently working in the SOC.
Security Alerts
Number of alerts received.
Resolved Today
Number of incidents resolved during the current day.
8. Recent Security Events
The dashboard can also display recent security events.
Example:
CRITICAL   Brute-force attack detected

HIGH       Suspicious PowerShell activity

MEDIUM     Multiple failed VPN logins

LOW        Port scan detected
This allows SOC personnel to quickly determine whether something requires immediate attention.
9. Incident Management
Incident Management would be one of the major additions to the current RBAC system.
A security incident represents a security event or collection of events that requires investigation.
Example:
Incident #1042

Title:
Brute Force Attack Detected

Severity:
HIGH

Status:
INVESTIGATING

Assigned To:
john_smith

Source:
Authentication Server

Created:
08/14/2026 09:21 AM
10. Incident Status
Incidents could progress through several stages.
NEW
 ↓
INVESTIGATING
 ↓
CONTAINED
 ↓
RESOLVED
 ↓
CLOSED
NEW
The alert has been identified but has not yet been investigated.
INVESTIGATING
A security analyst is currently investigating the incident.
CONTAINED
The immediate threat has been contained.
RESOLVED
The underlying problem has been addressed.
CLOSED
The incident has been reviewed and officially closed.
11. Security Alerts
The system can receive or record security alerts.
Example:
Alert #4521

Type:
Multiple Failed Logins

Source:
192.168.1.25

Target:
admin account

Attempts:
47

Severity:
HIGH
An analyst can select an Investigate option.
The system can then create an incident based on the alert.
12. Account Lockout as a Security Control
The existing account-lockout functionality fits naturally into this SOC system.
The current system locks an account after five incorrect login attempts.
The process becomes:
Attempt 1
LOGIN_FAILED

Attempt 2
LOGIN_FAILED

Attempt 3
LOGIN_FAILED

Attempt 4
LOGIN_FAILED

Attempt 5
LOGIN_FAILED

       ↓

ACCOUNT_LOCKED
This represents a basic brute-force protection mechanism.
13. Security Notification
When an account is locked, the system can notify the user.
For example:
SECURITY ALERT

Your account has been locked after
5 failed login attempts.
The existing React Toastify functionality can be used to display this notification.
A SOC administrator could also receive a security event showing that the account was locked.
14. Audit Logs
The existing Audit Logs page becomes much more important under the SOC premise.
Instead of being simply a record of application activity, it becomes a security activity and accountability log.
Example:
User	Action	Details	Date
john_smith	LOGIN_SUCCESS	User logged in	09:32
mike_admin	ROLE_CHANGED	Changed role to analyst	09:30
john_smith	FAILED_LOGIN	Failed attempt #3	09:28
system	ACCOUNT_LOCKED	Account locked	09:29
sarah_admin	USER_DELETED	Deleted account	09:15
15. Audit Log Search
The existing search functionality can be used as a security investigation tool.
For example, searching:
john
could return:
john_smith
LOGIN_SUCCESS

john_smith
FAILED_LOGIN

john_smith
ACCOUNT_LOCKED
This allows an administrator or auditor to investigate everything associated with a particular account.
16. Audit Log Action Filtering
The action filter can allow users to select specific event types.
Example:
All

LOGIN_SUCCESS

FAILED_LOGIN

ACCOUNT_LOCKED

ROLE_CHANGED

USER_CREATED

USER_DELETED
Selecting:
ACCOUNT_LOCKED
would display only account-lockout events.
Selecting:
ROLE_CHANGED
would display only role changes.
17. Performed By
The performed_by information becomes especially important in a cybersecurity environment.
It answers:
Who performed this action?
Example:
Performed By:
admin01

Action:
ROLE_CHANGED

Details:
Changed john_smith from Analyst to Auditor
This provides accountability.
If an administrator changes someone's privileges, the organization can determine who made the change and when it happened.
18. Incident Audit Trail
The system could eventually maintain a separate history for individual incidents.
Example:
10:42 AM

john_smith created Incident #1042


10:47 AM

john_smith assigned Incident #1042 to himself


11:02 AM

mike_admin changed severity
from MEDIUM → HIGH


11:18 AM

sarah_manager marked incident CONTAINED


12:03 PM

sarah_manager closed Incident #1042
This creates a complete chain of accountability.
19. User Management
The existing User Management section can be redesigned as:
SOC Administration

Users

Roles

Permissions

Account Status

Security Events

Audit Logs
Example:
Username	Role	Status	Failed Attempts
john_smith	Analyst	Active	0
mike_smith	Senior Analyst	Active	1
sarah_admin	Administrator	Active	0
test_user	Analyst	Locked	5
The administrator can:
Create users
Delete users
Change roles
Unlock accounts
View account status
View failed-login attempts
20. Security Incident Types
The SOC platform could organize incidents into several categories.
Authentication
Examples:
Brute-force attack
Credential stuffing
Account takeover
Impossible travel
Malware
Examples:
Trojan detected
Ransomware detected
Suspicious executable
Malicious file detected
Network
Examples:
Port scan
DDoS
Suspicious outbound connection
Unauthorized network access
Phishing
Examples:
Malicious email
Credential phishing
Malicious attachment
Suspicious URL
System
Examples:
Unauthorized administrator account
Privilege escalation
Suspicious PowerShell execution
Unauthorized configuration change
21. Severity Levels
Security incidents can be assigned severity levels.
LOW
Example:
Single failed login.
The event is suspicious but does not represent an immediate threat.
MEDIUM
Example:
Repeated failed login attempts.
The activity requires investigation but may not represent an active compromise.
HIGH
Example:
Account appears to have been compromised.
The event requires immediate investigation.
CRITICAL
Example:
Ransomware detected across multiple systems.
The event requires immediate incident response.
22. Advanced RBAC Design
The current system can eventually evolve beyond simple:
admin
user
roles.
A more advanced RBAC implementation would use:
Users
   ↓
Roles
   ↓
Permissions
For example:
John
 ↓
SOC Analyst
 ↓
 ├── VIEW_ALERTS
 ├── CREATE_INCIDENT
 ├── UPDATE_INCIDENT
 └── VIEW_ASSIGNED_CASES
Another user could have:
Sarah
 ↓
SOC Manager
 ↓
 ├── VIEW_ALERTS
 ├── CREATE_INCIDENT
 ├── UPDATE_INCIDENT
 ├── ASSIGN_ANALYST
 ├── CLOSE_INCIDENT
 └── VIEW_AUDIT_LOGS
This provides more granular authorization.
23. Existing RBAC Proven Features → SOC Features
The existing system can be mapped directly into the SOC concept.
Existing RBAC Feature	SOC Equivalent
Login	SOC authentication
Registration	Employee account creation
JWT	SOC session authentication
bcrypt	Password protection
Admin Panel	SOC Administration
User Management	SOC personnel management
Roles	SOC job roles
Account Lockout	Brute-force protection
Toast Notifications	Security notifications
Audit Logs	Security audit trail
Search	Security investigation
Filters	Event filtering
Dashboard	SOC monitoring dashboard
This means the existing project does not need to be thrown away.
The current foundation can become the foundation of the SOC platform.
24. Possible Final System
A finished version could have navigation similar to:
┌─────────────────────────────────────────────────────────┐
│ SECURITY OPERATIONS CENTER                              │
│                                                         │
│ Dashboard   Incidents   Alerts   Users   Audit Logs    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                 SOC DASHBOARD                           │
│                                                         │
│  Critical     High       Open       Resolved            │
│     4          17         32           56              │
│                                                         │
│              Recent Security Events                    │
│                                                         │
│  🔴 Brute force attack detected                        │
│  🟠 Suspicious login activity                          │
│  🟡 Multiple failed VPN logins                         │
│  🟢 Incident resolved                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
25. Recommended Development Path
The existing RBAC Proven project can be expanded gradually.
Step 1
Keep the existing authentication system.
Step 2
Keep JWT authentication.
Step 3
Keep bcrypt password hashing.
Step 4
Keep the five-attempt account-lockout mechanism.
Step 5
Keep React Toastify security notifications.
Step 6
Keep the existing Admin/User Management functionality.
Step 7
Expand the current roles into SOC-specific roles.
Step 8
Create a permission system.
Step 9
Add Security Alerts.
Step 10
Add Incident Management.
Step 11
Convert the existing dashboard into a SOC dashboard.
Step 12
Expand Audit Logs into a security investigation and accountability system.
Step 13
Add incident-specific audit trails.
Step 14
Add security statistics and charts.
Step 15
Add reporting functionality.
26. Why This Premise Fits the Existing Project
The Cybersecurity Operations Center premise gives the existing RBAC features a practical purpose.
The existing:
Authentication
becomes employee authentication.
JWT
becomes secure session authentication.
bcrypt
protects employee passwords.
Account Lockout
becomes brute-force protection.
React Toastify
becomes a security notification mechanism.
User Management
becomes SOC personnel management.
Roles
become actual SOC job roles.
Audit Logs
become security activity records.
Search
becomes a security investigation tool.
Filtering
becomes an event-analysis tool.
Dashboard
becomes a security monitoring dashboard.
This means the project can evolve from a generic RBAC demonstration into a realistic internal cybersecurity management platform without completely rewriting the foundation that has already been built.
27. Overall System Concept
The final concept can be summarized as:
                    SECURITY OPERATIONS CENTER
                              │
             ┌────────────────┼────────────────┐
             │                │                │
         Security          Incident          User
          Alerts          Management       Management
             │                │                │
             └────────────────┼────────────────┘
                              │
                         RBAC SYSTEM
                              │
             ┌────────────────┼────────────────┐
             │                │                │
        Authentication     Authorization     Auditing
             │                │                │
          JWT +           Roles +          Audit Logs
          bcrypt          Permissions
             │                │                │
             └────────────────┼────────────────┘
                              │
                       Security Monitoring
The overall goal is to create a platform where security personnel only receive the access required for their responsibilities, while important actions are recorded for accountability and investigation.
