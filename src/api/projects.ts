import { defer } from 'react-router-dom';
import { getToken } from './auth';

export async function getArchivedProjects() {
  try {
    const token = getToken();

    const payload = {
      pageSize: 150,
      pageNumber: 1,
      status: 'archive',
      type: 'project',
      projectType: [],
    };

    const response = await fetch(
      `https://app.mysitebook.io/api/projects/filter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch archived projects');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching archived projects:', error);
    throw error;
  }
}

async function getActiveProjects() {
  try {
    const token = getToken();

    const payload = {
      pageSize: 150,
      pageNumber: 1,
      status: 'active',
      type: 'project',
      projectType: [],
    };

    const response = await fetch(
      `https://app.mysitebook.io/api/projects/filter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch active projects');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching active projects:', error);
    throw error;
  }
}

async function getSampleProjects() {
  try {
    const token = getToken();

    const payload = {
      pageSize: 150,
      pageNumber: 1,
      status: 'active',
      type: 'sample-project',
      projectType: [],
    };

    const response = await fetch(
      `https://app.mysitebook.io/api/projects/filter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sample projects');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sample projects:', error);
    throw error;
  }
}

export async function getTotalPayments() {
  const token = getToken();
  try {
    const response = await fetch(
      `https://app.mysitebook.io/api/projects/projects-payment-total`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch total Payments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching total Payments:', error);
    throw error;
  }
}

export async function loader() {
  try {
    const [sampleProjects, activeProjects, archivedProjects, totalPayments] =
      await Promise.all([
        getSampleProjects(),
        getActiveProjects(),
        getArchivedProjects(),
        getTotalPayments(),
      ]);

    return defer({
      sampleProjects,
      activeProjects,
      archivedProjects,
      totalPayments,
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    throw error;
  }
}
