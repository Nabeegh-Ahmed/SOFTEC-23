import HeroGrid from "./components/HeroGrid";
import { HeroGridItem } from "./components/HeroGrid";
import { Typography, Box, Divider } from "@mui/material";
import heroPageImage2 from "../../../../assets/hero/hero6.png";
import heroPageImage1 from "../../../../assets/hero/hero5.png";
import CustomButton from "../../../../components/CustomButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import SiteMap from "../../../../routing/Sitemap";

const Hero = () => {
  return (
    <>
      <HeroGrid>
        <HeroGridItem>
          <Typography variant="h2" fontWeight="bolder">
            Buy Online Video Games & Gaming Gears
          </Typography>
          <Typography variant="body1" mt={3} className="md:w-[75%]">
            Welcome to our gaming marketplace, where gamers can find their favorite video games and gaming gear all in one place. Our easy-to-use platform allows users to browse and purchase items with just a few clicks. We offer a wide selection of games and gear, including the latest releases and popular classics. With our streamlined process, ordering is quick and hassle-free. Whether you're a casual gamer or a hardcore enthusiast, our gaming marketplace is the perfect destination for all your gaming needs.
          </Typography>
          <Box className="md:mb-0 mb-5 mt-5 w-full md:w-fit">
            <Link to={SiteMap.Register.path}>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                endIcon={<ArrowForwardIcon />}
              >
                Get Started
              </CustomButton>
            </Link>
          </Box>
        </HeroGridItem>
        <HeroGridItem>
          <img draggable={false} src={heroPageImage1} alt="" />
        </HeroGridItem>
      </HeroGrid>
      <HeroGrid>
        <HeroGridItem>
          <img draggable={false} src={heroPageImage2} alt="" />
        </HeroGridItem>

        <HeroGridItem>
          <Typography variant="h2" fontWeight="bolder">
            With Money Back Guarantee
          </Typography>
          <Typography variant="body1" mt={3} className="md:w-[75%]">
            Our gaming marketplace operates on a simple process. Users can browse through our selection of video games and gaming gear, select the items they wish to purchase, and complete their order using our secure payment system. Once the order is confirmed, we process the payment and ship the item(s) to the user's designated address. In the event that there is an issue with an order, we offer dispute handling services to ensure that both the buyer and seller are protected. If a user encounters any problems with an order, they can initiate a dispute through our platform. Our team will investigate the issue and work to resolve it in a fair and timely manner.
          </Typography>
          <Box className="md:mb-0 mb-5 mt-5 w-full md:w-fit">
            <Link to={SiteMap.Register.path}>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                endIcon={<ArrowForwardIcon />}
              >
                Get Started
              </CustomButton>
            </Link>
          </Box>
        </HeroGridItem>
      </HeroGrid>

    </>
  );
};

export default Hero;
