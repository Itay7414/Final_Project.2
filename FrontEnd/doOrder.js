// doOrder.js

async function addToOrder(fruitName, price, quantity) {
    try {
        const response = await fetch('/orders/addToOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fruitName,
                price,
                quantity,
            }),
            credentials: 'same-origin', // Include cookies in the request
        });

        if (response.ok) {
            // Handle a successful response, if needed
            console.log('Item added to order successfully');
        } else {
            // Handle an error response, if needed
            console.log('Failed to add item to order');
        }
    } catch (error) {
        // Handle any error that occurred during the request
        console.error('Error adding item to order:', error);
    }
}
