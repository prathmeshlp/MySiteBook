import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PayloadType, createProject } from '../api/createProject';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMsg from '../components/ErrorMsg';
import useFormHandler from '../hooks/useFormHandler';

const validationSchema: Yup.ObjectSchema<PayloadType> = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string(),
  budget: Yup.string(),
  source: Yup.string(),
});
const initialValues: PayloadType = {
  name: '',
  address: '',
  budget: '0.00',
  source: '',
};

const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  const {
    response,
    error,
    values,
    touched,
    errors,
    handleChange,
    resetForm,
    handleBlur,
    handleSubmit,
  } = useFormHandler(initialValues, validationSchema, createProject);

  useEffect(() => {
    if (response && !error) {
      navigate('/app/projects?type=active');
    }
  }, [response]);

  const handleCancel = () => {
    resetForm();
    navigate('/app/projects?type=active');
  };

  return (
    <div className="flex justify-center sm:items-start sm:pt-4 w-full min-h-screen bg-lightGray">
      <div className="w-full sm:w-1/3 p-2 mt-16 sm:mt-22">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold sm:block sm:py-3 hidden mb-2">
            Create Project
          </h1>
          <div className="mb-4 w-full">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-textColor"
            >
              Name of the client / project *
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-2 block w-full sm:h-full h-14 border border-darkGray rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-lightGray ${
                errors.name ? 'border-red-500' : 'border-darkGray'
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name ? (
              <ErrorMsg message={errors.name}></ErrorMsg>
            ) : null}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="address"
              className="block text-sm font-medium text-textColor"
            >
              Address
            </Label>
            <textarea
              id="address"
              name="address"
              className="mt-1 p-2 block w-full h-24 sm:h-full border border-darkGray shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-lightGray resize-none"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            ></textarea>
          </div>

          <div className="mb-4">
            <Label
              htmlFor="budget"
              className="block text-sm font-medium text-textColor"
            >
              Client&apos;s Budget (₹)
            </Label>
            <Input
              type="number"
              id="budget"
              name="budget"
              className="mt-1 p-2 block w-full sm:h-full h-14 border border-darkGray rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-lightGray"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.budget}
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="source"
              className="block text-sm font-medium text-textColor"
            >
              Source of Enquiry
            </Label>
            <Input
              type="text"
              id="source"
              name="source"
              className="mt-1 p-2 block w-full sm:h-full h-14 border border-darkGray rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-lightGray"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.source}
            />
          </div>

          <div className="sm:static fixed left-0 sm:h-full h-16 w-full bottom-0">
            <div className="flex sm:justify-center justify-between items-center w-full p-2 gap-6">
              <Button
                type="button"
                className="btn-secondary w-28 h-10"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary cursor-pointer w-28 h-10"
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
