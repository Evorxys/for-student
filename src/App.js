import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./components/handposeutil";
import * as fp from "fingerpose";
import Handsigns from "./components/handsigns";
import io from "socket.io-client";
import {
  Text,
  Heading,
  Button,
  Box,
  VStack,
  ChakraProvider,
  Input,
  IconButton,
  HStack,
  Image,
  Stack,
  useToast, // Add import for useToast
} from "@chakra-ui/react";
import { RiCameraFill, RiCameraOffFill, RiRefreshFill, RiMicFill, RiMicOffFill } from "react-icons/ri"; // Add import for microphone off icon

const SOCKET_URL = "https://websocket-server-teacher-student.onrender.com";

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const socket = useRef(null);

  const [camState, setCamState] = useState("on");
  const [detectedGesture, setDetectedGesture] = useState(null);
  const [inputText, setInputText] = useState("");
  const [teacherMessages, setTeacherMessages] = useState("");
  const [studentMessages, setStudentMessages] = useState([]);
  const [isListening, setIsListening] = useState(false); // Add state for microphone listening
  const recognitionRef = useRef(null); // Add ref for speech recognition
  const toast = useToast(); // Initialize toast

  const shortcuts = [
    "Thank you",
    "You're welcome",
    "Good morning",
    "Good afternoon",
    "Hi",
    "Hello",
    "I have a question",
    "Can I go to the bathroom",
    "Can you repeat that?",
    "I don't understand",
    "Can you help me?",
    "What is the homework?",
    "When is the test?",
    "Can I borrow a pencil?",
    "Can I sit here?",
    "What page are we on?",
    "Can I have more time?",
    "Can I go to the nurse?",
    "Can I get a drink of water?",
    "Can I go to the library?",
  ];

  const [filteredShortcuts, setFilteredShortcuts] = useState(shortcuts);

  function addShortcutMessage(message) {
    setInputText(message);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setInputText(value);
    setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.toLowerCase().includes(value.toLowerCase())));
  }

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.on("receiveMessage", (data) => {
      setTeacherMessages(`Teacher: ${data.message}`);
    });
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

 // Text-to-Speech Function
 function textToSpeech(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set language
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Text-to-speech is not supported in this browser.");
  }
}

// WebSocket Connection
useEffect(() => {
  socket.current = io(SOCKET_URL);
  socket.current.on("receiveMessage", (data) => {
    const teacherMessage = `Teacher: ${data.message}`;
    setTeacherMessages(teacherMessage);

    // Trigger TTS for teacher's message
    textToSpeech(data.message);
  });
  return () => {
    if (socket.current) socket.current.disconnect();
  };
}, []);

