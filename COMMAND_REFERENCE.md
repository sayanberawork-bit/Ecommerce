# 📖 Command Reference Guide

## Installation & Setup

### Initial Setup (First Time)
```bash
# Navigate to project
cd d:\nextjs-ecommerce

# Install dependencies
npm install

# Create environment file
# (Already created: .env.local)

# Start development server
npm run dev
```

---

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Runs at: http://localhost:3000
- Hot reload enabled
- TypeScript checked

### Build for Production
```bash
npm run build
```
- Creates `.next` folder
- Optimizes code
- Checks TypeScript
- Minifies assets

### Start Production Server
```bash
npm start
```
- Requires `npm run build` first
- Optimized performance
- Production-ready

### Lint Code
```bash
npm run lint
```
- Checks code quality
- Reports errors
- ESLint rules

---

## Useful Development Commands

### Clear Next.js Cache
```bash
rm -rf .next
npm run build
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

### Run on Different Port
```bash
npm run dev -- -p 3001
```

### Check Build Size
```bash
npm run build
# Check .next folder size
```

### Format Code (Manual)
```bash
npm run lint -- --fix
```

---

## Database Commands (Future)

### MongoDB/Mongoose
```bash
# Install MongoDB
npm install mongoose

# Migrate to database
npm run migrate

# Seed database
npm run seed
```

---

## Testing Commands (Future)

### Run Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

### Coverage Report
```bash
npm test -- --coverage
```

---

## Deployment Commands

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker Build
```bash
# Build Docker image
docker build -t ecommerce-app .

# Run Docker container
docker run -p 3000:3000 ecommerce-app
```

### Build and Serve
```bash
npm run build
npm start
```

---

## Database Commands

### MongoDB Connection String
```
mongodb://username:password@host:port/database
```

### MySQL Connection
```
mysql://user:password@host:port/database
```

### PostgreSQL Connection
```
postgresql://user:password@host:port/database
```

---

## Environment Variable Commands

### View Environment
```bash
cat .env.local
```

### Edit Environment
```bash
# Linux/Mac
nano .env.local

# Windows PowerShell
notepad .env.local
```

### Verify Environment
```bash
# Check NextAuth config
echo $env:NEXTAUTH_URL
echo $env:NEXTAUTH_SECRET
```

---

## Useful File Operations

### Create Backup
```bash
# Backup entire project
tar -czf backup.tar.gz .

# Backup database
mongodump --out backup/
```

### Clear Logs
```bash
npm run build 2>&1 > build.log
```

### Check Package Versions
```bash
npm list
npm outdated
```

### Update All Packages
```bash
npm update
```

---

## Troubleshooting Commands

### Check Node Version
```bash
node --version
npm --version
```

### Clear NPM Cache
```bash
npm cache clean --force
```

### Remove Lock File Issues
```bash
rm package-lock.json
npm install
```

### Kill Port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### Check Disk Space
```bash
# Windows
dir C:\ /s

# Linux/Mac
df -h
du -sh .
```

---

## Git Commands

### Initialize Git
```bash
git init
```

### Add Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Add feature"
```

### Create Branch
```bash
git checkout -b feature/new-feature
```

### Merge Branch
```bash
git checkout main
git merge feature/new-feature
```

### Push to Remote
```bash
git push origin main
```

---

## API Testing Commands

### Using CURL

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"demo123"}'
```

#### Get Orders
```bash
curl http://localhost:3000/api/orders
```

#### Create Payment
```bash
curl -X POST http://localhost:3000/api/payment \
  -H "Content-Type: application/json" \
  -d '{"amount":10000}'
```

### Using Postman
1. Import API collection
2. Set environment variables
3. Run requests
4. Check responses

---

## Package Management

### Add Package
```bash
npm install package-name
npm install --save package-name
```

### Install Dev Package
```bash
npm install --save-dev package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

### Check for Updates
```bash
npm outdated
npm update
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

---

## Monitoring & Logs

### View Development Logs
```bash
npm run dev 2>&1 | tee dev.log
```

### Check Build Output
```bash
npm run build 2>&1 | tee build.log
```

### Monitor Application
```bash
# Production
npm start

# With logging
npm start 2>&1 | tee app.log
```

---

## Performance Commands

### Analyze Bundle
```bash
npm install --save-dev webpack-bundle-analyzer
```

### Check Performance
```bash
npm run build -- --analyze
```

### Lighthouse CLI
```bash
npm install -g lighthouse
lighthouse http://localhost:3000
```

---

## Documentation Commands

### Generate API Docs
```bash
npm install --save-dev swagger-ui-express
```

### Generate Changelog
```bash
npm install --save-dev commitizen
```

---

## Useful Aliases

Add to `.bashrc` or `.zshrc`:

```bash
# Development
alias dev="npm run dev"
alias build="npm run build"
alias start="npm start"
alias lint="npm run lint"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gb="git branch"
```

---

## Windows PowerShell Commands

### Clear Terminal
```powershell
Clear-Host
```

### Create Directory
```powershell
mkdir new-folder
```

### Remove Directory
```powershell
Remove-Item -Recurse -Force folder-name
```

### List Files
```powershell
Get-ChildItem
```

### Find Port Usage
```powershell
netstat -ano | findstr :3000
```

---

## Environment Setup

### Windows
```powershell
# Set environment variable
$env:NEXTAUTH_SECRET = "your-secret"

# Check variable
$env:NEXTAUTH_SECRET
```

### Linux/Mac
```bash
# Set environment variable
export NEXTAUTH_SECRET="your-secret"

# Check variable
echo $NEXTAUTH_SECRET

# Permanent (add to ~/.bashrc or ~/.zshrc)
export NEXTAUTH_SECRET="your-secret"
```

---

## Docker Commands

### Build Image
```bash
docker build -t ecommerce:latest .
```

### Run Container
```bash
docker run -p 3000:3000 ecommerce:latest
```

### Push to Registry
```bash
docker tag ecommerce:latest username/ecommerce:latest
docker push username/ecommerce:latest
```

---

## Common Issues & Solutions

### Issue: Build fails
```bash
# Clear and rebuild
rm -rf .next
npm run build
```

### Issue: Dependencies conflict
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port already in use
```bash
npm run dev -- -p 3001
```

### Issue: Memory error
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Run production |
| `npm run lint` | Check code |
| `npm install` | Install dependencies |
| `npm update` | Update packages |
| `npm audit` | Check vulnerabilities |

---

## Tips & Tricks

1. **Use `-g` for global packages:** `npm install -g vercel`
2. **Check versions:** `npm list package-name`
3. **Force clean:** `npm cache clean --force`
4. **Test locally:** `npm run build && npm start`
5. **Monitor performance:** `npm run build -- --profile`
6. **Update safely:** `npm update --save`
7. **Audit security:** `npm audit fix`

---

## Getting Help

### Search Online
```bash
# Search NPM
https://www.npmjs.com/

# Search GitHub
https://github.com/search

# Search Stack Overflow
https://stackoverflow.com/
```

### Check Documentation
```bash
# Next.js
https://nextjs.org/docs

# NextAuth
https://next-auth.js.org

# Tailwind
https://tailwindcss.com/docs
```

---

**Bookmark this page for quick reference!** 🚀
