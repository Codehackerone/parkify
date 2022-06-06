<!--# Parkify-->
<div align="center">
<picture>
  <source srcset="https://res.cloudinary.com/codehackerone/image/upload/v1654404920/Parkify/logo-white_em2e4o.png" media="(prefers-color-scheme: dark)">
  <img alt="PARKIFY_LOGO" id="logo-dark" src="https://res.cloudinary.com/codehackerone/image/upload/v1654404897/Parkify/logo-black_y6ungi.png" height="100" />
</picture>
    <!--<img alt="PARKIFY_LOGO" id="logo-dark" src="public/img/logo-black.png" height="100" />-->
    <br>
<!--     <img alt="PARKIFY_TEXT" id="logo-white" src="public/img/logo-text-black.png" height="40"/> -->
<picture>
  <source srcset="https://res.cloudinary.com/codehackerone/image/upload/v1654404904/Parkify/logo-text-white_jqhdsf.png" media="(prefers-color-scheme: dark)">
  <img alt="PARKIFY_TEXT" id="logo-dark" src="https://res.cloudinary.com/codehackerone/image/upload/v1654404900/Parkify/logo-text-black_qnvhtr.png" height="40" />
</picture>  
<br><br>
    <span style="font-weight: bold;">&#60;/&#62;</span> with <span style="color: #8b0000;">&hearts;</span> by <a href="https://github.com/codehackerone">@codehackerone</a>.<br><br>
<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-yellowgreen" alt="version 1.0.0"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="license MIT"/>
    <img src="https://img.shields.io/github/issues-pr-raw/codehackerone/parkify.svg" />
    <img src="https://img.shields.io/github/issues-raw/codehackerone/parkify.svg"/>
    <img src="https://img.shields.io/badge/author-Codehackerone-orange" alt="author codehackerone"/>
</p>
</div>
<br>

> Hasslefree way to book your parking space with easy cancellations and timeline extensions<br>

---
![cover image](https://github.com/Codehackerone/parkify/blob/main/public/img/coverpage.png)
---
## Why Parkify?

The application will make it easier for the drivers to find and pre-book their slots at the parking locations. The application will also save the frustration of the drivers who at times out of urgency park their cars on the street itself, which further adds to the traffic in the locality. With the use of the application, business professionals can focus on their daily tasks and not worry about their parking space.


## Built With

This application is built on nodeJS, typed in javascript. Vanilla html-css-js is used to built the frontend.

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

---

## Installation

    $ git clone https://github.com/codehackerone/parkify
    $ cd parkify
    $ npm install

### Configure environmental variables

Create a `.env` file then edit it with your settings. You will need:

-   ENV=development
-   PORT=[your_port]
-   MONGO_URI=[your_mongo_uri]
-   JWT_SECRET=[your_jwt_secret]
-   EXPIRY=[your_jwt_expiry_time]
-   SECRET=[your_secret_for_mongostore]
-   CLOUDINARY_CLOUD_NAME=[your_cloudinary_cloud_name]
-   CLOUDINARY_KEY=[your_cloudinary_key]
-   CLOUDINARY_SECRET=[your_cloudinary_secret]
-   MAPBOX_TOKEN=[your_mapbox_project]
-   X_RAPIDAPI_HOST=[your_rapidapi_sendgrid_host]
-   X_RAPIDAPI_KEY=[your_rapiapi_sendgrid_key]
-   SENDGRID_EMAIL=[no-reply@your_domain.com]

### Running the project

    $ npm start
        or
    $ npx nodemon

---

## License

```Parkify``` is available under the MIT license. See the LICENSE file for more info.

## Contributing


1. Find an issue to work on from [here](https://github.com/codehackerone/parkify/issues)
2. Ask the owner/maintainer for permission to work on the issue.
3. Fork this repository. [For help, click here](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
4. Clone the forked repository in your local machine [For help, click here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
5. Create a new branch [For help, click here](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
6. Add and commit your changes to the new branch [For help, click here](https://stackoverflow.com/questions/14655816/how-to-commit-changes-to-another-pre-existent-branch#:~:text=First%2C%20checkout%20to%20your%20new,show%20up%20on%20the%20remote.)
7. Create a Pull Request, add proper description, screenshots, comments and ask a review from owner/maintainer [For help, click here](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
8. The owner/developer will merge the Pull Request if it aligns with the practises we follow and is valid. One should not merge, and ask for a reviewer to merge it.

Please read `CODE_OF_CONDUCT.md` for details on the code of conduct, and the process for submitting pull requests.

 ---  
This repo is owned/maintained by <a href="https://github.com/codehackerone">@codehackerone</a>.
