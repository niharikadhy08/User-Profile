import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Profile {
  readonly portalName: string;
  readonly portalType: string;
  readonly companyName: string;
  readonly customerCode: string;
  readonly loginType: string;
  readonly userId: string;
  readonly panNumber: string;
  readonly superUser: string;
  readonly role: string;
  readonly terminal: string;
  readonly status: string;
}

interface Contact {
  readonly mobile: string;
  readonly email: string;
}

interface OverviewRow {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
}

interface LastLogin {
  readonly loginTime: string;
  readonly device: string;
  readonly ipAddress: string;
}

interface NavAction {
  readonly icon: string;
  readonly label: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  protected readonly now = signal(new Date());

  protected readonly profile = signal<Profile>({
    portalName: 'e-Booking (Domestic)',
    portalType: 'Indian Railways Freight Portal',
    companyName: 'WESTERN CARRIERS (INDIA) LTD',
    customerCode: 'WIN',
    loginType: 'CUST',
    userId: 'AABCW1961A',
    panNumber: 'AABCW1961A',
    superUser: 'Yes',
    role: 'Customer (Super)',
    terminal: 'TONDIARPET MARSHELLING YARD (TNPM)',
    status: 'ACTIVE',
  });

  protected readonly contact = signal<Contact>({
    mobile: '8863833856',
    email: 'LUBNAAADSA01@GMAIL.COM',
  });

  protected readonly navActions = signal<NavAction[]>([
    { icon: 'bar_chart', label: 'Reports' },
    { icon: 'sync_alt', label: 'Change Terminal' },
  ]);

  protected readonly lastLogins = signal<LastLogin[]>([
    {
      loginTime: '09 Jul 2026 10:45 AM',
      device: 'Chrome on Windows',
      ipAddress: '192.168.1.25',
    },
    {
      loginTime: '08 Jul 2026 06:18 PM',
      device: 'Edge on Windows',
      ipAddress: '192.168.1.14',
    },
    {
      loginTime: '07 Jul 2026 09:10 AM',
      device: 'Android Mobile',
      ipAddress: '103.45.117.21',
    },
  ]);

  protected readonly overviewRows = computed<OverviewRow[]>(() => {
    const profile = this.profile();

    return [
      { icon: 'tag', label: 'Customer Code', value: profile.customerCode },
      { icon: 'layers', label: 'Login Type', value: profile.loginType },
      { icon: 'credit_card', label: 'eBook User ID', value: profile.userId },
      { icon: 'shield', label: 'PAN Number', value: profile.panNumber },
      { icon: 'person', label: 'Super User', value: profile.superUser },
      { icon: 'place', label: 'Primary Terminal', value: profile.terminal },
    ];
  });

  protected readonly formattedTimestamp = computed(() => {
    const parts = new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).formatToParts(this.now());

    const part = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((datePart) => datePart.type === type)?.value ?? '';

    return `${part('weekday')}, ${part('day')} ${part('month')}, ${part('year')} ${part('hour')}:${part('minute')}`.toUpperCase();
  });

  protected readonly contactForm = this.fb.nonNullable.group({
    mobile: [
      this.contact().mobile,
      [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
    ],
    email: [
      this.contact().email,
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
  });

  constructor() {
    const timerId = window.setInterval(() => {
      this.now.update((date) => new Date(date.getTime() + 1000));
    }, 1000);

    this.destroyRef.onDestroy(() => window.clearInterval(timerId));
  }

  protected resetContact(): void {
    this.contactForm.reset(this.contact());
  }
}
