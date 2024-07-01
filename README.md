# Teacher's Dashboard

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#Tecg-Stack)
- [Getting Started](#Getting-Started)
- [Project Structure](#Project-Structure)
- [Deployment](#Deployment)

#

### Prerequisites

- <img src="./readme/nodejs.png" width="25" style="top: 8px" /> Node JS @16.X and up
- <img src="./readme/npm.png" width="25" style="top: 8px" /> npm @8 and up

#

### Tech Stack

- <img src="./readme/react.png" width="25" style="top: 8px" /> React @ 18.3.1 - A JavaScript library for building user interfaces.
- <img src="./readme/typescript.png" width="25" style="top: 8px" /> TypeScript @ 5.2.2 - Typed superset of JavaScript.
- <img src="./readme/tailwind.png" width="25" style="top: 8px" /> Tailwind CSS @ 3.4.4 - Utility-first CSS framework.
- <img src="./readme/axios.png" width="25" style="top: 8px" /> Axios @ 1.7.2 - Promise based HTTP client for the browser and Node.js.
- <img src="./readme/ws.jpg" width="25" style="top: 8px" /> ws @ 8.17.1 - Simple to use, blazing fast and thoroughly tested WebSocket client, server, and console for node.js.
- <img src="./readme/sweetalert.png" width="25" style="top: 8px" /> sweetalert @ 2.1.2 - A beautiful replacement for JavaScript's alert.

#

### Getting Started

1. First of all you need to clone app repository from Github :

```
git clone https://github.com/Tusho7/teachers-dashboard-front
```

2. Next step requires install all the dependencies.

```
npm install
```

3. To see project in action

```
npm run start
```

#

### Project Structure

```
src
├── assets          # Static assets (images, fonts, etc.)
├── components      # React components
├── contexts        # Page contexts
├── modals          # Page modals
├── pages           # Page components
├── plugins         # Application plugins
├── services        # Application services
├── types           # Application interfaces
├── utils           # Utility functions
├── App.tsx         # Main application component
├── index.tsx       # Entry point file
└── main.tsx        # Main file for rendering React app
```

#

### Deployment

Before every deployment you need to create build file.

```

npm run build

```

after this you can use this file to deploy project on server.

#

assets: Contains static assets like images and fonts.

#

components: Reusable React components.

#

contexts: Context providers for managing global state.

#

modals: Modal components used in various pages.

#

pages: Page components representing different views in the app.

#

plugins: Plugins used within the application.

#

services: Service functions for API calls and other functionalities.

#

types: TypeScript interfaces and types.

#

utils: Utility functions and helpers.

#

App.tsx: Main application component.

#

index.tsx: Entry point file for the React app.

#

main.tsx: Main file for rendering the React application.

#

This README template provides a clear structure and instructions for setting up and understanding your Teacher's Dsahboard Frontend project. Adjust the sections and details according to your specific project setup and requirements.

```

```
