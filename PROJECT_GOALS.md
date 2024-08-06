# KryssonForge GOALS

## Tasks

- Individual task management
  - tasks assignable to users
  - Admin has control of all tasks for every user
  - task editable
    - Not Started
    - In Progress
    - Stuck
    - Waiting
    - Done
  - Task due dates
    - Customize reminders
  - Task Creation Date
  - Task Edit dates
  - Tasks can be assigned to projects
  - Tasks can have sub-tasks
  - Kanban Style drag and drop boards or lists

## Users

- User authentication with Clerk
- email access\* (Future Implementation)
- User groups
  - Estimating
    - assigned project at estimating status
      - can upload and store documents associated with projects
  - Production
    - assigned projects at submittal or pre-construction status through review status
  - Administration
  - Executive
  - Field
    - special group of users with different abilities and function in the app
      - Time tracking per project and per project -> per task
      - Real Time chat
      - document retrieval and sign/edit
      - training documentation
- tasks assigned to users
- contacts assigned to users
- project assigned to users

## Contacts

- Contacts assignable to individual users
- contacts assignable to Users Company if user leaves
- Contact information
  - First Name
  - Last Name
  - Email
  - Phone
  - Cell
  - Address, City State Zip
  - Last Contact Date
  - Contact Creation Date
  - Projects Associated with contact
  - Contact Company
- Rich Text Editor for Notes

## Companies

- companies can be assigned contacts
- companies can be assigned to users
- All application users belong to same company
  - contacts belong to Outside companies
- projects can be assigned to companies
- Rich Text Editor for Notes

## Calendar / Scheduling

- Calendar per user
- Calendar for users company with all user and Company generated events
- Job Scheduling calendar
- task Calendar
- Project progress Calendar with milestone dates
- Field employee scheduling calendar per week per project

## Projects

- Each individual job is a project
  - projects are associated with companies
  - projects are assigned by admin to users
    - users can update project status
      - Not Started
      - Estimating
      - Submittal
      - Pre-Construction
      - In Progress
      - Waiting
      - Stuck
      - Punch Out
      - Close out
      - Review
      - Done
    - Users can upload and store documents that are associated to projects
- Rich Text Editor for Notes

## Time Keeping

- Time Keeping Functionality

  - Field Users
    - Clock in / Out
  - Admin Users

  ## Real Time Chat

  - Chat at user groups (i.e. Field, Sales etc)
  - Private Direct Messaging Chat
  - ability to include links to stored documents

  ## Document storage

  - associated to projects
    - Blueprint
    - Spec
    - Addenda
    - Submittal
    - RFI
    - Change Requests
    - Change orders
    - Contracts
  - Employee training
    - New Hire
    - Safety Training
  - Request forms (i.e. PTO)

## Misc Requirements

- AI integration
  - AI search
  - AI context suggestions
    - New Tasks
    - project Next Steps
    - Project timing suggestions
    - Meeting & Contact suggestions
  - Local AI or API?
    - May have to be server local with instance per Company for context learning and integration
- Mobile responsive application
- Mobile Notifications
  - project status
  - Real Time chat
  - Assigned
    - Tasks
    - Projects
    - Contacts
    - Documents

08/05/2024
