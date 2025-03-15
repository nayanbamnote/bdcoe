import React from 'react';
import { useFormContext } from '../context/FormContext';
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Check } from 'lucide-react';

const StepIndicator: React.FC = () => {
  const { currentStep, totalSteps, goToStep } = useFormContext();

  // Create step labels array outside of render to avoid recreation
  const stepLabels = ['Personal', 'Education', 'Family', 'Interests', 'Review'];

  // Handle click on step indicator
  const handleStepClick = (step: number) => {
    // Only allow navigation to completed steps or the current step
    const canNavigate = step <= currentStep;
    
    if (canNavigate) {
      goToStep(step);
    }
  };

  // Colors
  const activeColor = useColorModeValue('blue.500', 'blue.300');
  const completedColor = useColorModeValue('green.500', 'green.300');
  const inactiveColor = useColorModeValue('gray.300', 'gray.600');
  const textActiveColor = useColorModeValue('gray.800', 'white');
  const textInactiveColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box width="100%" maxWidth="3xl" mx="auto" mb={8}>
      {/* Progress bar */}
      <Box position="relative" height="2px" bg={inactiveColor} rounded="full" overflow="hidden" mb={4}>
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
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const stepLabel = stepLabels[step] || `Step ${step + 1}`;
          
          // Determine if this step is clickable
          const isClickable = step <= currentStep;
          
          return (
            <Flex 
              key={step} 
              direction="column" 
              align="center"
              cursor={isClickable ? 'pointer' : 'not-allowed'}
              onClick={() => handleStepClick(step)}
              role="button"
              tabIndex={isClickable ? 0 : -1}
              aria-label={`Go to ${stepLabel} step`}
              title={isClickable ? `Go to ${stepLabel}` : "Complete previous steps first"}
            >
              <Flex 
                align="center"
                justify="center"
                w="10"
                h="10"
                rounded="full"
                border="2px solid"
                borderColor={isCompleted ? completedColor : isCurrent ? activeColor : inactiveColor}
                bg={isCompleted ? completedColor : 'transparent'}
                color={isCompleted ? 'white' : isCurrent ? activeColor : inactiveColor}
                transition="all 0.3s"
                _hover={isClickable ? { shadow: 'md' } : {}}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <Text fontSize="sm" fontWeight="medium">{step + 1}</Text>
                )}
              </Flex>
              <Text 
                mt={2}
                fontSize="xs"
                fontWeight="medium"
                color={step <= currentStep ? textActiveColor : textInactiveColor}
                _hover={isClickable ? { textDecoration: 'underline' } : {}}
              >
                {stepLabel}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default React.memo(StepIndicator); 