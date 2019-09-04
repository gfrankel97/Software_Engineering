provider "azurerm" {
  version = "~> 1.27.0"
}

resource "azurerm_resource_group" "rgPantryToTable" {
  name     = "rgPantryToTable"
  location = "East US"
}

