import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AppRoute {
  id: number;
  path: string;
  label: string;
  allowedRoles: string[];
  active: boolean;
}

@Component({
  selector: 'app-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.css']
})
export class RouteManagementComponent implements OnInit {
  searchText = '';
  roleFilter = 'all';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  isSaving = false;
  form!: FormGroup;
  modalRoles: string[] = [];

  availableRoles = ['hq', 'mc', 'sp', 'public'];

  appRoutes: AppRoute[] = [
    { id: 1,  path: '/irains-dashboard',         label: 'Dashboard',              allowedRoles: ['hq','mc','public','sp'], active: true },
    { id: 2,  path: '/data-entry',               label: 'Data Entry',             allowedRoles: ['hq','mc'],              active: true },
    { id: 3,  path: '/newverification',          label: 'Verification',           allowedRoles: ['hq','mc'],              active: true },
    { id: 4,  path: '/admin-panel',              label: 'Admin Panel',            allowedRoles: ['hq'],                   active: true },
    { id: 5,  path: '/data-management',          label: 'Data Management',        allowedRoles: ['hq'],                   active: true },
    { id: 6,  path: '/permissions',              label: 'Permissions',            allowedRoles: ['hq'],                   active: true },
    { id: 7,  path: '/new-email-dissemination',  label: 'Email Dissemination',    allowedRoles: ['hq','mc','sp'],         active: true },
    { id: 8,  path: '/station-statistics',       label: 'Station Statistics',     allowedRoles: ['hq','mc','sp'],         active: true },
    { id: 9,  path: '/spatial-table',            label: 'Spatial Table',          allowedRoles: ['hq','mc','public','sp'], active: true },
    { id: 10, path: '/monsoon-activity',         label: 'Monsoon Activity',       allowedRoles: ['hq','mc','public','sp'], active: true },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      path:  ['', Validators.required],
      label: ['', Validators.required],
      active: [true]
    });
  }

  get filtered(): AppRoute[] {
    const s = this.searchText.toLowerCase().trim();
    return this.appRoutes.filter(r => {
      const matchesText =
        !s ||
        r.path.toLowerCase().includes(s) ||
        r.label.toLowerCase().includes(s) ||
        r.allowedRoles.join(',').includes(s);
      const matchesRole =
        this.roleFilter === 'all' || r.allowedRoles.includes(this.roleFilter);
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'active' ? r.active : !r.active);
      return matchesText && matchesRole && matchesStatus;
    });
  }

  get activeRoutes(): number {
    return this.appRoutes.filter(r => r.active).length;
  }

  get hqOnlyRoutes(): number {
    return this.appRoutes.filter(
      r => r.allowedRoles.length === 1 && r.allowedRoles[0] === 'hq'
    ).length;
  }

  get publicRoutes(): number {
    return this.appRoutes.filter(r => r.allowedRoles.includes('public')).length;
  }

  openAdd() {
    this.isEditing = false;
    this.editingId = null;
    this.modalRoles = [];
    this.form.reset({ active: true });
    this.showModal = true;
  }

  openEdit(r: AppRoute) {
    this.isEditing = true;
    this.editingId = r.id;
    this.modalRoles = [...r.allowedRoles];
    this.form.patchValue(r);
    this.showModal = true;
  }

  toggleModalRole(role: string) {
    const idx = this.modalRoles.indexOf(role);
    if (idx > -1) {
      this.modalRoles.splice(idx, 1);
    } else {
      this.modalRoles.push(role);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.modalRoles.length) {
      this.snackBar.open('Select at least one allowed role.', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.isSaving = true;
    setTimeout(() => {
      const v = { ...this.form.value, allowedRoles: [...this.modalRoles] };
      if (this.isEditing && this.editingId !== null) {
        const idx = this.appRoutes.findIndex(r => r.id === this.editingId);
        if (idx > -1) {
          this.appRoutes[idx] = { ...this.appRoutes[idx], ...v };
        }
        this.snackBar.open(`Route "${v.label}" updated.`, 'Close', { duration: 2500 });
      } else {
        this.appRoutes = [...this.appRoutes, { id: Date.now(), ...v }];
        this.snackBar.open(`Route "${v.label}" added.`, 'Close', { duration: 2500 });
      }
      this.isSaving = false;
      this.closeModal();
    }, 500);
  }

  delete(r: AppRoute) {
    if (!confirm(`Remove route "${r.path}"?`)) {
      return;
    }
    this.appRoutes = this.appRoutes.filter(x => x.id !== r.id);
    this.snackBar.open(`Route "${r.label}" removed.`, 'Close', { duration: 2500 });
  }

  closeModal() {
    this.showModal = false;
  }

  toggleRole(route: AppRoute, role: string) {
    const idx = route.allowedRoles.indexOf(role);
    if (idx > -1) {
      if (route.allowedRoles.length === 1) {
        this.snackBar.open('A route must keep at least one role.', 'Close', {
          duration: 2800,
        });
        return;
      }
      route.allowedRoles.splice(idx, 1);
    } else {
      route.allowedRoles.push(role);
    }
  }

  hasRole(route: AppRoute, role: string): boolean {
    return route.allowedRoles.includes(role);
  }

  toggleActive(route: AppRoute) {
    route.active = !route.active;
    this.snackBar.open(
      `${route.label} ${route.active ? 'enabled' : 'disabled'}.`,
      'Close',
      { duration: 2200 }
    );
  }
}
