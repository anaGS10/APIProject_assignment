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

// Fetch token from localStorage
const token = localStorage.getItem('token');

// Function to fetch customer data and update the UI
async function fetchAndDisplayCustomerData(token) {
    try {
        // Fetch customer list using the token
        const customerResponse = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            updateCustomerTable(customerData); // Update the UI with customer data
        } else {
            throw new Error('Failed to fetch customer data.');
        }
    } catch (error) {
        console.error(error);
        // Handle error and show an appropriate message to the user
    }
}

// Call function to fetch and display customer data
fetchAndDisplayCustomerData(token);
