# Route 53 DNS Setup for a Hostinger Domain

This guide delegates DNS for a Hostinger-registered domain (e.g., `mich43l.pro`) to Amazon Route 53 so Terraform can manage records automatically.

---

## Step 1 - Create a Route 53 hosted zone

1. AWS Console → **Route 53** → **Hosted zones** → **Create hosted zone**
2. Domain name: `mich43l.pro`
3. Type: **Public hosted zone**
4. Create hosted zone.

After creation, note the **hosted zone ID** and the **4 name servers (NS records)**.

---

## Step 2 - Update nameservers in Hostinger

1. Log in to Hostinger.
2. Go to **Domains** → select `mich43l.pro` → **DNS / Nameservers**.
3. Replace the current nameservers with the 4 Route 53 nameservers.
4. Save changes.

**Propagation** usually takes a few minutes but can take up to 24–48 hours.

---

## Step 3 - Use the hosted zone in Terraform

Set `hosted_zone_id` in `terraform.tfvars`:

```hcl
hosted_zone_id = "Z1234567890ABCDE"
```

Terraform will:
- Create ACM DNS validation records in Route 53
- Create CloudFront alias records (A + AAAA) in Route 53

---

## Step 4 - Verify

After `terraform apply`, check:
- ACM certificate status becomes **Issued**
- `mich43l.pro` resolves to CloudFront

---

## Troubleshooting

- If ACM validation stays **Pending**, verify the NS delegation was updated in Hostinger.
- Confirm the hosted zone ID matches the correct zone (public, not private).
