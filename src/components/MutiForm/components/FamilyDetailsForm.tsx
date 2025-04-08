import React from 'react';
import { useFormContext } from '../context/FormContext';
import AnimatedBox from './MotionBox';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  FormErrorMessage,
  Divider,
  useToast,
  Checkbox
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FamilyDetailsForm: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const toast = useToast();

  const validationSchema = Yup.object({
    fatherName: Yup.string().required('Father\'s name is required'),
    fatherOccupation: Yup.string().required('Father\'s occupation is required'),
    fatherContact: Yup.string().matches(/^\d{10}$/, 'Contact number must be 10 digits'),
    motherName: Yup.string().required('Mother\'s name is required'),
    motherOccupation: Yup.string().required('Mother\'s occupation is required'),
    motherContact: Yup.string().matches(/^\d{10}$/, 'Contact number must be 10 digits'),
    hasSiblings: Yup.boolean(),
    siblingName: Yup.string().when('hasSiblings', {
      is: true,
      then: (schema) => schema.required('Sibling name is required'),
      otherwise: (schema) => schema
    }),
    siblingAge: Yup.number().when('hasSiblings', {
      is: true,
      then: (schema) => schema.required('Sibling age is required').positive('Age must be positive'),
      otherwise: (schema) => schema
    }),
    emergencyContactName: Yup.string().required('Emergency contact name is required'),
    emergencyContactNumber: Yup.string()
      .required('Emergency contact number is required')
      .matches(/^\d{10}$/, 'Contact number must be 10 digits'),
    emergencyContactRelation: Yup.string().required('Relation is required'),
  });

  const formik = useFormik({
    initialValues: {
      fatherName: formData.fatherName || '',
      fatherOccupation: formData.fatherOccupation || '',
      fatherContact: formData.fatherContact || '',
      motherName: formData.motherName || '',
      motherOccupation: formData.motherOccupation || '',
      motherContact: formData.motherContact || '',
      hasSiblings: formData.hasSiblings || false,
      siblingName: formData.siblingName || '',
      siblingAge: formData.siblingAge || '',
      emergencyContactName: formData.emergencyContactName || '',
      emergencyContactNumber: formData.emergencyContactNumber || '',
      emergencyContactRelation: formData.emergencyContactRelation || '',
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData(values);
      
      // Mark this step as completed
      markStepAsCompleted(3);
      
      toast({
        title: "Family details saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      nextStep();
    },
  });

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      p={6} 
      bg="white" 
      borderRadius="lg" 
      boxShadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="md" mb={2}>Family Details</Heading>
          <Text color="gray.600">Please provide information about your family</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Heading size="sm" pt={2}>Parent Information</Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.fatherName && formik.touched.fatherName}>
                  <FormLabel>Father's Name *</FormLabel>
                  <Input
                    name="fatherName"
                    value={formik.values.fatherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.fatherName}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.fatherOccupation && formik.touched.fatherOccupation}>
                  <FormLabel>Father's Occupation *</FormLabel>
                  <Input
                    name="fatherOccupation"
                    value={formik.values.fatherOccupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.fatherOccupation}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.fatherContact && formik.touched.fatherContact}>
                  <FormLabel>Father's Contact Number</FormLabel>
                  <Input
                    name="fatherContact"
                    value={formik.values.fatherContact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.fatherContact}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} pt={2}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.motherName && formik.touched.motherName}>
                  <FormLabel>Mother's Name *</FormLabel>
                  <Input
                    name="motherName"
                    value={formik.values.motherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.motherName}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.motherOccupation && formik.touched.motherOccupation}>
                  <FormLabel>Mother's Occupation *</FormLabel>
                  <Input
                    name="motherOccupation"
                    value={formik.values.motherOccupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.motherOccupation}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.motherContact && formik.touched.motherContact}>
                  <FormLabel>Mother's Contact Number</FormLabel>
                  <Input
                    name="motherContact"
                    value={formik.values.motherContact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.motherContact}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Divider my={4} />

            <FormControl>
              <Checkbox
                name="hasSiblings"
                isChecked={formik.values.hasSiblings}
                onChange={formik.handleChange}
              >
                I have siblings
              </Checkbox>
            </FormControl>

            {formik.values.hasSiblings && (
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem>
                  <FormControl isInvalid={!!formik.errors.siblingName && formik.touched.siblingName}>
                    <FormLabel>Sibling's Name *</FormLabel>
                    <Input
                      name="siblingName"
                      value={formik.values.siblingName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>{formik.errors.siblingName}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!formik.errors.siblingAge && formik.touched.siblingAge}>
                    <FormLabel>Sibling's Age *</FormLabel>
                    <Input
                      name="siblingAge"
                      type="number"
                      value={formik.values.siblingAge}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>{formik.errors.siblingAge}</FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            )}

            <Divider my={4} />

            <Heading size="sm" pt={2}>Emergency Contact</Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.emergencyContactName && formik.touched.emergencyContactName}>
                  <FormLabel>Name *</FormLabel>
                  <Input
                    name="emergencyContactName"
                    value={formik.values.emergencyContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.emergencyContactName}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.emergencyContactNumber && formik.touched.emergencyContactNumber}>
                  <FormLabel>Contact Number *</FormLabel>
                  <Input
                    name="emergencyContactNumber"
                    value={formik.values.emergencyContactNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.emergencyContactNumber}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.emergencyContactRelation && formik.touched.emergencyContactRelation}>
                  <FormLabel>Relation *</FormLabel>
                  <Input
                    name="emergencyContactRelation"
                    value={formik.values.emergencyContactRelation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.emergencyContactRelation}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Box pt={4} display="flex" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">
                Save & Continue
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </AnimatedBox>
  );
};

export default FamilyDetailsForm; 