// doOrder.js

async function addToOrder(itemName, price, quantity) {
  try {
    if (quantity < 1) {
      alert("Minimum quantity is 1 :)");
      return;
    }

    const response = await fetch('/orders/addToOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemName,
        price,
        quantity,
      }),
      credentials: 'same-origin', // Include cookies in the request
    });

    if (response.ok) {
      const updatedOrder = await response.json();
      alert("Added to the cart!");

      // Update the cart display if needed
      // For example, you can call a function to update the cart UI
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        alert("You have to log in to your user before adding items to the cart!");
      } else {
        // Handle other error responses, if needed
        console.log('Failed to add item to order:', errorData.message);
      }
    }
  } catch (error) {
    // Handle any error that occurred during the request
    console.error('Error adding item to order:', error);
  }
}


async function getItems() {
  try {
    const cookieName = `order_${username}`;
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(cookieName))
      ?.split('=')[1];

    if (cookieValue) {
      const items = JSON.parse(cookieValue);
      updateOrderTable(items); // Pass the items array to the updateOrderTable function
    } else {
      // Handle case when the cookie is not found
      console.log('No items found in the cookie:', cookieName);
    }
  } catch (error) {
    // Handle any error that occurred during the retrieval
    console.error('Error retrieving items from cookie:', error);
  }
}






