import Page from "../../components/Page";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Hero from "./components/Hero";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <Page title="Home - gamer.bazar">
      <Box className="min-h-screen bg-slate-100">
        <Header />
        <Hero />
        <Footer />
      </Box>
    </Page>
  );
};

export default Home;
