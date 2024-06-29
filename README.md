## Sample React App with Sisense Self Service Via Compose SDK


![SelfServiceExample](https://github.com/StevePuma/csdk-self-service-dashboard/assets/102320035/56543352-1430-4e4c-aa5b-ab03f4551b63)
![CodeWalkthrough](https://github.com/StevePuma/csdk-self-service-dashboard/assets/102320035/207bde92-f36f-4a1e-8415-1826e13e6a52)



This repository provides a sample React application using a TypeScript template. It showcases how to create a self-service drag-and-drop frontend using the Sisense Compose SDK to fetch widgets from the Sisense Fusion Embed platform and dynamically update them.

### Description

This template is intended for current Sisense customers. However, if you are trialing Sisense, you can use your personal API token and the provided sample e-commerce dashboard ID in the setup. The application demonstrates how to create a customizable dashboard by fetching existing Sisense widgets and allowing the user to control their placement and appearance.

### Features

- **Self-service drag-and-drop frontend**
- **Dynamic widget updates**
- **Integration with Sisense Fusion Embed platform**

### Components Used

- **useGetDashboardModel** hook
- **useGetWidgetModel** hook

These methods fetch existing Sisense widgets from a dashboard and allow the developer to control their placement and appearance.

### Packages Used

- **React**
- **TypeScript**
- **@mui/material**
- **react-grid-layout**
- **html2canvas**
- **@mui/icons-material**
- **@sisense/sdk-ui**
- **@sisense/sdk-data**

### Setup Instructions

Follow these steps to set up the application on your local machine.

#### Prerequisites

- Node.js
- npm 

#### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/sample-react-sisense-app.git
cd sample-react-sisense-app
```

2. **Install dependencies:**

```bash
npm install

3. **Update configuration:**

- **Update Dashboard IDs:**
  - In `App.tsx`, update the `dashboardOid` to your specific dashboard ID.
  - In `ChartLibrary.tsx`, ensure the dashboard ID is also updated.

- **Set Sisense Server URL and API Token:**
  - In `index.tsx`, add your Sisense server URL and API token to the `SisenseContextProvider`.

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SisenseContextProvider } from '@sisense/sdk-ui';

// Replace with your Sisense server URL and API token
const serverUrl = 'YOUR_SISENSE_SERVER_URL';
const apiToken = 'YOUR_API_TOKEN';

ReactDOM.render(
  <SisenseContextProvider
    server={serverUrl}
    token={apiToken}
  >
    <App />
  </SisenseContextProvider>,
  document.getElementById('root')
);
```

4. **Run the application:**

```bash
npm start

### How It Works

The application consists of the following main components:

#### 1. `App.tsx`

- **Handles the main layout and logic for adding/removing widgets.**
- **Manages the state for the chart library and selected charts.**
- **Provides options to export the dashboard to a PDF using `html2canvas`.**

#### 2. `ChartLibrary.tsx`

- **Provides a list of available charts that users can select from.**
- **Uses the `useGetDashboardModel` and `useGetWidgetModel` hooks to fetch data from Sisense.**

#### 3. `index.tsx`

- **Sets up the `SisenseContextProvider` with the server URL and API token.**
- **Renders the main `App` component.**

### Exploring Further

To get started quickly with Sisense, visit the [Sisense documentation](https://sisense.dev/guides/sdk/getting-started/).

For more details on the methods used, refer to the following guides:
- **useGetDashboardModel hook**: [Sisense Documentation](https://sisense.dev/guides/sdk/modules/sdk-ui/fusion-embed/function.useGetDashboardModels.html)
- **useGetWidgetModel hook**: [Sisense Documentation](https://sisense.dev/guides/sdk/modules/sdk-ui/fusion-embed/function.useGetWidgetModels.html)

### Conclusion

This sample application provides a foundation for creating a self-service drag-and-drop dashboard using Sisense Compose SDK. By following the setup instructions and exploring the code, you can customize and extend the application to fit your specific needs. Happy coding!
