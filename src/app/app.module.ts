import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';


// Import pages
import { HomePage } from '../pages/home/home'; 
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { ChatsPage} from '../pages/chats/chats';
import { AnnouncementsPage } from '../pages/announcements/announcements';
import { NewsPage } from '../pages/news/news';
import { PartnersPage } from '../pages/partners/partners';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';
import { SchoolsPage } from '../pages/schools/schools';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { ChatsTabsPage } from '../pages/chats-tabs/chats-tabs';
import { UsersPage } from '../pages/users/users';
import { ChatViewPage } from '../pages/chat-view/chat-view';
import { PostDetail } from '../pages/post-detail/post-detail';
import { PostPage } from '../pages/post/post';
import { PostsPage } from '../pages/posts/posts';
import { WpPage } from '../pages/wp-page/wp-page';
import { WpPageList } from '../pages/wp-page-list/wp-page-list';

// Import components
import { PostCmp } from '../components/post/post';

// Import providers
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import {ChatsProvider} from '../providers/chats-provider'; 
import {UserProvider} from '../providers/user-provider'; 
import {UtilProvider} from '../providers/utils'; 
import {AuthProvider} from '../providers/auth-provider'; 
import {WpProvider} from '../providers/wp-provider'; 



// Import pipes
import { HtmlPipe } from '../pipes/html-pipe';

export const firebaseConfig = {  
    apiKey: "AIzaSyDjZNVUpzqUoVqa8nhYab50xB35KBaw0LA",
    authDomain: "connected-schools.firebaseapp.com",
    databaseURL: "https://connected-schools.firebaseio.com",
    storageBucket: "connected-schools.appspot.com",
    messagingSenderId: "224090873526"  
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

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
    ChatsPage,
    TabsPage,
    AccountPage,
    ChatsTabsPage,
    UsersPage,
    ChatViewPage,
    PostDetail,
    HtmlPipe,
    PostPage,
    PostsPage,
    WpPageList,
    WpPage,
    PostCmp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
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
    ChatsPage,
    AccountPage,
    ChatsTabsPage,
    UsersPage,
    ChatViewPage,
    PostDetail,
    PostPage,
    PostsPage,
    WpPageList,
    WpPage
    
  ],
  providers: [
    [{provide: ErrorHandler, useClass: IonicErrorHandler}],
    AuthData,
    ProfileData,
    ChatsProvider,
    UserProvider,
    UtilProvider,
    AuthProvider,
    WpProvider,
     Storage
  ]
})
export class AppModule {}

