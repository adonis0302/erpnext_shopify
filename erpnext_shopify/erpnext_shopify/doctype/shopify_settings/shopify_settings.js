cur_frm.fields_dict["default_tax_account"].get_query = function(doc, dt, dn){
	return {
		"query": "erpnext.controllers.queries.tax_account_query",
		"filters": {
			"account_type": ["Tax", "Chargeable", "Expense Account"],
			"company": frappe.defaults.get_default("company")
		}
	}
}

frappe.ui.form.on("Shopify Settings", "sync_shopify", function(frm, dt, dn) { 
	frappe.call({
		method:"erpnext_shopify.erpnext_shopify.doctype.shopify_settings.shopify_settings.sync_shopify",
		freeze: true,
		callback:function(r){
			if(!r.exc){
				frappe.msgprint(__("Sync Completed!!"))
			}
		}
	})
});


frappe.ui.form.on("Shopify Settings", "app_type", function(frm, dt, dn) { 
	frm.toggle_reqd("api_key", (frm.doc.app_type == "Private"));
	frm.toggle_reqd("password", (frm.doc.app_type == "Private"));
})

frappe.ui.form.on("Shopify Settings", "refresh", function(frm){
	if(!frm.doc.__islocal){
		frm.toggle_reqd("price_list", true);
		frm.toggle_reqd("warehouse", true);
		frm.toggle_reqd("default_tax_account", true);
	}
})