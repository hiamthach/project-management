import Dashboard from 'pages/Dashboard';
import Projects from 'pages/Projects';
import Tasks from 'pages/Tasks';
import Calendars from 'pages/Calendars';
import AddProject from 'pages/AddProject';

const publicRoutes = [
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: 'projects',
    Component: Projects,
  },
  {
    path: 'project/add',
    Component: AddProject,
  },
  {
    path: 'calendar',
    Component: Calendars,
  },
  {
    path: 'tasks',
    Component: Tasks,
  },
];

export { publicRoutes };
