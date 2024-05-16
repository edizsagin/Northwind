jQuery.sap.declare("northwind.utils.formatter");
northwind.utils.formatter = {
  priceFormatted: function (e) {
    jQuery.sap.require("sap.ui.core.format.NumberFormat");
    var r = sap.ui.core.format.NumberFormat.getFloatInstance({
      maxFractionDigits: 2, 
      // burada virgülden sonra kaç hane olsun anlamında ben sıfır dersem hiç olmaz
      groupingEnabled: true,
      groupingSeparator: ".",
      decimalSeparator: ",",
    });
    return r.format(e);
  },
  deleteZeros: function (e) {
    return e.replace(/^0+/, "");
  },
  dateFormatter: function (e) {
    if (e) return e.toLocaleDateString();
    else return "";
  },
  reqStatStateFormat: function (e) {
    if (e == "N") return "Information";
    else if (e == "W") return "Warning";
    else if (e == "A") return "Success";
    else if (e == "R") return "Error";
    else return "None";
  },
  reqStatIconFormat: function (e) {
    if (e == "N") return "sap-icon://process";
    else if (e == "W") return "sap-icon://lateness";
    else if (e == "A") return "sap-icon://accept";
    else if (e == "R") return "sap-icon://decline";
    else return "";
  },
  iconFormatChange:function(e){
  if(e > 4)
return "sap-icon://arrow-top";
else{
  return "sap-icon://arrow-bottom";
}
  },
  iconColorChange:function(e){
if(e > 4){
return "Success"
}
else {
  return "Error"
}
  },

  unitPriceStateFormat:function(value){
    // var newVal = parseInt(value);
    // // gelen veritipi string bu yüzden parse ile int e çeviriyoruz
    if(value > 20){
      return "Success";  
    }else{
        return "Error"; 
    }
   
  },
};
