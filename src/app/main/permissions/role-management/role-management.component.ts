import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  userCount: number;
  active: boolean;
}

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  searchText = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  isSaving = false;
  form!: FormGroup;

  roles: Role[] = [
    { id: 1, code: 'hq',     name: 'HQ Admin',  description: 'Full access — headquarters admin', userCount: 5,  active: true },
    { id: 2, code: 'mc',     name: 'MC User',   description: 'Meteorological centre user',       userCount: 24, active: true },
    { id: 3, code: 'sp',     name: 'SP User',   description: 'State portal user',                userCount: 38, active: true },
    { id: 4, code: 'public', name: 'Public',    description: 'Read-only public access',          userCount: 0,  active: true },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      code:        ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]],
      name:        ['', Validators.required],
      description: [''],
      active:      [true]
    });
  }

  get filtered(): Role[] {
    const s = this.searchText.toLowerCase().trim();
    return this.roles.filter(r => {
      const matchesText =
        !s ||
        r.name.toLowerCase().includes(s) ||
        r.code.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s);
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'active' ? r.active : !r.active);
      return matchesText && matchesStatus;
    });
  }

  get totalUsers(): number {
    return this.roles.reduce((n, r) => n + r.userCount, 0);
  }

  get activeRoles(): number {
    return this.roles.filter(r => r.active).length;
  }

  openAdd() {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset({ active: true });
    this.form.get('code')?.enable();
    this.showModal = true;
  }

  openEdit(r: Role) {
    this.isEditing = true;
    this.editingId = r.id;
    this.form.patchValue(r);
    this.form.get('code')?.disable();
    this.showModal = true;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    setTimeout(() => {
      const v = this.form.getRawValue();
      if (this.isEditing && this.editingId !== null) {
        const idx = this.roles.findIndex(r => r.id === this.editingId);
        if (idx > -1) {
          this.roles[idx] = { ...this.roles[idx], ...v };
        }
        this.snackBar.open(`Role "${v.name}" updated.`, 'Close', { duration: 2500 });
      } else {
        if (this.roles.some(r => r.code === v.code)) {
          this.isSaving = false;
          this.snackBar.open('Role code already exists.', 'Close', { duration: 3000 });
          return;
        }
        this.roles = [...this.roles, { id: Date.now(), userCount: 0, ...v }];
        this.snackBar.open(`Role "${v.name}" created.`, 'Close', { duration: 2500 });
      }
      this.isSaving = false;
      this.closeModal();
    }, 500);
  }

  delete(r: Role) {
    if (r.userCount > 0) {
      this.snackBar.open('Cannot delete a role that still has users.', 'Close', {
        duration: 3000,
      });
      return;
    }
    if (!confirm(`Delete role "${r.name}"?`)) {
      return;
    }
    this.roles = this.roles.filter(x => x.id !== r.id);
    this.snackBar.open(`Role "${r.name}" deleted.`, 'Close', { duration: 2500 });
  }

  toggleActive(r: Role) {
    r.active = !r.active;
    this.snackBar.open(
      `${r.name} marked ${r.active ? 'active' : 'inactive'}.`,
      'Close',
      { duration: 2200 }
    );
  }

  closeModal() {
    this.showModal = false;
    this.form.get('code')?.enable();
  }
}
