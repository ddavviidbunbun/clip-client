import { useState } from "react";
import "./App.css";
import { Stack, Button, Image, Text } from "@chakra-ui/react";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Home />
      <Stack minH={"100vh"} minW={"100vw"} bgColor={"orange.50"}>
        <Text fontSize={"2rem"}>App.tsx jangan dimainin gaes</Text>
      </Stack>
    </>
  );
}

export default App;
