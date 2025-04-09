import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import AnimatedBox from './MotionBox';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  FormErrorMessage,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Input,
  useToast,
  Divider
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const InterestsForm: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const toast = useToast();
  const [newSkill, setNewSkill] = useState('');

  const technicalDomains = [
    'Web Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Blockchain',
    'IoT',
    'Robotics',
    'Game Development',
    'UI/UX Design'
  ];

  const validationSchema = Yup.object({
    technicalInterests: Yup.array().min(1, 'Select at least one technical interest'),
    skills: Yup.array().min(1, 'Add at least one skill'),
    hobbies: Yup.string().required('Hobbies are required'),
    achievements: Yup.string(),
    careerGoals: Yup.string().required('Career goals are required')
  });

  const formik = useFormik({
    initialValues: {
      technicalInterests: formData.technicalInterests || [],
      skills: formData.skills || [],
      hobbies: formData.hobbies || '',
      achievements: formData.achievements || '',
      careerGoals: formData.careerGoals || ''
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData(values);
      
      // Mark this step as completed
      markStepAsCompleted(4);
      
      toast({
        title: "Interests and skills saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      nextStep();
    },
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !formik.values.skills.includes(newSkill.trim())) {
      const updatedSkills = [...formik.values.skills, newSkill.trim()];
      formik.setFieldValue('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = formik.values.skills.filter(skill => skill !== skillToRemove);
    formik.setFieldValue('skills', updatedSkills);
  };

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
          <Heading size="md" mb={2}>Interests & Skills</Heading>
          <Text color="gray.600">Tell us about your interests, skills, and career goals</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isInvalid={!!formik.errors.technicalInterests && formik.touched.technicalInterests}>
              <FormLabel>Technical Domains of Interest *</FormLabel>
              <CheckboxGroup 
                colorScheme="blue" 
                value={formik.values.technicalInterests}
                onChange={(values) => formik.setFieldValue('technicalInterests', values)}
              >
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
                  {technicalDomains.map((domain) => (
                    <GridItem key={domain}>
                      <Checkbox value={domain}>{domain}</Checkbox>
                    </GridItem>
                  ))}
                </Grid>
              </CheckboxGroup>
              <FormErrorMessage>{formik.errors.technicalInterests}</FormErrorMessage>
            </FormControl>

            <Divider my={2} />

            <FormControl isInvalid={!!formik.errors.skills && formik.touched.skills}>
              <FormLabel>Technical Skills *</FormLabel>
              <HStack mb={2}>
                <Input 
                  placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button onClick={handleAddSkill} colorScheme="blue">Add</Button>
              </HStack>
              
              <Box mt={3}>
                <HStack spacing={2} flexWrap="wrap">
                  {formik.values.skills.map((skill, index) => (
                    <Tag
                      size="md"
                      key={index}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      m={1}
                    >
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                    </Tag>
                  ))}
                </HStack>
              </Box>
              <FormErrorMessage>{formik.errors.skills}</FormErrorMessage>
            </FormControl>

            <Divider my={2} />

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isInvalid={!!formik.errors.hobbies && formik.touched.hobbies}>
                  <FormLabel>Hobbies & Interests *</FormLabel>
                  <Textarea
                    name="hobbies"
                    placeholder="Tell us about your hobbies and interests outside of technology"
                    value={formik.values.hobbies}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                  />
                  <FormErrorMessage>{formik.errors.hobbies}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isInvalid={!!formik.errors.achievements && formik.touched.achievements}>
                  <FormLabel>Achievements (Optional)</FormLabel>
                  <Textarea
                    name="achievements"
                    placeholder="Share any notable achievements or awards"
                    value={formik.values.achievements}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                  />
                  <FormErrorMessage>{formik.errors.achievements}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isInvalid={!!formik.errors.careerGoals && formik.touched.careerGoals}>
                  <FormLabel>Career Goals *</FormLabel>
                  <Textarea
                    name="careerGoals"
                    placeholder="What are your short-term and long-term career goals?"
                    value={formik.values.careerGoals}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                  />
                  <FormErrorMessage>{formik.errors.careerGoals}</FormErrorMessage>
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

export default InterestsForm; 