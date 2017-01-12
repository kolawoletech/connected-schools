import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import pages
import { HomePage } from '../pages/home/home'; 
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { MessagesPage} from '../pages/messages/messages';
import { AnnouncementsPage } from '../pages/announcements/announcements';
import { NewsPage } from '../pages/news/news';
import { PartnersPage } from '../pages/partners/partners';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';
import { SchoolsPage } from '../pages/schools/schools';
import { TabsPage } from '../pages/tabs/tabs';


// Import providers
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuTabsPage,
    AnnouncementsPage,
    NewsPage,
    ContactUsPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    AboutUsPage,
    SchoolsPage,
    PartnersPage,
    MessagesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuTabsPage,
    AnnouncementsPage,
    NewsPage,
    ContactUsPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    AboutUsPage,
    SchoolsPage,
    PartnersPage,
    TabsPage,
    MessagesPage,
  ],
  providers: [
    [{provide: ErrorHandler, useClass: IonicErrorHandler}],
    AuthData,
    ProfileData
  ]
})
export class AppModule {}

