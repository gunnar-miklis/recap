import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import User from '../pages/User.jsx';
import Projects from '../pages/Projects.jsx';
import Project from '../pages/Project.jsx';
import fakeUserData from '../db/fakeUserData.json';
import fakeProjectsData from '../db/fakeProjectsData.json';

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    showNavbar: true,
  },
  {
    name: 'Projects',
    path: '/projects',
    element: <Projects fakeProjectsData={fakeProjectsData} />,
    showNavbar: true,
  },
  {
    name: 'Project',
    path: '/projects/:projectID',
    element: <Project fakeProjectsData={fakeProjectsData} />,
    showNavbar: false,
  },
  {
    name: 'User',
    path: '/user',
    element: <User fakeUserData={fakeUserData} />,
    showNavbar: true,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
    showNavbar: true,
  },
];
