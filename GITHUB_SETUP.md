# GitHub Repository Setup for Thronglet Society

## Creating the GitHub Repository

To create the GitHub repository, you can use the GitHub CLI or the web interface:

### Option 1: Using GitHub CLI (recommended)
1. Install GitHub CLI from https://cli.github.com/
2. Authenticate: `gh auth login`
3. Create the repository: `gh repo create thronglet/thronglet-society --public --clone`

### Option 2: Using Web Interface
1. Go to https://github.com/new
2. Create a new public repository named `thronglet-society`
3. Owner: `thronglet` (or your GitHub username)

## After Creating the Repository

Once the repository is created, push the existing code:

```bash
cd "C:\Users\123\.openclaw\workspace\thronglet-society-app"
git remote add origin https://github.com/thronglet/thronglet-society.git
git branch -M main
git push -u origin main
```

## Deploying to Free Domain

The application is designed to be deployed on various platforms:

### Option 1: GitHub Pages
1. Go to your repository Settings
2. Navigate to Pages
3. Select Source: Deploy from a branch
4. Branch: main, folder: /(root)
5. Your site will be available at https://thronglet.github.io/thronglet-society

### Option 2: Netlify
1. Sign up at https://netlify.com
2. Drag and drop the project folder, or connect to GitHub
3. Deploy settings:
   - Build command: `npm install`
   - Publish directory: `.`
   - No build command needed for static site

### Option 3: Vercel
1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Configure as static site

### Option 4: Heroku
1. Create a Procfile with content: `web: node server.js`
2. Use Heroku CLI to deploy

## Running Locally

To run the application locally:

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Visit http://localhost:3000

## GitHub Pages Specific Configuration

For GitHub Pages deployment, you might need to make adjustments:

1. Create a CNAME file for custom domain: `thronglet.world`
2. Update relative paths if needed for subdirectory deployment
3. Add a 404.html page for SPA routing

## Custom Domain Setup

To use a custom domain:

1. Purchase a domain (e.g., thronglet.world)
2. Update DNS records to point to your hosting provider
3. Configure SSL certificate
4. Update the CNAME file in the repository

## Environment Variables

If needed, create a .env file with:
```
NODE_ENV=production
PORT=3000
```

## Additional Files for GitHub

The following files would typically be added to complete the repository:
- LICENSE
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- ISSUE_TEMPLATE.md
- PULL_REQUEST_TEMPLATE.md