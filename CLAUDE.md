# kl-advocacy (My Access Advocacy)

Karlie's personal website at myaccessadvocacy.com. Built with React + Vite.

## Environments

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | myaccessadvocacy.com | `main` |
| Staging | staging.myaccessadvocacy.com | `staging` |

Both environments auto-deploy via AWS Amplify on push.

## Development Workflow

1. Make changes on the `staging` branch
2. Push to origin -- Amplify deploys automatically to staging.myaccessadvocacy.com
3. Review the staging site
4. When approved, merge `staging` into `main` for production

Never push directly to `main`.

## Agent Identity

- Repo owner: LukeL99
- farad-bots has contributor access
- All agent commits and PRs should use the farad-bots identity
  - `git config user.name "farad-bots"`
  - `git config user.email "farad-bots@users.noreply.github.com"`
