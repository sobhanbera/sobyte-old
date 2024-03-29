<div align="center">
  <img alt="Sobyte Logo" src="https://github.com/sobhanbera/sobyte/blob/master/.github_src/logo_name.png" width="400px" />

**Listen And Download Any Music Anytime, Anywhere. Let's Feel The Music.**

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#app-features">App Features</a>
    </li>
    <li>
      <a href="#get-started">Get Started</a>
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

## TODO:

-   Work on App's performance issue.
-   Many parts of the app is laging due to state update and re-renderings. This need to be fixed.

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

1. This step is crucial and important too.

    1. There is only one patch for now :-

    - `Ctrl+Press` on the `TriggeringView` Component imported from `react-native-image-header-scroll-view` package in any file (just search for it)

    - And change the follwing code `componentWillMount` to `UNSAFE_componentWillMount` and `componentWillReceiveProps` to `UNSAFE_componentWillReceiveProps`.

    - In short :-

        ```diff
             ...

        -    componentWillMount() {}
        +    UNSAFE_componentWillMount() {}

        -    componentWillReceiveProps() {}
        +    UNSAFE_componentWillReceiveProps() {}
             ...
             ...
        ```

2. This is also a IMP setup for the music fetcher to work.

    1. Change the following lines in `react-native-ytdl` package `info.js` file :-
        ```diff
        const ytdl = (link, options) => {
            return ytdl.getInfo(link, options).then(info => {
        +       return info
        -       return getURLsFromInfoCallback(info, options);
            });
        };
        ```

3. Step for vim/nvim users.

    1. Install ctags for the system.
    2. Run following command to generate tags file.

    - For full tags

    ```
    ctags -R .
    ```

    - For compressed size tags file.

    ```
    ctags -R --exclude=.git --exclude=.github --exclude=.github_src --exclude=.vim --exclude=.vscode --exclude=android --exclude=ios --exclude=node_modules --exclude=others .
    ```

    - For extended tags file.

    ```
    ctags -R --exclude=.git --exclude=android --exclude=.buckconfig --exclude=CODE_OF_CONDUCT.md --exclude=CONTRIBUTING.mddev_build.keystore --exclude=dev_build.keystore --exclude= --exclude= --exclude= --exclude= --exclude=.editorconfig --exclude=.env --exclude=.eslintignore --exclude=.git --exclude=.gitattributes --exclude=.github --exclude=.github_src --exclude=.gitignore --exclude=.gitmodules --exclude=init.vim --exclude=ios --exclude=.md --exclude=node_modules --exclude=.node-version --exclude=.npmrc --exclude=others --exclude=package.json --exclude=package-lock.json --exclude=.prettierignore --exclude=README.md --exclude=sobyte.session.sql --exclude=tags --exclude=tags_previous --exclude=tags_src --exclude=test.rest --exclude=.vim --exclude=.vimrc --exclude=.vscode --exclude=.watchmanconfig --exclude=yarn.lock .
    ```

## File Structure (Tree)

<details>
  <summary>Main Project Directory</summary>

```.text

app
├── MainApp.tsx
├── api
│   ├── MusicFetcher.tsx
│   ├── PlayerControls.tsx
│   ├── index.js
│   ├── parsers.js
│   ├── playerServices.js
│   └── utils.js
├── assets
│   ├── animations
│   │   └── logo_loading.gif
│   ├── fonts
│   │   ├── Elika Gorica.ttf
│   │   ├── Helvetica.ttf
│   │   ├── LucidaGrande.ttf
│   │   ├── Roboto-Bold.ttf
│   │   ├── Roboto-Regular.ttf
│   │   ├── Tahoma Regular font.ttf
│   │   ├── Ubuntu Bold.ttf
│   │   ├── Ubuntu Light.ttf
│   │   ├── Ubuntu.ttf
│   │   └── verdana.ttf
│   └── images
│       ├── icons
│       │   └── setting.png
│       ├── logo_name.png
│       ├── phone_screen.png
│       └── sobyte_logo_white.png
├── components
│   ├── AnimatedGradient
│   │   └── index.js
│   ├── Area
│   │   └── index.tsx
│   ├── AuthButton
│   │   └── index.tsx
│   ├── BottomSheet
│   │   └── index.tsx
│   ├── DoubleTap
│   │   └── index.tsx
│   ├── FullScreenLoading
│   │   └── index.tsx
│   ├── GlobalLoading
│   │   └── index.tsx
│   ├── GradientBackground
│   │   └── index.tsx
│   ├── Header
│   │   └── index.tsx
│   ├── HeaderCollapsible
│   │   └── index.tsx
│   ├── HeaderMain
│   │   └── index.tsx
│   ├── HeaderProfile
│   │   └── index.tsx
│   ├── HeaderSearch
│   │   └── index.tsx
│   ├── HeartBeatView
│   │   └── index.tsx
│   ├── HighPaddingView
│   │   └── index.tsx
│   ├── MusicPlayer
│   │   └── ProgressSlider.tsx
│   ├── Prompt
│   │   └── index.tsx
│   ├── Scaler
│   │   └── index.tsx
│   ├── ScalerAuthButton
│   │   └── index.tsx
│   ├── SobyteAlert
│   │   └── index.tsx
│   ├── SobyteTextInput
│   │   └── index.tsx
│   ├── T_C_PrivacyPolicy
│   │   └── index.tsx
│   └── index.ts
├── constants
│   ├── fakemails.ts
│   └── index.js
├── context
│   ├── Settings.tsx
│   └── index.ts
├── controller
│   ├── AppInside.tsx
│   ├── AppStartingPoint.tsx
│   ├── Authentication.tsx
│   ├── ExploreStack
│   │   └── index.tsx
│   └── ProfileStack
│       └── index.tsx
├── i18n
│   ├── en.json
│   ├── hi.json
│   └── index.js
├── interfaces
│   └── index.ts
├── rules
│   └── index.ts
├── screens
│   ├── Home.tsx
│   ├── authentication
│   │   ├── ForgotPassword.tsx
│   │   ├── Help.tsx
│   │   ├── Intro.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   └── main
│       ├── Explore
│       │   └── Explore.tsx
│       ├── MusicPlayer.tsx
│       └── Profile
│           ├── Profile.tsx
│           └── Setting.tsx
├── styles
│   └── global.styles.ts
├── themes
│   ├── DarkTheme.ts
│   ├── ThemeProps.ts
│   ├── ThemeProvider.tsx
│   └── Themes.ts
└── utils
    ├── Colors.ts
    ├── Objects.ts
    ├── index.ts
    └── storage.ts

```

</details>

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

sobhanbera (https://github.com/sobhanbera)

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

<div align="center">
  <img alt="Sobyte Logo" src="https://github.com/sobhanbera/sobyte/blob/master/.github_src/logo_name.png" width="400px" />
</div>

<!-- test commit push since i am getting error while pulling the branch in windows due to internet problems -->
