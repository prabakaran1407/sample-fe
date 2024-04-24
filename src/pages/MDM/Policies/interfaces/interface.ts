/** @format */

export interface policesI {
  applications: [] | null | undefined;
  maximumTimeToLock: number | null | undefined;
  screenCaptureDisabled: boolean | null | undefined;
  cameraDisabled: boolean | null | undefined;
  keyguardDisabledFeatures: [] | null;
  defaultPermissionPolicy: PermissionPolicy | null | undefined;
  persistentPreferredActivities: [] | null | undefined;
  openNetworkConfiguration: {} | null | undefined;
  systemUpdate:
    | {
        type: SystemUpdateType | null | undefined;
        startMinutes: number | null | undefined;
        endMinutes: number | null | undefined;
        freezePeriods:
          | [
              {
                startDate: {
                  year: number | null | undefined;
                  month: number | null | undefined;
                  day: number | null | undefined;
                };
                endDate: {
                  year: number | null | undefined;
                  month: number | null | undefined;
                  day: number | null | undefined;
                };
              }
            ]
          | null
          | undefined;
      }
    | null
    | undefined;
  accountTypesWithManagementDisabled: [string] | null | undefined;
  addUserDisabled: boolean | null | undefined;
  adjustVolumeDisabled: boolean | null | undefined;
  factoryResetDisabled: boolean | null | undefined;
  installAppsDisabled: boolean | null | undefined;
  mountPhysicalMediaDisabled: boolean | null | undefined;
  modifyAccountsDisabled: boolean | null | undefined;
  safeBootDisabled: boolean | null | undefined;
  uninstallAppsDisabled: boolean | null | undefined;
  statusBarDisabled: boolean | null | undefined;
  keyguardDisabled: boolean | null | undefined;
  statusReportingSettings:
    | {
        applicationReportsEnabled?: boolean | null | undefined;
        deviceSettingsEnabled?: boolean | null | undefined;
        softwareInfoEnabled?: boolean | null | undefined;
        memoryInfoEnabled?: boolean | null | undefined;
        networkInfoEnabled?: boolean | null | undefined;
        displayInfoEnabled?: boolean | null | undefined;
        powerManagementEventsEnabled?: boolean | null | undefined;
        hardwareStatusEnabled?: boolean | null | undefined;
        systemPropertiesEnabled?: boolean | null | undefined;
        applicationReportingSettings?: {
          includeRemovedApps?: boolean | null | undefined;
        };
        commonCriteriaModeEnabled?: boolean | null | undefined;
      }
    | null
    | undefined;
  bluetoothContactSharingDisabled: boolean | null | undefined;
  shortSupportMessage:
    | { localizedMessages?: { string?: string }; defaultMessage?: string }
    | null
    | undefined;
  longSupportMessage:
    | { localizedMessages?: { string?: string }; defaultMessage?: string }
    | null
    | undefined;
  passwordRequirements:
    | {
        passwordMinimumLength: number | null | undefined;
        passwordMinimumLetters: number | null | undefined;
        passwordMinimumLowerCase: number | null | undefined;
        passwordMinimumNonLetter: number | null | undefined;
        passwordMinimumNumeric: number | null | undefined;
        passwordMinimumSymbols: number | null | undefined;
        passwordMinimumUpperCase: number | null | undefined;
        passwordQuality: PasswordQuality | null | undefined;
        passwordHistoryLength: number | null | undefined;
        maximumFailedPasswordsForWipe: number | null | undefined;
        passwordExpirationTimeout: string | null | undefined;
        passwordScope: PasswordPolicyScope | null | undefined;
        requirePasswordUnlock: RequirePasswordUnlock | null | undefined;
        unifiedLockSettings: UnifiedLockSettings | null | undefined;
      }
    | null
    | undefined;
  wifiConfigsLockdownEnabled: boolean | null | undefined;
  bluetoothConfigDisabled: boolean | null | undefined;
  cellBroadcastsConfigDisabled: boolean | null | undefined;
  credentialsConfigDisabled: boolean | null | undefined;
  mobileNetworksConfigDisabled: boolean | null | undefined;
  tetheringConfigDisabled: boolean | null | undefined;
  vpnConfigDisabled: boolean | null | undefined;
  wifiConfigDisabled: boolean | null | undefined;
  createWindowsDisabled: boolean | null | undefined;
  networkResetDisabled: boolean | null | undefined;
  outgoingBeamDisabled: boolean | null | undefined;
  outgoingCallsDisabled: boolean | null | undefined;
  removeUserDisabled: boolean | null | undefined;
  shareLocationDisabled: boolean | null | undefined;
  smsDisabled: boolean | null | undefined;
  unmuteMicrophoneDisabled: boolean | null | undefined;
  usbFileTransferDisabled: boolean | null | undefined;
  ensureVerifyAppsEnabled: boolean | null | undefined;
  permittedInputMethods:
    | {}
    // | { packageNames?: [string] | null | undefined }
    | null
    | undefined;
  stayOnPluggedModes: [] | null | undefined;
  recommendedGlobalProxy:
    | {
        // host?: string | null | undefined;
        // port?: number | null | undefined;
        // excludedHosts?: [string] | null | undefined;
        // pacUri?: string | null | undefined;
      }
    | null
    | undefined;
  setUserIconDisabled: boolean | null | undefined;
  setWallpaperDisabled: boolean | null | undefined;
  choosePrivateKeyRules: [] | null | undefined;
  alwaysOnVpnPackage:
    | {
        packageName?: string | null | undefined;
        lockdownEnabled?: boolean | null | undefined;
      }
    | null
    | undefined;
  frpAdminEmails: [string] | null | undefined;
  deviceOwnerLockScreenInfo:
    | { localizedMessages?: { string?: string }; defaultMessage?: string }
    | null
    | undefined;
  dataRoamingDisabled: boolean | null | undefined;
  locationMode: LocationMode | null | undefined;
  networkEscapeHatchEnabled: boolean | null | undefined;
  bluetoothDisabled: boolean | null | undefined;
  complianceRules: [] | null | undefined;
  blockApplicationsEnabled: boolean | null | undefined;
  installUnknownSourcesAllowed: boolean | null | undefined;
  debuggingFeaturesAllowed: boolean | null | undefined;
  funDisabled: boolean | null | undefined;
  autoTimeRequired: boolean | null | undefined;
  permittedAccessibilityServices:
    | { packageNames?: [string] | null | undefined }
    | null
    | undefined;
  appAutoUpdatePolicy: AppAutoUpdatePolicy | null | undefined;
  kioskCustomLauncherEnabled: boolean | null | undefined;
  skipFirstUseHintsEnabled: boolean | null | undefined;
  privateKeySelectionEnabled: boolean | null | undefined;
  encryptionPolicy: EncryptionPolicy | null | undefined;
  usbMassStorageEnabled: boolean | null | undefined;
  permissionGrants: [] | null | undefined;
  playStoreMode: PlayStoreMode | null | undefined;
  setupActions: [] | null | undefined;
  passwordPolicies: [] | null | undefined;
  policyEnforcementRules: [] | null | undefined;
  advancedSecurityOverrides:
    | {
        untrustedAppsPolicy: UntrustedAppsPolicy | null | undefined;
        googlePlayProtectVerifyApps:
          | GooglePlayProtectVerifyApps
          | null
          | undefined;
        developerSettings: DeveloperSettings | null | undefined;
        commonCriteriaMode: CommonCriteriaMode | null | undefined;
        personalAppsThatCanReadWorkNotifications: [string] | null | undefined;
      }
    | null
    | undefined;
  personalUsagePolicies: {} | null | undefined;
  autoDateAndTimeZone: AutoDateAndTimeZone | null | undefined;
  oncCertificateProviders: [] | null | undefined;
  crossProfilePolicies: {} | null | undefined;
  preferentialNetworkService: PreferentialNetworkService | null | undefined;
  usageLog: {} | null | undefined;
  cameraAccess: CameraAccess | null | undefined;
  microphoneAccess: MicrophoneAccess | null | undefined;
  kioskCustomization:
    | {
        powerButtonActions: PowerButtonActions | null | undefined;
        systemErrorWarnings: SystemError | null | undefined;
        systemNavigation: SystemNavigation | null | undefined;
        statusBar: Status | null | undefined;
        deviceSettings: DeviceSettings | null | undefined;
      }
    | null
    | undefined;
}

