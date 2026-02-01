terraform {
  backend "s3" {
    # Update these after creating the remote state bucket + lock table.
    bucket = "REPLACE_ME_STATE_BUCKET"
    key    = "portfolio/terraform.tfstate"
    region               = "REPLACE_ME_REGION"
    dynamodb_table       = "REPLACE_ME_LOCK_TABLE"
    encrypt              = true
  }
}
