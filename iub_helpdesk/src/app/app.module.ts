import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
// import { SampleModule } from 'app/main/sample/sample.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes } from './routes';
import { MatSnackBarModule } from '@angular/material';
import { AuthInterceptor } from '@packages/services/auth/auth.interceptor';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@packages/services/fake-db.service';
import { GoogleChartsModule } from 'angular-google-charts';
const appRoutes: Routes = routes;


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        GoogleChartsModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        //for fake database
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 300,
            passThruUnknownUrl: true
        }),
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        // SampleModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
