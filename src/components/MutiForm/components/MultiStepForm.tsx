'use client'
import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationDetailsForm from './EducationDetailsForm';
import FamilyDetailsForm from './FamilyDetailsForm';
import InterestsForm from './InterestsForm';
import AcademicHistory from './AcademicHistory';
import ScholarshipHostelDetails from './ScholarshipHostelDetails';
import ReviewForm from './ReviewForm';
import StepIndicator from './StepIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Save } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
  useToast,
  Text,
  Center,
  HStack,
  Tooltip,
  Spinner
} from '@chakra-ui/react';
import PersonalInfoStep from './steps/PersonalInfoStep';
// Temporarily use PersonalInfoStep for all other steps until they're implemented
const AcademicBackgroundStep = PersonalInfoStep;
const CurrentAcademicStatusStep = PersonalInfoStep;
const AcademicAchievementsStep = PersonalInfoStep;
const ResearchExperienceStep = PersonalInfoStep;
const ExtracurricularActivitiesStep = PersonalInfoStep;
const AdditionalInfoStep = PersonalInfoStep;
import FormProgress from './FormProgress';

interface MultiStepFormProps {
  onSubmit: (formData: any) => Promise<void>;
  isSubmitting: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit, isSubmitting }) => {
  const { formData, updateFormData, validateStep } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const toast = useToast();

  // Define the steps of the form
  const steps = [
    { title: 'Personal Info', component: <PersonalInfoStep /> },
    { title: 'Academic Background', component: <AcademicBackgroundStep /> },
    { title: 'Current Status', component: <CurrentAcademicStatusStep /> },
    { title: 'Achievements', component: <AcademicAchievementsStep /> },
    { title: 'Research', component: <ResearchExperienceStep /> },
    { title: 'Activities', component: <ExtracurricularActivitiesStep /> },
    { title: 'Additional Info', component: <AdditionalInfoStep /> },
  ];

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo(0, 0);
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    const isValid = validateStep(currentStep);
    
    if (isValid) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box 
      bg="white" 
      borderRadius="lg" 
      boxShadow="xl" 
      p={{ base: 4, md: 8 }}
      mb={10}
    >
      <FormProgress 
        steps={steps.map(step => step.title)} 
        currentStep={currentStep} 
        onStepClick={(index) => {
          // Only allow clicking on previous steps
          if (index < currentStep) {
            setCurrentStep(index);
          }
        }}
      />
      
      <Box mt={8} mb={10}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Center mb={8}>
              <Heading as="h2" size={{ base: "lg", md: "xl" }} color="gray.800" textAlign="center" fontWeight="bold">
                {steps[currentStep].title}
              </Heading>
            </Center>
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </Box>
      
      <Flex 
        justifyContent="space-between" 
        mt={10}
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 4, sm: 0 }}
      >
        <Button
          variant="outline"
          colorScheme="blue"
          isDisabled={currentStep === 0 || isSubmitting}
          onClick={handlePrevious}
          size="lg"
          width={{ base: '100%', sm: 'auto' }}
        >
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            colorScheme="blue"
            onClick={handleNext}
            size="lg"
            width={{ base: '100%', sm: 'auto' }}
          >
            Next
          </Button>
        ) : (
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            size="lg"
            width={{ base: '100%', sm: 'auto' }}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit
          </Button>
        )}
      </Flex>
      
      {isSubmitting && (
        <Flex justify="center" mt={6}>
          <Spinner size="md" mr={2} />
          <Text>Submitting your academic information...</Text>
        </Flex>
      )}
    </Box>
  );
};

export default MultiStepForm; 