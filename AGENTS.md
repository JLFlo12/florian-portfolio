# Architecture rules

- Project images use password-verified signed upload URLs; never restore public write policies because uploads must remain admin-only.
- Edge functions enforce service-only persistent request counters and fail closed when counters cannot be checked.
- Configure bucket limits via the Storage API before issuing upload tokens because bucket row SQL updates are unsupported.
