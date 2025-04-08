import React from 'react';
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
  Flex,
} from '@chakra-ui/react';

interface FormProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

const FormProgress: React.FC<FormProgressProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <Stepper index={currentStep} colorScheme="blue" size={{ base: 'sm', md: 'md' }}>
      {steps.map((step, index) => (
        <Step key={index} onClick={() => onStepClick(index)} cursor="pointer">
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink={0}>
            <StepTitle>{step}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default FormProgress; 