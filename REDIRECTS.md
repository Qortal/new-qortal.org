# qortal.org redirect map

The current host appears to use Apache-compatible configuration (`public/.htaccess`). These redirects preserve useful high-level inbound routes while intentionally keeping historical news posts available through an archive policy rather than mapping them to unrelated content.

| Old route                                 | New route                                                   | Requirement                                                                              |
| ----------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `/downloads/`                             | `/get-started`                                              | Permanent redirect                                                                       |
| `/get-involved/`                          | `/community`                                                | Permanent redirect                                                                       |
| `/what-is-the-qortal-blockchain-project/` | `/explore`                                                  | Permanent redirect                                                                       |
| `/what-does-qortal-have-now/`             | `/ecosystem`                                                | Permanent redirect                                                                       |
| `/trade-portal/`                          | `/technology#trade`                                         | Permanent redirect                                                                       |
| `/minting-leveling/`                      | `/community`                                                | Temporary conceptual redirect until dedicated current minting documentation is available |
| `/tutorials/`                             | `https://qortal.dev/onboarding`                             | Permanent external redirect                                                              |
| `/faq/`                                   | `https://qortal.dev/faq`                                    | Permanent external redirect                                                              |
| `/video/`                                 | `https://www.youtube.com/channel/UC2dm2DxTM6JRdtmxP4RABBQ/` | Permanent external redirect                                                              |
| `/donate/`                                | `https://qortal.dev/donate`                                 | Permanent external redirect                                                              |

Historical dated announcements and release posts should remain retrievable from a static archive if the old WordPress deployment is retired. They should not be silently redirected to the homepage because that destroys search intent and source history.
