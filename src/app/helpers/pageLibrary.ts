export enum ePage {
    Home = 'Home',
    AboutMe = 'AboutMe',
    Contact = 'Contact'
}

export class PageLibrary {
    public static pageSettingsList = {
        [ePage.Home]: {
            key: ePage.Home,
            url: '/',
            backgroundUrl: 'assets/images/temp/background-1.jpg'
        },
        [ePage.AboutMe]: {
            key: ePage.AboutMe,
            url: '/o-mnie',
            backgroundUrl: 'assets/images/temp/background-2.jpg'
        },
        [ePage.Contact]: {
            key: ePage.Contact,
            url: '/kontakt',
            backgroundUrl: 'assets/images/temp/background-3.jpg'
        }
    };
}
