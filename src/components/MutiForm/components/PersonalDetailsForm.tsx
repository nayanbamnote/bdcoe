import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { debounce } from 'lodash';
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
  Textarea,
  Checkbox,
  Flex,
  useToast
} from '@chakra-ui/react';

const PersonalDetailsForm: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addressSameAsAadhar, setAddressSameAsAadhar] = useState(false);
  const toast = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    dob: Yup.date().required('Date of birth is required'),
    contact: Yup.string()
      .matches(/^\d{10}$/, 'Contact number must be 10 digits')
      .required('Contact number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    aadharNumber: Yup.string()
      .matches(/^\d{12}$/, 'Aadhar number must be 12 digits')
      .required('Aadhar number is required'),
    bloodGroup: Yup.string().required('Blood group is required'),
    aadharAddress: Yup.string().required('Address on Aadhar is required'),
    permanentAddress: Yup.string().required('Permanent address is required'),
    casteCategory: Yup.string().required('Caste category is required'),
    subcaste: Yup.string(),
    religion: Yup.string().required('Religion is required'),
    address: Yup.string().required('Current address is required'),
  });

  const handleSubmit = (values: any) => {
    updateFormData(values);
    
    // Mark this step as completed
    markStepAsCompleted(0);
    
    toast({
      title: "Personal details saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    
    nextStep();
  };

  const formik = useFormik({
    initialValues: {
      name: formData.name || '',
      dob: formData.dob || '',
      contact: formData.contact || '',
      email: formData.email || '',
      address: formData.address || '',
      aadharNumber: formData.aadharNumber || '',
      bloodGroup: formData.bloodGroup || '',
      aadharAddress: formData.aadharAddress || '',
      permanentAddress: formData.permanentAddress || '',
      casteCategory: formData.casteCategory || '',
      subcaste: formData.subcaste || '',
      religion: formData.religion || '',
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (addressSameAsAadhar && formik.values.aadharAddress) {
      formik.setFieldValue('permanentAddress', formik.values.aadharAddress);
    }
  }, [addressSameAsAadhar, formik.values.aadharAddress]);

  useEffect(() => {
    if (formData.profilePhoto instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(formData.profilePhoto);
    }
  }, [formData.profilePhoto]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      updateFormData({ profilePhoto: file });
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [updateFormData]);

  const handleRemovePhoto = useCallback(() => {
    updateFormData({ profilePhoto: null });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [updateFormData]);

  const debouncedValidate = useCallback(
    debounce((values) => {
      // Your validation logic here
    }, 300),
    []
  );

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const casteCategories = ['General', 'OBC', 'SC', 'ST', 'NT','VJNT','Other'];
  
  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];

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
          <Heading size="md" mb={2}>Personal Details</Heading>
          <Text color="gray.600">Please provide your personal information</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Flex alignItems="center" gap={4}>
              <Box 
                width="100px" 
                height="100px" 
                borderRadius="full" 
                border="2px dashed" 
                borderColor="gray.300"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                position="relative"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </Box>
              <VStack align="start" spacing={2}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-photo"
                  style={{ display: 'none' }}
                />
                <Button 
                  size="sm" 
                  colorScheme="blue" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </Button>
                {previewUrl && (
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    variant="outline" 
                    onClick={handleRemovePhoto}
                  >
                    Remove
                  </Button>
                )}
              </VStack>
            </Flex>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
                  <FormLabel>Full Name *</FormLabel>
                  <Input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.aadharNumber && formik.touched.aadharNumber}>
                  <FormLabel>Aadhar Number *</FormLabel>
                  <Input
                    name="aadharNumber"
                    value={formik.values.aadharNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={12}
                  />
                  <FormErrorMessage>{formik.errors.aadharNumber}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.dob && formik.touched.dob}>
                  <FormLabel>Date of Birth *</FormLabel>
                  <Input
                    name="dob"
                    type="date"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.dob}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.bloodGroup && formik.touched.bloodGroup}>
                  <FormLabel>Blood Group *</FormLabel>
                  <Select
                    name="bloodGroup"
                    placeholder="Select Blood Group"
                    value={formik.values.bloodGroup}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.bloodGroup}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.contact && formik.touched.contact}>
                  <FormLabel>Contact Number *</FormLabel>
                  <Input
                    name="contact"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={10}
                  />
                  <FormErrorMessage>{formik.errors.contact}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
                  <FormLabel>Email Address *</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.casteCategory && formik.touched.casteCategory}>
                  <FormLabel>Caste Category *</FormLabel>
                  <Select
                    name="casteCategory"
                    placeholder="Select Caste Category"
                    value={formik.values.casteCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {casteCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.casteCategory}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.subcaste && formik.touched.subcaste}>
                  <FormLabel>Subcaste</FormLabel>
                  <Input
                    name="subcaste"
                    value={formik.values.subcaste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.subcaste}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formik.errors.religion && formik.touched.religion}>
                  <FormLabel>Religion *</FormLabel>
                  <Select
                    name="religion"
                    placeholder="Select Religion"
                    value={formik.values.religion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {religions.map(religion => (
                      <option key={religion} value={religion}>{religion}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.religion}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl isInvalid={!!formik.errors.aadharAddress && formik.touched.aadharAddress}>
              <FormLabel>Address on Aadhar *</FormLabel>
              <Textarea
                name="aadharAddress"
                value={formik.values.aadharAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
              />
              <FormErrorMessage>{formik.errors.aadharAddress}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.permanentAddress && formik.touched.permanentAddress}>
              <Flex alignItems="center" mb={2}>
                <FormLabel mb={0}>Permanent Address *</FormLabel>
                <Checkbox
                  ml={4}
                  isChecked={addressSameAsAadhar}
                  onChange={(e) => setAddressSameAsAadhar(e.target.checked)}
                >
                  Same as Aadhar Address
                </Checkbox>
              </Flex>
              <Textarea
                name="permanentAddress"
                value={formik.values.permanentAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                isDisabled={addressSameAsAadhar}
                bg={addressSameAsAadhar ? "gray.100" : "white"}
              />
              <FormErrorMessage>{formik.errors.permanentAddress}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.address && formik.touched.address}>
              <FormLabel>Current Address *</FormLabel>
              <Textarea
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
              />
              <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
            </FormControl>

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

export default PersonalDetailsForm;