import React from 'react';
import { useFormContext } from '../context/FormContext';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { Check, Lock } from 'lucide-react';

const StepIndicator: React.FC = () => {
  const { currentStep, totalSteps, goToStep, formData, stepsCompleted } = useFormContext();
  const toast = useToast();

  // Create step labels array outside of render to avoid recreation
  const stepLabels = ['Personal', 'Education', 'Academic', 'Family', 'Interests', 'Scholarship', 'Review'];
  
  // Scholarship step index (0-based)
  const scholarshipStepIndex = 5; // Index for 'Scholarship' in the stepLabels array

  // Handle click on step indicator
  const handleStepClick = (step: number) => {
    // Check if the step is accessible
    const isCompleted = step === scholarshipStepIndex 
      ? isScholarshipStepCompleted() 
      : stepsCompleted[step];
    const isPreviousStep = step < currentStep;
    const isCurrentStep = step === currentStep;
    const isNextStep = step === currentStep + 1;
    
    // Allow navigation to:
    // 1. Current step (no-op but allowed)
    // 2. Completed steps (for review/edit)
    // 3. Previous steps (even if not marked as completed)
    // 4. Next step only if current step is completed
    const canNavigate = isCurrentStep || isCompleted || isPreviousStep || 
                        (isNextStep && stepsCompleted[currentStep]);
    
    if (canNavigate) {
      goToStep(step);
    } else {
      // Show a toast message explaining why navigation is not allowed
      toast({
        title: "Cannot skip steps",
        description: "Please complete the current step before proceeding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to check if scholarship step is actually completed
  const isScholarshipStepCompleted = () => {
    // Check if scholarship data exists and is properly filled
    // This is a more accurate check than relying on stepsCompleted state
    if (!formData.scholarship) return false;
    
    // Add specific validation for scholarship fields
    // Modify this based on your actual scholarship form structure
    const { scholarship } = formData;
    return scholarship && 
           typeof scholarship === 'object' && 
           Object.keys(scholarship).length > 0 &&
           stepsCompleted[scholarshipStepIndex];
  };

  // Colors
  const activeColor = useColorModeValue('blue.500', 'blue.300');
  const completedColor = useColorModeValue('green.500', 'green.300');
  const inactiveColor = useColorModeValue('gray.300', 'gray.600');
  const textActiveColor = useColorModeValue('gray.800', 'white');
  const textInactiveColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box width="100%" maxWidth="4xl" mx="auto" mb={10}>
      {/* Progress bar */}
      <Box position="relative" height="3px" bg={inactiveColor} rounded="full" overflow="hidden" mb={6}>
        <Box 
          position="absolute"
          height="100%"
          bg={activeColor}
          transition="width 0.3s ease-in-out"
          width={`${(currentStep / (totalSteps - 1)) * 100}%`}
        />
      </Box>
      
      {/* Step circles */}
      <Flex justify="space-between" align="center">
        {Array.from({ length: totalSteps }, (_, i) => i).map((step) => {
          // Determine step status
          const isCompleted = step === scholarshipStepIndex 
            ? isScholarshipStepCompleted() 
            : stepsCompleted[step];
          const isCurrent = step === currentStep;
          const stepLabel = stepLabels[step] || `Step ${step + 1}`;
          
          // Determine if this step is clickable
          const isPreviousStep = step < currentStep;
          const isNextStep = step === currentStep + 1;
          const canNavigate = isCurrent || isCompleted || isPreviousStep || 
                             (isNextStep && stepsCompleted[currentStep]);
          
          // Determine tooltip content based on step status
          let tooltipContent = `Go to ${stepLabel}`;
          if (!canNavigate) {
            tooltipContent = "Complete previous steps first";
          } else if (isCompleted) {
            tooltipContent = `Review ${stepLabel} (completed)`;
          }
          
          return (
            <Tooltip 
              key={step}
              label={tooltipContent} 
              placement="top" 
              hasArrow
            >
              <Flex 
                direction="column" 
                align="center"
                cursor={canNavigate ? 'pointer' : 'not-allowed'}
                onClick={() => handleStepClick(step)}
                role="button"
                tabIndex={canNavigate ? 0 : -1}
                aria-label={tooltipContent}
                opacity={canNavigate ? 1 : 0.7}
                transition="all 0.2s"
                _hover={canNavigate ? { transform: 'translateY(-2px)' } : {}}
              >
                <Flex 
                  align="center"
                  justify="center"
                  w={{ base: "12", md: "14" }}
                  h={{ base: "12", md: "14" }}
                  rounded="full"
                  border="2px solid"
                  borderColor={isCompleted ? completedColor : isCurrent ? activeColor : inactiveColor}
                  bg={isCompleted ? completedColor : isCurrent ? 'white' : 'transparent'}
                  color={isCompleted ? 'white' : isCurrent ? activeColor : inactiveColor}
                  transition="all 0.3s"
                  _hover={canNavigate ? { shadow: 'md', transform: 'scale(1.05)' } : {}}
                  position="relative"
                >
                  {isCompleted ? (
                    <Check size={24} />
                  ) : !canNavigate && !isCurrent ? (
                    <Lock size={16} />
                  ) : (
                    <Text 
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="bold" 
                      textAlign="center" 
                      width="100%" 
                      height="100%" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      lineHeight="1"
                    >
                      {step + 1}
                    </Text>
                  )}
                  
                  {/* Active step indicator dot */}
                  {isCurrent && (
                    <Box
                      position="absolute"
                      bottom="-12px"
                      width="6px"
                      height="6px"
                      borderRadius="full"
                      bg={activeColor}
                    />
                  )}
                </Flex>
                <Text 
                  mt={3}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight={isCurrent || isCompleted ? "bold" : "medium"}
                  color={isCurrent || isCompleted ? textActiveColor : textInactiveColor}
                  _hover={canNavigate ? { textDecoration: "underline" } : {}}
                  textAlign="center"
                >
                  {stepLabel}
                </Text>
              </Flex>
            </Tooltip>
          );
        })}
      </Flex>
    </Box>
  );
};

export default React.memo(StepIndicator); 