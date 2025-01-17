import { getToken } from './auth';

export interface PayloadType {
  name: string;
  address?: string;
  budget?: string;
  source?: string;
}
export const createProject = async (payload: PayloadType) => {
  const token = getToken();
  const params = new URLSearchParams({
    copyFrom: 'undefined',
    useWBSWithQuantity: 'false',
    excelFilePath: 'undefined',
    isSharedWorkspace: 'false',
  });

  const { name, address, budget, source } = payload;
  const updatedPayload = {
    name: name,
    address: address,
    type: 'project',
    projectType: 'other',
    imgUrl: '',
    currency: 'INR(₹)',
    tax: 'GST',
    allowViewOnlyQuantities: false,
    clientDetails: {
      name: name,
      email: '',
      address: address,
      contactPerson: '',
      contactNumber: '',
      countryCode: '',
      gstNumber: '',
      placeOfSupply: '',
    },
    clientBudget: Number(budget),
    enquirySource: source,
    coverImage: '',
  };

  const response = await fetch(
    `https://app.mysitebook.io/api/projects?${params.toString()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPayload),
    },
  );
  if (!response.ok) {
    throw new Error('Error creating project');
  }

  const data = await response.json();
  return data;
};
