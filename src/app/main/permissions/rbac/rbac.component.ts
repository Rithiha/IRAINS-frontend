import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style';

type ActionKey = 'view' | 'create' | 'edit' | 'delete';

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface RoleMatrix {
  role: string;
  code: string;
  color: string;
  accent: string;
  permissions: Permission[];
}

interface Snapshot {
  role: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-rbac',
  templateUrl: './rbac.component.html',
  styleUrls: ['./rbac.component.css']
})
export class RbacComponent implements OnInit {
  readonly actions: { key: ActionKey; label: string }[] = [
    { key: 'view', label: 'View' },
    { key: 'create', label: 'Create' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
  ];

  modules = [
    'Dashboard',
    'Data Entry',
    'Verification',
    'Maps',
    'Reports',
    'Station Mgmt',
    'Data Mgmt',
    'Admin Panel',
    'Email',
  ];

  roles: RoleMatrix[] = [
    {
      role: 'HQ Admin',
      code: 'hq',
      color: 'danger',
      accent: '#dc2626',
      permissions: this.modules.map(m => ({
        module: m, view: true, create: true, edit: true, delete: true,
      })),
    },
    {
      role: 'MC User',
      code: 'mc',
      color: 'primary',
      accent: '#2563eb',
      permissions: this.modules.map((m, i) => ({
        module: m,
        view: true,
        create: i < 4,
        edit: i < 3,
        delete: false,
      })),
    },
    {
      role: 'SP User',
      code: 'sp',
      color: 'success',
      accent: '#059669',
      permissions: this.modules.map((m, i) => ({
        module: m,
        view: true,
        create: i < 2,
        edit: i < 1,
        delete: false,
      })),
    },
    {
      role: 'Public',
      code: 'public',
      color: 'secondary',
      accent: '#64748b',
      permissions: this.modules.map((m, i) => ({
        module: m,
        view: i < 5,
        create: false,
        edit: false,
        delete: false,
      })),
    },
  ];

  selectedRole: RoleMatrix | null = null;
  compareRole: RoleMatrix | null = null;
  moduleFilter = '';
  actionFilter: 'all' | 'granted' | 'denied' | 'partial' = 'all';
  saved = false;
  isSaving = false;
  dirty = false;
  lastSavedAt: string | null = null;
  private baseline: Snapshot | null = null;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.roles.length) {
      this.selectRole(this.roles[0]);
    }
  }

  get filteredPermissions(): Permission[] {
    if (!this.selectedRole) {
      return [];
    }
    const q = this.moduleFilter.trim().toLowerCase();
    return this.selectedRole.permissions.filter(p => {
      if (q && !p.module.toLowerCase().includes(q)) {
        return false;
      }
      const granted = this.grantedCount(p);
      if (this.actionFilter === 'granted') {
        return granted === 4;
      }
      if (this.actionFilter === 'denied') {
        return granted === 0;
      }
      if (this.actionFilter === 'partial') {
        return granted > 0 && granted < 4;
      }
      return true;
    });
  }

  get totalRoles(): number {
    return this.roles.length;
  }

  get totalModules(): number {
    return this.modules.length;
  }

  get totalUsersHint(): number {
    // Static hint aligned with Role Management sample data.
    return 67;
  }

  get overallCoverage(): number {
    let granted = 0;
    let total = 0;
    for (const role of this.roles) {
      for (const perm of role.permissions) {
        for (const action of this.actions) {
          total += 1;
          if (perm[action.key]) {
            granted += 1;
          }
        }
      }
    }
    return total ? Math.round((granted / total) * 100) : 0;
  }

  get selectedCoverage(): number {
    if (!this.selectedRole) {
      return 0;
    }
    return this.roleCoverage(this.selectedRole);
  }

  get fullAccessRoles(): number {
    return this.roles.filter(r => this.hasFullAccess(r)).length;
  }

  selectRole(r: RoleMatrix): void {
    if (this.dirty && this.selectedRole && this.selectedRole.role !== r.role) {
      const leave = confirm(
        `You have unsaved changes for "${this.selectedRole.role}". Discard and switch roles?`
      );
      if (!leave) {
        return;
      }
      this.discardChanges();
    }
    this.selectedRole = r;
    this.compareRole = null;
    this.saved = false;
    this.captureBaseline();
    this.dirty = false;
  }

  onToggle(perm: Permission, key: ActionKey, checked: boolean): void {
    if (!this.selectedRole) {
      return;
    }
    if (key === 'view') {
      perm.view = checked;
      if (!checked) {
        perm.create = false;
        perm.edit = false;
        perm.delete = false;
      }
    } else {
      if (!perm.view && checked) {
        perm.view = true;
      }
      perm[key] = checked;
    }
    this.markDirty();
  }

  setAllForAction(key: ActionKey, value: boolean): void {
    if (!this.selectedRole) {
      return;
    }
    for (const perm of this.filteredPermissions) {
      this.onToggle(perm, key, value);
    }
  }

  grantAllVisible(): void {
    for (const key of this.actions.map(a => a.key)) {
      this.setAllForAction(key, true);
    }
  }

  revokeAllVisible(): void {
    for (const key of [...this.actions.map(a => a.key)].reverse()) {
      this.setAllForAction(key, false);
    }
  }

  copyFromRole(sourceRoleName: string): void {
    if (!this.selectedRole || !sourceRoleName) {
      return;
    }
    const source = this.roles.find(r => r.role === sourceRoleName);
    if (!source || source.role === this.selectedRole.role) {
      return;
    }
    this.selectedRole.permissions = source.permissions.map(p => ({ ...p }));
    this.markDirty();
    this.snackBar.open(`Copied permissions from ${source.role}.`, 'Close', {
      duration: 2500,
    });
  }

  discardChanges(): void {
    if (!this.selectedRole || !this.baseline) {
      return;
    }
    this.selectedRole.permissions = this.baseline.permissions.map(p => ({ ...p }));
    this.dirty = false;
    this.saved = false;
  }

  savePermissions(): void {
    if (!this.selectedRole || !this.dirty) {
      return;
    }
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.saved = true;
      this.dirty = false;
      this.lastSavedAt = new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
      this.captureBaseline();
      this.snackBar.open(
        `Permissions saved for ${this.selectedRole?.role}.`,
        'Close',
        { duration: 2800 }
      );
      setTimeout(() => (this.saved = false), 3000);
    }, 550);
  }

  exportMatrix(): void {
    const rows = this.roles.flatMap(role =>
      role.permissions.map(p => ({
        Role: role.role,
        Code: role.code,
        Module: p.module,
        View: p.view ? 'Y' : 'N',
        Create: p.create ? 'Y' : 'N',
        Edit: p.edit ? 'Y' : 'N',
        Delete: p.delete ? 'Y' : 'N',
        Coverage: `${this.grantedCount(p)}/4`,
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RBAC Matrix');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    FileSaver.saveAs(
      new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      `rbac-matrix-${new Date().toISOString().slice(0, 10)}.xlsx`
    );
    this.snackBar.open('RBAC matrix exported.', 'Close', { duration: 2500 });
  }

  roleCoverage(r: RoleMatrix): number {
    let granted = 0;
    let total = 0;
    for (const perm of r.permissions) {
      for (const action of this.actions) {
        total += 1;
        if (perm[action.key]) {
          granted += 1;
        }
      }
    }
    return total ? Math.round((granted / total) * 100) : 0;
  }

  grantedCount(p: Permission): number {
    return this.actions.reduce((n, a) => n + (p[a.key] ? 1 : 0), 0);
  }

  viewCount(r: RoleMatrix): number {
    return r.permissions.filter(p => p.view).length;
  }

  hasFullAccess(r: RoleMatrix): boolean {
    return r.permissions.every(p => p.view && p.create && p.edit && p.delete);
  }

  coverageClass(pct: number): string {
    if (pct >= 75) {
      return 'high';
    }
    if (pct >= 40) {
      return 'mid';
    }
    return 'low';
  }

  compareDiff(moduleName: string, key: ActionKey): 'same' | 'gain' | 'loss' | 'na' {
    if (!this.selectedRole || !this.compareRole) {
      return 'na';
    }
    const a = this.selectedRole.permissions.find(p => p.module === moduleName)?.[key];
    const b = this.compareRole.permissions.find(p => p.module === moduleName)?.[key];
    if (a === b) {
      return 'same';
    }
    return a && !b ? 'gain' : 'loss';
  }

  compareRowLabel(moduleName: string): string {
    if (!this.compareRole) {
      return '—';
    }
    const perm = this.compareRole.permissions.find(p => p.module === moduleName);
    return perm ? `${this.grantedCount(perm)}/4` : '—';
  }

  otherRoles(): RoleMatrix[] {
    if (!this.selectedRole) {
      return this.roles;
    }
    return this.roles.filter(r => r.role !== this.selectedRole?.role);
  }

  private markDirty(): void {
    this.dirty = true;
    this.saved = false;
  }

  private captureBaseline(): void {
    if (!this.selectedRole) {
      this.baseline = null;
      return;
    }
    this.baseline = {
      role: this.selectedRole.role,
      permissions: this.selectedRole.permissions.map(p => ({ ...p })),
    };
  }
}
