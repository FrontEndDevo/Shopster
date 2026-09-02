import AppRouter from "@/routes/AppRouter";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
// import Header from "@components/common/Header";
// import Footer from "@components/common/Footer";

const MainLayout = () => {
  return (
    <main className="h-svh my-2 flex flex-col justify-between">
      <Header />
      <AppRouter />
      <Footer />
    </main>
  );
};

export default MainLayout;
