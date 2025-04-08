import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  SimpleGrid,
  Select,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from '../../context/FormContext';

const PersonalInfoStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Box>
      <Text mb={6} color="gray.600">
        Please provide your basic personal information.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isInvalid={!!errors.fullName} isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          <FormErrorMessage>{errors.fullName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.dateOfBirth} isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.gender} isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Select gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="other">Other</option>
          </Select>
          <FormErrorMessage>{errors.gender}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.nationality} isRequired>
          <FormLabel>Nationality</FormLabel>
          <Input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter your nationality"
          />
          <FormErrorMessage>{errors.nationality}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.contactEmail} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <FormErrorMessage>{errors.contactEmail}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phoneNumber} isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default PersonalInfoStep;
