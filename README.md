# Blueprint Diagnostic Screener Frontend

## Problem and Solution

### Problem
Provide a frontend to conduct diagnostic screenings. 
[Full spec](https://github.com/blueprinthq/coding-exercise?tab=readme-ov-file#part-ii)

### Solution
This application provides:
- A clean, intuitive interface for presenting screening questions
- Progressive disclosure of questions with smooth transitions
- Comprehensive accessibility features (ARIA attributes, keyboard navigation)
- Error boundary implementation for graceful error handling
- Responsive design that works on all device sizes

**Note:** The backend repository can be found [here](https://github.com/happinessEngineer/blueprint-diagnostic-screener-backend).

## Live application
- https://happinessengineer.github.io/blueprint-diagnostic-screener-frontend/



## Running the Application
To start the development server, run the following command in your terminal:  
`npm run dev`

## GitHub Deployment Workflow

This project utilizes GitHub Actions to automate the deployment process to GitHub Pages. The workflow is defined in the `.github/workflows/deploy.yml` file and is triggered by pushing to the `main` branch.

## Technical Choices

### React with TypeScript
- **TypeScript**: Provides type safety, better IDE support, and catches errors at compile time
- **React**: Chosen for its component-based architecture, virtual DOM, and rich ecosystem

### Vite
- **Build Tool**: Chosen for its fast development server, HMR, and optimized production builds. A more robust tool with SSR (such as Next.js) did not seem necessary for this project.

### Accessibility
- **ARIA Attributes**: Implemented throughout the application for screen reader support
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Proper focus handling for better user experience

### Screener configuration
- The screener configuration is fetched from the backend to ensure a single source of truth, eliminating the need to duplicate the configuration for mobile and manage it across multiple locations. The trade-offs include the absence of SEO (which is not critical for this type of tool) and a brief delay while the configuration is retrieved from the API (which is deemed acceptable in this scenario).

## Production Deployment

I would deploy this application according to the established processes of Blueprint's engineering team. I expect this would include:

1. **Cloud-based hosting** using a CDN and caching to optimize performance
2. **Integrating a CI/CD tool** to automate testing and deployment workflows
3. **Integrating with other tools** to monitor errors/performance and track analytics
4. **Scaling considerations** including using a load balancer or auto scaling

### Suggestions for further improvements

1. **Implement Security Headers to tighten security**:
   - Content Security Policy (CSP)
   - X-Frame-Options to prevent clickjacking
   - X-Content-Type-Options to prevent MIME type sniffing
   - Referrer-Policy to control referrer information

2. **Add Automated Testing to inhibit regression**:
   - Add comprehensive unit and integration tests
   - Implement end-to-end testing with Cypress or Playwright
