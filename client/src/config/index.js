// API Host configuration
// In development: uses REACT_APP_HOST (http://localhost:3002)
// In production on Render: backend and frontend are same origin, uses relative paths
const getAPIHost = () => {
  // Check if REACT_APP_HOST is explicitly set (development)
  if (process.env.REACT_APP_HOST) {
    console.log('[API Config] Using REACT_APP_HOST:', process.env.REACT_APP_HOST);
    return process.env.REACT_APP_HOST;
  }
  
  // Production: use relative paths for same-origin requests
  console.log('[API Config] Using relative paths (production mode)');
  return '';
};

export const API_HOST = getAPIHost();