import { Stack, Text, Button } from "@chakra-ui/react";
import { BLECLIP } from "./classBLECLIP";

const Home = () => {
  const clipDevice = new BLECLIP();
  return (
    <>
      <Stack minW={"100vw"} h={"100px"} bgColor={"orange.300"}>
        <Text>
          Ini adalah home pages, ini bisa dimainin gaes atau kalau mau buat baru
          bisa buat folder di pages
        </Text>
        <Button onClick={() => clipDevice.connectToBLE()}> Connect </Button>
        <Button onClick={() => clipDevice.requestToBLE("WRITE#Nama_CLIP")}>
          {" "}
          Write{" "}
        </Button>
        <Text>{clipDevice.getIMEI()}</Text>
      </Stack>
    </>
  );
};

export default Home;
