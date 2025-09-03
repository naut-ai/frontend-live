import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleGenerate = () => {
    navigate(`/video/create`);
  };

  return (
    <div className="hero-section">
      <Container maxW={"container.md"}>
        <Center h={"80vh"}>
          <Box>
            <Text
              fontSize={"5xl"}
              fontWeight={"semibold"}
              textAlign={"center"}
              fontFamily={"Poppins"}
            >
              Explore our tool to brighten your minds
            </Text>
            <Flex justify={"center"} align={"center"} height={"20vh"}>
              <Input
                fontFamily={"Inter"}
                placeholder="Describe your video..."
                size={"lg"}
                backgroundColor={colorMode === "dark" ? "gray.700" : "gray.50"}
              />
              <Box>
                <Button
                  marginLeft={2}
                  paddingY={6}
                  colorScheme="purple"
                  fontFamily={"Inter"}
                  onClick={handleGenerate}
                >
                  {"Create"}
                </Button>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Container>
    </div>
  );
}
