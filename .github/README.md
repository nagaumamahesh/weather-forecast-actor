# GitHub Workflows & Templates

This directory contains automated workflows and templates for the Weather Forecast Actor project.

## 🔄 Workflows

### 1. CI - Build and Test (`ci.yml`)

**Triggers**: Push to `main`/`develop`, Pull Requests

**Jobs**:
- **Lint and Build**: Tests on Node.js 18.x and 20.x
  - ✅ TypeScript type checking
  - ✅ Build verification
  - ✅ Upload build artifacts
  
- **Docker Build**: Verifies Docker image builds correctly
  - ✅ Build test image
  - ✅ Cache optimization
  
- **Code Quality**: Security and quality checks
  - ✅ NPM audit for vulnerabilities
  - ✅ Required files verification
  - ✅ Package.json validation

**Status Badge**:
```markdown
![CI Status](https://github.com/nagaumamahesh/weather-forecast-actor/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

---

### 2. Deploy to Apify (`deploy.yml`)

**Triggers**: 
- Push to `main`
- Git tags (`v*.*.*`)
- Manual workflow dispatch

**Jobs**:
- **Deploy**: Automatically deploys to Apify platform
  - ✅ Build verification
  - ✅ Deploy with Apify CLI
  - ✅ Deployment summary
  
- **Create Release**: Creates GitHub release for version tags
  - ✅ Automatic release notes
  - ✅ Link to Apify Store

**Setup Required**:
1. Go to [Apify Console → Integrations](https://console.apify.com/account/integrations)
2. Create a new Personal API Token
3. Add it as `APIFY_TOKEN` secret in GitHub repo settings:
   - Go to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `APIFY_TOKEN`
   - Value: Your Apify token

**Manual Deployment**:
- Go to Actions → Deploy to Apify → Run workflow

---

### 3. CodeQL Security Analysis (`codeql.yml`)

**Triggers**:
- Push to `main`/`develop`
- Pull Requests
- Weekly schedule (Mondays at 00:00 UTC)

**Features**:
- ✅ Automated security vulnerability scanning
- ✅ Code quality analysis
- ✅ Security alerts in GitHub Security tab

**View Results**:
- Go to: Security → Code scanning alerts

---

### 4. Dependency Review (`dependency-review.yml`)

**Triggers**: Pull Requests

**Features**:
- ✅ Reviews new dependencies
- ✅ Checks for security vulnerabilities
- ✅ Blocks harmful licenses (GPL-2.0, GPL-3.0)
- ✅ Comments summary in PR

---

## 📋 Templates

### Pull Request Template

Located at: `.github/PULL_REQUEST_TEMPLATE.md`

**Sections**:
- Description
- Type of change
- Changes made
- Testing checklist
- Related issues

**Automatic**: Loads when creating a new PR

---

### Issue Templates

#### Bug Report (`bug_report.md`)
- Structured bug reporting
- Reproduction steps
- Environment details
- Error messages

#### Feature Request (`feature_request.md`)
- Feature description
- Problem it solves
- Proposed solution
- Use cases

**Usage**: Automatically shown when creating a new issue

---

## 🚀 Workflow Status

View all workflow runs: [Actions Tab](https://github.com/nagaumamahesh/weather-forecast-actor/actions)

---

## 🔒 Security

### Secrets Required

| Secret | Purpose | Where to Get |
|--------|---------|--------------|
| `APIFY_TOKEN` | Deploy to Apify | [Apify Console](https://console.apify.com/account/integrations) |

### Automatic Security Scans

- **CodeQL**: Scans code for vulnerabilities weekly
- **Dependency Review**: Reviews all dependency changes in PRs
- **NPM Audit**: Checks for known vulnerabilities in CI

---

## 📊 Badges for README

Add these badges to your main README.md:

```markdown
![CI Status](https://github.com/nagaumamahesh/weather-forecast-actor/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Deploy Status](https://github.com/nagaumamahesh/weather-forecast-actor/workflows/Deploy%20to%20Apify/badge.svg)
![CodeQL](https://github.com/nagaumamahesh/weather-forecast-actor/workflows/CodeQL%20Security%20Analysis/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
```

---

## 🛠️ Customization

### Modify CI Workflow

Edit `.github/workflows/ci.yml` to:
- Add more Node.js versions to matrix
- Add test commands
- Change code quality rules

### Modify Deploy Workflow

Edit `.github/workflows/deploy.yml` to:
- Change deployment triggers
- Add staging environment
- Customize release notes

---

## 📚 Learn More

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Apify CLI Documentation](https://docs.apify.com/cli)
- [CodeQL Documentation](https://codeql.github.com/docs/)

---

## ✅ Best Practices

1. **Always review CI failures** before merging PRs
2. **Keep secrets secure** - never commit them
3. **Update workflows** when dependencies change
4. **Monitor security alerts** regularly
5. **Use protected branches** for main/develop

---

## 🎯 Quick Reference

### Trigger Manual Deployment
```bash
# Via GitHub UI
Actions → Deploy to Apify → Run workflow

# Via GitHub CLI
gh workflow run deploy.yml
```

### View Workflow Logs
```bash
# Via GitHub CLI
gh run list
gh run view <run-id>
```

### Check Status Locally
```bash
# Simulate CI checks
npm ci
npm run lint
npm run build
docker build -t test .
```

---

**Last Updated**: 2025-12-25