export enum PermissionPolicy {
  PERMISSION_POLICY_UNSPECIFIED,
  PROMPT,
  GRANT,
  DENY,
}

export enum LocationMode {
  LOCATION_MODE_UNSPECIFIED,
  HIGH_ACCURACY,
  SENSORS_ONLY,
  BATTERY_SAVING,
  OFF,
  LOCATION_USER_CHOICE,
  LOCATION_ENFORCED,
  LOCATION_DISABLED,
}

export enum AppAutoUpdatePolicy {
  APP_AUTO_UPDATE_POLICY_UNSPECIFIED,
  CHOICE_TO_THE_USER,
  NEVER,
  WIFI_ONLY,
  ALWAYS,
}

export enum EncryptionPolicy {
  ENCRYPTION_POLICY_UNSPECIFIED,
  ENABLED_WITHOUT_PASSWORD,
  ENABLED_WITH_PASSWORD,
}

export enum PlayStoreMode {
  PLAY_STORE_MODE_UNSPECIFIED,
  WHITELIST,
  BLACKLIST,
}

export enum AutoDateAndTimeZone {
  AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED,
  AUTO_DATE_AND_TIME_ZONE_USER_CHOICE,
  BLACKAUTO_DATE_AND_TIME_ZONE_ENFORCEDLIST,
}

