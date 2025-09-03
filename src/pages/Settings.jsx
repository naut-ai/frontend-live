import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

const Settings = ({ apiKeys, setApiKeys }) => {
  const { colorMode } = useColorMode();

  const [didKey, setDidKey] = useState("");
  const [elevenLabsKey, setElevenLabsKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDidKey(apiKeys.didApiKey || "");
    setElevenLabsKey(apiKeys.elevenlabsApiKey || "");
    setGeminiKey(apiKeys.geminiApiKey || "");
  }, [apiKeys]);

  const handleSaveCredentials = () => {
    const newKeys = {
      didApiKey: didKey,
      elevenlabsApiKey: elevenLabsKey,
      geminiApiKey: geminiKey,
    };
    setApiKeys(newKeys);
    localStorage.setItem("apiKeys", JSON.stringify(newKeys));
    setDisabled(true);
  };

  return (
    <>
      <Center>
        <Container maxW="container.md">
          <Box marginTop={"80px"}>
            <Flex justify={"space-between"} gap={2}>
              <Text
                fontSize={"4xl"}
                fontWeight={"semibold"}
                marginBottom={"50px"}
              >
                Settings
              </Text>
              <Button
                colorScheme="purple"
                fontFamily={"Inter"}
                marginTop={"10px"}
                onClick={() => setDisabled(false)}
                borderRadius={"full"}
                disabled={!disabled}
              >
                <Icon as={Pencil} marginRight={2} />
                Edit Keys
              </Button>
            </Flex>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              D-ID
            </Text>
            <Flex justify={"center"} align={"center"} height={"10vh"}>
              <Input
                fontFamily={"Inter"}
                placeholder="D-ID API Key"
                value={didKey}
                size={"lg"}
                disabled={disabled}
                onChange={(e) => {
                  setDidKey(e.target.value);
                }}
                backgroundColor={colorMode === "dark" ? "gray.700" : "gray.50"}
              />
            </Flex>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              ElevenLabs
            </Text>
            <Flex justify={"center"} align={"center"} height={"10vh"}>
              <Input
                fontFamily={"Inter"}
                placeholder="ElevenLabs API Key"
                value={elevenLabsKey}
                size={"lg"}
                disabled={disabled}
                onChange={(e) => {
                  setElevenLabsKey(e.target.value);
                }}
                backgroundColor={colorMode === "dark" ? "gray.700" : "gray.50"}
              />
            </Flex>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              Gemini
            </Text>
            <Flex justify={"center"} align={"center"} height={"10vh"}>
              <Input
                fontFamily={"Inter"}
                placeholder="Gemini API Key"
                value={geminiKey}
                size={"lg"}
                disabled={disabled}
                onChange={(e) => {
                  setGeminiKey(e.target.value);
                }}
                backgroundColor={colorMode === "dark" ? "gray.700" : "gray.50"}
              />
            </Flex>
            <Button
              paddingY={6}
              colorScheme="purple"
              fontFamily={"Inter"}
              width={"full"}
              marginTop={"20px"}
              disabled={disabled}
              onClick={handleSaveCredentials}
            >
              Save Credentials
            </Button>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Settings;
