export enum ePage {
    Home = 'Home',
    AboutMe = 'AboutMe',
    Contact = 'Contact',
}

export class PageLibrary {
    public static pageSettingsList = {
        [ePage.Home]: {
            key: ePage.Home,
            url: '/home',
            backgroundUrl: 'assets/images/temp/background-1.jpg',
        },
        [ePage.AboutMe]: {
            key: ePage.AboutMe,
            url: '/aboutMe',
            backgroundUrl: 'assets/images/temp/background-2.jpg',
        },
        [ePage.Contact]: {
            key: ePage.Contact,
            url: '/contact',
            backgroundUrl: 'assets/images/temp/background-3.jpg',
        },
    };
}
