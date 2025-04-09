import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Textarea,
  Stack,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { useFormContext } from '../../context/FormContext';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

interface ExtracurricularActivity {
  activity: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

const ExtracurricularActivitiesStep: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [newActivity, setNewActivity] = useState<ExtracurricularActivity>({
    activity: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleInputChange = (field: keyof ExtracurricularActivity, value: string) => {
    setNewActivity((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addActivity = () => {
    if (!newActivity.activity || !newActivity.role || !newActivity.startDate || !newActivity.description) {
      return;
    }

    const updatedActivities = [...(formData.extracurriculars || []), newActivity];
    updateFormData({ extracurriculars: updatedActivities });
    
    setNewActivity({
      activity: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const removeActivity = (index: number) => {
    const updatedActivities = [...(formData.extracurriculars || [])];
    updatedActivities.splice(index, 1);
    updateFormData({ extracurriculars: updatedActivities });
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="md" mb={4}>Extracurricular Activities</Heading>
        
        <Card mb={6} variant="outline">
          <CardHeader pb={0}>
            <Heading size="sm">Add New Activity</Heading>
          </CardHeader>
          
          <CardBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Activity Name</FormLabel>
                <Input
                  value={newActivity.activity}
                  onChange={(e) => handleInputChange('activity', e.target.value)}
                  placeholder="Enter activity name"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Your Role</FormLabel>
                <Input
                  value={newActivity.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Enter your role in the activity"
                />
              </FormControl>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    value={newActivity.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>End Date (Optional)</FormLabel>
                  <Input
                    type="date"
                    value={newActivity.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newActivity.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your involvement and achievements"
                  rows={4}
                />
              </FormControl>
            </Stack>
          </CardBody>
          
          <CardFooter pt={0}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={addActivity}
              isDisabled={!newActivity.activity || !newActivity.role || !newActivity.startDate || !newActivity.description}
            >
              Add Activity
            </Button>
          </CardFooter>
        </Card>
        
        {formData.extracurriculars && formData.extracurriculars.length > 0 ? (
          <VStack spacing={4} align="stretch">
            <Heading size="sm" mb={2}>Your Activities</Heading>
            
            {formData.extracurriculars.map((activity, index) => (
              <Card key={index} variant="outline" borderLeft="4px" borderLeftColor="blue.500">
                <CardHeader pb={2}>
                  <Flex justify="space-between" align="center">
                    <Heading size="sm">{activity.activity}</Heading>
                    <IconButton
                      aria-label="Remove activity"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => removeActivity(index)}
                    />
                  </Flex>
                  <Text fontSize="sm" color="gray.600">{activity.role}</Text>
                </CardHeader>
                
                <CardBody pt={0}>
                  <Text fontSize="sm" fontWeight="medium" mb={1}>
                    {new Date(activity.startDate).toLocaleDateString()} - 
                    {activity.endDate ? new Date(activity.endDate).toLocaleDateString() : ' Present'}
                  </Text>
                  <Text fontSize="sm">{activity.description}</Text>
                </CardBody>
              </Card>
            ))}
          </VStack>
        ) : (
          <Box textAlign="center" py={4}>
            <Text color="gray.500">No activities added yet. Fill out the form above to add your extracurricular activities.</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default ExtracurricularActivitiesStep;