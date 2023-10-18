import { Routes, Route } from 'react-router-dom';

import * as ClassPage from '../pages';

export default function ClassRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClassPage.ClassList />} />
      <Route path="/:code" element={<ClassPage.ClassDetail />} />
      <Route path="/:code/newsfeed" element={<ClassPage.ClassDetail />} />
      <Route path="/:code/newsfeed/:id" element={<ClassPage.ClassDetail />} />
    </Routes>
  );
}
