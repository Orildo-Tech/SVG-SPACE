# Deployment Guide

This guide covers deploying SVG-SPACE to production environments using Cloudflare Pages and Workers.

## Prerequisites

Before deploying, ensure you have:

- Cloudflare account with Pages access
- Supabase project configured
- Domain name (optional)
- Git repository with project code
- Environment variables configured

## Cloudflare Pages Deployment

### 1. Prepare Your Code

Ensure your code is pushed to a Git repository (GitHub or GitLab).

### 2. Create Cloudflare Pages Project

1. Log in to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Click "Create a project"
4. Connect to your Git provider
5. Select the SVG-SPACE repository

### 3. Configure Build Settings

**Build Command:**
```bash
npm run build
```

**Build Output Directory:**
```
dist
```

**Root Directory:**
```
/ (leave empty for root)
```

### 4. Environment Variables

Add the following environment variables in Cloudflare Pages settings:

```env

VITE_DATABASE_URL=https://your-project.supabase.co

VITE_DATABASE_KEY=your-supabase-anon-key

SUPABASE_URL=https://your-project.supabase.co

SUPABASE_ANON_KEY=your-supabase-anon-key

```

### 5. Deploy

Click "Save and Deploy" to start the deployment process. Cloudflare will:

- Clone your repository
- Install dependencies
- Run the build command
- Deploy the output to Cloudflare's edge network

### 6. Configure Custom Domain (Optional)

1. In your Pages project settings, go to "Custom Domains"
2. Add your domain (e.g., `svgspace.sbs`)
3. Configure DNS records as instructed by Cloudflare
4. Wait for SSL certificate provisioning

## Cloudflare Workers Deployment

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Authenticate

```bash
wrangler login
```

### 3. Configure Wrangler

Update `wrangler.toml`:

```toml
name = "svgspace"
compatibility_date = "2024-01-01"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"

[vars]
ENVIRONMENT = "production"
```

### 4. Deploy Workers

```bash
wrangler pages deploy dist
```

## Supabase Edge Functions Deployment

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Link to Your Project

```bash
supabase link --project-ref your-project-id
```

### 3. Deploy Edge Functions

```bash
supabase functions deploy submit-icon
```

## Environment-Specific Configurations

### Development

For local development, use the `.env` file:

```env
VITE_DATABASE_URL=https://dev-project.supabase.co
VITE_DATABASE_KEY=dev-anon-key
```

### Staging

Create a separate Cloudflare Pages project for staging with test environment variables.

### Production

Use production Supabase credentials and configure proper domain and SSL settings.

## Database Migration

### Initial Setup

Run the SQL schema provided in the Installation Guide to create required tables.

### Schema Updates

For schema changes:

1. Create migration SQL files
2. Test on staging environment
3. Apply to production during maintenance window
4. Verify data integrity

## Icon Data Management

### Initial Data Import

1. Prepare icon files in `public/icons/` directory
2. Update `public/icons.json` with metadata
3. Run build process
4. Deploy to production

### Ongoing Updates

For adding new icons:

1. Submit via the website submission form
2. Wait for processing (7 minutes)
3. Verify icon appears correctly
4. Update `public/icons.json` if needed
5. Deploy changes

## Monitoring and Logging

### Cloudflare Analytics

- Monitor page views and traffic patterns
- Check error rates and response times
- Review geographic distribution

### Supabase Dashboard

- Monitor database performance
- Check storage usage
- Review edge function logs
- Track API usage

### Error Tracking

Consider implementing error tracking:

- Sentry for JavaScript errors
- Cloudflare Logs for API errors
- Custom logging for application events

## Performance Optimization

### Build Optimization

The production build includes:

- Code minification
- Tree shaking
- Asset optimization
- Gzip compression

### CDN Configuration

- Enable Cloudflare CDN caching
- Configure cache headers for static assets
- Use image optimization for exported formats
- Enable Brotli compression

### Database Optimization

- Add indexes for frequently queried fields
- Optimize SVG storage in Supabase
- Implement query result caching
- Monitor database performance metrics

## Security Configuration

### SSL/TLS

- Enable HTTPS for all domains
- Configure proper SSL certificates
- Redirect HTTP to HTTPS
- Use secure cookies for authentication

### Headers

Configure security headers:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Access Control

- Implement rate limiting for API endpoints
- Configure CORS policies appropriately
- Use Supabase Row Level Security (RLS)
- Monitor for suspicious activity

## Backup and Recovery

### Database Backups

- Enable automated Supabase backups
- Configure backup retention policy
- Test restore procedures regularly
- Document recovery process

### Asset Backups

- Back up `public/icons/` directory regularly
- Version control `icons.json` file
- Store backups in multiple locations
- Document backup locations and procedures

## Scaling Considerations

### Horizontal Scaling

- Cloudflare automatically scales Pages deployments
- Supabase handles database scaling
- Monitor performance metrics and adjust resources

### Geographic Distribution

- Cloudflare CDN provides global distribution
- Configure regional database replicas if needed
- Monitor latency across different regions

### Load Management

- Implement caching strategies
- Use queue systems for heavy processing
- Monitor resource usage during peak times
- Plan capacity for growth

## Troubleshooting

### Build Failures

Common issues and solutions:

- **Dependency errors**: Clear cache and reinstall
- **Environment variables**: Verify all required variables are set
- **Asset paths**: Check build output directory configuration

### Runtime Errors

- **404 errors**: Verify routing configuration
- **API errors**: Check Supabase connection and credentials
- **Performance issues**: Review caching and CDN configuration

### Deployment Issues

- **Failed deployments**: Check Cloudflare build logs
- **DNS issues**: Verify domain configuration
- **SSL errors**: Check certificate provisioning status

## Maintenance Procedures

### Regular Maintenance

- Weekly: Review logs and performance metrics
- Monthly: Update dependencies and security patches
- Quarterly: Review and optimize database performance
- Annually: Review architecture and scalability plans

### Emergency Procedures

- Rollback plan for failed deployments
- Communication process for outages
- Emergency contact information
- Documentation of known issues and workarounds

## Compliance and Legal

### Data Protection

- Review data handling practices
- Ensure compliance with relevant regulations
- Document data retention policies
- Implement proper data deletion procedures

### License Compliance

- Verify all third-party licenses
- Document attribution requirements
- Ensure proper license headers in code
- Review third-party dependencies regularly

## Post-Deployment Checklist

After deployment, verify:

- Website loads correctly
- All icons display properly
- Search functionality works
- Submission form operates correctly
- API endpoints respond properly
- Error tracking shows no critical issues
- Performance metrics are acceptable
- SSL certificates are valid
- Domain configuration is correct
- Monitoring is functioning

## Support

For deployment issues:

- Cloudflare Support: https://support.cloudflare.com
- Supabase Support: https://supabase.com/support
- GitHub Issues: https://github.com/Orildo-Tech/SVG-SPACE/issues