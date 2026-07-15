# 🌐 Portfolio
Personal portfolio website showcasing experience, projects, and contact info.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Terraform](https://img.shields.io/badge/Terraform-1.5+-844FBA?style=flat-square&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20CloudFront%20%7C%20Route53-232F3E?style=flat-square&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Overview
- 🎨 **Frontend**: React + TypeScript + Vite single-page portfolio (Architecture & Automation focused).
- ☁️ **Infra**: Terraform stack for S3 + CloudFront + ACM + Route 53.
- 🐳 **Local Dev**: Docker Compose or native Node.js.

---

## 📁 Project Structure
```
portfolio/
├── docs/                  # DNS + IAM setup guides
├── frontend/              # React + TS app (Vite)
├── infra/                 # Terraform for AWS hosting
├── docker-compose.yml     # Local dev via Docker
├── DOCKER.md              # Docker workflow
├── LICENSE
└── README.md
```

---

## 🚀 Quick Start (Frontend)
```bash
cd frontend
npm install
npm run dev
```

---

## 🐳 Docker (Local Dev)
```bash
docker-compose up -d
```
Open: `http://localhost:5173`

Docs: `DOCKER.md`

---

## ☁️ AWS Infra (Terraform)
Terraform provisions:
- ✅ **S3 (private bucket)**
- ✅ **CloudFront (OAC)**
- ✅ **ACM (us-east-1)**
- ✅ **Route 53 DNS**

Infra docs: `infra/README.md`

### Configure
1) Update `infra/terraform.tfvars` with your domain, hosted zone, and region.
2) Configure `infra/backend.hcl` for remote state (S3 + DynamoDB).
3) Export AWS credentials / profile (see `infra/README.md`).

### Deploy (Manual)
```bash
# Provision infra
cd infra
terraform init -backend-config=backend.hcl
terraform workspace new prod || terraform workspace select prod
terraform apply

# Build frontend
cd ../frontend
npm install
npm run build

# Upload to S3 (replace with the output bucket name)
aws s3 sync dist s3://<site_bucket_name> --delete

# Invalidate CloudFront (replace with output distribution id)
aws cloudfront create-invalidation \
  --distribution-id <cloudfront_distribution_id> \
  --paths "/*"
```
Outputs for `site_bucket_name` and `cloudfront_distribution_id` appear after `terraform apply`.

### View values from state
```bash
cd infra
terraform state show aws_s3_bucket.site
terraform state show aws_cloudfront_distribution.site
```
You can also use outputs:
```bash
terraform output -raw site_bucket_name
terraform output -raw cloudfront_distribution_id
```

### CloudFront status (CLI)
```bash
# If you already have the distribution ID
aws cloudfront get-distribution --id <distribution_id> \
  --query "Distribution.{Status:Status,Enabled:Enabled,DomainName:DomainName,LastModified:LastModifiedTime}" \
  --output table

# Find distribution IDs
aws cloudfront list-distributions \
  --query "DistributionList.Items[].{Id:Id,Domain:DomainName,Status:Status}" \
  --output table

# Check invalidation progress
aws cloudfront list-invalidations --distribution-id <distribution_id> \
  --query "InvalidationList.Items[].{Id:Id,Status:Status,CreateTime:CreateTime}" \
  --output table
```

### Cache policy notes (S3 503 mitigation)
- HTML is cached short-term; static assets (e.g., `/assets/*`) are cached long-term.
- Prefer invalidating only `/index.html` after deploys (avoid `/*` unless necessary).
- This reduces origin load and helps prevent S3 `SlowDown` (503) spikes.

### Terraform state (centralized S3)
- State is stored in a shared bucket, with a unique key per project.
- This repo uses `portfolio/terraform.tfstate` to avoid collisions.
- Reusing the same bucket is safe **as long as keys/prefixes are unique**.

---

## 📚 Docs
- `docs/Route53_Domain_Setup.md`
- `docs/terraform-iam-user-setup.md`
- `infra/README.md`
- `CHANGELOG.md`

---

## 📝 Changelog
- **2026-02-01** — Bootstrap grid responsiveness, donation widget click-toggle + mobile sizing, CloudFront cache policies, centralized state key.

---

## ✅ Status
- Frontend fully developed with responsive UI, modern typography, and optimized asset delivery
- Infra ready for AWS provisioning

---

## 📄 License
MIT — see `LICENSE`.
