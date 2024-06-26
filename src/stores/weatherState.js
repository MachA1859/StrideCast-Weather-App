import React from "react"

const defaultGlobalState = {
    isLoading: true,
    json: undefined
}

const globalStateContext = React.createContext(defaultGlobalState);
const dispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useState(
      (state, newValue) => ({ ...state, ...newValue }),
      defaultGlobalState
    );
    return (
      <globalStateContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          {children}
        </dispatchStateContext.Provider>
      </globalStateContext.Provider>
    );
  };

export const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext)
  ];