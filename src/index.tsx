import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  Center,
  chakra
} from "@chakra-ui/react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import people from "./people";
import { motion } from "framer-motion";
import "./styles.css";

const MotionGrid = motion(Grid);
const MotionVideo = motion(chakra("video"));

const items = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PhotoGrid = () => {
  const { scrollYProgress } = useScroll();

  const spring = useSpring(scrollYProgress, { mass: 0.1, restDelta: 0.0001 });

  const rotate = useTransform(spring, (progress) => progress * 270 + "deg");
  const inverseRotate = useTransform(
    spring,
    (progress) => -progress * 270 + "deg"
  );
  const scale = useTransform(spring, (progress) => 1 + progress * 2);

  return (
    <Center pos="fixed" inset={0} overflow="hidden">
      <MotionGrid
        templateAreas={`
        ". a a a a . . . ."
        ". a a a a b b . ."
        ". a a a a b b . ."
        "c c c d d d e e ."
        "c c c d d d e e ."
        "c c c d d d f f f"
        ". g g h h h f f f"
        ". g g h h h f f f"
        ". . . h h h . . ."
        ". . . h h h . . ."
        `}
        gridTemplateColumns={"repeat(9, 1fr)"}
        gridTemplateRows={"repeat(10, 1fr)"}
        w="60vh"
        h="60vh"
        gap={2}
        transformOrigin="50% 45%"
        style={{ rotate, scale }}
      >
        {items.map((item, index) => (
          <GridItem
            key={item}
            area={item}
            rounded="xl"
            overflow="hidden"
            transform="translateZ(0)"
          >
            <MotionVideo
              w="100%"
              h="100%"
              src={people[index].video}
              objectFit="cover"
              autoPlay
              // playsInline // mobile devices can't handle it
              loop
              muted
              style={{ rotate: inverseRotate, scale: 1.725 }}
            />
          </GridItem>
        ))}
      </MotionGrid>
    </Center>
  );
};

function App() {
  return (
    <Box h="400vh">
      <PhotoGrid />
    </Box>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
