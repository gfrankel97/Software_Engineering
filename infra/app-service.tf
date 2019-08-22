resource "azurerm_app_service" "dockSoftwareEngineering" {
  name     = "pantry-to-table"
  location = "East US"

  resource_group_name = "rgSoftwareEngineering"
  app_service_plan_id = azurerm_app_service_plan.aspSoftwareEngineering.id

  site_config {
    linux_fx_version = "DOCKER|gfrankel/cecs550-software-engineering:9"

    use_32_bit_worker_process = true
  }

  lifecycle {
    ignore_changes = [ site_config.0.linux_fx_version ]
  }

  depends_on = [
    azurerm_resource_group.rgSoftwareEngineering,
    azurerm_app_service_plan.aspSoftwareEngineering,
  ]
}

