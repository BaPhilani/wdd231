# Chamber of Commerce Website

Welcome to the Chamber of Commerce website project! This project serves as a digital platform for the Chamber of Commerce, providing information and resources for members and the community.

## Project Overview

The Chamber of Commerce website includes the following features:

- **Home Page**: A landing page with a consistent layout, featuring a hero image, a call to action for joining the chamber, a current events section, a weather section powered by the OpenWeatherMap API, and spotlight advertisements for chamber members.

## Project Structure

```
chamber-of-commerce
├── index.html          # Home page of the website
├── css
│   ├── base.css       # Base styles for typography and colors
│   ├── layout.css     # Layout styles for header, navigation, and footer
│   └── home.css       # Specific styles for the home page
├── js
│   ├── main.js        # Main JavaScript file for initialization and navigation
│   ├── weather.js     # Functions to fetch and display weather data
│   ├── spotlights.js   # Functions to fetch and display spotlight advertisements
│   └── config.example.js # Example configuration file for API keys
├── data
│   └── members.json   # JSON data for chamber members
└── README.md          # Documentation for the project
```

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/BaPhilani/wdd231.git
   cd wdd231/chamber-of-commerce
   ```

2. **Install Dependencies**: 
   Ensure you have any necessary dependencies installed. If using a package manager, run:
   ```bash
   npm install
   ```

3. **API Configuration**: 
   Copy `js/config.example.js` to `js/config.js` and fill in your API keys and other necessary configurations.

4. **Open the Project**: 
   Open `index.html` in your web browser to view the website.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.