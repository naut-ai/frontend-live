import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Skeleton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Messagebox({ video, loading }) {
  const { colorMode } = useColorMode();
  const [elapsed, setElapsed] = useState(0);

  // 🔹 Start timer when loading begins, reset when loading ends
  useEffect(() => {
    if (loading.isLoading) {
      const startTime = Date.now();
      setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
  }, [loading.isLoading]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(video.content);
    toast.success("Video Summary Copied!");
  };

  return (
    <Center>
      <Container maxW="container.md">
        <Skeleton isLoaded={loading.isLoaded}>
          <Box
            marginTop={"80px"}
            backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"}
            p={5}
            borderRadius="lg"
          >
            <Text
              m={2}
              fontSize={["lg", "2xl"]}
              fontWeight={"semibold"}
              fontFamily={"Inter"}
            >
              {video.title}
            </Text>
            <Badge
              colorScheme="purple"
              fontFamily={"Inter"}
              mx={2}
              mb={3}
              fontSize={"sm"}
              textTransform={"lowercase"}
            >
              {video.id}
            </Badge>
            <Tabs
              isFitted
              variant="soft-rounded"
              colorScheme="purple"
              size={"md"}
              marginTop={"10px"}
            >
              <TabList>
                {video.src && (
                  <>
                    <Tab fontWeight={"semibold"} fontFamily={"inter"}>
                      Video
                    </Tab>
                    <Tab fontWeight={"semibold"} fontFamily={"inter"}>
                      Summary
                    </Tab>
                  </>
                )}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex
                    justify={"center"}
                    marginTop={"10px"}
                    flexDirection={"column"}
                  >
                    <AspectRatio
                      maxWidth={"1280px"}
                      maxHeight={"720px"}
                      ratio={16 / 9}
                    >
                      {video.src === "" ? (
                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          fontFamily={"Inter"}
                        >
                          Study the way you like!
                        </Text>
                      ) : (
                        <video
                          src={video.src}
                          controls
                          controlsList="nodownload"
                          disablePictureInPicture
                          onContextMenu={(e) => e.preventDefault()}
                          poster={video.metadata.thumbnail_url}
                          crossOrigin="anonymous"
                          style={{
                            objectFit: "cover",
                          }}
                        >
                          {video.subtitle && (
                            <track
                              src={video.subtitle}
                              kind="subtitles"
                              srcLang="en"
                              label="English"
                              default
                            />
                          )}
                        </video>
                      )}
                    </AspectRatio>
                    {video.src && (
                      <a
                        href={video.src}
                        download={video.title}
                        className="mt-5 self-end"
                      >
                        <Button
                          borderRadius={"full"}
                          alignSelf={"flex-end"}
                          colorScheme="purple"
                          fontFamily={"Inter"}
                        >
                          <Icon as={Download} marginRight={2} />
                          Download Video
                        </Button>
                      </a>
                    )}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex justify={"center"} marginTop={"10px"}>
                    <Box w={"100%"} p={2}>
                      <Text
                        fontSize="lg"
                        fontFamily={"Inter"}
                        marginBottom={"30px"}
                      >
                        {video.content}
                      </Text>
                      {!video.content && (
                        <Text fontWeight={"medium"}>
                          No video to summarize content!
                        </Text>
                      )}
                      <Flex justify={"space-between"} align={"center"}>
                        <Text
                          marginBottom={"20px"}
                          fontSize={"sm"}
                          fontFamily={"Inter"}
                          fontWeight={"medium"}
                          color={"gray.500"}
                        >
                          This is a detailed summary of the generated video
                        </Text>
                        <Button
                          alignSelf={"flex-end"}
                          onClick={handleCopySummary}
                        >
                          Copy summary
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Skeleton>
        {loading.isLoading && (
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -150%)"
            fontWeight="semibold"
            fontSize={["sm", "md", "lg"]}
            fontFamily={"Poppins"}
          >
            <Spinner mx={2} marginBottom={"-5px"} position={"relative"} />
            {`${loading.loadingText} ${
              loading.loadingText === "Processing video..."
                ? `(This may take few minutes)`
                : `(${elapsed}s)`
            }`}
          </Text>
        )}
      </Container>
    </Center>
  );
}

export default Messagebox;
