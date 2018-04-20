sap.ui.controller("usercrud.userCRUDPage", {
	oModel : null,
	callUserService : function() {
		var oModel = sap.ui.getCore().byId("userTbl").getModel();
		var oEntry = {};
		oEntry.PERS_NO = "0000000000";
		oEntry.FIRSTNAME = sap.ui.getCore().byId("fName").getValue();
		oEntry.LASTNAME = sap.ui.getCore().byId("lName").getValue();
		oEntry.E_MAIL = sap.ui.getCore().byId("email").getValue();
		oModel.setHeaders({
			"content-type" : "application/json;charset=utf-8"
		});
		oModel.create('/Users', oEntry, null, function() {
			alert("Create successful");
		}, function() {
			alert("Create failed");
		});
	},
	updateService : function(Event) {
		var oModel = sap.ui.getCore().byId("userTbl").getModel();
		var index = Event.getSource().oParent.getIndex();
		var oEntry = {};
		oEntry.PERS_NO = sap.ui.getCore().byId("__field0-col0-row" + index)
				.getValue();
		switch (Event.mParameters.id) {
		case "__field1-col1-row" + index:
			oEntry.FIRSTNAME = Event.mParameters.newValue;
			break;
		case "__field2-col2-row" + index:
			oEntry.LASTNAME = Event.mParameters.newValue;
			break;
		case "__field3-col3-row" + index:
			oEntry.E_MAIL = Event.mParameters.newValue;
			break;
		}
		var oParams = {};
		oParams.fnSuccess = function() {
			alert("Update successful");
		};
		oParams.fnError = function() {
			alert("Update failed");
		};
		oParams.bMerge = true;
		oModel.setHeaders({
			"content-type" : "application/json;charset=utf-8"
		});
		oModel.update("/Users('" + oEntry.PERS_NO + "')", oEntry, oParams);
	}

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf usercrud.userCRUDPage
 */
// onInit: function() {
//
// },
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf usercrud.userCRUDPage
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf usercrud.userCRUDPage
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf usercrud.userCRUDPage
 */
// onExit: function() {
//
// }
});