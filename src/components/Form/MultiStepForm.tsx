import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Divider as ChakraDivider,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useToast
} from '@chakra-ui/react';

// Import existing form components
import StudentProfileHeader from './StudentProfileHeader';
import StudentDetails from './StudentDetails';
import AdditionalStudentDetails from './AdditionalStudentDetails';
import SiblingDetails from './SiblingDetails';
import GuardianDetails from './GuardianDetails';
import TechnicalInterestDetails from './TechnicalInterestDetails';
import HobbyDetails from './HobbyDetails';
import AcademicsTable from './AcademicsTable';
import AccommodationToggle from './AccommodationToggle';
import ScholarshipDetails from './ScholarshipDetails';
import HostelDetails from './HostelDetails';
import AcademicDetailsForm from './AcademicDetailsForm';
import Divider from './Divider';

interface AccommodationToggles {
  hasScholarship: boolean;
  isHosteler: boolean;
}

interface StepProps {
  title: string;
  description?: string;
  component: React.ReactNode;
  optional?: boolean;
}

const MultiStepForm: React.FC = () => {
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const [toggleStates, setToggleStates] = useState<AccommodationToggles>({
    hasScholarship: false,
    isHosteler: false,
  });

  // Define the toggle change handler before using it
  const handleToggleChange = (newToggles: AccommodationToggles) => {
    setToggleStates(newToggles);
  };

  // Define the steps of the form
  const formSteps: StepProps[] = [
    {
      title: "Profile Information",
      description: "Basic profile details",
      component: <StudentProfileHeader />
    },
    {
      title: "Personal Details",
      description: "Your personal information",
      component: <StudentDetails />
    },
    {
      title: "Additional Details",
      description: "More about you",
      component: <AdditionalStudentDetails />
    },
    {
      title: "Family Information",
      description: "Details about your family",
      component: (
        <VStack spacing={6} align="stretch" width="100%">
          <SiblingDetails />
          <ChakraDivider />
          <GuardianDetails />
        </VStack>
      )
    },
    {
      title: "Interests & Hobbies",
      description: "What you enjoy doing",
      component: (
        <VStack spacing={6} align="stretch" width="100%">
          <TechnicalInterestDetails />
          <ChakraDivider />
          <HobbyDetails />
        </VStack>
      )
    },
    {
      title: "Academic Information",
      description: "Your educational background",
      component: (
        <VStack spacing={6} align="stretch" width="100%">
          <Box overflowX="auto">
            <AcademicsTable />
          </Box>
          <ChakraDivider />
          <AcademicDetailsForm />
        </VStack>
      )
    },
    {
      title: "Accommodation & Scholarship",
      description: "Housing and financial aid",
      component: (
        <VStack spacing={6} align="stretch" width="100%">
          <AccommodationToggle onToggleChange={handleToggleChange} />
          {toggleStates.hasScholarship && (
            <>
              <ChakraDivider />
              <ScholarshipDetails />
            </>
          )}
          {toggleStates.isHosteler && (
            <>
              <ChakraDivider />
              <HostelDetails />
            </>
          )}
        </VStack>
      )
    }
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: formSteps.length,
  });

  useEffect(() => {
    // Initialize student data
    const initializeStudent = async () => {
      try {
        const response = await fetch('/api/student/init', {
          method: 'POST',
        });
        
        if (!response.ok) {
          console.error('Failed to initialize student record');
          toast({
            title: "Initialization failed",
            description: "Failed to initialize student record",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error initializing student:', error);
        toast({
          title: "Initialization error",
          description: "An error occurred while initializing student data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    initializeStudent();
  }, [toast]);

  const handleNext = () => {
    // Move to next step
    if (activeStep < formSteps.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    // Here you would submit the form data to your backend
    try {
      // Example submission logic
      const response = await fetch('/api/student/submit', {
        method: 'POST',
        // Add your form data here
      });
      
      if (response.ok) {
        // Handle successful submission
        toast({
          title: "Form submitted",
          description: "Your information has been successfully submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Handle error
        toast({
          title: "Submission failed",
          description: "Failed to submit form. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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

  return (
    <Box 
      width="100%" 
      maxWidth="6xl" 
      mx="auto" 
      bg={bgColor} 
      borderRadius="lg" 
      boxShadow="md"
      border="1px"
      borderColor={borderColor}
    >
      {/* Stepper */}
      <Box px={6} pt={6}>
        <Stepper index={activeStep} colorScheme="blue" size={{ base: 'sm', md: 'md' }}>
          {formSteps.map((step, index) => (
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
      </Box>

      {/* Form Content */}
      <Box px={6} py={8}>
        <Heading as="h2" size="lg" mb={6} color="gray.800">
          {formSteps[activeStep].title}
        </Heading>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '2rem' }}
          >
            {formSteps[activeStep].component}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Flex justify="space-between" mt={8}>
          <Button
            onClick={handlePrevious}
            isDisabled={activeStep === 0}
            leftIcon={<ChevronLeft size={18} />}
            colorScheme="gray"
            variant="outline"
          >
            Previous
          </Button>
          
          {activeStep < formSteps.length - 1 ? (
            <Button
              onClick={handleNext}
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