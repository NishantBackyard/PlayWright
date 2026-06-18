# Salesforce Login Test Plan

## Application Overview

Test plan for Salesforce login page (https://login.salesforce.com/?locale=in).
Assumptions: Start from a fresh browser state (no stored cookies or sessions). Valid credentials must be provided by the tester via secure test fixtures or environment variables. Tests are independent and can run in any order.
Success criteria: Each scenario verifies expected navigation, visible messages, or UI state changes. Failures are clearly described in the expectations.

## Test Scenarios

### 1. Salesforce Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Happy path - valid credentials

**File:** `tests/login.happy.spec.ts`

**Steps:**
  1. Navigate to https://login.salesforce.com/?locale=in
    - expect: Username, Password fields and Log In button are visible
  2. Fill the username with a valid account and the password with the correct password, then click Log In
    - expect: User is successfully authenticated and redirected to the application home/dashboard
    - expect: No authentication error message is shown

#### 1.2. Invalid credentials - error message

**File:** `tests/login.invalid.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Username and Password fields are visible
  2. Enter an invalid username or password and click Log In
    - expect: An authentication error message is displayed (e.g., invalid credentials)
    - expect: User remains on the login page

#### 1.3. Empty fields validation

**File:** `tests/login.empty.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login form is visible
  2. Leave username or password empty and click Log In
    - expect: Client-side validation prevents submission or an inline error message appears
    - expect: No navigation away from the login page

#### 1.4. Forgot Password flow

**File:** `tests/login.forgot.spec.ts`

**Steps:**
  1. On the login page click 'Forgot Your Password?'
    - expect: Browser navigates to the password reset page or modal appears
  2. Enter a known username/email and submit the reset request
    - expect: A confirmation message indicates that reset instructions were sent to the account email
    - expect: No account password is disclosed in UI

#### 1.5. Remember Me functionality

**File:** `tests/login.remember.spec.ts`

**Steps:**
  1. Navigate to login page and check the 'Remember Me' checkbox
    - expect: Checkbox can be toggled
  2. Log in with valid credentials, log out, then revisit the login page in a new browser session
    - expect: Username is pre-filled when 'Remember Me' was enabled
    - expect: When not enabled, username is not pre-filled

#### 1.6. Use Custom Domain flow

**File:** `tests/login.customdomain.spec.ts`

**Steps:**
  1. Click 'Use Custom Domain' on the login page
    - expect: Custom domain input is shown
  2. Enter a known custom domain and continue
    - expect: Flow moves to the domain-specific login or shows an appropriate validation/error

#### 1.7. Accessibility & Localization checks

**File:** `tests/login.accessibility.spec.ts`

**Steps:**
  1. Inspect the login page for ARIA attributes and tab navigation order
    - expect: Interactive controls have appropriate ARIA labels or visible labels
    - expect: Tab order follows logical reading order and focus is visible
  2. Open the page with locale=in (already used) and verify localized strings
    - expect: Primary labels/buttons reflect the selected locale or localized resources load
