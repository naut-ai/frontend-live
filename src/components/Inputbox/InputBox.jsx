import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  useColorMode,
} from "@chakra-ui/react";

function InputBox({ prompt, setPrompt, handleSubmit, loading, disabled }) {
  const { colorMode } = useColorMode();
  return (
    <Center>
      <Container maxW="container.md">
        <Box>
          <Flex justify={"center"} align={"center"} height={"20vh"}>
            <Input
              fontFamily={"Inter"}
              placeholder="Describe your video..."
              value={prompt}
              size={"lg"}
              disabled={disabled}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              backgroundColor={colorMode === "dark" ? "gray.700" : "gray.50"}
            />
            <Box>
              <Button
                marginLeft={2}
                paddingY={6}
                colorScheme="purple"
                fontFamily={"Inter"}
                onClick={handleSubmit}
                disabled={prompt ? disabled : true}
                isLoading={loading.isLoading}
              >
                Generate
              </Button>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Center>
  );
}

export default InputBox;
