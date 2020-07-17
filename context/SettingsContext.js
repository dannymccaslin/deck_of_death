import React, { useState } from "react";

const SettingsContext = React.createContext();

const defaultSettings = {
  useJokers: false,
  jokersExercise: "",
  jokersReps: "15",
  numberOfDecks: 1,
  aceValue: 11
};

export const SettingsProvider = ({ children, settings }) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings
  );

  const saveSettings = (values) => {
    setCurrentSettings(values);
  };

  return (
    <SettingsContext.Provider
      value={{ settings: currentSettings, saveSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
