import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';
import { useAuth } from './AuthContext';

const BoxContext = createContext();

const BoxContextProvider = ({ children }) => {
  const { user } = useAuth();
  const allBoxes = useAPI('/box?all');
  const userBoxes = useAPI(`/userBoxes/${user?._id}`, {
    skipRequest: !user?._id,
  });

  return (
    <BoxContext.Provider
      value={{
        all: { ...allBoxes, boxes: allBoxes.data?.boxes },
        user: { ...userBoxes, boxes: userBoxes.data?.boxes },
        async refresh() {
          await allBoxes.refresh();
          await userBoxes.refresh();
        },
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export default BoxContextProvider;

export const useBoxes = () => useContext(BoxContext);
