// city and street are HIDDEN unless delivery == true
// default is hidden
$( ".address" ).hide();
$("input[name='p_or_d']").change(function(){
	// get value of radio button
	let temp = $("input[name='p_or_d']:checked").val();
	// hide or show based on selected value
	if(temp == "pickup"){
		$( ".address" ).hide();
	}
	else {
		$( ".address" ).show();
	}
});


// calculate each item cost and input into each totalCost section
// use a for loop and just go down the line
	// multiply selectItem value by cost value

// as calculating each totalCost section, add each value to an overall total
// insert this total into subtotal value
// tax it
// calculate new total

$(".selectQuantity").change(function(){
	var quans = ["quan0", "quan1", "quan2", "quan3", "quan4"];
	var totalCost = [];
	var subtotal = 0;
	// loop through the items and calculate their costs, adding to array
	for(var i = 0; i < quans.length; i++){
		var value = $('select[name="'+quans[i]+'"]').val();
		var cost = menuItems[i].cost;
		totalCost[i] = (value * cost).toFixed(2);
	}
	// add up data in array to the subtotal, convert to floats
	$("input[name='cost']").each(function(index){
		$(this).val(totalCost[index]);
		subtotal += parseFloat(totalCost[index]);
	});
	// add data to the textboxes
	$("input[name='subtotal']").val(((subtotal)).toFixed(2));
	$("input[name='tax']").val((subtotal*0.0625).toFixed(2));
	$("input[name='total']").val((subtotal + subtotal*0.0625).toFixed(2));
});



// on click of "sumbit order" button:

// check that phone number has 7 OR 10 numbers (letter are OK)
// check that last name is entered
// check that at least 1 item was ordered

// if any of the above are false, do NOT continue

// otherwise, pop-up a thank you message
// then open a new window to display all info about order
	// items/quantity/cost for each/subtotals/tax/total
// delivery time is 40 mins, pickup is 20

$("input[type='button']").click(function(){
	// don't continue if any of the specified things are not correct
	var toContinue = checkEntries();
	if($("input[name='total']").val() == 0){
		alert("Please select at least one item.");
		// if no items are selected, false
		toContinue = false;
	}
	// only if true, continue to print
	if(toContinue){
		alert("Thank you for your order!");
		printToWindow();
	}
});


function printToWindow(){
	// initalize variables below
	// quans are to get data from selector
	var quans = ["quan0", "quan1", "quan2", "quan3", "quan4"];
	var totalCost = [];
	// get these three from the textbox
	var subtotal = $("input[name='subtotal']").val();
	var tax = $("input[name='tax']").val();
	var total = $("input[name='total']").val();
	
	var time = "<br/>";
	var itemsToPrint = [];

	// get information from selector, like above
	for(var i = 0; i < quans.length; i++){
		var value = $('select[name="'+quans[i]+'"]').val();
		var cost = menuItems[i].cost;
		totalCost[i] = (value * cost).toFixed(2);
		// if the value is greater than 0, add to printed items
		if(value > 0){
			itemsToPrint += value + " " + menuItems[i].name + ": " + "$" + menuItems[i].cost.toFixed(2) *  value + "<br/>";
		}
	}

	// add format
	subtotal = "$" + subtotal + "<br/>";
	tax = "$" + tax + "<br/>";
	total = "$" + total + "<br/>";

	// check if pickup or delivery
	let temp = $("input[name='p_or_d']:checked").val();
	// change time accordingly
	var currentDate = new Date();
	if(temp == "delivery"){
		// plus 40 mins
		newTime = new Date(currentDate.getTime() + (40*60*1000))
		time = "<br/> Your order will arrive by delivery at " + newTime.getHours() + ":" + newTime.getMinutes();
	} else {
		// plus 20 mins
		newTime = new Date(currentDate.getTime() + (20*60*1000))
		time = "<br/> Your order will be ready for pickup at " + newTime.getHours() + ":" + newTime.getMinutes();
	}

	// add all necessary things to a toPrint variable
	var toPrint = "Items ordered: <br/>" + itemsToPrint + "Subtotal: <br/>" + subtotal + "Tax: <br/>" + tax + "Total: <br/>" + total + time;
	// print toPrint to a new window
	$(window.open().document.body).html(toPrint);
}


function checkEntries(){
	var toReturn = true;
	// make sure something is entered as last name
	if($("input[name='lname']").val() == ""){
		alert("Please enter a last name.");
		toReturn = false;
	}
	
	var phone = $("input[name='phone']").val();
	var nums = 0;
	// count numbers contained in phone textbox
	for (var i = 0; i < phone.length; i++) {
		if(phone[i] > -1 && phone[i] < 10){
			nums++;
		}
	}
	// if it is anything but 7 or 10, do not continue
	if(nums != 7 && nums != 10){
		alert("Please enter a valid phone number. Either 7 or 10 digits.")
		toReturn = false;
	}

	// check that street and city are entered if delivery was selected
	if($("input[name='p_or_d']:checked").val() == "delivery"){
		if($("input[name='street']").val() == ""){
			alert("Please enter a street.");
			toReturn = false;
		}
		if($("input[name='city']").val() == ""){
			alert("Please enter a city.");
			toReturn = false;
		}
	}
	return toReturn;
}
