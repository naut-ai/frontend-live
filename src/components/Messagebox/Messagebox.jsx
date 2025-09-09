import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Skeleton,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";

function Messagebox({ video, loading, timeTaken }) {
  const { colorMode } = useColorMode();

  return (
    <Center>
      <Container maxW="container.md">
        <Skeleton isLoaded={loading.isLoaded}>
          <Box
            marginTop={"80px"}
            backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"}
            p={3}
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
            <Flex justify={"center"}>
              <AspectRatio w={"100%"} ratio={video.src === "" ? 16 / 9 : 1}>
                {video.src === "" ? (
                  <Text fontWeight="bold" fontSize="lg" fontFamily={"Inter"}>
                    Study the way you like!
                  </Text>
                ) : (
                  <video
                    src={video.src}
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    autoPlay
                    crossOrigin="anonymous"
                    style={{
                      objectFit: "cover",
                    }}
                  >
                    {video.subtitle && (
                      <track
                        src={video.subtitle}
                        kind="subtitles"
                        srclang="en"
                        label="English"
                        default
                      />
                    )}
                  </video>
                )}
              </AspectRatio>
            </Flex>
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
            {`${loading.loadingText}(${timeTaken})`}
          </Text>
        )}
      </Container>
    </Center>
  );
}

export default Messagebox;
