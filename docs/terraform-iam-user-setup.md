# Terraform AWS Setup (IAM User + Remote State) — Step by Step

This guide creates a dedicated **IAM user** for Terraform that **does NOT** have broad permissions directly.
Instead, the user can only **assume a Terraform execution role** (`terraform`) using STS, and the role is granted
explicit access to **Terraform remote state** (S3 + DynamoDB).

> ✅ Best practice: Terraform uses a **role**; the IAM user only has `sts:AssumeRole`.

---

## Overview

**Flow:**
1. Create IAM **user**: `terraform`
2. Create IAM **role**: `terraform` (Terraform provisioning permissions live here)
3. Create IAM **policy**: allow the user to `sts:AssumeRole` into the role
4. Enable **MFA** for IAM user
5. Create **Access Key** (only if needed)
6. Configure AWS CLI / Terraform to assume the role
7. Create **S3 bucket** + **DynamoDB lock table** for remote state
8. Attach **state access policy** to the role
9. Configure Terraform backend

```
terraform (IAM User)  --->  sts:AssumeRole  --->  terraform (IAM Role)  --->  AWS resources
                                         \
                                          --->  S3 state + DynamoDB lock
```

---

## Prerequisites

- You can access AWS Console with an identity that can manage IAM.
- You know your:
  - `ACCOUNT_ID`
  - `REGION` (example: `ap-southeast-1`)
  - `STATE_BUCKET` (if using S3 remote state)
  - `LOCK_TABLE` (if using DynamoDB state locking)
- Names used in this guide:
  - IAM user: `terraform`
  - IAM role: `terraform`
  - IAM policy: `TerraformAssumeRoleOnly`

---

## Part A - IAM User + Role (Terraform execution)

### Step 0 - Secure Root (recommended)

Use root only for account-level tasks.

- Enable MFA on the root account
- Remove any root access keys (root should not have programmatic keys)

---

### Step 1 - Create IAM User `terraform`

1. AWS Console → **IAM** → **Users**
2. Click **Create user**
3. User name: `terraform`
4. Click **Next** → **Create user**

> You will attach permissions later (after the role exists).

---

### Step 2 - Create the Terraform Execution Role `terraform`

1. AWS Console → **IAM** → **Roles**
2. Click **Create role**
3. Trusted entity type: **AWS account**
4. Choose: **This account**
5. Click **Next**

#### Attach permissions to the role (bootstrap option)
For early setup, you can attach `AdministratorAccess` temporarily.

- Attach **AdministratorAccess** (temporary bootstrap)
- Later replace it with least-privilege policies for only the services Terraform manages

6. Click **Next**
7. Role name: `terraform`
8. Click **Create role**

---

### Step 3 - Create AssumeRole-Only Policy for the IAM User

This policy lets the IAM user assume the `terraform` role.