export enum PreferentialNetworkService {
  PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED,
  PREFERENTIAL_NETWORK_SERVICE_DISABLED,
  PREFERENTIAL_NETWORK_SERVICE_ENABLED,
}

export enum CameraAccess {
  CAMERA_ACCESS_UNSPECIFIED,
  CAMERA_ACCESS_USER_CHOICE,
  CAMERA_ACCESS_DISABLED,
  CAMERA_ACCESS_ENFORCED,
}

export enum MicrophoneAccess {
  MICROPHONE_ACCESS_UNSPECIFIED,
  MICROPHONE_ACCESS_USER_CHOICE,
  MICROPHONE_ACCESS_DISABLED,
  MICROPHONE_ACCESS_ENFORCED,
}

export enum SystemUpdateType {
  SYSTEM_UPDATE_TYPE_UNSPECIFIED,
  AUTOMATIC,
  WINDOWED,
  POSTPONE,
}

export enum PasswordQuality {
  PASSWORD_QUALITY_UNSPECIFIED,
  BIOMETRIC_WEAK,
  SOMETHING,
  NUMERIC,
  NUMERIC_COMPLEX,
  ALPHABETIC,
  ALPHANUMERIC,
  COMPLEX,
  COMPLEXITY_LOW,
  COMPLEXITY_MEDIUM,
  COMPLEXITY_HIGH,
}

export enum PasswordPolicyScope {
  SCOPE_UNSPECIFIED,
  SCOPE_DEVICE,
  SCOPE_PROFILE,
}

export enum RequirePasswordUnlock {
  REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED,
  USE_DEFAULT_DEVICE_TIMEOUT,
  REQUIRE_EVERY_DAY,
}

export enum UnifiedLockSettings {
  UNIFIED_LOCK_SETTINGS_UNSPECIFIED,
  ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK,
  REQUIRE_SEPARATE_WORK_LOCK,
}

export enum UntrustedAppsPolicy {
  UNTRUSTED_APPS_POLICY_UNSPECIFIED,
  DISALLOW_INSTALL,
  ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY,
  ALLOW_INSTALL_DEVICE_WIDE,
}

export enum GooglePlayProtectVerifyApps {
  GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED,
  VERIFY_APPS_ENFORCED,
  VERIFY_APPS_USER_CHOICE,
}

export enum DeveloperSettings {
  DEVELOPER_SETTINGS_UNSPECIFIED,
  DEVELOPER_SETTINGS_DISABLED,
  DEVELOPER_SETTINGS_ALLOWED,
}

export enum CommonCriteriaMode {
  COMMON_CRITERIA_MODE_UNSPECIFIED,
  COMMON_CRITERIA_MODE_DISABLED,
  COMMON_CRITERIA_MODE_ENABLED,
}

export enum PermittedAccessibilityServices {}

export enum AdvancedSecurityOverrides {}

export enum PersonalUsagePolicies {}

export enum CrossProfilePolicies {}

export enum UsageLog {}

export enum PowerButtonActions {
  POWER_BUTTON_ACTIONS_UNSPECIFIED,
  POWER_BUTTON_AVAILABLE,
  POWER_BUTTON_BLOCKED,
}
export enum SystemError {
  SYSTEM_ERROR_WARNINGS_UNSPECIFIED,
  ERROR_AND_WARNINGS_ENABLED,
  ERROR_AND_WARNINGS_MUTED,
}

export enum SystemNavigation {
  SYSTEM_NAVIGATION_UNSPECIFIED,
  NAVIGATION_ENABLED,
  NAVIGATION_DISABLED,
  HOME_BUTTON_ONLY,
}

export enum Status {
  STATUS_BAR_UNSPECIFIED,
  NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED,
  NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED,
  SYSTEM_INFO_ONLY,
}

export enum DeviceSettings {
  DEVICE_SETTINGS_UNSPECIFIED,
  SETTINGS_ACCESS_ALLOWED,
  SETTINGS_ACCESS_BLOCKED,
}

