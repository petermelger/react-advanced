import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Tag,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DEFAULT_EVENT_IMAGE,
  DEFAULT_USER_IMAGE,
  DEFAULT_USER_NAME,
} from "../utils/constants";
import "./EventPage.css";
import { EditEventForm } from "../components/EditEventForm";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchEventAndCategories = async () => {
      const eventResponse = await axios.get(
        `http://localhost:3000/events/${eventId}`
      );
      setEvent(eventResponse.data);

      // Check if createdBy field is defined in the event data
      if (eventResponse.data.createdBy !== undefined) {
        // Fetch user details using createdBy field
        const userResponse = await axios.get(
          `http://localhost:3000/users/${eventResponse.data.createdBy}`
        );
        setUser(userResponse.data);
      }

      const categoriesResponse = await axios.get(
        "http://localhost:3000/categories"
      );
      const map = categoriesResponse.data.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});
      setCategoriesMap(map);
    };

    fetchEventAndCategories();
  }, [eventId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    onOpen(); // Open confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/events/${eventId}`);
      navigate("/"); // Redirect to events page after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!event || !user || !Object.keys(categoriesMap).length) {
    return <p>Loading...</p>;
  }

  return (
    <Box className="events-page">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this event?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {editMode ? (
        <Modal isOpen={editMode} onClose={() => setEditMode(false)}>
          <ModalOverlay />
          <ModalContent>
            <EditEventForm event={event} />
          </ModalContent>
        </Modal>
      ) : (
        <Box className="event-card">
          <Heading as="h2">{event.title}</Heading>
          <Text>{event.description}</Text>
          <Image
            src={event.image || DEFAULT_EVENT_IMAGE}
            alt={event.title}
            className="event-image"
          />
          <Text>Start Time: {event.startTime}</Text>
          <Text>End Time: {event.endTime}</Text>
          <Box className="categories">
            {event.categoryIds &&
              event.categoryIds.map((categoryId) => (
                <Tag mr="2px" bg="#323232" color="#ddd0c8" key={categoryId}>
                  {categoriesMap[categoryId] || "Unknown"}
                </Tag>
              ))}
          </Box>
          <Text>User: {user.name || DEFAULT_USER_NAME}</Text>
          <Image
            src={user.image || DEFAULT_USER_IMAGE}
            alt={user.name || DEFAULT_USER_NAME}
            className="user-image"
          />
          <Button
            className="edit-button"
            mt={4}
            bg="#323232"
            color="#ddd0c8"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            className="delete-button"
            mt={4}
            colorScheme="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
};