useEffect(() => {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setInputText((prevText) => prevText + finalTranscript);
    };

    recognitionRef.current = recognition;
  } else {
    console.warn("Speech recognition is not supported in this browser.");
  }
}, []);

  async function runHandpose() {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 1000);
  }

  async function detect(net) {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      try {
        const hands = await net.estimateHands(video);

        if (hands.length > 0) {
          // Add a small delay before predicting
          await new Promise(resolve => setTimeout(resolve, 100));

          const GE = new fp.GestureEstimator([
            Handsigns.aSign,
            Handsigns.bSign,
            Handsigns.cSign,
            Handsigns.dSign,
            Handsigns.eSign,
            Handsigns.fSign,
            Handsigns.gSign,
            Handsigns.hSign,
            Handsigns.iSign,
            Handsigns.jSign,
            Handsigns.kSign,
            Handsigns.lSign,
            Handsigns.mSign,
            Handsigns.nSign,
            Handsigns.oSign,
            Handsigns.pSign,
            Handsigns.qSign,
            Handsigns.rSign,
            Handsigns.sSign,
            Handsigns.tSign,
            Handsigns.uSign,
            Handsigns.vSign,
            Handsigns.wSign,
            Handsigns.xSign,
            Handsigns.ySign,
            Handsigns.zSign,
            Handsigns.helloSign, // Ensure helloSign is included
            Handsigns.thankYouSign,
            Handsigns.yesSign, // Ensure yesSign is included
            Handsigns.okSign, // Ensure okSign is included
            Handsigns.thumbsDownSign, // Ensure thumbsDownSign is included
            Handsigns.iLoveYouSign, // Ensure iLoveYouSign is included
          ]);

          const estimatedGestures = await GE.estimate(hands[0].landmarks, 6.5);

          if (estimatedGestures.gestures.length > 0) {
            const maxConfidenceGesture = estimatedGestures.gestures.reduce(
              (prev, current) => (prev.score > current.score ? prev : current),
              estimatedGestures.gestures[0]
            );

            if (maxConfidenceGesture && maxConfidenceGesture.name) {
              setDetectedGesture(maxConfidenceGesture.name);
              setInputText((prevText) => prevText + maxConfidenceGesture.name);
            }
          }
        }

        const ctx = canvasRef.current.getContext("2d");
        drawHand(hands, ctx);
      } catch (error) {
        console.error("Error detecting hand gestures:", error);
      }
    }
  }

  useEffect(() => {
    runHandpose();
  }, []);

  function turnOffCamera() {
    setCamState((prev) => (prev === "on" ? "off" : "on"));
  }

  function resetInput() {
    setInputText("");
  }

  function sendMessage() {
    if (inputText.trim()) {
      const message = `Student: ${inputText}`;
      setStudentMessages((prevMessages) => [...prevMessages, message]);

      if (socket.current) {
        socket.current.emit("sendMessage", { message: inputText });
      }

      setInputText("");
    }
  }

  function startListening() {
    if (!isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        console.log("Microphone listening started");
        setIsListening(true);
        toast({
          title: "Microphone is now listening.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("Microphone listening stopped");
        setIsListening(false);
        toast({
          title: "Microphone has stopped listening.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <ChakraProvider>
      <Box bgColor="#2D3748" height="100vh" color="white" p={5}>
        <VStack spacing={4} align="stretch" height="100%">
          <Heading as="h1" size="xl" textAlign="center">
            Student Communication Interface
          </Heading>

          {/* Teacher Chat Box */}
          <Box
            bg="gray.700"
            borderRadius="md"
            p={4}
            maxHeight="150px"
            overflowY="auto"
            mb={4}
            border="2px solid #61dafb"
            borderRadius="15px"
          >
            <Text color="blue.500" fontWeight="bold">
              Teacher:
            </Text>
            <Text>{teacherMessages.replace("Teacher: ", "")}</Text>
          </Box>

          {/* Student Chat Box */}
          <Box
            bg="gray.700"
            borderRadius="md"
            p={4}
            flex={camState === "on" ? 1 : 2} // Expand chat box when camera is off
            overflowY="auto"
            maxHeight={{ base: "200px", md: "300px" }}
            mb={4}
            border="2px solid #61dafb"
            borderRadius="15px"
          >
            {studentMessages.length === 0 ? (
              <Text>No student messages yet.</Text>
            ) : (
              studentMessages.map((msg, index) => (
                <Box
                  key={index}
                  bg="green.500"
                  color="white"
                  p={3}
                  borderRadius="lg"
                  mb={2}
                  maxWidth="80%"
                  alignSelf="flex-end"
                >
                  <Text>{msg.replace("Student: ", "")}</Text>
                </Box>
              ))
            )}
          </Box>

          {/* Camera and Gesture Display */}
          <HStack justifyContent="center">
            {/* Camera and Gesture Display */}
            <Box
              position="relative"
              border="2px solid #61dafb"
              borderRadius="15px"
              overflow="hidden"
              width={camState === "on" ? "100%" : "50%"} // Reduce camera size when off
              maxWidth={camState === "on" ? "320px" : "160px"} // Adjust max width based on camera state
            >
              {camState === "on" ? (
                <Webcam
                  ref={webcamRef}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              ) : (
                <Image
                  src="https://i.pinimg.com/564x/59/d0/43/59d043a44ecc38b430b191d9da95171d.jpg"
                  alt="Camera off placeholder"
                  width="100%"
                  height="auto"
                />
              )}
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </HStack>

          <Text fontSize="lg" textAlign="center">
            Detected Gesture: {detectedGesture || "None"}
          </Text>

          {/* Input and Controls */}
          <HStack>
            <Input
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
              flex={1}
              bg="gray.600"
              color="white"
            />
            <Button colorScheme="blue" onClick={sendMessage}>
              Send
            </Button>
            <IconButton
              icon={camState === "on" ? <RiCameraFill /> : <RiCameraOffFill />}
              onClick={turnOffCamera}
              colorScheme="orange"
              aria-label="Toggle Camera"
            />
            <IconButton
              icon={<RiRefreshFill />}
              colorScheme="green"
              aria-label="Reset Input"
              onClick={resetInput}
            />
            <IconButton
              icon={isListening ? <RiMicOffFill /> : <RiMicFill />}
              colorScheme="red"
              aria-label="Toggle Listening"
              onClick={startListening}
            />
          </HStack>

          {/* Filtered Shortcuts */}
          <Box
            bg="gray.700"
            borderRadius="md"
            p={4}
            maxHeight="150px"
            overflowY="auto"
            mt={2}
            border="2px solid #61dafb"
            borderRadius="15px"
          >
            <HStack spacing={2} wrap="wrap">
              {filteredShortcuts.map((shortcut, index) => (
                <Button key={index} onClick={() => addShortcutMessage(shortcut)} colorScheme="teal" size="sm">
                  {shortcut}
                </Button>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
