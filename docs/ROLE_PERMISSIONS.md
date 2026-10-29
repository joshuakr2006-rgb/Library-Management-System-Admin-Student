# Role permissions

| Capability | Admin | Student |
|---|---:|---:|
| Sign in | Yes | Yes |
| View/search books | Yes | Yes |
| Add/edit/delete books | Yes | No |
| View all members | Yes | No |
| Create student login | Yes | No |
| View all transactions | Yes | No — own only |
| Issue a book to a selected member | Yes | No |
| Borrow a book for self | Admin can issue to member | Yes |
| Return a book | Any transaction | Own transactions only |
| View dashboard metrics | Yes | Student-specific welcome dashboard |

Role permissions are enforced by Express middleware and route logic as well as by the React UI.
