# Portfolio Infra (Terraform)

Terraform root module to deploy a static portfolio site on AWS using:
- S3 (private bucket)
- CloudFront (with OAC)
- ACM certificate (us-east-1)
- Route 53 DNS records

Remote state is expected to live in a separate S3 bucket with a DynamoDB lock table.

---

## Prerequisites

- Terraform >= 1.5
- AWS credentials configured (IAM user/role, not root)
- A Route 53 hosted zone for your domain (DNS delegated to Route 53)
- Remote state bucket + lock table created (see `docs/terraform-iam-user-setup.md`)

### AWS credentials

Terraform uses the standard AWS credential chain. Common options:

- Environment variables: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
- Shared credentials file: `~/.aws/credentials` (set `AWS_PROFILE` to select)
- SSO / role-based credentials (if your org uses them)

If you use a **role profile** (recommended), export:

```bash
export AWS_PROFILE=terraform-role
export AWS_SDK_LOAD_CONFIG=1
```

---

## Route 53 DNS (Hostinger domain)

If your domain is registered at Hostinger (e.g., `mich43l.pro`), you should **delegate DNS to Route 53** so Terraform can manage all records automatically (ACM validation + CloudFront aliases).

See `docs/Route53_Domain_Setup.md` for the exact steps.

---

## 1) Configure remote state

Backend config cannot be read from `terraform.tfvars`, so use **either** inline values in
`infra/backend.tf` **or** a separate backend config file passed to `terraform init`.

### Option A: backend.tf (inline)

Update `infra/backend.tf` with your state bucket, region, and lock table values.

Example:

```hcl
terraform {
  backend "s3" {
    bucket               = "mich43l-terraform-state"
    key                  = "terraform.tfstate"
    workspace_key_prefix = "portfolio"
    region               = "us-east-2"
    dynamodb_table       = "terraform-state-lock"
    encrypt              = true
  }
}
```

This uses **Terraform workspaces** for environment separation. The state path becomes:
`portfolio/<workspace>/terraform.tfstate` (example: `portfolio/prod/terraform.tfstate`).

```bash
cd infra
terraform workspace new prod || terraform workspace select prod
```

Or pass backend values at init time (useful when bucket/region/prefix differ per env):

```bash
cd infra
terraform init \
  -backend-config="bucket=mich43l-terraform-state" \
  -backend-config="key=terraform.tfstate" \
  -backend-config="workspace_key_prefix=portfolio" \
  -backend-config="region=us-east-2" \
  -backend-config="dynamodb_table=terraform-state-lock"
```

### Option B: backend.hcl (recommended for reuse)

Fill out `infra/backend.hcl`, then run:

```bash
cd infra
terraform init -backend-config=backend.hcl
```

---

## 2) Configure inputs

Create `infra/terraform.tfvars` with your settings:

```hcl
aws_region     = "us-east-2"
domain_name    = "portfolio.example.com"
hosted_zone_id = "Z1234567890ABCDE"

# Optional
site_bucket_name          = "portfolio.example.com"
subject_alternative_names = ["www.example.com"]
route53_record_names      = ["portfolio.example.com", "www.example.com"]
price_class               = "PriceClass_100"
enable_spa_fallback       = true
enable_s3_versioning      = true
default_root_object       = "index.html"

# Optional tags
tags = {
  env     = "prod"
  project = "portfolio"
}
```

Terraform automatically loads `terraform.tfvars`, or you can pass it explicitly:

```bash
cd infra
terraform apply -var-file="terraform.tfvars"
```

Or run with CLI variables (full example):

```bash
cd infra
terraform apply \
  -var="aws_region=us-east-2" \
  -var="domain_name=portfolio.example.com" \
  -var="hosted_zone_id=Z1234567890ABCDE" \
  -var="site_bucket_name=portfolio.example.com" \
  -var="subject_alternative_names=[\"www.example.com\"]" \
  -var="route53_record_names=[\"portfolio.example.com\",\"www.example.com\"]" \
  -var="price_class=PriceClass_100" \
  -var="enable_spa_fallback=true" \
  -var="enable_s3_versioning=true" \
  -var="default_root_object=index.html" \
  -var='tags={env=\"prod\",project=\"portfolio\"}'
```

---

## 3) Deploy

```bash
cd infra
terraform init
terraform apply
```

After apply, upload your static site to the S3 bucket output (`site_bucket_name`).

---

## Notes

- ACM is created in `us-east-1` (required for CloudFront).
- The S3 bucket is private; CloudFront access is enforced via OAC.
- SPA fallback (403/404 -> `index.html`) is enabled by default.
- Use `route53_record_names` when you want extra aliases besides `domain_name`.
