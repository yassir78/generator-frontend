import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";

import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "primeng/fullcalendar";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";

import { AppComponent } from "./app.component";
import { AppCodeModule } from "./app.code.component";
import { AppMainComponent } from "./app.main.component";
import { AppConfigComponent } from "./app.config.component";
import { AppCrudComponent } from "./pages/app.crud.component";
import { AppCalendarComponent } from "./pages/app.calendar.component";
import { AppTimelineDemoComponent } from "./pages/app.timelinedemo.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppRightMenuComponent } from "./app.right-menu.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { FloatLabelDemoComponent } from "./demo/view/floatlabeldemo.component";
import { InvalidStateDemoComponent } from "./demo/view/invalidstatedemo.component";
import { InputDemoComponent } from "./demo/view/inputdemo.component";
import { ButtonDemoComponent } from "./demo/view/buttondemo.component";
import { EmptyDemoComponent } from "./demo/view/emptydemo.component";
import { ChartsDemoComponent } from "./demo/view/chartsdemo.component";
import { FileDemoComponent } from "./demo/view/filedemo.component";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { DocumentationComponent } from "./demo/view/documentation.component";
import { CountryService } from "./demo/service/countryservice";
import { EventService } from "./demo/service/eventservice";
import { NodeService } from "./demo/service/nodeservice";
import { MenuService } from "./app.menu.service";
import { CustomerService } from "./demo/service/customerservice";
import { PhotoService } from "./demo/service/photoservice";
import { ProductService } from "./demo/service/productservice";
import { IconService } from "./demo/service/iconservice";
import { CommandeCreateComponent } from "./view/admin/commandes/commande-create/commande-create.component";
import { CommandesComponent } from "./view/admin/commandes/commandes.component";
import { CommandeListComponent } from "./view/admin/commandes/commande-list/commande-list.component";
import { CommandeEditComponent } from "./view/admin/commandes/commande-edit/commande-edit.component";
import { CommandeViewComponent } from "./view/admin/commandes/commande-view/commande-view.component";
import { ConfirmationService, MessageService, SharedModule } from "primeng/api";
import { PojoListComponent } from "./view/admin/pojos/pojo-list/pojo-list.component";
import { PojoImportComponent } from "./view/admin/pojos/pojo-import/pojo-import.component";
import { PojoGenerateComponent } from "./view/admin/pojos/pojo-generate/pojo-generate.component";
import { CodeEditorModule } from "@ngstack/code-editor";
import { PaiementListComponent } from "./view/paiements/paiement-list/paiement-list.component";
import { PaiementViewComponent } from "./view/paiements/paiement-view/paiement-view.component";
import { PaiementEditComponent } from "./view/paiements/paiement-edit/paiement-edit.component";
import { FileLoadComponent } from './view/admin/pojos/pojo-import/file-load/file-load.component';
import { PojoAddComponent } from './view/admin/pojos/pojo-add/pojo-add.component';
import { PojoEditComponent } from './view/admin/pojos/pojo-edit/pojo-edit.component';
import { PojoAddFieldComponent } from './view/admin/pojos/pojo-add-field/pojo-add-field.component';
import { FieldEditComponent } from './view/admin/pojos/field-edit/field-edit.component';
import { RoleListComponent } from './view/admin/roles/role-list/role-list.component';
import { RoleMenuComponent } from './view/admin/roles/role-menu/role-menu.component';
import { RoleMenuViewComponent } from './view/admin/roles/role-menu-view/role-menu-view.component';
import { RoleAffectationComponent } from './view/admin/roles/role-affectation/role-affectation.component';
import { RoleAddComponent } from './view/admin/roles/role-add/role-add.component';
import { RoleEditComponent } from './view/admin/roles/role-edit/role-edit.component';
@NgModule({
  imports: [
    BrowserModule,
    InputSwitchModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    AppCodeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CodeEditorModule.forRoot(),
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TimelineModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    DynamicDialogModule,
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppConfigComponent,
    AppRightMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    DashboardDemoComponent,
    FloatLabelDemoComponent,
    InvalidStateDemoComponent,
    InputDemoComponent,
    ButtonDemoComponent,
    ChartsDemoComponent,
    EmptyDemoComponent,
    FileDemoComponent,
    DocumentationComponent,
    AppCalendarComponent,
    AppTimelineDemoComponent,
    AppNotfoundComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
    AppLoginComponent,
    CommandeCreateComponent,
    CommandesComponent,
    CommandeListComponent,
    CommandeEditComponent,
    CommandeViewComponent,
    PojoListComponent,
    PojoImportComponent,
    PojoGenerateComponent,
    PaiementListComponent,
    PaiementViewComponent,
    PaiementEditComponent,
    FileLoadComponent,
    PojoAddComponent,
    PojoEditComponent,
    PojoAddFieldComponent,
    FieldEditComponent,
    RoleListComponent,
    RoleMenuComponent,
    RoleMenuViewComponent,
    RoleAffectationComponent,
    RoleAddComponent,
    RoleEditComponent,
  ],
  entryComponents:[
    FileLoadComponent,
  ],
  providers: [
    /*    { provide: LocationStrategy, useClass: HashLocationStrategy }, */
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
    MenuService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
