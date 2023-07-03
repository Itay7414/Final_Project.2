const addToOrder = document.querySelectorAll('.add-to-order-btn');
addToOrder.forEach(button => {
  button.addEventListener('click', () => {
    const fruitName = button.closest('.card').querySelector('.item-name').textContent;
    const quantityInput = button.closest('.card').querySelector('.item-amount');
    const quantity = parseFloat(quantityInput.value);
    const price = parseFloat(button.closest('.card').querySelector('.item-price').textContent.split('$')[1]);

    // Make AJAX request to addToOrder route
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/orders/addToOrder', true);
    xhr.withCredentials = true; // Include cookies in the request
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer your-authentication-token');

    xhr.onload = function () {
      if (xhr.status === 200) {
        const orderData = JSON.parse(xhr.responseText);
        updateOrderTable(orderData);
      }
    };

    const data = JSON.stringify({ fruitName, quantity, price });
    xhr.send(data);
  });
});


// Function to update the order table in the orders.ejs file
function updateOrderTable(orderData) {
  // Get the table body element
  const tableBody = document.getElementById('order-table-body');

  // Clear the table body before updating
  tableBody.innerHTML = '';

  // Loop through each item in the order data
  orderData.items.forEach(item => {
    // Create a new row for the item
    const newRow = document.createElement('tr');

    // Create table cells for the item data
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement('td');
    priceCell.textContent = item.price;

    // Append the cells to the new row
    newRow.appendChild(nameCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(priceCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

  // Example: Log the order data to the console
  console.log(orderData);
}
