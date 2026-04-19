# Security Spec

## Data Invariants
1. A user document can only be created by the authenticated user whose UID matches `{userId}`.
2. Admins are defined by specific emails and must have `email_verified == true`.
3. Game Progress can only be read or written by the owner (the user whose UID matches the parent document).
4. `createdAt` must be server time and immutable.
5. Role cannot be escalated by the user.

## The "Dirty Dozen" Payloads
1. Create user profile for different UID (Identity Spoofing).
2. Create user profile with role 'admin' (Privilege Escalation).
3. Update user profile to escalate role.
4. Read another user's profile without admin rights.
5. Read another user's progress.
6. Write to another user's progress.
7. Update progress with missing required fields (Schema Bypass).
8. Update progress with huge strings/arrays (Denial of Wallet).
9. Update progress changing immutable fields (e.g. `createdAt`).
10. Send client timestamp instead of server timestamp.
11. Unauthenticated read/write.
12. Admin writes allowed.