1. AWS Console → **IAM** → **Policies**
2. Click **Create policy**
3. Choose **JSON**
4. Paste (replace `<ACCOUNT_ID>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAssumeTerraformRole",
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/terraform"
    }
  ]
}
```

5. Click **Next**
6. Name: `TerraformAssumeRoleOnly`
7. Click **Create policy**

---

### Step 4 - Attach Policy to IAM User

1. IAM → **Users** → click `terraform`
2. Tab **Permissions** → **Add permissions**
3. Choose **Attach policies directly**
4. Select `TerraformAssumeRoleOnly`
5. Click **Next** → **Add permissions**

---

### Step 5 - Update Role Trust Policy to Trust ONLY the IAM User

1. IAM → **Roles** → click `terraform`
2. Tab **Trust relationships** → **Edit trust policy**
3. Paste the trust policy (replace `<ACCOUNT_ID>`)

> IMPORTANT: use the exact user ARN from IAM → Users → terraform → ARN.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TrustTerraformIamUserOnly",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_ID>:user/terraform"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

4. Click **Update policy**

---

### Troubleshooting: "Invalid principal in policy"

If you see:
> `Failed to update trust policy. Invalid principal in policy ...`

It usually means one of these:
- The IAM user **does not exist yet**
- You typed the wrong account ID
- The user has a **path**, so the ARN is different

Fix:
- Go to IAM → Users → `terraform`
- Copy the **ARN** shown there
- Paste that ARN into the trust policy `Principal.AWS`

#### Alternative robust trust policy (account-root + condition)
If you want a trust policy that avoids principal lookup edge-cases:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TrustAccountButOnlyThisUser",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_ID>:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "ArnEquals": {
          "aws:PrincipalArn": "arn:aws:iam::<ACCOUNT_ID>:user/terraform"
        }
      }
    }
  ]
}
```

---

### Step 6 - Enable MFA for IAM User `terraform` (recommended)

1. IAM → Users → `terraform`
2. Tab **Security credentials**
3. **Multi-factor authentication (MFA)** → **Assign MFA device**
4. Choose **Authenticator app** (or security key)
5. Complete setup

---

### Step 7 - Create Access Key for IAM User (only if needed)

If you run Terraform from CLI and need keys:

1. IAM → Users → `terraform`
2. Tab **Security credentials**
3. **Access keys** → **Create access key**
4. Use case: **CLI**
5. Save:
   - `Access Key ID`
   - `Secret Access Key`

> Store these securely (e.g., Bitwarden). Never commit them to git.

---

### Step 8 - Configure AWS CLI to Assume Role

#### Option A: Using `~/.aws/credentials` (simple)

`~/.aws/credentials`
```ini
[terraform-user]
aws_access_key_id=YOUR_ACCESS_KEY_ID
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
```

`~/.aws/config`
```ini
[profile terraform-role]
role_arn=arn:aws:iam::<ACCOUNT_ID>:role/terraform
source_profile=terraform-user
region=ap-southeast-1
```

Test:
```bash
aws sts get-caller-identity --profile terraform-role
```

Expected ARN pattern:
- `arn:aws:sts::<ACCOUNT_ID>:assumed-role/terraform/...`

When running Terraform, set the profile via environment variables:

```bash
export AWS_PROFILE=terraform-role
export AWS_SDK_LOAD_CONFIG=1
```

> `AWS_SDK_LOAD_CONFIG=1` is required when your profile uses role configuration in `~/.aws/config`.

---

### Step 9 - Terraform Provider Example

```hcl
provider "aws" {
  region  = "ap-southeast-1"
}
```

> If you do not set `AWS_PROFILE`, add `profile = "terraform-role"` to both provider blocks.

---

## Part B - Remote State (S3 + DynamoDB)

### Step 10 - Choose names and region

Pick:
- `AWS_REGION` (example: `us-east-2`)
- a globally unique S3 bucket name (example: `mich43l-terraform-state-prod`)
- a DynamoDB table name (example: `terraform-state-lock`)

---

### Step 11 - Create the S3 bucket (AWS Console)

1. Go to **S3** → **Create bucket**
2. Bucket name: `mich43l-terraform-state-prod`
3. Region: `us-east-2`
4. **Block all public access**: enabled
5. Create bucket

---

### Step 12 - Enable bucket best practices

Open the bucket and configure:
- **Versioning** → Enable
- **Default encryption** → SSE-S3 (AES-256)
- (Optional) **Bucket policy** to enforce TLS-only access (see Step 14)

---

### Step 13 - Create the DynamoDB lock table (AWS Console)

1. Go to **DynamoDB** → **Create table**
2. Table name: `terraform-state-lock`
3. Partition key: `LockID` (String)
4. Capacity: **On-demand**
5. Create table

---

### Step 14 - Optional: enforce TLS-only access (bucket policy)

Attach this bucket policy to deny non-TLS requests (replace the bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyInsecureTransport",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::mich43l-terraform-state-prod",
        "arn:aws:s3:::mich43l-terraform-state-prod/*"
      ],
      "Condition": {
        "Bool": {"aws:SecureTransport": "false"}
      }
    }
  ]
}
```

---

### Step 15 - Create IAM policy for Terraform state access (required)

This policy should be attached to the **Terraform execution role** (recommended) or the IAM user
running Terraform.

1. AWS Console → **IAM** → **Policies** → **Create policy**
2. Choose **JSON**
3. Paste and replace placeholders:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TerraformStateBucketList",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::<STATE_BUCKET>"
    },
    {
      "Sid": "TerraformStateObjectRW",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::<STATE_BUCKET>/*"
    },
    {
      "Sid": "TerraformStateLockTableRW",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeTable",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:UpdateItem"
      ],
      "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<LOCK_TABLE>"
    }
  ]
}
```

4. Click **Next**
5. Name: `TerraformStateAccess`
6. Click **Create policy**

> If you plan to use KMS (SSE-KMS) instead of SSE-S3, add the appropriate `kms:*` actions for your key.

---

### Step 16 - Attach the policy to your Terraform role or user

1. IAM → **Roles** (or **Users**) → select `terraform`
2. **Add permissions** → **Attach policies directly**
3. Select `TerraformStateAccess`
4. Click **Next** → **Add permissions**

---

### Step 17 - Configure Terraform backend

Update `backend.tf` (or pass `-backend-config` at init time):

```hcl
terraform {
  backend "s3" {
    bucket         = "mich43l-terraform-state-prod"
    key            = "portfolio/prod/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

---

## Optional: CLI alternative

If you prefer CLI over the console:

```bash
aws s3api create-bucket \
  --bucket mich43l-terraform-state-prod \
  --region us-east-2 \
  --create-bucket-configuration LocationConstraint=us-east-2

aws s3api put-bucket-versioning \
  --bucket mich43l-terraform-state-prod \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket mich43l-terraform-state-prod \
  --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'

aws s3api put-public-access-block \
  --bucket mich43l-terraform-state-prod \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

---

## Recommended Next Steps (after bootstrap)

- Replace `AdministratorAccess` on role `terraform` with **least-privilege** policies per service
- Add tagging standards: `env`, `project`, `owner`, `cost_center`
- Move away from long-lived access keys (SSO/OIDC) when ready
