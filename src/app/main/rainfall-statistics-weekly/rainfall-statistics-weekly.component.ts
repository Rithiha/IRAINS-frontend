import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataService } from "src/app/data.service";
import { CountryDownloadStatistics } from "src/app/services/country/pdfStatisticsDownloadCountry.service";
import { DownloadPdf } from "src/app/services/district/pdfdownload.service";
import { RegionDownloadStatistics } from "src/app/services/region/downloadStatisticsRegion.service";
import { StateDownloadStatistics } from "src/app/services/state/statisticsdownload.service";
import { SubdivDownloadStatistics } from "src/app/services/subDivision/statisticsdownload.service";

type StatisticsCategory =
  | "STATE"
  | "SUBDIVISION"
  | "DISTRICT"
  | "REGION"
  | "COUNTRY";

interface WeekOption {
  label: string;
  range: string;
  displayRange: string;
}

interface MonthWeeks {
  name: string;
  weeks: WeekOption[];
}

interface RecentDownload {
  category: string;
  label: string;
  fromDate: string;
  toDate: string;
  weekLabel: string;
  at: string;
}

@Component({
  selector: "app-rainfall-statistics-weekly",
  templateUrl: "./rainfall-statistics-weekly.component.html",
  styleUrls: ["./rainfall-statistics-weekly.component.css"],
})
export class RainfallStatisticsWeeklyComponent implements OnInit, OnDestroy {
  readonly categories: {
    value: StatisticsCategory;
    label: string;
    route: string;
  }[] = [
    {
      value: "STATE",
      label: "State",
      route: "/weekly-state-rf-distribution",
    },
    {
      value: "SUBDIVISION",
      label: "Subdivision",
      route: "/weekly-subdivision-rf-distribution",
    },
    {
      value: "DISTRICT",
      label: "District",
      route: "/weekly-district-rf-distribution",
    },
    {
      value: "REGION",
      label: "Homogenous",
      route: "/weekly-homogenous-rf-distribution",
    },
    {
      value: "COUNTRY",
      label: "Country",
      route: "/weekly-country-rf-distribution",
    },
  ];

  readonly recentStorageKey = "rainfall-statistics-weekly-recent-downloads";

  category: StatisticsCategory = "STATE";
  selectedCategory: StatisticsCategory = "STATE";
  selectedWeek: string | undefined;
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [];
  months: MonthWeeks[] = [];
  loading = false;
  statusMessage = "";
  statusTone: "info" | "success" | "error" | "" = "";
  recentDownloads: RecentDownload[] = [];
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private stateStatisticsService: StateDownloadStatistics,
    private districtsStatisticsService: DownloadPdf,
    private subdivisionStatisticsService: SubdivDownloadStatistics,
    private countryStatisticsService: CountryDownloadStatistics,
    private regionStatisticsService: RegionDownloadStatistics,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.availableYears = this.buildYearOptions();
    this.recentDownloads = this.readRecentDownloads();
    this.generateWeeklyOptions();

