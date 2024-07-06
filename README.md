# Wanderlust
Wanderlust is a full-featured MERN stack website designed to replicate the core functionalities of Airbnb. Users can explore and host destinations, add reviews, and view locations on an interactive map. This project follows the MVC (Model-View-Controller) architecture and includes robust authentication and authorization mechanisms. The site is deployed using Render for easy accessibility.

# Table of Contents
* **Features
* **Technologies Used
* **Project Structure
* **Usage
* **Deployment
* **Screenshots
* **License
  
# Features
User Authentication and Authorization: Secure login and registration system to protect user data and ensure only authenticated users can access certain features.
Add and Manage Listings: Users can host their own places or destinations by providing details such as title, description, price, and location.
Add and View Reviews: Users can leave reviews for listed places, providing feedback and ratings.
Interactive Map: Integrates map functionality to display the exact location of each listing, enhancing user experience and navigation.
Responsive Design: Built with Bootstrap to ensure the website is fully responsive and mobile-friendly.
# Technologies Used
# Frontend:
* **HTML: Markup language for creating the structure of the web pages.
* **CSS: Stylesheet language used for describing the presentation of the web pages.
* **JavaScript: Programming language for creating interactive and dynamic content.
* **Bootstrap: Frontend framework for developing responsive and mobile-first websites.
# Backend:
* **Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine for building fast and scalable network applications.
* **Express.js: Web application framework for Node.js, designed for building web applications and APIs.
# Templating:
* **EJS: Embedded JavaScript templating for generating HTML markup with plain JavaScript.
* **EJS-Mate: Layout and partial support for EJS, allowing for DRY (Don't Repeat Yourself) templating.
# Database:
* **MongoDB: NoSQL database program, using JSON-like documents with optional schemas.
# Project Structure
The project follows the MVC (Model-View-Controller) architecture:

Model: Represents the data layer. In Wanderlust, MongoDB is used to define schemas for listings and reviews.
View: Represents the presentation layer. EJS templates are used to render the user interface.
Controller: Handles the application logic and user input. Express.js controllers manage the routes and perform operations like fetching data from the database, processing it, and rendering the appropriate views.
This separation of concerns allows for organized and maintainable code, making it easier to manage and scale the project.

# Usage
Explore Listings: Browse through various hosted places and destinations.
Host a Place: Register and log in to host your own place by providing necessary details like title, description, price, and location.
Add Reviews: Share your experience by adding reviews to existing listings.
View Locations: Use the interactive map to see the exact locations of listings, helping you make informed decisions.
# Deployment
The Wanderlust website is deployed using Render. You can access the live version here.
