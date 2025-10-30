"use client";
import Container from "@/common/components/shared/Container";
import Sidebar from "@/sections/profile/Sidebar";

const ProfileLayout = ({ children }) => {
  return (
    <div className="bg-surface py-6 lg:py-12">
      <Container>
        <div className="flex flex-col lg:flex-row w-full h-[650px]">
          <div className="w-full lg:w-72">
            <Sidebar />
          </div>
          {/* Main Content - Takes remaining space */}
          <main className="flex-1 bg-background overflow-y-auto">
            <div className="p-3 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default ProfileLayout;
