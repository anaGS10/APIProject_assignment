// Attach event listener to the login form
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const loginData = {
        login_id: document.getElementById('login_id').value,
        password: document.getElementById('password').value
    };

    try {
        // Authenticate user and get token
        const token = await authenticateUser(loginData);

        if (token) {
            // Store token in localStorage for accessibility in other files
            localStorage.setItem('token', token);

            // Redirect to customer.html on successful authentication
            window.location.href = 'displayList.html';
        } else {
            throw new Error('Authentication failed. Please check your credentials.');
        }
    } catch (error) {
        console.error(error);
        // Handle error and show an appropriate message to the user
    }
});

// Function to authenticate user and get token
async function authenticateUser(loginData) {
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
            return authData.access_token; // Return the token
        } else {
            throw new Error('Authentication failed. Please check your credentials.');
        }
    } catch (error) {
        throw new Error('Authentication failed. Please check your credentials.');
    }
}
