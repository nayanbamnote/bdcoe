import React from 'react';
import { useFormContext } from '../context/FormContext';
import AnimatedBox from './MotionBox';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EducationDetailsForm: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const toast = useToast();

  const validationSchema = Yup.object({
    highestQualification: Yup.string().required('Highest qualification is required'),
    university: Yup.string().required('University/Board is required'),
    yearOfPassing: Yup.number()
      .required('Year of passing is required')
      .min(1950, 'Invalid year')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    percentage: Yup.number()
      .required('Percentage/CGPA is required')
      .min(0, 'Cannot be negative')
      .max(100, 'Cannot exceed 100%'),
    currentInstitution: Yup.string().required('Current institution is required'),
    currentCourse: Yup.string().required('Current course is required'),
    currentYear: Yup.string().required('Current year of study is required'),
  });

  const formik = useFormik({
    initialValues: {
      highestQualification: formData.highestQualification || '',
      university: formData.university || '',
      yearOfPassing: formData.yearOfPassing || '',
      percentage: formData.percentage || '',
      currentInstitution: formData.currentInstitution || '',
      currentCourse: formData.currentCourse || '',
      currentYear: formData.currentYear || '',
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData(values);
      
      // Mark this step as completed
      markStepAsCompleted(1);
      
      toast({
        title: "Education details saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      nextStep();
    },
  });

  const qualifications = [
    'High School (10th)',
    'Higher Secondary (12th)',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D',
    'Other'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

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
          <Heading size="md" mb={2}>Education Details</Heading>
          <Text color="gray.600">Please provide information about your educational background</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Heading size="sm" pt={2}>Previous Education</Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.highestQualification && formik.touched.highestQualification}>
                  <FormLabel>Highest Qualification *</FormLabel>
                  <Select
                    name="highestQualification"
                    placeholder="Select qualification"
                    value={formik.values.highestQualification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {qualifications.map(qual => (
                      <option key={qual} value={qual}>{qual}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.highestQualification}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.university && formik.touched.university}>
                  <FormLabel>University/Board *</FormLabel>
                  <Input
                    name="university"
                    value={formik.values.university}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.university}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.yearOfPassing && formik.touched.yearOfPassing}>
                  <FormLabel>Year of Passing *</FormLabel>
                  <Input
                    name="yearOfPassing"
                    type="number"
                    value={formik.values.yearOfPassing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    max={new Date().getFullYear()}
                    min="1950"
                  />
                  <FormErrorMessage>{formik.errors.yearOfPassing}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.percentage && formik.touched.percentage}>
                  <FormLabel>Percentage/CGPA *</FormLabel>
                  <Input
                    name="percentage"
                    type="number"
                    value={formik.values.percentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    step="0.01"
                    max="100"
                    min="0"
                  />
                  <FormErrorMessage>{formik.errors.percentage}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Heading size="sm" pt={4}>Current Education</Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.currentInstitution && formik.touched.currentInstitution}>
                  <FormLabel>Current Institution *</FormLabel>
                  <Input
                    name="currentInstitution"
                    value={formik.values.currentInstitution}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.currentInstitution}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.currentCourse && formik.touched.currentCourse}>
                  <FormLabel>Current Course *</FormLabel>
                  <Input
                    name="currentCourse"
                    value={formik.values.currentCourse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.currentCourse}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.currentYear && formik.touched.currentYear}>
                  <FormLabel>Current Year *</FormLabel>
                  <Select
                    name="currentYear"
                    placeholder="Select year"
                    value={formik.values.currentYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.currentYear}</FormErrorMessage>
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

export default EducationDetailsForm; 