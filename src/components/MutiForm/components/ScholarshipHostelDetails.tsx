import React, { useState } from 'react';
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
  Select,
  Textarea,
  Switch,
  FormHelperText,
  Divider,
  useToast,
  Radio,
  RadioGroup,
  Stack,
  Collapse
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ScholarshipHostelDetails: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const toast = useToast();
  
  const [hasScholarship, setHasScholarship] = useState(formData.hasScholarship || false);
  const [isHosteler, setIsHosteler] = useState(formData.isHosteler || false);

  const validationSchema = Yup.object({
    // Scholarship fields (conditional validation)
    scholarshipType: Yup.string().when('hasScholarship', {
      is: true,
      then: (schema) => schema.required('Scholarship type is required'),
      otherwise: (schema) => schema
    }),
    scholarshipAmount: Yup.number().when('hasScholarship', {
      is: true,
      then: (schema) => schema.required('Amount is required').positive('Amount must be positive'),
      otherwise: (schema) => schema
    }),
    scholarshipProvider: Yup.string().when('hasScholarship', {
      is: true,
      then: (schema) => schema.required('Provider is required'),
      otherwise: (schema) => schema
    }),
    scholarshipDuration: Yup.string().when('hasScholarship', {
      is: true,
      then: (schema) => schema.required('Duration is required'),
      otherwise: (schema) => schema
    }),
    
    // Hostel fields (conditional validation)
    hostelName: Yup.string().when('isHosteler', {
      is: true,
      then: (schema) => schema.required('Hostel name is required'),
      otherwise: (schema) => schema
    }),
    roomNumber: Yup.string().when('isHosteler', {
      is: true,
      then: (schema) => schema.required('Room number is required'),
      otherwise: (schema) => schema
    }),
    hostelFees: Yup.number().when('isHosteler', {
      is: true,
      then: (schema) => schema.required('Hostel fees are required').positive('Fees must be positive'),
      otherwise: (schema) => schema
    }),
    roomType: Yup.string().when('isHosteler', {
      is: true,
      then: (schema) => schema.required('Room type is required'),
      otherwise: (schema) => schema
    }),
    distanceFromHome: Yup.number().when('isHosteler', {
      is: true,
      then: (schema) => schema.required('Distance is required').positive('Distance must be positive'),
      otherwise: (schema) => schema
    }),
  });

  const formik = useFormik({
    initialValues: {
      hasScholarship: formData.hasScholarship || false,
      scholarshipType: formData.scholarshipType || '',
      scholarshipAmount: formData.scholarshipAmount || '',
      scholarshipProvider: formData.scholarshipProvider || '',
      scholarshipDuration: formData.scholarshipDuration || '',
      scholarshipDetails: formData.scholarshipDetails || '',
      
      isHosteler: formData.isHosteler || false,
      hostelName: formData.hostelName || '',
      roomNumber: formData.roomNumber || '',
      hostelFees: formData.hostelFees || '',
      roomType: formData.roomType || '',
      distanceFromHome: formData.distanceFromHome || '',
      hostelAddress: formData.hostelAddress || '',
      wardenContact: formData.wardenContact || '',
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData({
        ...values,
        hasScholarship,
        isHosteler
      });
      
      // Mark this step as completed
      markStepAsCompleted(5);
      
      toast({
        title: "Scholarship and hostel details saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      nextStep();
    },
  });

  const handleScholarshipToggle = (value: string) => {
    const newValue = value === 'yes';
    setHasScholarship(newValue);
    formik.setFieldValue('hasScholarship', newValue);
  };

  const handleHostelToggle = (value: string) => {
    const newValue = value === 'yes';
    setIsHosteler(newValue);
    formik.setFieldValue('isHosteler', newValue);
  };

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      p={{ base: 4, md: 8 }} 
      bg="white" 
      borderRadius="lg" 
      boxShadow="md"
    >
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size={{ base: "md", md: "lg" }} mb={3}>Scholarship & Hostel Details</Heading>
          <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>Provide information about your scholarship and accommodation</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={8} align="stretch">
            {/* Scholarship Section */}
            <Box>
              <FormControl mb={6}>
                <FormLabel fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>Do you have a scholarship?</FormLabel>
                <RadioGroup onChange={handleScholarshipToggle} value={hasScholarship ? 'yes' : 'no'}>
                  <Stack direction="row" spacing={6}>
                    <Radio value="yes" size="lg">
                      <Text fontSize={{ base: "md", md: "lg" }}>Yes</Text>
                    </Radio>
                    <Radio value="no" size="lg">
                      <Text fontSize={{ base: "md", md: "lg" }}>No</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Collapse in={hasScholarship} animateOpacity>
                <Box p={6} bg="gray.50" borderRadius="md" mb={6}>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.scholarshipType && formik.touched.scholarshipType}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Scholarship Type *</FormLabel>
                        <Select
                          name="scholarshipType"
                          placeholder="Select type"
                          value={formik.values.scholarshipType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        >
                          <option value="Merit">Merit-based</option>
                          <option value="Need">Need-based</option>
                          <option value="Sports">Sports</option>
                          <option value="Cultural">Cultural</option>
                          <option value="Government">Government</option>
                          <option value="Private">Private</option>
                          <option value="Other">Other</option>
                        </Select>
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.scholarshipType}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.scholarshipAmount && formik.touched.scholarshipAmount}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Scholarship Amount (₹) *</FormLabel>
                        <Input
                          name="scholarshipAmount"
                          type="number"
                          placeholder="e.g., 50000"
                          value={formik.values.scholarshipAmount}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.scholarshipAmount}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.scholarshipProvider && formik.touched.scholarshipProvider}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Scholarship Provider *</FormLabel>
                        <Input
                          name="scholarshipProvider"
                          placeholder="e.g., Government of India"
                          value={formik.values.scholarshipProvider}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.scholarshipProvider}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.scholarshipDuration && formik.touched.scholarshipDuration}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Duration *</FormLabel>
                        <Input
                          name="scholarshipDuration"
                          placeholder="e.g., 4 years"
                          value={formik.values.scholarshipDuration}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.scholarshipDuration}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Additional Details</FormLabel>
                        <Textarea
                          name="scholarshipDetails"
                          placeholder="Any additional information about your scholarship"
                          value={formik.values.scholarshipDetails}
                          onChange={formik.handleChange}
                          rows={3}
                          fontSize={{ base: "md", md: "lg" }}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>
              </Collapse>
            </Box>

            <Divider />

            {/* Hostel Section */}
            <Box>
              <FormControl mb={6}>
                <FormLabel fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>Are you staying in a hostel?</FormLabel>
                <RadioGroup onChange={handleHostelToggle} value={isHosteler ? 'yes' : 'no'}>
                  <Stack direction="row" spacing={6}>
                    <Radio value="yes" size="lg">
                      <Text fontSize={{ base: "md", md: "lg" }}>Yes</Text>
                    </Radio>
                    <Radio value="no" size="lg">
                      <Text fontSize={{ base: "md", md: "lg" }}>No</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Collapse in={isHosteler} animateOpacity>
                <Box p={6} bg="gray.50" borderRadius="md">
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.hostelName && formik.touched.hostelName}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Hostel Name *</FormLabel>
                        <Input
                          name="hostelName"
                          placeholder="e.g., Boys Hostel Block A"
                          value={formik.values.hostelName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.hostelName}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.roomNumber && formik.touched.roomNumber}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Room Number *</FormLabel>
                        <Input
                          name="roomNumber"
                          placeholder="e.g., A-101"
                          value={formik.values.roomNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.roomNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.roomType && formik.touched.roomType}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Room Type *</FormLabel>
                        <Select
                          name="roomType"
                          placeholder="Select room type"
                          value={formik.values.roomType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        >
                          <option value="Single">Single Occupancy</option>
                          <option value="Double">Double Sharing</option>
                          <option value="Triple">Triple Sharing</option>
                          <option value="Dormitory">Dormitory</option>
                        </Select>
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.roomType}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.hostelFees && formik.touched.hostelFees}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Hostel Fees (₹ per year) *</FormLabel>
                        <Input
                          name="hostelFees"
                          type="number"
                          placeholder="e.g., 60000"
                          value={formik.values.hostelFees}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.hostelFees}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={!!formik.errors.distanceFromHome && formik.touched.distanceFromHome}>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Distance from Home (km) *</FormLabel>
                        <Input
                          name="distanceFromHome"
                          type="number"
                          placeholder="e.g., 250"
                          value={formik.values.distanceFromHome}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                        <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.distanceFromHome}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Warden Contact</FormLabel>
                        <Input
                          name="wardenContact"
                          placeholder="e.g., +91 9876543210"
                          value={formik.values.wardenContact}
                          onChange={formik.handleChange}
                          fontSize={{ base: "md", md: "lg" }}
                          height={{ base: "10", md: "12" }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl>
                        <FormLabel fontSize={{ base: "md", md: "lg" }}>Hostel Address</FormLabel>
                        <Textarea
                          name="hostelAddress"
                          placeholder="Complete hostel address"
                          value={formik.values.hostelAddress}
                          onChange={formik.handleChange}
                          rows={3}
                          fontSize={{ base: "md", md: "lg" }}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>
              </Collapse>
            </Box>

            <Box pt={6} display="flex" justifyContent="flex-end">
              <Button 
                type="submit" 
                colorScheme="blue"
                size={{ base: "md", md: "lg" }}
                px={6}
              >
                Save & Continue
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </AnimatedBox>
  );
};

export default ScholarshipHostelDetails; 