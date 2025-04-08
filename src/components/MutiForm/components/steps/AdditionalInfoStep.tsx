import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useFormContext } from '../../context/FormContext';

const AdditionalInfoStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={4}>Additional Information</Heading>
        <FormControl>
          <FormLabel>Additional Details</FormLabel>
          <Textarea
            value={formData.additionalInfo || ''}
            onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
            placeholder="Enter any additional information you'd like to share"
            rows={6}
          />
        </FormControl>
      </Box>
    </VStack>
  );
};

export default AdditionalInfoStep;
