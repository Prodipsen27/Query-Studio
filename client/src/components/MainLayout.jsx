import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, sidebar }) => {
  return (
    <div className="flex h-screen w-full bg-[#0a0f1c] overflow-hidden">
      {/* Sidebar - Dynamic */}
      {sidebar}


      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
