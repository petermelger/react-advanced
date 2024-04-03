import React, { useState } from "react";
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
import "./AddEventForm.css";

const AddEventForm = ({ onCancel, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState("");

  const options = [
    { value: "1", label: "Sports" },
    { value: "2", label: "Relaxation" },
    { value: "3", label: "Games" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      startTime,
      endTime,
      image,
      categoryIds: categories.map((category) => category.value),
      location,
    };

    // Call onSubmit callback with new event
    onSubmit(newEvent);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      width="2xl"
      className="add-event-form"
    >
      <Heading size="lg" mb={5}>
        Add New Event
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
            value={categories}
            onChange={setCategories}
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
        <Button type="submit">Add Event</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Stack>
    </Box>
  );
};

export default AddEventForm;
