import { Toaster } from "react-hot-toast";
import AppRouter from "@/routes/AppRouter";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const MainLayout = () => {
  return (
    <main className="min-h-screen my-2 flex flex-col justify-between">
      <Toaster position="bottom-right" reverseOrder={true} />
      <Header />
      <div className="flex-1">
        <AppRouter />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
