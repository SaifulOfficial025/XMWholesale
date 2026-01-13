import Container from "../../Layout/Container/Container";
import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import Business from "./Business";
import Category from "./Category";
import Hero from "./Hero";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Slider />
      <Category />
      <Business />
      <Footer />
    </div>
  );
};

export default Home;
