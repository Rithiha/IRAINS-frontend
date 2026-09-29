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

interface DatePreset {
  id: string;
  label: string;
  days?: number;
  kind?: "today" | "yesterday" | "mtd" | "ytd";
}

interface RecentDownload {
  category: string;
  label: string;
  fromDate: string;
  toDate: string;
  at: string;
}

@Component({
  selector: "app-rainfall-statistics",
  templateUrl: "./rainfall-statistics.component.html",
  styleUrls: ["./rainfall-statistics.component.css"],
})
export class RainfallStatisticsComponent implements OnInit, OnDestroy {
  readonly categories: {
    value: StatisticsCategory;
    label: string;
    route: string;
  }[] = [
    {
      value: "STATE",
      label: "State",
      route: "/daily-state-rf-distribution",
    },
    {
      value: "SUBDIVISION",
      label: "Subdivision",
      route: "/daily-subdivision-rf-distribution",
    },
    {
      value: "DISTRICT",
      label: "District",
      route: "/daily-district-rf-distribution",
    },
    {
      value: "REGION",
      label: "Homogenous",
      route: "/daily-homogenous-rf-distribution",
    },
    {
      value: "COUNTRY",
      label: "Country",
      route: "/daily-country-rf-distribution",
    },
  ];

  readonly presets: DatePreset[] = [
    { id: "today", label: "Today", kind: "today" },
    { id: "yesterday", label: "Yesterday", kind: "yesterday" },
    { id: "7", label: "Last 7 days", days: 7 },
    { id: "15", label: "Last 15 days", days: 15 },
    { id: "30", label: "Last 30 days", days: 30 },
    { id: "mtd", label: "Month to date", kind: "mtd" },
    { id: "ytd", label: "Year to date", kind: "ytd" },
  ];

  readonly maxRangeDays = 93;
  readonly recentStorageKey = "rainfall-statistics-recent-downloads";

  category: StatisticsCategory = "STATE";
  selectedCategory: StatisticsCategory = "STATE";
  fromDate = this.toInputDate(new Date());
  toDate = this.toInputDate(new Date());
  activePresetId: string | null = "today";
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
    this.recentDownloads = this.readRecentDownloads();
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

  get daySpan(): number {
    const start = this.parseInputDate(this.fromDate);
    const end = this.parseInputDate(this.toDate);
    if (!start || !end) {
      return 0;
    }
    const ms = end.getTime() - start.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  }

  get isRangeValid(): boolean {
    const start = this.parseInputDate(this.fromDate);
    const end = this.parseInputDate(this.toDate);
    if (!start || !end) {
      return false;
    }
    if (start > end) {
      return false;
    }
    return this.daySpan <= this.maxRangeDays;
  }

  get maxDate(): string {
    return this.toInputDate(new Date());
  }

  get weeklyRoute(): string {
    const map: Record<StatisticsCategory, string> = {
      STATE: "/weekly-state-rf-distribution",
      SUBDIVISION: "/weekly-subdivision-rf-distribution",
      DISTRICT: "/weekly-district-rf-distribution",
      REGION: "/weekly-homogenous-rf-distribution",
      COUNTRY: "/weekly-country-rf-distribution",
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

  applyPreset(preset: DatePreset): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start = new Date(today);
    let end = new Date(today);

    if (preset.kind === "today") {
      start = new Date(today);
      end = new Date(today);
    } else if (preset.kind === "yesterday") {
      start = new Date(today);
      start.setDate(start.getDate() - 1);
      end = new Date(start);
    } else if (preset.kind === "mtd") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today);
    } else if (preset.kind === "ytd") {
      start = new Date(today.getFullYear(), 0, 1);
      end = new Date(today);
    } else if (preset.days) {
      end = new Date(today);
      start = new Date(today);
      start.setDate(start.getDate() - (preset.days - 1));
    }

    this.fromDate = this.toInputDate(start);
    this.toDate = this.toInputDate(end);
    this.activePresetId = preset.id;
    this.validateDateRange(false);
  }

  onDateChange(): void {
    this.activePresetId = null;
    this.validateDateRange(false);
  }

  validateDateRange(showToast = true): boolean {
    const start = this.parseInputDate(this.fromDate);
    const end = this.parseInputDate(this.toDate);

    if (!start || !end) {
      this.setStatus("Select both From and To dates.", "error");
      if (showToast) {
        this.snackBar.open("Select both From and To dates.", "Close", {
          duration: 3500,
        });
      }
      return false;
    }

    if (start > end) {
      this.toDate = this.fromDate;
      this.setStatus("To date cannot be earlier than From date.", "error");
      if (showToast) {
        this.snackBar.open(
          "To date cannot be earlier than From date.",
          "Close",
          { duration: 3500 }
        );
      }
      return false;
    }

    if (this.daySpan > this.maxRangeDays) {
      this.setStatus(
        `Date range is limited to ${this.maxRangeDays} days for reliable reports.`,
        "error"
      );
      if (showToast) {
        this.snackBar.open(
          `Please limit the range to ${this.maxRangeDays} days.`,
          "Close",
          { duration: 4000 }
        );
      }
      return false;
    }

    this.clearStatus();
    return true;
  }

  async setFromAndToDateAndView(): Promise<void> {
    if (this.loading) {
      return;
    }
    if (!this.validateDateRange(true)) {
      return;
    }

    this.dataService.setfromAndToDate(
      JSON.stringify({
        fromDate: this.fromDate,
        toDate: this.toDate,
      })
    );

    this.loading = true;
    this.setStatus(
      `Generating ${this.categoryLabel.toLowerCase()} rainfall statistics…`,
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

      this.rememberDownload();
      this.setStatus(
        "Report ready — your Excel download should start automatically.",
        "success"
      );
      this.snackBar.open("Statistics report downloaded.", "Close", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error fetching statistics", error);
      this.setStatus(
        "Unable to generate the report. Please retry or narrow the date range.",
        "error"
      );
      this.snackBar.open("Failed to generate statistics report.", "Close", {
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

  private rememberDownload(): void {
    const entry: RecentDownload = {
      category: this.category,
      label: this.categoryLabel,
      fromDate: this.fromDate,
      toDate: this.toDate,
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

  formatDisplayDate(value: string): string {
    const date = this.parseInputDate(value);
    if (!date) {
      return value;
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  private toInputDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private parseInputDate(value: string): Date | null {
    if (!value) {
      return null;
    }
    const parts = value.split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
      return null;
    }
    const [year, month, day] = parts;
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
