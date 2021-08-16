import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";

import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";
import { PojoListComponent } from "./view/admin/pojos/pojo-list/pojo-list.component";
import { PojoImportComponent } from "./view/admin/pojos/pojo-import/pojo-import.component";
import { PojoGenerateComponent } from "./view/admin/pojos/pojo-generate/pojo-generate.component";
import { RoleListComponent } from "./view/admin/roles/role-list/role-list.component";
import { CreateProjectComponent } from "./demo/view/create-project/create-project.component";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: "",
          component: AppMainComponent,
          children: [
            { path: "", component: DashboardDemoComponent },
            { path: "view/pojo/load", component: PojoImportComponent },
            { path: "view/pojo/show", component: PojoListComponent },
            { path: "view/pojo/generate", component: PojoGenerateComponent },
            { path: "dashboard", component: DashboardDemoComponent },
            { path: "create", component: CreateProjectComponent },
            { path: "view/role/show", component: RoleListComponent },
            /*  {path: 'view/commande', component: CommandesComponent},
                      {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                      {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                      {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                      {path: 'uikit/input', component: InputDemoComponent},
                      {path: 'uikit/button', component: ButtonDemoComponent},
                      {path: 'uikit/table', component: TableDemoComponent},
                      {path: 'uikit/list', component: ListDemoComponent},
                      {path: 'uikit/tree', component: TreeDemoComponent},
                      {path: 'uikit/panel', component: PanelsDemoComponent},
                      {path: 'uikit/overlay', component: OverlaysDemoComponent},
                      {path: 'uikit/media', component: MediaDemoComponent},
                      {path: 'uikit/menu', component: MenusDemoComponent},
                      {path: 'uikit/message', component: MessagesDemoComponent},
                      {path: 'uikit/misc', component: MiscDemoComponent},
                      {path: 'uikit/charts', component: ChartsDemoComponent},
                      {path: 'uikit/file', component: FileDemoComponent},
                      {path: 'utilities/display', component: DisplayComponent},
                      {path: 'utilities/elevation', component: ElevationComponent},
                      {path: 'utilities/flexbox', component: FlexboxComponent},
                      {path: 'utilities/grid', component: GridComponent},
                      {path: 'utilities/icons', component: IconsComponent},
                      {path: 'utilities/widgets', component: WidgetsComponent},
                      {path: 'utilities/spacing', component: SpacingComponent},
                      {path: 'utilities/typography', component: TypographyComponent},
                      {path: 'utilities/text', component: TextComponent},
                      {path: 'pages/crud', component: AppCrudComponent},
                      {path: 'pages/calendar', component: AppCalendarComponent},
                      {path: 'pages/timeline', component: AppTimelineDemoComponent},
                      {path: 'pages/empty', component: EmptyDemoComponent},
                      {path: 'documentation', component: DocumentationComponent} */
          ],
        },
        { path: "error", component: AppErrorComponent },
        { path: "accessdenied", component: AppAccessdeniedComponent },
        { path: "404", component: AppNotfoundComponent },
        { path: "login", component: AppLoginComponent },
        { path: "**", redirectTo: "/404" },
      ],
      { scrollPositionRestoration: "enabled" }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
