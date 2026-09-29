import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DataService } from "src/app/data.service";
import { CountryDownloadStatistics } from "src/app/services/country/pdfStatisticsDownloadCountry.service";
import { DownloadPdf } from "src/app/services/district/pdfdownload.service";
import { RegionDownloadStatistics } from "src/app/services/region/downloadStatisticsRegion.service";
import { StateDownloadStatistics } from "src/app/services/state/statisticsdownload.service";
import { SubdivDownloadStatistics } from "src/app/services/subDivision/statisticsdownload.service";
import { RainfallStatisticsComponent } from "./rainfall-statistics.component";

describe("RainfallStatisticsComponent", () => {
  let component: RainfallStatisticsComponent;
  let fixture: ComponentFixture<RainfallStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainfallStatisticsComponent],
      imports: [FormsModule, MatSnackBarModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({ category: "STATE" }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy("navigate") } },
        { provide: DataService, useValue: { setfromAndToDate: jasmine.createSpy() } },
        {
          provide: StateDownloadStatistics,
          useValue: { updateandViewpdfFromDataEntry: jasmine.createSpy().and.resolveTo() },
        },
        {
          provide: DownloadPdf,
          useValue: { updateandViewpdfFromDataEntry: jasmine.createSpy().and.resolveTo() },
        },
        {
          provide: SubdivDownloadStatistics,
          useValue: { updateandViewpdfFromDataEntry: jasmine.createSpy().and.resolveTo() },
        },
        {
          provide: CountryDownloadStatistics,
          useValue: { updateandViewpdfFromDataEntry: jasmine.createSpy().and.resolveTo() },
        },
        {
          provide: RegionDownloadStatistics,
          useValue: { updateandViewpdfFromDataEntry: jasmine.createSpy().and.resolveTo() },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(RainfallStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply today preset and keep range valid", () => {
    component.applyPreset({ id: "today", label: "Today", kind: "today" });
    expect(component.fromDate).toBe(component.toDate);
    expect(component.isRangeValid).toBeTrue();
  });
});
