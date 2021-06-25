<div align="center">
  <img alt="Sobyte Logo" src="https://github.com/sobhanbera/sobyte/blob/master/.github_src/logo_name.png" width="400px" />

**Listen And Download Any Music Anytime, Anywhere. Let's Feel The Music.**

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">App Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#environment-setup">Dev Environment Setup</a></li>
      </ul>
    </li>
  </ol>
</details>

## App Features:

-   Free Music to listen
-   Free download any music!!!
-   Extremely easy to use
-   Minimilastic and Attractive UI
-   Theme System (Dark Theme, Light Theme, Custom Theme)
-   Different languages support (i18n)
-   Offline Capability
-   Many things are Customizable

## Get Started:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm

```sh
npm install yarn@latest -g
```

or

```sh
npm install npm@latest -g
```

### Environment Setup

1. Fork this repository
2. Clone the repository.

```sh
git clone https://github.com/[YOUR_GITHUB_USERNAME_HERE]/sobyte.git
```

3. Run this command at the root of project directory.

```sh
yarn install
```

4. To see the live demo of the app, follow this steps:

-   First run this command

```
yarn global add react-native
```

-   Now For physical device
    -   Connect you device with computer using USB and enable USB Debugging in Developer Options
    -   Then run this command
    ```
    react-native run-android
    ```
    -   That's it wait for sometime to build the app and it will run automatically with live reload.
-   And For emulator
    -   Run an emulator then run the same above command
    ```
    react-native run-android
    ```

## File Structure (Tree)

.
├── api
│ ├── index.js
│ ├── parsers.js
│ └── utils.js
├── assets
│ ├── animations
│ │ ├── 2nd.gif
│ │ └── logo_loading.gif
│ ├── fonts
│ │ ├── Elika Gorica.ttf
│ │ ├── Helvetica.ttf
│ │ ├── LucidaGrande.ttf
│ │ ├── Roboto-Bold.ttf
│ │ ├── Roboto-Regular.ttf
│ │ ├── Tahoma Regular font.ttf
│ │ ├── Ubuntu Bold.ttf
│ │ ├── Ubuntu Light.ttf
│ │ ├── Ubuntu.ttf
│ │ └── verdana.ttf
│ └── images
│ ├── logo_name.png
│ └── phone_screen.png
├── components
│ ├── AnimatedGradient
│ │ └── index.js
│ ├── AuthButton
│ │ └── index.tsx
│ ├── FullScreenLoading
│ │ └── index.tsx
│ ├── GlobalLoading
│ │ └── index.tsx
│ ├── Header
│ │ └── index.tsx
│ ├── HeartBeatView
│ │ └── index.tsx
│ ├── HighPaddingView
│ │ └── index.tsx
│ ├── index.ts
│ ├── Scaler
│ │ └── index.tsx
│ ├── ScalerAuthButton
│ │ └── index.tsx
│ ├── SobyteAlert
│ │ └── index.tsx
│ ├── SobyteTextInput
│ │ └── index.tsx
│ └── T_C_PrivacyPolicy
│ └── index.tsx
├── constants
│ ├── fakemails.ts
│ └── index.js
├── context
│ └── index.ts
├── controller
│ ├── AppInside.tsx
│ ├── AppStartingPoint.tsx
│ └── Authentication.tsx
├── i18n
│ ├── en.json
│ ├── hi.json
│ └── index.js
├── interfaces
│ └── index.ts
├── MainApp.tsx
├── rules
│ └── index.ts
├── screens
│ ├── authentication
│ │ ├── ForgotPassword.tsx
│ │ ├── Help.tsx
│ │ ├── Intro.tsx
│ │ ├── Login.tsx
│ │ └── Register.tsx
│ └── Home.tsx
├── store
│ ├── actions
│ └── reducers
├── styles
│ └── global.styles.ts
├── themes
│ ├── DarkTheme.ts
│ ├── ThemeProps.ts
│ ├── ThemeProvider.tsx
│ └── Themes.ts
└── utils
├── Colors.ts
├── index.ts
└── Objects.ts

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

</br>
<p align='center'>
  <a href="https://www.linkedin.com/in/sobhanbera">
    <img style="border-radius:25px" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="https://www.instagram.com/sobhanbera_">
    <img  style="border-radius:25px"src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" />        
  </a>&nbsp;&nbsp;
</p>

<p align='center'>
  <a href="https://www.facebook.com/sobhanberaos">
    <img style="border-radius:25px" src="https://img.shields.io/badge/sobhanbera-%233b5998.svg?&style=for-the-badge&logo=facebook&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="https://twitter.com/BeraSobhan">
    <img style="border-radius:25px" src="https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white" />        
  </a>&nbsp;&nbsp;
  <a href="mailto:sobhanbera258@gmail.com">
    <img style="border-radius:25px" src="https://img.shields.io/badge/-sobhanbera258-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:sobhanbera258@gmail.com" />
  </a>&nbsp;&nbsp;
</p>
