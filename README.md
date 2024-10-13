# EasyPuzzle

## [EasyPuzzle](https://easypuzzle.web.app/) https://easypuzzle.web.app/.

EasyPuzzle is a comprehensive web application designed to assist users in managing their academic schedules, calculating CGPA, and converting text to Morse code. This application is built using React and provides a user-friendly interface for various educational tools. Below is a detailed overview of the components included in this project, installation instructions, usage guidelines, and contribution details.

## Table of Contents

- [Features](#features)
- [Components Overview](#components-overview)
  - [Routine.jsx](#1-routinejsx)
  - [CalculateCg.jsx](#2-calculategjsx)
  - [MorseCodeConverter.jsx](#3-morsecodeconverterjsx)
  - [TicTacToe.jsx](#4-tictactoejsx)
  - [Sudoku.jsx](#5-sudokujsx)
  - [package.json](#6-packagejson)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)

## Features

- **Course Management:** Users can add, edit, and delete courses from their schedule.
- **CGPA Calculation:** Calculate current CGPA based on grades and credits, including retake options.
- **Morse Code Conversion:** Convert text input into Morse code for educational purposes.
- **Interactive Games:** Play Tic Tac Toe against a computer or a friend, with tracking for wins.
- **Responsive Design:** The application is designed to be responsive and user-friendly across devices.

## Components Overview

### 1. **Routine.jsx**

- **Location:** `src/components/Routine/Routine.jsx`
- **Description:**
  - This component allows users to create and manage their course schedules.
  - Users can input course names, select days and times, and visualize their schedules in a table format.
  - The component supports downloading the schedule as a PDF or PNG file for easy sharing and printing.
  - **Key Features:**
    - Dynamic day and time selection.
    - Editable schedule table.
    - Download functionality for schedules.

### 2. **CalculateCg.jsx**

- **Location:** `src/components/CGCalculator/CalculateCg.jsx`
- **Description:**
  - This component calculates the CGPA based on user input for courses, grades, and credits.
  - It supports retake calculations, allowing users to input previous grades and see how retakes affect their overall CGPA.
  - Users can select their university's grading system, which adjusts the grading scale accordingly.
  - **Key Features:**
    - Input fields for course names, grades, and credits.
    - Calculation of total earned credits and CGPA.
    - Support for multiple university grading systems.

### 3. **MorseCodeConverter.jsx**

- **Location:** `src/components/MorseCodeConverter.jsx`
- **Description:**
  - This component converts text input into Morse code.
  - Users can enter any text, and the application will output the corresponding Morse code representation.
  - **Key Features:**
    - User-friendly text area for input.
    - Display of converted Morse code.
    - Supports a wide range of characters, including letters, numbers, and punctuation.

### 4. **TicTacToe.jsx**

- **Location:** `src/components/ticTacToe/TicTacToe.jsx`
- **Description:**
  - A simple Tic Tac Toe game where users can play against the computer or a friend.
  - The game tracks wins for both players and allows for resetting the game.
  - **Key Features:**
    - Interactive game board with clickable cells.
    - Win tracking for both players.
    - Option to play against the computer with varying difficulty levels.

### 5. **Sudoku.jsx**

- **Location:** `src/components/sudoku/Sudoku.jsx`
- **Description:**
  - A placeholder component for a Sudoku game.
  - Currently, it displays a simple message indicating that the component is not yet implemented.
  - **Future Plans:**
    - Implement a fully functional Sudoku game with difficulty levels and hints.

### 6. **package.json**

- **Location:** `package.json`
- **Description:**
  - This file contains metadata about the project, including dependencies, scripts, and project configuration.
  - It defines the project’s name, version, and the libraries used to build the application.

## Installation

To get started with EasyPuzzle, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd easypuzzle
   ```

2. **Install Dependencies:**
   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Install Additional Tools:**
   If you plan to use Firebase for deployment, ensure you have the Firebase CLI installed:
   ```bash
   npm install -g firebase-tools
   ```

## Usage

After installing the dependencies, you can run the application using:

```bash
npm run dev
```

This will start the development server, and you can access the application in your web browser at `http://localhost:3000`.

### Application Features

- **Course Management:** Navigate to the Course Management section to add or edit your courses.
- **CGPA Calculation:** Use the CGPA Calculator to input your courses and grades.
- **Morse Code Conversion:** Enter text in the Morse Code Converter to see the output.
- **Tic Tac Toe Game:** Play against the computer or a friend in the Tic Tac Toe game.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request. Here’s how you can contribute:

1. **Fork the Repository:** Click on the "Fork" button at the top right of the repository page.
2. **Create a New Branch:**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Make Your Changes:** Implement your feature or fix.
4. **Commit Your Changes:**
   ```bash
   git commit -m "Add your message here"
   ```
5. **Push to the Branch:**
   ```bash
   git push origin feature/YourFeatureName
   ```
6. **Open a Pull Request:** Go to the original repository and click on "New Pull Request."

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the open-source community for their support and resources.
- Special thanks to the libraries and frameworks used in this project, including React, Vite, and Firebase.

## Live Demo

You can view a live demo of the application at [EasyPuzzle](https://easypuzzle.web.app/).

---

Feel free to reach out if you have any questions or need further assistance!
