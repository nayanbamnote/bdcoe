import React from 'react';
import { useFormContext } from '../context/FormContext';
import AnimatedBox from './MotionBox';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Divider,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  HStack,
  Tag,
  TagLabel,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge
} from '@chakra-ui/react';

const ReviewForm: React.FC = () => {
  const { formData, prevStep, submitForm, markStepAsCompleted } = useFormContext();
  const toast = useToast();

  const handleSubmit = () => {
    // Mark the review step as completed
    markStepAsCompleted(6);
    
    // Submit the entire form data
    submitForm();
    
    toast({
      title: "Form submitted successfully!",
      description: "Thank you for completing the registration process.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
          <Heading size="md" mb={2}>Review Your Information</Heading>
          <Text color="gray.600">Please review all the information you've provided before submitting</Text>
        </Box>

        <Accordion allowMultiple defaultIndex={[0]}>
          {/* Personal Details Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Personal Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <HStack spacing={4} alignItems="flex-start">
                  <Avatar 
                    size="xl" 
                    src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : undefined} 
                    name={formData.name || formData.fullName} 
                  />
                  <VStack align="flex-start" spacing={1}>
                    <Heading size="md">{formData.name || formData.fullName}</Heading>
                    <Text>{formData.email}</Text>
                    <Text>{formData.contact || formData.contactNumber}</Text>
                  </VStack>
                </HStack>

                <GridItem>
                  <VStack align="flex-start" spacing={2}>
                    <Text><strong>Date of Birth:</strong> {formData.dob || formData.dateOfBirth}</Text>
                    <Text><strong>Blood Group:</strong> {formData.bloodGroup}</Text>
                    <Text><strong>Aadhar Number:</strong> {formData.aadharNumber}</Text>
                    <Text><strong>Category:</strong> {formData.casteCategory}</Text>
                    <Text><strong>Subcaste:</strong> {formData.subcaste}</Text>
                    <Text><strong>Religion:</strong> {formData.religion}</Text>
                  </VStack>
                </GridItem>
              </Grid>

              <Divider my={4} />

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <GridItem>
                  <Heading size="sm" mb={2}>Current Address</Heading>
                  <Text>{formData.address || formData.currentAddress}</Text>
                </GridItem>
                <GridItem>
                  <Heading size="sm" mb={2}>Permanent Address</Heading>
                  <Text>{formData.permanentAddress}</Text>
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>

          {/* Education Details Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Education Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <GridItem>
                  <Heading size="sm" mb={2}>Highest Qualification</Heading>
                  <Text><strong>{formData.highestQualification}</strong></Text>
                  <Text>{formData.university}</Text>
                  <Text>Year of Passing: {formData.yearOfPassing}</Text>
                  <Text>Percentage: {formData.percentage}%</Text>
                </GridItem>
                <GridItem>
                  <Heading size="sm" mb={2}>Current Education</Heading>
                  <Text><strong>{formData.currentCourse}</strong></Text>
                  <Text>{formData.currentInstitution}</Text>
                  <Text>Current Year: {formData.currentYear}</Text>
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>

          {/* Academic History Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Academic History
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {formData.semesterGrades && formData.semesterGrades.length > 0 ? (
                <>
                  <Table variant="simple" size="sm" mb={4}>
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Semester</Th>
                        <Th>Year</Th>
                        <Th isNumeric>SGPA</Th>
                        <Th isNumeric>Credits</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {formData.semesterGrades.map((grade, index) => (
                        <Tr key={index}>
                          <Td>{grade.semester}</Td>
                          <Td>{grade.year}</Td>
                          <Td isNumeric>{grade.sgpa}</Td>
                          <Td isNumeric>{grade.credits}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <HStack justify="flex-end" spacing={4}>
                    <Text fontWeight="bold">CGPA:</Text>
                    <Badge colorScheme="green" fontSize="md" px={3} py={1} borderRadius="md">
                      {formData.cgpa}
                    </Badge>
                  </HStack>
                </>
              ) : (
                <Text color="gray.500">No academic history provided</Text>
              )}
            </AccordionPanel>
          </AccordionItem>

          {/* Family Details Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Family Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <GridItem>
                  <Heading size="sm" mb={2}>Father's Information</Heading>
                  <Text><strong>Name:</strong> {formData.fatherName}</Text>
                  <Text><strong>Occupation:</strong> {formData.fatherOccupation}</Text>
                  <Text><strong>Contact:</strong> {formData.fatherContact}</Text>
                </GridItem>
                <GridItem>
                  <Heading size="sm" mb={2}>Mother's Information</Heading>
                  <Text><strong>Name:</strong> {formData.motherName}</Text>
                  <Text><strong>Occupation:</strong> {formData.motherOccupation}</Text>
                  <Text><strong>Contact:</strong> {formData.motherContact}</Text>
                </GridItem>
              </Grid>

              {formData.hasSiblings && (
                <>
                  <Divider my={4} />
                  <Heading size="sm" mb={2}>Sibling Information</Heading>
                  <Text><strong>Name:</strong> {formData.siblingName}</Text>
                  <Text><strong>Age:</strong> {formData.siblingAge}</Text>
                </>
              )}

              <Divider my={4} />
              <Heading size="sm" mb={2}>Emergency Contact</Heading>
              <Text><strong>Name:</strong> {formData.emergencyContactName}</Text>
              <Text><strong>Contact:</strong> {formData.emergencyContactNumber}</Text>
              <Text><strong>Relation:</strong> {formData.emergencyContactRelation}</Text>
            </AccordionPanel>
          </AccordionItem>

          {/* Scholarship & Hostel Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Scholarship & Hostel Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="flex-start" spacing={6} width="100%">
                {/* Scholarship Information */}
                <Box width="100%">
                  <Heading size="sm" mb={3}>Scholarship Information</Heading>
                  {formData.hasScholarship ? (
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <GridItem>
                        <Text><strong>Type:</strong> {formData.scholarshipType}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Amount:</strong> ₹{formData.scholarshipAmount}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Provider:</strong> {formData.scholarshipProvider}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Duration:</strong> {formData.scholarshipDuration}</Text>
                      </GridItem>
                      {formData.scholarshipDetails && (
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                          <Text><strong>Additional Details:</strong> {formData.scholarshipDetails}</Text>
                        </GridItem>
                      )}
                    </Grid>
                  ) : (
                    <Text color="gray.500">No scholarship</Text>
                  )}
                </Box>

                <Divider />

                {/* Hostel Information */}
                <Box width="100%">
                  <Heading size="sm" mb={3}>Hostel Information</Heading>
                  {formData.isHosteler ? (
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <GridItem>
                        <Text><strong>Hostel Name:</strong> {formData.hostelName}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Room Number:</strong> {formData.roomNumber}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Room Type:</strong> {formData.roomType}</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Hostel Fees:</strong> ₹{formData.hostelFees}/year</Text>
                      </GridItem>
                      <GridItem>
                        <Text><strong>Distance from Home:</strong> {formData.distanceFromHome} km</Text>
                      </GridItem>
                      {formData.wardenContact && (
                        <GridItem>
                          <Text><strong>Warden Contact:</strong> {formData.wardenContact}</Text>
                        </GridItem>
                      )}
                      {formData.hostelAddress && (
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                          <Text><strong>Hostel Address:</strong> {formData.hostelAddress}</Text>
                        </GridItem>
                      )}
                    </Grid>
                  ) : (
                    <Text color="gray.500">Not staying in hostel</Text>
                  )}
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Interests & Skills Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Interests & Skills
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="flex-start" spacing={4}>
                <Box width="100%">
                  <Heading size="sm" mb={2}>Technical Domains of Interest</Heading>
                  <HStack spacing={2} flexWrap="wrap">
                    {formData.technicalInterests?.map((interest, index) => (
                      <Tag key={index} colorScheme="blue" m={1}>
                        <TagLabel>{interest}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </Box>

                <Box width="100%">
                  <Heading size="sm" mb={2}>Technical Skills</Heading>
                  <HStack spacing={2} flexWrap="wrap">
                    {formData.skills?.map((skill, index) => (
                      <Tag key={index} colorScheme="green" m={1}>
                        <TagLabel>{skill}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </Box>

                <Box width="100%">
                  <Heading size="sm" mb={2}>Hobbies & Interests</Heading>
                  <Text>{formData.hobbies}</Text>
                </Box>

                {formData.achievements && (
                  <Box width="100%">
                    <Heading size="sm" mb={2}>Achievements</Heading>
                    <Text>{formData.achievements}</Text>
                  </Box>
                )}

                <Box width="100%">
                  <Heading size="sm" mb={2}>Career Goals</Heading>
                  <Text>{formData.careerGoals}</Text>
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Box pt={4} display="flex" justifyContent="space-between">
          <Button onClick={prevStep} colorScheme="gray">
            Back
          </Button>
          <Button onClick={handleSubmit} colorScheme="green">
            Submit Application
          </Button>
        </Box>
      </VStack>
    </AnimatedBox>
  );
};

export default ReviewForm; 