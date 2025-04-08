"use client";

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
  useToast,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  useSteps
} from '@chakra-ui/react';

export default function AcademicFormPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    contactEmail: '',
    phoneNumber: '',
    
    // Academic Background
    highSchoolName: '',
    highSchoolGPA: '',
    graduationYear: '',
    
    // Current Academic Status
    currentInstitution: '',
    major: '',
    minor: '',
    currentGPA: '',
    expectedGraduation: '',
    
    // Additional Information
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const steps = [
    { title: 'Personal Info', description: 'Basic information' },
    { title: 'Academic Background', description: 'Your education' },
    { title: 'Current Status', description: 'Present academics' },
    { title: 'Additional Info', description: 'Other details' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Form submitted successfully',
        description: 'Your academic information has been saved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
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
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Nationality</FormLabel>
              <Input
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Enter your nationality"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormControl>
          </SimpleGrid>
        );
      case 1:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel>High School Name</FormLabel>
              <Input
                name="highSchoolName"
                value={formData.highSchoolName}
                onChange={handleChange}
                placeholder="Enter your high school name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>High School GPA</FormLabel>
              <Input
                name="highSchoolGPA"
                type="number"
                step="0.01"
                max="4.0"
                value={formData.highSchoolGPA}
                onChange={handleChange}
                placeholder="Enter your GPA (e.g., 3.5)"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Year of Graduation</FormLabel>
              <Input
                name="graduationYear"
                type="number"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="Enter your graduation year"
              />
            </FormControl>
          </SimpleGrid>
        );
      case 2:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl>
              <FormLabel>Current Institution</FormLabel>
              <Input
                name="currentInstitution"
                value={formData.currentInstitution}
                onChange={handleChange}
                placeholder="Enter your current institution"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Major</FormLabel>
              <Input
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="Enter your major"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Minor</FormLabel>
              <Input
                name="minor"
                value={formData.minor}
                onChange={handleChange}
                placeholder="Enter your minor (if any)"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Current GPA</FormLabel>
              <Input
                name="currentGPA"
                type="number"
                step="0.01"
                max="4.0"
                value={formData.currentGPA}
                onChange={handleChange}
                placeholder="Enter your current GPA"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Expected Year of Graduation</FormLabel>
              <Input
                name="expectedGraduation"
                type="number"
                value={formData.expectedGraduation}
                onChange={handleChange}
                placeholder="Enter expected graduation year"
              />
            </FormControl>
          </SimpleGrid>
        );
      case 3:
        return (
          <FormControl>
            <FormLabel>Additional Information</FormLabel>
            <Textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Enter any additional information you'd like to share"
              rows={6}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };
  
  return (
    <Box as="main" py={{ base: 8, md: 12 }} bg={bgColor} minH="calc(100vh - 64px)">
      <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }} 
          textAlign="center" 
          color="gray.800"
          mb={8}
          fontWeight="extrabold"
        >
          Student Academic Information
        </Heading>
        
        <Alert 
          status="warning" 
          variant="left-accent" 
          borderRadius="md"
          mb={10}
          py={5}
          px={6}
        >
          <AlertIcon boxSize={6} />
          <AlertDescription 
            fontSize={{ base: "md", md: "lg" }} 
            textAlign="center"
            fontWeight="medium"
          >
            Please complete all required sections of this form.
          </AlertDescription>
        </Alert>
        
        <Box 
          bg="white" 
          borderRadius="lg" 
          boxShadow="xl" 
          p={{ base: 4, md: 8 }}
          mb={10}
        >
          <Stepper index={activeStep} colorScheme="blue" size={{ base: 'sm', md: 'md' }} mb={8}>
            {steps.map((step, index) => (
              <Step key={index} onClick={() => index <= activeStep && setActiveStep(index)}>
                <StepIndicator>
                  <StepStatus 
                    complete={<StepIcon />} 
                    incomplete={<StepNumber />} 
                    active={<StepNumber />} 
                  />
                </StepIndicator>
                <Box flexShrink={0}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription display={{ base: 'none', md: 'block' }}>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            <Box mb={8}>
              {renderStepContent(activeStep)}
            </Box>
            
            <Flex justifyContent="space-between" mt={8}>
              <Button
                variant="outline"
                colorScheme="blue"
                isDisabled={activeStep === 0 || isSubmitting}
                onClick={handlePrevious}
              >
                Previous
              </Button>
              
              {activeStep < steps.length - 1 ? (
                <Button
                  colorScheme="blue"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              )}
            </Flex>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
