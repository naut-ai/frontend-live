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

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDidKey(apiKeys.heygenApiKey || "");
  }, [apiKeys]);

  const handleSaveCredentials = () => {
    const newKeys = {
      heygenApiKey: didKey,
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
              HeyGen
            </Text>
            <Flex justify={"center"} align={"center"} height={"10vh"}>
              <Input
                fontFamily={"Inter"}
                placeholder="HeyGen API Key"
                value={didKey}
                size={"lg"}
                disabled={disabled}
                onChange={(e) => {
                  setDidKey(e.target.value);
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
