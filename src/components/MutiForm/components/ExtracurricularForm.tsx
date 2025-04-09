import React from 'react';
import { useFormContext } from '../context/FormContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Internship {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

interface Certification {
  name: string;
  issuedBy: string;
  date: string;
}

const ExtracurricularForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const validationSchema = Yup.object({
    internships: Yup.array().of(
      Yup.object().shape({
        company: Yup.string().required('Company name is required'),
        role: Yup.string().required('Role is required'),
        duration: Yup.string().required('Duration is required'),
        description: Yup.string(),
      })
    ),
    projects: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Project title is required'),
        description: Yup.string().required('Description is required'),
        technologies: Yup.string().required('Technologies used are required'),
        link: Yup.string().url('Must be a valid URL'),
      })
    ),
    certifications: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Certification name is required'),
        issuedBy: Yup.string().required('Issuing organization is required'),
        date: Yup.string().required('Date is required'),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      internships: formData.internships.length
        ? formData.internships
        : [{ company: '', role: '', duration: '', description: '' }],
      projects: formData.projects.length
        ? formData.projects
        : [{ title: '', description: '', technologies: '', link: '' }],
      certifications: formData.certifications.length
        ? formData.certifications
        : [{ name: '', issuedBy: '', date: '' }],
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData(values);
    },
  });

  // Add new item to an array
  const handleAddItem = (fieldName: 'internships' | 'projects' | 'certifications') => {
    const emptyItems = {
      internships: { company: '', role: '', duration: '', description: '' },
      projects: { title: '', description: '', technologies: '', link: '' },
      certifications: { name: '', issuedBy: '', date: '' },
    };

    formik.setFieldValue(fieldName, [...formik.values[fieldName], emptyItems[fieldName]]);
  };

  // Remove item from an array
  const handleRemoveItem = (fieldName: 'internships' | 'projects' | 'certifications', index: number) => {
    const updatedItems = [...formik.values[fieldName]];
    updatedItems.splice(index, 1);
    formik.setFieldValue(fieldName, updatedItems);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Extracurricular & Internships</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Internships */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Internships</h3>
            <button
              type="button"
              onClick={() => handleAddItem('internships')}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <FaPlus className="mr-1" /> Add Internship
            </button>
          </div>
          
          {formik.values.internships.map((_, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-md font-medium">Internship {index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('internships', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`internships.${index}.company`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company *
                  </label>
                  <input
                    id={`internships.${index}.company`}
                    name={`internships.${index}.company`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internships[index].company}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.internships?.[index]?.company && 
                   typeof formik.errors.internships?.[index] === 'object' && 
                   formik.errors.internships[index]?.company ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.internships[index]?.company as string}
                    </div>
                  ) : null}
                </div>
                
                <div>
                  <label
                    htmlFor={`internships.${index}.role`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role *
                  </label>
                  <input
                    id={`internships.${index}.role`}
                    name={`internships.${index}.role`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internships[index].role}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.internships?.[index]?.role && 
                   typeof formik.errors.internships?.[index] === 'object' && 
                   formik.errors.internships[index]?.role ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.internships[index]?.role as string}
                    </div>
                  ) : null}
                </div>
                
                <div>
                  <label
                    htmlFor={`internships.${index}.duration`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Duration *
                  </label>
                  <input
                    id={`internships.${index}.duration`}
                    name={`internships.${index}.duration`}
                    type="text"
                    placeholder="e.g., 3 months, Summer 2023"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internships[index].duration}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.internships?.[index]?.duration && 
                   typeof formik.errors.internships?.[index] === 'object' && 
                   formik.errors.internships[index]?.duration ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.internships[index]?.duration as string}
                    </div>
                  ) : null}
                </div>
                
                <div className="md:col-span-2">
                  <label
                    htmlFor={`internships.${index}.description`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id={`internships.${index}.description`}
                    name={`internships.${index}.description`}
                    rows={2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internships[index].description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Projects</h3>
            <button
              type="button"
              onClick={() => handleAddItem('projects')}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <FaPlus className="mr-1" /> Add Project
            </button>
          </div>
          
          {formik.values.projects.map((_, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-md font-medium">Project {index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('projects', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`projects.${index}.title`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Title *
                  </label>
                  <input
                    id={`projects.${index}.title`}
                    name={`projects.${index}.title`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projects[index].title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.projects?.[index]?.title && 
                   typeof formik.errors.projects?.[index] === 'object' && 
                   formik.errors.projects[index]?.title ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.projects[index]?.title as string}
                    </div>
                  ) : null}
                </div>
                
                <div>
                  <label
                    htmlFor={`projects.${index}.technologies`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Technologies Used *
                  </label>
                  <input
                    id={`projects.${index}.technologies`}
                    name={`projects.${index}.technologies`}
                    type="text"
                    placeholder="e.g., React, Node.js, MongoDB"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projects[index].technologies}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.projects?.[index]?.technologies && 
                   typeof formik.errors.projects?.[index] === 'object' && 
                   formik.errors.projects[index]?.technologies ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.projects[index]?.technologies as string}
                    </div>
                  ) : null}
                </div>
                
                <div className="md:col-span-2">
                  <label
                    htmlFor={`projects.${index}.description`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <textarea
                    id={`projects.${index}.description`}
                    name={`projects.${index}.description`}
                    rows={2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projects[index].description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.projects?.[index]?.description && 
                   typeof formik.errors.projects?.[index] === 'object' && 
                   formik.errors.projects[index]?.description ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.projects[index]?.description as string}
                    </div>
                  ) : null}
                </div>
                
                <div className="md:col-span-2">
                  <label
                    htmlFor={`projects.${index}.link`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Link
                  </label>
                  <input
                    id={`projects.${index}.link`}
                    name={`projects.${index}.link`}
                    type="url"
                    placeholder="https://..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projects[index].link}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.projects?.[index]?.link && 
                   typeof formik.errors.projects?.[index] === 'object' && 
                   formik.errors.projects[index]?.link ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.projects[index]?.link as string}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Certifications</h3>
            <button
              type="button"
              onClick={() => handleAddItem('certifications')}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <FaPlus className="mr-1" /> Add Certification
            </button>
          </div>
          
          {formik.values.certifications.map((_, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-md font-medium">Certification {index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('certifications', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`certifications.${index}.name`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Certification Name *
                  </label>
                  <input
                    id={`certifications.${index}.name`}
                    name={`certifications.${index}.name`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.certifications[index].name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.certifications?.[index]?.name && 
                   typeof formik.errors.certifications?.[index] === 'object' && 
                   formik.errors.certifications[index]?.name ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.certifications[index]?.name as string}
                    </div>
                  ) : null}
                </div>
                
                <div>
                  <label
                    htmlFor={`certifications.${index}.issuedBy`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Issued By *
                  </label>
                  <input
                    id={`certifications.${index}.issuedBy`}
                    name={`certifications.${index}.issuedBy`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.certifications[index].issuedBy}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.certifications?.[index]?.issuedBy && 
                   typeof formik.errors.certifications?.[index] === 'object' && 
                   formik.errors.certifications[index]?.issuedBy ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.certifications[index]?.issuedBy as string}
                    </div>
                  ) : null}
                </div>
                
                <div>
                  <label
                    htmlFor={`certifications.${index}.date`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date *
                  </label>
                  <input
                    id={`certifications.${index}.date`}
                    name={`certifications.${index}.date`}
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.certifications[index].date}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.certifications?.[index]?.date && 
                   typeof formik.errors.certifications?.[index] === 'object' && 
                   formik.errors.certifications[index]?.date ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.certifications[index]?.date as string}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExtracurricularForm; 