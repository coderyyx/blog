import './App.css';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import About from './pages/about';
import Home from './pages/home';

const App = () => {
  return (
    <div className="tw-min-h-screen tw-bg-gray-100">
      {/* 导航栏 */}
      <nav className="tw-shadow">
        <div className="tw-container tw-mx-auto tw-px-4">
          <div className="tw-flex tw-h-16 tw-items-center tw-justify-between">
            <div className="tw-flex tw-space-x-4">
              <Link
                to="/16"
                className="tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50"
              >
                首页
              </Link>
              <Link
                to="/100"
                className="tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50"
              >
                关于
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 路由内容 */}
      <main className="tw-container tw-mx-auto tw-mt-6 tw-px-4">
        <Routes>
          <Route path="/16" element={<Home />} />
          <Route path="/100" element={<About />} />
          <Route path="/" element={<Navigate to="/16" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
