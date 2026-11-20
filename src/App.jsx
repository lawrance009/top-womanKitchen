import { MotionConfig } from "framer-motion";
import { OrderProvider } from "./context/OrderContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Menu from "./components/Menu.jsx";
import FirstTime from "./components/FirstTime.jsx";
import HowToOrder from "./components/HowToOrder.jsx";
import About from "./components/About.jsx";
import Events from "./components/Events.jsx";
import Visit from "./components/Visit.jsx";
import Footer from "./components/Footer.jsx";
import OrderDrawer, { MobileOrderBar } from "./components/OrderDrawer.jsx";

export default function App() {
  return (
    // reducedMotion="user" respects people who turn animations off on their device
    <MotionConfig reducedMotion="user">
      <OrderProvider>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Menu />
          <FirstTime />
          <HowToOrder />
          <About />
          <Events />
          <Visit />
        </main>
        <Footer />
        <OrderDrawer />
        <MobileOrderBar />
      </OrderProvider>
    </MotionConfig>
  );
}
