import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import pages
import { HomePage } from '../pages/home/home'; 
import { LoginPage } from '../pages/login/login';
import { UserProfilePage } from '../pages/user-profile/profile';
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
import { ChatsPage } from '../pages/chats/chats';
import { TabsPage } from '../pages/tabs/tabs';
import { MomentModule } from "angular2-moment";
import { LoginComponent } from "../pages/auth/login";
import { VerificationComponent } from "../pages/verification/verification";
import { ProfileComponent } from "../pages/profile/profile";
import { ChatsOptionsComponent } from "../pages/chat-options/chat-options";
import { NewChatComponent } from "../pages/new-chat/new-chat";
import { MessagesOptionsComponent } from "../pages/messages-options/messages-options";
import { ChatRoot } from "../pages/chat-root/chat-root";

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
    UserProfilePage,
    ResetPasswordPage,
    SignupPage,
    AboutUsPage,
    SchoolsPage,
    PartnersPage,
    MessagesPage,
    TabsPage,
    ChatsPage,
    LoginComponent,
    VerificationComponent,
    ProfileComponent,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    ChatRoot
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
    UserProfilePage,
    ResetPasswordPage,
    SignupPage,
    AboutUsPage,
    SchoolsPage,
    PartnersPage,
    MessagesPage,
    ChatsPage,
    TabsPage,
    MessagesPage,
    LoginComponent,
    VerificationComponent,
    ProfileComponent,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    ChatRoot
  ],
  providers: [
    [{provide: ErrorHandler, useClass: IonicErrorHandler}],
    AuthData,
    ProfileData
  ]
})
export class AppModule {}