    this.routeSub = this.route.data.subscribe((data) => {
      const next = String(data["category"] || "STATE")
        .trim()
        .toUpperCase() as StatisticsCategory;
      this.category = next;
      this.selectedCategory = next;
      this.clearStatus();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  get categoryLabel(): string {
    return (
      this.categories.find((item) => item.value === this.category)?.label ||
      this.category
    );
  }

  get selectedWeekMeta(): WeekOption | null {
    if (!this.selectedWeek) {
      return null;
    }
    for (const month of this.months) {
      const match = month.weeks.find((week) => week.range === this.selectedWeek);
      if (match) {
        return match;
      }
    }
    return null;
  }

  get weekCount(): number {
    return this.months.reduce((total, month) => total + month.weeks.length, 0);
  }

  get dailyRoute(): string {
    const map: Record<StatisticsCategory, string> = {
      STATE: "/daily-state-rf-distribution",
      SUBDIVISION: "/daily-subdivision-rf-distribution",
      DISTRICT: "/daily-district-rf-distribution",
      REGION: "/daily-homogenous-rf-distribution",
      COUNTRY: "/daily-country-rf-distribution",
    };
    return map[this.category];
  }

  onCategoryChange(category: StatisticsCategory): void {
    if (category === this.selectedCategory) {
      return;
    }
    const target = this.categories.find((item) => item.value === category);
    if (target) {
      this.router.navigate([target.route]);
    }
  }

  onYearChange(): void {
    this.selectedWeek = undefined;
    this.generateWeeklyOptions();
    this.clearStatus();
  }

  selectLatestWeek(): void {
    for (let i = this.months.length - 1; i >= 0; i--) {
      const month = this.months[i];
      if (month?.weeks?.length) {
        this.selectedWeek = month.weeks[month.weeks.length - 1].range;
        this.clearStatus();
        return;
      }
    }
    this.snackBar.open("No completed weeks available for this year.", "Close", {
      duration: 3500,
    });
  }

  async viewWeeklyStatistics(): Promise<void> {
    if (this.loading) {
      return;
    }

    if (!this.selectedWeek) {
      this.setStatus("Select a completed week before generating the report.", "error");
      this.snackBar.open("No week selected.", "Close", { duration: 3000 });
      return;
    }

    const dates = this.selectedWeek.split(" - ");
    const fromDate = dates[0];
    const toDate = dates[1];

    this.dataService.setfromAndToDate(
      JSON.stringify({
        fromDate,
        toDate,
      })
    );

    this.loading = true;
    this.setStatus(
      `Generating weekly ${this.categoryLabel.toLowerCase()} statistics…`,
      "info"
    );

    try {
      if (this.category === "STATE") {
        await this.stateStatisticsService.updateandViewpdfFromDataEntry();
      } else if (this.category === "SUBDIVISION") {
        await this.subdivisionStatisticsService.updateandViewpdfFromDataEntry();
      } else if (this.category === "DISTRICT") {
        await this.districtsStatisticsService.updateandViewpdfFromDataEntry();
      } else if (this.category === "COUNTRY") {
        await this.countryStatisticsService.updateandViewpdfFromDataEntry();
      } else if (this.category === "REGION") {
        await this.regionStatisticsService.updateandViewpdfFromDataEntry();
      } else {
        throw new Error("Unsupported statistics category");
      }

      this.rememberDownload(fromDate, toDate);
      this.setStatus(
        "Weekly report ready — your Excel download should start automatically.",
        "success"
      );
      this.snackBar.open("Weekly statistics report downloaded.", "Close", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error fetching statistics", error);
      this.setStatus(
        "Unable to generate the weekly report. Please retry with another week.",
        "error"
      );
      this.snackBar.open("Failed to generate weekly statistics.", "Close", {
        duration: 4500,
      });
    } finally {
      this.loading = false;
    }
  }

  clearRecent(): void {
    this.recentDownloads = [];
    try {
      sessionStorage.removeItem(this.recentStorageKey);
    } catch {
      /* ignore */
    }
  }

  formatTime(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private rememberDownload(fromDate: string, toDate: string): void {
    const entry: RecentDownload = {
      category: this.category,
      label: this.categoryLabel,
      fromDate,
      toDate,
      weekLabel: this.selectedWeekMeta?.label || "Week",
      at: new Date().toISOString(),
    };

    this.recentDownloads = [entry, ...this.recentDownloads]
      .filter(
        (item, index, list) =>
          list.findIndex(
            (other) =>
              other.category === item.category &&
              other.fromDate === item.fromDate &&
              other.toDate === item.toDate
          ) === index
      )
      .slice(0, 5);

    try {
      sessionStorage.setItem(
        this.recentStorageKey,
        JSON.stringify(this.recentDownloads)
      );
    } catch {
      /* ignore */
    }
  }

  private readRecentDownloads(): RecentDownload[] {
    try {
      const raw = sessionStorage.getItem(this.recentStorageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
    } catch {
      return [];
    }
  }

  private buildYearOptions(): number[] {
    const current = new Date().getFullYear();
    const years: number[] = [];
    for (let year = current; year >= current - 5; year--) {
      years.push(year);
    }
    return years;
  }

  generateWeeklyOptions(): void {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startDate = new Date(this.selectedYear, 0, 1);
    const endDate = new Date(this.selectedYear, 11, 31);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const months: MonthWeeks[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 4) {
        const startOfWeek = new Date(currentDate);
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        if (endOfWeek <= today) {
          const monthIndex = startOfWeek.getMonth();
          const weekRange = `${this.formatDate(startOfWeek)} - ${this.formatDate(
            endOfWeek
          )}`;
          const weekRangeForDisplay = `${this.formatDateForDisplay(
            startOfWeek
          )} - ${this.formatDateForDisplay(endOfWeek)}`;

          if (!months[monthIndex]) {
            months[monthIndex] = {
              name: monthNames[monthIndex],
              weeks: [],
            };
          }

          const weekNumber = months[monthIndex].weeks.length + 1;
          months[monthIndex].weeks.push({
            label: `Week ${weekNumber}`,
            range: weekRange,
            displayRange: weekRangeForDisplay,
          });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.months = months.filter(Boolean);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  formatDateForDisplay(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private setStatus(
    message: string,
    tone: "info" | "success" | "error" | ""
  ): void {
    this.statusMessage = message;
    this.statusTone = tone;
  }

  private clearStatus(): void {
    this.statusMessage = "";
    this.statusTone = "";
  }
}
