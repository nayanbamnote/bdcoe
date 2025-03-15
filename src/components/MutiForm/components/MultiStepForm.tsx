'use client'
import React from 'react';
import { useFormContext } from '../context/FormContext';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationDetailsForm from './EducationDetailsForm';
import FamilyDetailsForm from './FamilyDetailsForm';
import InterestsForm from './InterestsForm';
import ReviewForm from './ReviewForm';
import StepIndicator from './StepIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

const MultiStepForm: React.FC = () => {
  const toast = useToast();
  const { 
    currentStep,
    prevStep,
    nextStep,
    totalSteps
  } = useFormContext();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = async () => {
    try {
      // Example submission logic
      toast({
        title: "Form submitted",
        description: "Your information has been successfully submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Define the steps of the form
  const formSteps = [
    {
      title: "Personal Details",
      description: "Your basic information",
      component: <PersonalDetailsForm />
    },
    {
      title: "Education",
      description: "Academic background",
      component: <EducationDetailsForm />
    },
    {
      title: "Family Details",
      description: "Information about your family",
      component: <FamilyDetailsForm />
    },
    {
      title: "Interests & Skills",
      description: "Your hobbies and abilities",
      component: <InterestsForm />
    },
    {
      title: "Review & Submit",
      description: "Verify your information",
      component: <ReviewForm />
    }
  ];

  // Define motion animation properties
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Box 
      width="100%" 
      maxWidth="4xl" 
      mx="auto" 
      bg={bgColor} 
      borderRadius="lg" 
      boxShadow="md"
      border="1px"
      borderColor={borderColor}
      mb={10}
    >
      {/* Custom Step Indicator */}
      <Box px={6} pt={6}>
        <StepIndicator />
      </Box>

      {/* Form Content */}
      <Box px={6} py={8}>
        <Heading as="h2" size="lg" mb={6} color="gray.800">
          {formSteps[currentStep].title}
        </Heading>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '2rem' }}
          >
            {formSteps[currentStep].component}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Flex justify="space-between" mt={8}>
          <Button
            onClick={prevStep}
            isDisabled={currentStep === 0}
            leftIcon={<ChevronLeft size={18} />}
            colorScheme="gray"
            variant="outline"
          >
            Previous
          </Button>
          
          {currentStep < formSteps.length - 1 ? (
            <Button
              onClick={nextStep}
              rightIcon={<ChevronRight size={18} />}
              colorScheme="blue"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              rightIcon={<Check size={18} />}
              colorScheme="green"
            >
              Submit
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default MultiStepForm; 