import { LogInfoForReportsComponent } from './log-info-for-reports/log-info-for-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { StationLevelDataComponent } from './station-level-data/station-level-data.component';
import { FrontPageComponent } from './main_page/front-page/front-page.component';
import { AuthGuard } from './auth-guard';
// import { WeeklyDepartureMapComponent } from './main_page/weekly-departure-map/weekly-departure-map.component';
import { UnderprogressComponent } from './underprogress/underprogress.component';
import { QpfverificationReports2020Component } from './qpfverification_reports/qpfverification-reports2020/qpfverification-reports2020.component';
import { QpfverificationReports2021Component } from './qpfverification_reports/qpfverification-reports2021/qpfverification-reports2021.component';
import { QpfverificationReports2022Component } from './qpfverification_reports/qpfverification-reports2022/qpfverification-reports2022.component';

import { UploadFileComponent } from './upload-file/upload-file.component';

import { VerificationPageMcComponent } from './verification-page-mc/verification-page-mc.component';
import { DeletedStationLogComponent } from './deleted-station-log/deleted-station-log.component';
import { StationStatisticsComponent } from './station-statistics/station-statistics.component';
import { EmailDisseminationComponent } from './email-dissemination/email-dissemination.component';
import { RealtimeStationDataComponent } from './realtime-station-data/realtime-station-data.component';
import { LogInfoContainerComponent } from './log-info-container/log-info-container.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { AutoEmailSetupComponent } from './auto-email-setup/auto-email-setup.component';
import { DefinedEmailGroupComponent } from './defined-email-group/defined-email-group.component';
import { EmailLogComponent } from './email-log/email-log.component';
import { StatewiseDistRainfallComponent } from './statewise-dist-rainfall/statewise-dist-rainfall.component';
import { VerificationPageHQComponent } from './verification-page-hq/verification-page-hq.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllMapsComponent } from '../app/main/all-maps/all-maps.component';
import { DataEntryComponent } from './main/data-entry/data-entry.component';
import { VerificationComponent } from './main/verification/verification.component';
import { YearlyStationStatisticsPageComponent } from './main/yearly-station-statistics-page/yearly-station-statistics-page.component';
import { RainfallDataCmPageComponent } from './main/rainfall-data-cm-page/rainfall-data-cm-page.component';
import { StationStatisticsPageComponent } from './main/station-statistics-page/station-statistics-page.component';
import { EmailDisseminationPageComponent } from './main/email-dissemination-page/email-dissemination-page.component';
import { SendEmailPageComponent } from './main/send-email-page/send-email-page.component';
import { AutoEmailSetupPageComponent } from './main/auto-email-setup-page/auto-email-setup-page.component';
import { DefinedEmailGroupPageComponent } from './main/defined-email-group-page/defined-email-group-page.component';
import { EmailLogPageComponent } from './main/email-log-page/email-log-page.component';
import { AllMapsDupComponent } from './main/all-maps-dup/all-maps-dup.component';
import { RainfallStatisticsComponent } from './main/rainfall-statistics/rainfall-statistics.component';
import { StateRainfallMapDailyComponent } from './main/rainfallMapsNav/dailyMaps/state-rainfall-map-daily/state-rainfall-map-daily.component';
import { RainfallStatisticsWeeklyComponent } from './main/rainfall-statistics-weekly/rainfall-statistics-weekly.component';
import { SubdivisionRainfallMapDailyComponent } from './main/rainfallMapsNav/dailyMaps/subdivision-rainfall-map-daily/subdivision-rainfall-map-daily.component';

import { StateRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/state-rainfall-map-weekly/state-rainfall-map-weekly.component';
import { SubdivisionRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/subdivision-rainfall-map-weekly/subdivision-rainfall-map-weekly.component';

import { CountryRainfallMapDailyComponent } from './main/rainfallMapsNav/dailyMaps/country-rainfall-map-daily/country-rainfall-map-daily.component';
import { HomogenousRainfallMapDailyComponent } from './main/rainfallMapsNav/dailyMaps/homogenous-rainfall-map-daily/homogenous-rainfall-map-daily.component';

import { EastNorthEastRegionComponent } from './main/rainfallMapsNav/dailyMaps/district-maps/east-north-east-region/east-north-east-region.component';
import { NorthWestRegionComponent } from './main/rainfallMapsNav/dailyMaps/district-maps/north-west-region/north-west-region.component';
import { SouthPeninsularaRegionComponent } from './main/rainfallMapsNav/dailyMaps/district-maps/south-peninsulara-region/south-peninsulara-region.component';
import { CentralRegionComponent } from './main/rainfallMapsNav/dailyMaps/district-maps/central-region/central-region.component';
import { McRmcMapComponentForMCsComponent } from './main/mc-rmc-map-component-for-mcs/mc-rmc-map-component-for-mcs.component';
import { McRmcMapComponentForMCsDupComponent } from './main/mc-rmc-map-component-for-mcs-dup/mc-rmc-map-component-for-mcs-dup.component';
import { HomogenousRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/homogenous-rainfall-map-weekly/homogenous-rainfall-map-weekly.component';
import { CountryRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/country-rainfall-map-weekly/country-rainfall-map-weekly.component';
import { DistrictPanRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/district-weekly-maps/district-pan-rainfall-map-weekly/district-pan-rainfall-map-weekly.component';
import { DistrictEastAndNorthEastRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/district-weekly-maps/district-east-and-north-east-rainfall-map-weekly/district-east-and-north-east-rainfall-map-weekly.component';
import { DistrictNorthWestRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/district-weekly-maps/district-north-west-rainfall-map-weekly/district-north-west-rainfall-map-weekly.component';
import { DistrictCentralIndiaRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/district-weekly-maps/district-central-india-rainfall-map-weekly/district-central-india-rainfall-map-weekly.component';
import { DistrictSoutPensinsulaRainfallMapWeeklyComponent } from './main/rainfallMapsNav/weeklyMaps/district-weekly-maps/district-sout-pensinsula-rainfall-map-weekly/district-sout-pensinsula-rainfall-map-weekly.component';
import { PanIndiaRegionComponent } from './main/rainfallMapsNav/dailyMaps/district-maps/pan-india-region/pan-india-region.component';
import { StateRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/state-rainfall-map-cummulative/state-rainfall-map-cummulative.component';
import { SubdivisionRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/subdivision-rainfall-map-cummulative/subdivision-rainfall-map-cummulative.component';
import { RegionRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/region-rainfall-map-cummulative/region-rainfall-map-cummulative.component';
import { CountryRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/country-rainfall-map-cummulative/country-rainfall-map-cummulative.component';
import { DistrictPanIndiaRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/districtMaps/district-pan-india-rainfall-map-cummulative/district-pan-india-rainfall-map-cummulative.component';
import { DistrictNorthWestRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/districtMaps/district-north-west-rainfall-map-cummulative/district-north-west-rainfall-map-cummulative.component';
import { DistrictEastAndNorthEastRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/districtMaps/district-east-and-north-east-rainfall-map-cummulative/district-east-and-north-east-rainfall-map-cummulative.component';
import { DistrictSouthPeninsularRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/districtMaps/district-south-peninsular-rainfall-map-cummulative/district-south-peninsular-rainfall-map-cummulative.component';
import { DistrictCentralIndiaRainfallMapCummulativeComponent } from './main/rainfallMapsNav/cummulativeMaps/districtMaps/district-central-india-rainfall-map-cummulative/district-central-india-rainfall-map-cummulative.component';
import { AllStatesMapComponent } from './main/all-states-map/all-states-map.component';
import { RainfallDeparturesSectionComponent } from './main/rainfall-departures-section/rainfall-departures-section.component';
import { NormalRainfallComponent } from './main/Normal-Rainfall-Map/normal-rainfall/normal-rainfall.component';
import { RainfallCountrySeasonalGraphComponent } from './main/rainfall-graphs/rainfall-country-seasonal-graph/rainfall-country-seasonal-graph.component';
import { AboutSectionComponent } from './main/About/about-section/about-section.component';
import { LastYearsDistrictDataComponent } from './main/last-years-district-data/last-years-district-data.component';
import { RealTimeUpdatedRainfallMapComponent } from './main/real-time-updated-rainfall-map/real-time-updated-rainfall-map.component';
import { DistributionDistrictStatesDailyComponent } from './main/distribution-district-states-daily/distribution-district-states-daily.component';
import { RainfallmapMcRmcComponent } from './main/RainfallMaps-Mc-RMC/rainfallmap-mc-rmc/rainfallmap-mc-rmc.component';
import { RainfallmapSubdivMcRmcComponent } from './main/RainfallMaps-Mc-RMC/rainfallmap-subdiv-mc-rmc/rainfallmap-subdiv-mc-rmc.component'; 
import { RainfallmapRegionMcRmcComponent } from './main/RainfallMaps-Mc-RMC/rainfallmap-region-mc-rmc/rainfallmap-region-mc-rmc.component';
import { StateRainfallMapDailyActualComponent } from './main/rainfall-actual-maps/daily/state-rainfall-map-daily-actual/state-rainfall-map-daily-actual.component';
import { SubdivisionRainfallMapDailyActualComponent } from './main/rainfall-actual-maps/daily/subdivision-rainfall-map-daily-actual/subdivision-rainfall-map-daily-actual.component';
import { HomogenousRainfallMapDailyActualComponent } from './main/rainfall-actual-maps/daily/homogenous-rainfall-map-daily-actual/homogenous-rainfall-map-daily-actual.component';
import { CountryRainfallMapDailyActualComponent } from './main/rainfall-actual-maps/daily/country-rainfall-map-daily-actual/country-rainfall-map-daily-actual.component';
import { CentralIndiaRegionActualComponent } from './main/rainfall-actual-maps/daily/district-maps/central-india-region-actual/central-india-region-actual.component';
import { EastNorthEastRegionActualComponent } from './main/rainfall-actual-maps/daily/district-maps/east-north-east-region-actual/east-north-east-region-actual.component';
import { NorthWestRegionActualComponent } from './main/rainfall-actual-maps/daily/district-maps/north-west-region-actual/north-west-region-actual.component';
import { PanIndiaRegionActualComponent } from './main/rainfall-actual-maps/daily/district-maps/pan-india-region-actual/pan-india-region-actual.component';
import { SouthPeninsularaRegionActualComponent } from './main/rainfall-actual-maps/daily/district-maps/south-peninsulara-region-actual/south-peninsulara-region-actual.component';
import { AllStatesActualMapsComponent } from './main/rainfall-actual-maps/all-states-actual-maps/all-states-actual-maps.component';
import { RealTimeUpdatedRainfallActualMapsComponent } from './main/rainfall-actual-maps/real-time-updated-rainfall-actual-maps/real-time-updated-rainfall-actual-maps.component';
import { LogInfoDataActionsComponent } from './main/log-info-data-actions/log-info-data-actions.component';
import { LogInfoAdminActivityComponent } from './main/log-info-admin-activity/log-info-admin-activity.component';
import { GangaRiverBasinComponent } from './main/Basins/ganga-river-basin/ganga-river-basin.component';
import { DistrictDailySpatialComponent } from './main/spatial-maps/district-daily-spatial/district-daily-spatial.component';
import { ActualBlockRainfallMapComponent } from './main/rainfall-actual-maps/Actual/actual-block-rainfall-map/actual-block-rainfall-map.component';
import { WeeklyDistrictSpatialComponent } from './main/spatial-maps/weekly-district-spatial/weekly-district-spatial.component';
import { CummulativeDistrictSpatialComponent } from './main/spatial-maps/cummulative-district-spatial/cummulative-district-spatial.component';
import { BlockRainfallMapDailyComponent } from './main/rainfallMapsNav/dailyMaps/block-rainfall-map-daily/block-rainfall-map-daily.component';
import { BlockActualRainfallMapIncAwsComponent } from './main/rainfall-actual-maps/Actual/block-actual-rainfall-map-inc-aws/block-actual-rainfall-map-inc-aws.component';
import { BlockRainfallMainPageComponent } from './main/block-rainfall-main-page/block-rainfall-main-page.component';
import { BlockrainfallMapDailyActualMainPageComponent } from './main/block-rainfall-main-page/block/blockrainfall-map-daily-actual-main-page/blockrainfall-map-daily-actual-main-page.component';
import { DashboardComponent } from './main/irains-dashboard/dashboard/dashboard.component';
import { SpatialTableComponent } from './spatial-table/spatial-table.component';
import { AdminPanelComponent } from './main/admin-panel/admin-panel.component';
import { StationManagementComponent } from './main/admin-panel/station-management/station-management/station-management.component';
import { MonsoonActivityComponent } from './main/monsoon-activity/monsoon-activity.component';
import { UserManualv2Component } from './user-manualv2/user-manualv2.component';
import { BlockActualRainfallMapDailyMainPagePubicComponent } from './main/block-rainfall-main-page/block/Guest/block-actual-rainfall-map-daily-main-page-pubic/block-actual-rainfall-map-daily-main-page-pubic.component';
import { CalculationExclusionComponent } from './main/admin-panel/calculationExclusion/calculation-exclusion/calculation-exclusion.component';
import { CalculationModeComponent } from './main/data-management/calculation-mode/calculation-mode.component';
import { ReviewAndPublishComponent } from './main/data-management/review-and-publish/review-and-publish.component';
import { BlockRainfallMapDailyMainPageComponent } from './main/block-rainfall-main-page/block/block-rainfall-map-daily-main-page/block-rainfall-map-daily-main-page.component';
import { DisplayOrderManagementComponent } from './main/display-order-management/display-order-management.component';
import { DataManagementComponent } from './main/data-management/data-management.component';
import { GeojsonUploadComponent } from './main/data-management/geojson-upload/geojson-upload.component';
import { GeojsonManagementComponent } from './main/data-management/geojson-management/geojson-management.component';
import { BlockManagementComponent } from './main/data-management/block-management/block-management.component';
import { DistrictManagementComponent } from './main/data-management/district-management/district-management.component';
import { StateManagementComponent } from './main/data-management/state-management/state-management.component';
import { SubdivisionManagementComponent } from './main/data-management/subdivision-management/subdivision-management.component';
import { RegionManagementComponent } from './main/data-management/region-management/region-management.component';
import { CountryManagementComponent } from './main/data-management/country-management/country-management.component';
import { DbInfoComponent } from './main/data-management/db-info/db-info.component';
import { SchedulerManagementComponent } from './main/data-management/scheduler-management/scheduler-management.component';
import { PermissionsComponent } from './main/permissions/permissions.component';
import { RbacComponent } from './main/permissions/rbac/rbac.component';
import { NewRegisterComponent } from './main/permissions/new-register/new-register.component';
import { RoleManagementComponent } from './main/permissions/role-management/role-management.component';
import { RouteManagementComponent } from './main/permissions/route-management/route-management.component';


export const routes: Routes = [
 { path: 'irains-dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-actual-state-map', component: StateRainfallMapDailyActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'district-daily-spatial', component: DistrictDailySpatialComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'weekly-daily-spatial', component: WeeklyDistrictSpatialComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'cummulative-daily-spatial', component: CummulativeDistrictSpatialComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-actual-subdivision-map', component: SubdivisionRainfallMapDailyActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'pan-india-region-actual', component: PanIndiaRegionActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-east-north-east-region-actual', component: EastNorthEastRegionActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-north-west-region-actual', component: NorthWestRegionActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-south-peninsula-region-actual', component: SouthPeninsularaRegionActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-central-region-actual', component: CentralIndiaRegionActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-actual-homogenous-map', component: HomogenousRainfallMapDailyActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'daily-actual-country-map', component: CountryRainfallMapDailyActualComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'allstates-actual-maps', component: AllStatesActualMapsComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
 { path: 'annual-seasonal-monthly-actual-maps', component: RealTimeUpdatedRainfallActualMapsComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'actual-block-rainfall-map', component: ActualBlockRainfallMapComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'actual-block-rainfall', component: ActualBlockRainfallMapComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'block-rainfall-map-daily', component: BlockRainfallMapDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'block-rainfall-awsorg-map-daily', component: BlockActualRainfallMapIncAwsComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'block-rainfall', component: BlockRainfallMainPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'block-rainfall-actual', component: BlockrainfallMapDailyActualMainPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'block-rainfall-aws-actual', component: BlockRainfallMapDailyMainPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'spatial-table', component: SpatialTableComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'monsoon-activity', component: MonsoonActivityComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'river-basin', component: GangaRiverBasinComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
 { path: 'calulate-exclusion', redirectTo: '/data-management/calculation-exclusion', pathMatch: 'full' },
 { path: 'display-order-management', redirectTo: '/data-management/display-order', pathMatch: 'full' },

 {
  path: 'data-management',
  component: DataManagementComponent,
  canActivate: [AuthGuard],
  data: { allowedUsers: ['hq'] },
  children: [
    { path: 'calculation-exclusion', component: CalculationExclusionComponent },
    { path: 'display-order',         component: DisplayOrderManagementComponent },
    { path: 'calculation-mode',      component: CalculationModeComponent },
    { path: 'review-and-publish',    component: ReviewAndPublishComponent },
    { path: 'station-management',    component: StationManagementComponent },
    { path: 'geojson-upload',        component: GeojsonUploadComponent },
    { path: 'geojson',               component: GeojsonManagementComponent },
    { path: 'block-management',      component: BlockManagementComponent },
    { path: 'district-management',   component: DistrictManagementComponent },
    { path: 'state-management',      component: StateManagementComponent },
    { path: 'subdivision-management',component: SubdivisionManagementComponent },
    { path: 'region-management',     component: RegionManagementComponent },
    { path: 'country-management',    component: CountryManagementComponent },
    { path: 'db-info',               component: DbInfoComponent },
    { path: 'scheduler-management',  component: SchedulerManagementComponent },
    { path: 'rbac',             component: RbacComponent },
    { path: 'new-register',     component: NewRegisterComponent },
    { path: 'role-management',  component: RoleManagementComponent },
    { path: 'route-management', component: RouteManagementComponent },
    { path: 'activity-log', component: LogInfoAdminActivityComponent, data: { embeddedInDataManagement: true } },
    { path: '', redirectTo: 'calculation-exclusion', pathMatch: 'full' }
  ]
 },

 {
  path: 'permissions',
  component: PermissionsComponent,
  canActivate: [AuthGuard],
  data: { allowedUsers: ['hq'] },
  children: [
    { path: 'rbac',             component: RbacComponent },
    { path: 'new-register',     component: NewRegisterComponent },
    { path: 'role-management',  component: RoleManagementComponent },
    { path: 'route-management', component: RouteManagementComponent },
    { path: '', redirectTo: 'rbac', pathMatch: 'full' }
  ]
 },

 {
  path: 'admin-panel',
  component: AdminPanelComponent,
  canActivate: [AuthGuard],
  data: { allowedUsers: ['hq'] },
  children: [
    {
      path: 'station-management',                     // ← matches the route above
      component: StationManagementComponent // ← your full page
    },
    { path: '', redirectTo: 'stations', pathMatch: 'full' }
  ]
},
//  BlockActualRainfallMapIncAwsComponent

 {path: 'state-map-mc-rmc', component: RainfallmapMcRmcComponent, canActivate: [AuthGuard], data: {allowedUsers: ['mc']}},
 {path: 'subdiv-map-mc-rmc', component: RainfallmapSubdivMcRmcComponent, canActivate: [AuthGuard], data: {allowedUsers: ['mc']}},
 {path: 'region-map-mc-rmc', component: RainfallmapRegionMcRmcComponent, canActivate: [AuthGuard], data: {allowedUsers: ['mc']}},

  { path: 'about', component: AboutSectionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'distribution-district-in-states-daily', component: DistributionDistrictStatesDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},

  { path: 'realTimeUpdatedRainfallMaps', component: RealTimeUpdatedRainfallMapComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  
  { path: 'all-maps', component: AllMapsComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  // { path: 'district-map', component: DistrictMapComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  { path: 'login', component: LoginComponent },
  {path: 'yearlystationstatistics', component: YearlyStationStatisticsPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'sp'] }},
  { path: 'data-entry', component: DataEntryComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc'] } },
  {path: 'rainfalldatacm', component: RainfallDataCmPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'sp'] }},
  {path: 'newverification', component: VerificationComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc'] }},
  { path: 'station-level-data', component: StationLevelDataComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'station-statistics', component: StationStatisticsPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'sp'] } },

  { path: 'daily-state-rf-distribution', component: RainfallStatisticsComponent, data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'STATE'}, canActivate: [AuthGuard],  },
  { path: 'daily-subdivision-rf-distribution', component: RainfallStatisticsComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'SUBDIVISION'},canActivate: [AuthGuard],  },
  { path: 'daily-district-rf-distribution', component: RainfallStatisticsComponent, data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'DISTRICT'}, canActivate: [AuthGuard],  },
  { path: 'daily-homogenous-rf-distribution', component: RainfallStatisticsComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'REGION'},canActivate: [AuthGuard],  },
  { path: 'daily-country-rf-distribution', component: RainfallStatisticsComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'COUNTRY'},canActivate: [AuthGuard],  },

  { path: 'weekly-state-rf-distribution', component: RainfallStatisticsWeeklyComponent, data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'STATE'}, canActivate: [AuthGuard],  },
  { path: 'weekly-subdivision-rf-distribution', component: RainfallStatisticsWeeklyComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'SUBDIVISION'},canActivate: [AuthGuard],  },
  { path: 'weekly-district-rf-distribution', component: RainfallStatisticsWeeklyComponent, data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'DISTRICT'}, canActivate: [AuthGuard],  },
  { path: 'weekly-homogenous-rf-distribution', component: RainfallStatisticsWeeklyComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'REGION'},canActivate: [AuthGuard],  },
  { path: 'weekly-country-rf-distribution', component: RainfallStatisticsWeeklyComponent,  data:{allowedUsers: ['hq', 'mc', 'public', 'sp'], category : 'COUNTRY'},canActivate: [AuthGuard],  },

  { path: 'weekly-departure-state-map', component: StateRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-subdiv-map', component: SubdivisionRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-homogenous-map', component: HomogenousRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-country-map', component: CountryRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-district-panindia-map', component: DistrictPanRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-eastandnortheast-map', component: DistrictEastAndNorthEastRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-northWest-map', component: DistrictNorthWestRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-southPeninsular-map', component: DistrictSoutPensinsulaRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-centalIndia-map', component: DistrictCentralIndiaRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },

  { path: 'cummulative-departure-state-map', component: StateRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-subdiv-map', component: SubdivisionRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-region-map', component: RegionRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-country-map', component: CountryRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-district-pan-map', component: DistrictPanIndiaRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-district-north-west-map', component: DistrictNorthWestRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-district-east-and-north-east-map', component: DistrictEastAndNorthEastRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-district-south-peninsular-map', component: DistrictSouthPeninsularRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'cummulative-departure-district-central-India-map', component: DistrictCentralIndiaRainfallMapCummulativeComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },

  {path: 'normal-rainfall-map', component: NormalRainfallComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},

  { path: 'rainfall-departure', component: RainfallDeparturesSectionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },


  { path: 'daily-departure-state-map', component: StateRainfallMapDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'daily-departure-subdivision-map', component: SubdivisionRainfallMapDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },

  { path: 'weekly-departure-state-map', component: StateRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'weekly-departure-subdiv-map', component: SubdivisionRainfallMapWeeklyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  {path: 'daily-departure-country-map', component: CountryRainfallMapDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'daily-departure-homogenous-map', component: HomogenousRainfallMapDailyComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},


  {path: 'allstatemaps', component: AllStatesMapComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},

  //Inside district of Rainfall Map Module
  {path: 'daily-east-north-east-region', component: EastNorthEastRegionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'daily-north-west-region', component: NorthWestRegionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'daily-south-peninsula-region', component: SouthPeninsularaRegionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'daily-central-region', component: CentralRegionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},
  {path: 'pan-india-region', component: PanIndiaRegionComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},


  { path: 'underprogress', component: UnderprogressComponent , canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },

  { path: 'rainfall-graphs', component: RainfallCountrySeasonalGraphComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }},



  { path: 'gangariverbasin', component: GangaRiverBasinComponent , canActivate: [AuthGuard], data: { allowedUsers: ['hq'] } },
  
  { path: 'QpfverificationReports2020', component: QpfverificationReports2020Component , canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'QpfverificationReports2021', component: QpfverificationReports2021Component , canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'QpfverificationReports2022', component: QpfverificationReports2022Component , canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'upload-file', component: UploadFileComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'verification-page', component: VerificationComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc'] } },
  { path: 'verification-page-mc', component: VerificationPageMcComponent, canActivate: [AuthGuard], data: { allowedUsers: ['mc'] } },
  { path: 'verification-page-hq', component: VerificationPageHQComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'sp'] } },
  { path: 'last-five-year-data', component: LastYearsDistrictDataComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'station-statistics', component: StationStatisticsPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'sp'] } },
  { path: 'realtime-station-data', component: RealtimeStationDataComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'user-manual', component: UserManualv2Component, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },
  { path: 'block-actual-rainfall-map-daily-main-page-pubic', component: BlockActualRainfallMapDailyMainPagePubicComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] } },


   { path: 'new-email-dissemination', component: EmailDisseminationPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'sp'] }, children:
    [
      { path: 'new-send-email', component: SendEmailPageComponent },
      { path: 'new-auto-email', component: AutoEmailSetupPageComponent },
      { path: 'new-defined-email', component: DefinedEmailGroupPageComponent },
      { path: 'new-email-log', component: EmailLogPageComponent },
      { path: '', redirectTo: 'new-send-email', pathMatch: 'full' }
    ]
   },
  { path: 'log-info', component: LogInfoContainerComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc'] }, children:
    [
      { path: 'station-log', component: DeletedStationLogComponent },
      { path: 'reports-log', component: LogInfoForReportsComponent },
      { path: 'admin-activity-log', component: LogInfoAdminActivityComponent },
      { path: '', redirectTo: 'station-log', pathMatch: 'full' },
      { path: 'action-log', component: LogInfoDataActionsComponent}
    ]
   },
   
  // { path: 'front-page', component: FrontPageComponent, canActivate: [AuthGuard], data: { allowedUsers: ['hq', 'mc', 'public', 'sp'] }, children:
  //   [
  //     // { path: 'unifieddeparture', component: AllMapsDupComponent},
  //     // { path: 'weekly-departure', component: WeeklyDepartureMapComponent },
  //     { path: '', redirectTo: 'dupdeparture', pathMatch: 'full' }
  //   ]
  // },

  { path: '',  redirectTo: '/all-maps', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }