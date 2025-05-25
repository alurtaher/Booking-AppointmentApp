const form = document.getElementById('callForm');
const tableContainer = document.getElementById('tableContainer');
const baseUrl = "https://crudcrud.com/api/713a1aedf44d461d8e086365bfdd0c26/bookings";

document.addEventListener('DOMContentLoaded', () => {
    createTable();
    loadBookings();
});

// Form submit handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookingData = getFormData();

    try {
        const response = await axios.post(baseUrl, bookingData);
        appendRow(response.data);  // add row directly
        form.reset();
    } catch (error) {
        console.error("Error adding booking:", error);
    }
});

// Function to create table structure once
function createTable() {
    const table = document.createElement('table');
    table.id = 'detailsTable';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    tableContainer.appendChild(table);

    // Event delegation for delete buttons
    table.querySelector('tbody').addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            try {
                await axios.delete(`${baseUrl}/${id}`);
                e.target.closest('tr').remove();
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    });
}

// Get form data and format date
function getFormData() {
    const myName = document.getElementById('myName').value.trim();
    const myEmail = document.getElementById('myEmail').value.trim();
    const myNumber = document.getElementById('myNumber').value.trim();
    const dateForCall = document.getElementById('dateForCall').value;
    const time = document.getElementById('time').value;

    const [year, month, day] = dateForCall.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    return { name: myName, email: myEmail, number: myNumber, date: formattedDate, time };
}

// Load bookings from CrudCrud and populate table
async function loadBookings() {
    try {
        const response = await axios.get(baseUrl);
        response.data.forEach(booking => appendRow(booking));
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

// Append a row to the table
function appendRow(booking) {
    const tbody = document.querySelector('#detailsTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${booking.name}</td>
        <td>${booking.email}</td>
        <td>${booking.number}</td>
        <td>${booking.date}</td>
        <td>${booking.time}</td>
        <td><button class="delete-btn" data-id="${booking._id}">Delete</button></td>
    `;

    tbody.appendChild(row);
}
