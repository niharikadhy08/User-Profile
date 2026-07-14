# Requirements

This folder documents the handoff requirements for the Angular implementation.

## Application

- Portal name: e-Booking (Domestic)
- Customer entity: WESTERN CARRIERS (INDIA) LTD
- User ID / PAN: AABCW1961A
- Customer code: WIN
- Login type: CUST
- Role: Customer (Super)
- Terminal: TONDIARPET MARSHELLING YARD (TNPM)
- Mobile number: 8863833856
- Email ID: LUBNAAADAS01@GMAIL.COM

## UI Requirements

- Enterprise SaaS dashboard layout
- Top navigation with Reports, Change Terminal, user quick menu, logout
- Live date/time clock
- Header profile card with active glowing badge
- Profile overview card for read-only identity data
- Editable contact details form
- Change Password action button that redirects to the secured password workflow

## Engineering Requirements

- Angular 22
- Standalone component architecture
- `ChangeDetectionStrategy.OnPush`
- `provideZonelessChangeDetection()`
- Angular `signal()` and `computed()`
- Reactive Forms with validators
- Modern template control flow: `@let`, `@if`, `@for`, `@switch`
- Tailwind CSS styling
