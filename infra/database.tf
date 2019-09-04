resource "azurerm_mysql_server" "dbSoftwareEngineering" {
  name                = "db-software-engineering"
  location            = "eastus"
  resource_group_name = "rgPantryToTable"

  sku {
    name     = "B_Gen5_1"
    capacity = 1
    tier     = "Basic"
    family   = "Gen5"
  }

  storage_profile {
    storage_mb            = 51200
    backup_retention_days = 7
    geo_redundant_backup  = "Disabled"
  }

  administrator_login          = "adminuser"
  administrator_login_password = "SoftwareEngineering550"
  version                      = "5.7"
  ssl_enforcement              = "Enabled"
}