output "site_bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Name of the S3 bucket that stores site assets."
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.site.id
  description = "ID of the CloudFront distribution."
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.site.domain_name
  description = "CloudFront domain name for the distribution."
}

output "acm_certificate_arn" {
  value       = aws_acm_certificate.site.arn
  description = "ARN of the ACM certificate in us-east-1."
}

output "route53_record_names" {
  value       = local.route53_record_names
  description = "Route 53 alias records created for the distribution."
}
