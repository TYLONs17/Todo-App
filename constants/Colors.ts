/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const tintColorLight = '#0a7ea4';
const tintColorDark = '#70a1ff';

export const Colors = {
  light: {
    text: '#0a3d62', // Dark Blue for text
    background: '#f5f6fa', // Light greyish-blue background
    tint: tintColorLight,
    icon: '#40739e', // Medium Blue for icons
    tabIconDefault: '#718093', // Greyish Blue for default tab icon
    tabIconSelected: tintColorLight,
    taskBackground: '#dff9fb', // Light Blue for task background
    taskBorder: '#c7ecee', // Light greyish-blue border for tasks
    buttonBackground: tintColorLight,
    buttonText: '#ffffff', // White for button text
  },
  dark: {
    text: '#dcdde1', // Light greyish-blue for text
    background: '#2f3640', // Dark blue background
    tint: tintColorDark,
    icon: '#9c88ff', // Light blueish-purple for icons
    tabIconDefault: '#7f8fa6', // Greyish blue for default tab icon
    tabIconSelected: tintColorDark,
    taskBackground: '#353b48', // Dark greyish-blue for task background
    taskBorder: '#718093', // Greyish-blue border for tasks
    buttonBackground: tintColorDark,
    buttonText: '#2f3640', // Dark background color for button text
  },
};

