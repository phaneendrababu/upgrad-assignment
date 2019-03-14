window.onload = function()
{
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function()
	{
		// display the form div
		quickAddFormDiv.style.display = "block";
		document.getElementById("Cancel").style.display = "block";
		quickAddBtn.style.display = "none";
		document.getElementById("add_book").style.display = "none";
		document.getElementById("e").style.display = "none";
		document.getElementById('ph_logo').innerHTML="ADD SUBSCRIBER";
		
	});

	cancelBtn.addEventListener("click", function()
	{
		quickAddFormDiv.style.display = "none";
		quickAddBtn.style.display = "block";
		document.getElementById("add_book").style.display = "block";
		document.getElementById("Cancel").style.display = "none";
		document.getElementById("e").style.display = "block";
		document.getElementById('ph_logo').innerHTML="MOBILE DIRECTORY";
	});
	
	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];

	function jsonStructure(fullname,phone)
	{
		this.fullname = fullname;
		this.phone = phone;
	}

	function addToBook()
	{
		var isNull = fullname.value!='' && phone.value!='';
		if(isNull)
		{
			var obj = new jsonStructure(fullname.value,phone.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			quickAddBtn.style.display = "block";	
			document.getElementById('confirmfullname').value=" ";
			document.getElementById('confirmphone').value=" ";
			document.getElementById("add_book").style.display = "block";
			document.getElementById("Cancel").style.display = "none";
			document.getElementById("add_book").style.display = "block";
			document.getElementById("e").style.display = "block";
			document.getElementById('ph_logo').innerHTML="MOBILE DIRECTORY";
			document.getElementById('QuickAdd').innerHTML="<b>ADD</b>";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e)
	{
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton'))
		{
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm()
	{
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields)
		{
			formFields[i].value = '';
		}
	}

	function showAddressBook()
	{
		if(localStorage['addbook'] === undefined)
		{
			localStorage['addbook'] = '';
		} else 
		{
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			quickAddBtn.style.display = "block";
			for(var n in addressBook)
			{
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">DELETE</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}