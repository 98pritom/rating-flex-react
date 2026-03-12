import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-8 mt-8">
        <p>Rating Flex &mdash; Powered by TMDB</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