export const PoliciesValues: policesI = {
  applications: null,
  maximumTimeToLock: null,
  screenCaptureDisabled: null,
  cameraDisabled: null,
  keyguardDisabledFeatures: null,
  defaultPermissionPolicy: null,
  persistentPreferredActivities: null,
  openNetworkConfiguration: null,
  systemUpdate: null,
  // {
  //   type: null,
  //   startMinutes: null,
  //   endMinutes: null,
  //   freezePeriods: [
  //     {
  //       startDate: {
  //         year: null,
  //         month: null,
  //         day: null,
  //       },
  //       endDate: {
  //         year: null,
  //         month: null,
  //         day: null,
  //       },
  //     },
  //   ],
  // },
  accountTypesWithManagementDisabled: null,
  addUserDisabled: null,
  adjustVolumeDisabled: null,
  factoryResetDisabled: null,
  installAppsDisabled: null,
  mountPhysicalMediaDisabled: null,
  modifyAccountsDisabled: null,
  safeBootDisabled: null,
  uninstallAppsDisabled: null,
  statusBarDisabled: null,
  keyguardDisabled: null,
  statusReportingSettings: null,
  // {
  //   applicationReportsEnabled: null,
  //   deviceSettingsEnabled: null,
  //   softwareInfoEnabled: null,
  //   memoryInfoEnabled: null,
  //   networkInfoEnabled: null,
  //   displayInfoEnabled: null,
  //   powerManagementEventsEnabled: null,
  //   hardwareStatusEnabled: null,
  //   systemPropertiesEnabled: null,
  //   applicationReportingSettings: {
  //     includeRemovedApps: null,
  //   },
  //   commonCriteriaModeEnabled: null,
  // },
  bluetoothContactSharingDisabled: null,
  // {localizedMessages: { string: "" },defaultMessage: "",},
  shortSupportMessage: null,
  // {localizedMessages: { string: "" },defaultMessage: "",},
  longSupportMessage: null,
  passwordRequirements: null,
  // {
  //   passwordMinimumLength: null,
  //   passwordMinimumLetters: null,
  //   passwordMinimumLowerCase: null,
  //   passwordMinimumNonLetter: null,
  //   passwordMinimumNumeric: null,
  //   passwordMinimumSymbols: null,
  //   passwordMinimumUpperCase: null,
  //   passwordQuality: null,
  //   passwordHistoryLength: null,
  //   maximumFailedPasswordsForWipe: null,
  //   passwordExpirationTimeout: null,
  //   passwordScope: null,
  //   requirePasswordUnlock: null,
  //   unifiedLockSettings: null,
  // },
  wifiConfigsLockdownEnabled: null,
  bluetoothConfigDisabled: null,
  cellBroadcastsConfigDisabled: null,
  credentialsConfigDisabled: null,
  mobileNetworksConfigDisabled: null,
  tetheringConfigDisabled: null,
  vpnConfigDisabled: null,
  wifiConfigDisabled: null,
  createWindowsDisabled: null,
  networkResetDisabled: null,
  outgoingBeamDisabled: null,
  outgoingCallsDisabled: null,
  removeUserDisabled: null,
  shareLocationDisabled: null,
  smsDisabled: null,
  unmuteMicrophoneDisabled: null,
  usbFileTransferDisabled: null,
  ensureVerifyAppsEnabled: null,
  permittedInputMethods: null,
  stayOnPluggedModes: null,
  recommendedGlobalProxy: null,
  setUserIconDisabled: null,
  setWallpaperDisabled: null,
  choosePrivateKeyRules: null,
  alwaysOnVpnPackage: null,
  // {
  //   packageName: null,
  //   lockdownEnabled: null,
  // },
  frpAdminEmails: null,
  deviceOwnerLockScreenInfo:
    // {localizedMessages: { string: "" },defaultMessage: "",},
    null,
  dataRoamingDisabled: null,
  locationMode: null,
  networkEscapeHatchEnabled: null,
  bluetoothDisabled: null,
  complianceRules: null,
  blockApplicationsEnabled: null,
  installUnknownSourcesAllowed: null,
  debuggingFeaturesAllowed: null,
  funDisabled: null,
  autoTimeRequired: null,
  permittedAccessibilityServices: null,
  appAutoUpdatePolicy: null,
  kioskCustomLauncherEnabled: null,
  skipFirstUseHintsEnabled: null,
  privateKeySelectionEnabled: null,
  encryptionPolicy: null,
  usbMassStorageEnabled: null,
  permissionGrants: null,
  playStoreMode: null,
  setupActions: null,
  passwordPolicies: null,
  policyEnforcementRules: null,
  kioskCustomization: {
    powerButtonActions: null,
    systemErrorWarnings: null,
    systemNavigation: null,
    statusBar: null,
    deviceSettings: null,
  },
  advancedSecurityOverrides: null,
  personalUsagePolicies: null,
  autoDateAndTimeZone: null,
  oncCertificateProviders: null,
  crossProfilePolicies: null,
  preferentialNetworkService: null,
  usageLog: null,
  cameraAccess: null,
  microphoneAccess: null,
};
