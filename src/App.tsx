import React from 'react';
import './App.css';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Input, Switch } from 'antd';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>();
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: boolean) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  return (
    <div className="main fade-in">
      <h1>The current theme: {currentTheme}</h1>
      <Switch checked={isDarkMode} onChange={toggleTheme} />

      <Input
        style={{ width: 300, marginTop: 30 }}
        placeholder="I will change with the theme!"
      />
    </div>
  );
}

export default App;
