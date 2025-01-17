import React, { createContext, useState, useContext, ReactNode } from 'react';

type ProjectCount = {
  active: number;
  shared: number;
  template: number;
};

interface UserContextType {
  userName: string | null;
  projectCount: ProjectCount;
  setUserName: (name: string) => void;
  setProjectCount: (projectCount: ProjectCount) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [projectCount, setProjectCount] = useState<ProjectCount>({
    active: 0,
    shared: 0,
    template: 0,
  });

  return (
    <UserContext.Provider
      value={{ userName, projectCount, setUserName, setProjectCount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
