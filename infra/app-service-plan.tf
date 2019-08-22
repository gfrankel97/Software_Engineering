resource "azurerm_app_service_plan" "aspSoftwareEngineering" {

  name     = "aspSoftwareEngineering"
  location = "East US"

  kind                = "Linux"
  reserved            = true
  resource_group_name = "rgSoftwareEngineering"

  sku {
    tier = "Free"
    size = "F1"
  }

  depends_on = [ azurerm_resource_group.rgSoftwareEngineering ]
}

