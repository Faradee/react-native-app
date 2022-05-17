import React, {useState, useContext} from 'react';

const UserContext = React.createContext();
const LoadingContext = React.createContext();
const ThemeContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [darkTheme, setTheme] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const changeUser = userData => {
    setUser(userData);
  };
  const changeTheme = () => {
    setTheme(!darkTheme);
  };
  const changeLoadingStatus = () => {
    setLoading(!isLoading);
  };

  return (
    <LoadingContext.Provider value={{isLoading, changeLoadingStatus}}>
      <ThemeContext.Provider value={{darkTheme, changeTheme}}>
        <UserContext.Provider value={{user, changeUser}}>
          {children}
        </UserContext.Provider>
      </ThemeContext.Provider>
    </LoadingContext.Provider>
  );
};
