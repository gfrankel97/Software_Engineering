provider "azurerm" {
  version = "~> 1.27.0"
}

resource "azurerm_resource_group" "rgSoftwareEngineering" {
  name     = "rgSoftwareEngineering"
  location = "East US"
}

