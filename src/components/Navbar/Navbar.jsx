import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Moon, Settings, Sun, Video } from "lucide-react";
import { Link } from "react-router-dom";
import darkLogo from "../../assets/dark_logo.png";
import lightLogo from "../../assets/light_logo.jpg";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="container.md" marginTop={10}>
      <Box>
        <Flex gap={3}>
          <Link to={"/"} viewTransition>
            <Flex gap={1}>
              <Avatar
                p={1}
                name="Naut AI"
                src={colorMode === "light" ? lightLogo : darkLogo}
                marginRight={1}
              />
              <Text
                fontFamily={"Poppins"}
                p={1}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                Naut AI(v3.6)
              </Text>
            </Flex>
          </Link>
          <Spacer />
          <Link to={"/video/create"} viewTransition>
            <Button borderRadius={"full"} colorScheme="purple">
              <Icon as={Video} marginRight={2} />
              Create Video
            </Button>
          </Link>
          <Link to={"/video/settings"} viewTransition>
            <Button borderRadius={"full"}>
              <Icon as={Settings} marginRight={2} />
              Settings
            </Button>
          </Link>
          <Button onClick={toggleColorMode} borderRadius={"full"}>
            {<Icon as={colorMode === "light" ? Sun : Moon} />}{" "}
            {/* <Text fontFamily={"Inter"}>
              {colorMode === "light" ? "Light" : "Dark"}
            </Text> */}
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}

export default Navbar;
