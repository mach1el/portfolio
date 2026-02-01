profile              = "terraform"
bucket               = "mich43l-terraform-state"
key                  = "portfolio/terraform.tfstate"
region               = "ap-southeast-1"
dynamodb_table       = "terraform-state-lock"
encrypt              = true
