import Page from "../../components/Page";
import Header from "../Home/components/Header";
import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ErrorIcon from "@mui/icons-material/Error";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RocketIcon from "@mui/icons-material/Rocket";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const HowWeWork = () => {
  return (
    <Page title="How We Work - gamer.bazar">
      <Header />
      <Box className="p-5 flex gap-2 flex-col max-w-4xl m-auto">
        <Typography variant="h1" fontWeight="bold" className="text-center">
          🚀
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-500"
          sx={{ lineHeight: 2 }}
        >
          Welcome to our gaming marketplace, where gamers can find their favorite video games and gaming gear all in one place. Our easy-to-use platform allows users to browse and purchase items with just a few clicks. We offer a wide selection of games and gear, including the latest releases and popular classics. With our streamlined process, ordering is quick and hassle-free. Whether you're a casual gamer or a hardcore enthusiast, our gaming marketplace is the perfect destination for all your gaming needs.
        </Typography>
      </Box>
      <Box className="p-5 flex gap-2 flex-col max-w-4xl m-auto">
        <Typography variant="h4" fontWeight="bold">
          How does it work?
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-500"
          sx={{ lineHeight: 2 }}
        >
          Our gaming marketplace operates on a simple process. Users can browse through our selection of video games and gaming gear, select the items they wish to purchase, and complete their order using our secure payment system. Once the order is confirmed, we process the payment and ship the item(s) to the user's designated address. In the event that there is an issue with an order, we offer dispute handling services to ensure that both the buyer and seller are protected. If a user encounters any problems with an order, they can initiate a dispute through our platform. Our team will investigate the issue and work to resolve it in a fair and timely manner.
        </Typography>
      </Box>
      <Box className="p-5 flex gap-2 flex-col max-w-4xl m-auto">
        <Timeline
          position="alternate"
          sx={{
            margin: "0 auto",
            maxWidth: "40rem",
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                color="primary"
                sx={{
                  boxShadow: "none",
                }}
              >
                <RocketIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Step 1
              </Typography>
              <Typography>You select products.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary"></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Step 2
              </Typography>
              <Typography>You paid the amount.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary"></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Step 3
              </Typography>
              <Typography>The order is started.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary"></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Step 4
              </Typography>
              <Typography>You receive your products.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                variant="filled"
                color="secondary"
                sx={{
                  boxShadow: "none",
                  fontWeight: "bold",
                }}
              >
                <DoneAllIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Satisfied?
              </Typography>
              <Typography>
                Order is marked as completed and you can leave a review.
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                variant="filled"
                color="error"
                sx={{
                  boxShadow: "none",
                }}
              >
                <ErrorIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Any issues?
              </Typography>
              <Typography>
                You raise a dispute and attach your evidence. Our team handles
                the rest.
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                variant="filled"
                color="success"
                sx={{
                  boxShadow: "none",
                }}
              >
                <InsertEmoticonIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h6"
                sx={{
                  pt: 1.5,
                  fontWeight: "bold",
                }}
              >
                Deal hassle-free
              </Typography>
              <Typography>Leave the trust to us.</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
      <Box className="p-5 flex gap-2 flex-col max-w-4xl m-auto">
        <Typography variant="h4" fontWeight="bold">
          Still have questions?
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-500"
          sx={{ lineHeight: 2 }}
        >
          Feel free to contact us at{" "}
          <Link to="mailto:help@gamer.bazar">help@gamer.bazar</Link>
        </Typography>
      </Box>
      <Footer />
    </Page>
  );
};

export default HowWeWork;
