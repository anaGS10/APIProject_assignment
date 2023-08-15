let token='';



document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    authenticateUserAndFetchData();
});
// Function to authenticate user and fetch customer data
  async function authenticateUserAndFetchData() {
    const loginData = {
        login_id: document.getElementById('login_id').value,
        password: document.getElementById('password').value
    };

    try {
        const authResponse = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (authResponse.ok) {
            const authData = await authResponse.json();
            token = authData.access_token; // Get the token
              
              window.alert("authentication successful");
        } else {
          window.alert('Authentication failed. Please check your credentials.');
            throw new Error('Authentication failed. Please check your credentials.');
        }
    } catch (error) {
        console.log(error);
    }
}




/*------------------Display Customer List-------------*/
  
  
  document.getElementById('displayCustomersList').addEventListener('submit', function (event) {
    event.preventDefault();
    displayCustomers();
});
  
  
  async function displayCustomers() {
            const customerResponse = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (customerResponse.ok) {
                // Update the UI with customer data
                const customerData = await customerResponse.json();
                updateCustomerTable(customerData);
            } else {
              window.alert("Failed to fetch customer details");
                throw new Error('Failed to fetch customer data.');
          
            }

}






/*--------------Update Customer TABLE-----------------*/



// Function to update the customer table in the UI
function updateCustomerTable(customers) {
   
    const customerTable = document.getElementById('customerTable');
    customerTable.innerHTML = ''; // Clear existing data

    customers.forEach(customer => {
        const row = customerTable.insertRow();
        row.innerHTML = `
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
        `;
    });
}




/*-------------------create customer-----------------*/
  
  
  
  document.getElementById('addCustomerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    createNewCustomer();
    displayCustomers();
});

// Function to create a new customer
async function createNewCustomer() {
    const newCustomerData = {
        "first_name": document.getElementById('firstname').value,
        "last_name": document.getElementById('lastname').value,
        "street": document.getElementById('street').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "email": document.getElementById('email').value,
        "phone": document.getElementById('phone').value
    };
    
    //console.log(JSON.stringify(newCustomerData));
    
    /*
      const customerResponse = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
      */

    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomerData)
        });


   if (response.ok) {
            window.alert('Customer created successfully.');
            // Refresh the customer list or perform other actions as needed
        } else {
            window.alert('Failed to create customer. ');
            console.log('Failed to create customer. Response Status:', response.status);
            console.log('Response Status Text:', response.statusText);

            // Handle cases where response contains JSON data
            try {
                const responseJson = await response.json();
                console.log('Error JSON:', responseJson);

                const errorMessage = responseJson.error_message || 'An error occurred while creating the customer.';
                console.log('Error Message:', errorMessage);
            } catch (jsonError) {
                console.log('Failed to parse error JSON:', jsonError);
            }

            // Display an error message to the user
            // ...
        }
    } catch (error) {
        console.log('Error:', error);
        // Handle error and show an appropriate message to the user
    }
}




/*-------------------------Update Customer----------------------*/
  
  
  
  
  document.getElementById('updateCustomerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        updateCustomer();
        displayCustomers();
    });



async function updateCustomer() {
        const uuid = document.getElementById('uuid').value;
        const updatedCustomerData = {
            "first_name": document.getElementById('firstname1').value,
            "last_name": document.getElementById('lastname1').value,
            "street": document.getElementById('street1').value,
            "address": document.getElementById('address1').value,
            "city": document.getElementById('city1').value,
            "state": document.getElementById('state1').value,
            "email": document.getElementById('email1').value,
            "phone": document.getElementById('phone1').value
        };

        try {
            const response = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomerData)
            });

            if (response.ok) {
                window.alert('Customer updated successfully.');
                // Refresh the customer list or perform other actions as needed
            } else {
                window.alert('Failed to update customer. Response Status:');
                console.log('Response Status Text:', response.statusText);

                try {
                    const responseJson = await response.json();
                    console.log('Error JSON:', responseJson);

                    const errorMessage = responseJson.error_message || 'An error occurred while updating the customer.';
                    console.log('Error Message:', errorMessage);
                } catch (jsonError) {
                    console.log('Failed to parse error JSON:', jsonError);
                    console.log('Error Message (from Response Status Text):', response.statusText);
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    
    
    
    
    /*-------------------------Delete Customer----------------------*/
      
      
      
      document.getElementById('deleteCustomerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        deleteCustomer();
        displayCustomers();
    });

    async function deleteCustomer() {
        const uuidToDelete = document.getElementById('del_uuid').value;

        try {
            const response = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuidToDelete}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.ok) {
                window.alert('Customer deleted successfully.');
                // Refresh the customer list or perform other actions as needed
            } else {
                window.alert('Failed to delete customer.');
                console.log('Response Status Text:', response.statusText);

                try {
                    const responseText = await response.text();
                    console.log('Error Response:', responseText);
                } catch (textError) {
                    console.log('Failed to parse error response:', textError);
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
