# Panel Pals: A Comic Review and Forum Website

Welcome to **Panel Pals**, the perfect place to share your thoughts on the latest manhwa/manga/webtoon you've read and engage in insightful conversations with fellow enthusiasts!

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Upcoming Features](#upcoming)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Learnings and Best Practices Applied](#learnings-and-best-practices-applied)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration and Authentication**: Easily create an account to start reviewing comics and participating in discussions.
- **Comic Management**: Add new comics to the website. Submissions will be reviewed and approved by moderators before they go live.
- **Profile Customization**: Personalize your profile with a bio, avatar, and favorite genres.
- **Engage with the Community**: Write reviews, create posts, and comment on any conversation. Share your insights and learn from others.
- **Moderation Tools**: Special features for moderators to approve new comics and manage community content.

## Screenshots

1. **Login**
   ![Login Page](public/login.png)

2. **Home**
   ![Home Page](public/home.png)

3. **Comic Details**
   ![Comic Details Page](public/comic-details.png)

4. **Reviews**
   ![Reviews](public/reviews.png)

5. **Browse/Explore**
   ![Explore Page](public/explore.png)

6. **Discussions**
   ![Discussions Page](public/Discussions.png)

7. **Discussion Details**
   ![Discussion Details Page](public/Discussion-details.png)

8. **Form and Modals**
   ![Form and Modals](public/modals-2.png)
   ![Form and Modals](public/modals.png)

## Upcoming

- **Third-Party Authentication**
- **Moderator/Admin Profile**
- **Detailed User Profile**
- **Detailed User Profile**

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/JaymeeCasabuena/PanelPals-Angular.git
   cd PanelPals-Angular
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the SQLite database**:

   Ensure you have SQLite installed. Run the following script to create the necessary tables:

   ```bash
   nodemon app.js
   ```

4. **Start the server**:

   ```bash
   nodemon app.js
   ```

   The server will start on `http://localhost:3000`.

## Usage

- **Register or Log in** to access all features.
- **Browse comics** and read reviews by other users.
- **Add your own reviews** and contribute to discussions on the forum.

## Contributing

We welcome contributions to **Panel Pals**! To contribute, please:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Learnings and Best Practices Applied

- Followed a **feature-based project structure** to organize code and maintain scalability.
- Utilized **Angular Reactive Forms** for user input handling, ensuring a robust and dynamic experience.
- Leveraged **standalone components** and other **Angular 18+ features** to improve modularity and performance.
- Incorporated **RxJS Subjects and BehaviorSubjects** for effective state management.
- Created **reusable components** to maintain a DRY (Don't Repeat Yourself) approach throughout the project.
- Applied the **Single Responsibility Principle (SRP)** to keep components, services, and logic focused and maintainable.
- Enhanced understanding of modern Angular features and best practices to deliver a seamless user experience.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Created by Jayme Casabuena - feel free to contact me!
