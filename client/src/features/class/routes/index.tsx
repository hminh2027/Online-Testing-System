import { Routes, Route } from 'react-router-dom';

import * as ClassPage from '../pages';

export default function ClassRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClassPage.ClassList />} />
      <Route path="/add" element={<ClassPage.ClassAddEdit />} />
    </Routes>
  );
}
