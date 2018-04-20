sap.ui
		.jsview(
				"usercrud.userCRUDPage",
				{

					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf usercrud.userCRUDPage
					 */
					getControllerName : function() {
						return "usercrud.userCRUDPage";
					},

					/**
					 * Is initially called once after the Controller has been
					 * instantiated. It is the place where the UI is
					 * constructed. Since the Controller is given to this
					 * method, its event handlers can be attached right away.
					 * 
					 * @memberOf usercrud.userCRUDPage
					 */
					createContent : function(oController) {
						var oLayout = new sap.ui.commons.layout.MatrixLayout();
						this.oModel = new sap.ui.model.odata.ODataModel(
								"/training/sshydlouski/userCRUD/services/user.xsodata/",
								true);
						var updatePanel = new sap.ui.commons.Panel("updPanel")
								.setText('New User Record Details');
						var layoutNew = new sap.ui.commons.layout.MatrixLayout(
								{
									width : "auto"
								});
						var oVal1 = new sap.ui.commons.TextField("fName", {
							tooltip : "First Name",
							width : "200px",
							editable : true
						});
						var oVal2 = new sap.ui.commons.TextField("lName", {
							tooltip : "Last Name",
							width : "200px",
							editable : true
						});
						var oVal3 = new sap.ui.commons.TextField("email", {
							tooltip : "Email",
							width : "200px",
							editable : true
						});
						var oExcButton = new sap.ui.commons.Button({
							text : "Create Record",
							press : oController.callUserService
						});
						layoutNew.createRow(new sap.ui.commons.Label({
							text : "First Name: "
						}), oVal1); // oExcButton );
						layoutNew.createRow(new sap.ui.commons.Label({
							text : "Last Name: "
						}), oVal2); // oExcButton );
						layoutNew.createRow(new sap.ui.commons.Label({
							text : "Email: "
						}), oVal3, oExcButton);
						updatePanel.addContent(layoutNew);
						oLayout.createRow(updatePanel);
						oTable = new sap.ui.table.Table("userTbl", {
							tableId : "tableID",
							visibleRowCount : 10
						});
						oTable.setTitle("Users");
						// Table Column Definitions
						var oMeta = this.oModel.getServiceMetadata();
						var oControl;
						for (var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
							var property = oMeta.dataServices.schema[0].entityType[0].property[i];
							oControl = new sap.ui.commons.TextField({
								change : oController.updateService
							}).bindProperty("value", property.name);
							if (property.name === 'PERS_NO') {
								oControl.setEditable(false);
							}
							oTable
									.addColumn(new sap.ui.table.Column(
											{
												label : new sap.ui.commons.Label(
														{
															text : property.name
														}),
												template : oControl,
												sortProperty : property.name,
												filterProperty : property.name,
												filterOperator : sap.ui.model.FilterOperator.EQ,
												flexible : true,
												width : "125px"
											}));
						}
						oTable.setModel(this.oModel);
						oTable.bindRows("/Users");
						oTable.setTitle("Users");
						oTable.setEditable(true);
						oLayout.createRow(oTable);
						return oLayout;

					}

				});
