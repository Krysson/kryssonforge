# Log

## 08/13/2024

- Implement S3 file management system with Next.js 14 and shadcn/ui
  - Created API routes for file upload, download, delete, and listing
  - Implemented file upload page with automatic redirection and toast notifications
  - Developed file listing page with sorting, download, and delete functionalities
  - Added loading state with skeleton loaders to file listing page
  - Integrated shadcn/ui components for improved UI/UX
  - Implemented navigation between upload and file listing pages
  - Added error handling and success messages using toast notifications
  - Optimized file size display and date formatting
  - Ensured responsive design for better user experience across devices

## 08/13/2024

- updated package.json scripts to have "build: " prisma generate && next Build " to try and fix vercel deploy issue
- fixed AddContact issue - works locally
- added projects listing
  - added add projects page
  - added api routes for Users & Projects
  - connected projects to mongo and tested
- Added Blank Dashboard page
- added My Company information - hard coded

## 08/12/2024

- added "Contacts" Page
- Merged the sidebar and the header
  - restyled
- added the JSON for companies & contacts
- added contacts page
  - added contacts functionality
- Added companies page
  - added companies functionality

## 08/08/2024

- added "Add Task" Page
- added "Projects" Page
  - Card View
  - Status View
- Fixed sidebar links to be LINKS instead of "a"'s for faster internal routing
- feat: Add svix dependency and implement sign-in and sign-up pages
  -The commit adds the `svix` dependency to the project, which is required for implementing webhooks. It also adds the `sign-in` and `sign-up` pages with corresponding components from the `@clerk/nextjs` library. These changes enhance the functionality and user experience of the application.
- feat: added webhooks for clerk that are viewable in clerk - should be viewable in vercel - step toward transfering to MongoDB

## 08/07/2024

- Added Hero Section
- Styled and added Footer section
  - no Function yet
- Added task page
- Added JSON files for testing
  - users
  - tasks
  - projects
- styled Tasks page
- added search bar to tasks page

## 08/06/2024

- Added dedicated LOG File
- Installed ESLint
- Installed Playwright
- added PRISMA
  - Connected to MONGODB
    - UNTESTED
  - Set up Schema for tasks and users
    - NOT DEPLOYED

## 08/05/2024

- app creation
- created basic app structure and folders
  - spread footer and header to comp files
- Created side bar menu
- created OLD folder for files & added to gitignore
- Installed Lucide React Icons and attached to side bar
