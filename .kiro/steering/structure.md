# Griffin - Project Structure & Organization

## Repository Structure

```
griffin/
├── packages/                 # Monorepo packages (currently empty)
├── website/                  # Documentation/marketing site (planned)
├── docs/                     # Technical documentation
│   ├── ARCHITECTURE.md       # Low-level architecture details
│   └── RESOURCES.md          # Additional resources and references
├── .kiro/                    # Kiro AI assistant configuration
│   └── steering/             # AI guidance documents
├── node_modules/             # Dependencies (managed by pnpm)
├── package.json              # Root package configuration
├── pnpm-lock.yaml           # Dependency lock file
├── .env.example             # Environment variable template
└── README.md                # Main project documentation
```

## Monorepo Organization

The project uses **pnpm workspaces** with the following workspace configuration:
- `packages/*` - Core service packages (SDK, orchestrator, contracts)
- `website` - Documentation and marketing site

## Package Structure Guidelines

When creating packages, follow this structure:
```
packages/
├── sdk/                     # Client-side SDK package
├── orchestrator/            # Backend orchestration service
├── contracts/               # Smart contracts for settlement layer
├── shared/                  # Shared utilities and types
└── api/                     # API definitions and clients
```

## Documentation Standards

- **README.md**: High-level architecture and payment flow examples
- **docs/ARCHITECTURE.md**: Detailed technical architecture
- **docs/RESOURCES.md**: External resources and references
- Each package should have its own README with specific usage instructions

## Development Workflow

1. All packages are built and tested together using pnpm workspace commands
2. Shared dependencies are hoisted to the root level
3. Each package maintains its own build configuration using tsup
4. Environment configuration is managed at the root level