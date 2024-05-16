sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "northwind/utils/formatter",
    "sap/ui/core/BusyIndicator",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/ui/core/Core",
    "sap/ui/core/Fragment",
],
    function (
        Controller,
        MessageToast,
        JSONModel,
        MessageBox,
        formatter,
        BusyIndicator,
        Filter,
        FilterOperator,
        History,
        Core,
        Fragment) {
        "use strict";

        return Controller.extend("northwind.controller.View1", {
            formatter: formatter,
            onInit: function () {
                var oRouter = this.getRouter();
                oRouter.getRoute("view1").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                this.getView().getModel().setSizeLimit(1000);
        
                this.getView().getModel().refresh(true);
              },
              onBeforeRebindTable: function (oEvent) {
                var oBindingParams = oEvent.getParameter("bindingParams");
        
                var inpProductID = this.getView().byId("inpProductID").getValue();
                if (inpProductID) {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "ProductID",
                      sap.ui.model.FilterOperator.EQ,
                      inpProductID
                    )
                  );
                }
                //Multicbox filter işlemi
                var CategoryID = this.getView().byId("inpCategoryID").getSelectedKeys();
        
                for (var i = 0; CategoryID.length > i; i++) {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "CategoryID",
                      sap.ui.model.FilterOperator.EQ,
                      CategoryID[i]
                    )
                  );
                }
                //productname input filter
                var sQuery = this.getView().byId("inpProductName").getValue();
                if (sQuery && sQuery.length > 0) {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "ProductName",
                      sap.ui.model.FilterOperator.EQ,
                      sQuery
                    )
                  );
                  }
                //checkbox filter according to chk sadece true ları veya false ları bindlamak için
                var check = this.getView().byId("chkDiscontinued").getSelected();
                if (check) {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "Discontinued",
                      sap.ui.model.FilterOperator.EQ,
                      true
                    )
                  );
                }
                //switch filter. eğer switch on ise unitsonorder ların 0 dan büyük olanlarını değilse sıfır olanlarını bindla
                var switchstate = this.getView().byId("swchUnOr").getState();
                if (switchstate == true) {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "UnitsOnOrder",
                      sap.ui.model.FilterOperator.GT,
                      0
                    )
                  );
                } else {
                  oBindingParams.filters.push(
                    new sap.ui.model.Filter(
                      "UnitsOnOrder",
                      sap.ui.model.FilterOperator.EQ,
                      0
                    )
                  );
                }
              },
              getMessage: function (msgName) {
                var message = this.getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText(msgName);
                MessageToast.show(message, {
                  width: "25em",
                });
              },
              getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
              },
        });
    });
