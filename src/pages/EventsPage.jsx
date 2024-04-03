import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  Tag,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddEventForm from "../components/AddEventForm";
import { DEFAULT_EVENT_IMAGE } from "../utils/constants";
import "./EventsPage.css"; // Import CSS file for styling

// Define the EventsPage component
export const EventsPage = () => {
  // Define state variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  // Effect hook to fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch categories
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((response) => {
      const map = response.data.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});
      setCategoriesMap(map);
    });
  }, []);

  // Define function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddEventClick = () => {
    onOpen();
  };

  // Define function to handle form submission
  const handleFormSubmit = async (newEvent) => {
    try {
      await axios.post("http://localhost:3000/events", newEvent);
      fetchEvents(); // Fetch events after a new event is added

      onClose();

      // Show a success toast
      toast({
        title: "Event created.",
        description: "Your event has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Show an error toast
      toast({
        title: "An error occurred.",
        description: "Unable to create your event. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Render the EventsPage component
  return (
    <div className="events-page">
      <Box maxWidth="100%" mb={4}>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          bg="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="md"
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
          w="350px"
        />
      </Box>
      <div className="events-grid">
        {events
          .filter(
            (event) =>
              event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              event.categoryIds.some((id) =>
                categoriesMap[id]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
          )
          .map((event, index) => (
            <Link
              to={{
                pathname: `/event/${event.id}`,
              }}
              key={index}
            >
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width="100%"
                margin="auto"
                mb={4}
                className="event-card"
              >
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={event.image || DEFAULT_EVENT_IMAGE}
                      alt={event.title}
                      boxSize="200px"
                      objectFit="cover"
                      borderRadius="30px"
                    />
                  </Box>
                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Heading size="xl">{event.title}</Heading>
                    </Box>
                    <Box>
                      {event.description}
                      <br />
                      <Text mt={2} color="gray.500">
                        Start Time: {new Date(event.startTime).toLocaleString()}
                      </Text>
                      <Text mt={2} color="gray.500">
                        End Time: {new Date(event.endTime).toLocaleString()}
                      </Text>
                      {event.categoryIds && event.categoryIds.length > 0 && (
                        <Box mt={2}>
                          {event.categoryIds.map((categoryId) => (
                            <Tag
                              key={categoryId}
                              size="sm"
                              variant="outline"
                              colorScheme="blue"
                              mr={2}
                            >
                              {categoriesMap[categoryId]}
                            </Tag>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
      </div>
      <Button
        className="add-event-button"
        mt={8}
        bg="#323232"
        color="#ddd0c8"
        onClick={handleAddEventClick}
      >
        Add Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <AddEventForm onSubmit={handleFormSubmit} onCancel={onClose} />
        </ModalContent>
      </Modal>
    </div>
  );
};
