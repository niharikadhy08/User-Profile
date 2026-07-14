import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserProfile } from './user-profile/user-profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserProfile],
  template: '<app-user-profile />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
