import { Routes, Route } from 'react-router-dom';
import ClassesPage from '../pages/ClassList';

export default function ClassRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClassesPage />} />
    </Routes>
  );
}
