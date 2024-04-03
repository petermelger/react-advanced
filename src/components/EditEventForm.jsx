import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import "./EditEventForm.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const EditEventForm = ({ event, handleSaveEdit, handleCancelEdit }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [startTime, setStartTime] = useState(
    event ? formatDate(event.startTime) : ""
  );
  const [endTime, setEndTime] = useState(
    event ? formatDate(event.endTime) : ""
  );

  const [image, setImage] = useState("");
  const [categories, setCategories] = useState(event ? event.categoryIds : []);
  const [location, setLocation] = useState(event ? event.location : "");

  const options = [
    { value: "1", label: "Sports" },
    { value: "2", label: "Relaxation" },
    { value: "3", label: "Games" },
  ];

  useEffect(() => {
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(formatDate(event.startTime));
    setEndTime(formatDate(event.endTime));
    setImage(event.image);
    setCategories(event.categoryIds);
    setLocation(event.location);
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: event.id,
      title,
      description,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      image,
      categoryIds: categories,
      location,
    };

    axios
      .put(`http://localhost:3000/events/${event.id}`, updatedEvent)
      .then(() => {
        if (typeof handleSaveEdit === "function") {
          handleSaveEdit(updatedEvent);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      className="edit-event-form"
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      width="2xl"
    >
      <Heading size="lg" mb={5}>
        Edit Event
      </Heading>
      <Stack spacing={3}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="startTime">
          <FormLabel>Start Time</FormLabel>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl id="endTime">
          <FormLabel>End Time</FormLabel>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>
        <FormControl id="location">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl id="image">
          <FormLabel>Image URL</FormLabel>
          <Input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormControl>
        <FormControl id="categories">
          <FormLabel>Categories</FormLabel>
          <Select
            options={options}
            isMulti
            onChange={(selectedOptions) =>
              setCategories(selectedOptions.map((option) => option.value))
            }
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "#F2EDE6",
                borderColor: "#323232",
                color: "#323232",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#F2EDE6",
                color: "#323232",
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#F2EDE6",
                color: "#323232",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "#323232",
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: "#323232",
                ":hover": {
                  backgroundColor: "#323232",
                  color: "#F2EDE6",
                },
              }),
            }}
          />
        </FormControl>
        <Button type="submit">Save</Button>
        <Button onClick={handleCancelEdit}>Cancel</Button>
      </Stack>
    </Box>
  );
};
