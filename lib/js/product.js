const searchLayout = document.getElementById('search_layout');
const cartButton = document.getElementById('cart_button');
const carodLayout = document.getElementById('carouselExampleControls');
//var selectedprod = localStorage.getItem('products');
//const newprod = JSON.parse(selectedprod);

//Get all the selected product info from local storage
    function getProductFromStorage(){
    	console.log("I'm in getProductFromStorage");
    	var selectedprod = localStorage.getItem('products');
    	const newprod = JSON.parse(selectedprod);
    	console.log(newprod,"newprod");
    	var index;
    	/*var html = "<table class='table table-bordered table-striped' id = 'dsTable'>"
    	html+='<thead>'
    	html+='<tr>';
    	html+='<th scope="col">'+'M.F.R.'+'</th>';
    	html+='<th>'+'Name'+'</th>';
    	html+='<th>'+'Quantity'+'</th>';
    	html+='<th>'+'Rate'+'</th>';
    	html+='</tr>';
    	html+='</thead>';*/
    	for (var i = 0; i < newprod.length; i++) {
    		/*html+='<tr>';
            html+='<td>'+'<input type="checkbox" id="" name="" value="">'+'</td>';
    		html+='<td>'+newprod[i].proId+'</td>';
    		html+='<td>'+newprod[i].proName+'</td>';
    		html+='<td>'+ '<input name="cartQuant" style="width: 50%; height: auto; text-align: center;" type="text" value="'+newprod[i].proQuant+'" />' +'<input onclick="update(event)" type="button" value="Update">' +'</td>';         
    		html+='<td>'+''+newprod[i].proRate+'</td>';//<!--span>&#8377;</span-->
            html+='<td onclick="tableclick(event)">'+ '<input type="button" value="Delete" />' +'</td>';
    		html+='</tr>';*/


            var templateString = '<article class="card"> <a id="cartClose" class="close" href="#">×</a><h5>' + newprod[i].proName + '</h5><p>' 
            +'<span class="cartSpan">M.F.R : </span>' + newprod[i].proId + '</p><p>'+'<span class="cartSpan">Quantity : </span>' + newprod[i].proQuant + 
            '</p><p>'+'<span class="cartSpan">Rate : </span>' + newprod[i].proRate + 
            '</p><!--input id="qunt" type="button" onclick="free()"--><p>'+'<span class="cartSpan">Free quantity : </span>' + newprod[i].proFix + 
            '</p></article>';
            $('#test12').append(templateString);

            



    	}//document.getElementById("table").innerHTML = html
    	//Cart Buttons
    	cartButton.style.display = 'block';//Display cart buttons.
    	searchLayout.style.display = 'none';//Hide search bar.
    	productLayout.style.display = 'none';//Hide product layout.
    	divhide.style.display = 'none';//Hide login layout.
        //Onclick card close
         $('.close').click(function(){
           var $target = $(this).parents('article');

           let rowId = $(this).parents('article').index();
           console.log(rowId,"rowId");
           console.log("$target",$target);
           $target.hide('slow', function(){ $target.remove(); });

            var storedNames = JSON.parse(localStorage.getItem("products"));
            console.log(storedNames,"storedNames");
            storedNames.splice(rowId, 1);
            localStorage.setItem('products', JSON.stringify(storedNames));
            cartTotal();


            if (storedNames == 0) {
             console.log("table is empty");
             localStorage.removeItem("products");  
             cartTotal(); 
            }
         });
        
        
    }

    function searchqnty() {
        var newval = document.getElementsByName('cartQuant');
        alert(newval.value); 
        console.log(newval,"inputfield");  
            
    }
    function update(event){
        searchqnty();
    }

    //Empty cart toast message
    function emptyCart() {
      var x = document.getElementById("emptyCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    document.getElementById('cart_btn').onclick = function(product){
    	if ((localStorage.getItem("products") === null) || (localStorage.getItem("products") === '')) {
    		emptyCart();
    	}else{carodLayout.style.display = 'none';getProductFromStorage();cartTotal();}
    }
    //Cart Continue Shopping Button
    function continueShopping(){
    	location.href="index.html";
    }
    //Cart Check Out Button
    function checkOut(){
    	alert("Clearing localStorage");
        localStorage.clear();
        location.href="index.html";
        //tableToJson(table);
    }
/*
    function deleteRow(row) {
        //alert(row);
        // var d = row.parentNode.parentNode.rowIndex;
        document.getElementById('dsTable').deleteRow(row);
    }

    

    function tableclick(e) {
        if(!e)
         e = window.event;
        
        if(e.target.value == "Delete"){
            let rowId = e.target.closest('tr').rowIndex;
            console.log(rowId,"rowId");
           deleteRow( e.target.parentNode.parentNode.rowIndex );
           let devicesArray = rowId - 1 ;
           console.log(devicesArray,"devicesArray");
           var storedNames = JSON.parse(localStorage.getItem("products"));
           console.log(storedNames,"storedNames");
           storedNames.splice(devicesArray, 1);
           localStorage.setItem('products', JSON.stringify(storedNames));
           cartTotal();
       }
       if (storedNames == 0) {
        console.log("table is empty");
        localStorage.removeItem("products");  
        cartTotal(); 
       }
    }*/




//Cart toatal
function cartTotal(){
    var selectedqunt = localStorage.getItem('products');
    const proddetails = JSON.parse(selectedqunt);
    let sum = [];
    var tot=0;
    console.log(proddetails);

    if (localStorage.getItem('products') == null) {
        document.getElementById("prodTotal").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' + "00.00";
        document.getElementById("prodTotalTable").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' +"00.00";
    }else{
    for (var i = 0; i < proddetails.length; i++) {
        var prodtotal = proddetails[i].proQuant * proddetails[i].proRate;
        console.log(prodtotal,"prodtotal");
        sum.push(prodtotal);
        console.log("sum",sum);
        let total = sum.reduce((a, b) => a + b, 0)
        console.log("total",total);
        console.log("total",total.toFixed(2));
        document.getElementById("prodTotal").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' +total.toFixed(2);
        document.getElementById("prodTotalTable").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' +total.toFixed(2);
    }
    }
}

//Expiry fetch
let expirydetails = document.getElementById('expirydetails');
const expiryList = document.getElementById('expirylist');
expirydetails.addEventListener("click", (e)=>{
    e.preventDefault();
    let expiryurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custexpiryresponse.json";
    //Fetch customerurl
    fetch(expiryurl, /*{
        method: 'POSTJSON.stringify(clientdata',
        headers:    {
                'Content-Type': 'application/json',
               },
                body: JSON.stringify(data),
            }*/).then((response)=>{
                return response.json();
                }).then((data)=>{
                    console.log(data,"data");
                    data.expiryDetails.forEach(function(element){
                        expiryList.insertAdjacentHTML( 'beforeend',"<li>" + element.expiryDate + ' - '  + element.expiryNumber + ' - '  + element.amount +  " </li>");
                    });
                    if (data.error) {
                    alert("Error password or username");
                    }else{

                    }
                    }).catch((err)=>{
                    console.log(err);});
    });
expiryList.addEventListener('click', function(e){
    var target = e.target.innerText;
    //Store in localstorage
    localStorage.setItem('expiryNumber',target);
    var targetExpiry = localStorage.getItem('expiryNumber');
    expirydetails.innerText = targetExpiry;
});