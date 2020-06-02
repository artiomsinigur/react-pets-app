import React from "react";

// Provide a hook [state, updateState] to context
export const ThemeContext = React.createContext(["green", () => {}]);
// export const ThemeColors = React.createContext({background: "#293241",text: "#ee6c4d"});
