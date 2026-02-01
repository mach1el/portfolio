variable "aws_region" {
  type        = string
  description = "Primary AWS region for the portfolio stack."
  default     = "us-east-2"
}

variable "domain_name" {
  type        = string
  description = "Primary domain name for the site (e.g., portfolio.example.com)."
}

variable "site_bucket_name" {
  type        = string
  description = "S3 bucket name for the site content. Defaults to the primary domain name when empty."
  default     = ""
}

variable "subject_alternative_names" {
  type        = list(string)
  description = "Additional SANs for the ACM certificate (e.g., [\"www.example.com\"])."
  default     = []
}

variable "hosted_zone_id" {
  type        = string
  description = "Route 53 hosted zone ID that contains the domain(s)."
}

variable "route53_record_names" {
  type        = list(string)
  description = "Domain names to create Route 53 alias records for. Defaults to the primary domain name."
  default     = []
}

variable "default_root_object" {
  type        = string
  description = "Default object CloudFront serves when a directory is requested."
  default     = "index.html"
}

variable "enable_spa_fallback" {
  type        = bool
  description = "Whether to map 403/404 to index.html for SPA routing."
  default     = true
}

variable "price_class" {
  type        = string
  description = "CloudFront price class."
  default     = "PriceClass_100"
}

variable "enable_s3_versioning" {
  type        = bool
  description = "Enable versioning on the site bucket."
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "Tags applied to resources."
  default     = {}
}
